import type { ChecklistTemplate } from '../types';

export const dplReview: ChecklistTemplate = {
	slug: 'dpl-review',
	title: 'Datenpunktlisten-Review',
	title_en: 'Data Point List Review',
	subtitle: 'Vollständigkeit, Namenskonventionen, Ranges, Alarmgrenzen',
	subtitle_en: 'Completeness, naming conventions, ranges, alarm limits',
	description: 'Systematische Überprüfung einer Datenpunktliste (DPL) vor oder nach der Inbetriebnahme. Prüft Vollständigkeit, Namenskonventionen, Signaltypen, Ranges und Alarmgrenzen.',
	description_en: 'Systematic review of a data point list (DPL) before or after commissioning. Checks completeness, naming conventions, signal types, ranges, and alarm limits.',
	category: 'Dokumentation',
	icon: 'table',
	color: '#059669',
	areas: ['ga'],
	norm: ['VDI 3814-2', 'SIA 386.110'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Vollständigkeit',
			title_en: 'Completeness',
			items: [
				{ id: 'dpl-alle-anlagen', title: 'Alle Anlagenteile im DPL vorhanden (Heizung, Lüftung, Kälte, Beleuchtung, etc.)', title_en: 'All system components present in DPL (heating, ventilation, cooling, lighting, etc.)', critical: true },
				{ id: 'dpl-alle-signale', title: 'Alle Signale pro Anlage vorhanden: AI, AO, DI, DO', title_en: 'All signals per system present: AI, AO, DI, DO', critical: true, hint: 'Typisch pro Pumpe: Freigabe DO, Betriebsrückmeldung DI, Störmeldung DI, ev. Leistung AI', hint_en: 'Typical per pump: enable DO, run feedback DI, fault DI, possibly power AI' },
				{ id: 'dpl-handmessung', title: 'Manuelle Messpunkte (Thermometer, Manometer) ebenfalls erfasst', title_en: 'Manual measurement points (thermometers, pressure gauges) also captured' },
				{ id: 'dpl-alarmzaehler', title: 'Anzahl Datenpunkte plausibel (Richtwert: ~5–15 DP pro Regelkreis)', title_en: 'Number of data points plausible (guideline: ~5–15 DPs per control loop)' }
			]
		},
		{
			title: 'Namenskonventionen',
			title_en: 'Naming Conventions',
			items: [
				{ id: 'dpl-name-schema', title: 'Naming-Schema dokumentiert und einheitlich angewendet', title_en: 'Naming scheme documented and applied consistently', critical: true, hint: 'Beispiel: GEBÄUDE_ANLAGE_FUNKTION_TYP (z.B. MFH_HZG_VL_T)', hint_en: 'Example: BUILDING_SYSTEM_FUNCTION_TYPE (e.g. MFH_HZG_VL_T)' },
				{ id: 'dpl-name-konsistent', title: 'Konsistente Abkürzungen: VL/RL, EIN/AUS, SOLL/IST, STOER, BM', title_en: 'Consistent abbreviations: VL/RL, EIN/AUS, SOLL/IST, STOER, BM', critical: true },
				{ id: 'dpl-name-unique', title: 'Kein Datenpunkt-Name doppelt vorhanden', title_en: 'No duplicate data point names' },
				{ id: 'dpl-name-sonderzeichen', title: 'Keine Sonderzeichen, Umlaute oder Leerzeichen in Datenpunktbezeichnern', title_en: 'No special characters, umlauts, or spaces in data point identifiers', hint: 'Umlaute (ä/ö/ü) können in manchen Systemen Probleme verursachen → ae/oe/ue verwenden', hint_en: 'Umlauts (ä/ö/ü) can cause issues in some systems → use ae/oe/ue instead' },
				{ id: 'dpl-name-lang', title: 'Bezeichnerlänge ≤ 32 Zeichen (BACnet-Limit)', title_en: 'Identifier length ≤ 32 characters (BACnet limit)' }
			]
		},
		{
			title: 'Signaltypen & Ranges',
			title_en: 'Signal Types & Ranges',
			items: [
				{ id: 'dpl-typ-ai', title: 'AI-Datenpunkte: Einheit, Messbereich (Min/Max), Auflösung definiert', title_en: 'AI data points: unit, measuring range (min/max), resolution defined', critical: true },
				{ id: 'dpl-typ-ao', title: 'AO-Datenpunkte: Ausgangsbereich (0–100%, 0–10V, 4–20mA), Sicherheitsstellung definiert', title_en: 'AO data points: output range (0–100%, 0–10V, 4–20mA), fail-safe position defined', critical: true },
				{ id: 'dpl-typ-di', title: 'DI-Datenpunkte: Aktivpegel (0=aktiv oder 1=aktiv), Entprellzeit definiert', title_en: 'DI data points: active level (0=active or 1=active), debounce time defined' },
				{ id: 'dpl-typ-do', title: 'DO-Datenpunkte: Ausgangslogik (1=EIN oder invertiert), Failsafe-Stellung definiert', title_en: 'DO data points: output logic (1=ON or inverted), fail-safe position defined' },
				{ id: 'dpl-plausibel', title: 'Messbereiche physikalisch plausibel', title_en: 'Measuring ranges physically plausible', hint: 'Beispiel: PT100 Vorlauf Heizung: 0–120°C sinnvoll, nicht 0–1000°C', hint_en: 'Example: PT100 heating flow: 0–120°C reasonable, not 0–1000°C' }
			]
		},
		{
			title: 'Alarmgrenzen',
			title_en: 'Alarm Limits',
			items: [
				{ id: 'dpl-alarm-definiert', title: 'Alarmgrenzen für alle kritischen Datenpunkte definiert', title_en: 'Alarm limits defined for all critical data points', critical: true },
				{ id: 'dpl-alarm-stufen', title: 'Alarmpriorität (Kritisch / Hoch / Mittel / Niedrig) für jeden Alarm festgelegt', title_en: 'Alarm priority (Critical / High / Medium / Low) defined for each alarm' },
				{ id: 'dpl-alarm-verzoegerung', title: 'Einschaltverzögerungen konfiguriert (keine Alarme bei kurzen Schwankungen)', title_en: 'On-delay timers configured (no alarms on brief fluctuations)', hint: 'Typisch 5–30 s für analoge Werte, 0 s für Motorschutz', hint_en: 'Typically 5–30 s for analogue values, 0 s for motor protection' },
				{ id: 'dpl-alarm-hysterese', title: 'Hysterese für analoge Alarm-Schwellwerte definiert (verhindert Chattering)', title_en: 'Hysteresis defined for analogue alarm thresholds (prevents chattering)' },
				{ id: 'dpl-alarm-rueckmeldung', title: 'Fehlende Rückmeldung (Sollbefehl ≠ Istzustand) mit Alarmverzögerung versehen', title_en: 'Missing feedback (command ≠ actual state) fitted with alarm delay', hint: 'Typisch: 5–10 s nach Befehl, kein sofortiger Alarm', hint_en: 'Typically: 5–10 s after command, no immediate alarm' }
			]
		},
		{
			title: 'Trending & Historisierung',
			title_en: 'Trending & Historisation',
			items: [
				{ id: 'dpl-trend-relevante', title: 'Alle regelungstechnisch relevanten Punkte für Trending markiert', title_en: 'All control-relevant points marked for trending', critical: true, hint: 'Minimum: VL, RL, Sollwert, Stellgrösse für jeden Regelkreis', hint_en: 'Minimum: flow, return, setpoint, output for each control loop' },
				{ id: 'dpl-trend-aufloesung', title: 'Auflösung definiert: COV-Schwelle oder Polling-Intervall (z.B. 60 s)', title_en: 'Resolution defined: COV threshold or polling interval (e.g. 60 s)' },
				{ id: 'dpl-trend-archiv', title: 'Archivierungsdauer definiert (typisch: Minuten 1 Jahr, Stunden 10 Jahre)', title_en: 'Archiving duration defined (typically: minutes 1 year, hourly 10 years)' }
			]
		},
		{
			title: 'Freigaben & Abnahme',
			title_en: 'Approvals & Acceptance',
			items: [
				{ id: 'dpl-frei-planer', title: 'DPL vom Planer (MSR/GA) geprüft und freigegeben', title_en: 'DPL reviewed and approved by planner (controls/BA)', critical: true },
				{ id: 'dpl-frei-betreiber', title: 'DPL vom Betreiber geprüft und freigegeben', title_en: 'DPL reviewed and approved by operator' },
				{ id: 'dpl-version', title: 'Versionsnummer und Datum auf DPL vorhanden', title_en: 'Version number and date present on DPL' },
				{ id: 'dpl-aenderungen', title: 'Änderungsprotokoll für nachträgliche DPL-Anpassungen etabliert', title_en: 'Change log established for subsequent DPL modifications' }
			]
		}
	]
};
