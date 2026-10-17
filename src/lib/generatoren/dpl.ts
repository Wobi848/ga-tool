/* BACnet-Datenpunktliste aus GA-Funktionen nach KBOB.
 *
 * Projekt → Anlagen → GA-Funktionen → BACnet-Objekte. Objektnamen nach
 * KBOB-Leitfaden (AKS), Meldeklassen über die Kategorie, Trends nach
 * KBOB Kap. 6.6. Export als CSV und als EDE-Dateien (B.I.G.-EU, Layout 2.3).
 */

import { objektname, type Lang } from './aks';
import {
	GA_FUNKTION_MAP,
	MESSGROESSEN,
	NC_VORSCHLAG,
	OBJ_TYP_CODE,
	OBJ_TYP_NAME,
	KATEGORIEN,
	ackRequired,
	covText,
	kategorieVonNc,
	notifyType,
	type Kategorie,
	type ObjTyp
} from './kbob-funktionen';

export interface FunktionEintrag {
	id: string;
	key: string;
	bezeichnung: string;
	apparatArt: string;
	apparatNr: string;
	stufen?: number;
	messgroesse?: string;
	/** Messbereich oben, für COV «10 % von max» und EDE max-present-value */
	max?: number;
	/** bauherrenspezifische Objekte mit erzeugen */
	optional: boolean;
	/** einzeln abgewählte optionale Objekte (Vorlagen-ids) */
	ohne?: string[];
}

export interface AnlageEintrag {
	id: string;
	btaArt: string;
	btaNr: string;
	name: string;
	funktionen: FunktionEintrag[];
}

export interface Projekt {
	name: string;
	anlage: string;
	objekt: string;
	ebene: string;
	deviceId: number;
	/** Funktionsnummern ab 0 (wie KBOB-Beispiel S0) oder ab 1 */
	fktNrAb: 0 | 1;
	nc: Record<Kategorie, number>;
	anlagen: AnlageEintrag[];
}

export function neuesProjekt(): Projekt {
	return {
		name: 'Projekt',
		anlage: '3022',
		objekt: 'HZ',
		ebene: '1',
		deviceId: 3017021,
		fktNrAb: 0,
		nc: { ...NC_VORSCHLAG },
		anlagen: []
	};
}

export interface Zeile {
	objektname: string;
	typ: ObjTyp;
	instanz: number;
	beschreibung: string;
	pflicht: boolean;
	/** Anlage und Funktion, für Gruppierung */
	anlage: string;
	funktion: string;
	unitCode?: number;
	einheit?: string;
	inaktiv?: string;
	aktiv?: string;
	zustaende?: string[];
	alarmValue?: string;
	nc?: number;
	notify?: 'ALARM' | 'EVENT';
	ack?: [boolean, boolean, boolean];
	settable: boolean;
	priorityArray: boolean;
	cov?: string;
	max?: number;
	/** bei Trend Logs: Objektname des aufgezeichneten Objekts */
	trendVon?: string;
	trendArt?: string;
	hinweis?: string;
	warnung?: string[];
}

function txt(t: [string, string] | undefined, lang: Lang): string | undefined {
	return t ? (lang === 'de' ? t[0] : t[1]) : undefined;
}

const LAENGE_NAME = 64;
const LAENGE_DESC = 64; // AS-CH

export function generieren(p: Projekt, lang: Lang = 'de'): Zeile[] {
	const zeilen: Zeile[] = [];
	const instanz: Partial<Record<ObjTyp, number>> = {};
	const naechste = (typ: ObjTyp) => (instanz[typ] = (instanz[typ] ?? 0) + 1);
	const ort = { anlage: p.anlage, objekt: p.objekt, ebene: p.ebene };
	const genutzteNc = new Set<number>();
	let hatAs = false;

	for (const a of p.anlagen) {
		const fktZaehler = new Map<string, number>();
		for (const f of a.funktionen) {
			const def = GA_FUNKTION_MAP[f.key];
			if (!def) continue;
			if (f.key === 'as') hatAs = true;
			const stufen = def.stufen
				? Math.min(def.stufen.max, Math.max(def.stufen.min, f.stufen ?? def.stufen.standard))
				: 1;
			const vorlagen = def
				.objekte(stufen)
				.filter((v) => v.pflicht || (f.optional && !(f.ohne ?? []).includes(v.id)));
			const namen = new Map<string, string>();

			for (const v of vorlagen) {
				const warnung: string[] = [];
				let name: string;
				const basis = {
					...ort,
					btaArt: a.btaArt,
					btaNr: a.btaNr,
					apparatArt: f.apparatArt,
					apparatNr: f.apparatNr
				};
				if (v.typ === 'DEV') {
					name = objektname(basis);
				} else {
					const k = `${f.apparatArt}${f.apparatNr}:${v.fkt}`;
					const n = fktZaehler.get(k) ?? p.fktNrAb;
					fktZaehler.set(k, n + 1);
					if (n > 9)
						warnung.push(
							lang === 'de'
								? 'mehr als 10 Funktionen dieser Art am Apparat'
								: 'more than 10 functions of this type on the device'
						);
					name = objektname({ ...basis, funktionArt: v.fkt, funktionNr: String(n % 10) });
				}
				namen.set(v.id, name);

				const mgKey =
					v.messgroesse ??
					(['AI', 'AO', 'AV'].includes(v.typ) ? (f.messgroesse ?? def.messgroesse) : undefined);
				const mg = mgKey ? MESSGROESSEN[mgKey] : undefined;
				const nc = v.ncFest ?? (v.kategorie ? p.nc[v.kategorie] : undefined);
				if (nc !== undefined) genutzteNc.add(nc);

				const beschreibung =
					`${f.bezeichnung || (lang === 'de' ? def.de : def.en)} ${lang === 'de' ? v.de : v.en}`.trim();
				if (name.length > LAENGE_NAME) warnung.push(`Object_Name > ${LAENGE_NAME}`);
				if (beschreibung.length > LAENGE_DESC) warnung.push(`Description > ${LAENGE_DESC} (AS-CH)`);

				const z: Zeile = {
					objektname: name,
					typ: v.typ,
					instanz: v.typ === 'DEV' ? p.deviceId : naechste(v.typ),
					beschreibung,
					pflicht: v.pflicht,
					anlage: `${a.btaArt}${a.btaNr} ${a.name}`.trim(),
					funktion: f.bezeichnung || (lang === 'de' ? def.de : def.en),
					settable: !!v.settable,
					priorityArray: !!v.priorityArray,
					hinweis: txt(v.hinweis, lang),
					warnung: warnung.length ? warnung : undefined
				};
				if (mg && ['AI', 'AO', 'AV', 'PIV', 'LP'].includes(v.typ)) {
					z.unitCode = mg.unit;
					z.einheit = mg.symbol;
					if (v.typ !== 'PIV') {
						const c = covText(mg, f.max);
						if (c) z.cov = c;
					}
					if (f.max !== undefined && v.typ !== 'PIV') z.max = f.max;
				}
				if (v.inaktiv) z.inaktiv = txt(v.inaktiv, lang);
				if (v.aktiv) z.aktiv = txt(v.aktiv, lang);
				if (v.zustaende) z.zustaende = lang === 'de' ? v.zustaende.de : v.zustaende.en;
				if (v.alarmValue) z.alarmValue = v.alarmValue;
				if (nc !== undefined) {
					z.nc = nc;
					z.notify = notifyType(nc);
					z.ack = ackRequired(nc) ?? undefined;
				}
				if (v.trendVon) {
					const ziel = vorlagen.find((x) => x.id === v.trendVon);
					z.trendVon = namen.get(v.trendVon);
					if (ziel && ['BI', 'BO', 'BV', 'MI', 'MV'].includes(ziel.typ)) z.trendArt = 'COV';
					else if (mg?.zaehler || (ziel?.typ === 'AV' && f.key === 'zaehler'))
						z.trendArt = lang === 'de' ? 'POLLED 15 min, synchron' : 'POLLED 15 min, aligned';
					else z.trendArt = 'POLLED 15 min';
				}
				zeilen.push(z);
			}
		}
	}

	// Meldeklassen-Objekte für alle genutzten NC, sobald eine AS im Projekt ist.
	if (hatAs) {
		for (const nc of [...genutzteNc].sort((x, y) => x - y)) {
			const k = kategorieVonNc(nc);
			zeilen.push({
				objektname: `${p.anlage}_${p.objekt}${p.ebene}_NC${nc}`,
				typ: 'NC',
				instanz: nc,
				beschreibung: k ? KATEGORIEN[k][lang] : `NC${nc}`,
				pflicht: false,
				anlage: '',
				funktion: lang === 'de' ? 'Meldeklassen' : 'Notification classes',
				settable: false,
				priorityArray: false,
				ack: ackRequired(nc) ?? undefined
			});
		}
	}

	// Doppelte Namen markieren.
	const zaehler = new Map<string, number>();
	for (const z of zeilen) zaehler.set(z.objektname, (zaehler.get(z.objektname) ?? 0) + 1);
	for (const z of zeilen)
		if ((zaehler.get(z.objektname) ?? 0) > 1)
			(z.warnung ??= []).push(lang === 'de' ? 'Objektname doppelt' : 'duplicate object name');

	return zeilen;
}

// ── Export ────────────────────────────────────────────────────────────────

function csvFeld(v: unknown): string {
	const s = v === undefined || v === null ? '' : String(v);
	return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csv(zeilen: unknown[][]): string {
	return zeilen.map((z) => z.map(csvFeld).join(';')).join('\r\n') + '\r\n';
}

const jn = (b: boolean[] | undefined) => (b ? b.map((x) => (x ? '1' : '0')).join('') : '');

/** Vollständige Liste als CSV (Semikolon, für Excel). */
export function exportCsv(zeilen: Zeile[], lang: Lang = 'de'): string {
	const kopf =
		lang === 'de'
			? [
					'Objektname',
					'Typ',
					'Instanz',
					'Beschreibung',
					'Anlage',
					'Funktion',
					'Pflicht KBOB',
					'Einheit',
					'Inactive_Text',
					'Active_Text',
					'State_Text',
					'Alarm_Value',
					'NC',
					'Notify_Type',
					'Ack_Required (OFFNORMAL/FAULT/NORMAL)',
					'Priority_Array',
					'COV_Increment',
					'Trend von',
					'Trend-Art',
					'Hinweis',
					'Warnung'
				]
			: [
					'Object name',
					'Type',
					'Instance',
					'Description',
					'Plant',
					'Function',
					'Mandatory KBOB',
					'Unit',
					'Inactive_Text',
					'Active_Text',
					'State_Text',
					'Alarm_Value',
					'NC',
					'Notify_Type',
					'Ack_Required (OFFNORMAL/FAULT/NORMAL)',
					'Priority_Array',
					'COV_Increment',
					'Trend of',
					'Trend type',
					'Note',
					'Warning'
				];
	return csv([
		kopf,
		...zeilen.map((z) => [
			z.objektname,
			z.typ,
			z.instanz,
			z.beschreibung,
			z.anlage,
			z.funktion,
			z.pflicht ? 'x' : '',
			z.einheit,
			z.inaktiv,
			z.aktiv,
			z.zustaende?.join(' / '),
			z.alarmValue,
			z.nc,
			z.notify,
			jn(z.ack),
			z.priorityArray ? 'x' : '',
			z.cov,
			z.trendVon,
			z.trendArt,
			z.hinweis,
			z.warnung?.join(', ')
		])
	]);
}

/** Alarmliste: alle Objekte mit Meldeklasse. */
export function alarmliste(zeilen: Zeile[]): Zeile[] {
	return zeilen.filter((z) => z.nc !== undefined && z.typ !== 'NC');
}

export function exportAlarmCsv(zeilen: Zeile[], lang: Lang = 'de'): string {
	const kopf =
		lang === 'de'
			? [
					'Objektname',
					'Typ',
					'Beschreibung',
					'Kategorie',
					'NC',
					'Notify_Type',
					'Quittieren OFFNORMAL',
					'Quittieren FAULT',
					'Quittieren NORMAL',
					'Alarmzustand'
				]
			: [
					'Object name',
					'Type',
					'Description',
					'Category',
					'NC',
					'Notify_Type',
					'Ack OFFNORMAL',
					'Ack FAULT',
					'Ack NORMAL',
					'Alarm state'
				];
	return csv([
		kopf,
		...alarmliste(zeilen).map((z) => {
			const k = z.nc !== undefined ? kategorieVonNc(z.nc) : null;
			const zustand =
				z.alarmValue === 'ACTIVE'
					? z.aktiv
					: z.alarmValue === 'INACTIVE'
						? z.inaktiv
						: z.typ === 'EE'
							? 'Event_Parameters'
							: z.typ === 'LP'
								? 'Error_Limit'
								: 'High_/Low_Limit';
			return [
				z.objektname,
				z.typ,
				z.beschreibung,
				k ? KATEGORIEN[k][lang] : '',
				z.nc,
				z.notify,
				z.ack?.[0] ? 'x' : '',
				z.ack?.[1] ? 'x' : '',
				z.ack?.[2] ? 'x' : '',
				zustand
			];
		})
	]);
}

export interface EdeDateien {
	ede: string;
	stateTexts: string;
	units: string;
	objTypes: string;
}

/** EDE nach B.I.G.-EU, Layout 2.3: Haupttabelle, Zustandstexte, Einheiten, Objekttypen. */
export function exportEde(p: Projekt, zeilen: Zeile[], autor = '', jetzt = new Date()): EdeDateien {
	// Zustandstexte deduplizieren; binär und multi-state nie in derselben Zeile.
	const texte = new Map<string, number>();
	const textZeilen: string[][] = [];
	const ref = (werte: string[]) => {
		const k = werte.join('\u0000');
		let r = texte.get(k);
		if (r === undefined) {
			r = textZeilen.length + 1;
			texte.set(k, r);
			textZeilen.push([String(r), ...werte]);
		}
		return r;
	};

	const einheiten = new Map<number, string>();
	const typen = new Set<ObjTyp>();

	const daten = zeilen.map((z) => {
		typen.add(z.typ);
		let st: number | '' = '';
		if (z.zustaende) st = ref(z.zustaende);
		else if (z.inaktiv !== undefined || z.aktiv !== undefined)
			st = ref([z.inaktiv ?? '', z.aktiv ?? '']);
		if (z.unitCode !== undefined) einheiten.set(z.unitCode, z.einheit || 'no-units');
		const objekt = z.typ !== 'DEV' && z.typ !== 'NC';
		return [
			z.objektname,
			p.deviceId,
			z.objektname,
			OBJ_TYP_CODE[z.typ],
			z.instanz,
			z.beschreibung,
			'',
			'',
			z.max ?? '',
			objekt ? (z.settable ? 'Y' : 'N') : '',
			'',
			'',
			'',
			st,
			z.unitCode ?? '',
			'',
			z.nc ?? ''
		];
	});

	const zeit = jetzt.toISOString().slice(0, 16).replace('T', ' ');
	const ede = csv([
		['PROJECT_NAME', p.name],
		['VERSION_OF_REFERENCEFILE', '1'],
		['TIMESTAMP_OF_LAST_CHANGE', zeit],
		['AUTHOR_OF_LAST_CHANGE', autor],
		['VERSION_OF_LAYOUT', '2.3'],
		[
			'#mandatory',
			'mandatory',
			'mandatory',
			'mandatory',
			'mandatory',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional',
			'optional'
		],
		[
			'# keyname',
			'device obj.-instance',
			'object-name',
			'object-type',
			'object-instance',
			'description',
			'present-value-default',
			'min-present-value',
			'max-present-value',
			'settable',
			'supports COV',
			'hi-limit',
			'low-limit',
			'state-text-reference',
			'unit-code',
			'vendor-specific-address',
			'notification-class'
		],
		...daten
	]);
	const maxTexte = Math.max(2, ...textZeilen.map((z) => z.length - 1));
	const stateTexts = csv([
		['#State-Text-Reference', ...Array.from({ length: maxTexte }, (_, i) => `Text ${i + 1}`)],
		...textZeilen
	]);
	const units = csv([
		['#Unit-Code', 'Unit-Text'],
		...[...einheiten.entries()].sort((a, b) => a[0] - b[0])
	]);
	const objTypes = csv([
		['#Object-Type-Code', 'Object-Type'],
		...[...typen]
			.map((t) => [OBJ_TYP_CODE[t], OBJ_TYP_NAME[t]])
			.sort((a, b) => Number(a[0]) - Number(b[0]))
	]);
	return { ede, stateTexts, units, objTypes };
}
