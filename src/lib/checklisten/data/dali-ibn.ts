import type { ChecklistTemplate } from '../types';

export const daliIbn: ChecklistTemplate = {
	slug: 'dali-ibn',
	title: 'DALI-2 Inbetriebnahme',
	subtitle: 'Adressierung, Gruppen, Szenen, Notlicht, Test',
	description: 'Strukturierte Inbetriebnahme einer DALI-2-Beleuchtungsanlage. Reihenfolge: erst Verdrahtung prüfen, dann Adressierung, dann Gruppen/Szenen, dann Notlicht.',
	category: 'IBN',
	icon: 'sun',
	color: '#d97706',
	areas: ['elektro', 'ga'],
	norm: ['IEC 62386', 'EN 62386-202 (DALI-2)', 'EN 50172 (Notlicht)', 'ASR A3.4'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Vorbereitung & Verdrahtung',
			items: [
				{ id: 'd-pre-schema', title: 'DALI-Linienschema / Übersichtsplan vorhanden', critical: true },
				{ id: 'd-pre-spannung', title: 'DALI-Busspannung an Controller gemessen (9.5–22.5 V DC)', critical: true, hint: 'Typisch 16 V im Leerlauf. Unter 9.5 V → Kurzschluss oder Überlast' },
				{ id: 'd-pre-buslaenge', title: 'Bus-Leitungslänge und Querschnitt geprüft', hint: 'Max. 300 m bei 1.5 mm², max. 64 Adressen pro Linie' },
				{ id: 'd-pre-geraete', title: 'Alle Geräte installiert und elektrisch versorgt' },
				{ id: 'd-pre-abschluss', title: 'Kein 120-Ω-Abschluss — DALI benötigt keinen Busabschluss' }
			]
		},
		{
			title: 'Adressierung',
			items: [
				{ id: 'd-addr-scan', title: 'Automatische Adressierung (Initialisation) durchgeführt', critical: true },
				{ id: 'd-addr-anzahl', title: 'Anzahl gefundene Geräte stimmt mit Plan überein', critical: true, hint: 'Fehlende Geräte: Verdrahtung, Spannungsversorgung, Gerätestatus prüfen' },
				{ id: 'd-addr-doppelt', title: 'Keine doppelten Adressen vorhanden' },
				{ id: 'd-addr-lokalisierung', title: 'Jede Adresse einem physischen Gerät / Leuchtmittel zugeordnet (Blinktests)' },
				{ id: 'd-addr-geraetetyp', title: 'Device Type (DT) jedes Geräts geprüft (DT0=Fluoresz., DT6=LED, DT8=Farbe, DT7=Notlicht)' }
			]
		},
		{
			title: 'Gruppen & Szenen',
			items: [
				{ id: 'd-grp-vergabe', title: 'Gruppen gemäss Beleuchtungskonzept zugewiesen (max. 16 Gruppen)', critical: true },
				{ id: 'd-grp-test', title: 'Gruppentest: Jede Gruppe separat ein/aus', critical: true },
				{ id: 'd-szn-vergabe', title: 'Szenen programmiert (max. 16 Szenen)', hint: 'Szene 0 = AUS, Szene 15 = Notbeleuchtung (Konvention)' },
				{ id: 'd-szn-werte', title: 'Helligkeitswerte aller Szenen gemäss Lichtplanung eingestellt' },
				{ id: 'd-szn-test', title: 'Szenenaufruf aller Szenen getestet' },
				{ id: 'd-dim-bereich', title: 'Min/Max Dimmwerte geprüft (kein Flackern am unteren Ende)', hint: 'Min-Level: typisch 1–5%, Geräteabhängig — bei Flackern erhöhen' }
			]
		},
		{
			title: 'Präsenz- & Lichtsteuerung',
			items: [
				{ id: 'd-praesenz-test', title: 'Präsenzmelder (DALI Part 303) erkannt und adressiert' },
				{ id: 'd-praesenz-funktion', title: 'Präsenzerkennung: Licht schaltet bei Belegung ein, Nachlaufzeit korrekt' },
				{ id: 'd-lux-sensor', title: 'Lux-Sensor (DALI Part 301) erkannt und kalibriert (falls vorhanden)' },
				{ id: 'd-konstantlicht', title: 'Konstantlichtregelung auf Sollwert (z.B. 500 lx) getestet' }
			]
		},
		{
			title: 'Notlicht (EN 50172)',
			items: [
				{ id: 'd-nl-geraete', title: 'Notlicht-Betriebsgeräte (DT7) erkannt und adressiert', critical: true },
				{ id: 'd-nl-betriebstest', title: 'Funktionstest (15 s) über DALI-System ausgelöst und protokolliert', critical: true, hint: 'EN 50172: Wöchentlicher Kurztest (1 min), jährlicher Dauertest (1 Stunde)' },
				{ id: 'd-nl-dauertest', title: 'Dauertest (60 min) bestanden, Restkapazität > 0', critical: true },
				{ id: 'd-nl-protokoll', title: 'Notlicht-Protokoll erstellt (Adressen, Typen, Testergebnisse)', critical: true },
				{ id: 'd-nl-zentralbatterie', title: 'Zentralbatterie / Einzel-Akkus geladen und geprüft (falls vorhanden)' }
			]
		},
		{
			title: 'GLT-Anbindung & Übergabe',
			items: [
				{ id: 'd-glt-daten', title: 'DALI-Controller an GLT angebunden (DALI-Gateway, IP, Modbus)', hint: 'Helvar DALI, Osram DEXAL, Tridonic etc.' },
				{ id: 'd-glt-szenen', title: 'Szenenaufruf von GLT aus getestet' },
				{ id: 'd-glt-fehler', title: 'Lampen-Fehlerrückmeldung (Kurzschluss, Lampenfehler) an GLT getestet' },
				{ id: 'd-u-konfigsicherung', title: 'DALI-Konfiguration gesichert (Export/Backup in DALI-Konfigurations-Tool)', critical: true },
				{ id: 'd-u-protokoll', title: 'IBN-Protokoll mit Gruppenzuordnung und Szenenliste unterschrieben', critical: true },
				{ id: 'd-u-bedienung', title: 'Betreiber in Bedienung und Szenen-Anpassung eingewiesen' }
			]
		}
	]
};
