import type { ChecklistTemplate } from '../types';

export const dplReview: ChecklistTemplate = {
	slug: 'dpl-review',
	title: 'Datenpunktlisten-Review',
	subtitle: 'Vollständigkeit, Namenskonventionen, Ranges, Alarmgrenzen',
	description: 'Systematische Überprüfung einer Datenpunktliste (DPL) vor oder nach der Inbetriebnahme. Prüft Vollständigkeit, Namenskonventionen, Signaltypen, Ranges und Alarmgrenzen.',
	category: 'Dokumentation',
	icon: 'table',
	color: '#059669',
	areas: ['ga'],
	norm: ['VDI 3814-2', 'SIA 386.110'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Vollständigkeit',
			items: [
				{ id: 'dpl-alle-anlagen', title: 'Alle Anlagenteile im DPL vorhanden (Heizung, Lüftung, Kälte, Beleuchtung, etc.)', critical: true },
				{ id: 'dpl-alle-signale', title: 'Alle Signale pro Anlage vorhanden: AI, AO, DI, DO', critical: true, hint: 'Typisch pro Pumpe: Freigabe DO, Betriebsrückmeldung DI, Störmeldung DI, ev. Leistung AI' },
				{ id: 'dpl-handmessung', title: 'Manuelle Messpunkte (Thermometer, Manometer) ebenfalls erfasst' },
				{ id: 'dpl-alarmzaehler', title: 'Anzahl Datenpunkte plausibel (Richtwert: ~5–15 DP pro Regelkreis)' }
			]
		},
		{
			title: 'Namenskonventionen',
			items: [
				{ id: 'dpl-name-schema', title: 'Naming-Schema dokumentiert und einheitlich angewendet', critical: true, hint: 'Beispiel: GEBÄUDE_ANLAGE_FUNKTION_TYP (z.B. MFH_HZG_VL_T)' },
				{ id: 'dpl-name-konsistent', title: 'Konsistente Abkürzungen: VL/RL, EIN/AUS, SOLL/IST, STOER, BM', critical: true },
				{ id: 'dpl-name-unique', title: 'Kein Datenpunkt-Name doppelt vorhanden' },
				{ id: 'dpl-name-sonderzeichen', title: 'Keine Sonderzeichen, Umlaute oder Leerzeichen in Datenpunktbezeichnern', hint: 'Umlaute (ä/ö/ü) können in manchen Systemen Probleme verursachen → ae/oe/ue verwenden' },
				{ id: 'dpl-name-lang', title: 'Bezeichnerlänge ≤ 32 Zeichen (BACnet-Limit)' }
			]
		},
		{
			title: 'Signaltypen & Ranges',
			items: [
				{ id: 'dpl-typ-ai', title: 'AI-Datenpunkte: Einheit, Messbereich (Min/Max), Auflösung definiert', critical: true },
				{ id: 'dpl-typ-ao', title: 'AO-Datenpunkte: Ausgangsbereich (0–100%, 0–10V, 4–20mA), Sicherheitsstellung definiert', critical: true },
				{ id: 'dpl-typ-di', title: 'DI-Datenpunkte: Aktivpegel (0=aktiv oder 1=aktiv), Entprellzeit definiert' },
				{ id: 'dpl-typ-do', title: 'DO-Datenpunkte: Ausgangslogik (1=EIN oder invertiert), Failsafe-Stellung definiert' },
				{ id: 'dpl-plausibel', title: 'Messbereiche physikalisch plausibel', hint: 'Beispiel: PT100 Vorlauf Heizung: 0–120°C sinnvoll, nicht 0–1000°C' }
			]
		},
		{
			title: 'Alarmgrenzen',
			items: [
				{ id: 'dpl-alarm-definiert', title: 'Alarmgrenzen für alle kritischen Datenpunkte definiert', critical: true },
				{ id: 'dpl-alarm-stufen', title: 'Alarmpriorität (Kritisch / Hoch / Mittel / Niedrig) für jeden Alarm festgelegt' },
				{ id: 'dpl-alarm-verzoegerung', title: 'Einschaltverzögerungen konfiguriert (keine Alarme bei kurzen Schwankungen)', hint: 'Typisch 5–30 s für analoge Werte, 0 s für Motorschutz' },
				{ id: 'dpl-alarm-hysterese', title: 'Hysterese für analoge Alarm-Schwellwerte definiert (verhindert Chattering)' },
				{ id: 'dpl-alarm-rueckmeldung', title: 'Fehlende Rückmeldung (Sollbefehl ≠ Istzustand) mit Alarmverzögerung versehen', hint: 'Typisch: 5–10 s nach Befehl, kein sofortiger Alarm' }
			]
		},
		{
			title: 'Trending & Historisierung',
			items: [
				{ id: 'dpl-trend-relevante', title: 'Alle regelungstechnisch relevanten Punkte für Trending markiert', critical: true, hint: 'Minimum: VL, RL, Sollwert, Stellgrösse für jeden Regelkreis' },
				{ id: 'dpl-trend-aufloesung', title: 'Auflösung definiert: COV-Schwelle oder Polling-Intervall (z.B. 60 s)' },
				{ id: 'dpl-trend-archiv', title: 'Archivierungsdauer definiert (typisch: Minuten 1 Jahr, Stunden 10 Jahre)' }
			]
		},
		{
			title: 'Freigaben & Abnahme',
			items: [
				{ id: 'dpl-frei-planer', title: 'DPL vom Planer (MSR/GA) geprüft und freigegeben', critical: true },
				{ id: 'dpl-frei-betreiber', title: 'DPL vom Betreiber geprüft und freigegeben' },
				{ id: 'dpl-version', title: 'Versionsnummer und Datum auf DPL vorhanden' },
				{ id: 'dpl-aenderungen', title: 'Änderungsprotokoll für nachträgliche DPL-Anpassungen etabliert' }
			]
		}
	]
};
