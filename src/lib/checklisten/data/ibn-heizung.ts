import type { ChecklistTemplate } from '../types';

export const ibnHeizung: ChecklistTemplate = {
	slug: 'ibn-heizung',
	title: 'IBN Heizungsanlage',
	title_en: 'Commissioning — Heating System',
	subtitle: 'Inbetriebnahme — hydraulisch, elektrisch, regelungstechnisch',
	subtitle_en: 'Commissioning — hydraulic, electrical, control',
	description:
		'Strukturierte Inbetriebnahme einer wassergeführten Heizungsanlage. Reihenfolge: erst hydraulisch, dann elektrisch, dann regelungstechnisch.',
	description_en:
		'Structured commissioning of a hydronic heating system. Order: hydraulic first, then electrical, then controls.',
	category: 'IBN',
	icon: 'flame',
	color: '#dc2626',
	areas: ['hlk'],
	norm: ['SIA 384/2', 'SIA 384/3', 'SWKI 91-1'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Vorbereitung & Sichtkontrolle',
			title_en: 'Preparation & Visual Inspection',
			items: [
				{
					id: 'pre-doku',
					title: 'Schema & Hydraulikplan vorhanden',
					title_en: 'Hydraulic diagram and P&ID available',
					critical: true
				},
				{
					id: 'pre-typenschild',
					title: 'Typenschilder aller Komponenten dokumentiert',
					title_en: 'Nameplates of all components documented'
				},
				{
					id: 'pre-isolation',
					title: 'Rohrleitungen vollständig isoliert',
					title_en: 'Pipework fully insulated',
					hint: 'Insbesondere KW-führende Leitungen — Kondensatschäden',
					hint_en: 'Especially cold water pipes — condensation damage'
				},
				{
					id: 'pre-beschriftung',
					title: 'Beschriftung Vor-/Rücklauf, Strangnummern, Absperrungen',
					title_en: 'Labelling of flow/return, branch numbers, isolation valves'
				},
				{
					id: 'pre-entwasserung',
					title: 'Entwässerung und Entlüfter zugänglich',
					title_en: 'Drain points and air vents accessible'
				}
			]
		},
		{
			title: 'Hydraulik',
			title_en: 'Hydraulics',
			items: [
				{
					id: 'h-fuellen',
					title: 'Anlage gefüllt und entlüftet',
					title_en: 'System filled and vented',
					critical: true,
					hint: 'Reines Heizungswasser nach SWKI BT102-01 — Leitfähigkeit < 100 µS/cm',
					hint_en: 'Clean heating water per SWKI BT102-01 — conductivity < 100 µS/cm'
				},
				{
					id: 'h-druckhaltung',
					title: 'Vordruck MAG gemäss statischer Höhe + 0.3 bar',
					title_en: 'Expansion vessel pre-charge per static height + 0.3 bar',
					critical: true,
					hint: 'Faustregel: p₀ = h/10 + 0.3 bar',
					hint_en: 'Rule of thumb: p₀ = h/10 + 0.3 bar'
				},
				{
					id: 'h-sicherheitsventil',
					title: 'Sicherheitsventil geprüft & abblasleitung dicht',
					title_en: 'Safety valve tested and blow-off pipe sealed',
					critical: true
				},
				{
					id: 'h-spuelen',
					title: 'Anlage gespült, Schmutzfänger gereinigt',
					title_en: 'System flushed, dirt separators cleaned'
				},
				{
					id: 'h-abgleich',
					title: 'Hydraulischer Abgleich nach Planungswerten durchgeführt',
					title_en: 'Hydraulic balancing performed per design values',
					norm: 'SIA 384/3'
				},
				{
					id: 'h-strangregelventile',
					title: 'Strangregelventile auf berechnete Voreinstellung gesetzt',
					title_en: 'Branch balancing valves set to calculated pre-setting'
				}
			]
		},
		{
			title: 'Wärmeerzeuger',
			title_en: 'Heat Generator',
			items: [
				{
					id: 'we-brennstoff',
					title: 'Brennstoffzufuhr / Stromzufuhr funktioniert',
					title_en: 'Fuel/power supply functional',
					critical: true
				},
				{
					id: 'we-abgas',
					title: 'Abgasweg frei und dicht (bei Kessel)',
					title_en: 'Flue gas path clear and sealed (boiler)'
				},
				{
					id: 'we-funktion',
					title: 'Wärmeerzeuger startet und moduliert',
					title_en: 'Heat generator starts and modulates'
				},
				{
					id: 'we-temperatursprung',
					title: 'Temperatursprung VL/RL plausibel (~10–20 K)',
					title_en: 'Flow/return temperature spread plausible (~10–20 K)'
				},
				{
					id: 'we-jah',
					title: 'JAZ-Messstelle bei WP korrekt verdrahtet (WMZ + Stromzähler)',
					title_en: 'SCOP measurement point at HP correctly wired (heat meter + electricity meter)'
				}
			]
		},
		{
			title: 'Pumpen & Mischer',
			title_en: 'Pumps & Mixing Valves',
			items: [
				{
					id: 'p-laufrichtung',
					title: 'Laufrichtung Pumpe korrekt (Drehrichtung markiert)',
					title_en: 'Pump rotation direction correct (rotation marked)'
				},
				{
					id: 'p-foerderhoehe',
					title: 'Pumpenförderhöhe an Anlage angepasst (nicht überdimensioniert)',
					title_en: 'Pump head adjusted to system (not oversized)'
				},
				{
					id: 'm-mischer',
					title: 'Mischer-Stellantrieb fährt komplett auf/zu',
					title_en: 'Mixing valve actuator travels fully open/closed',
					critical: true
				},
				{
					id: 'm-flow',
					title: 'Bei voll auf: Soll-Vorlauf wird erreicht',
					title_en: 'At fully open: target flow temperature is achieved'
				}
			]
		},
		{
			title: 'Regelung & Heizkurve',
			title_en: 'Controls & Heating Curve',
			items: [
				{
					id: 'r-aussenfuehler',
					title: 'Aussenfühler am korrekten Ort (N-Fassade, schattig)',
					title_en: 'Outdoor sensor at correct location (N facade, shaded)',
					critical: true
				},
				{
					id: 'r-raumfuehler',
					title: 'Raumfühler im Referenzraum (kein Sonne, keine Heizkörper-Nähe)',
					title_en: 'Room sensor in reference room (no sun, away from radiators)'
				},
				{
					id: 'r-heizkurve',
					title: 'Heizkurve nach Hersteller-Vorgabe eingestellt',
					title_en: 'Heating curve set per manufacturer specification',
					hint: 'Faustwerte: FBH 0.4–0.8, Radiator 1.0–2.2',
					hint_en: 'Typical values: UFH 0.4–0.8, radiator 1.0–2.2'
				},
				{
					id: 'r-grenzwerte',
					title: 'Min/Max Vorlauf, Heizgrenze, Frostschutz parametriert',
					title_en: 'Min/max flow temp, heating limit, frost protection parameterised'
				},
				{
					id: 'r-zeitprogramm',
					title: 'Zeitprogramme (Tag/Nacht/Sa/So) gesetzt',
					title_en: 'Time programs (day/night/Sat/Sun) configured'
				}
			]
		},
		{
			title: 'Übergabe',
			title_en: 'Handover',
			items: [
				{
					id: 'u-revisionsplan',
					title: 'Revisionsplan + Schemata an Betreiber übergeben',
					title_en: 'As-built drawings + schematics handed over to operator',
					critical: true
				},
				{
					id: 'u-bedienung',
					title: 'Betreiber-Einweisung Bedienung durchgeführt',
					title_en: 'Operator training on system operation completed'
				},
				{
					id: 'u-notbetrieb',
					title: 'Notbetrieb-Schalter erklärt',
					title_en: 'Emergency operation switches explained'
				},
				{
					id: 'u-wartungsvertrag',
					title: 'Wartungsvertrag empfohlen / abgeschlossen',
					title_en: 'Maintenance contract recommended / concluded'
				},
				{
					id: 'u-protokoll',
					title: 'IBN-Protokoll unterschrieben',
					title_en: 'Commissioning record signed'
				}
			]
		}
	]
};
