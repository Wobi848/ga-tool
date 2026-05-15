import type { ChecklistTemplate } from '../types';

export const funktionstest: ChecklistTemplate = {
	slug: 'funktionstest',
	title: 'Funktionstest-Protokoll GA',
	subtitle: 'Regelkreise, Sollwerte, Alarme, Zeitprogramme, Kommunikation',
	description: 'Systematischer Funktionstest der GA-Anlage nach Inbetriebnahme. Jeden Regelkreis und jede Funktion einzeln prüfen, bevor die Gesamtanlage übergeben wird.',
	category: 'Test',
	icon: 'check-square',
	color: '#0d9488',
	areas: ['ga'],
	norm: ['VDI 3814-4', 'SIA 386.110', 'VDMA 24186'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Voraussetzungen',
			items: [
				{ id: 'ft-pre-ibn', title: 'Mechanische und elektrische IBN aller Anlagen abgeschlossen', critical: true },
				{ id: 'ft-pre-dpl', title: 'Datenpunktliste (DPL) abgenommen und DPL-Review OK', critical: true },
				{ id: 'ft-pre-visualisierung', title: 'GLT-Visualisierung alle Anlagen zeigt Istwerte (keine N/A, keine Fehler)' },
				{ id: 'ft-pre-zeit', title: 'Systemzeit korrekt (NTP synchronisiert)', critical: true }
			]
		},
		{
			title: 'Regelkreise — Heizung',
			items: [
				{ id: 'ft-hz-sollwert', title: 'Vorlauftemperatur-Sollwert von GLT setzbar, Regler folgt', critical: true },
				{ id: 'ft-hz-mischer', title: 'Mischer fährt in beide Richtungen (AUF/ZU) korrekt an' },
				{ id: 'ft-hz-heizkurve', title: 'Heizkurve aktiv — Sollwert ändert sich mit Aussentemperatur' },
				{ id: 'ft-hz-nachtabsenkung', title: 'Nachtabsenkung via Zeitprogramm getestet' },
				{ id: 'ft-hz-frostschutz', title: 'Frostschutz-Grenzwert getestet (Simulation Aussentemperatur < Grenzwert)', critical: true }
			]
		},
		{
			title: 'Regelkreise — Lüftung',
			items: [
				{ id: 'ft-rlt-start', title: 'RLT-Anlage startet und stoppt via Zeitprogramm / Freigabe', critical: true },
				{ id: 'ft-rlt-kaskade', title: 'Zuluft-Temperaturregelung: Erwärmer und Kühler arbeiten korrekt' },
				{ id: 'ft-rlt-druck', title: 'Kanaldruck-Regelung: Drehzahl FU folgt dem Drucksollwert' },
				{ id: 'ft-rlt-vav', title: 'VAV-Boxen: Volumenstrom-Regelung getestet (min. 2 Räume)' },
				{ id: 'ft-rlt-co2', title: 'CO₂-geführte Lüftung: Erhöhung Luftmenge bei CO₂ > Grenzwert' },
				{ id: 'ft-rlt-bsk', title: 'BSK-Auslösung: Lüftung schaltet ab, BSK schliesst — Rückmeldung an GLT', critical: true }
			]
		},
		{
			title: 'Regelkreise — Kälte / Kühlung',
			items: [
				{ id: 'ft-klt-sollwert', title: 'Kaltwasser-Sollwert setzbar, Kältemaschine regelt nach' },
				{ id: 'ft-klt-freigabe', title: 'Freigabe Kälte: nur bei Aussentemperatur > Grenzwert aktiv' },
				{ id: 'ft-klt-free-cooling', title: 'Free-Cooling-Umschaltung getestet (falls vorhanden)' }
			]
		},
		{
			title: 'Alarme & Meldungen',
			items: [
				{ id: 'ft-alarm-motorschutz', title: 'Motorschutz simuliert → Störalarm erscheint in GLT, Zeit korrekt', critical: true },
				{ id: 'ft-alarm-frostschutz', title: 'Frostschutzalarm simuliert → Lüftung stop, Protokoll', critical: true },
				{ id: 'ft-alarm-kommunikation', title: 'Kommunikationsausfall DDC simuliert → Timeout-Alarm in GLT', critical: true, hint: 'Timeout typisch 30–60 s' },
				{ id: 'ft-alarm-temperatur', title: 'Temperatur-Grenzwertalarm (oben/unten) simuliert und ausgelöst' },
				{ id: 'ft-alarm-quittierung', title: 'Alarmquittierung getestet: quittierter Alarm verschwindet aus aktiver Alarmliste' },
				{ id: 'ft-alarm-email', title: 'Email-/SMS-Weiterleitung eines Kritisch-Alarms getestet (falls konfiguriert)' }
			]
		},
		{
			title: 'Zeitprogramme & Kalender',
			items: [
				{ id: 'ft-zeit-woche', title: 'Wochenprogramm getestet (Abweichung ≤ 1 min Schaltzeit)', critical: true },
				{ id: 'ft-zeit-sondertermine', title: 'Sondertage (Feiertage, Betriebsurlaub) eingetragen und getestet' },
				{ id: 'ft-zeit-optimstart', title: 'Optimaler Aufheizbeginn: Anlage startet früh genug für Komforttemperatur um Nutzungsbeginn' }
			]
		},
		{
			title: 'Kommunikation & Schnittstellen',
			items: [
				{ id: 'ft-kom-alle-ddcs', title: 'Alle DDC-Stationen in GLT online und kommunizieren', critical: true },
				{ id: 'ft-kom-modbus', title: 'Modbus-Geräte (FU, Zähler, Kälte) erreichbar und Werte plausibel' },
				{ id: 'ft-kom-bacnet', title: 'BACnet-Geräte via Who-Is/I-Am erreichbar' },
				{ id: 'ft-kom-bacnet-cov', title: 'COV-Subscriptions aktiv: Wertänderungen kommen in GLT an' },
				{ id: 'ft-kom-trend', title: 'Trending aktiv: Daten werden historisiert, Export möglich' }
			]
		},
		{
			title: 'Abnahme & Übergabe',
			items: [
				{ id: 'ft-u-protokoll', title: 'Funktionstest-Protokoll vollständig ausgefüllt', critical: true },
				{ id: 'ft-u-maengel', title: 'Offene Mängel dokumentiert und Terminfestlegung für Behebung' },
				{ id: 'ft-u-abnahme', title: 'Abnahme mit Bauherrschaft / Betreiber durchgeführt und unterschrieben', critical: true },
				{ id: 'ft-u-as-built', title: 'As-Built Dokumentation übergeben (Schemas, DPL, Konfiguration)', critical: true }
			]
		}
	]
};
