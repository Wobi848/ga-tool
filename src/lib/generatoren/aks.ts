/* Anlagenkennzeichnung (AKS) nach KBOB-Empfehlung MSRL-Technik (2000), Kap. E,
 * und BACnet-Objektname nach KBOB-Leitfaden BACnet (2021), Kap. 3.2.2.
 *
 *   Kennzeichen:  +NNNN AAX =ANN -ANNN :AN     z.B. +3022HZ1=L13-M100:S0
 *   Objektname:   NNNN_AAX_ANN_ANNN_AN         z.B. 3022_HZ1_L13_M100_S0
 *
 * Jeder Block ist optional; ein Schild am Apparat trägt z.B. nur +ORT2=BTA-APPARAT.
 */

export type Lang = 'de' | 'en';

export interface AksTeile {
	/** ORT1, Anlage-Nummer bzw. Wirtschaftseinheit, 4 Ziffern */
	anlage?: string;
	/** ORT2, Objekt-Nummer, 2 Buchstaben */
	objekt?: string;
	/** ORT2, Objekt-Ebene, 1 Ziffer oder Buchstabe */
	ebene?: string;
	btaArt?: string;
	/** 2 Ziffern */
	btaNr?: string;
	apparatArt?: string;
	/** 3 Ziffern */
	apparatNr?: string;
	funktionArt?: string;
	/** 1 Ziffer */
	funktionNr?: string;
}

interface Text {
	de: string;
	en: string;
}

export const BTA_ARTEN: Record<string, Text> = {
	A: { de: 'Sicherheit', en: 'Security' },
	B: { de: 'Beleuchtung', en: 'Lighting' },
	C: { de: 'Kommunikation', en: 'Communication' },
	D: { de: 'Dampf', en: 'Steam' },
	E: { de: 'Elektro (Niederspannung)', en: 'Electrical (low voltage)' },
	F: { de: 'Brandmeldeanlage', en: 'Fire alarm system' },
	G: { de: 'Gas', en: 'Gas' },
	H: { de: 'Heizung', en: 'Heating' },
	J: { de: 'Transportanlagen', en: 'Transport systems' },
	K: { de: 'Kälte', en: 'Refrigeration' },
	L: { de: 'Lüftung/Klima', en: 'Ventilation/air conditioning' },
	M: { de: 'Mittelspannungsanlage', en: 'Medium voltage system' },
	N: { de: 'Notstrom', en: 'Emergency power' },
	O: { de: 'Öl', en: 'Oil' },
	P: { de: 'Druckluft', en: 'Compressed air' },
	Q: { de: 'Primärmessung', en: 'Primary metering' },
	R: { de: 'Sekundärmessung', en: 'Secondary metering' },
	S: { de: 'Sanitär', en: 'Plumbing' },
	T: { de: 'Tableau, Schaltgerätekombination', en: 'Panel, switchgear assembly' },
	U: { de: 'USV-Anlage', en: 'UPS system' },
	V: { de: 'Video/Audio', en: 'Video/audio' },
	W: { de: 'Wasseraufbereitung', en: 'Water treatment' },
	X: { de: 'MSRL-Komponenten', en: 'BA components' },
	Y: { de: 'Spezialanlagen', en: 'Special systems' },
	Z: { de: 'Zutrittskontrolle', en: 'Access control' }
};

/** Apparate im Prozess (Feld). */
export const APPARAT_ARTEN_PROZESS: Record<string, Text> = {
	B: { de: 'Messumformer, Messelement', en: 'Transmitter, sensing element' },
	E: { de: 'Verschiedene Apparate', en: 'Miscellaneous devices' },
	F: { de: 'Schutzeinrichtung', en: 'Protective device' },
	G: { de: 'Generator, Stromversorgung', en: 'Generator, power supply' },
	H: { de: 'Meldeeinrichtung', en: 'Signalling device' },
	I: { de: 'Virtueller Apparat', en: 'Virtual device' },
	M: { de: 'Motor', en: 'Motor' },
	P: { de: 'Messgerät', en: 'Measuring instrument' },
	R: { de: 'Widerstand', en: 'Resistor' },
	S: { de: 'Schalter (Revisions-, Endschalter)', en: 'Switch (maintenance, limit switch)' },
	T: { de: 'Transformator', en: 'Transformer' },
	U: { de: 'Frequenzumrichter', en: 'Frequency converter' },
	Y: { de: 'Stellgerät', en: 'Actuator' }
};

/** Apparate in der Schaltgerätekombination. */
export const APPARAT_ARTEN_SGK: Record<string, Text> = {
	B: { de: 'Messwandler, Messumformer', en: 'Instrument transformer, transducer' },
	D: { de: 'DDC-Gerät', en: 'DDC device' },
	F: { de: 'Sicherungsautomat', en: 'Circuit breaker' },
	G: { de: 'Netzgerät', en: 'Power supply unit' },
	H: { de: 'Meldelampe', en: 'Indicator lamp' },
	I: { de: 'Virtueller Apparat', en: 'Virtual device' },
	K: { de: 'Schütz, Relais', en: 'Contactor, relay' },
	P: { de: 'Messinstrument', en: 'Measuring instrument' },
	Q: { de: 'Starkstrom-Schaltgerät', en: 'Power switching device' },
	S: { de: 'Schalter, Steuerschalter', en: 'Switch, control switch' },
	T: { de: 'Transformator', en: 'Transformer' },
	X: { de: 'Klemmen, Strips', en: 'Terminals, strips' },
	Z: { de: 'Netzfilter', en: 'Line filter' }
};

export interface FunktionsArt extends Text {
	/** Erweiterung des BACnet-Leitfadens 2021, nicht in MSRL-Technik 2000 */
	bacnet?: boolean;
}

export const FUNKTIONS_ARTEN: Record<string, FunktionsArt> = {
	D: { de: 'Ereignismeldung', en: 'Event message' },
	Z: { de: 'Zählwert', en: 'Meter value' },
	S: { de: 'Schaltbefehl', en: 'Switching command' },
	M: { de: 'Messwert', en: 'Measured value' },
	Y: { de: 'Stellbefehl', en: 'Positioning command' },
	H: { de: 'Virtueller Punkt digital', en: 'Virtual point, digital' },
	W: { de: 'Virtueller Punkt analog', en: 'Virtual point, analog' },
	T: { de: 'Trend Log', en: 'Trend log', bacnet: true },
	U: { de: 'Zeitschaltprogramm (Schedule)', en: 'Schedule', bacnet: true },
	K: { de: 'Kalender (Calendar)', en: 'Calendar', bacnet: true },
	R: { de: 'Regler (Loop)', en: 'Controller (loop)', bacnet: true },
	N: { de: 'Meldeklasse (Notification Class)', en: 'Notification class', bacnet: true }
};

/** Objekt-Ebene: Ziffer = Untergeschoss (0 = EG), Buchstabe = Obergeschoss. */
export function ebeneText(x: string, lang: Lang = 'de'): string | null {
	const c = x.toUpperCase();
	if (c === '0') return lang === 'de' ? 'Erdgeschoss' : 'Ground floor';
	if (/^[1-9]$/.test(c)) return lang === 'de' ? `${c}. Untergeschoss` : `Basement ${c}`;
	if (/^[A-Z]$/.test(c)) {
		const n = c.charCodeAt(0) - 64;
		return lang === 'de' ? `${n}. Obergeschoss` : `Floor ${n}`;
	}
	return null;
}

/** Nummernkreise der Messanlagen Q/R nach Medium. */
const MESS_BEREICHE: Array<[number, number, Text]> = [
	[1, 20, { de: 'Elektro', en: 'Electricity' }],
	[21, 40, { de: 'Dampf und Wärme', en: 'Steam and heat' }],
	[41, 60, { de: 'Kälte', en: 'Cooling' }],
	[61, 70, { de: 'Nicht behandeltes Wasser', en: 'Untreated water' }],
	[71, 80, { de: 'Behandeltes Wasser', en: 'Treated water' }],
	[81, 90, { de: 'Brennstoffe (Öl, Gas)', en: 'Fuels (oil, gas)' }],
	[91, 99, { de: 'Diverses (Druckluft u.a.)', en: 'Miscellaneous (compressed air etc.)' }]
];

/* Funktionelle Bereiche der Apparate-Nummern, MSRL-Technik Anhang B.
 * Feinere Bereiche zuerst, damit die Suche den genauesten Treffer liefert. */
type Bereich = [number, number, string, string];

const NR_HKS: Bereich[] = [
	[
		0,
		99,
		'Allgemeines (Steuerschalter, Signallampen, Steuersicherungen)',
		'General (control switches, lamps, control fuses)'
	],
	[100, 129, 'Erzeugung: Kältemaschine, Wärmepumpe', 'Generation: chiller, heat pump'],
	[130, 159, 'Erzeugung: Heizkessel/Brenner, BHKW', 'Generation: boiler/burner, CHP'],
	[160, 189, 'Erzeugung: spezielle Energieerzeuger', 'Generation: special generators'],
	[190, 199, 'Erzeugung: spezielle Apparate', 'Generation: special devices'],
	[200, 299, 'Erzeugung und Umformung', 'Generation and conversion'],
	[300, 399, 'Hilfseinrichtungen (z.B. Kühlturm)', 'Auxiliary equipment (e.g. cooling tower)'],
	[400, 499, 'Verteilung und Transport', 'Distribution and transport'],
	[500, 599, 'Verbrauch', 'Consumers'],
	[600, 699, 'Reserve, spezielle Anlageteile', 'Reserve, special parts'],
	[700, 709, 'Stellorgan Primärkreis Vorlauf', 'Control element primary flow'],
	[710, 719, 'Stellorgan Primärkreis Rücklauf', 'Control element primary return'],
	[720, 729, 'Stellorgan Primärkreis Bypass', 'Control element primary bypass'],
	[730, 739, 'Stellorgan Sekundärkreis Vorlauf', 'Control element secondary flow'],
	[740, 749, 'Stellorgan Sekundärkreis Rücklauf', 'Control element secondary return'],
	[750, 759, 'Stellorgan Sekundärkreis Bypass', 'Control element secondary bypass'],
	[760, 799, 'Spezielle Stell- und Absperrorgane', 'Special control and shut-off elements'],
	[800, 803, 'Temperatur Primärkreis Vorlauf', 'Temperature primary flow'],
	[804, 807, 'Temperatur Primärkreis Rücklauf', 'Temperature primary return'],
	[808, 809, 'Temperatur Primärkreis Bypass', 'Temperature primary bypass'],
	[810, 813, 'Temperatur Sekundärkreis Vorlauf', 'Temperature secondary flow'],
	[814, 817, 'Temperatur Sekundärkreis Rücklauf', 'Temperature secondary return'],
	[818, 819, 'Temperatur Sekundärkreis Bypass', 'Temperature secondary bypass'],
	[820, 829, 'Temperatur Speicher', 'Temperature storage tank'],
	[830, 839, 'Druckmessung', 'Pressure measurement'],
	[840, 849, 'Durchflussmessung', 'Flow measurement'],
	[850, 859, 'Niveaumessung', 'Level measurement'],
	[860, 869, 'Freon- und pH-Messung', 'Refrigerant and pH measurement'],
	[870, 889, 'Spezielle Messung', 'Special measurement'],
	[890, 899, 'Leistungs- und Energiemessung', 'Power and energy measurement'],
	[900, 919, 'Sicherheitsthermostat', 'Safety thermostat'],
	[920, 929, 'Sicherheitsthermostat Speicher', 'Safety thermostat storage tank'],
	[930, 939, 'Sicherheitspressostat', 'Safety pressure switch'],
	[940, 949, 'Sicherheits-Durchflusswächter', 'Safety flow switch'],
	[950, 959, 'Sicherheits-Niveauschalter', 'Safety level switch'],
	[960, 969, 'Freon- und pH-Überwachung', 'Refrigerant and pH monitoring'],
	[970, 979, 'Lecküberwachung', 'Leak monitoring'],
	[980, 999, 'Spezielle Schutzeinrichtung', 'Special protective device']
];

/** Pumpen, Wärmetauscher und Zubehör wiederholen sich in den Gruppen 200–599. */
function hksUntergruppe(nr: number): [string, string] | null {
	if (nr < 200 || nr > 599) return null;
	const r = nr % 100;
	if (r <= 59) {
		const p = Math.floor(r / 10) + 1;
		return nr < 300 || nr >= 400
			? [`Pumpe ${p}`, `Pump ${p}`]
			: [`Pumpe/Ventilator ${p}`, `Pump/fan ${p}`];
	}
	if (r <= 69) return ['Wärmetauscher', 'Heat exchanger'];
	if (r <= 89) return ['Zubehör, z.B. Aggregateheizung', 'Accessories, e.g. unit heater'];
	if (r <= 94) return ['Druckexpansion', 'Pressure expansion'];
	return ['Nachfüllautomat', 'Automatic refill'];
}

const NR_LK: Bereich[] = [
	[
		0,
		99,
		'Allgemeines (Steuerschalter, Signallampen, Steuersicherungen)',
		'General (control switches, lamps, control fuses)'
	],
	[100, 129, 'Ventilator Zuluft', 'Supply air fan'],
	[130, 159, 'Ventilator Fortluft', 'Exhaust air fan'],
	[160, 179, 'Ventilator Aussenluft', 'Outdoor air fan'],
	[180, 199, 'Ventilator Umluft', 'Recirculation fan'],
	[200, 249, 'Lufterhitzer Vorbehandlung', 'Pre-heater'],
	[250, 299, 'Lufterhitzer Nachbehandlung', 'Re-heater'],
	[300, 399, 'Luftkühler', 'Air cooler'],
	[400, 449, 'Dampfbefeuchter', 'Steam humidifier'],
	[450, 499, 'Luftwäscher', 'Air washer'],
	[500, 549, 'WRG rotierend', 'Heat recovery, rotary'],
	[550, 599, 'WRG statisch', 'Heat recovery, static'],
	[600, 699, 'Reserve, spezielle Anlageteile', 'Reserve, special parts'],
	[700, 709, 'Klappe Aussenluft', 'Outdoor air damper'],
	[710, 719, 'Klappe Mischluft', 'Mixed air damper'],
	[720, 729, 'Klappe Zuluft', 'Supply air damper'],
	[730, 739, 'Klappe Fortluft', 'Exhaust air damper'],
	[740, 769, 'Brandschutzklappe Zuluft', 'Fire damper supply'],
	[770, 799, 'Brandschutzklappe Fortluft', 'Fire damper exhaust'],
	[800, 801, 'Temperatur Aussenluft', 'Temperature outdoor air'],
	[802, 805, 'Temperatur Zuluft', 'Temperature supply air'],
	[806, 809, 'Temperatur Fortluft', 'Temperature exhaust air'],
	[810, 819, 'Temperatur Raum', 'Temperature room'],
	[820, 821, 'Feuchte Aussenluft', 'Humidity outdoor air'],
	[822, 825, 'Feuchte Zuluft', 'Humidity supply air'],
	[826, 829, 'Feuchte Fortluft', 'Humidity exhaust air'],
	[830, 839, 'Feuchte Raum', 'Humidity room'],
	[850, 854, 'Druck Zuluft', 'Pressure supply air'],
	[855, 859, 'Druck Fortluft', 'Pressure exhaust air'],
	[860, 864, 'Enthalpie Zuluft', 'Enthalpy supply air'],
	[865, 869, 'Enthalpie Fortluft', 'Enthalpy exhaust air'],
	[870, 899, 'Spezielle Messung', 'Special measurement'],
	[900, 909, 'Frostschutz', 'Frost protection'],
	[910, 914, 'Druckwächter Zuluft', 'Pressure switch supply air'],
	[915, 919, 'Druckwächter Fortluft', 'Pressure switch exhaust air'],
	[920, 929, 'Feuchtewächter Zuluft', 'Humidity limiter supply air'],
	[930, 939, 'Keilriemenüberwachung', 'V-belt monitoring'],
	[940, 949, 'Trockenlaufschutz Luftwäscher', 'Dry-run protection air washer'],
	[950, 954, 'Luftfilter Zuluft', 'Air filter supply'],
	[955, 959, 'Luftfilter Fortluft', 'Air filter exhaust'],
	[960, 999, 'Spezielle Schutzeinrichtung', 'Special protective device']
];

function bereichSuchen(liste: Bereich[], nr: number, lang: Lang): string | null {
	const t = liste.find(([von, bis]) => nr >= von && nr <= bis);
	return t ? (lang === 'de' ? t[2] : t[3]) : null;
}

/** Bedeutung der Apparate-Nummer nach MSRL-Technik Anhang B (Empfehlung, nicht verbindlich). */
export function apparatNrText(btaArt: string, nr: number, lang: Lang = 'de'): string | null {
	const art = btaArt.toUpperCase();
	if (art === 'H' || art === 'K' || art === 'S') {
		const grob = bereichSuchen(NR_HKS, nr, lang);
		const fein = hksUntergruppe(nr);
		if (grob && fein) return `${grob}: ${lang === 'de' ? fein[0] : fein[1]}`;
		return grob;
	}
	if (art === 'L') return bereichSuchen(NR_LK, nr, lang);
	if (art === 'E' || art === 'M' || art === 'T') {
		const haupt = Math.floor(nr / 10);
		const hilf = nr % 10;
		return lang === 'de'
			? `Hauptapparat ${haupt}${hilf ? `, Hilfsapparat ${hilf}` : ''}`
			: `Main device ${haupt}${hilf ? `, auxiliary device ${hilf}` : ''}`;
	}
	return null;
}

/** Medium einer Messanlage Q/R nach ihrer Nummer. */
export function messanlageText(nr: number, lang: Lang = 'de'): string | null {
	const b = MESS_BEREICHE.find(([von, bis]) => nr >= von && nr <= bis);
	return b ? b[2][lang] : null;
}

// ── Prüfen ────────────────────────────────────────────────────────────────

export type AksFeld = keyof AksTeile;

export interface AksFehler {
	feld: AksFeld;
	de: string;
	en: string;
}

const MUSTER: Record<AksFeld, [RegExp, string, string]> = {
	anlage: [/^\d{4}$/, '4 Ziffern', '4 digits'],
	objekt: [/^[A-Z]{2}$/, '2 Buchstaben', '2 letters'],
	ebene: [/^[0-9A-Z]$/, '1 Ziffer oder Buchstabe', '1 digit or letter'],
	btaArt: [/^[A-Z]$/, '1 Buchstabe', '1 letter'],
	btaNr: [/^\d{2}$/, '2 Ziffern', '2 digits'],
	apparatArt: [/^[A-Z]$/, '1 Buchstabe', '1 letter'],
	apparatNr: [/^\d{3}$/, '3 Ziffern', '3 digits'],
	funktionArt: [/^[A-Z]$/, '1 Buchstabe', '1 letter'],
	funktionNr: [/^\d$/, '1 Ziffer', '1 digit']
};

function norm(t: AksTeile): AksTeile {
	const o: AksTeile = {};
	for (const [k, v] of Object.entries(t) as [AksFeld, string | undefined][]) {
		if (v !== undefined && v.trim() !== '') o[k] = v.trim().toUpperCase();
	}
	return o;
}

export function pruefen(teile: AksTeile): AksFehler[] {
	const t = norm(teile);
	const f: AksFehler[] = [];
	for (const [k, [re, de, en]] of Object.entries(MUSTER) as [AksFeld, [RegExp, string, string]][]) {
		const v = t[k];
		if (v !== undefined && !re.test(v))
			f.push({ feld: k, de: `erwartet ${de}`, en: `expected ${en}` });
	}
	const paare: [AksFeld, AksFeld][] = [
		['objekt', 'ebene'],
		['btaArt', 'btaNr'],
		['apparatArt', 'apparatNr'],
		['funktionArt', 'funktionNr']
	];
	for (const [a, b] of paare) {
		if ((t[a] === undefined) !== (t[b] === undefined)) {
			const fehlt = t[a] === undefined ? a : b;
			f.push({ feld: fehlt, de: 'fehlt', en: 'missing' });
		}
	}
	if (t.btaArt === 'I')
		f.push({ feld: 'btaArt', de: 'I ist keine BTA-Art', en: 'I is not a system type' });
	else if (t.btaArt && /^[A-Z]$/.test(t.btaArt) && !BTA_ARTEN[t.btaArt])
		f.push({ feld: 'btaArt', de: 'unbekannte BTA-Art', en: 'unknown system type' });
	if (
		t.apparatArt &&
		/^[A-Z]$/.test(t.apparatArt) &&
		!APPARAT_ARTEN_PROZESS[t.apparatArt] &&
		!APPARAT_ARTEN_SGK[t.apparatArt]
	)
		f.push({ feld: 'apparatArt', de: 'unbekannte Apparateart', en: 'unknown device type' });
	if (t.funktionArt && /^[A-Z]$/.test(t.funktionArt) && !FUNKTIONS_ARTEN[t.funktionArt])
		f.push({ feld: 'funktionArt', de: 'unbekannte Funktionsart', en: 'unknown function type' });
	if ((t.btaArt === 'Q' || t.btaArt === 'R') && t.btaNr === '00')
		f.push({
			feld: 'btaNr',
			de: 'Messanlagen beginnen bei 01',
			en: 'metering numbers start at 01'
		});
	return f;
}

// ── Formatieren ───────────────────────────────────────────────────────────

/** Kennzeichen mit Vorzeichen: +3022HZ1=L13-M100:S0. Fehlende Blöcke entfallen. */
export function kennzeichen(teile: AksTeile, mitAbstand = false): string {
	const t = norm(teile);
	const bloecke: string[] = [];
	const ort = (t.anlage ?? '') + (t.objekt ?? '') + (t.ebene ?? '');
	if (ort)
		bloecke.push(
			'+' + (mitAbstand && t.anlage && t.objekt ? `${t.anlage} ${t.objekt}${t.ebene ?? ''}` : ort)
		);
	if (t.btaArt || t.btaNr) bloecke.push('=' + (t.btaArt ?? '') + (t.btaNr ?? ''));
	if (t.apparatArt || t.apparatNr) bloecke.push('-' + (t.apparatArt ?? '') + (t.apparatNr ?? ''));
	if (t.funktionArt || t.funktionNr)
		bloecke.push(':' + (t.funktionArt ?? '') + (t.funktionNr ?? ''));
	return bloecke.join(mitAbstand ? ' ' : '');
}

/** BACnet-Objektname nach Leitfaden: 3022_HZ1_L13_M100_S0. Fehlende Blöcke entfallen. */
export function objektname(teile: AksTeile): string {
	const t = norm(teile);
	return [
		t.anlage,
		(t.objekt ?? '') + (t.ebene ?? ''),
		(t.btaArt ?? '') + (t.btaNr ?? ''),
		(t.apparatArt ?? '') + (t.apparatNr ?? ''),
		(t.funktionArt ?? '') + (t.funktionNr ?? '')
	]
		.filter((s) => s)
		.join('_');
}

// ── Zerlegen ──────────────────────────────────────────────────────────────

export interface ZerlegtErgebnis {
	teile: AksTeile;
	/** Eingabeteile, die nicht erkannt wurden */
	rest: string[];
	fehler: AksFehler[];
}

function ortZerlegen(s: string, t: AksTeile): boolean {
	const m = /^(\d{4})?([A-Z]{2}[0-9A-Z])?$/.exec(s);
	if (!m || (!m[1] && !m[2])) return false;
	if (m[1]) t.anlage = m[1];
	if (m[2]) {
		t.objekt = m[2].slice(0, 2);
		t.ebene = m[2][2];
	}
	return true;
}

function paarZerlegen(s: string, ziffern: number): [string, string] | null {
	const m = new RegExp(`^([A-Z])(\\d{${ziffern}})$`).exec(s);
	return m ? [m[1], m[2]] : null;
}

/**
 * Zerlegt ein Kennzeichen (+3022 HZ1 = L13 - M100 : S0) oder einen
 * Objektnamen (3022_HZ1_L13_M100_S0). Gross-/Kleinschreibung egal.
 */
export function zerlegen(eingabe: string): ZerlegtErgebnis {
	const s = eingabe.trim().toUpperCase();
	const t: AksTeile = {};
	const rest: string[] = [];

	if (/[+=:]/.test(s) || /^-/.test(s)) {
		// Kennzeichen mit Vorzeichen; Leerzeichen innerhalb eines Blocks erlaubt.
		const re = /([+=\-:])([^+=\-:]*)/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(s))) {
			const wert = m[2].replace(/\s+/g, '');
			if (!wert) continue;
			if (m[1] === '+') {
				if (!ortZerlegen(wert, t)) rest.push('+' + wert);
			} else {
				const p = paarZerlegen(wert, m[1] === '=' ? 2 : m[1] === '-' ? 3 : 1);
				if (!p) rest.push(m[1] + wert);
				else if (m[1] === '=') [t.btaArt, t.btaNr] = p;
				else if (m[1] === '-') [t.apparatArt, t.apparatNr] = p;
				else [t.funktionArt, t.funktionNr] = p;
			}
		}
	} else {
		// Objektname: Blöcke an _ trennen und am Aufbau erkennen.
		for (const teil of s.split(/[_\s]+/).filter(Boolean)) {
			if (/^\d{4}$/.test(teil) && !t.anlage) t.anlage = teil;
			else if (/^[A-Z]{2}[0-9A-Z]$/.test(teil) && !t.objekt) {
				t.objekt = teil.slice(0, 2);
				t.ebene = teil[2];
			} else if (/^[A-Z]\d{2}$/.test(teil) && !t.btaArt)
				[t.btaArt, t.btaNr] = [teil[0], teil.slice(1)];
			else if (/^[A-Z]\d{3}$/.test(teil) && !t.apparatArt)
				[t.apparatArt, t.apparatNr] = [teil[0], teil.slice(1)];
			else if (/^[A-Z]\d$/.test(teil) && !t.funktionArt)
				[t.funktionArt, t.funktionNr] = [teil[0], teil[1]];
			else rest.push(teil);
		}
	}
	return { teile: t, rest, fehler: pruefen(t) };
}

// ── Erklären ──────────────────────────────────────────────────────────────

export interface Erklaerung {
	block: 'ORT' | 'BTA' | 'APPARAT' | 'FUNKTION';
	wert: string;
	bedeutung: string;
}

export function erklaeren(teile: AksTeile, lang: Lang = 'de'): Erklaerung[] {
	const t = norm(teile);
	const de = lang === 'de';
	const out: Erklaerung[] = [];
	if (t.anlage)
		out.push({
			block: 'ORT',
			wert: t.anlage,
			bedeutung: de ? 'Anlage-Nummer / Wirtschaftseinheit' : 'Site number / economic unit'
		});
	if (t.objekt)
		out.push({
			block: 'ORT',
			wert: t.objekt,
			bedeutung: de ? 'Objekt (Gebäude)' : 'Object (building)'
		});
	if (t.ebene)
		out.push({ block: 'ORT', wert: t.ebene, bedeutung: ebeneText(t.ebene, lang) ?? '?' });
	if (t.btaArt)
		out.push({ block: 'BTA', wert: t.btaArt, bedeutung: BTA_ARTEN[t.btaArt]?.[lang] ?? '?' });
	if (t.btaNr) {
		const nr = Number(t.btaNr);
		const medium = t.btaArt === 'Q' || t.btaArt === 'R' ? messanlageText(nr, lang) : null;
		out.push({
			block: 'BTA',
			wert: t.btaNr,
			bedeutung: (de ? `Anlage Nr. ${nr}` : `System no. ${nr}`) + (medium ? ` · ${medium}` : '')
		});
	}
	if (t.apparatArt) {
		const p = APPARAT_ARTEN_PROZESS[t.apparatArt]?.[lang];
		const s = APPARAT_ARTEN_SGK[t.apparatArt]?.[lang];
		const txt =
			p && s && p !== s
				? `${p} (${de ? 'Feld' : 'field'}) / ${s} (${de ? 'Schaltschrank' : 'panel'})`
				: (p ?? (s ? `${s} (${de ? 'Schaltschrank' : 'panel'})` : '?'));
		out.push({ block: 'APPARAT', wert: t.apparatArt, bedeutung: txt });
	}
	if (t.apparatNr) {
		const b = t.btaArt ? apparatNrText(t.btaArt, Number(t.apparatNr), lang) : null;
		out.push({
			block: 'APPARAT',
			wert: t.apparatNr,
			bedeutung:
				(de ? `Apparat Nr. ${Number(t.apparatNr)}` : `Device no. ${Number(t.apparatNr)}`) +
				(b ? ` · ${b}` : '')
		});
	}
	if (t.funktionArt) {
		const f = FUNKTIONS_ARTEN[t.funktionArt];
		out.push({
			block: 'FUNKTION',
			wert: t.funktionArt,
			bedeutung: f
				? f[lang] + (f.bacnet ? (de ? ' (BACnet-Erweiterung)' : ' (BACnet extension)') : '')
				: '?'
		});
	}
	if (t.funktionNr)
		out.push({
			block: 'FUNKTION',
			wert: t.funktionNr,
			bedeutung: de ? `Nummer ${t.funktionNr}` : `Number ${t.funktionNr}`
		});
	return out;
}
