/* EDE-Dateien (B.I.G.-EU, Layout 2.x) gegen KBOB-Vorgaben prüfen.
 *
 * Läuft vollständig im Browser. Geprüft wird, was sich aus der Datei sicher
 * ablesen lässt: Eindeutigkeit, Längen, Bereiche, fehlende Texte und Einheiten,
 * Meldeklassen ausserhalb der KBOB-Nummern, Objektnamen nach AKS.
 */

import { zerlegen, type Lang } from './aks';
import { kategorieVonNc } from './kbob-funktionen';

export type Schwere = 'fehler' | 'warnung' | 'hinweis';

export interface Befund {
	schwere: Schwere;
	/** Zeile in der Datei, 1-basiert; 0 = ganze Datei */
	zeile: number;
	objekt?: string;
	code: string;
	de: string;
	en: string;
}

export interface EdeZeile {
	zeile: number;
	keyname: string;
	device: number;
	name: string;
	typ: number;
	instanz: number;
	beschreibung: string;
	settable: string;
	stateRef: string;
	unit: string;
	nc: string;
}

export interface EdeErgebnis {
	projekt: string;
	layout: string;
	trenner: string;
	objekte: EdeZeile[];
	befunde: Befund[];
	geraete: number[];
	proTyp: Record<number, number>;
}

const TYP_KURZ: Record<number, string> = {
	0: 'AI',
	1: 'AO',
	2: 'AV',
	3: 'BI',
	4: 'BO',
	5: 'BV',
	6: 'CAL',
	8: 'DEV',
	9: 'EE',
	10: 'FIL',
	12: 'LP',
	13: 'MI',
	14: 'MO',
	15: 'NC',
	16: 'PROG',
	17: 'SC',
	19: 'MV',
	20: 'TL',
	25: 'ELOG',
	48: 'PIV'
};

export function typKurz(t: number): string {
	return TYP_KURZ[t] ?? String(t);
}

/** Objekttypen der KBOB-Profile (C1.1). Alles andere ist nicht verboten, aber zu klären. */
const KBOB_TYPEN = new Set(Object.keys(TYP_KURZ).map(Number));
const ANALOG = new Set([0, 1, 2, 12]);
const MIT_TEXT = new Set([3, 4, 5, 13, 14, 19]);
const DI_MAX = 4194302;

/** CSV-Zeile mit Anführungszeichen zerlegen. */
function felder(zeile: string, trenner: string): string[] {
	const out: string[] = [];
	let cur = '';
	let q = false;
	for (let i = 0; i < zeile.length; i++) {
		const c = zeile[i];
		if (q) {
			if (c === '"' && zeile[i + 1] === '"') {
				cur += '"';
				i++;
			} else if (c === '"') q = false;
			else cur += c;
		} else if (c === '"') q = true;
		else if (c === trenner) {
			out.push(cur);
			cur = '';
		} else cur += c;
	}
	out.push(cur);
	return out.map((f) => f.trim());
}

function zeilenVon(text: string): string[] {
	return text.replace(/^\uFEFF/, '').split(/\r?\n/);
}

/** Kopfzeile der Datenpunkte: enthält keyname und object-name. */
function kopfIndex(zeilen: string[]): number {
	return zeilen.findIndex((z) => /keyname/i.test(z) && /object.?name/i.test(z));
}

function spalte(kopf: string[], ...muster: RegExp[]): number {
	return kopf.findIndex((k) => muster.some((m) => m.test(k)));
}

/** State-Texts-Datei: Referenznummern einlesen. */
export function stateTextRefs(text: string): Set<string> {
	const refs = new Set<string>();
	const z = zeilenVon(text);
	const trenner = (z.find((l) => l.trim() && !l.startsWith('#')) ?? ';').includes(';') ? ';' : ',';
	for (const l of z) {
		if (!l.trim() || l.trim().startsWith('#')) continue;
		const f = felder(l, trenner);
		if (/^\d+$/.test(f[0])) refs.add(String(Number(f[0])));
	}
	return refs;
}

export interface PruefOptionen {
	/** Objektnamen sollen dem AKS nach KBOB-Leitfaden folgen */
	aks?: boolean;
	/** Beschreibung: Grenze AS-CH 64 statt MBE-CH 128 */
	descMax?: number;
	stateTexts?: Set<string>;
}

export function pruefen(text: string, opt: PruefOptionen = {}): EdeErgebnis {
	const zeilen = zeilenVon(text);
	const befunde: Befund[] = [];
	const add = (b: Befund) => befunde.push(b);

	const kopfZeile = kopfIndex(zeilen);
	const ergebnis: EdeErgebnis = {
		projekt: '',
		layout: '',
		trenner: ';',
		objekte: [],
		befunde,
		geraete: [],
		proTyp: {}
	};
	if (kopfZeile < 0) {
		add({
			schwere: 'fehler',
			zeile: 0,
			code: 'kopf',
			de: 'Keine Kopfzeile mit «keyname» und «object-name» gefunden. Ist das eine EDE-Datei?',
			en: 'No header line with "keyname" and "object-name" found. Is this an EDE file?'
		});
		return ergebnis;
	}
	const trenner = zeilen[kopfZeile].includes(';')
		? ';'
		: zeilen[kopfZeile].includes('\t')
			? '\t'
			: ',';
	ergebnis.trenner = trenner;

	for (const l of zeilen.slice(0, kopfZeile)) {
		const f = felder(l, trenner);
		if (/project.?name/i.test(f[0])) ergebnis.projekt = f[1] ?? '';
		if (/version.?of.?layout/i.test(f[0])) ergebnis.layout = f[1] ?? '';
	}

	const kopf = felder(zeilen[kopfZeile].replace(/^#\s*/, ''), trenner).map((k) => k.toLowerCase());
	const iKey = spalte(kopf, /^keyname/);
	const iDev = spalte(kopf, /device/);
	const iName = spalte(kopf, /^object.?name/);
	const iTyp = spalte(kopf, /^object.?type/);
	const iInst = spalte(kopf, /^object.?instance/);
	const iDesc = spalte(kopf, /^description/);
	const iSet = spalte(kopf, /^settable|^commandable/);
	const iState = spalte(kopf, /state.?text/);
	const iUnit = spalte(kopf, /^unit/);
	const iNc = spalte(kopf, /notification/);
	if ([iKey, iDev, iName, iTyp, iInst].some((i) => i < 0)) {
		add({
			schwere: 'fehler',
			zeile: kopfZeile + 1,
			code: 'pflichtspalten',
			de: 'Pflichtspalten fehlen: keyname, device obj.-instance, object-name, object-type, object-instance',
			en: 'Mandatory columns missing: keyname, device obj.-instance, object-name, object-type, object-instance'
		});
		return ergebnis;
	}

	const descMax = opt.descMax ?? 64;
	const namen = new Map<string, number>();
	const ids = new Map<string, number>();
	const geraeteMitDev = new Set<number>();
	const geraete = new Set<number>();

	for (let i = kopfZeile + 1; i < zeilen.length; i++) {
		const roh = zeilen[i];
		if (!roh.trim() || roh.trim().startsWith('#')) continue;
		const f = felder(roh, trenner);
		const nr = i + 1;
		const o: EdeZeile = {
			zeile: nr,
			keyname: f[iKey] ?? '',
			device: Number(f[iDev]),
			name: f[iName] ?? '',
			typ: Number(f[iTyp]),
			instanz: Number(f[iInst]),
			beschreibung: iDesc >= 0 ? (f[iDesc] ?? '') : '',
			settable: iSet >= 0 ? (f[iSet] ?? '') : '',
			stateRef: iState >= 0 ? (f[iState] ?? '') : '',
			unit: iUnit >= 0 ? (f[iUnit] ?? '') : '',
			nc: iNc >= 0 ? (f[iNc] ?? '') : ''
		};
		ergebnis.objekte.push(o);
		const wer = o.name || o.keyname;
		const b = (schwere: Schwere, code: string, de: string, en: string) =>
			add({ schwere, zeile: nr, objekt: wer, code, de, en });

		if (!Number.isInteger(o.device) || o.device < 0 || o.device > DI_MAX)
			b(
				'fehler',
				'device',
				`Device-Instanz «${f[iDev]}» ausserhalb 0 … ${DI_MAX}`,
				`Device instance "${f[iDev]}" outside 0 … ${DI_MAX}`
			);
		else geraete.add(o.device);
		if (!Number.isInteger(o.typ) || o.typ < 0)
			b(
				'fehler',
				'typ',
				`Objekttyp «${f[iTyp]}» ist keine Zahl`,
				`Object type "${f[iTyp]}" is not a number`
			);
		if (!Number.isInteger(o.instanz) || o.instanz < 0 || o.instanz > DI_MAX)
			b(
				'fehler',
				'instanz',
				`Objektinstanz «${f[iInst]}» ausserhalb 0 … ${DI_MAX}`,
				`Object instance "${f[iInst]}" outside 0 … ${DI_MAX}`
			);
		if (o.typ === 8) geraeteMitDev.add(o.device);

		if (!o.name) b('fehler', 'name-leer', 'Object_Name fehlt', 'Object_Name missing');
		else {
			if (o.name.length > 64)
				b(
					'fehler',
					'name-lang',
					`Object_Name hat ${o.name.length} Zeichen, KBOB: höchstens 64`,
					`Object_Name has ${o.name.length} characters, KBOB: at most 64`
				);
			const vor = namen.get(o.name);
			if (vor !== undefined)
				b(
					'fehler',
					'name-doppelt',
					`Object_Name doppelt, schon in Zeile ${vor}. Muss im ganzen Netz eindeutig sein`,
					`Duplicate Object_Name, already in line ${vor}. Must be unique across the network`
				);
			else namen.set(o.name, nr);
			if (opt.aks && o.typ !== 15) {
				const z = zerlegen(o.name);
				const t = z.teile;
				const voll = t.objekt && t.btaArt && (o.typ === 8 ? t.apparatArt : t.funktionArt);
				if (z.rest.length || z.fehler.length || !voll)
					b(
						'warnung',
						'aks',
						'Objektname folgt nicht dem AKS-Muster NNNN_AAX_ANN_ANNN_AN',
						'Object name does not follow the labelling pattern NNNN_AAX_ANN_ANNN_AN'
					);
			}
		}
		if (o.keyname && o.name && o.keyname !== o.name)
			b(
				'hinweis',
				'keyname',
				'keyname weicht vom Object_Name ab',
				'keyname differs from Object_Name'
			);

		const id = `${o.device}:${o.typ}:${o.instanz}`;
		const vorId = ids.get(id);
		if (vorId !== undefined)
			b(
				'fehler',
				'id-doppelt',
				`Gleicher Typ und gleiche Instanz im selben Gerät wie Zeile ${vorId}`,
				`Same type and instance in the same device as line ${vorId}`
			);
		else ids.set(id, nr);

		if (Number.isInteger(o.typ) && !KBOB_TYPEN.has(o.typ))
			b(
				o.typ >= 128 ? 'warnung' : 'hinweis',
				'typ-kbob',
				o.typ >= 128
					? `Proprietärer Objekttyp ${o.typ}: für KBOB-GA-Funktionen nicht zulässig`
					: `Objekttyp ${o.typ} gehört nicht zu den KBOB-Profilen; mit Bauherr klären`,
				o.typ >= 128
					? `Proprietary object type ${o.typ}: not allowed for KBOB BA functions`
					: `Object type ${o.typ} is not part of the KBOB profiles; clarify with owner`
			);

		if (iDesc >= 0) {
			if (!o.beschreibung && o.typ !== 15)
				b('warnung', 'desc-leer', 'Description fehlt', 'Description missing');
			else if (o.beschreibung.length > descMax)
				b(
					'warnung',
					'desc-lang',
					`Description hat ${o.beschreibung.length} Zeichen, AS-CH: ${descMax}`,
					`Description has ${o.beschreibung.length} characters, AS-CH: ${descMax}`
				);
		}

		if (ANALOG.has(o.typ) && iUnit >= 0) {
			if (!o.unit)
				b('warnung', 'unit-leer', 'Einheit (unit-code) fehlt', 'Unit (unit-code) missing');
			else if (o.unit === '95' && o.typ !== 12)
				b(
					'hinweis',
					'unit-95',
					'Einheit «no-units» bei einem Messwert, gewollt?',
					'Unit "no-units" on a measured value, intended?'
				);
		}

		if (MIT_TEXT.has(o.typ) && iState >= 0) {
			if (!o.stateRef)
				b(
					'warnung',
					'text-leer',
					'Zustandstext fehlt; KBOB verlangt Texte für binäre und Multi-state-Objekte',
					'State text missing; KBOB requires texts for binary and multi-state objects'
				);
			else if (opt.stateTexts && !opt.stateTexts.has(String(Number(o.stateRef))))
				b(
					'fehler',
					'text-ref',
					`Zustandstext-Referenz ${o.stateRef} fehlt in der StateTexts-Datei`,
					`State text reference ${o.stateRef} missing in the StateTexts file`
				);
		}

		if (o.nc) {
			const n = Number(o.nc);
			if (!Number.isInteger(n))
				b(
					'fehler',
					'nc',
					`Meldeklasse «${o.nc}» ist keine Zahl`,
					`Notification class "${o.nc}" is not a number`
				);
			else if (!kategorieVonNc(n))
				b(
					'warnung',
					'nc-kbob',
					`NC${n} ist keine KBOB-Meldeklasse; als eigene Klasse mit dem Bauherrn abstimmen`,
					`NC${n} is not a KBOB notification class; agree as own class with the owner`
				);
		}
		if (o.typ !== undefined && Number.isInteger(o.typ))
			ergebnis.proTyp[o.typ] = (ergebnis.proTyp[o.typ] ?? 0) + 1;
	}

	ergebnis.geraete = [...geraete].sort((a, b) => a - b);
	for (const d of ergebnis.geraete)
		if (!geraeteMitDev.has(d))
			add({
				schwere: 'hinweis',
				zeile: 0,
				code: 'dev-fehlt',
				de: `Gerät ${d} hat keine Zeile für das Device-Objekt`,
				en: `Device ${d} has no line for the device object`
			});
	if (ergebnis.objekte.length === 0)
		add({
			schwere: 'fehler',
			zeile: 0,
			code: 'leer',
			de: 'Keine Datenpunkte gefunden',
			en: 'No data points found'
		});
	if (ergebnis.layout && Number.parseFloat(ergebnis.layout) < 2.3)
		add({
			schwere: 'hinweis',
			zeile: 0,
			code: 'layout',
			de: `Layout-Version ${ergebnis.layout}; KBOB verlangt EDE nach BIG-EU ab 2.3`,
			en: `Layout version ${ergebnis.layout}; KBOB requires EDE per BIG-EU from 2.3`
		});
	befunde.sort(
		(a, b) =>
			['fehler', 'warnung', 'hinweis'].indexOf(a.schwere) -
				['fehler', 'warnung', 'hinweis'].indexOf(b.schwere) || a.zeile - b.zeile
	);
	return ergebnis;
}

export function befundText(b: Befund, lang: Lang): string {
	return lang === 'de' ? b.de : b.en;
}
