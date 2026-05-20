import type { ChecklistTemplate } from '../types';

export const ibnKaelte: ChecklistTemplate = {
	slug: 'ibn-kaelte',
	title: 'IBN Kältemaschine / Kaltwassersatz',
	title_en: 'Commissioning — Chiller / Water Chiller',
	subtitle: 'Inbetriebnahme — mechanisch, elektrisch, regelungstechnisch',
	subtitle_en: 'Commissioning — mechanical, electrical, controls',
	description: 'Strukturierte Inbetriebnahme eines Kaltwassersatzes oder Splitgeräts. Reihenfolge einhalten: erst Kältekreis, dann Hydraulik, dann Steuerung.',
	description_en: 'Structured commissioning of a chiller or split unit. Follow the order: refrigeration circuit first, then hydraulics, then controls.',
	category: 'IBN',
	icon: 'snowflake',
	color: '#0891b2',
	areas: ['hlk'],
	norm: ['VDMA 24247', 'EN 378', 'EN 14511', 'F-Gase-Verordnung'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Dokumentation & Vorbereitung',
			title_en: 'Documentation & Preparation',
			items: [
				{ id: 'k-pre-schema', title: 'Kältekreisschema und P&ID vorhanden', title_en: 'Refrigeration circuit diagram and P&ID available', critical: true },
				{ id: 'k-pre-datenblatt', title: 'Technisches Datenblatt, Typenschild und Kältemittelangabe dokumentiert', title_en: 'Technical data sheet, nameplate and refrigerant type documented', critical: true },
				{ id: 'k-pre-f-gase', title: 'F-Gase-Logbuch angelegt (EU F-Gase-VO)', title_en: 'F-gas logbook created (EU F-gas Regulation)', critical: true, hint: 'Pflicht ab 3 kg Kältemittel-Füllmenge', hint_en: 'Mandatory from 3 kg refrigerant charge' },
				{ id: 'k-pre-zertifikat', title: 'Kältemittel-Zertifikat des Monteurs vorhanden', title_en: 'Refrigerant handling certificate of technician available', critical: true },
				{ id: 'k-pre-sicherheit', title: 'Sicherheitsunterweisung durchgeführt (Kältemittel, Druck)', title_en: 'Safety briefing completed (refrigerant, pressure)' }
			]
		},
		{
			title: 'Kältekreis — Mechanisch',
			title_en: 'Refrigeration Circuit — Mechanical',
			items: [
				{ id: 'k-dichtheitstest', title: 'Druckprüfung / Dichtheitsprüfung bestanden', title_en: 'Pressure test / leak test passed', critical: true, hint: 'Stickstoffprobe auf Prüfdruck (min. 1,1× PS), Haltezeit 30 min', hint_en: 'Nitrogen test to test pressure (min. 1.1× PS), hold 30 min' },
				{ id: 'k-vakuumtest', title: 'Vakuumtest bestanden (< 0,3 mbar Enddruck nach 30 min)', title_en: 'Vacuum test passed (< 0.3 mbar final pressure after 30 min)', critical: true },
				{ id: 'k-fuelling', title: 'Kältemittel-Füllung protokolliert (Kältemittelart, kg, Chargennummer)', title_en: 'Refrigerant charge recorded (refrigerant type, kg, batch number)', critical: true },
				{ id: 'k-verdichter-oel', title: 'Verdichter-Öl-Niveau und Ölsorte gemäss Hersteller', title_en: 'Compressor oil level and oil type per manufacturer specification' },
				{ id: 'k-expansion', title: 'Expansionsorgan vorhanden und korrekt eingestellt (TXV / EXV)', title_en: 'Expansion device present and correctly set (TXV / EXV)' },
				{ id: 'k-sicherheitsventil', title: 'Hochdruckschalter und Niederdruck-Schalter getestet', title_en: 'High-pressure switch and low-pressure switch tested', critical: true }
			]
		},
		{
			title: 'Hydraulik Kaltwasserkreis',
			title_en: 'Chilled Water Hydraulics',
			items: [
				{ id: 'k-hyd-fuellen', title: 'Kaltwasserkreis gefüllt und entlüftet', title_en: 'Chilled water circuit filled and vented', critical: true },
				{ id: 'k-hyd-frostschutz', title: 'Frostschutz-Konzentration gemessen (Glykol % oder Sole)', title_en: 'Antifreeze concentration measured (glycol % or brine)', hint: 'Frostschutz bis −10°C minimal, −20°C bei Aussenaufstellung empfohlen', hint_en: 'Frost protection to −10°C minimum, −20°C recommended for outdoor installation' },
				{ id: 'k-hyd-durchfluss', title: 'Mindestdurchfluss am Verdampfer sichergestellt', title_en: 'Minimum flow through evaporator ensured', critical: true, hint: 'Zu niedriger Durchfluss → Eismacher, Verdampfer friert ein', hint_en: 'Too low flow → ice formation, evaporator freezes' },
				{ id: 'k-hyd-pumpe', title: 'Pumpenlaufrichtung korrekt, Förderhöhe angepasst', title_en: 'Pump rotation direction correct, head adjusted' },
				{ id: 'k-hyd-stroemungswaechter', title: 'Strömungswächter geprüft — Kältemaschine schaltet bei fehlendem Durchfluss ab', title_en: 'Flow switch tested — chiller shuts down on loss of flow', critical: true }
			]
		},
		{
			title: 'Elektrisch & Steuerung',
			title_en: 'Electrical & Controls',
			items: [
				{ id: 'k-el-versorgung', title: 'Versorgungsspannung korrekt (400V 3Ph PE), Phasenfolge geprüft', title_en: 'Supply voltage correct (400V 3Ph PE), phase sequence checked', critical: true },
				{ id: 'k-el-motorschutz', title: 'Motorschutzschalter auf Nennstrom eingestellt', title_en: 'Motor protection relay set to rated current' },
				{ id: 'k-el-sollwert', title: 'Kaltwasser-Sollwert parametriert', title_en: 'Chilled water setpoint parameterised', hint: 'Typisch: 6/12°C oder 10/16°C je nach Anwendung', hint_en: 'Typical: 6/12°C or 10/16°C depending on application' },
				{ id: 'k-el-grenzwerte', title: 'Alarm-Grenzwerte (Hochdruck, Niederdruck, Temperatur) geprüft', title_en: 'Alarm limits (high pressure, low pressure, temperature) checked' },
				{ id: 'k-el-ddc', title: 'DDC-Anbindung (Freigabe, Störmeldung, Istwert) getestet', title_en: 'DDC connection tested (enable, fault, actual value)', critical: true },
				{ id: 'k-el-modbus', title: 'Modbus/BACnet-Kommunikation getestet (falls vorhanden)', title_en: 'Modbus/BACnet communication tested (if present)' }
			]
		},
		{
			title: 'Erstlauf & Betriebstest',
			title_en: 'First Start & Operational Test',
			items: [
				{ id: 'k-start-erstlauf', title: 'Erstlauf durchgeführt, Anlaufzeit und Betriebsdrücke protokolliert', title_en: 'First start performed, start-up time and operating pressures recorded', critical: true },
				{ id: 'k-start-drucke', title: 'Betriebs-Hoch- und Niederdruck im Sollbereich (Hersteller-Kennlinie)', title_en: 'Operating high and low pressure within target range (manufacturer curve)', critical: true },
				{ id: 'k-start-ueberhitzung', title: 'Überhitzung am Verdampferaustritt korrekt (5–10 K)', title_en: 'Superheating at evaporator outlet correct (5–10 K)', hint: 'Zu niedrige Überhitzung: Flüssigkeitsschläge am Verdichter', hint_en: 'Too low superheating: liquid slugging at compressor' },
				{ id: 'k-start-kw-temp', title: 'Kaltwasservorlauftemperatur erreicht Sollwert', title_en: 'Chilled water flow temperature reaches setpoint' },
				{ id: 'k-start-cop', title: 'EER / COP plausibel (Referenzwert aus Datenblatt)', title_en: 'EER / COP plausible (reference value from data sheet)' }
			]
		},
		{
			title: 'Übergabe',
			title_en: 'Handover',
			items: [
				{ id: 'k-u-protokoll', title: 'IBN-Protokoll mit allen Messwerten ausgefüllt und unterschrieben', title_en: 'Commissioning record with all measured values completed and signed', critical: true },
				{ id: 'k-u-fgase', title: 'F-Gase-Logbuch mit Erstfüllung eingetragen', title_en: 'F-gas logbook updated with initial charge', critical: true },
				{ id: 'k-u-bedienung', title: 'Betreiber eingewiesen (Bedienung, Alarm-Quittierung, Notabschaltung)', title_en: 'Operator trained (operation, alarm acknowledgement, emergency shutdown)' },
				{ id: 'k-u-wartung', title: 'Wartungsintervalle (Dichtheitsprüfung, Ölprobe) dokumentiert', title_en: 'Maintenance intervals (leak check, oil sample) documented' }
			]
		}
	]
};
