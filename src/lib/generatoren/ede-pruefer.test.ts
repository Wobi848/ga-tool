import { describe, it, expect } from 'vitest';
import { pruefen, stateTextRefs } from './ede-pruefer';
import { exportEde, generieren, neuesProjekt, type Projekt } from './dpl';

function projekt(): Projekt {
	const p = neuesProjekt();
	p.anlagen = [
		{
			id: 'a',
			btaArt: 'L',
			btaNr: '13',
			name: 'Lüftung',
			funktionen: [
				{
					id: '1',
					key: 'as',
					bezeichnung: 'AS',
					apparatArt: 'D',
					apparatNr: '001',
					optional: true
				},
				{
					id: '2',
					key: 'antrieb',
					bezeichnung: 'Zuluftventilator',
					apparatArt: 'M',
					apparatNr: '100',
					optional: true
				},
				{
					id: '3',
					key: 'messwert',
					bezeichnung: 'Zulufttemperatur',
					apparatArt: 'B',
					apparatNr: '802',
					messgroesse: 'temp',
					optional: true
				}
			]
		}
	];
	return p;
}

const KOPF = [
	'PROJECT_NAME;Test',
	'VERSION_OF_REFERENCEFILE;1',
	'TIMESTAMP_OF_LAST_CHANGE;2026-10-17',
	'AUTHOR_OF_LAST_CHANGE;x',
	'VERSION_OF_LAYOUT;2.2',
	'# keyname;device obj.-instance;object-name;object-type;object-instance;description;present-value-default;min-present-value;max-present-value;settable;supports COV;hi-limit;low-limit;state-text-reference;unit-code;vendor-specific-address;notification-class'
];

describe('EDE-Prüfer', () => {
	it('eine EDE-Datei aus dem eigenen Generator hat keine Fehler', () => {
		const p = projekt();
		const e = exportEde(p, generieren(p));
		const r = pruefen(e.ede, { aks: true, stateTexts: stateTextRefs(e.stateTexts) });
		expect(r.befunde.filter((b) => b.schwere === 'fehler')).toEqual([]);
		expect(r.befunde.filter((b) => b.code === 'aks')).toEqual([]);
		expect(r.projekt).toBe('Projekt');
		expect(r.layout).toBe('2.3');
		expect(r.geraete).toEqual([3017021]);
	});

	it('findet die typischen Fehler', () => {
		const text = [
			...KOPF,
			'AI1;100;AI1;0;1;Temperatur;;;;N;;;;;;;',
			'AI1;100;AI1;0;1;Temperatur doppelt;;;;N;;;;;62;;98',
			'BO1;100;BO1;4;1;;;;;Y;;;;;;;300',
			'X;5000000;X;999;1;Prop;;;;;;;;;;;',
			`${'A'.repeat(70)};100;${'A'.repeat(70)};5;1;${'B'.repeat(70)};;;;;;;;7;;;`
		].join('\r\n');
		const r = pruefen(text, { aks: true, stateTexts: new Set(['1']) });
		const codes = r.befunde.map((b) => b.code);
		expect(codes).toContain('name-doppelt');
		expect(codes).toContain('id-doppelt');
		expect(codes).toContain('unit-leer');
		expect(codes).toContain('text-leer');
		expect(codes).toContain('desc-leer');
		expect(codes).toContain('nc-kbob');
		expect(codes).toContain('device');
		expect(codes).toContain('typ-kbob');
		expect(codes).toContain('name-lang');
		expect(codes).toContain('desc-lang');
		expect(codes).toContain('text-ref');
		expect(codes).toContain('aks');
		expect(codes).toContain('layout');
		expect(codes).toContain('dev-fehlt');
		// Fehler stehen vor Warnungen
		expect(r.befunde[0].schwere).toBe('fehler');
	});

	it('erkennt Komma als Trenner und Anführungszeichen', () => {
		const text = [
			'# keyname,device obj.-instance,object-name,object-type,object-instance,description',
			'a,1,a,8,1,"Gerät, Halle"'
		].join('\n');
		const r = pruefen(text);
		expect(r.trenner).toBe(',');
		expect(r.objekte[0].beschreibung).toBe('Gerät, Halle');
	});

	it('meldet fehlende Kopfzeile', () => {
		expect(pruefen('foo;bar\n1;2').befunde[0].code).toBe('kopf');
	});
});
