import type { ChecklistTemplate } from '../types';

export const ibnHeizung: ChecklistTemplate = {
	slug: 'ibn-heizung',
	title: 'IBN Heizungsanlage',
	subtitle: 'Inbetriebnahme — hydraulisch, elektrisch, regelungstechnisch',
	description: 'Strukturierte Inbetriebnahme einer wassergeführten Heizungsanlage. Reihenfolge: erst hydraulisch, dann elektrisch, dann regelungstechnisch.',
	category: 'IBN',
	icon: 'flame',
	color: '#dc2626',
	areas: ['hlk'],
	norm: ['SIA 384/2', 'SIA 384/3', 'SWKI 91-1'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Vorbereitung & Sichtkontrolle',
			items: [
				{ id: 'pre-doku', title: 'Schema & Hydraulikplan vorhanden', critical: true },
				{ id: 'pre-typenschild', title: 'Typenschilder aller Komponenten dokumentiert' },
				{ id: 'pre-isolation', title: 'Rohrleitungen vollständig isoliert', hint: 'Insbesondere KW-führende Leitungen — Kondensatschäden' },
				{ id: 'pre-beschriftung', title: 'Beschriftung Vor-/Rücklauf, Strangnummern, Absperrungen' },
				{ id: 'pre-entwasserung', title: 'Entwässerung und Entlüfter zugänglich' }
			]
		},
		{
			title: 'Hydraulik',
			items: [
				{ id: 'h-fuellen', title: 'Anlage gefüllt und entlüftet', critical: true, hint: 'Reines Heizungswasser nach SWKI BT102-01 — Leitfähigkeit < 100 µS/cm' },
				{ id: 'h-druckhaltung', title: 'Vordruck MAG gemäss statischer Höhe + 0.3 bar', critical: true, hint: 'Faustregel: p₀ = h/10 + 0.3 bar' },
				{ id: 'h-sicherheitsventil', title: 'Sicherheitsventil geprüft & abblasleitung dicht', critical: true },
				{ id: 'h-spuelen', title: 'Anlage gespült, Schmutzfänger gereinigt' },
				{ id: 'h-abgleich', title: 'Hydraulischer Abgleich nach Planungswerten durchgeführt', norm: 'SIA 384/3' },
				{ id: 'h-strangregelventile', title: 'Strangregelventile auf berechnete Voreinstellung gesetzt' }
			]
		},
		{
			title: 'Wärmeerzeuger',
			items: [
				{ id: 'we-brennstoff', title: 'Brennstoffzufuhr / Stromzufuhr funktioniert', critical: true },
				{ id: 'we-abgas', title: 'Abgasweg frei und dicht (bei Kessel)' },
				{ id: 'we-funktion', title: 'Wärmeerzeuger startet und moduliert' },
				{ id: 'we-temperatursprung', title: 'Temperatursprung VL/RL plausibel (~10–20 K)' },
				{ id: 'we-jah', title: 'JAZ-Messstelle bei WP korrekt verdrahtet (WMZ + Stromzähler)' }
			]
		},
		{
			title: 'Pumpen & Mischer',
			items: [
				{ id: 'p-laufrichtung', title: 'Laufrichtung Pumpe korrekt (Drehrichtung markiert)' },
				{ id: 'p-foerderhoehe', title: 'Pumpenförderhöhe an Anlage angepasst (nicht überdimensioniert)' },
				{ id: 'm-mischer', title: 'Mischer-Stellantrieb fährt komplett auf/zu', critical: true },
				{ id: 'm-flow', title: 'Bei voll auf: Soll-Vorlauf wird erreicht' }
			]
		},
		{
			title: 'Regelung & Heizkurve',
			items: [
				{ id: 'r-aussenfuehler', title: 'Aussenfühler am korrekten Ort (N-Fassade, schattig)', critical: true },
				{ id: 'r-raumfuehler', title: 'Raumfühler im Referenzraum (kein Sonne, keine Heizkörper-Nähe)' },
				{ id: 'r-heizkurve', title: 'Heizkurve nach Hersteller-Vorgabe eingestellt', hint: 'Faustwerte: FBH 0.4–0.8, Radiator 1.0–2.2' },
				{ id: 'r-grenzwerte', title: 'Min/Max Vorlauf, Heizgrenze, Frostschutz parametriert' },
				{ id: 'r-zeitprogramm', title: 'Zeitprogramme (Tag/Nacht/Sa/So) gesetzt' }
			]
		},
		{
			title: 'Übergabe',
			items: [
				{ id: 'u-revisionsplan', title: 'Revisionsplan + Schemata an Betreiber übergeben', critical: true },
				{ id: 'u-bedienung', title: 'Betreiber-Einweisung Bedienung durchgeführt' },
				{ id: 'u-notbetrieb', title: 'Notbetrieb-Schalter erklärt' },
				{ id: 'u-wartungsvertrag', title: 'Wartungsvertrag empfohlen / abgeschlossen' },
				{ id: 'u-protokoll', title: 'IBN-Protokoll unterschrieben' }
			]
		}
	]
};
