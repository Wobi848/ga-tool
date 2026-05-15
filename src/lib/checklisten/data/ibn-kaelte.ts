import type { ChecklistTemplate } from '../types';

export const ibnKaelte: ChecklistTemplate = {
	slug: 'ibn-kaelte',
	title: 'IBN Kältemaschine / Kaltwassersatz',
	subtitle: 'Inbetriebnahme — mechanisch, elektrisch, regelungstechnisch',
	description: 'Strukturierte Inbetriebnahme eines Kaltwassersatzes oder Splitgeräts. Reihenfolge einhalten: erst Kältekreis, dann Hydraulik, dann Steuerung.',
	category: 'IBN',
	icon: 'snowflake',
	color: '#0891b2',
	areas: ['hlk'],
	norm: ['VDMA 24247', 'EN 378', 'EN 14511', 'F-Gase-Verordnung'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Dokumentation & Vorbereitung',
			items: [
				{ id: 'k-pre-schema', title: 'Kältekreisschema und P&ID vorhanden', critical: true },
				{ id: 'k-pre-datenblatt', title: 'Technisches Datenblatt, Typenschild und Kältemittelangabe dokumentiert', critical: true },
				{ id: 'k-pre-f-gase', title: 'F-Gase-Logbuch angelegt (EU F-Gase-VO)', critical: true, hint: 'Pflicht ab 3 kg Kältemittel-Füllmenge' },
				{ id: 'k-pre-zertifikat', title: 'Kältemittel-Zertifikat des Monteurs vorhanden', critical: true },
				{ id: 'k-pre-sicherheit', title: 'Sicherheitsunterweisung durchgeführt (Kältemittel, Druck)' }
			]
		},
		{
			title: 'Kältekreis — Mechanisch',
			items: [
				{ id: 'k-dichtheitstest', title: 'Druckprüfung / Dichtheitsprüfung bestanden', critical: true, hint: 'Stickstoffprobe auf Prüfdruck (min. 1,1× PS), Haltezeit 30 min' },
				{ id: 'k-vakuumtest', title: 'Vakuumtest bestanden (< 0,3 mbar Enddruck nach 30 min)', critical: true },
				{ id: 'k-fuelling', title: 'Kältemittel-Füllung protokolliert (Kältemittelart, kg, Chargennummer)', critical: true },
				{ id: 'k-verdichter-oel', title: 'Verdichter-Öl-Niveau und Ölsorte gemäss Hersteller' },
				{ id: 'k-expansion', title: 'Expansionsorgan vorhanden und korrekt eingestellt (TXV / EXV)' },
				{ id: 'k-sicherheitsventil', title: 'Hochdruckschalter und Niederdruck-Schalter getestet', critical: true }
			]
		},
		{
			title: 'Hydraulik Kaltwasserkreis',
			items: [
				{ id: 'k-hyd-fuellen', title: 'Kaltwasserkreis gefüllt und entlüftet', critical: true },
				{ id: 'k-hyd-frostschutz', title: 'Frostschutz-Konzentration gemessen (Glykol % oder Sole)', hint: 'Frostschutz bis −10°C minimal, −20°C bei Aussenaufstellung empfohlen' },
				{ id: 'k-hyd-durchfluss', title: 'Mindestdurchfluss am Verdampfer sichergestellt', critical: true, hint: 'Zu niedriger Durchfluss → Eismacher, Verdampfer friert ein' },
				{ id: 'k-hyd-pumpe', title: 'Pumpenlaufrichtung korrekt, Förderhöhe angepasst' },
				{ id: 'k-hyd-stroemungswaechter', title: 'Strömungswächter geprüft — Kältemaschine schaltet bei fehlendem Durchfluss ab', critical: true }
			]
		},
		{
			title: 'Elektrisch & Steuerung',
			items: [
				{ id: 'k-el-versorgung', title: 'Versorgungsspannung korrekt (400V 3Ph PE), Phasenfolge geprüft', critical: true },
				{ id: 'k-el-motorschutz', title: 'Motorschutzschalter auf Nennstrom eingestellt' },
				{ id: 'k-el-sollwert', title: 'Kaltwasser-Sollwert parametriert', hint: 'Typisch: 6/12°C oder 10/16°C je nach Anwendung' },
				{ id: 'k-el-grenzwerte', title: 'Alarm-Grenzwerte (Hochdruck, Niederdruck, Temperatur) geprüft' },
				{ id: 'k-el-ddc', title: 'DDC-Anbindung (Freigabe, Störmeldung, Istwert) getestet', critical: true },
				{ id: 'k-el-modbus', title: 'Modbus/BACnet-Kommunikation getestet (falls vorhanden)' }
			]
		},
		{
			title: 'Erstlauf & Betriebstest',
			items: [
				{ id: 'k-start-erstlauf', title: 'Erstlauf durchgeführt, Anlaufzeit und Betriebsdrücke protokolliert', critical: true },
				{ id: 'k-start-drucke', title: 'Betriebs-Hoch- und Niederdruck im Sollbereich (Hersteller-Kennlinie)', critical: true },
				{ id: 'k-start-ueberhitzung', title: 'Überhitzung am Verdampferaustritt korrekt (5–10 K)', hint: 'Zu niedrige Überhitzung: Flüssigkeitsschläge am Verdichter' },
				{ id: 'k-start-kw-temp', title: 'Kaltwasservorlauftemperatur erreicht Sollwert' },
				{ id: 'k-start-cop', title: 'EER / COP plausibel (Referenzwert aus Datenblatt)' }
			]
		},
		{
			title: 'Übergabe',
			items: [
				{ id: 'k-u-protokoll', title: 'IBN-Protokoll mit allen Messwerten ausgefüllt und unterschrieben', critical: true },
				{ id: 'k-u-fgase', title: 'F-Gase-Logbuch mit Erstfüllung eingetragen', critical: true },
				{ id: 'k-u-bedienung', title: 'Betreiber eingewiesen (Bedienung, Alarm-Quittierung, Notabschaltung)' },
				{ id: 'k-u-wartung', title: 'Wartungsintervalle (Dichtheitsprüfung, Ölprobe) dokumentiert' }
			]
		}
	]
};
