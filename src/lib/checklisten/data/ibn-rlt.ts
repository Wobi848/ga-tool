import type { ChecklistTemplate } from '../types';

export const ibnRLT: ChecklistTemplate = {
	slug: 'ibn-rlt',
	title: 'IBN Lüftungsanlage (RLT)',
	subtitle: 'Inbetriebnahme RLT-Anlage / Air Handling Unit',
	description: 'Inbetriebnahme einer Raumlufttechnischen Anlage mit Wärmerückgewinnung. Hygiene nach VDI 6022 / SIA 382.',
	category: 'IBN',
	icon: 'wind',
	color: '#0891b2',
	areas: ['hlk'],
	norm: ['SIA 382/1', 'VDI 6022', 'EN 16798-3'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Mechanische Prüfung',
			items: [
				{ id: 'mech-aufstellung', title: 'Gerät schwingungsentkoppelt aufgestellt', critical: true },
				{ id: 'mech-kanal', title: 'Kanalsystem dicht (Dichtheitsklasse mind. C nach EN 12237)', critical: true },
				{ id: 'mech-zugang', title: 'Wartungstüren zugänglich, Filter wechselbar' },
				{ id: 'mech-kondensat', title: 'Kondensatablauf mit Siphon und Gefälle' },
				{ id: 'mech-aussenluft', title: 'Aussenluftgitter mit Insekten-/Vogelschutz, > 1 m über Boden' }
			]
		},
		{
			title: 'Filter',
			items: [
				{ id: 'f-klasse', title: 'Filterklasse mind. ePM1 50 % (alt F7) für Aussenluft', critical: true, norm: 'SIA 382/1' },
				{ id: 'f-eingebaut', title: 'Filter eingebaut und Sitz dichtend (Bypass vermeiden)' },
				{ id: 'f-druckmessung', title: 'Filterüberwachung (Δp-Messung) funktioniert' },
				{ id: 'f-protokoll', title: 'Filtertyp und Wechseldatum dokumentiert' }
			]
		},
		{
			title: 'Wärmerückgewinnung',
			items: [
				{ id: 'wrg-typ', title: 'WRG-Typ dokumentiert (Platten / Rotor / KVS)' },
				{ id: 'wrg-bypass', title: 'Bypass für Sommerbetrieb funktioniert' },
				{ id: 'wrg-frostschutz', title: 'Frostschutzstrategie aktiv (Vorerhitzer / Bypass / Reduktion)' },
				{ id: 'wrg-effizienz', title: 'WRG-Wirkungsgrad gemessen ≥ Auslegungswert (typ. ≥ 73 %)' }
			]
		},
		{
			title: 'Ventilatoren & Druckverhältnisse',
			items: [
				{ id: 'v-laufrichtung', title: 'Drehrichtung beider Ventilatoren korrekt', critical: true },
				{ id: 'v-volumenstrom', title: 'Volumenstrom Zuluft + Abluft gemessen' },
				{ id: 'v-bilanz', title: 'Bilanz Zuluft/Abluft je nach Konzept (Über-/Unterdruck)', hint: 'Innenraum überdruckig oder ausgeglichen' },
				{ id: 'v-druck', title: 'Externe Pressung im Auslegungsbereich (Pumpenkurve)' }
			]
		},
		{
			title: 'Regelung',
			items: [
				{ id: 'r-temp', title: 'Zulufttemperatur-Sollwert wird gehalten' },
				{ id: 'r-co2', title: 'CO₂-/VOC-Sensor korrekt positioniert (1.5 m, nicht über Heizkörper)' },
				{ id: 'r-bedarfsfuehrung', title: 'Bedarfsführung (DCV) reagiert auf Sensor' },
				{ id: 'r-zeitprogramm', title: 'Zeitprogramme + Boost-Funktion' },
				{ id: 'r-alarme', title: 'Alarme funktional (Filter, Frostschutz, Druckverlust)' }
			]
		},
		{
			title: 'Brand- und Hygiene',
			items: [
				{ id: 'b-brandschutzklappen', title: 'Brandschutzklappen geprüft (Auslösung + Wartungsschalter)', critical: true },
				{ id: 'b-rauchmelder', title: 'Rauchmelder in Hauptkanal Zu-/Abluft' },
				{ id: 'b-hygiene', title: 'Hygiene-Erstinspektion nach VDI 6022 dokumentiert', critical: true, norm: 'VDI 6022' },
				{ id: 'b-zugang', title: 'Hygiene-Zugang an kritischen Stellen (Befeuchter, Kühler)' }
			]
		},
		{
			title: 'Übergabe',
			items: [
				{ id: 'u-protokoll', title: 'Einregulierungsprotokoll erstellt', critical: true },
				{ id: 'u-schema', title: 'Anlagenschema + Datenpunktliste übergeben' },
				{ id: 'u-einweisung', title: 'Betreiber-Einweisung dokumentiert' },
				{ id: 'u-wartungsplan', title: 'Wartungsplan nach VDI 6022 erstellt' }
			]
		}
	]
};
