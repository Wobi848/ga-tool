import { describe, it, expect } from 'vitest';
import {
	generieren,
	neuesProjekt,
	exportCsv,
	exportEde,
	alarmliste,
	exportAlarmCsv,
	type Projekt
} from './dpl';
import { GA_FUNKTIONEN, ackRequired, notifyType, kategorieVonNc } from './kbob-funktionen';

function projekt(): Projekt {
	const p = neuesProjekt();
	p.anlagen = [
		{
			id: 'a1',
			btaArt: 'L',
			btaNr: '13',
			name: 'Lüftung Büro',
			funktionen: [
				{
					id: 'f0',
					key: 'as',
					bezeichnung: 'AS',
					apparatArt: 'D',
					apparatNr: '001',
					optional: true
				},
				{
					id: 'f1',
					key: 'anlageschalter',
					bezeichnung: 'Anlage',
					apparatArt: 'S',
					apparatNr: '010',
					stufen: 2,
					optional: false
				},
				{
					id: 'f2',
					key: 'antrieb',
					bezeichnung: 'Zuluftventilator',
					apparatArt: 'M',
					apparatNr: '100',
					optional: true
				},
				{
					id: 'f3',
					key: 'messwert',
					bezeichnung: 'Zulufttemperatur',
					apparatArt: 'B',
					apparatNr: '802',
					messgroesse: 'temp',
					optional: true
				},
				{
					id: 'f4',
					key: 'messwert',
					bezeichnung: 'Zuluftmenge',
					apparatArt: 'B',
					apparatNr: '870',
					messgroesse: 'volLuft',
					max: 5000,
					optional: false
				}
			]
		}
	];
	return p;
}

describe('KBOB-Meldeklassen', () => {
	it('Ack_Required nach Tab. 8', () => {
		expect(ackRequired(96)).toEqual([false, false, false]);
		expect(ackRequired(97)).toEqual([false, true, false]);
		expect(ackRequired(98)).toEqual([true, true, false]);
		expect(ackRequired(99)).toEqual([true, true, true]);
		expect(ackRequired(193)).toEqual([false, true, false]);
		expect(ackRequired(225)).toEqual([false, true, false]);
		expect(ackRequired(50)).toBeNull();
	});

	it('Notify_Type Event ab Trenddaten', () => {
		expect(notifyType(163)).toBe('ALARM');
		expect(notifyType(192)).toBe('EVENT');
	});

	it('Kategorie aus der Nummer', () => {
		expect(kategorieVonNc(3)).toBe('personen');
		expect(kategorieVonNc(131)).toBe('wartung');
		expect(kategorieVonNc(194)).toBeNull();
	});
});

describe('GA-Funktionen', () => {
	it('jede Funktion hat mindestens ein Pflichtobjekt oder ist rein bauherrenspezifisch', () => {
		for (const f of GA_FUNKTIONEN) {
			const o = f.objekte(f.stufen?.standard ?? 1);
			expect(o.length, f.key).toBeGreaterThan(0);
			expect(new Set(o.map((x) => x.id)).size, `${f.key}: ids eindeutig`).toBe(o.length);
		}
	});

	it('Pflichtobjekte wie in KBOB 7.2', () => {
		const pflicht = (k: string, n = 1) =>
			GA_FUNKTIONEN.find((f) => f.key === k)!
				.objekte(n)
				.filter((o) => o.pflicht)
				.map((o) => o.typ);
		expect(pflicht('anlageschalter')).toEqual(['MV', 'MI', 'SC']);
		expect(pflicht('antrieb', 2)).toEqual(['BO', 'BO']);
		expect(pflicht('antrieb-stetig')).toEqual(['BO', 'AO']);
		expect(pflicht('stellorgan-3p')).toEqual(['BO', 'BO']);
		expect(pflicht('messwert')).toEqual(['AI']);
		expect(pflicht('regler')).toEqual(['LP']);
		expect(pflicht('zaehler')).toEqual(['AV']);
		expect(pflicht('sgk')).toEqual([]);
	});

	it('Anlageschalter: MV ohne Auto, MI mit Auto', () => {
		const o = GA_FUNKTIONEN.find((f) => f.key === 'anlageschalter')!.objekte(2);
		expect(o.find((x) => x.typ === 'MV')!.zustaende!.de).toEqual(['Aus', 'Stufe 1', 'Stufe 2']);
		expect(o.find((x) => x.typ === 'MI')!.zustaende!.de).toEqual([
			'Auto',
			'Aus',
			'Stufe 1',
			'Stufe 2'
		]);
	});
});

describe('Datenpunktliste generieren', () => {
	const z = generieren(projekt());

	it('Objektnamen nach AKS, Funktionsnummern ab 0', () => {
		expect(z.find((x) => x.typ === 'BO')!.objektname).toBe('3022_HZ1_L13_M100_S0');
		expect(z.find((x) => x.typ === 'MV')!.objektname).toBe('3022_HZ1_L13_S010_H0');
		expect(z.find((x) => x.typ === 'DEV')!.objektname).toBe('3022_HZ1_L13_D001');
	});

	it('Device-Instanz ist die Device-ID, sonst fortlaufend je Typ', () => {
		expect(z.find((x) => x.typ === 'DEV')!.instanz).toBe(3017021);
		expect(z.filter((x) => x.typ === 'AI').map((x) => x.instanz)).toEqual([1, 2]);
	});

	it('ohne Optionen nur Pflichtobjekte', () => {
		const f4 = z.filter((x) => x.funktion === 'Zuluftmenge');
		expect(f4.map((x) => x.typ)).toEqual(['AI']);
	});

	it('COV-Schwelle Luft = 10 % vom Maximalwert', () => {
		expect(z.find((x) => x.funktion === 'Zuluftmenge')!.cov).toBe('500');
	});

	it('Meldeklassen nach Kategorie und Watchdog fest in NC224', () => {
		const stoer = z.find((x) => x.beschreibung === 'Zuluftventilator Störung Antrieb')!;
		expect(stoer.nc).toBe(98);
		expect(stoer.ack).toEqual([true, true, false]);
		expect(z.find((x) => x.beschreibung === 'AS Watchdog')!.nc).toBe(224);
	});

	it('Trend Log verweist auf das Objekt, binär als COV', () => {
		const tl = z.find((x) => x.typ === 'TL' && x.funktion === 'Zuluftventilator')!;
		expect(tl.trendVon).toBe('3022_HZ1_L13_M100_S0');
		expect(tl.trendArt).toBe('COV');
		const tlT = z.find((x) => x.typ === 'TL' && x.funktion === 'Zulufttemperatur')!;
		expect(tlT.trendArt).toBe('POLLED 15 min');
	});

	it('legt NC-Objekte für alle genutzten Klassen an', () => {
		const nc = z.filter((x) => x.typ === 'NC').map((x) => x.instanz);
		expect(nc).toContain(98);
		expect(nc).toContain(224);
		expect(nc).toEqual([...nc].sort((a, b) => a - b));
	});

	it('keine doppelten Namen', () => {
		expect(z.filter((x) => x.warnung?.some((w) => w.includes('doppelt')))).toEqual([]);
	});

	it('markiert doppelte Namen', () => {
		const p = projekt();
		p.anlagen[0].funktionen.push({ ...p.anlagen[0].funktionen[3], id: 'dup' });
		p.fktNrAb = 0;
		// gleicher Apparat → Zähler läuft weiter, also kein Duplikat
		expect(generieren(p).some((x) => x.warnung?.length)).toBe(false);
		p.anlagen.push({ ...p.anlagen[0], id: 'a2' });
		expect(generieren(p).some((x) => x.warnung?.includes('Objektname doppelt'))).toBe(true);
	});
});

describe('Export', () => {
	const p = projekt();
	const z = generieren(p);

	it('CSV mit Kopfzeile und Semikolon', () => {
		const c = exportCsv(z).split('\r\n');
		expect(c[0].startsWith('Objektname;Typ;Instanz')).toBe(true);
		expect(c.length).toBe(z.length + 2);
	});

	it('EDE Layout 2.3', () => {
		const e = exportEde(p, z, 'Test', new Date('2026-10-17T10:00:00Z'));
		const l = e.ede.split('\r\n');
		expect(l[0]).toBe('PROJECT_NAME;Projekt');
		expect(l[4]).toBe('VERSION_OF_LAYOUT;2.3');
		expect(
			l[6].startsWith('# keyname;device obj.-instance;object-name;object-type;object-instance')
		).toBe(true);
		const bo = l.find((x) => x.startsWith('3022_HZ1_L13_M100_S0;'))!.split(';');
		expect(bo[1]).toBe('3017021');
		expect(bo[3]).toBe('4'); // binary-output
		expect(bo[9]).toBe('Y');
		// Zustandstext Aus/Ein ist referenziert
		const st = e.stateTexts.split('\r\n').find((x) => x.endsWith(';Aus;Ein'))!;
		expect(bo[13]).toBe(st.split(';')[0]);
		expect(e.units).toContain('62;°C');
		expect(e.objTypes).toContain('4;binary-output');
	});

	it('Alarmliste enthält nur Objekte mit Meldeklasse', () => {
		const a = alarmliste(z);
		expect(a.length).toBeGreaterThan(0);
		expect(a.every((x) => x.nc !== undefined && x.typ !== 'NC')).toBe(true);
		expect(exportAlarmCsv(z).split('\r\n')[0]).toContain('Quittieren OFFNORMAL');
	});
});
