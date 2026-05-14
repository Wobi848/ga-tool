import type { ChecklistTemplate } from '../types';

export const knxIbn: ChecklistTemplate = {
	slug: 'knx-ibn',
	title: 'KNX-Inbetriebnahme',
	subtitle: 'Topologie, ETS-Projekt, Adressierung, Funktionstest',
	description: 'Inbetriebnahme einer KNX-Installation mit ETS5/6. Reihenfolge: Verkabelung → Topologie → Geräte → Programmierung → Test.',
	category: 'IBN',
	icon: 'cpu',
	color: '#16a34a',
	areas: ['ga', 'elektro'],
	norm: ['EN 50090', 'ISO/IEC 14543-3'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Verkabelung & Hardware',
			items: [
				{ id: 'v-kabel', title: 'KNX-Buskabel YCYM oder J-Y(St)Y verwendet', critical: true },
				{ id: 'v-polung', title: 'Polung +/- konsistent (rot/schwarz auf TP+/TP−)', critical: true },
				{ id: 'v-isolation', title: 'Bus-Kabel min. 4 mm vom 230 V getrennt' },
				{ id: 'v-spannung', title: 'Busspannung 29 V DC ± 1 V gemessen', critical: true },
				{ id: 'v-drosseln', title: 'Spannungsversorgung mit Drossel (oder integrierte Drossel)' },
				{ id: 'v-laenge', title: 'Maximale Linienlänge eingehalten (max. 1000 m, 350 m zwischen Geräten)' }
			]
		},
		{
			title: 'Topologie',
			items: [
				{ id: 't-bereich', title: 'Bereiche/Linien gemäss Plan strukturiert', critical: true },
				{ id: 't-linienkoppler', title: 'Linienkoppler / Bereichskoppler korrekt platziert' },
				{ id: 't-geraete', title: 'Max. 64 Geräte pro Linie (oder mit Linienverstärker bis 256)' },
				{ id: 't-busabschluss', title: 'Bus-Abschluss bei Bedarf vorhanden (am weitesten entfernten Punkt)' }
			]
		},
		{
			title: 'ETS-Projekt',
			items: [
				{ id: 'e-version', title: 'ETS-Version dokumentiert (5 / 6)', critical: true },
				{ id: 'e-katalog', title: 'Aktuelle Produktdatenbanken importiert' },
				{ id: 'e-gebaeudestruktur', title: 'Gebäudestruktur (Bereiche, Räume) entspricht Plan' },
				{ id: 'e-ga-namen', title: 'Gruppenadressen sprechend benannt (z.B. EG/Wohnen/Licht/Schalten)' },
				{ id: 'e-backup', title: 'Projekt-Backup gespeichert (z.B. .knxproj im Doku-Ordner)' }
			]
		},
		{
			title: 'Programmierung',
			items: [
				{ id: 'p-individualadr', title: 'Individualadressen vergeben und programmiert', critical: true },
				{ id: 'p-applikation', title: 'Applikationsprogramme geladen' },
				{ id: 'p-parameter', title: 'Parameter nach Kundenvorgabe gesetzt' },
				{ id: 'p-ga-zugewiesen', title: 'Gruppenadressen verknüpft' },
				{ id: 'p-fehler', title: 'ETS-Inbetriebnahmebericht ohne Fehler' }
			]
		},
		{
			title: 'Funktionstest',
			items: [
				{ id: 'ft-schalten', title: 'Alle Lichtgruppen schalten', critical: true },
				{ id: 'ft-dimmen', title: 'Dimmer funktionieren mit korrekten Kurven' },
				{ id: 'ft-jalousien', title: 'Jalousien fahren bis Endpunkt + Lamellen' },
				{ id: 'ft-szenen', title: 'Szenen abrufbar und mit gewünschtem Ergebnis' },
				{ id: 'ft-rueckmeldung', title: 'Statusrückmeldungen aller Aktoren stimmen' },
				{ id: 'ft-sensoren', title: 'Bewegungsmelder / Helligkeitssensor reagieren' },
				{ id: 'ft-busload', title: 'Busbelastung < 50 % (über ETS-Monitor geprüft)' }
			]
		},
		{
			title: 'Dokumentation & Übergabe',
			items: [
				{ id: 'd-projektdatei', title: 'ETS-Projektdatei archiviert + an Betreiber', critical: true },
				{ id: 'd-installationsbericht', title: 'Installationsbericht (Topologie, Adressen, GA-Liste)' },
				{ id: 'd-bedienung', title: 'Bedienungsanleitung Tasterbelegung erstellt' },
				{ id: 'd-passwort', title: 'BCU-Schlüssel / Passwörter übergeben' }
			]
		}
	]
};
