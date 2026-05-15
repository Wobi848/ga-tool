import type { ReferenceTable } from '../types';

export const steuerkabel: ReferenceTable = {
	slug: 'steuerkabel',
	title: 'Steuerkabel-Querschnitte',
	subtitle: 'Mindestquerschnitte, Leitungslängen, Spannungsabfall',
	category: 'Elektro',
	icon: 'zap',
	color: '#f59e0b',
	areas: ['elektro', 'ga'],
	norm: ['NIN 2020 (CH)', 'VDE 0100', 'EN 60228', 'IEC 60189'],
	updated: '2026-05-15',
	description: 'Richtwerte für Steuerkabel-Querschnitte in der GA. Beachte: Bei 4–20 mA ist der Spannungsabfall unkritisch (Stromschnittstelle), bei 0–10 V und 24V-Signalen ist die Leitungslänge zu begrenzen.',
	columns: [
		{ key: 'signal', label: 'Signaltyp', highlight: true },
		{ key: 'quer', label: 'Min. Querschnitt', mono: true },
		{ key: 'max_laenge', label: 'Max. Länge (Richtwert)', mono: true },
		{ key: 'abschirmung', label: 'Schirmung', mono: true },
		{ key: 'bemerkung', label: 'Bemerkung' }
	],
	rows: [
		{ signal: '4–20 mA Analogsignal',        quer: '0.5 mm²', max_laenge: '≤ 500 m',  abschirmung: 'Empfohlen', bemerkung: 'Schleifenwiderstand < 500 Ω typisch (Speisespannung 24V / Bürde)' },
		{ signal: '0–10 V Analogsignal',          quer: '0.75 mm²', max_laenge: '≤ 100 m',  abschirmung: 'Empfohlen', bemerkung: 'Spannungsabfall < 0.1 V zulässig → höherer Querschnitt bei längerer Leitung' },
		{ signal: '0–10 V Analogsignal (200 m)',  quer: '1.5 mm²', max_laenge: '≤ 200 m',  abschirmung: 'Ja',        bemerkung: 'Bei 150 m+: Schirmung Pflicht, Leiterwiderstand prüfen' },
		{ signal: 'DI/DO 24 VDC Digitaleingang',  quer: '0.5 mm²', max_laenge: '≤ 300 m',  abschirmung: 'Nein',      bemerkung: 'Spannungsabfall < 2 V zulässig bei 24V' },
		{ signal: 'DI/DO 24 VAC Digitalausgang',  quer: '0.75 mm²', max_laenge: '≤ 200 m', abschirmung: 'Nein',      bemerkung: 'Motorschutz, Schütze: Kabelquerschnitt nach Strom!' },
		{ signal: 'PT100 / PT1000 Fühler',        quer: '0.75 mm²', max_laenge: '≤ 100 m', abschirmung: 'Ja',        bemerkung: 'PT100: 4-Leiter-Schaltung bei > 50 m empfohlen (Leitungswiderstand-Kompensation)' },
		{ signal: 'PT1000 Fühler',                quer: '0.5 mm²', max_laenge: '≤ 300 m',  abschirmung: 'Ja',        bemerkung: 'PT1000: Leitungswiderstand < 10% des Nennwiderstands' },
		{ signal: 'Modbus RTU / RS-485',          quer: '0.5 mm²', max_laenge: '≤ 1200 m', abschirmung: 'Ja',        bemerkung: 'Verdrilltes Paar, Schirm einseitig am Master, 120 Ω Abschluss' },
		{ signal: 'KNX TP Bus',                   quer: '0.8 mm²', max_laenge: '≤ 350 m',  abschirmung: 'Ja (YCYM)', bemerkung: 'KNX-spezifisches Kabel oder JY(St)Y 2×2×0.8' },
		{ signal: 'DALI Bus',                     quer: '0.5 mm²', max_laenge: '≤ 300 m',  abschirmung: 'Nein',      bemerkung: 'Unkritisch — DALI ist Niederspannung (16V), keine Polarität erforderlich' },
		{ signal: '24 VAC Versorgung Aktor',      quer: '1.0 mm²', max_laenge: '≤ 50 m',   abschirmung: 'Nein',      bemerkung: 'Spannungsabfall < 5%: U = I × R × 2L / A' },
		{ signal: '230 VAC Steuerkabel (Motor)',  quer: '1.5 mm²', max_laenge: 'NIN prüfen', abschirmung: 'Nein',     bemerkung: 'NIN/VDE: Nach Strombelastbarkeit und Absicherung auslegen' }
	],
	notes: 'Spannungsabfall-Formel: ΔU = 2 × L × I × ρ / A\nρ (Kupfer) = 0.0178 Ω·mm²/m, L = Länge in m, I = Strom in A, A = Querschnitt in mm²\n\nFaustregel 4–20 mA: Maximaler Leitungsschleifenwiderstand = (U_Versorgung − U_min_Empfänger) / 0.02 A'
};
