import type { ChecklistTemplate } from '../types';

export const daliIbn: ChecklistTemplate = {
	slug: 'dali-ibn',
	title: 'DALI-2 Inbetriebnahme',
	title_en: 'DALI-2 Commissioning',
	subtitle: 'Adressierung, Gruppen, Szenen, Notlicht, Test',
	subtitle_en: 'Addressing, groups, scenes, emergency lighting, testing',
	description: 'Strukturierte Inbetriebnahme einer DALI-2-Beleuchtungsanlage. Reihenfolge: erst Verdrahtung prüfen, dann Adressierung, dann Gruppen/Szenen, dann Notlicht.',
	description_en: 'Structured commissioning of a DALI-2 lighting system. Order: check wiring first, then addressing, then groups/scenes, then emergency lighting.',
	category: 'IBN',
	icon: 'sun',
	color: '#d97706',
	areas: ['elektro', 'ga'],
	norm: ['IEC 62386', 'EN 62386-202 (DALI-2)', 'EN 50172 (Notlicht)', 'ASR A3.4'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Vorbereitung & Verdrahtung',
			title_en: 'Preparation & Wiring',
			items: [
				{ id: 'd-pre-schema', title: 'DALI-Linienschema / Übersichtsplan vorhanden', title_en: 'DALI line diagram / overview plan available', critical: true },
				{ id: 'd-pre-spannung', title: 'DALI-Busspannung an Controller gemessen (9.5–22.5 V DC)', title_en: 'DALI bus voltage measured at controller (9.5–22.5 V DC)', critical: true, hint: 'Typisch 16 V im Leerlauf. Unter 9.5 V → Kurzschluss oder Überlast', hint_en: 'Typically 16 V at idle. Below 9.5 V → short circuit or overload' },
				{ id: 'd-pre-buslaenge', title: 'Bus-Leitungslänge und Querschnitt geprüft', title_en: 'Bus cable length and cross-section checked', hint: 'Max. 300 m bei 1.5 mm², max. 64 Adressen pro Linie', hint_en: 'Max. 300 m at 1.5 mm², max. 64 addresses per line' },
				{ id: 'd-pre-geraete', title: 'Alle Geräte installiert und elektrisch versorgt', title_en: 'All devices installed and electrically powered' },
				{ id: 'd-pre-abschluss', title: 'Kein 120-Ω-Abschluss — DALI benötigt keinen Busabschluss', title_en: 'No 120 Ω termination — DALI does not require a bus terminator' }
			]
		},
		{
			title: 'Adressierung',
			title_en: 'Addressing',
			items: [
				{ id: 'd-addr-scan', title: 'Automatische Adressierung (Initialisation) durchgeführt', title_en: 'Automatic addressing (initialisation) performed', critical: true },
				{ id: 'd-addr-anzahl', title: 'Anzahl gefundene Geräte stimmt mit Plan überein', title_en: 'Number of discovered devices matches plan', critical: true, hint: 'Fehlende Geräte: Verdrahtung, Spannungsversorgung, Gerätestatus prüfen', hint_en: 'Missing devices: check wiring, power supply, device status' },
				{ id: 'd-addr-doppelt', title: 'Keine doppelten Adressen vorhanden', title_en: 'No duplicate addresses present' },
				{ id: 'd-addr-lokalisierung', title: 'Jede Adresse einem physischen Gerät / Leuchtmittel zugeordnet (Blinktests)', title_en: 'Each address assigned to a physical device / luminaire (blink tests)' },
				{ id: 'd-addr-geraetetyp', title: 'Device Type (DT) jedes Geräts geprüft (DT0=Fluoresz., DT6=LED, DT8=Farbe, DT7=Notlicht)', title_en: 'Device type (DT) of each device verified (DT0=fluorescent, DT6=LED, DT8=colour, DT7=emergency)' }
			]
		},
		{
			title: 'Gruppen & Szenen',
			title_en: 'Groups & Scenes',
			items: [
				{ id: 'd-grp-vergabe', title: 'Gruppen gemäss Beleuchtungskonzept zugewiesen (max. 16 Gruppen)', title_en: 'Groups assigned per lighting concept (max. 16 groups)', critical: true },
				{ id: 'd-grp-test', title: 'Gruppentest: Jede Gruppe separat ein/aus', title_en: 'Group test: each group switched on/off separately', critical: true },
				{ id: 'd-szn-vergabe', title: 'Szenen programmiert (max. 16 Szenen)', title_en: 'Scenes programmed (max. 16 scenes)', hint: 'Szene 0 = AUS, Szene 15 = Notbeleuchtung (Konvention)', hint_en: 'Scene 0 = OFF, scene 15 = emergency lighting (convention)' },
				{ id: 'd-szn-werte', title: 'Helligkeitswerte aller Szenen gemäss Lichtplanung eingestellt', title_en: 'Brightness values of all scenes set per lighting design' },
				{ id: 'd-szn-test', title: 'Szenenaufruf aller Szenen getestet', title_en: 'Scene recall tested for all scenes' },
				{ id: 'd-dim-bereich', title: 'Min/Max Dimmwerte geprüft (kein Flackern am unteren Ende)', title_en: 'Min/max dim levels checked (no flickering at lower end)', hint: 'Min-Level: typisch 1–5%, Geräteabhängig — bei Flackern erhöhen', hint_en: 'Min level: typically 1–5%, device-dependent — increase if flickering' }
			]
		},
		{
			title: 'Präsenz- & Lichtsteuerung',
			title_en: 'Presence & Light Control',
			items: [
				{ id: 'd-praesenz-test', title: 'Präsenzmelder (DALI Part 303) erkannt und adressiert', title_en: 'Presence detectors (DALI Part 303) detected and addressed' },
				{ id: 'd-praesenz-funktion', title: 'Präsenzerkennung: Licht schaltet bei Belegung ein, Nachlaufzeit korrekt', title_en: 'Presence detection: light switches on when occupied, hold time correct' },
				{ id: 'd-lux-sensor', title: 'Lux-Sensor (DALI Part 301) erkannt und kalibriert (falls vorhanden)', title_en: 'Lux sensor (DALI Part 301) detected and calibrated (if present)' },
				{ id: 'd-konstantlicht', title: 'Konstantlichtregelung auf Sollwert (z.B. 500 lx) getestet', title_en: 'Constant light control tested to setpoint (e.g. 500 lx)' }
			]
		},
		{
			title: 'Notlicht (EN 50172)',
			title_en: 'Emergency Lighting (EN 50172)',
			items: [
				{ id: 'd-nl-geraete', title: 'Notlicht-Betriebsgeräte (DT7) erkannt und adressiert', title_en: 'Emergency lighting control gear (DT7) detected and addressed', critical: true },
				{ id: 'd-nl-betriebstest', title: 'Funktionstest (15 s) über DALI-System ausgelöst und protokolliert', title_en: 'Function test (15 s) triggered via DALI system and recorded', critical: true, hint: 'EN 50172: Wöchentlicher Kurztest (1 min), jährlicher Dauertest (1 Stunde)', hint_en: 'EN 50172: Weekly short test (1 min), annual duration test (1 hour)' },
				{ id: 'd-nl-dauertest', title: 'Dauertest (60 min) bestanden, Restkapazität > 0', title_en: 'Duration test (60 min) passed, remaining capacity > 0', critical: true },
				{ id: 'd-nl-protokoll', title: 'Notlicht-Protokoll erstellt (Adressen, Typen, Testergebnisse)', title_en: 'Emergency lighting record created (addresses, types, test results)', critical: true },
				{ id: 'd-nl-zentralbatterie', title: 'Zentralbatterie / Einzel-Akkus geladen und geprüft (falls vorhanden)', title_en: 'Central battery / individual batteries charged and checked (if present)' }
			]
		},
		{
			title: 'GLT-Anbindung & Übergabe',
			title_en: 'BMS Connection & Handover',
			items: [
				{ id: 'd-glt-daten', title: 'DALI-Controller an GLT angebunden (DALI-Gateway, IP, Modbus)', title_en: 'DALI controller connected to BMS (DALI gateway, IP, Modbus)', hint: 'Helvar DALI, Osram DEXAL, Tridonic etc.' },
				{ id: 'd-glt-szenen', title: 'Szenenaufruf von GLT aus getestet', title_en: 'Scene recall from BMS tested' },
				{ id: 'd-glt-fehler', title: 'Lampen-Fehlerrückmeldung (Kurzschluss, Lampenfehler) an GLT getestet', title_en: 'Lamp fault feedback (short circuit, lamp failure) to BMS tested' },
				{ id: 'd-u-konfigsicherung', title: 'DALI-Konfiguration gesichert (Export/Backup in DALI-Konfigurations-Tool)', title_en: 'DALI configuration backed up (export/backup in DALI configuration tool)', critical: true },
				{ id: 'd-u-protokoll', title: 'IBN-Protokoll mit Gruppenzuordnung und Szenenliste unterschrieben', title_en: 'Commissioning record with group assignments and scene list signed', critical: true },
				{ id: 'd-u-bedienung', title: 'Betreiber in Bedienung und Szenen-Anpassung eingewiesen', title_en: 'Operator trained on operation and scene adjustment' }
			]
		}
	]
};
