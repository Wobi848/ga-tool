import type { ChecklistTemplate } from '../types';

export const ibnRLT: ChecklistTemplate = {
	slug: 'ibn-rlt',
	title: 'IBN Lüftungsanlage (RLT)',
	title_en: 'Commissioning — AHU (Air Handling Unit)',
	subtitle: 'Inbetriebnahme RLT-Anlage / Air Handling Unit',
	subtitle_en: 'Commissioning of AHU with heat recovery',
	description:
		'Inbetriebnahme einer Raumlufttechnischen Anlage mit Wärmerückgewinnung. Hygiene nach VDI 6022 / SIA 382.',
	description_en:
		'Commissioning of an air handling unit with heat recovery. Hygiene per VDI 6022 / SIA 382.',
	category: 'IBN',
	icon: 'wind',
	color: '#0891b2',
	areas: ['hlk'],
	norm: ['SIA 382/1', 'VDI 6022', 'EN 16798-3'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Mechanische Prüfung',
			title_en: 'Mechanical Inspection',
			items: [
				{
					id: 'mech-aufstellung',
					title: 'Gerät schwingungsentkoppelt aufgestellt',
					title_en: 'Unit installed with vibration isolation',
					critical: true
				},
				{
					id: 'mech-kanal',
					title: 'Kanalsystem dicht (Dichtheitsklasse mind. C nach EN 12237)',
					title_en: 'Ductwork sealed (leakage class min. C per EN 12237)',
					critical: true
				},
				{
					id: 'mech-zugang',
					title: 'Wartungstüren zugänglich, Filter wechselbar',
					title_en: 'Access panels accessible, filters changeable'
				},
				{
					id: 'mech-kondensat',
					title: 'Kondensatablauf mit Siphon und Gefälle',
					title_en: 'Condensate drain with trap and fall'
				},
				{
					id: 'mech-aussenluft',
					title: 'Aussenluftgitter mit Insekten-/Vogelschutz, > 1 m über Boden',
					title_en: 'Outdoor air grille with insect/bird guard, > 1 m above ground'
				}
			]
		},
		{
			title: 'Filter',
			title_en: 'Filters',
			items: [
				{
					id: 'f-klasse',
					title: 'Filterklasse mind. ePM1 50 % (alt F7) für Aussenluft',
					title_en: 'Filter class min. ePM1 50 % (old F7) for outdoor air',
					critical: true,
					norm: 'SIA 382/1'
				},
				{
					id: 'f-eingebaut',
					title: 'Filter eingebaut und Sitz dichtend (Bypass vermeiden)',
					title_en: 'Filter installed and seated airtight (avoid bypass)'
				},
				{
					id: 'f-druckmessung',
					title: 'Filterüberwachung (Δp-Messung) funktioniert',
					title_en: 'Filter monitoring (Δp measurement) functional'
				},
				{
					id: 'f-protokoll',
					title: 'Filtertyp und Wechseldatum dokumentiert',
					title_en: 'Filter type and replacement date documented'
				}
			]
		},
		{
			title: 'Wärmerückgewinnung',
			title_en: 'Heat Recovery',
			items: [
				{
					id: 'wrg-typ',
					title: 'WRG-Typ dokumentiert (Platten / Rotor / KVS)',
					title_en: 'HRC type documented (plate / rotary / run-around)'
				},
				{
					id: 'wrg-bypass',
					title: 'Bypass für Sommerbetrieb funktioniert',
					title_en: 'Bypass for summer operation functional'
				},
				{
					id: 'wrg-frostschutz',
					title: 'Frostschutzstrategie aktiv (Vorerhitzer / Bypass / Reduktion)',
					title_en: 'Frost protection strategy active (pre-heater / bypass / reduction)'
				},
				{
					id: 'wrg-effizienz',
					title: 'WRG-Wirkungsgrad gemessen ≥ Auslegungswert (typ. ≥ 73 %)',
					title_en: 'HRC efficiency measured ≥ design value (typ. ≥ 73 %)'
				}
			]
		},
		{
			title: 'Ventilatoren & Druckverhältnisse',
			title_en: 'Fans & Pressure Conditions',
			items: [
				{
					id: 'v-laufrichtung',
					title: 'Drehrichtung beider Ventilatoren korrekt',
					title_en: 'Rotation direction of both fans correct',
					critical: true
				},
				{
					id: 'v-volumenstrom',
					title: 'Volumenstrom Zuluft + Abluft gemessen',
					title_en: 'Supply and extract volume flows measured'
				},
				{
					id: 'v-bilanz',
					title: 'Bilanz Zuluft/Abluft je nach Konzept (Über-/Unterdruck)',
					title_en: 'Supply/extract balance per concept (positive/negative pressure)',
					hint: 'Innenraum überdruckig oder ausgeglichen',
					hint_en: 'Interior at positive pressure or balanced'
				},
				{
					id: 'v-druck',
					title: 'Externe Pressung im Auslegungsbereich (Pumpenkurve)',
					title_en: 'External static pressure within design range (fan curve)'
				}
			]
		},
		{
			title: 'Regelung',
			title_en: 'Controls',
			items: [
				{
					id: 'r-temp',
					title: 'Zulufttemperatur-Sollwert wird gehalten',
					title_en: 'Supply air temperature setpoint maintained'
				},
				{
					id: 'r-co2',
					title: 'CO₂-/VOC-Sensor korrekt positioniert (1.5 m, nicht über Heizkörper)',
					title_en: 'CO₂/VOC sensor correctly positioned (1.5 m, not above radiators)'
				},
				{
					id: 'r-bedarfsfuehrung',
					title: 'Bedarfsführung (DCV) reagiert auf Sensor',
					title_en: 'Demand-controlled ventilation (DCV) responds to sensor'
				},
				{
					id: 'r-zeitprogramm',
					title: 'Zeitprogramme + Boost-Funktion',
					title_en: 'Time programs + boost function'
				},
				{
					id: 'r-alarme',
					title: 'Alarme funktional (Filter, Frostschutz, Druckverlust)',
					title_en: 'Alarms functional (filter, frost protection, pressure drop)'
				}
			]
		},
		{
			title: 'Brand- und Hygiene',
			title_en: 'Fire Safety & Hygiene',
			items: [
				{
					id: 'b-brandschutzklappen',
					title: 'Brandschutzklappen geprüft (Auslösung + Wartungsschalter)',
					title_en: 'Fire dampers tested (actuation + maintenance switch)',
					critical: true
				},
				{
					id: 'b-rauchmelder',
					title: 'Rauchmelder in Hauptkanal Zu-/Abluft',
					title_en: 'Smoke detectors in main supply/extract duct'
				},
				{
					id: 'b-hygiene',
					title: 'Hygiene-Erstinspektion nach VDI 6022 dokumentiert',
					title_en: 'Initial hygiene inspection per VDI 6022 documented',
					critical: true,
					norm: 'VDI 6022'
				},
				{
					id: 'b-zugang',
					title: 'Hygiene-Zugang an kritischen Stellen (Befeuchter, Kühler)',
					title_en: 'Hygiene access at critical points (humidifier, cooler)'
				}
			]
		},
		{
			title: 'Übergabe',
			title_en: 'Handover',
			items: [
				{
					id: 'u-protokoll',
					title: 'Einregulierungsprotokoll erstellt',
					title_en: 'TAB (test and balance) record created',
					critical: true
				},
				{
					id: 'u-schema',
					title: 'Anlagenschema + Datenpunktliste übergeben',
					title_en: 'System diagram + data point list handed over'
				},
				{
					id: 'u-einweisung',
					title: 'Betreiber-Einweisung dokumentiert',
					title_en: 'Operator training documented'
				},
				{
					id: 'u-wartungsplan',
					title: 'Wartungsplan nach VDI 6022 erstellt',
					title_en: 'Maintenance plan per VDI 6022 created'
				}
			]
		}
	]
};
