import type { ReferenceTable } from '../types';

/* Die Tabelle, die im Konzept unter «Vergleichstabelle: welches Protokoll
 * wofuer» stand und bisher fehlte. Es gab je eine Tabelle fuer BACnet-Objekte,
 * KNX-Datenpunkttypen und Modbus-Funktionscodes — also fuer die Innereien
 * jedes einzelnen Protokolls, aber nichts fuer die Frage, die sich vorher
 * stellt: womit verkabele ich das ueberhaupt.
 */
export const protokollVergleich: ReferenceTable = {
	slug: 'protokoll-vergleich',
	title: 'Bus-Protokolle im Vergleich',
	title_en: 'Fieldbus Protocols Compared',
	subtitle: 'Welches Protokoll wofür — Reichweite, Topologie, Geräteanzahl, typischer Einsatz',
	subtitle_en: 'Which protocol for what — range, topology, device count, typical use',
	category: 'Protokoll',
	icon: 'code',
	color: '#b45309',
	areas: ['ga', 'it', 'elektro'],
	norm: [
		'ISO 16484-5 (BACnet)',
		'EN 50090 / ISO 14543 (KNX)',
		'IEC 62386 (DALI)',
		'EN 13757 (M-Bus)',
		'Modbus Application Protocol V1.1b3'
	],
	updated: '2026-09-14',
	description:
		'Gegenüberstellung der Protokolle, die in der Gebäudeautomation tatsächlich vorkommen. Die Zahlen sind Richtwerte für den Normalfall — Repeater, Router und Koppler verschieben sie nach oben, schlechte Verlegung nach unten. Entscheidend ist selten die technische Obergrenze, sondern was der Kunde schon hat und wer es später wartet.',
	description_en:
		'Comparison of the protocols that actually appear in building automation. The figures are typical values — repeaters, routers and couplers push them up, poor cabling pulls them down. What usually decides is not the technical limit but what the customer already runs and who will maintain it.',
	columns: [
		{ key: 'protokoll', label: 'Protokoll', label_en: 'Protocol', highlight: true },
		{ key: 'ebene', label: 'Ebene', label_en: 'Level', hint: 'Feld / Automation / Management' },
		{ key: 'medium', label: 'Medium' },
		{ key: 'topologie', label: 'Topologie', label_en: 'Topology' },
		{ key: 'laenge', label: 'Länge', label_en: 'Length', hint: 'je Segment, ohne Repeater' },
		{ key: 'geraete', label: 'Geräte', label_en: 'Devices', hint: 'je Segment' },
		{ key: 'speisung', label: 'Speisung über Bus', label_en: 'Bus-powered' },
		{ key: 'einsatz', label: 'Typischer Einsatz', label_en: 'Typical use' },
		{ key: 'achtung', label: 'Worauf achten', label_en: 'Watch out for' }
	],
	rows: [
		{
			protokoll: 'BACnet MS/TP',
			ebene: 'Automation',
			medium: 'RS-485, 2-Draht',
			topologie: 'Linie',
			laenge: '≤ 1200 m',
			geraete: '32 (mit Repeater 127)',
			speisung: 'nein',
			einsatz: 'Feldgeräte an DDC — Ventile, Klappen, Raumregler',
			einsatz_en: 'Field devices on DDC — valves, dampers, room controllers',
			achtung: 'Abschlusswiderstände an beiden Enden, MAC-Adressen lückenlos ab 0',
			achtung_en: 'Terminators at both ends, MAC addresses contiguous from 0'
		},
		{
			protokoll: 'BACnet/IP',
			ebene: 'Automation / Management',
			medium: 'Ethernet',
			topologie: 'Stern',
			laenge: '100 m (Kupfer)',
			geraete: 'praktisch unbegrenzt',
			geraete_en: 'practically unlimited',
			speisung: 'nur mit PoE',
			speisung_en: 'only with PoE',
			einsatz: 'DDC untereinander, Anbindung an die GLT',
			einsatz_en: 'DDC to DDC, connection to the management level',
			achtung: 'BBMD nötig, sobald über Subnetzgrenzen hinweg — sonst kommen Broadcasts nicht an',
			achtung_en: 'BBMD needed across subnets — otherwise broadcasts never arrive'
		},
		{
			protokoll: 'Modbus RTU',
			ebene: 'Feld',
			medium: 'RS-485, 2-Draht',
			topologie: 'Linie',
			laenge: '≤ 1200 m',
			geraete: '32 (mit Repeater 247)',
			speisung: 'nein',
			einsatz: 'Zähler, Frequenzumrichter, Wärmepumpen, Fremdanlagen',
			einsatz_en: 'Meters, VFDs, heat pumps, third-party plant',
			achtung: 'Registeradressierung ab 0 oder 1 — steht selten im Datenblatt, immer messen',
			achtung_en: 'Register addressing from 0 or 1 — rarely in the datasheet, always verify'
		},
		{
			protokoll: 'Modbus TCP',
			ebene: 'Feld / Automation',
			medium: 'Ethernet',
			topologie: 'Stern',
			laenge: '100 m (Kupfer)',
			geraete: 'praktisch unbegrenzt',
			geraete_en: 'practically unlimited',
			speisung: 'nur mit PoE',
			speisung_en: 'only with PoE',
			einsatz: 'Wie RTU, aber ohne Buslänge — oft bei Kältemaschinen und Zählerkonzentratoren',
			einsatz_en: 'Like RTU but without bus length limits — chillers, meter concentrators',
			achtung: 'Keinerlei Authentisierung. Gehört in ein eigenes Netz oder VLAN',
			achtung_en: 'No authentication whatsoever. Belongs in its own network or VLAN'
		},
		{
			protokoll: 'KNX TP',
			ebene: 'Feld / Automation',
			medium: 'KNX-Busleitung, 2-Draht',
			topologie: 'Linie, Stern, Baum (kein Ring)',
			topologie_en: 'Line, star, tree (no ring)',
			laenge: '≤ 1000 m je Linie',
			geraete: '64 je Linie, 256 mit Netzteilen',
			speisung: 'ja, 29 V',
			speisung_en: 'yes, 29 V',
			einsatz: 'Raumautomation — Licht, Storen, Raumtemperatur, Präsenz',
			einsatz_en: 'Room automation — lighting, blinds, room temperature, presence',
			achtung: 'Projektierung nur mit ETS; ohne das Projektfile ist eine Anlage kaum wartbar',
			achtung_en:
				'Engineering only via ETS; without the project file a system is barely maintainable'
		},
		{
			protokoll: 'DALI-2',
			ebene: 'Feld',
			medium: '2-Draht, polaritätsfrei',
			topologie: 'Linie, Stern, Baum (kein Ring)',
			topologie_en: 'Line, star, tree (no ring)',
			laenge: '≤ 300 m',
			geraete: '64 Vorschaltgeräte je Linie',
			geraete_en: '64 control gear per line',
			speisung: 'ja, aus dem DALI-Netzteil',
			speisung_en: 'yes, from the DALI power supply',
			einsatz: 'Beleuchtung — Dimmen, Szenen, Notlicht-Test, Leuchtenrückmeldung',
			einsatz_en: 'Lighting — dimming, scenes, emergency light testing, luminaire feedback',
			achtung: 'Busstrom rechnen, nicht schätzen: 2 mA je Gerät, Netzteil typisch 250 mA',
			achtung_en: 'Calculate bus current, do not estimate: 2 mA per device, PSU typically 250 mA'
		},
		{
			protokoll: 'M-Bus',
			ebene: 'Feld',
			medium: '2-Draht, polaritätsfrei',
			topologie: 'Linie, Stern, Baum',
			topologie_en: 'Line, star, tree',
			laenge: '≤ 1000 m (last­abhängig)',
			laenge_en: '≤ 1000 m (load-dependent)',
			geraete: '250 je Pegelwandler',
			geraete_en: '250 per level converter',
			speisung: 'ja',
			speisung_en: 'yes',
			einsatz: 'Zähler auslesen — Wärme, Wasser, Gas, Strom',
			einsatz_en: 'Meter reading — heat, water, gas, electricity',
			achtung: 'Primär- und Sekundäradressierung nicht verwechseln; Auslesezyklus ≥ 15 min',
			achtung_en: 'Do not confuse primary and secondary addressing; read cycle ≥ 15 min'
		},
		{
			protokoll: 'LON',
			ebene: 'Feld / Automation',
			medium: 'TP/FT-10, 2-Draht',
			topologie: 'frei (FT-10)',
			topologie_en: 'free (FT-10)',
			laenge: '≤ 500 m frei, 2700 m Linie',
			geraete: '64 je Segment',
			geraete_en: '64 per segment',
			speisung: 'nein',
			einsatz: 'Bestandsanlagen. Neu wird praktisch nicht mehr damit gebaut',
			einsatz_en: 'Existing plant. Practically no longer used for new builds',
			achtung: 'Ersatzteile werden knapp. Bei Umbauten Übergang planen, nicht erweitern',
			achtung_en: 'Spare parts are getting scarce. Plan migration on refits, do not extend'
		},
		{
			protokoll: 'OPC UA',
			ebene: 'Management',
			medium: 'Ethernet',
			topologie: 'Stern',
			laenge: '100 m (Kupfer)',
			geraete: 'praktisch unbegrenzt',
			geraete_en: 'practically unlimited',
			speisung: 'nein',
			einsatz: 'Übergabe an IT und übergeordnete Systeme, Energiemonitoring',
			einsatz_en: 'Handover to IT and higher-level systems, energy monitoring',
			achtung: 'Bringt Verschlüsselung und Benutzerverwaltung mit — anders als alle darüber',
			achtung_en: 'Brings encryption and user management — unlike everything above'
		},
		{
			protokoll: 'MQTT',
			ebene: 'Management',
			medium: 'Ethernet / WLAN / Mobilfunk',
			topologie: 'Stern über Broker',
			topologie_en: 'Star via broker',
			laenge: 'netzabhängig',
			laenge_en: 'network-dependent',
			geraete: 'praktisch unbegrenzt',
			geraete_en: 'practically unlimited',
			speisung: 'nein',
			einsatz: 'Anbindung an Cloud und Leittechnik, IoT-Sensorik',
			einsatz_en: 'Cloud and SCADA connection, IoT sensors',
			achtung: 'Der Broker ist der einzige Punkt, an dem alles hängt — und ein Ausfallpunkt',
			achtung_en: 'The broker is the single point everything hangs on — and a point of failure'
		}
	],
	notes:
		'**Die Reichweiten sind Segmentwerte ohne Repeater.** Wer sie ausreizt, hat später keine Reserve für Erweiterungen — und genau die kommen. Bei RS-485 (BACnet MS/TP, Modbus RTU) ist die häufigste Störungsursache nicht die Länge, sondern ein fehlender oder doppelter Abschlusswiderstand.\n\n**Die Entscheidung fällt selten technisch.** Was der Kunde schon betreibt, wofür sein Wartungspartner Werkzeuge hat und was in zehn Jahren noch lieferbar ist, wiegt meist schwerer als jede Zeile dieser Tabelle. LON ist dafür das Lehrstück.',
	notes_en:
		'**The ranges are per segment without repeaters.** Using them up leaves no headroom for extensions — and extensions always come. On RS-485 (BACnet MS/TP, Modbus RTU) the most common fault is not length but a missing or duplicated terminator.\n\n**The decision is rarely technical.** What the customer already runs, what their maintenance partner has tools for, and what will still be available in ten years usually outweighs every line in this table. LON is the object lesson.'
};
