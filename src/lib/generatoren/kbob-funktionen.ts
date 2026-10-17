/* GA-Funktionen nach KBOB-Empfehlung BACnet Anwendung 2021, Kap. 7.2.
 *
 * Jede GA-Funktion besteht aus BACnet-Objekten. Pflicht («■» in der
 * Empfehlung) ist meist nur das Kernobjekt, alle übrigen («□») kann der
 * Bauherr fordern. Zustände und Alarm_Value wie in der Tabelle der Empfehlung.
 *
 * Die Meldekategorie je Objekt ist ein Vorschlag dieser App: Die Zuweisung
 * der Meldeklassen legt laut Kap. 6.2.3 der Bauherr fest. Ausnahme: Watchdog
 * in NC224, das steht so in der Empfehlung.
 */

export type ObjTyp =
	| 'AI'
	| 'AO'
	| 'AV'
	| 'BI'
	| 'BO'
	| 'BV'
	| 'CAL'
	| 'DEV'
	| 'EE'
	| 'LP'
	| 'MI'
	| 'MO'
	| 'NC'
	| 'PROG'
	| 'SC'
	| 'MV'
	| 'TL'
	| 'ELOG'
	| 'PIV';

/** BACnetObjectType, wie in der EDE-Spalte object-type. */
export const OBJ_TYP_CODE: Record<ObjTyp, number> = {
	AI: 0,
	AO: 1,
	AV: 2,
	BI: 3,
	BO: 4,
	BV: 5,
	CAL: 6,
	DEV: 8,
	EE: 9,
	LP: 12,
	MI: 13,
	MO: 14,
	NC: 15,
	PROG: 16,
	SC: 17,
	MV: 19,
	TL: 20,
	ELOG: 25,
	PIV: 48
};

export const OBJ_TYP_NAME: Record<ObjTyp, string> = {
	AI: 'analog-input',
	AO: 'analog-output',
	AV: 'analog-value',
	BI: 'binary-input',
	BO: 'binary-output',
	BV: 'binary-value',
	CAL: 'calendar',
	DEV: 'device',
	EE: 'event-enrollment',
	LP: 'loop',
	MI: 'multi-state-input',
	MO: 'multi-state-output',
	NC: 'notification-class',
	PROG: 'program',
	SC: 'schedule',
	MV: 'multi-state-value',
	TL: 'trend-log',
	ELOG: 'event-log',
	PIV: 'positive-integer-value'
};

/** Meldekategorie; welche NC daraus wird, stellt der Benutzer ein. */
export type Kategorie =
	| 'personen'
	| 'objektschutz'
	| 'alarm'
	| 'stoerung'
	| 'wartung'
	| 'revision'
	| 'trend'
	| 'status';

export const KATEGORIEN: Record<
	Kategorie,
	{ de: string; en: string; basis: number; anzahl: number }
> = {
	personen: { de: 'Personenalarm', en: 'Life safety', basis: 1, anzahl: 4 },
	objektschutz: { de: 'Objektschutz', en: 'Property safety', basis: 32, anzahl: 4 },
	alarm: { de: 'Technischer Alarm', en: 'Technical alarm', basis: 64, anzahl: 4 },
	stoerung: { de: 'Technische Störung', en: 'Technical fault', basis: 96, anzahl: 4 },
	wartung: { de: 'Wartungsmeldung', en: 'Maintenance message', basis: 128, anzahl: 4 },
	revision: { de: 'Revisionsmeldung', en: 'Service message', basis: 160, anzahl: 4 },
	trend: { de: 'Trenddaten', en: 'Trend data', basis: 192, anzahl: 2 },
	status: { de: 'Betriebs-/Statusmeldung', en: 'Operating/status message', basis: 224, anzahl: 2 }
};

/** Vorschlag: NC je Kategorie. Störung NC98 = Störung und Fehler quittieren (Leitfaden-Beispiel). */
export const NC_VORSCHLAG: Record<Kategorie, number> = {
	personen: 3,
	objektschutz: 34,
	alarm: 66,
	stoerung: 98,
	wartung: 128,
	revision: 160,
	trend: 192,
	status: 224
};

export function kategorieVonNc(nc: number): Kategorie | null {
	for (const [k, v] of Object.entries(KATEGORIEN) as [
		Kategorie,
		(typeof KATEGORIEN)[Kategorie]
	][]) {
		if (nc >= v.basis && nc < v.basis + v.anzahl) return k;
	}
	return null;
}

/** Quittierpflicht nach Tab. 8: [TO-OFFNORMAL, TO-FAULT, TO-NORMAL]. */
export function ackRequired(nc: number): [boolean, boolean, boolean] | null {
	const k = kategorieVonNc(nc);
	if (!k) return null;
	const i = nc - KATEGORIEN[k].basis;
	return [
		[false, false, false],
		[false, true, false],
		[true, true, false],
		[true, true, true]
	][i] as [boolean, boolean, boolean];
}

/** Notify_Type nach Leitfaden Tab. 4: Event ab Trenddaten. */
export function notifyType(nc: number): 'ALARM' | 'EVENT' {
	return nc >= 192 ? 'EVENT' : 'ALARM';
}

// ── Messgrössen ───────────────────────────────────────────────────────────

export interface Messgroesse {
	de: string;
	en: string;
	/** BACnetEngineeringUnits */
	unit: number;
	symbol: string;
	/** COV-Schwelle nach KBOB Tab. 14, wenn dort genannt */
	cov?: number;
	/** Volumenstrom Luft: 10 % des Maximalwerts */
	covProzentMax?: number;
	/** Zählwert: zeitgetriggert, Energiezähler synchron */
	zaehler?: boolean;
}

export const MESSGROESSEN: Record<string, Messgroesse> = {
	tempRaum: { de: 'Raumtemperatur', en: 'Room temperature', unit: 62, symbol: '°C', cov: 0.2 },
	tempKaelte: {
		de: 'Temperatur Kälte',
		en: 'Temperature, cooling',
		unit: 62,
		symbol: '°C',
		cov: 0.1
	},
	temp: { de: 'Temperatur', en: 'Temperature', unit: 62, symbol: '°C' },
	feuchte: { de: 'Relative Feuchte', en: 'Relative humidity', unit: 29, symbol: '%rF', cov: 2 },
	luftdruck: { de: 'Luftdruck', en: 'Air pressure', unit: 53, symbol: 'Pa', cov: 20 },
	wasserdruck: { de: 'Wasserdruck', en: 'Water pressure', unit: 55, symbol: 'bar', cov: 0.1 },
	volWasser: { de: 'Volumenstrom Wasser', en: 'Water flow', unit: 135, symbol: 'm³/h', cov: 1 },
	volLuft: {
		de: 'Volumenstrom Luft',
		en: 'Air flow',
		unit: 135,
		symbol: 'm³/h',
		covProzentMax: 10
	},
	co2: { de: 'CO₂', en: 'CO₂', unit: 96, symbol: 'ppm', cov: 50 },
	leistungEl: {
		de: 'Elektrische Leistung',
		en: 'Electrical power',
		unit: 48,
		symbol: 'kW',
		cov: 1
	},
	leistungTh: { de: 'Thermische Leistung', en: 'Thermal power', unit: 48, symbol: 'kW' },
	stellsignal: { de: 'Stellsignal', en: 'Output signal', unit: 98, symbol: '%', cov: 2 },
	energieKwh: { de: 'Energie', en: 'Energy', unit: 19, symbol: 'kWh', zaehler: true },
	energieMwh: { de: 'Energie', en: 'Energy', unit: 146, symbol: 'MWh', zaehler: true },
	volumen: { de: 'Volumen', en: 'Volume', unit: 80, symbol: 'm³', zaehler: true },
	stunden: { de: 'Betriebsstunden', en: 'Run hours', unit: 71, symbol: 'h' },
	ohne: { de: 'ohne Einheit', en: 'no units', unit: 95, symbol: '' }
};

/** COV-Schwelle als Text, z.B. «0.2» oder «10 % von max». */
export function covText(m: Messgroesse, max?: number): string {
	if (m.cov !== undefined) return String(m.cov);
	if (m.covProzentMax !== undefined)
		return max ? String(Math.round((max * m.covProzentMax) / 100)) : `${m.covProzentMax} % max`;
	return '';
}

// ── Vorlagen ──────────────────────────────────────────────────────────────

type T2 = [string, string];

export interface ObjVorlage {
	/** innerhalb der Funktion eindeutig */
	id: string;
	typ: ObjTyp;
	de: string;
	en: string;
	pflicht: boolean;
	/** AKS-Funktionsart, z.B. S Schaltbefehl, M Messwert */
	fkt: string;
	inaktiv?: T2;
	aktiv?: T2;
	/** Multi-state: Zustände ab 1 */
	zustaende?: { de: string[]; en: string[] };
	alarmValue?: 'ACTIVE' | 'INACTIVE';
	/** Meldet über eine Notification Class */
	kategorie?: Kategorie;
	/** feste NC laut Empfehlung (Watchdog) */
	ncFest?: number;
	/** Analogobjekt: Messgrösse aus MESSGROESSEN, sonst die der Funktion */
	messgroesse?: string;
	/** Trend Log: id des aufgezeichneten Objekts */
	trendVon?: string;
	/** Hinweis aus der Empfehlung */
	hinweis?: T2;
	/** Schreibbar ab Leitsystem (EDE settable) */
	settable?: boolean;
	priorityArray?: boolean;
}

export interface GaFunktion {
	key: string;
	de: string;
	en: string;
	gruppe: 'system' | 'anlage' | 'feld';
	/** Vorschlag Apparat nach MSRL-Technik */
	apparat: { art: string; nr: string };
	/** Stufenzahl wählbar (Anlageschalter, Antrieb) */
	stufen?: { min: number; max: number; standard: number };
	/** Messgrösse wählbar */
	messgroesse?: string;
	objekte: (stufen: number) => ObjVorlage[];
}

const AUS_EIN: { inaktiv: T2; aktiv: T2 } = { inaktiv: ['Aus', 'Off'], aktiv: ['Ein', 'On'] };
const NORMAL_STOERUNG = (akt: T2 = ['Ausgelöst', 'Tripped']) => ({
	inaktiv: ['Normal', 'Normal'] as T2,
	aktiv: akt,
	alarmValue: 'ACTIVE' as const
});
/** Ruhestromprinzip: Normal = ACTIVE, Ausgelöst = INACTIVE */
const RUHESTROM: Pick<ObjVorlage, 'inaktiv' | 'aktiv' | 'alarmValue'> = {
	inaktiv: ['Ausgelöst', 'Tripped'],
	aktiv: ['Normal', 'Normal'],
	alarmValue: 'INACTIVE'
};

function stufenTexte(n: number, mitAuto: boolean): { de: string[]; en: string[] } {
	const de = mitAuto ? ['Auto', 'Aus'] : ['Aus'];
	const en = mitAuto ? ['Auto', 'Off'] : ['Off'];
	if (n === 1) {
		de.push('Ein');
		en.push('On');
	} else
		for (let i = 1; i <= n; i++) {
			de.push(`Stufe ${i}`);
			en.push(`Stage ${i}`);
		}
	return { de, en };
}

const handbetrieb: ObjVorlage = {
	id: 'hand',
	typ: 'BV',
	de: 'Handbetrieb',
	en: 'Manual mode',
	pflicht: false,
	fkt: 'H',
	inaktiv: ['Auto', 'Auto'],
	aktiv: ['Hand', 'Manual'],
	alarmValue: 'ACTIVE',
	kategorie: 'status'
};

const revision: ObjVorlage = {
	id: 'revision',
	typ: 'BI',
	de: 'Revisionsschalter',
	en: 'Maintenance switch',
	pflicht: false,
	fkt: 'D',
	inaktiv: ['Wartung', 'Maintenance'],
	aktiv: ['Normal', 'Normal'],
	alarmValue: 'INACTIVE',
	kategorie: 'revision'
};

const stoerung = (de = 'Störung', en = 'Fault'): ObjVorlage => ({
	id: 'stoerung',
	typ: 'BV',
	de,
	en,
	pflicht: false,
	fkt: 'H',
	...NORMAL_STOERUNG(['Störung', 'Fault']),
	kategorie: 'stoerung'
});

function antriebStufe(s: number, mehrstufig: boolean): ObjVorlage[] {
	const suf = mehrstufig ? ` Stufe ${s}` : '';
	const sufEn = mehrstufig ? ` stage ${s}` : '';
	const id = mehrstufig ? `bo${s}` : 'bo';
	const o: ObjVorlage[] = [
		{
			id,
			typ: 'BO',
			de: `Schaltbefehl${suf}`,
			en: `Switching command${sufEn}`,
			pflicht: true,
			fkt: 'S',
			...AUS_EIN,
			priorityArray: true,
			settable: true,
			hinweis: [
				'Feedback_Value = Betriebsrückmeldung, Elapsed_Active_Time = Betriebsstunden',
				'Feedback_Value = run feedback, Elapsed_Active_Time = run hours'
			]
		},
		{
			id: `tl-${id}`,
			typ: 'TL',
			de: `Aufzeichnung Betriebsrückmeldung${suf}`,
			en: `Log run feedback${sufEn}`,
			pflicht: false,
			fkt: 'T',
			trendVon: id
		},
		{
			id: `ee-${id}`,
			typ: 'EE',
			de: `Instandhaltungsmeldung${suf}`,
			en: `Maintenance message${sufEn}`,
			pflicht: false,
			fkt: 'H',
			kategorie: 'wartung',
			hinweis: [
				'UNSIGNED_OUT_OF_RANGE auf Elapsed_Active_Time, pHighLimit = Wartungsintervall',
				'UNSIGNED_OUT_OF_RANGE on Elapsed_Active_Time, pHighLimit = maintenance interval'
			]
		}
	];
	if (mehrstufig)
		o.push({
			id: `piv-${id}`,
			typ: 'PIV',
			de: `Betriebsdauer${suf}`,
			en: `Run time${sufEn}`,
			pflicht: false,
			fkt: 'W',
			messgroesse: 'stunden'
		});
	return o;
}

const antriebRest = (): ObjVorlage[] => [
	{
		id: 'piv-total',
		typ: 'PIV',
		de: 'Betriebsdauer Aggregat total',
		en: 'Total run time',
		pflicht: false,
		fkt: 'W',
		messgroesse: 'stunden',
		hinweis: ['wird nach Instandhaltung nicht zurückgesetzt', 'not reset after maintenance']
	},
	handbetrieb,
	revision
];

const stellungZuAuf = (): ObjVorlage[] => [
	{
		id: 'zu',
		typ: 'BI',
		de: 'Stellungsrückmeldung ZU',
		en: 'Position feedback CLOSED',
		pflicht: false,
		fkt: 'D',
		inaktiv: ['Inaktiv', 'Inactive'],
		aktiv: ['Zu', 'Closed'],
		alarmValue: 'ACTIVE',
		kategorie: 'status'
	},
	{
		id: 'auf',
		typ: 'BI',
		de: 'Stellungsrückmeldung AUF',
		en: 'Position feedback OPEN',
		pflicht: false,
		fkt: 'D',
		inaktiv: ['Inaktiv', 'Inactive'],
		aktiv: ['Auf', 'Open'],
		alarmValue: 'ACTIVE',
		kategorie: 'status'
	},
	stoerung()
];

const sgkSchutz = (id: string, de: string, en: string): ObjVorlage => ({
	id,
	typ: 'BI',
	de,
	en,
	pflicht: false,
	fkt: 'D',
	...RUHESTROM,
	kategorie: 'stoerung'
});

export const GA_FUNKTIONEN: GaFunktion[] = [
	{
		key: 'as',
		de: 'Automationsstation',
		en: 'Automation station',
		gruppe: 'system',
		apparat: { art: 'D', nr: '001' },
		objekte: () => [
			{ id: 'dev', typ: 'DEV', de: 'Device', en: 'Device', pflicht: true, fkt: '' },
			{
				id: 'cal1',
				typ: 'CAL',
				de: 'Kalender Feiertage',
				en: 'Calendar public holidays',
				pflicht: true,
				fkt: 'K'
			},
			{
				id: 'cal2',
				typ: 'CAL',
				de: 'Kalender Ferien',
				en: 'Calendar vacations',
				pflicht: true,
				fkt: 'K'
			},
			{
				id: 'cal3',
				typ: 'CAL',
				de: 'Kalender halbe Tage',
				en: 'Calendar half days',
				pflicht: true,
				fkt: 'K'
			},
			{
				id: 'elog',
				typ: 'ELOG',
				de: 'Ereignisaufzeichnung',
				en: 'Event log',
				pflicht: false,
				fkt: 'T'
			},
			{
				id: 'cpu',
				typ: 'BV',
				de: 'CPU',
				en: 'CPU',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Normal', 'Normal'],
				aktiv: ['Fehler', 'Error'],
				alarmValue: 'ACTIVE',
				kategorie: 'stoerung'
			},
			{
				id: 'prog',
				typ: 'PROG',
				de: 'Überwachung Programm',
				en: 'Programme monitoring',
				pflicht: false,
				fkt: 'H'
			},
			{
				id: 'batterie',
				typ: 'BV',
				de: 'Batterie',
				en: 'Battery',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Normal', 'Normal'],
				aktiv: ['Fehler', 'Error'],
				alarmValue: 'ACTIVE',
				kategorie: 'stoerung'
			},
			{
				id: 'io',
				typ: 'BV',
				de: 'E/A-Modul',
				en: 'I/O module',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Normal', 'Normal'],
				aktiv: ['Fehler', 'Error'],
				alarmValue: 'ACTIVE',
				kategorie: 'stoerung'
			},
			{
				id: 'io-hand',
				typ: 'BV',
				de: 'Handeingriff E/A-Modul',
				en: 'Manual override I/O module',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Normal', 'Normal'],
				aktiv: ['Hand', 'Manual'],
				alarmValue: 'ACTIVE',
				kategorie: 'status'
			},
			{
				id: 'watchdog',
				typ: 'BV',
				de: 'Watchdog',
				en: 'Watchdog',
				pflicht: false,
				fkt: 'H',
				...AUS_EIN,
				alarmValue: 'ACTIVE',
				ncFest: 224,
				hinweis: [
					'NC224, nicht quittierpflichtig (KBOB 7.2)',
					'NC224, no acknowledgement (KBOB 7.2)'
				]
			},
			{
				id: 'stack',
				typ: 'BV',
				de: 'BACnet-Stack',
				en: 'BACnet stack',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Normal', 'Normal'],
				aktiv: ['Fehler', 'Error'],
				alarmValue: 'ACTIVE',
				kategorie: 'stoerung'
			}
		]
	},
	{
		key: 'sgk',
		de: 'Schaltgerätekombination',
		en: 'Switchgear assembly',
		gruppe: 'system',
		apparat: { art: 'Q', nr: '001' },
		objekte: () => [
			{
				id: 'lts',
				typ: 'BI',
				de: 'Lasttrennschalter',
				en: 'Switch disconnector',
				pflicht: false,
				fkt: 'D',
				...AUS_EIN,
				alarmValue: 'INACTIVE',
				kategorie: 'stoerung'
			},
			sgkSchutz('fi', 'Fehlerstromschutzschalter', 'Residual current device'),
			sgkSchutz('spannung', 'Spannungsüberwachung', 'Voltage monitoring'),
			sgkSchutz('ueberspannung', 'Überspannungsschutz', 'Surge protection'),
			sgkSchutz('ls', 'Leitungsschutzschalter', 'Miniature circuit breaker'),
			sgkSchutz('24v', 'Überwachung 24 V DC', '24 V DC monitoring'),
			{
				id: 'brand',
				typ: 'BI',
				de: 'Brandmeldung',
				en: 'Fire alarm',
				pflicht: false,
				fkt: 'D',
				inaktiv: ['Brand', 'Fire'],
				aktiv: ['Normal', 'Normal'],
				alarmValue: 'INACTIVE',
				kategorie: 'alarm'
			},
			{
				id: 'lokal',
				typ: 'BI',
				de: 'Bedienung lokal',
				en: 'Local operation',
				pflicht: false,
				fkt: 'D',
				inaktiv: ['Hand', 'Manual'],
				aktiv: ['Normal', 'Normal'],
				alarmValue: 'INACTIVE',
				kategorie: 'status'
			}
		]
	},
	{
		key: 'anlage',
		de: 'Übergeordnete Anlagefunktionen',
		en: 'Higher-level plant functions',
		gruppe: 'anlage',
		apparat: { art: 'I', nr: '001' },
		objekte: () => [
			{
				id: 'sm-objektschutz',
				typ: 'BV',
				de: 'Sammelmeldung Objektschutz',
				en: 'Collective property safety',
				pflicht: false,
				fkt: 'H',
				...NORMAL_STOERUNG(),
				kategorie: 'objektschutz'
			},
			{
				id: 'sm-stoerung',
				typ: 'BV',
				de: 'Sammelmeldung technische Störung',
				en: 'Collective technical fault',
				pflicht: false,
				fkt: 'H',
				...NORMAL_STOERUNG(),
				kategorie: 'stoerung'
			},
			{
				id: 'sm-alarm',
				typ: 'BV',
				de: 'Sammelmeldung technischer Alarm',
				en: 'Collective technical alarm',
				pflicht: false,
				fkt: 'H',
				...NORMAL_STOERUNG(),
				kategorie: 'alarm'
			},
			{
				id: 'sm-wartung',
				typ: 'BV',
				de: 'Sammelmeldung Wartung',
				en: 'Collective maintenance',
				pflicht: false,
				fkt: 'H',
				...NORMAL_STOERUNG(),
				kategorie: 'wartung'
			},
			{
				id: 'unterdrueckung',
				typ: 'BV',
				de: 'Alarmunterdrückung',
				en: 'Alarm suppression',
				pflicht: false,
				fkt: 'H',
				inaktiv: ['Inaktiv', 'Inactive'],
				aktiv: ['Aktiv', 'Active'],
				alarmValue: 'ACTIVE',
				kategorie: 'status',
				settable: true
			},
			{
				id: 'lokal',
				typ: 'BI',
				de: 'Bedienung lokal',
				en: 'Local operation',
				pflicht: false,
				fkt: 'D',
				inaktiv: ['Hand', 'Manual'],
				aktiv: ['Normal', 'Normal'],
				alarmValue: 'INACTIVE',
				kategorie: 'status'
			},
			{
				id: 'sig-betrieb',
				typ: 'BO',
				de: 'Signalisation Betrieb',
				en: 'Indication running',
				pflicht: false,
				fkt: 'S',
				...AUS_EIN
			},
			{
				id: 'sig-alarm',
				typ: 'BO',
				de: 'Signalisation Sammelalarm',
				en: 'Indication collective alarm',
				pflicht: false,
				fkt: 'S',
				...AUS_EIN
			},
			{
				id: 'sig-lokal',
				typ: 'BO',
				de: 'Signalisation Bedienung lokal',
				en: 'Indication local operation',
				pflicht: false,
				fkt: 'S',
				...AUS_EIN
			},
			{ id: 'sc', typ: 'SC', de: 'Zeitschaltuhr', en: 'Time schedule', pflicht: false, fkt: 'U' }
		]
	},
	{
		key: 'anlageschalter',
		de: 'Anlageschalter',
		en: 'Plant switch',
		gruppe: 'anlage',
		apparat: { art: 'S', nr: '010' },
		stufen: { min: 1, max: 8, standard: 1 },
		objekte: (n) => [
			{
				id: 'mv',
				typ: 'MV',
				de: 'Betriebswahl',
				en: 'Mode selection',
				pflicht: true,
				fkt: 'H',
				zustaende: stufenTexte(n, false),
				priorityArray: true,
				settable: true,
				hinweis: [
					'Auto = NULL; Priorität 7 lokal, 8 Leitsystem, 14 Zeitprogramm',
					'Auto = NULL; priority 7 local, 8 management, 14 schedule'
				]
			},
			{
				id: 'mi',
				typ: 'MI',
				de: 'Betriebswahl lokal',
				en: 'Local mode selection',
				pflicht: true,
				fkt: 'D',
				zustaende: stufenTexte(n, true)
			},
			handbetrieb,
			{ id: 'sc', typ: 'SC', de: 'Zeitschaltuhr', en: 'Time schedule', pflicht: true, fkt: 'U' }
		]
	},
	{
		key: 'antrieb',
		de: 'Antrieb (ein-/mehrstufig)',
		en: 'Drive (single/multi-stage)',
		gruppe: 'feld',
		apparat: { art: 'M', nr: '100' },
		stufen: { min: 1, max: 2, standard: 1 },
		objekte: (n) => [
			...(n === 1 ? antriebStufe(1, false) : [...antriebStufe(1, true), ...antriebStufe(2, true)]),
			...antriebRest(),
			stoerung('Störung Antrieb', 'Drive fault')
		]
	},
	{
		key: 'antrieb-stetig',
		de: 'Antrieb stetig (FU)',
		en: 'Drive modulating (VFD)',
		gruppe: 'feld',
		apparat: { art: 'M', nr: '100' },
		objekte: () => [
			...antriebStufe(1, false),
			...antriebRest(),
			{
				id: 'ao',
				typ: 'AO',
				de: 'Sollwertvorgabe',
				en: 'Speed setpoint',
				pflicht: true,
				fkt: 'Y',
				messgroesse: 'stellsignal',
				priorityArray: true,
				settable: true
			},
			{
				id: 'tl-ao',
				typ: 'TL',
				de: 'Aufzeichnung Sollwertvorgabe',
				en: 'Log setpoint',
				pflicht: false,
				fkt: 'T',
				trendVon: 'ao'
			},
			{
				id: 'ai',
				typ: 'AI',
				de: 'Istwert',
				en: 'Actual value',
				pflicht: false,
				fkt: 'M',
				messgroesse: 'stellsignal'
			},
			{
				id: 'tl-ai',
				typ: 'TL',
				de: 'Aufzeichnung Istwert',
				en: 'Log actual value',
				pflicht: false,
				fkt: 'T',
				trendVon: 'ai'
			},
			{
				id: 'lauf',
				typ: 'BI',
				de: 'Laufüberwachung',
				en: 'Run monitoring',
				pflicht: false,
				fkt: 'D',
				...NORMAL_STOERUNG(),
				kategorie: 'stoerung'
			},
			stoerung('Störung Antrieb', 'Drive fault')
		]
	},
	{
		key: 'stellorgan-2p',
		de: 'Absperr-/Stellorgan 2-Punkt',
		en: 'Shut-off/control element 2-point',
		gruppe: 'feld',
		apparat: { art: 'Y', nr: '700' },
		objekte: () => [
			{
				id: 'bo',
				typ: 'BO',
				de: 'Stellwert',
				en: 'Output',
				pflicht: true,
				fkt: 'S',
				inaktiv: ['Zu', 'Closed'],
				aktiv: ['Auf', 'Open'],
				priorityArray: true,
				settable: true
			},
			{
				id: 'tl-bo',
				typ: 'TL',
				de: 'Aufzeichnung Stellwert',
				en: 'Log output',
				pflicht: false,
				fkt: 'T',
				trendVon: 'bo'
			},
			...stellungZuAuf()
		]
	},
	{
		key: 'stellorgan-stetig',
		de: 'Absperr-/Stellorgan stetig',
		en: 'Shut-off/control element modulating',
		gruppe: 'feld',
		apparat: { art: 'Y', nr: '700' },
		objekte: () => [
			{
				id: 'ao',
				typ: 'AO',
				de: 'Stellwert',
				en: 'Output',
				pflicht: true,
				fkt: 'Y',
				messgroesse: 'stellsignal',
				priorityArray: true,
				settable: true
			},
			{
				id: 'ai',
				typ: 'AI',
				de: 'Stellwertrückmeldung',
				en: 'Output feedback',
				pflicht: false,
				fkt: 'M',
				messgroesse: 'stellsignal'
			},
			{
				id: 'tl-ao',
				typ: 'TL',
				de: 'Aufzeichnung Stellwert',
				en: 'Log output',
				pflicht: false,
				fkt: 'T',
				trendVon: 'ao'
			},
			...stellungZuAuf()
		]
	},
	{
		key: 'stellorgan-3p',
		de: 'Absperr-/Stellorgan 3-Punkt',
		en: 'Shut-off/control element 3-point',
		gruppe: 'feld',
		apparat: { art: 'Y', nr: '700' },
		objekte: () => [
			{
				id: 'bo-zu',
				typ: 'BO',
				de: 'Stellwert ZU',
				en: 'Output CLOSE',
				pflicht: true,
				fkt: 'S',
				inaktiv: ['Inaktiv', 'Inactive'],
				aktiv: ['Zu', 'Close'],
				priorityArray: true,
				settable: true
			},
			{
				id: 'bo-auf',
				typ: 'BO',
				de: 'Stellwert AUF',
				en: 'Output OPEN',
				pflicht: true,
				fkt: 'S',
				inaktiv: ['Inaktiv', 'Inactive'],
				aktiv: ['Auf', 'Open'],
				priorityArray: true,
				settable: true
			},
			{
				id: 'ai',
				typ: 'AI',
				de: 'Stellwertrückmeldung',
				en: 'Output feedback',
				pflicht: false,
				fkt: 'M',
				messgroesse: 'stellsignal'
			},
			{
				id: 'tl-ai',
				typ: 'TL',
				de: 'Aufzeichnung Stellwert',
				en: 'Log output',
				pflicht: false,
				fkt: 'T',
				trendVon: 'ai'
			},
			...stellungZuAuf()
		]
	},
	{
		key: 'messwert',
		de: 'Messwertgeber stetig',
		en: 'Sensor modulating',
		gruppe: 'feld',
		apparat: { art: 'B', nr: '800' },
		messgroesse: 'temp',
		objekte: () => [
			{
				id: 'ai',
				typ: 'AI',
				de: 'Istwert',
				en: 'Actual value',
				pflicht: true,
				fkt: 'M',
				kategorie: 'alarm',
				hinweis: [
					'High_/Low_Limit = Hauptalarm, Min_/Max_Pres_Value = Fühlerstörung',
					'High_/Low_Limit = main alarm, Min_/Max_Pres_Value = sensor fault'
				]
			},
			{
				id: 'ee',
				typ: 'EE',
				de: 'Voralarm',
				en: 'Pre-alarm',
				pflicht: false,
				fkt: 'H',
				kategorie: 'wartung',
				hinweis: [
					'OUT_OF_RANGE auf Present_Value des Istwerts',
					'OUT_OF_RANGE on Present_Value of the actual value'
				]
			},
			{
				id: 'tl',
				typ: 'TL',
				de: 'Aufzeichnung Istwert',
				en: 'Log actual value',
				pflicht: false,
				fkt: 'T',
				trendVon: 'ai'
			}
		]
	},
	{
		key: 'waechter',
		de: 'Messwertgeber binär / Wächter',
		en: 'Binary sensor / limiter',
		gruppe: 'feld',
		apparat: { art: 'B', nr: '900' },
		objekte: () => [
			{
				id: 'bi',
				typ: 'BI',
				de: 'Istwert',
				en: 'Actual value',
				pflicht: true,
				fkt: 'D',
				...NORMAL_STOERUNG(),
				kategorie: 'alarm'
			},
			{
				id: 'tl',
				typ: 'TL',
				de: 'Aufzeichnung Istwert',
				en: 'Log actual value',
				pflicht: false,
				fkt: 'T',
				trendVon: 'bi'
			},
			stoerung('Störung Wächter', 'Limiter fault')
		]
	},
	{
		key: 'regler',
		de: 'Regler',
		en: 'Controller',
		gruppe: 'feld',
		apparat: { art: 'I', nr: '600' },
		objekte: () => [
			{
				id: 'lp',
				typ: 'LP',
				de: 'PI/PID-Regelung',
				en: 'PI/PID control',
				pflicht: true,
				fkt: 'R',
				kategorie: 'stoerung',
				hinweis: ['Error_Limit = regeltechnische Abweichung', 'Error_Limit = control deviation']
			},
			{
				id: 'tl',
				typ: 'TL',
				de: 'Aufzeichnung Sollwert',
				en: 'Log setpoint',
				pflicht: false,
				fkt: 'T',
				trendVon: 'lp'
			}
		]
	},
	{
		key: 'zaehler',
		de: 'Zähler / Messung',
		en: 'Meter / measurement',
		gruppe: 'feld',
		apparat: { art: 'P', nr: '890' },
		messgroesse: 'energieKwh',
		objekte: () => [
			{ id: 'av', typ: 'AV', de: 'Zählwert', en: 'Meter value', pflicht: true, fkt: 'Z' },
			stoerung('Störung Zähler', 'Meter fault'),
			{
				id: 'tl',
				typ: 'TL',
				de: 'Aufzeichnung Zählwert',
				en: 'Log meter value',
				pflicht: false,
				fkt: 'T',
				trendVon: 'av'
			}
		]
	}
];

export const GA_FUNKTION_MAP: Record<string, GaFunktion> = Object.fromEntries(
	GA_FUNKTIONEN.map((f) => [f.key, f])
);
