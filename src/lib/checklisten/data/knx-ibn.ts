import type { ChecklistTemplate } from '../types';

export const knxIbn: ChecklistTemplate = {
	slug: 'knx-ibn',
	title: 'KNX-Inbetriebnahme',
	title_en: 'KNX Commissioning',
	subtitle: 'Topologie, ETS-Projekt, Adressierung, Funktionstest',
	subtitle_en: 'Topology, ETS project, addressing, functional test',
	description:
		'Inbetriebnahme einer KNX-Installation mit ETS5/6. Reihenfolge: Verkabelung → Topologie → Geräte → Programmierung → Test.',
	description_en:
		'Commissioning of a KNX installation with ETS5/6. Order: wiring → topology → devices → programming → testing.',
	category: 'IBN',
	icon: 'cpu',
	color: '#16a34a',
	areas: ['ga', 'elektro'],
	norm: ['EN 50090', 'ISO/IEC 14543-3'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Verkabelung & Hardware',
			title_en: 'Wiring & Hardware',
			items: [
				{
					id: 'v-kabel',
					title: 'KNX-Buskabel YCYM oder J-Y(St)Y verwendet',
					title_en: 'KNX bus cable YCYM or J-Y(St)Y used',
					critical: true
				},
				{
					id: 'v-polung',
					title: 'Polung +/- konsistent (rot/schwarz auf TP+/TP−)',
					title_en: 'Polarity +/− consistent (red/black on TP+/TP−)',
					critical: true
				},
				{
					id: 'v-isolation',
					title: 'Bus-Kabel min. 4 mm vom 230 V getrennt',
					title_en: 'Bus cable separated min. 4 mm from 230 V wiring'
				},
				{
					id: 'v-spannung',
					title: 'Busspannung 29 V DC ± 1 V gemessen',
					title_en: 'Bus voltage measured 29 V DC ± 1 V',
					critical: true
				},
				{
					id: 'v-drosseln',
					title: 'Spannungsversorgung mit Drossel (oder integrierte Drossel)',
					title_en: 'Power supply with choke (or integrated choke)'
				},
				{
					id: 'v-laenge',
					title: 'Maximale Linienlänge eingehalten (max. 1000 m, 350 m zwischen Geräten)',
					title_en: 'Maximum line length observed (max. 1000 m, 350 m between devices)'
				}
			]
		},
		{
			title: 'Topologie',
			title_en: 'Topology',
			items: [
				{
					id: 't-bereich',
					title: 'Bereiche/Linien gemäss Plan strukturiert',
					title_en: 'Areas/lines structured per plan',
					critical: true
				},
				{
					id: 't-linienkoppler',
					title: 'Linienkoppler / Bereichskoppler korrekt platziert',
					title_en: 'Line couplers / area couplers correctly placed'
				},
				{
					id: 't-geraete',
					title: 'Max. 64 Geräte pro Linie (oder mit Linienverstärker bis 256)',
					title_en: 'Max. 64 devices per line (or up to 256 with line repeater)'
				},
				{
					id: 't-busabschluss',
					title: 'Bus-Abschluss bei Bedarf vorhanden (am weitesten entfernten Punkt)',
					title_en: 'Bus termination present if required (at the furthest point)'
				}
			]
		},
		{
			title: 'ETS-Projekt',
			title_en: 'ETS Project',
			items: [
				{
					id: 'e-version',
					title: 'ETS-Version dokumentiert (5 / 6)',
					title_en: 'ETS version documented (5 / 6)',
					critical: true
				},
				{
					id: 'e-katalog',
					title: 'Aktuelle Produktdatenbanken importiert',
					title_en: 'Current product databases imported'
				},
				{
					id: 'e-gebaeudestruktur',
					title: 'Gebäudestruktur (Bereiche, Räume) entspricht Plan',
					title_en: 'Building structure (areas, rooms) matches plan'
				},
				{
					id: 'e-ga-namen',
					title: 'Gruppenadressen sprechend benannt (z.B. EG/Wohnen/Licht/Schalten)',
					title_en: 'Group addresses given descriptive names (e.g. GF/LivingRoom/Light/Switch)'
				},
				{
					id: 'e-backup',
					title: 'Projekt-Backup gespeichert (z.B. .knxproj im Doku-Ordner)',
					title_en: 'Project backup saved (e.g. .knxproj in documentation folder)'
				}
			]
		},
		{
			title: 'Programmierung',
			title_en: 'Programming',
			items: [
				{
					id: 'p-individualadr',
					title: 'Individualadressen vergeben und programmiert',
					title_en: 'Individual addresses assigned and programmed',
					critical: true
				},
				{
					id: 'p-applikation',
					title: 'Applikationsprogramme geladen',
					title_en: 'Application programs downloaded'
				},
				{
					id: 'p-parameter',
					title: 'Parameter nach Kundenvorgabe gesetzt',
					title_en: 'Parameters set per client specification'
				},
				{
					id: 'p-ga-zugewiesen',
					title: 'Gruppenadressen verknüpft',
					title_en: 'Group addresses linked'
				},
				{
					id: 'p-fehler',
					title: 'ETS-Inbetriebnahmebericht ohne Fehler',
					title_en: 'ETS commissioning report error-free'
				}
			]
		},
		{
			title: 'Funktionstest',
			title_en: 'Functional Test',
			items: [
				{
					id: 'ft-schalten',
					title: 'Alle Lichtgruppen schalten',
					title_en: 'All lighting groups switch',
					critical: true
				},
				{
					id: 'ft-dimmen',
					title: 'Dimmer funktionieren mit korrekten Kurven',
					title_en: 'Dimmers function with correct curves'
				},
				{
					id: 'ft-jalousien',
					title: 'Jalousien fahren bis Endpunkt + Lamellen',
					title_en: 'Blinds travel to end position + slat adjustment'
				},
				{
					id: 'ft-szenen',
					title: 'Szenen abrufbar und mit gewünschtem Ergebnis',
					title_en: 'Scenes recallable and produce desired result'
				},
				{
					id: 'ft-rueckmeldung',
					title: 'Statusrückmeldungen aller Aktoren stimmen',
					title_en: 'Status feedback of all actuators correct'
				},
				{
					id: 'ft-sensoren',
					title: 'Bewegungsmelder / Helligkeitssensor reagieren',
					title_en: 'Motion detectors / light sensors respond'
				},
				{
					id: 'ft-busload',
					title: 'Busbelastung < 50 % (über ETS-Monitor geprüft)',
					title_en: 'Bus load < 50 % (verified via ETS monitor)'
				}
			]
		},
		{
			title: 'Dokumentation & Übergabe',
			title_en: 'Documentation & Handover',
			items: [
				{
					id: 'd-projektdatei',
					title: 'ETS-Projektdatei archiviert + an Betreiber',
					title_en: 'ETS project file archived and handed over to operator',
					critical: true
				},
				{
					id: 'd-installationsbericht',
					title: 'Installationsbericht (Topologie, Adressen, GA-Liste)',
					title_en: 'Installation report (topology, addresses, group address list)'
				},
				{
					id: 'd-bedienung',
					title: 'Bedienungsanleitung Tasterbelegung erstellt',
					title_en: 'Operating guide for button assignments created'
				},
				{
					id: 'd-passwort',
					title: 'BCU-Schlüssel / Passwörter übergeben',
					title_en: 'BCU keys / passwords handed over'
				}
			]
		}
	]
};
