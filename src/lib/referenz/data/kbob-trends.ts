import type { ReferenceTable } from '../types';

export const kbobTrends: ReferenceTable = {
	slug: 'kbob-trends',
	title: 'COV-Schwellen für Trends nach KBOB',
	title_en: 'COV Thresholds for Trends per KBOB',
	subtitle: 'Richtwerte für COV_Increment und Trendaufzeichnung',
	subtitle_en: 'Guide values for COV_Increment and trend logging',
	category: 'Protokoll',
	icon: 'list',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021'],
	updated: '2026-10-17',
	description:
		'Ab welcher Änderung ein Wert bei COV-Trendaufzeichnung neu gespeichert wird. Die KBOB nennt diese Werte als Richtwerte; festgelegt werden sie vom Unternehmer zusammen mit dem Planer, für jede Anlage.',
	description_en:
		'The change at which a value is stored again with COV trend logging. KBOB gives these as guide values; the contractor sets them together with the planner for each plant.',
	notes:
		'Quelle: KBOB-Empfehlung BACnet Anwendung 2021, Kap. 6.6, Tab. 13 und 14. Grundsätzlich zeitgetriggert aufzeichnen (Logging_Type POLLED, 15 min); COV für binäre Zustände und Zählerwerte. Allgemein soll die Schwelle zwischen 1 % und 5 % der maximalen Werteänderung liegen. Für alle Trend Logs: Stop_When_Full FALSE, Notification_Threshold so, dass Buffer Ready zweimal pro Tag kommt, lokale Vorhaltezeit mindestens 10 Tage. Log_Interval wird in Hundertstelsekunden angegeben: 15 min = 90000.',
	notes_en:
		'Source: KBOB recommendation BACnet application 2021, ch. 6.6, tables 13 and 14. As a rule, log time-triggered (Logging_Type POLLED, 15 min); COV for binary states and meter values. In general the threshold should be between 1 % and 5 % of the maximum change. For all trend logs: Stop_When_Full FALSE, Notification_Threshold so that Buffer Ready occurs twice a day, local retention at least 10 days. Log_Interval is given in hundredths of a second: 15 min = 90000.',
	columns: [
		{ key: 'wert', label: 'Wertetyp', label_en: 'Value Type', highlight: true },
		{ key: 'einheit', label: 'Einheit', label_en: 'Unit', mono: true },
		{ key: 'schwelle', label: 'COV-Schwelle', label_en: 'COV Threshold', mono: true },
		{ key: 'art', label: 'Aufzeichnung', label_en: 'Logging' }
	],
	rows: [
		{
			wert: 'Raumtemperatur',
			wert_en: 'Room temperature',
			einheit: 'K',
			schwelle: '± 0.2',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Temperatur Kälteanlagen',
			wert_en: 'Temperature, refrigeration plants',
			einheit: 'K',
			schwelle: '± 0.1',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Relative Luftfeuchte',
			wert_en: 'Relative humidity',
			einheit: '%',
			schwelle: '± 2',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Ansteuerung Antriebe',
			wert_en: 'Actuator command',
			einheit: '%',
			schwelle: '± 2',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Ansteuerung Absperrorgane',
			wert_en: 'Shut-off valve or damper command',
			einheit: '%',
			schwelle: '± 2',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Elektrische Leistung',
			wert_en: 'Electrical power',
			einheit: 'kW',
			schwelle: '± 1',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Luftdruck',
			wert_en: 'Air pressure',
			einheit: 'Pa',
			schwelle: '± 20',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Wasserdruck',
			wert_en: 'Water pressure',
			einheit: 'bar',
			schwelle: '± 0.1',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Volumenstrom Wasser',
			wert_en: 'Water flow rate',
			einheit: 'm³/h',
			schwelle: '± 1',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Volumenstrom Luft',
			wert_en: 'Air flow rate',
			einheit: 'm³/h',
			schwelle: '10 % des Maximalwerts',
			schwelle_en: '10 % of maximum',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Luftqualität CO₂',
			wert_en: 'Air quality CO₂',
			einheit: 'ppm',
			schwelle: '± 50',
			art: 'zeitgetriggert 15 min oder COV',
			art_en: 'time-triggered 15 min or COV'
		},
		{
			wert: 'Energie Wärme, Elektro',
			wert_en: 'Energy, heat and electricity',
			einheit: 'kWh',
			schwelle: '—',
			art: 'zeitgetriggert 15 min, über alle AS zeitsynchron (Align_Intervals, Interval_Offset); für Zählwerte ist auch COV empfohlen',
			art_en:
				'time-triggered 15 min, synchronised across all stations (Align_Intervals, Interval_Offset); COV is also recommended for meter values'
		},
		{
			wert: 'Binäre Schaltzustände',
			wert_en: 'Binary switching states',
			einheit: '—',
			schwelle: 'jede Änderung',
			schwelle_en: 'every change',
			art: 'COV/COS',
			art_en: 'COV/COS'
		}
	]
};
