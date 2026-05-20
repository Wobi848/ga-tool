import type { ChecklistTemplate } from '../types';

export const funktionstest: ChecklistTemplate = {
	slug: 'funktionstest',
	title: 'Funktionstest-Protokoll GA',
	title_en: 'Functional Test Protocol BA',
	subtitle: 'Regelkreise, Sollwerte, Alarme, Zeitprogramme, Kommunikation',
	subtitle_en: 'Control loops, setpoints, alarms, time programs, communication',
	description: 'Systematischer Funktionstest der GA-Anlage nach Inbetriebnahme. Jeden Regelkreis und jede Funktion einzeln prüfen, bevor die Gesamtanlage übergeben wird.',
	description_en: 'Systematic functional test of the BA system after commissioning. Test each control loop and function individually before handing over the complete system.',
	category: 'Test',
	icon: 'check-square',
	color: '#0d9488',
	areas: ['ga'],
	norm: ['VDI 3814-4', 'SIA 386.110', 'VDMA 24186'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Voraussetzungen',
			title_en: 'Prerequisites',
			items: [
				{ id: 'ft-pre-ibn', title: 'Mechanische und elektrische IBN aller Anlagen abgeschlossen', title_en: 'Mechanical and electrical commissioning of all systems completed', critical: true },
				{ id: 'ft-pre-dpl', title: 'Datenpunktliste (DPL) abgenommen und DPL-Review OK', title_en: 'Data point list (DPL) accepted and DPL review passed', critical: true },
				{ id: 'ft-pre-visualisierung', title: 'GLT-Visualisierung alle Anlagen zeigt Istwerte (keine N/A, keine Fehler)', title_en: 'BMS visualisation shows actual values for all systems (no N/A, no errors)' },
				{ id: 'ft-pre-zeit', title: 'Systemzeit korrekt (NTP synchronisiert)', title_en: 'System time correct (NTP synchronised)', critical: true }
			]
		},
		{
			title: 'Regelkreise — Heizung',
			title_en: 'Control Loops — Heating',
			items: [
				{ id: 'ft-hz-sollwert', title: 'Vorlauftemperatur-Sollwert von GLT setzbar, Regler folgt', title_en: 'Flow temperature setpoint settable from BMS, controller follows', critical: true },
				{ id: 'ft-hz-mischer', title: 'Mischer fährt in beide Richtungen (AUF/ZU) korrekt an', title_en: 'Mixing valve drives correctly in both directions (OPEN/CLOSE)' },
				{ id: 'ft-hz-heizkurve', title: 'Heizkurve aktiv — Sollwert ändert sich mit Aussentemperatur', title_en: 'Heating curve active — setpoint changes with outdoor temperature' },
				{ id: 'ft-hz-nachtabsenkung', title: 'Nachtabsenkung via Zeitprogramm getestet', title_en: 'Night setback via time program tested' },
				{ id: 'ft-hz-frostschutz', title: 'Frostschutz-Grenzwert getestet (Simulation Aussentemperatur < Grenzwert)', title_en: 'Frost protection limit tested (simulation outdoor temperature < threshold)', critical: true }
			]
		},
		{
			title: 'Regelkreise — Lüftung',
			title_en: 'Control Loops — Ventilation',
			items: [
				{ id: 'ft-rlt-start', title: 'RLT-Anlage startet und stoppt via Zeitprogramm / Freigabe', title_en: 'AHU starts and stops via time program / enable signal', critical: true },
				{ id: 'ft-rlt-kaskade', title: 'Zuluft-Temperaturregelung: Erwärmer und Kühler arbeiten korrekt', title_en: 'Supply air temperature control: heater and cooler operate correctly' },
				{ id: 'ft-rlt-druck', title: 'Kanaldruck-Regelung: Drehzahl FU folgt dem Drucksollwert', title_en: 'Duct pressure control: VFD speed follows pressure setpoint' },
				{ id: 'ft-rlt-vav', title: 'VAV-Boxen: Volumenstrom-Regelung getestet (min. 2 Räume)', title_en: 'VAV boxes: airflow control tested (min. 2 rooms)' },
				{ id: 'ft-rlt-co2', title: 'CO₂-geführte Lüftung: Erhöhung Luftmenge bei CO₂ > Grenzwert', title_en: 'CO₂-controlled ventilation: airflow increases when CO₂ exceeds limit' },
				{ id: 'ft-rlt-bsk', title: 'BSK-Auslösung: Lüftung schaltet ab, BSK schliesst — Rückmeldung an GLT', title_en: 'Fire damper trip: ventilation shuts down, damper closes — feedback to BMS', critical: true }
			]
		},
		{
			title: 'Regelkreise — Kälte / Kühlung',
			title_en: 'Control Loops — Cooling',
			items: [
				{ id: 'ft-klt-sollwert', title: 'Kaltwasser-Sollwert setzbar, Kältemaschine regelt nach', title_en: 'Chilled water setpoint settable, chiller controls accordingly' },
				{ id: 'ft-klt-freigabe', title: 'Freigabe Kälte: nur bei Aussentemperatur > Grenzwert aktiv', title_en: 'Cooling enable: active only when outdoor temperature exceeds threshold' },
				{ id: 'ft-klt-free-cooling', title: 'Free-Cooling-Umschaltung getestet (falls vorhanden)', title_en: 'Free cooling switchover tested (if present)' }
			]
		},
		{
			title: 'Alarme & Meldungen',
			title_en: 'Alarms & Notifications',
			items: [
				{ id: 'ft-alarm-motorschutz', title: 'Motorschutz simuliert → Störalarm erscheint in GLT, Zeit korrekt', title_en: 'Motor protection simulated → fault alarm appears in BMS, timestamp correct', critical: true },
				{ id: 'ft-alarm-frostschutz', title: 'Frostschutzalarm simuliert → Lüftung stop, Protokoll', title_en: 'Frost protection alarm simulated → ventilation stops, logged', critical: true },
				{ id: 'ft-alarm-kommunikation', title: 'Kommunikationsausfall DDC simuliert → Timeout-Alarm in GLT', title_en: 'DDC communication loss simulated → timeout alarm in BMS', critical: true, hint: 'Timeout typisch 30–60 s', hint_en: 'Timeout typically 30–60 s' },
				{ id: 'ft-alarm-temperatur', title: 'Temperatur-Grenzwertalarm (oben/unten) simuliert und ausgelöst', title_en: 'Temperature limit alarm (high/low) simulated and triggered' },
				{ id: 'ft-alarm-quittierung', title: 'Alarmquittierung getestet: quittierter Alarm verschwindet aus aktiver Alarmliste', title_en: 'Alarm acknowledgement tested: acknowledged alarm disappears from active alarm list' },
				{ id: 'ft-alarm-email', title: 'Email-/SMS-Weiterleitung eines Kritisch-Alarms getestet (falls konfiguriert)', title_en: 'Email/SMS forwarding of a critical alarm tested (if configured)' }
			]
		},
		{
			title: 'Zeitprogramme & Kalender',
			title_en: 'Time Programs & Calendar',
			items: [
				{ id: 'ft-zeit-woche', title: 'Wochenprogramm getestet (Abweichung ≤ 1 min Schaltzeit)', title_en: 'Weekly program tested (switching time deviation ≤ 1 min)', critical: true },
				{ id: 'ft-zeit-sondertermine', title: 'Sondertage (Feiertage, Betriebsurlaub) eingetragen und getestet', title_en: 'Special days (public holidays, plant shutdown) entered and tested' },
				{ id: 'ft-zeit-optimstart', title: 'Optimaler Aufheizbeginn: Anlage startet früh genug für Komforttemperatur um Nutzungsbeginn', title_en: 'Optimum start: system starts early enough to reach comfort temperature by occupancy time' }
			]
		},
		{
			title: 'Kommunikation & Schnittstellen',
			title_en: 'Communication & Interfaces',
			items: [
				{ id: 'ft-kom-alle-ddcs', title: 'Alle DDC-Stationen in GLT online und kommunizieren', title_en: 'All DDC stations online and communicating in BMS', critical: true },
				{ id: 'ft-kom-modbus', title: 'Modbus-Geräte (FU, Zähler, Kälte) erreichbar und Werte plausibel', title_en: 'Modbus devices (VFDs, meters, chillers) reachable and values plausible' },
				{ id: 'ft-kom-bacnet', title: 'BACnet-Geräte via Who-Is/I-Am erreichbar', title_en: 'BACnet devices reachable via Who-Is/I-Am' },
				{ id: 'ft-kom-bacnet-cov', title: 'COV-Subscriptions aktiv: Wertänderungen kommen in GLT an', title_en: 'COV subscriptions active: value changes arrive in BMS' },
				{ id: 'ft-kom-trend', title: 'Trending aktiv: Daten werden historisiert, Export möglich', title_en: 'Trending active: data being historised, export possible' }
			]
		},
		{
			title: 'Abnahme & Übergabe',
			title_en: 'Acceptance & Handover',
			items: [
				{ id: 'ft-u-protokoll', title: 'Funktionstest-Protokoll vollständig ausgefüllt', title_en: 'Functional test record fully completed', critical: true },
				{ id: 'ft-u-maengel', title: 'Offene Mängel dokumentiert und Terminfestlegung für Behebung', title_en: 'Outstanding defects documented and remediation dates set' },
				{ id: 'ft-u-abnahme', title: 'Abnahme mit Bauherrschaft / Betreiber durchgeführt und unterschrieben', title_en: 'Acceptance carried out with client / operator and signed', critical: true },
				{ id: 'ft-u-as-built', title: 'As-Built Dokumentation übergeben (Schemas, DPL, Konfiguration)', title_en: 'As-built documentation handed over (diagrams, DPL, configuration)', critical: true }
			]
		}
	]
};
