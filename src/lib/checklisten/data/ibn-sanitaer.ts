import type { ChecklistTemplate } from '../types';

export const ibnSanitaer: ChecklistTemplate = {
	slug: 'ibn-sanitaer',
	title: 'IBN Sanitär & Legionellenschutz',
	subtitle: 'Trinkwassererwärmung, TWW-Zirkulation, Legionellenprävention',
	description: 'Inbetriebnahme einer Trinkwarmwasseranlage mit Fokus auf Legionellenprävention nach DVGW W 551 / SVGW W3. Einzuhalten: Speichertemperatur ≥ 60°C, Zirkulationsrücklauf ≥ 55°C.',
	category: 'IBN',
	icon: 'droplets',
	color: '#0284c7',
	areas: ['sanitaer'],
	norm: ['DVGW W 551', 'SVGW W3', 'TrinkwV', 'VDI 6023', 'EN 806'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Dokumentation & Vorbereitung',
			items: [
				{ id: 's-pre-schema', title: 'Installationsschema Trinkwasser-Warm vorhanden', critical: true },
				{ id: 's-pre-hygieneschullung', title: 'Hygiene-Unterweisung (VDI 6023 Teil A/B) durchgeführt', critical: true },
				{ id: 's-pre-stagnation', title: 'Stagnationszeiten während Bau minimiert / Spülplan erstellt' },
				{ id: 's-pre-desinfektion', title: 'Thermische Desinfektion vor Inbetriebnahme geplant', critical: true }
			]
		},
		{
			title: 'Hydraulik & Spülung',
			items: [
				{ id: 's-h-spuelen', title: 'Gesamte Installation gespült (alle Entnahmen fliessen klar)', critical: true, hint: 'Mindestens 10-facher Leitungsinhalt gespült' },
				{ id: 's-h-totstrang', title: 'Keine Totstränge vorhanden oder auf max. 3× DN begrenzt', critical: true, hint: 'Totstränge > 3 Liter = Legionellenrisiko!' },
				{ id: 's-h-zirkulation', title: 'Zirkulationsleitungen zu allen Zirkulationssträngen geprüft' },
				{ id: 's-h-abgleich', title: 'Zirkulation hydraulisch abgeglichen (Rücklauftemperatur ≥ 55°C an allen Strängen)', critical: true },
				{ id: 's-h-thermometer', title: 'Tauchhülsen an Zirkulationsmessstellen montiert' }
			]
		},
		{
			title: 'Trinkwassererwärmer / Speicher',
			items: [
				{ id: 's-sp-temperatur', title: 'Speicher-Solltemperatur ≥ 60°C eingestellt', critical: true, hint: 'DVGW W551: mind. 60°C im Speicher, Speicherkopf ≥ 60°C' },
				{ id: 's-sp-anode', title: 'Magnesiumanode vorhanden / Zustand geprüft (elektrisch beheizter Speicher)' },
				{ id: 's-sp-sicherheitsventil', title: 'Sicherheitsventil Trinkwasser geprüft, Abblasleitung korrekt', critical: true },
				{ id: 's-sp-entkalkung', title: 'Wasseranalyse / Härte bekannt, Entkalkungsmassnahmen geplant', hint: 'Kalk-Schutzschicht ab 70°C — höhere Verkalkungs-Gefahr' }
			]
		},
		{
			title: 'Zirkulationspumpe & Regelung',
			items: [
				{ id: 's-z-pumpe', title: 'Zirkulationspumpe läuft (Pumpenkopf ≤ 0.3 bar)', hint: 'Zu hoher Pumpenkopf = schlechter hydraulischer Abgleich' },
				{ id: 's-z-thermostatventile', title: 'Zirkulations-Thermostatventile auf 55°C Rücklauf eingestellt', critical: true },
				{ id: 's-z-zeitprogramm', title: 'Zirkulationszeitprogramm aktiv (Betriebszeiten)', hint: 'Nacht-Abschaltung: > 4 Stunden Stagnation vermeiden' },
				{ id: 's-z-ddc', title: 'DDC-Anbindung Zirkulationspumpe und Speicher-Temperatur getestet' }
			]
		},
		{
			title: 'Thermische Desinfektion',
			items: [
				{ id: 's-td-planung', title: 'Thermische Desinfektion geplant (≥ 70°C im Speicher, ≥ 70°C an allen Entnahmen)', critical: true },
				{ id: 's-td-durchfuehrung', title: 'Thermische Desinfektion durchgeführt, alle Entnahmen geöffnet und auf 70°C gebracht', critical: true, hint: 'Haltezeit: mindestens 3 Min bei 70°C pro Entnahme. Verbrühungsschutz beachten!' },
				{ id: 's-td-protokoll', title: 'Desinfektions-Protokoll mit Temperaturen und Uhrzeiten erstellt', critical: true },
				{ id: 's-td-probe', title: 'Mikrobiologische Wasserprobe nach Inbetriebnahme (Legionellen < 100 KBE/100 ml)', critical: true }
			]
		},
		{
			title: 'Übergabe',
			items: [
				{ id: 's-u-protokoll', title: 'IBN-Protokoll mit Temperaturmessungen (Speicher, Zirkulation alle Stränge) unterschrieben', critical: true },
				{ id: 's-u-wasserprobe', title: 'Positivbefund Wasserprobe an Betreiber übergeben', critical: true },
				{ id: 's-u-bedienung', title: 'Betreiber über Legionellen-Prävention eingewiesen (Temperaturen, Inspektion)' },
				{ id: 's-u-wartungsplan', title: 'Wartungsplan: jährliche Temperatur-Überprüfung, 3-jährige Legionellen-Probe (Grossanlagen)' }
			]
		}
	]
};
