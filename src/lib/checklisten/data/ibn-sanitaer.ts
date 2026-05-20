import type { ChecklistTemplate } from '../types';

export const ibnSanitaer: ChecklistTemplate = {
	slug: 'ibn-sanitaer',
	title: 'IBN Sanitär & Legionellenschutz',
	title_en: 'Commissioning — DHW & Legionella Protection',
	subtitle: 'Trinkwassererwärmung, TWW-Zirkulation, Legionellenprävention',
	subtitle_en: 'Domestic hot water heating, DHW circulation, Legionella prevention',
	description: 'Inbetriebnahme einer Trinkwarmwasseranlage mit Fokus auf Legionellenprävention nach DVGW W 551 / SVGW W3. Einzuhalten: Speichertemperatur ≥ 60°C, Zirkulationsrücklauf ≥ 55°C.',
	description_en: 'Commissioning of a domestic hot water system with focus on Legionella prevention per DVGW W 551 / SVGW W3. Requirements: storage temperature ≥ 60°C, circulation return ≥ 55°C.',
	category: 'IBN',
	icon: 'droplets',
	color: '#0284c7',
	areas: ['sanitaer'],
	norm: ['DVGW W 551', 'SVGW W3', 'TrinkwV', 'VDI 6023', 'EN 806'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'Dokumentation & Vorbereitung',
			title_en: 'Documentation & Preparation',
			items: [
				{ id: 's-pre-schema', title: 'Installationsschema Trinkwasser-Warm vorhanden', title_en: 'DHW installation diagram available', critical: true },
				{ id: 's-pre-hygieneschullung', title: 'Hygiene-Unterweisung (VDI 6023 Teil A/B) durchgeführt', title_en: 'Hygiene training (VDI 6023 Part A/B) completed', critical: true },
				{ id: 's-pre-stagnation', title: 'Stagnationszeiten während Bau minimiert / Spülplan erstellt', title_en: 'Stagnation times during construction minimised / flushing plan created' },
				{ id: 's-pre-desinfektion', title: 'Thermische Desinfektion vor Inbetriebnahme geplant', title_en: 'Thermal disinfection planned before commissioning', critical: true }
			]
		},
		{
			title: 'Hydraulik & Spülung',
			title_en: 'Hydraulics & Flushing',
			items: [
				{ id: 's-h-spuelen', title: 'Gesamte Installation gespült (alle Entnahmen fliessen klar)', title_en: 'Entire installation flushed (all outlets flow clear)', critical: true, hint: 'Mindestens 10-facher Leitungsinhalt gespült', hint_en: 'Flush minimum 10× the pipe volume' },
				{ id: 's-h-totstrang', title: 'Keine Totstränge vorhanden oder auf max. 3× DN begrenzt', title_en: 'No dead legs or limited to max. 3× DN', critical: true, hint: 'Totstränge > 3 Liter = Legionellenrisiko!', hint_en: 'Dead legs > 3 litres = Legionella risk!' },
				{ id: 's-h-zirkulation', title: 'Zirkulationsleitungen zu allen Zirkulationssträngen geprüft', title_en: 'Circulation pipes to all circulation branches checked' },
				{ id: 's-h-abgleich', title: 'Zirkulation hydraulisch abgeglichen (Rücklauftemperatur ≥ 55°C an allen Strängen)', title_en: 'Circulation hydraulically balanced (return temperature ≥ 55°C on all branches)', critical: true },
				{ id: 's-h-thermometer', title: 'Tauchhülsen an Zirkulationsmessstellen montiert', title_en: 'Immersion sleeves fitted at circulation measurement points' }
			]
		},
		{
			title: 'Trinkwassererwärmer / Speicher',
			title_en: 'DHW Heater / Storage',
			items: [
				{ id: 's-sp-temperatur', title: 'Speicher-Solltemperatur ≥ 60°C eingestellt', title_en: 'Storage setpoint ≥ 60°C set', critical: true, hint: 'DVGW W551: mind. 60°C im Speicher, Speicherkopf ≥ 60°C', hint_en: 'DVGW W551: min. 60°C in storage, storage top ≥ 60°C' },
				{ id: 's-sp-anode', title: 'Magnesiumanode vorhanden / Zustand geprüft (elektrisch beheizter Speicher)', title_en: 'Magnesium anode present / condition checked (electric storage heater)' },
				{ id: 's-sp-sicherheitsventil', title: 'Sicherheitsventil Trinkwasser geprüft, Abblasleitung korrekt', title_en: 'DHW safety valve tested, blow-off pipe correct', critical: true },
				{ id: 's-sp-entkalkung', title: 'Wasseranalyse / Härte bekannt, Entkalkungsmassnahmen geplant', title_en: 'Water analysis / hardness known, descaling measures planned', hint: 'Kalk-Schutzschicht ab 70°C — höhere Verkalkungs-Gefahr', hint_en: 'Limescale protection layer forms above 70°C — higher scaling risk' }
			]
		},
		{
			title: 'Zirkulationspumpe & Regelung',
			title_en: 'Circulation Pump & Controls',
			items: [
				{ id: 's-z-pumpe', title: 'Zirkulationspumpe läuft (Pumpenkopf ≤ 0.3 bar)', title_en: 'Circulation pump running (pump head ≤ 0.3 bar)', hint: 'Zu hoher Pumpenkopf = schlechter hydraulischer Abgleich', hint_en: 'Too high pump head = poor hydraulic balancing' },
				{ id: 's-z-thermostatventile', title: 'Zirkulations-Thermostatventile auf 55°C Rücklauf eingestellt', title_en: 'Circulation thermostatic valves set to 55°C return', critical: true },
				{ id: 's-z-zeitprogramm', title: 'Zirkulationszeitprogramm aktiv (Betriebszeiten)', title_en: 'Circulation time program active (operating hours)', hint: 'Nacht-Abschaltung: > 4 Stunden Stagnation vermeiden', hint_en: 'Night shutdown: avoid > 4 hours stagnation' },
				{ id: 's-z-ddc', title: 'DDC-Anbindung Zirkulationspumpe und Speicher-Temperatur getestet', title_en: 'DDC connection for circulation pump and storage temperature tested' }
			]
		},
		{
			title: 'Thermische Desinfektion',
			title_en: 'Thermal Disinfection',
			items: [
				{ id: 's-td-planung', title: 'Thermische Desinfektion geplant (≥ 70°C im Speicher, ≥ 70°C an allen Entnahmen)', title_en: 'Thermal disinfection planned (≥ 70°C in storage, ≥ 70°C at all outlets)', critical: true },
				{ id: 's-td-durchfuehrung', title: 'Thermische Desinfektion durchgeführt, alle Entnahmen geöffnet und auf 70°C gebracht', title_en: 'Thermal disinfection performed, all outlets opened and brought to 70°C', critical: true, hint: 'Haltezeit: mindestens 3 Min bei 70°C pro Entnahme. Verbrühungsschutz beachten!', hint_en: 'Hold time: minimum 3 min at 70°C per outlet. Observe scald protection!' },
				{ id: 's-td-protokoll', title: 'Desinfektions-Protokoll mit Temperaturen und Uhrzeiten erstellt', title_en: 'Disinfection record with temperatures and times created', critical: true },
				{ id: 's-td-probe', title: 'Mikrobiologische Wasserprobe nach Inbetriebnahme (Legionellen < 100 KBE/100 ml)', title_en: 'Microbiological water sample after commissioning (Legionella < 100 CFU/100 ml)', critical: true }
			]
		},
		{
			title: 'Übergabe',
			title_en: 'Handover',
			items: [
				{ id: 's-u-protokoll', title: 'IBN-Protokoll mit Temperaturmessungen (Speicher, Zirkulation alle Stränge) unterschrieben', title_en: 'Commissioning record with temperature measurements (storage, circulation all branches) signed', critical: true },
				{ id: 's-u-wasserprobe', title: 'Positivbefund Wasserprobe an Betreiber übergeben', title_en: 'Positive water sample result handed over to operator', critical: true },
				{ id: 's-u-bedienung', title: 'Betreiber über Legionellen-Prävention eingewiesen (Temperaturen, Inspektion)', title_en: 'Operator briefed on Legionella prevention (temperatures, inspection)' },
				{ id: 's-u-wartungsplan', title: 'Wartungsplan: jährliche Temperatur-Überprüfung, 3-jährige Legionellen-Probe (Grossanlagen)', title_en: 'Maintenance plan: annual temperature check, 3-year Legionella test (large systems)' }
			]
		}
	]
};
