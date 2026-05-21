import type { ReferenceTable } from '../types';

export const steuerkabel: ReferenceTable = {
	slug: 'steuerkabel',
	title: 'Steuerkabel-Querschnitte',
	title_en: 'Control Cable Cross-Sections',
	subtitle: 'Mindestquerschnitte, Leitungslängen, Spannungsabfall',
	subtitle_en: 'Minimum cross-sections, cable lengths, voltage drop',
	category: 'Elektro',
	icon: 'zap',
	color: '#f59e0b',
	areas: ['elektro', 'ga'],
	norm: ['NIN 2020 (CH)', 'VDE 0100', 'EN 60228', 'IEC 60189'],
	updated: '2026-05-15',
	description:
		'Richtwerte für Steuerkabel-Querschnitte in der GA. Beachte: Bei 4–20 mA ist der Spannungsabfall unkritisch (Stromschnittstelle), bei 0–10 V und 24V-Signalen ist die Leitungslänge zu begrenzen.',
	description_en:
		'Reference values for control cable cross-sections in BA. Note: For 4–20 mA, voltage drop is uncritical (current interface); for 0–10 V and 24 V signals, cable length must be limited.',
	columns: [
		{ key: 'signal', label: 'Signaltyp', label_en: 'Signal Type', highlight: true },
		{ key: 'quer', label: 'Min. Querschnitt', label_en: 'Min. Cross-section', mono: true },
		{
			key: 'max_laenge',
			label: 'Max. Länge (Richtwert)',
			label_en: 'Max. Length (guideline)',
			mono: true
		},
		{ key: 'abschirmung', label: 'Schirmung', label_en: 'Shielding', mono: true },
		{ key: 'bemerkung', label: 'Bemerkung', label_en: 'Notes' }
	],
	rows: [
		{
			signal: '4–20 mA Analogsignal',
			signal_en: '4–20 mA analogue signal',
			quer: '0.5 mm²',
			max_laenge: '≤ 500 m',
			abschirmung: 'Empfohlen',
			abschirmung_en: 'Recommended',
			bemerkung: 'Schleifenwiderstand < 500 Ω typisch (Speisespannung 24V / Bürde)',
			bemerkung_en: 'Loop resistance < 500 Ω typical (supply 24 V / burden)'
		},
		{
			signal: '0–10 V Analogsignal',
			signal_en: '0–10 V analogue signal',
			quer: '0.75 mm²',
			max_laenge: '≤ 100 m',
			abschirmung: 'Empfohlen',
			abschirmung_en: 'Recommended',
			bemerkung: 'Spannungsabfall < 0.1 V zulässig → höherer Querschnitt bei längerer Leitung',
			bemerkung_en: 'Voltage drop < 0.1 V permissible → larger cross-section for longer cables'
		},
		{
			signal: '0–10 V Analogsignal (200 m)',
			signal_en: '0–10 V analogue signal (200 m)',
			quer: '1.5 mm²',
			max_laenge: '≤ 200 m',
			abschirmung: 'Ja',
			abschirmung_en: 'Yes',
			bemerkung: 'Bei 150 m+: Schirmung Pflicht, Leiterwiderstand prüfen',
			bemerkung_en: 'From 150 m: shielding mandatory, check conductor resistance'
		},
		{
			signal: 'DI/DO 24 VDC Digitaleingang',
			signal_en: 'DI/DO 24 VDC digital input',
			quer: '0.5 mm²',
			max_laenge: '≤ 300 m',
			abschirmung: 'Nein',
			abschirmung_en: 'No',
			bemerkung: 'Spannungsabfall < 2 V zulässig bei 24V',
			bemerkung_en: 'Voltage drop < 2 V permissible at 24 V'
		},
		{
			signal: 'DI/DO 24 VAC Digitalausgang',
			signal_en: 'DI/DO 24 VAC digital output',
			quer: '0.75 mm²',
			max_laenge: '≤ 200 m',
			abschirmung: 'Nein',
			abschirmung_en: 'No',
			bemerkung: 'Motorschutz, Schütze: Kabelquerschnitt nach Strom!',
			bemerkung_en: 'Motor protection, contactors: cable size per current!'
		},
		{
			signal: 'PT100 / PT1000 Fühler',
			signal_en: 'PT100 / PT1000 sensor',
			quer: '0.75 mm²',
			max_laenge: '≤ 100 m',
			abschirmung: 'Ja',
			abschirmung_en: 'Yes',
			bemerkung: 'PT100: 4-Leiter-Schaltung bei > 50 m empfohlen (Leitungswiderstand-Kompensation)',
			bemerkung_en: 'PT100: 4-wire connection recommended above 50 m (lead resistance compensation)'
		},
		{
			signal: 'PT1000 Fühler',
			signal_en: 'PT1000 sensor',
			quer: '0.5 mm²',
			max_laenge: '≤ 300 m',
			abschirmung: 'Ja',
			abschirmung_en: 'Yes',
			bemerkung: 'PT1000: Leitungswiderstand < 10% des Nennwiderstands',
			bemerkung_en: 'PT1000: lead resistance < 10 % of nominal resistance'
		},
		{
			signal: 'Modbus RTU / RS-485',
			signal_en: 'Modbus RTU / RS-485',
			quer: '0.5 mm²',
			max_laenge: '≤ 1200 m',
			abschirmung: 'Ja',
			abschirmung_en: 'Yes',
			bemerkung: 'Verdrilltes Paar, Schirm einseitig am Master, 120 Ω Abschluss',
			bemerkung_en: 'Twisted pair, shield grounded at master end, 120 Ω termination'
		},
		{
			signal: 'KNX TP Bus',
			signal_en: 'KNX TP Bus',
			quer: '0.8 mm²',
			max_laenge: '≤ 350 m',
			abschirmung: 'Ja (YCYM)',
			abschirmung_en: 'Yes (YCYM)',
			bemerkung: 'KNX-spezifisches Kabel oder JY(St)Y 2×2×0.8',
			bemerkung_en: 'KNX-specific cable or JY(St)Y 2×2×0.8'
		},
		{
			signal: 'DALI Bus',
			signal_en: 'DALI Bus',
			quer: '0.5 mm²',
			max_laenge: '≤ 300 m',
			abschirmung: 'Nein',
			abschirmung_en: 'No',
			bemerkung: 'Unkritisch — DALI ist Niederspannung (16V), keine Polarität erforderlich',
			bemerkung_en: 'Uncritical — DALI is low voltage (16 V), no polarity required'
		},
		{
			signal: '24 VAC Versorgung Aktor',
			signal_en: '24 VAC actuator supply',
			quer: '1.0 mm²',
			max_laenge: '≤ 50 m',
			abschirmung: 'Nein',
			abschirmung_en: 'No',
			bemerkung: 'Spannungsabfall < 5%: U = I × R × 2L / A',
			bemerkung_en: 'Voltage drop < 5 %: U = I × R × 2L / A'
		},
		{
			signal: '230 VAC Steuerkabel (Motor)',
			signal_en: '230 VAC control cable (motor)',
			quer: '1.5 mm²',
			max_laenge: 'NIN prüfen',
			max_laenge_en: 'Check NIN',
			abschirmung: 'Nein',
			abschirmung_en: 'No',
			bemerkung: 'NIN/VDE: Nach Strombelastbarkeit und Absicherung auslegen',
			bemerkung_en: 'NIN/VDE: size per current capacity and protection rating'
		}
	],
	notes:
		'Spannungsabfall-Formel: ΔU = 2 × L × I × ρ / A\nρ (Kupfer) = 0.0178 Ω·mm²/m, L = Länge in m, I = Strom in A, A = Querschnitt in mm²\n\nFaustregel 4–20 mA: Maximaler Leitungsschleifenwiderstand = (U_Versorgung − U_min_Empfänger) / 0.02 A',
	notes_en:
		'Voltage drop formula: ΔU = 2 × L × I × ρ / A\nρ (copper) = 0.0178 Ω·mm²/m, L = length in m, I = current in A, A = cross-section in mm²\n\nRule of thumb 4–20 mA: Max. loop resistance = (U_supply − U_min_receiver) / 0.02 A'
};
