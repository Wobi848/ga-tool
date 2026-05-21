import type { Abbreviation } from './types';

export const abbreviations: Abbreviation[] = [
	// ──────────────────────────────────────────────────────
	// Regelung & Steuerung
	// ──────────────────────────────────────────────────────
	{
		short: 'PID',
		long: 'Proportional–Integral–Derivative',
		description: 'Standard-Reglertyp mit drei Anteilen: schnelle P-Reaktion, statische Genauigkeit durch I, Dämpfung durch D.',
		descriptionEn: 'Standard controller type with three components: fast P response, static accuracy via I, damping via D.',
		areas: ['hlk', 'ga'],
		related: ['PI', 'P'],
		wissenSlug: 'pid-regler'
	},
	{
		short: 'PI',
		long: 'Proportional–Integral',
		description: 'PID ohne D-Anteil — der Klassiker in der HLK-Regelung (träge Strecken).',
		descriptionEn: 'PID without D component — the classic in HVAC control (sluggish processes).',
		areas: ['hlk', 'ga'],
		related: ['PID', 'P'],
		wissenSlug: 'pid-regler'
	},
	{
		short: 'P',
		long: 'Proportional Controller',
		description: 'Stellgrösse proportional zum Fehler. Schnell, aber bleibende Regelabweichung.',
		descriptionEn: 'Control output proportional to error. Fast, but with steady-state offset.',
		areas: ['hlk', 'ga'],
		related: ['PID', 'PI'],
		wissenSlug: 'pid-regler'
	},
	{
		short: 'SPS',
		long: 'Speicherprogrammierbare Steuerung',
		description: 'Industrielle Steuerung mit zyklischer Programmabarbeitung (DE-Begriff für PLC).',
		descriptionEn: 'Industrial controller with cyclic program execution (German term for PLC).',
		areas: ['ga', 'it'],
		related: ['PLC', 'DDC']
	},
	{
		short: 'PLC',
		long: 'Programmable Logic Controller',
		description: 'Englische Bezeichnung für SPS.',
		descriptionEn: 'Programmable Logic Controller — English term for SPS.',
		areas: ['ga', 'it'],
		related: ['SPS', 'DDC']
	},
	{
		short: 'DDC',
		long: 'Direct Digital Control',
		description: 'Frei programmierbare Automationsstation in der GA — Übergang zwischen SPS und Gebäudeleittechnik.',
		descriptionEn: 'Freely programmable automation station in BA — between PLC and building management.',
		areas: ['ga'],
		related: ['SPS', 'GLT', 'MSR']
	},
	{
		short: 'GLT',
		long: 'Gebäudeleittechnik',
		description: 'Übergeordnete Visualisierungs- und Bedienebene einer Gebäudeautomation.',
		descriptionEn: 'Top-level visualisation and operating layer of a building automation system.',
		areas: ['ga', 'it'],
		related: ['BMS', 'SCADA', 'MBE']
	},
	{
		short: 'BMS',
		long: 'Building Management System',
		description: 'Englisch für Gebäudeleittechnik (GLT).',
		descriptionEn: 'Building Management System — English equivalent of GLT.',
		areas: ['ga', 'it'],
		related: ['GLT', 'BACS']
	},
	{
		short: 'BACS',
		long: 'Building Automation and Control System',
		description: 'EN-Begriff für GA-System. Klassifikation nach EN 15232 (Energieeffizienz A–D).',
		descriptionEn: 'EN term for BA system. Classification per EN 15232 (energy efficiency A–D).',
		areas: ['ga', 'normen'],
		related: ['GLT', 'BMS']
	},
	{
		short: 'MBE',
		long: 'Management- und Bedienebene',
		description: 'Oberste Ebene der GA-Hierarchie nach VDI 3814.',
		descriptionEn: 'Top level of BA hierarchy per VDI 3814.',
		areas: ['ga', 'normen'],
		related: ['GLT', 'AE', 'FE']
	},
	{
		short: 'AE',
		long: 'Automationsebene',
		description: 'Mittlere Ebene der GA — DDCs, Automationsstationen.',
		descriptionEn: 'Middle level of BA — DDCs, automation stations.',
		areas: ['ga', 'normen'],
		related: ['MBE', 'FE']
	},
	{
		short: 'FE',
		long: 'Feldebene',
		description: 'Unterste Ebene: Sensoren, Aktoren, Stellantriebe.',
		descriptionEn: 'Lowest level: sensors, actuators, drives.',
		areas: ['ga', 'normen'],
		related: ['MBE', 'AE']
	},
	{
		short: 'HMI',
		long: 'Human Machine Interface',
		description: 'Bedienoberfläche an Steuerung oder Anlage — Touch-Display, Webvisualisierung.',
		descriptionEn: 'Operator interface on controller or system — touch display, web visualisation.',
		areas: ['ga', 'it'],
		related: ['SCADA', 'GLT']
	},
	{
		short: 'SCADA',
		long: 'Supervisory Control and Data Acquisition',
		description: 'Übergeordnetes Leitsystem in Industrie/Infrastruktur — ähnlich GLT.',
		descriptionEn: 'Supervisory control system in industry/infrastructure — similar to GLT.',
		areas: ['ga', 'it'],
		related: ['GLT', 'BMS']
	},
	{
		short: 'OPC UA',
		long: 'OPC Unified Architecture',
		description: 'Industrie-Standard für Maschine-zu-Maschine-Kommunikation. Plattformunabhängig, verschlüsselt.',
		descriptionEn: 'Industry standard for machine-to-machine communication. Platform-independent, encrypted.',
		areas: ['ga', 'it'],
		related: ['BACnet', 'Modbus']
	},
	{
		short: 'MSR',
		long: 'Messen, Steuern, Regeln',
		description: 'Oberbegriff für die drei Kerndisziplinen der Automatisierungstechnik. In D/A/CH verbreitet.',
		descriptionEn: 'Collective term for the three core disciplines of automation engineering (instrumentation & control). Common in German-speaking countries.',
		areas: ['ga', 'hlk'],
		related: ['DDC', 'SPS']
	},
	{
		short: 'MPC',
		long: 'Model Predictive Control',
		description: 'Prädiktive Regelstrategie: optimiert Stellgrössen über einen Zeithorizont unter Berücksichtigung von Prognosen (Wetter, Belegung).',
		descriptionEn: 'Predictive control strategy: optimises control variables over a time horizon using forecasts (weather, occupancy).',
		areas: ['ga', 'hlk'],
		related: ['PID']
	},
	{
		short: 'IBN',
		long: 'Inbetriebnahme',
		description: 'Phase nach der Installation: Test, Einstellung, Übergabe an Betreiber.',
		descriptionEn: 'Phase after installation: testing, adjustment, handover to operator.',
		areas: ['ga', 'hlk'],
		related: ['SAT', 'FAT']
	},
	{
		short: 'FAT',
		long: 'Factory Acceptance Test',
		description: 'Werksabnahme — Tests in der Werkhalle vor Auslieferung.',
		descriptionEn: 'Factory Acceptance Test — tests at the factory before delivery.',
		areas: ['ga'],
		related: ['SAT', 'IBN']
	},
	{
		short: 'SAT',
		long: 'Site Acceptance Test',
		description: 'Vor-Ort-Abnahme nach Installation — abschliessende Funktionsprüfung.',
		descriptionEn: 'Site Acceptance Test after installation — final functional verification.',
		areas: ['ga'],
		related: ['FAT', 'IBN']
	},

	// ──────────────────────────────────────────────────────
	// Heizung & Hydraulik
	// ──────────────────────────────────────────────────────
	{
		short: 'HLK',
		long: 'Heizung, Lüftung, Klima',
		description: 'Sammelbegriff für die technische Gebäudeausrüstung in der Klimatisierung.',
		descriptionEn: 'General term for building services in climate control.',
		areas: ['hlk'],
		related: ['HLKSE', 'TGA', 'HVAC']
	},
	{
		short: 'HLKSE',
		long: 'Heizung, Lüftung, Klima, Sanitär, Elektro',
		description: 'CH-Fachbereichs-Gliederung für die Haustechnik.',
		descriptionEn: 'Swiss building services classification: Heating, Ventilation, AC, Plumbing, Electrical.',
		areas: ['hlk', 'sanitaer', 'elektro'],
		related: ['HLK', 'TGA']
	},
	{
		short: 'HVAC',
		long: 'Heating, Ventilation, Air Conditioning',
		description: 'Englische Entsprechung zu HLK.',
		descriptionEn: 'English equivalent of HLK.',
		areas: ['hlk'],
		related: ['HLK']
	},
	{
		short: 'TGA',
		long: 'Technische Gebäudeausrüstung',
		description: 'Sammelbegriff für alle technischen Anlagen in einem Gebäude.',
		descriptionEn: 'Collective term for all technical systems in a building.',
		areas: ['hlk', 'sanitaer', 'elektro', 'ga'],
		related: ['HLK', 'HLKSE', 'MEP']
	},
	{
		short: 'MEP',
		long: 'Mechanical, Electrical, Plumbing',
		description: 'Englisches Pendant zu TGA / HLKSE — international gebräuchlicher Sammelbegriff für Gebäudetechnik.',
		descriptionEn: 'English equivalent of TGA/HLKSE — internationally common term for building services.',
		areas: ['hlk', 'sanitaer', 'elektro', 'ga'],
		related: ['TGA', 'HLKSE']
	},
	{
		short: 'VL',
		long: 'Vorlauf',
		description: 'Wärmeleitung vom Wärmeerzeuger zum Verbraucher (warm).',
		descriptionEn: 'Flow pipe from heat generator to consumer (hot side).',
		areas: ['hlk'],
		related: ['RL']
	},
	{
		short: 'RL',
		long: 'Rücklauf',
		description: 'Wärmeleitung vom Verbraucher zurück zum Wärmeerzeuger (abgekühlt).',
		descriptionEn: 'Return pipe from consumer back to heat generator (cooled).',
		areas: ['hlk'],
		related: ['VL']
	},
	{
		short: 'ΔT',
		long: 'Temperature Difference',
		description: 'Spreizung zwischen Vor- und Rücklauf. Heizung typisch 10–20 K, Fernwärme oft 30–40 K.',
		descriptionEn: 'Spread between flow and return. Heating typically 10–20 K, district heating often 30–40 K.',
		areas: ['hlk'],
		related: ['VL', 'RL']
	},
	{
		short: 'HK',
		long: 'Heizkreis',
		description: 'Hydraulisch eigenständiger Heizkreislauf — meist mit eigener Pumpe und Mischer.',
		descriptionEn: 'Hydraulically independent heating circuit — usually with its own pump and mixer.',
		areas: ['hlk'],
		related: ['FBH']
	},
	{
		short: 'FBH',
		long: 'Fussbodenheizung',
		description: 'Flächenheizung mit niedriger Vorlauftemperatur (Auslegung 35/28 °C typisch).',
		descriptionEn: 'Underfloor heating with low flow temperature (design 35/28 °C typical).',
		areas: ['hlk'],
		related: ['HK', 'UFH']
	},
	{
		short: 'UFH',
		long: 'Underfloor Heating',
		description: 'Englisches Pendant zu Fussbodenheizung (FBH).',
		descriptionEn: 'English equivalent of underfloor heating (FBH).',
		areas: ['hlk'],
		related: ['FBH']
	},
	{
		short: 'WW',
		long: 'Warmwasser',
		description: 'Allgemeiner Begriff — in der Sanitärtechnik meist Trinkwarmwasser.',
		descriptionEn: 'General term — in sanitary engineering usually domestic hot water.',
		areas: ['hlk', 'sanitaer'],
		related: ['TWW', 'KW']
	},
	{
		short: 'TWW',
		long: 'Trinkwarmwasser',
		description: 'Erwärmtes Trinkwasser für Dusche, Bad, Küche. Legionellenschutz nötig (> 60 °C im Speicher).',
		descriptionEn: 'Heated drinking water for shower, bath, kitchen. Legionella protection required (> 60 °C in storage).',
		areas: ['sanitaer', 'hlk'],
		related: ['BWW', 'WW', 'DHW']
	},
	{
		short: 'DHW',
		long: 'Domestic Hot Water',
		description: 'Englisches Pendant zu Trinkwarmwasser (TWW).',
		descriptionEn: 'English equivalent of Trinkwarmwasser (TWW).',
		areas: ['sanitaer', 'hlk'],
		related: ['TWW']
	},
	{
		short: 'BWW',
		long: 'Brauchwarmwasser',
		description: 'Ältere Bezeichnung für TWW — heute eher Trinkwarmwasser verwendet.',
		descriptionEn: 'Older term for TWW — domestic hot water is now the preferred term.',
		areas: ['sanitaer'],
		related: ['TWW']
	},
	{
		short: 'KW',
		long: 'Kaltwasser',
		description: 'Trinkkaltwasser-Leitung.',
		descriptionEn: 'Cold water supply pipe.',
		areas: ['sanitaer'],
		related: ['WW']
	},
	{
		short: 'MAG',
		long: 'Membran-Ausdehnungsgefäss',
		description: 'Druckhaltung für geschlossene Heizungs-/Kühlsysteme. Auslegung nach SWKI 91-1.',
		descriptionEn: 'Pressure maintenance vessel for closed heating/cooling systems. Sizing per SWKI 91-1.',
		areas: ['hlk'],
		related: []
	},
	{
		short: 'WMZ',
		long: 'Wärmemengenzähler',
		description: 'Misst übergebene Wärmemenge aus Vorlauf-/Rücklauftemp und Volumenstrom.',
		descriptionEn: 'Measures transferred heat from flow/return temperature and volume flow.',
		areas: ['hlk'],
		related: ['EMS', 'KMZ']
	},
	{
		short: 'KMZ',
		long: 'Kältemengenzähler',
		description: 'Wie WMZ, aber für Kälteenergie.',
		descriptionEn: 'Like WMZ, but for cooling energy.',
		areas: ['hlk'],
		related: ['WMZ']
	},
	{
		short: 'WP',
		long: 'Wärmepumpe',
		description: 'Hebt Wärme von einem niedrigen auf ein höheres Temperaturniveau.',
		descriptionEn: 'Lifts heat from a low to a higher temperature level.',
		areas: ['hlk'],
		related: ['COP', 'JAZ', 'EWP', 'LWP']
	},
	{
		short: 'LWP',
		long: 'Luft-Wasser-Wärmepumpe',
		description: 'Wärmepumpe mit Aussenluft als Quelle. Günstig, aber niedriger COP bei Frost.',
		descriptionEn: 'Heat pump with outdoor air as source. Low cost, but lower COP at frost temperatures.',
		areas: ['hlk'],
		related: ['WP', 'EWP']
	},
	{
		short: 'EWP',
		long: 'Erdsonden-Wärmepumpe',
		description: 'Wärmepumpe mit Erdwärme als Quelle (Sonden 100–300 m tief). Hoher COP, höhere Investition.',
		descriptionEn: 'Heat pump with geothermal energy as source (probes 100–300 m deep). High COP, higher investment.',
		areas: ['hlk'],
		related: ['WP', 'LWP']
	},
	{
		short: 'COP',
		long: 'Coefficient of Performance',
		description: 'Momentane Leistungszahl einer Wärmepumpe: Q_nutz / P_el.',
		descriptionEn: 'Instantaneous performance factor of a heat pump: Q_useful / P_el.',
		areas: ['hlk'],
		related: ['WP', 'JAZ', 'SCOP']
	},
	{
		short: 'SCOP',
		long: 'Seasonal Coefficient of Performance',
		description: 'Saisonaler COP nach EN 14825 — berücksichtigt Teillast-Verhalten.',
		descriptionEn: 'Seasonal COP per EN 14825 — accounts for part-load behaviour.',
		areas: ['hlk', 'normen'],
		related: ['COP', 'JAZ']
	},
	{
		short: 'JAZ',
		long: 'Jahresarbeitszahl',
		description: 'Jahres-Mittel des COP. Realistische Bewertung einer Wärmepumpe.',
		descriptionEn: 'Annual average of COP. Realistic assessment of a heat pump over a full year.',
		areas: ['hlk'],
		related: ['COP', 'WP', 'SCOP']
	},
	{
		short: 'BHKW',
		long: 'Blockheizkraftwerk',
		description: 'Kraft-Wärme-Kopplung — erzeugt gleichzeitig Strom und Wärme.',
		descriptionEn: 'Combined heat and power — simultaneously generates electricity and heat.',
		areas: ['hlk'],
		related: ['KWK', 'CHP']
	},
	{
		short: 'KWK',
		long: 'Kraft-Wärme-Kopplung',
		description: 'Verfahrensprinzip BHKW. Wirkungsgrad gesamt 80–90 %.',
		descriptionEn: 'CHP operating principle. Overall efficiency 80–90 %.',
		areas: ['hlk'],
		related: ['BHKW', 'CHP']
	},
	{
		short: 'CHP',
		long: 'Combined Heat and Power',
		description: 'Englisch für KWK.',
		descriptionEn: 'English for KWK (Kraft-Wärme-Kopplung).',
		areas: ['hlk'],
		related: ['BHKW', 'KWK']
	},
	{
		short: 'HK-Charakteristik',
		long: 'Heizkennlinie / Heizkurve',
		description: 'Vorlauftemperatur als Funktion der Aussentemperatur. Mit Neigung und Niveau parametriert.',
		descriptionEn: 'Flow temperature as a function of outdoor temperature. Parameterised with slope and level offset.',
		areas: ['hlk'],
		related: ['VL'],
		wissenSlug: 'heizkurve'
	},
	{
		short: 'HG',
		long: 'Heizgrenze',
		description: 'Aussentemperatur, oberhalb der die Heizung abschaltet. Typisch 15–18 °C.',
		descriptionEn: 'Outdoor temperature above which heating switches off. Typically 15–18 °C.',
		areas: ['hlk'],
		related: ['HK-Charakteristik'],
		wissenSlug: 'heizkurve'
	},

	{
		short: 'ΔP',
		long: 'Pressure Difference',
		description: 'Druckdifferenz zwischen zwei Messpunkten [Pa oder bar]. Basis für Durchflussmessung und Ventilauslegung.',
		descriptionEn: 'Pressure difference between two measurement points [Pa or bar]. Basis for flow measurement and valve sizing.',
		areas: ['hlk'],
		related: ['ΔT', 'Kv', 'DN']
	},
	{
		short: 'DN',
		long: 'Diameter Nominal',
		description: 'Nennweite einer Rohrleitung. DN 25 ≈ 1". Bezeichnet die Rohrgrösse unabhängig von der Wanddicke.',
		descriptionEn: 'Nominal pipe diameter. DN 25 ≈ 1". Designates pipe size independently of wall thickness.',
		areas: ['hlk', 'sanitaer'],
		related: ['PN', 'Kv']
	},
	{
		short: 'PN',
		long: 'Pressure Nominal',
		description: 'Nenndruck einer Rohrleitung oder Armatur in bar. PN 16 = max. 16 bar Betriebsdruck.',
		descriptionEn: 'Nominal pressure of a pipe or fitting in bar. PN 16 = max. 16 bar operating pressure.',
		areas: ['hlk', 'sanitaer'],
		related: ['DN']
	},
	{
		short: 'Kv',
		long: 'Flow Coefficient (Kv)',
		description: 'Ventilkennwert: Volumenstrom [m³/h] bei 1 bar Druckabfall und Wasser (20 °C). Basis für Ventilauslegung.',
		descriptionEn: 'Valve flow coefficient: volume flow [m³/h] at 1 bar pressure drop with water (20 °C). Basis for valve sizing.',
		areas: ['hlk'],
		related: ['DN', 'ΔP'],
		wissenSlug: 'ventilautoritaet'
	},

	// ──────────────────────────────────────────────────────
	// Lüftung & Klima
	// ──────────────────────────────────────────────────────
	{
		short: 'RLT',
		long: 'Raumlufttechnik (Anlage)',
		description: 'Lüftungs-/Klimaanlage zur Konditionierung der Raumluft.',
		descriptionEn: 'Ventilation/air conditioning system for conditioning indoor air.',
		areas: ['hlk'],
		related: ['AHU', 'WRG', 'KWL']
	},
	{
		short: 'KWL',
		long: 'Kontrollierte Wohnraumlüftung',
		description: 'Dezentrale Lüftungsanlage mit WRG für Wohngebäude — typisch mit Gegen- oder Kreuzstromtauscher.',
		descriptionEn: 'Decentralised ventilation with HRV for residential buildings — typically with counter- or cross-flow heat exchanger.',
		areas: ['hlk'],
		related: ['RLT', 'WRG', 'ERV']
	},
	{
		short: 'ULK',
		long: 'Umluftkühlgeräte',
		description: 'Gerätetyp zur Raumkühlung via Umluftprinzip — Luft wird über einen Kaltwasserregister oder DX-Verdampfer umgewälzt.',
		descriptionEn: 'Room cooling devices using recirculation — air circulated over a chilled water coil or DX evaporator.',
		areas: ['hlk'],
		related: ['FCU', 'VRF']
	},
	{
		short: 'FCU',
		long: 'Fan Coil Unit',
		description: 'Gebläsekonvektor — Raumgerät mit Ventilator und Wasserregister (Heizen/Kühlen). Angeschlossen an CHW und HW.',
		descriptionEn: 'Room unit with fan and water coil for heating and cooling. Connected to chilled water (CHW) and hot water (HW).',
		areas: ['hlk'],
		related: ['ULK', 'CHW', 'VRF']
	},
	{
		short: 'SFP',
		long: 'Specific Fan Power',
		description: 'Spezifische Ventilatorleistung [W/(m³/h) oder W/(l/s)]. Effizienz-Kennzahl für RLT-Anlagen nach EN 13779 / SWKI.',
		descriptionEn: 'Specific fan power [W/(m³/h) or W/(l/s)]. Efficiency indicator for ventilation systems per EN 13779 / SWKI.',
		areas: ['hlk', 'normen'],
		related: ['AHU', 'RLT']
	},
	{
		short: 'AHU',
		long: 'Air Handling Unit',
		description: 'Englisch für RLT-Gerät — Filter, Ventilator, Wärmetauscher, Befeuchter.',
		descriptionEn: 'English for RLT unit — filter, fan, heat exchanger, humidifier.',
		areas: ['hlk'],
		related: ['RLT']
	},
	{
		short: 'WRG',
		long: 'Wärmerückgewinnung',
		description: 'Wärmeübertrag von Abluft auf Zuluft. Plattenwärmetauscher, Rotor, Kreislaufverbund.',
		descriptionEn: 'Heat transfer from exhaust air to supply air. Plate heat exchanger, rotor, run-around coil.',
		areas: ['hlk'],
		related: ['HRV', 'ERV']
	},
	{
		short: 'HRV',
		long: 'Heat Recovery Ventilation',
		description: 'Lüftung mit Wärmerückgewinnung (nur sensibel — Temperatur).',
		descriptionEn: 'Ventilation with heat recovery (sensible only — temperature).',
		areas: ['hlk'],
		related: ['ERV', 'WRG']
	},
	{
		short: 'ERV',
		long: 'Energy Recovery Ventilation',
		description: 'Lüftung mit Enthalpierückgewinnung (Temperatur + Feuchte) — Rotor oder Membran.',
		descriptionEn: 'Ventilation with enthalpy recovery (temperature + humidity) — rotor or membrane.',
		areas: ['hlk'],
		related: ['HRV', 'WRG']
	},
	{
		short: 'VAV',
		long: 'Variable Air Volume',
		description: 'Variable Luftmengenregelung — pro Raum/Zone bedarfsabhängig.',
		descriptionEn: 'Variable air volume control — per room/zone on demand.',
		areas: ['hlk'],
		related: ['CAV', 'DCV']
	},
	{
		short: 'CAV',
		long: 'Constant Air Volume',
		description: 'Konstanter Luftvolumenstrom — einfacher, weniger effizient als VAV.',
		descriptionEn: 'Constant air volume — simpler, less efficient than VAV.',
		areas: ['hlk'],
		related: ['VAV']
	},
	{
		short: 'DCV',
		long: 'Demand Controlled Ventilation',
		description: 'Bedarfsgeführte Lüftung — Regelung nach CO₂, VOC oder Anwesenheit.',
		descriptionEn: 'Demand-controlled ventilation — control based on CO₂, VOC or occupancy.',
		areas: ['hlk', 'ga'],
		related: ['VAV', 'CO₂']
	},
	{
		short: 'IDA',
		long: 'Indoor Air',
		description: 'Raumluft. Kategorien IDA 1–4 nach EN 13779/16798.',
		descriptionEn: 'Indoor air. Categories IDA 1–4 per EN 13779/16798.',
		areas: ['hlk', 'normen'],
		related: ['ODA', 'EHA', 'SUP', 'ETA']
	},
	{
		short: 'ODA',
		long: 'Outdoor Air',
		description: 'Aussenluft. Kategorien ODA 1–5 nach Verschmutzungsgrad.',
		descriptionEn: 'Outdoor air. Categories ODA 1–5 by pollution level.',
		areas: ['hlk', 'normen'],
		related: ['IDA', 'SUP']
	},
	{
		short: 'SUP',
		long: 'Supply Air',
		description: 'Zuluft — konditionierte, ins Gebäude geblasene Luft.',
		descriptionEn: 'Supply air — conditioned air blown into the building.',
		areas: ['hlk'],
		related: ['ETA', 'EHA']
	},
	{
		short: 'ETA',
		long: 'Extract Air',
		description: 'Abluft — aus dem Raum abgesaugte verbrauchte Luft.',
		descriptionEn: 'Extract air — spent air extracted from the room.',
		areas: ['hlk'],
		related: ['SUP', 'EHA']
	},
	{
		short: 'EHA',
		long: 'Exhaust Air',
		description: 'Fortluft — nach WRG ins Freie geblasen.',
		descriptionEn: 'Exhaust air — discharged to outside after HRV.',
		areas: ['hlk'],
		related: ['ETA', 'SUP']
	},
	{
		short: 'RCA',
		long: 'Recirculation Air',
		description: 'Umluft / Zirkulationsluft im Gerät.',
		descriptionEn: 'Recirculation air within the ventilation unit.',
		areas: ['hlk'],
		related: ['SUP']
	},
	{
		short: 'ePM1',
		long: 'Filter ePM1 (ISO 16890)',
		description: 'Filterklasse für Feinstaub ≤ 1 µm. Ersetzt frühere F-Klassen (F7/F8/F9).',
		descriptionEn: 'Filter class for fine dust ≤ 1 µm. Replaces earlier F classes (F7/F8/F9).',
		areas: ['hlk', 'normen'],
		related: ['ePM2.5', 'ePM10']
	},
	{
		short: 'ePM2.5',
		long: 'Filter ePM2.5 (ISO 16890)',
		description: 'Filterklasse für Feinstaub ≤ 2,5 µm nach ISO 16890.',
		descriptionEn: 'Filter class for fine dust ≤ 2.5 µm per ISO 16890.',
		areas: ['hlk', 'normen'],
		related: ['ePM1', 'ePM10']
	},
	{
		short: 'ePM10',
		long: 'Filter ePM10 (ISO 16890)',
		description: 'Filterklasse für Feinstaub ≤ 10 µm nach ISO 16890. Entspricht ehemaligen G-Klassen.',
		descriptionEn: 'Filter class for fine dust ≤ 10 µm per ISO 16890. Replaces former G classes.',
		areas: ['hlk', 'normen'],
		related: ['ePM1', 'ePM2.5']
	},
	{
		short: 'F7',
		long: 'Filter Class F7 (old EN 779)',
		description: 'Alte Filterklasse, heute typischerweise ePM1 50 % oder ePM2.5 65 %.',
		descriptionEn: 'Old filter class, today typically ePM1 50 % or ePM2.5 65 %.',
		areas: ['hlk'],
		related: ['ePM1']
	},
	{
		short: 'HEPA',
		long: 'High Efficiency Particulate Air Filter',
		description: 'Schwebstofffilter ab H13. Für Reinräume und kritische Bereiche.',
		descriptionEn: 'High-efficiency particulate filter from H13 upwards. For clean rooms and critical areas.',
		areas: ['hlk'],
		related: ['ePM1']
	},

	// ──────────────────────────────────────────────────────
	// Kälte
	// ──────────────────────────────────────────────────────
	{
		short: 'EER',
		long: 'Energy Efficiency Ratio',
		description: 'Wirkungsgrad einer Kältemaschine: Q_kälte / P_el. Pendant zum COP.',
		descriptionEn: 'Efficiency ratio of a chiller: Q_cold / P_el. Equivalent to COP for cooling.',
		areas: ['hlk'],
		related: ['SEER', 'COP']
	},
	{
		short: 'SEER',
		long: 'Seasonal Energy Efficiency Ratio',
		description: 'Saisonaler EER nach EN 14825.',
		descriptionEn: 'Seasonal EER per EN 14825.',
		areas: ['hlk', 'normen'],
		related: ['EER', 'SCOP']
	},
	{
		short: 'VRF',
		long: 'Variable Refrigerant Flow',
		description: 'Multi-Split-Kältesystem mit variablem Kältemittelfluss — eine Aussen-, mehrere Inneneinheiten.',
		descriptionEn: 'Multi-split refrigerant system with variable flow — one outdoor, multiple indoor units.',
		areas: ['hlk'],
		related: ['DX']
	},
	{
		short: 'DX',
		long: 'Direct Expansion',
		description: 'Direktverdampfung — Kältemittel verdampft im Wärmetauscher der Inneneinheit.',
		descriptionEn: 'Direct expansion — refrigerant evaporates in the indoor unit heat exchanger.',
		areas: ['hlk'],
		related: ['VRF', 'TXV']
	},
	{
		short: 'TXV',
		long: 'Thermostatic Expansion Valve',
		description: 'Mechanisches Expansionsventil — Drosselt Kältemittel temperaturgesteuert.',
		descriptionEn: 'Mechanical expansion valve — throttles refrigerant in a temperature-controlled manner.',
		areas: ['hlk'],
		related: ['EEV', 'DX']
	},
	{
		short: 'EEV',
		long: 'Electronic Expansion Valve',
		description: 'Elektronisch geregeltes Expansionsventil — genauer als TXV.',
		descriptionEn: 'Electronically controlled expansion valve — more precise than TXV.',
		areas: ['hlk'],
		related: ['TXV']
	},
	{
		short: 'GWP',
		long: 'Global Warming Potential',
		description: 'Treibhauspotenzial relativ zu CO₂. R410A: 2088, R32: 675, R290 (Propan): 3.',
		descriptionEn: 'Greenhouse warming potential relative to CO₂. R410A: 2088, R32: 675, R290 (propane): 3.',
		areas: ['hlk', 'normen'],
		related: ['ODP']
	},
	{
		short: 'ODP',
		long: 'Ozone Depletion Potential',
		description: 'Ozonschicht-Schädigungspotenzial. Modernes Kältemittel ODP = 0.',
		descriptionEn: 'Ozone depletion potential. Modern refrigerants have ODP = 0.',
		areas: ['hlk', 'normen'],
		related: ['GWP']
	},
	{
		short: 'R32',
		long: 'Refrigerant R32 (Difluoromethane)',
		description: 'Standard-Kältemittel für Splitgeräte. GWP 675, mild brennbar (A2L).',
		descriptionEn: 'Standard refrigerant for split units. GWP 675, mildly flammable (A2L).',
		areas: ['hlk'],
		related: ['R290', 'GWP']
	},
	{
		short: 'R290',
		long: 'Refrigerant R290 (Propane)',
		description: 'Natürliches Kältemittel. GWP 3, brennbar (A3). Hohe Effizienz, kleine Füllmengen.',
		descriptionEn: 'Natural refrigerant. GWP 3, flammable (A3). High efficiency, small charge.',
		areas: ['hlk'],
		related: ['R32', 'GWP']
	},
	{
		short: 'R744',
		long: 'Refrigerant R744 (CO₂)',
		description: 'Natürliches Kältemittel CO₂. GWP 1, transkritischer Prozess. Häufig in Wärmepumpen + Gewerbekälte.',
		descriptionEn: 'Natural refrigerant CO₂. GWP 1, transcritical process. Common in heat pumps and commercial refrigeration.',
		areas: ['hlk'],
		related: ['GWP']
	},

	{
		short: 'CHW',
		long: 'Chilled Water',
		description: 'Kaltwasser-Kreislauf einer Kältemaschine. Typische Auslegung 6/12 °C. Verteilt Kälteenergie an FCU, Kühler, Klimageräte.',
		descriptionEn: 'Chilled water circuit of a chiller. Typically designed at 6/12 °C. Distributes cooling energy to FCUs, coolers, and air conditioning units.',
		areas: ['hlk'],
		related: ['FCU', 'EER', 'ΔT']
	},

	// ──────────────────────────────────────────────────────
	// Protokolle & Kommunikation
	// ──────────────────────────────────────────────────────
	{
		short: 'KNX',
		long: 'KNX Standard (ISO/IEC 14543-3)',
		description: 'Gebäudeautomations-Bussystem nach ISO/IEC 14543-3. Standard in der Wohngebäudeautomation.',
		descriptionEn: 'Building automation bus system per ISO/IEC 14543-3. Standard in residential building automation.',
		areas: ['ga', 'elektro'],
		related: ['DALI', 'EIB']
	},
	{
		short: 'EIB',
		long: 'European Installation Bus',
		description: 'Vorgängerprotokoll von KNX, weitgehend kompatibel.',
		descriptionEn: 'Predecessor protocol to KNX, largely compatible.',
		areas: ['ga', 'elektro'],
		related: ['KNX']
	},
	{
		short: 'DALI',
		long: 'Digital Addressable Lighting Interface',
		description: 'Protokoll für Beleuchtungssteuerung. Bis 64 Geräte pro Linie.',
		descriptionEn: 'Protocol for lighting control. Up to 64 devices per line.',
		areas: ['ga', 'elektro'],
		related: ['KNX', 'DALI-2']
	},
	{
		short: 'DALI-2',
		long: 'DALI Version 2 (IEC 62386)',
		description: 'Erweiterung von DALI um Notlicht, Sensoren, Tasterschnittstellen. Zertifizierungspflicht.',
		descriptionEn: 'Extension of DALI adding emergency lighting, sensors, push button interfaces. Certification required.',
		areas: ['ga', 'elektro', 'normen'],
		related: ['DALI']
	},
	{
		short: 'BACnet',
		long: 'Building Automation and Control Network',
		description: 'Hersteller-übergreifendes GA-Protokoll. Varianten: BACnet/IP, MS/TP (RS-485).',
		descriptionEn: 'Multi-vendor BA protocol. Variants: BACnet/IP, MS/TP (RS-485).',
		areas: ['ga', 'it'],
		related: ['Modbus', 'KNX'],
		wissenSlug: 'modbus'
	},
	{
		short: 'Modbus',
		long: 'Modbus RTU / TCP',
		description: 'Industrieprotokoll. RTU über RS-485, TCP über Ethernet. Sehr weit verbreitet.',
		descriptionEn: 'Industrial protocol. RTU via RS-485, TCP via Ethernet. Widely used.',
		areas: ['ga', 'it'],
		related: ['BACnet', 'M-Bus'],
		wissenSlug: 'modbus'
	},
	{
		short: 'M-Bus',
		long: 'Meter-Bus',
		description: 'Bus für Verbrauchszähler nach EN 13757. Energie- und Wasserzähler-Auslesung.',
		descriptionEn: 'Bus for utility meters per EN 13757. Energy and water meter readout.',
		areas: ['ga', 'sanitaer'],
		related: ['Modbus', 'wM-Bus']
	},
	{
		short: 'wM-Bus',
		long: 'Wireless M-Bus',
		description: 'Funk-M-Bus für Smartmeter, oft 868 MHz. Modi T1/T2/C1.',
		descriptionEn: 'Wireless M-Bus for smart meters, often 868 MHz. Modes T1/T2/C1.',
		areas: ['ga', 'it'],
		related: ['M-Bus']
	},
	{
		short: 'MQTT',
		long: 'Message Queuing Telemetry Transport',
		description: 'Publish/Subscribe-Protokoll für IoT. In der GA für leichte Sensor-Anbindungen.',
		descriptionEn: 'Publish/subscribe protocol for IoT. Used in BA for lightweight sensor connections.',
		areas: ['ga', 'it'],
		related: ['BACnet', 'OPC UA']
	},
	{
		short: 'LON',
		long: 'LonWorks / LonTalk',
		description: 'GA-Protokoll von Echelon. In der Schweiz vor allem Lüftung/Klima ab den 90ern.',
		descriptionEn: 'BA protocol by Echelon. In Switzerland mainly ventilation/HVAC systems since the 1990s.',
		areas: ['ga'],
		related: ['BACnet']
	},
	{
		short: 'LoRa',
		long: 'Long Range (Radio)',
		description: 'Funktechnologie für IoT — geringe Datenrate, sehr grosse Reichweite (km).',
		descriptionEn: 'Radio technology for IoT — low data rate, very long range (km).',
		areas: ['ga', 'it'],
		related: ['LoRaWAN', 'Zigbee']
	},
	{
		short: 'LoRaWAN',
		long: 'LoRa Wide Area Network',
		description: 'Netzwerkprotokoll auf LoRa-Basis — Sensor → Gateway → Cloud.',
		descriptionEn: 'Network protocol on LoRa basis — sensor → gateway → cloud.',
		areas: ['ga', 'it'],
		related: ['LoRa']
	},
	{
		short: 'Zigbee',
		long: 'Zigbee (IEEE 802.15.4)',
		description: 'Mesh-Funknetzwerk im 2.4-GHz-Band. Smart Home, kleine Sensoren.',
		descriptionEn: 'Mesh radio network in 2.4 GHz band. Smart home, small sensors.',
		areas: ['ga', 'it'],
		related: ['Z-Wave', 'EnOcean']
	},
	{
		short: 'Z-Wave',
		long: 'Z-Wave Radio Protocol',
		description: 'Mesh-Funk im 868-MHz-Band (EU). Smart Home, weniger Geräte als Zigbee.',
		descriptionEn: 'Mesh radio in 868 MHz band (EU). Smart home, fewer devices than Zigbee.',
		areas: ['ga', 'it'],
		related: ['Zigbee']
	},
	{
		short: 'EnOcean',
		long: 'EnOcean Radio Protocol',
		description: 'Energie-Harvesting-Funk — batterielose Sensoren/Taster. 868 MHz.',
		descriptionEn: 'Energy harvesting radio — batteryless sensors/push buttons. 868 MHz.',
		areas: ['ga'],
		related: ['Zigbee']
	},
	{
		short: 'BLE',
		long: 'Bluetooth Low Energy',
		description: 'Stromsparende Bluetooth-Variante. Beacons, Smart-Locks, Konfiguration.',
		descriptionEn: 'Power-saving Bluetooth variant. Beacons, smart locks, configuration.',
		areas: ['ga', 'it'],
		related: ['Zigbee']
	},
	{
		short: 'PoE',
		long: 'Power over Ethernet',
		description: 'Stromversorgung über Ethernet-Kabel. Standards: 802.3af (15 W), at (30 W), bt (90 W).',
		descriptionEn: 'Power over Ethernet cable. Standards: 802.3af (15 W), at (30 W), bt (90 W).',
		areas: ['it', 'ga'],
		related: ['LAN', 'TCP/IP']
	},
	{
		short: 'TCP/IP',
		long: 'Transmission Control Protocol / Internet Protocol',
		description: 'Standard-Netzwerkprotokollstapel — Grundlage von Ethernet/Internet.',
		descriptionEn: 'Standard network protocol stack — foundation of Ethernet/Internet.',
		areas: ['it'],
		related: ['UDP', 'IP']
	},
	{
		short: 'UDP',
		long: 'User Datagram Protocol',
		description: 'Verbindungsloser Transport — schneller als TCP, aber keine Garantien. Für Streaming, BACnet/IP.',
		descriptionEn: 'Connectionless transport — faster than TCP but no guarantees. For streaming, BACnet/IP.',
		areas: ['it'],
		related: ['TCP/IP', 'LAN']
	},
	{
		short: 'LAN',
		long: 'Local Area Network',
		description: 'Lokales Netzwerk innerhalb eines Gebäudes oder Standorts. Basis für GA-Kommunikation via BACnet/IP, Modbus TCP etc.',
		descriptionEn: 'Local area network within a building or site. Basis for BA communication via BACnet/IP, Modbus TCP etc.',
		areas: ['it', 'ga'],
		related: ['VLAN', 'VPN', 'TCP/IP']
	},
	{
		short: 'DNS',
		long: 'Domain Name System',
		description: 'Übersetzt Hostnamen in IP-Adressen. Wichtig für Cloud-Anbindungen, Remote-Zugriff und MQTT-Broker.',
		descriptionEn: 'Translates hostnames into IP addresses. Important for cloud connections, remote access and MQTT brokers.',
		areas: ['it'],
		related: ['DHCP', 'NTP']
	},
	{
		short: 'DHCP',
		long: 'Dynamic Host Configuration Protocol',
		description: 'Automatische IP-Vergabe im Netzwerk.',
		descriptionEn: 'Automatic IP address assignment in the network.',
		areas: ['it'],
		related: ['DNS', 'NTP']
	},
	{
		short: 'NTP',
		long: 'Network Time Protocol',
		description: 'Zeitsynchronisation übers Netz — wichtig für Logging und Authentifizierung.',
		descriptionEn: 'Time synchronisation over the network — important for logging and authentication.',
		areas: ['it', 'ga'],
		related: ['DHCP']
	},
	{
		short: 'SNMP',
		long: 'Simple Network Management Protocol',
		description: 'Netzwerk-Geräte-Überwachung — Switches, USV, Server.',
		descriptionEn: 'Network device monitoring — switches, UPS, servers.',
		areas: ['it'],
		related: []
	},
	{
		short: 'VLAN',
		long: 'Virtual LAN',
		description: 'Logische Netzwerk-Segmentierung. GA-Netz oft eigenes VLAN aus Security-Gründen.',
		descriptionEn: 'Logical network segmentation. BA network often on its own VLAN for security.',
		areas: ['it'],
		related: ['VPN']
	},
	{
		short: 'VPN',
		long: 'Virtual Private Network',
		description: 'Verschlüsselter Tunnel — Fernzugriff auf GA-Netze.',
		descriptionEn: 'Encrypted tunnel — remote access to BA networks.',
		areas: ['it'],
		related: ['TLS']
	},
	{
		short: 'TLS',
		long: 'Transport Layer Security',
		description: 'Verschlüsselungsschicht (HTTPS, sichere Verbindungen). Vormals SSL.',
		descriptionEn: 'Encryption layer (HTTPS, secure connections). Formerly SSL.',
		areas: ['it'],
		related: ['VPN']
	},
	{
		short: 'API',
		long: 'Application Programming Interface',
		description: 'Programmierschnittstelle — z.B. REST-API einer GLT zur Anbindung Drittsysteme.',
		descriptionEn: 'Programming interface — e.g. REST API of a BMS for third-party system integration.',
		areas: ['it'],
		related: ['REST', 'JSON']
	},
	{
		short: 'REST',
		long: 'Representational State Transfer',
		description: 'Architekturstil für Web-APIs — HTTP-basiert, ressourcenorientiert.',
		descriptionEn: 'Architectural style for web APIs — HTTP-based, resource-oriented.',
		areas: ['it'],
		related: ['API', 'JSON']
	},
	{
		short: 'JSON',
		long: 'JavaScript Object Notation',
		description: 'Datenaustausch-Format für APIs. Klartext, gut lesbar.',
		descriptionEn: 'Data exchange format for APIs. Plain text, easy to read.',
		areas: ['it'],
		related: ['REST']
	},
	{
		short: 'IoT',
		long: 'Internet of Things',
		description: 'Vernetzung physischer Geräte mit dem Internet. In der GA: Smart Meter, Sensoren, Gateways, Fernzugriff.',
		descriptionEn: 'Networking of physical devices with the internet. In BA: smart meters, sensors, gateways, remote access.',
		areas: ['it', 'ga'],
		related: ['MQTT', 'LoRaWAN', 'OT']
	},
	{
		short: 'OT',
		long: 'Operational Technology',
		description: 'Hard- und Software zur Steuerung physischer Prozesse (Anlagen, Gebäude). Abgrenzung zur IT — sicherheitskritisch.',
		descriptionEn: 'Hardware and software for controlling physical processes (plant, buildings). Distinct from IT — security-critical.',
		areas: ['ga', 'it'],
		related: ['IoT', 'SCADA', 'DDC']
	},
	{
		short: 'RTU',
		long: 'Remote Terminal Unit',
		description: 'Feldgerät zur Datenerfassung und Steuerung — kommuniziert über Modbus oder SCADA mit dem Leitsystem.',
		descriptionEn: 'Field device for data acquisition and control — communicates with control system via Modbus or SCADA.',
		areas: ['ga', 'it'],
		related: ['SCADA', 'Modbus', 'DDC']
	},
	{
		short: 'BIM',
		long: 'Building Information Modelling',
		description: 'Digitales Gebäudemodell mit Bau-, Technik- und Betriebsdaten. Basis für Planung, IBN und CAFM.',
		descriptionEn: 'Digital building model with construction, technical and operational data. Basis for planning, commissioning and CAFM.',
		areas: ['ga', 'normen'],
		related: ['IFC', 'CAFM']
	},
	{
		short: 'IFC',
		long: 'Industry Foundation Classes',
		description: 'Offenes BIM-Dateiformat nach ISO 16739. Ermöglicht Datenaustausch zwischen verschiedenen Planungssoftware.',
		descriptionEn: 'Open BIM file format per ISO 16739. Enables data exchange between different planning software.',
		areas: ['ga', 'normen'],
		related: ['BIM']
	},
	{
		short: 'CAFM',
		long: 'Computer Aided Facility Management',
		description: 'Software zur Verwaltung von Gebäuden, Flächen, Anlagen und Wartungsaufgaben.',
		descriptionEn: 'Software for managing buildings, floor areas, systems and maintenance tasks.',
		areas: ['ga'],
		related: ['BIM', 'GLT']
	},
	{
		short: 'IEC 61850',
		long: 'Schaltanlagen-Kommunikationsstandard',
		description: 'Norm für Schutz- und Steuerungssysteme — Trafostationen, Mittelspannung.',
		descriptionEn: 'Standard for switchgear communication — substations, medium voltage.',
		areas: ['elektro', 'normen'],
		related: []
	},

	// ──────────────────────────────────────────────────────
	// Sensoren & Signale
	// ──────────────────────────────────────────────────────
	{
		short: 'NTC',
		long: 'Negative Temperature Coefficient',
		description: 'Heissleiter — Widerstand sinkt bei steigender Temperatur. Häufiger Temperaturfühler.',
		descriptionEn: 'Thermistor — resistance decreases with rising temperature. Common temperature sensor.',
		areas: ['hlk', 'elektro'],
		related: ['PTC', 'Pt100']
	},
	{
		short: 'PTC',
		long: 'Positive Temperature Coefficient',
		description: 'Kaltleiter — Widerstand steigt bei steigender Temperatur. Motor-Schutz, Heizelemente.',
		descriptionEn: 'PTC thermistor — resistance increases with rising temperature. Motor protection, heating elements.',
		areas: ['elektro'],
		related: ['NTC']
	},
	{
		short: 'Pt100',
		long: 'Platinum Resistance 100 Ω at 0 °C',
		description: 'Präziser Temperaturfühler nach EN 60751. Linearer als NTC, teurer.',
		descriptionEn: 'Precision temperature sensor per EN 60751. More linear than NTC, more expensive.',
		areas: ['hlk', 'elektro'],
		related: ['NTC', 'Pt1000']
	},
	{
		short: 'Pt1000',
		long: 'Platinum Resistance 1000 Ω at 0 °C',
		description: 'Wie Pt100 aber mit 10× höherem Widerstand → weniger Leitungsfehler-Einfluss.',
		descriptionEn: 'Like Pt100 but with 10× higher resistance → less influence from line resistance.',
		areas: ['hlk', 'elektro'],
		related: ['Pt100', 'NTC']
	},
	{
		short: 'CO₂',
		long: 'Carbon Dioxide (CO₂)',
		description: 'Luftqualitäts-Sensor — Indikator für Belegung. EN 16798: < 800 ppm Kat. II.',
		descriptionEn: 'Air quality sensor — indicator for occupancy. EN 16798: < 800 ppm Cat. II.',
		areas: ['hlk', 'ga'],
		related: ['VOC', 'DCV']
	},
	{
		short: 'VOC',
		long: 'Volatile Organic Compounds',
		description: 'Flüchtige organische Verbindungen — Luftqualitäts-Indikator (Geruchsstoffe).',
		descriptionEn: 'Volatile Organic Compounds — air quality indicator (odour substances).',
		areas: ['hlk', 'ga'],
		related: ['CO₂']
	},
	{
		short: 'RH',
		long: 'Relative Humidity',
		description: 'Relative Luftfeuchtigkeit in %. Behaglich: 30–60 %.',
		descriptionEn: 'Relative humidity in %. Comfortable range: 30–60 %.',
		areas: ['hlk'],
		related: ['VOC']
	},
	{
		short: 'PIR',
		long: 'Passive Infrared',
		description: 'Passiv-Infrarot-Bewegungsmelder — detektiert Wärmestrahlung von Personen.',
		descriptionEn: 'Passive infrared motion detector — detects thermal radiation from persons.',
		areas: ['ga', 'elektro'],
		related: []
	},
	{
		short: '0–10 V',
		long: 'Analogue Control Signal 0–10 V',
		description: 'Standard-Stellsignal für Ventilatoren, Regelventile, Dimmer. Auch 2–10 V (Drahtbruchüberwachung).',
		descriptionEn: 'Standard control signal for fans, control valves, dimmers. Also 2–10 V (wire break monitoring).',
		areas: ['elektro', 'hlk'],
		related: ['4–20 mA', 'PWM']
	},
	{
		short: '4–20 mA',
		long: 'Analogue Current Signal 4–20 mA',
		description: 'Industriestandard für Prozesssignale. Robust gegen Leitungslänge und Störungen.',
		descriptionEn: 'Industrial standard for process signals. Robust against line length and interference.',
		areas: ['elektro', 'hlk'],
		related: ['0–10 V']
	},
	{
		short: 'PWM',
		long: 'Pulse Width Modulation',
		description: 'Stellsignal: Tastverhältnis variiert. Für EC-Motoren, LED-Dimmung, kleine Aktoren.',
		descriptionEn: 'Control signal: duty cycle varies. For EC motors, LED dimming, small actuators.',
		areas: ['elektro', 'ga'],
		related: ['FU', '0–10 V']
	},
	{
		short: 'DI',
		long: 'Digital Input',
		description: 'Digitaler Eingang — Schaltzustand (Ein/Aus).',
		descriptionEn: 'Digital input — switching state (on/off).',
		areas: ['ga', 'elektro'],
		related: ['DO', 'AI', 'AO']
	},
	{
		short: 'DO',
		long: 'Digital Output',
		description: 'Digitaler Ausgang — Relais, Schalt-Stellbefehl.',
		descriptionEn: 'Digital output — relay, switching command.',
		areas: ['ga', 'elektro'],
		related: ['DI', 'AI', 'AO']
	},
	{
		short: 'AI',
		long: 'Analog Input',
		description: 'Analoger Eingang — Pt1000, 0–10 V, 4–20 mA.',
		descriptionEn: 'Analogue input — Pt1000, 0–10 V, 4–20 mA.',
		areas: ['ga', 'elektro'],
		related: ['AO', 'DI', 'DO']
	},
	{
		short: 'AO',
		long: 'Analog Output',
		description: 'Analoger Ausgang — Stellsignal an Ventil, FU, etc.',
		descriptionEn: 'Analogue output — control signal to valve, VFD, etc.',
		areas: ['ga', 'elektro'],
		related: ['AI', 'DI', 'DO']
	},

	// ──────────────────────────────────────────────────────
	// Antriebe & Elektro
	// ──────────────────────────────────────────────────────
	{
		short: 'FU',
		long: 'Frequenzumrichter',
		description: 'Drehzahlregelung für Drehstrommotoren. Steuersignal meist 0–10 V oder Modbus.',
		descriptionEn: 'Speed control for three-phase motors. Control signal typically 0–10 V or Modbus.',
		areas: ['elektro', 'hlk'],
		related: ['VFD', 'EC-Motor']
	},
	{
		short: 'VFD',
		long: 'Variable Frequency Drive',
		description: 'Englisch für FU.',
		descriptionEn: 'English for FU (Frequenzumrichter — variable frequency drive).',
		areas: ['elektro'],
		related: ['FU']
	},
	{
		short: 'EC-Motor',
		long: 'Electronically Commutated Motor',
		description: 'Bürstenloser Gleichstrommotor mit Elektronik. Sehr effizient, drehzahlsteuerbar.',
		descriptionEn: 'Brushless DC motor with integrated electronics. Very efficient, speed-controllable.',
		areas: ['elektro', 'hlk'],
		related: ['FU', 'IE5']
	},
	{
		short: 'IE3',
		long: 'Motor Efficiency Class IE3 (IEC 60034-30)',
		description: 'Premium Efficiency. Mindeststandard für viele Motoren in der EU.',
		descriptionEn: 'Premium Efficiency. Minimum standard for many motors in the EU.',
		areas: ['elektro', 'normen'],
		related: ['IE4', 'IE5']
	},
	{
		short: 'IE4',
		long: 'Motor Efficiency Class IE4',
		description: 'Super Premium Efficiency. Ab 2027 verbindlich für Motoren ≥ 75 kW.',
		descriptionEn: 'Super Premium Efficiency. Mandatory from 2027 for motors ≥ 75 kW.',
		areas: ['elektro', 'normen'],
		related: ['IE3', 'IE5']
	},
	{
		short: 'IE5',
		long: 'Motor Efficiency Class IE5',
		description: 'Ultra Premium Efficiency — meist nur mit EC- oder Synchron-Reluktanzmotoren.',
		descriptionEn: 'Ultra Premium Efficiency — usually only achievable with EC or synchronous reluctance motors.',
		areas: ['elektro'],
		related: ['IE4', 'EC-Motor']
	},
	{
		short: 'FI',
		long: 'Fehlerstrom-Schutzschalter (RCD)',
		description: 'Schutzschalter gegen Erdfehler. Auslösestrom typ. 30 mA für Personenschutz.',
		descriptionEn: 'Residual current protection device. Trip current typically 30 mA for personal protection.',
		areas: ['elektro'],
		related: ['LS', 'RCBO']
	},
	{
		short: 'RCD',
		long: 'Residual Current Device',
		description: 'Englisch für FI-Schalter.',
		descriptionEn: 'English for FI-Schalter (residual current device).',
		areas: ['elektro'],
		related: ['FI']
	},
	{
		short: 'LS',
		long: 'Leitungsschutzschalter',
		description: 'Überstromschutz für Stromkreise. Charakteristik B / C / D.',
		descriptionEn: 'Overcurrent protection for circuits. Characteristic B / C / D.',
		areas: ['elektro'],
		related: ['FI', 'RCBO', 'MCB']
	},
	{
		short: 'MCB',
		long: 'Miniature Circuit Breaker',
		description: 'Englisches Pendant zu Leitungsschutzschalter (LS).',
		descriptionEn: 'English equivalent of Leitungsschutzschalter (LS).',
		areas: ['elektro'],
		related: ['LS', 'RCBO']
	},
	{
		short: 'RCBO',
		long: 'Residual Current Breaker with Overcurrent',
		description: 'Kombi FI + LS in einem Gerät.',
		descriptionEn: 'Combined RCD + MCB in one device.',
		areas: ['elektro'],
		related: ['FI', 'LS']
	},
	{
		short: 'PELV',
		long: 'Protective Extra Low Voltage',
		description: 'Schutzkleinspannung ≤ 25 V AC / 60 V DC mit Schutzerde. Typisch für GA-Steuerstromkreise.',
		descriptionEn: 'Protective extra low voltage ≤ 25 V AC / 60 V DC with protective earth. Typical for BA control circuits.',
		areas: ['elektro'],
		related: ['SELV', 'NIN']
	},
	{
		short: 'SELV',
		long: 'Safety Extra Low Voltage',
		description: 'Sicherheitskleinspannung ≤ 25 V AC / 60 V DC ohne Schutzerde. Elektrisch getrennt vom Netz.',
		descriptionEn: 'Safety extra low voltage ≤ 25 V AC / 60 V DC without protective earth. Electrically isolated from mains.',
		areas: ['elektro'],
		related: ['PELV', 'NIN']
	},
	{
		short: 'LDR',
		long: 'Light Dependent Resistor',
		description: 'Fotowiderstand — elektrischer Widerstand sinkt bei steigender Helligkeit. Einfacher analoger Helligkeitssensor.',
		descriptionEn: 'Photoresistor — electrical resistance decreases with increasing light intensity. Simple analogue light sensor.',
		areas: ['elektro', 'ga'],
		related: ['PIR']
	},
	{
		short: 'USV',
		long: 'Unterbrechungsfreie Stromversorgung',
		description: 'Akku-gepuffert, überbrückt Netzausfälle. Wichtig für GA-Server, Sicherheitsanlagen.',
		descriptionEn: 'Battery-buffered, bridges power failures. Important for BA servers, safety systems.',
		areas: ['elektro', 'it'],
		related: ['UPS']
	},
	{
		short: 'UPS',
		long: 'Uninterruptible Power Supply',
		description: 'Englisches Pendant zu USV.',
		descriptionEn: 'English equivalent of USV (Unterbrechungsfreie Stromversorgung).',
		areas: ['elektro', 'it'],
		related: ['USV']
	},
	{
		short: 'NIN',
		long: 'Niederspannungs-Installations-Norm',
		description: 'Schweizer Norm SEV 1000 — verbindlich für Installationen.',
		descriptionEn: 'Swiss installation standard SEV 1000 — mandatory for electrical installations.',
		areas: ['elektro', 'normen'],
		related: ['SEV']
	},
	{
		short: 'IP-Schutz',
		long: 'Ingress Protection (IP-Code)',
		description: 'Schutzart nach EN 60529. Z.B. IP54 = Spritzwasser, IP65 = Strahlwasser, IP67 = Untertauchen.',
		descriptionEn: 'Protection class per EN 60529. E.g. IP54 = splash-proof, IP65 = jet-proof, IP67 = immersion.',
		areas: ['elektro', 'normen'],
		related: []
	},

	// ──────────────────────────────────────────────────────
	// Energie & Effizienz
	// ──────────────────────────────────────────────────────
	{
		short: 'PV',
		long: 'Photovoltaics',
		description: 'Solarstrom-Erzeugung. Anlagengrösse in kWp gemessen.',
		descriptionEn: 'Solar power generation. System size measured in kWp.',
		areas: ['elektro'],
		related: ['kWp', 'BIPV']
	},
	{
		short: 'kWp',
		long: 'Kilowatt peak',
		description: 'Peak-Leistung einer PV-Anlage unter Standardbedingungen (1000 W/m², 25 °C).',
		descriptionEn: 'Peak power of a PV system under standard conditions (1000 W/m², 25 °C).',
		areas: ['elektro'],
		related: ['PV']
	},
	{
		short: 'BIPV',
		long: 'Building Integrated Photovoltaics',
		description: 'Gebäudeintegrierte PV — Module ersetzen Fassaden- oder Dachelemente.',
		descriptionEn: 'Building-integrated PV — modules replace facade or roof elements.',
		areas: ['elektro'],
		related: ['PV']
	},
	{
		short: 'SG Ready',
		long: 'SG Ready (Smart Grid Ready)',
		description: 'Schnittstelle für Wärmepumpen und andere Verbraucher zur Reaktion auf Stromnetz-Signale. 4 Betriebsmodi (1 = Sperre bis 4 = Einschaltempfehlung).',
		descriptionEn: 'Interface for heat pumps and other consumers to respond to power grid signals. 4 operating modes (1 = block to 4 = switch-on recommendation).',
		areas: ['hlk', 'elektro'],
		related: ['WP', 'PV', 'V2G']
	},
	{
		short: 'V2G',
		long: 'Vehicle to Grid',
		description: 'Bidirektionales Laden: Elektrofahrzeug speist gespeicherten Strom ins Netz zurück. Flexibles Lastmanagement.',
		descriptionEn: 'Bidirectional charging: electric vehicle feeds stored power back to the grid. Flexible load management.',
		areas: ['elektro'],
		related: ['EMS', 'PV', 'SG Ready']
	},
	{
		short: 'MPPT',
		long: 'Maximum Power Point Tracking',
		description: 'Algorithmus im PV-Wechselrichter zur kontinuierlichen Maximierung der Energieausbeute bei wechselnder Einstrahlung.',
		descriptionEn: 'Algorithm in PV inverter to continuously maximise energy yield under varying irradiance.',
		areas: ['elektro'],
		related: ['PV']
	},
	{
		short: 'ppm',
		long: 'Parts per Million',
		description: 'Einheit für sehr geringe Konzentrationen. CO₂-Aussenluft ≈ 420 ppm; Raumluft-Richtwert: < 1000 ppm (EN 16798 Kat. II).',
		descriptionEn: 'Unit for very low concentrations. Outdoor CO₂ ≈ 420 ppm; indoor air guideline: < 1000 ppm (EN 16798 Cat. II).',
		areas: ['hlk', 'ga'],
		related: ['CO₂', 'VOC']
	},
	{
		short: 'EMS',
		long: 'Energiemanagementsystem',
		description: 'System zur Erfassung, Visualisierung und Optimierung des Energieverbrauchs.',
		descriptionEn: 'System for recording, visualising and optimising energy consumption.',
		areas: ['ga'],
		related: ['WMZ', 'KMZ']
	},
	{
		short: 'EnEV',
		long: 'Energieeinsparverordnung',
		description: 'DE-Vorschrift zur Energieeffizienz von Gebäuden (mittlerweile GEG).',
		descriptionEn: 'German regulation on energy efficiency in buildings (superseded by GEG).',
		areas: ['normen'],
		related: ['MuKEn', 'GEG']
	},
	{
		short: 'GEG',
		long: 'Gebäudeenergiegesetz (DE)',
		description: 'Löste EnEV und EEWärmeG ab. Regelt Energieeffizienz und erneuerbare Wärme.',
		descriptionEn: 'Replaced EnEV and EEWärmeG. Regulates energy efficiency and renewable heat.',
		areas: ['normen'],
		related: ['EnEV']
	},
	{
		short: 'MuKEn',
		long: 'Mustervorschriften der Kantone im Energiebereich',
		description: 'CH-Pendant zur EnEV — kantonal verbindlich, harmonisiert.',
		descriptionEn: 'Swiss equivalent of EnEV — cantonal mandatory, harmonised.',
		areas: ['normen'],
		related: ['EnEV', 'SIA']
	},
	{
		short: 'GEAK',
		long: 'Gebäudeenergieausweis der Kantone',
		description: 'CH-Energieausweis für Wohngebäude. Klassen A (best) bis G.',
		descriptionEn: 'Swiss energy certificate for residential buildings. Classes A (best) to G.',
		areas: ['normen'],
		related: ['MuKEn']
	},

	// ──────────────────────────────────────────────────────
	// Normen & Standards
	// ──────────────────────────────────────────────────────
	{
		short: 'SIA',
		long: 'Schweizerischer Ingenieur- und Architektenverein',
		description: 'Herausgeber zentraler CH-Normen wie SIA 380/1, 384/2, 380/4.',
		descriptionEn: 'Publisher of key Swiss standards such as SIA 380/1, 384/2, 380/4.',
		areas: ['normen'],
		related: ['SWKI', 'DIN']
	},
	{
		short: 'SWKI',
		long: 'Schweizerischer Verein von Wärme- und Klima-Ingenieuren',
		description: 'CH-Fachverband mit eigenen Richtlinien (z.B. SWKI 91-1 für MAG).',
		descriptionEn: 'Swiss professional association with own guidelines (e.g. SWKI 91-1 for expansion vessels).',
		areas: ['normen', 'hlk'],
		related: ['SIA']
	},
	{
		short: 'VDI',
		long: 'Verein Deutscher Ingenieure',
		description: 'DE-Richtlinien — VDI 3814 für GA-Hierarchie, VDI 6022 für Hygiene Lüftung.',
		descriptionEn: 'German guidelines — VDI 3814 for BA hierarchy, VDI 6022 for ventilation hygiene.',
		areas: ['normen'],
		related: ['DIN']
	},
	{
		short: 'DIN',
		long: 'Deutsches Institut für Normung',
		description: 'Herausgeber deutscher Normen. Oft identisch mit EN (z.B. DIN EN 1264).',
		descriptionEn: 'Publisher of German standards. Often identical to EN (e.g. DIN EN 1264).',
		areas: ['normen'],
		related: ['EN', 'VDI']
	},
	{
		short: 'EN',
		long: 'European Standard (CEN)',
		description: 'Norm der europäischen Normungsorganisation. Beispiele: EN 12831, EN 16798.',
		descriptionEn: 'European standard (CEN). Examples: EN 12831, EN 16798.',
		areas: ['normen'],
		related: ['DIN', 'ISO']
	},
	{
		short: 'ISO',
		long: 'International Organization for Standardization',
		description: 'Internationale Norm. Beispiele: ISO 16890 (Filter), ISO/IEC 14543 (KNX).',
		descriptionEn: 'International standard. Examples: ISO 16890 (filters), ISO/IEC 14543 (KNX).',
		areas: ['normen'],
		related: ['EN']
	},
	{
		short: 'VDE',
		long: 'Verband der Elektrotechnik (DE)',
		description: 'Normungsgremium und Prüforganisation für Elektrotechnik DE.',
		descriptionEn: 'Standardisation body and testing organisation for electrical engineering DE.',
		areas: ['elektro', 'normen'],
		related: ['DIN']
	},
	{
		short: 'SEV',
		long: 'Schweizerischer Elektrotechnischer Verein',
		description: 'CH-Fachverband Elektrotechnik. Herausgeber NIN (SEV 1000).',
		descriptionEn: 'Swiss electrical engineering professional association. Publisher of NIN (SEV 1000).',
		areas: ['elektro', 'normen'],
		related: ['NIN', 'ESTI']
	},
	{
		short: 'ESTI',
		long: 'Eidgenössisches Starkstrominspektorat',
		description: 'CH-Aufsichtsbehörde Elektroinstallationen.',
		descriptionEn: 'Swiss Federal Inspectorate for Heavy Current Installations.',
		areas: ['elektro', 'normen'],
		related: ['SEV', 'NIN']
	},
	{
		short: 'ASHRAE',
		long: 'American Society of HVAC Engineers',
		description: 'US-Fachverband mit international relevanten Standards (z.B. ASHRAE 90.1).',
		descriptionEn: 'US professional association with internationally relevant standards (e.g. ASHRAE 90.1).',
		areas: ['normen', 'hlk'],
		related: []
	},
	{
		short: 'LCC',
		long: 'Life Cycle Cost',
		description: 'Lebenszykluskosten einer Anlage: Investition + Betrieb + Instandhaltung + Entsorgung. Grundlage für Wirtschaftlichkeitsvergleiche.',
		descriptionEn: 'Life cycle costs of a system: investment + operation + maintenance + disposal. Basis for economic comparisons.',
		areas: ['normen', 'ga'],
		related: ['BIM', 'CAFM'],
		wissenSlug: 'lebenszyklus-lcc'
	},
	{
		short: 'MINERGIE',
		long: 'MINERGIE-Standard',
		description: 'CH-Gebäudestandard für niedrigen Energieverbrauch. Stufen: MINERGIE, -P, -A.',
		descriptionEn: 'Swiss building standard for low energy consumption. Levels: MINERGIE, -P, -A.',
		areas: ['normen', 'hlk'],
		related: ['MuKEn']
	},
	{
		short: 'LEED',
		long: 'Leadership in Energy and Environmental Design',
		description: 'US-Nachhaltigkeits-Zertifizierung für Gebäude.',
		descriptionEn: 'US sustainability certification for buildings.',
		areas: ['normen'],
		related: ['DGNB', 'BREEAM']
	},
	{
		short: 'DGNB',
		long: 'Deutsche Gesellschaft für Nachhaltiges Bauen',
		description: 'DE-Gebäudezertifizierungssystem.',
		descriptionEn: 'German building certification system.',
		areas: ['normen'],
		related: ['LEED']
	},
	{
		short: 'BREEAM',
		long: 'Building Research Establishment Environmental Assessment Method',
		description: 'UK-Gebäudezertifizierungssystem.',
		descriptionEn: 'UK building certification system.',
		areas: ['normen'],
		related: ['LEED']
	},

	// ──────────────────────────────────────────────────────
	// Gebäude & Komfort
	// ──────────────────────────────────────────────────────
	{
		short: 'PMV',
		long: 'Predicted Mean Vote',
		description: 'Behaglichkeits-Index nach Fanger (ISO 7730). Skala −3 (kalt) bis +3 (heiss).',
		descriptionEn: 'Thermal comfort index per Fanger (ISO 7730). Scale −3 (cold) to +3 (hot).',
		areas: ['hlk', 'normen'],
		related: ['PPD']
	},
	{
		short: 'PPD',
		long: 'Predicted Percentage Dissatisfied',
		description: 'Anteil Unzufriedener — folgt aus PMV. Auslegung: PPD < 10 %.',
		descriptionEn: 'Percentage of dissatisfied persons — derived from PMV. Design target: PPD < 10 %.',
		areas: ['hlk', 'normen'],
		related: ['PMV']
	},
	{
		short: 'LUX',
		long: 'Illuminance (lx)',
		description: 'Photometrische Einheit. Büro: 500 lx, Werkstatt fein: 750 lx, Pflegezimmer: 200 lx.',
		descriptionEn: 'Photometric unit. Office: 500 lx, precision workshop: 750 lx, care room: 200 lx.',
		areas: ['elektro', 'normen'],
		related: ['LDR', 'UGR', 'CRI']
	},

	// ──────────────────────────────────────────────────────
	// Beleuchtung (erweitert)
	// ──────────────────────────────────────────────────────
	{
		short: 'LED',
		long: 'Light Emitting Diode',
		description: 'Halbleiter-Lichtquelle. Hoher Wirkungsgrad (≈ 150 lm/W), lange Lebensdauer (> 50 000 h), dimm- und farbsteuerbar.',
		descriptionEn: 'Semiconductor light source. High efficacy (≈ 150 lm/W), long lifetime (> 50 000 h), dimmable and colour-controllable.',
		areas: ['elektro'],
		related: ['DALI', 'EVG', 'PWM']
	},
	{
		short: 'EVG',
		long: 'Elektronisches Vorschaltgerät',
		description: 'Betriebsgerät für Leuchtmittel — heute meist LED-Treiber. Dimmbar (DALI, 1–10 V, PWM).',
		descriptionEn: 'Electronic control gear for lamps — today usually LED drivers. Dimmable (DALI, 1–10 V, PWM).',
		areas: ['elektro'],
		related: ['LED', 'DALI', 'ECG']
	},
	{
		short: 'ECG',
		long: 'Electronic Control Gear',
		description: 'Englisches Pendant zu EVG.',
		descriptionEn: 'English equivalent of EVG (electronic control gear for lighting).',
		areas: ['elektro'],
		related: ['EVG', 'LED']
	},
	{
		short: 'UGR',
		long: 'Unified Glare Rating',
		description: 'Bewertungssystem für psychologische Blendung in Innenräumen nach EN 12464-1. Büro typ. UGR ≤ 19, Bildschirmarbeit UGR ≤ 16.',
		descriptionEn: 'Rating system for discomfort glare in interiors per EN 12464-1. Office typically UGR ≤ 19, screen work UGR ≤ 16.',
		areas: ['elektro', 'normen'],
		related: ['LUX', 'CRI']
	},
	{
		short: 'CRI',
		long: 'Colour Rendering Index',
		description: 'Farbwiedergabeindex einer Lichtquelle (Skala 0–100). Büro/Wohnen ≥ 80, Verkaufs-/Pflegebereich ≥ 90.',
		descriptionEn: 'Colour rendering index of a light source (scale 0–100). Office/residential ≥ 80, retail/care areas ≥ 90.',
		areas: ['elektro', 'normen'],
		related: ['Ra', 'CCT']
	},
	{
		short: 'Ra',
		long: 'Allgemeiner Farbwiedergabeindex (Ra)',
		description: 'Synonym CRI — gebräuchlich im DACH-Raum. Mittelwert über 8 Testfarben.',
		descriptionEn: 'Synonym for CRI — common in German-speaking countries. Mean over 8 test colours.',
		areas: ['elektro', 'normen'],
		related: ['CRI', 'CCT']
	},
	{
		short: 'CCT',
		long: 'Correlated Colour Temperature',
		description: 'Ähnlichste Farbtemperatur einer Lichtquelle in Kelvin. Warmweiss < 3300 K, neutralweiss 3300–5300 K, tageslichtweiss > 5300 K.',
		descriptionEn: 'Correlated colour temperature of a light source in Kelvin. Warm white < 3300 K, neutral white 3300–5300 K, daylight > 5300 K.',
		areas: ['elektro', 'normen'],
		related: ['CRI', 'HCL']
	},
	{
		short: 'HCL',
		long: 'Human Centric Lighting',
		description: 'Biologisch wirksame Beleuchtung — passt Farbtemperatur und Intensität dem Tagesverlauf an (circadianer Rhythmus).',
		descriptionEn: 'Biologically effective lighting — adapts colour temperature and intensity to the daily cycle (circadian rhythm).',
		areas: ['elektro'],
		related: ['CCT', 'DALI-2']
	},

	// ──────────────────────────────────────────────────────
	// Brandschutz & Entrauchung
	// ──────────────────────────────────────────────────────
	{
		short: 'BMA',
		long: 'Brandmeldeanlage',
		description: 'Anlage zur frühzeitigen Branddetektion. Komponenten: Melder (Rauch/Wärme/Flamme), BMZ, Alarmierung. Normen: SN EN 54, VKF/VdS.',
		descriptionEn: 'Fire detection system. Components: detectors (smoke/heat/flame), control panel, alarm. Standards: SN EN 54, VKF/VdS.',
		areas: ['elektro', 'normen'],
		related: ['BMZ', 'ELA', 'RWA']
	},
	{
		short: 'BMZ',
		long: 'Brandmeldezentrale',
		description: 'Zentrale einer Brandmeldeanlage — wertet Meldersignale aus, alarmiert Feuerwehr (ÜE) und löst Anlagensteuerungen aus (BSK schliessen, RWA, Lift).',
		descriptionEn: 'Fire alarm control panel — evaluates detector signals, alerts fire brigade and triggers building systems (fire dampers, smoke vents, lifts).',
		areas: ['elektro', 'normen'],
		related: ['BMA', 'BSK', 'RWA']
	},
	{
		short: 'RWA',
		long: 'Rauch- und Wärmeabzugsanlage',
		description: 'Entrauchungsanlage für Treppenhäuser, Hallen, Atrien. Natürliche RWA (NRA) mit Öffnungsklappen oder maschinelle RWA (MRA) mit Ventilatoren.',
		descriptionEn: 'Smoke and heat extraction system for staircases, halls, atria. Natural (NSHEV) with vents or mechanical (MSHEV) with fans.',
		areas: ['hlk', 'elektro', 'normen'],
		related: ['BMA', 'BSK']
	},
	{
		short: 'BSK',
		long: 'Brandschutzklappe',
		description: 'Lüftungs-Klappe, die im Brandfall automatisch schliesst (Schmelzlot oder Motor mit Federrücklauf). Feuerwiderstand EI 30 / 60 / 90.',
		descriptionEn: 'Ventilation damper that automatically closes in case of fire (fusible link or motor with spring return). Fire resistance EI 30 / 60 / 90.',
		areas: ['hlk', 'normen'],
		related: ['BMA', 'RWA', 'EI60']
	},
	{
		short: 'ELA',
		long: 'Elektroakustische Notfallwarnanlage',
		description: 'Sprachalarmierungssystem — überwacht nach EN 54-16. Räumungsdurchsagen bei Brand oder anderen Notfällen.',
		descriptionEn: 'Voice alarm system — monitored per EN 54-16. Evacuation announcements in case of fire or other emergencies.',
		areas: ['elektro', 'normen'],
		related: ['BMA']
	},
	{
		short: 'F90',
		long: 'Feuerwiderstandsklasse F90 (DIN 4102)',
		description: 'Bauteil hält 90 Minuten dem Brand stand (DE-Klassifizierung). EU-äquivalent: REI 90 nach EN 13501.',
		descriptionEn: 'Component withstands fire for 90 minutes (German classification). EU equivalent: REI 90 per EN 13501.',
		areas: ['normen'],
		related: ['EI60']
	},
	{
		short: 'EI60',
		long: 'Feuerwiderstand EI 60 (EN 13501)',
		description: 'Bauteil wahrt Integrität (E) und Isolation (I) für 60 Minuten. CH-/EU-Klassifizierung. R = Tragfähigkeit zusätzlich.',
		descriptionEn: 'Component maintains integrity (E) and insulation (I) for 60 minutes. CH/EU classification. R = additional load-bearing capacity.',
		areas: ['normen'],
		related: ['F90', 'BSK']
	},
	{
		short: 'VKF',
		long: 'Vereinigung Kantonaler Feuerversicherungen',
		description: 'CH-Brandschutz-Regelwerk. Brandschutznorm und -richtlinien sind in den Kantonen verbindlich.',
		descriptionEn: 'Swiss fire protection regulations. Standards and guidelines are mandatory in the cantons.',
		areas: ['normen'],
		related: ['BMA', 'RWA']
	},

	// ──────────────────────────────────────────────────────
	// Sicherheit & Zutritt
	// ──────────────────────────────────────────────────────
	{
		short: 'ZKS',
		long: 'Zutrittskontrollsystem',
		description: 'Elektronische Zutrittssteuerung — Leser (RFID/NFC/Biometrie), Türcontroller, Verwaltungsserver. Integration in GA und EMA üblich.',
		descriptionEn: 'Electronic access control system — readers (RFID/NFC/biometric), door controllers, management server. Integration with BA and intrusion systems common.',
		areas: ['elektro', 'ga'],
		related: ['EMA', 'RFID', 'NFC']
	},
	{
		short: 'EMA',
		long: 'Einbruchmeldeanlage',
		description: 'Anlage zur Detektion unbefugten Eindringens. Klassen nach EN 50131 (Grad 1–4). Komponenten: Bewegungsmelder, Magnetkontakte, Zentrale, Alarmierung.',
		descriptionEn: 'Intrusion detection system. Grades per EN 50131 (Grade 1–4). Components: motion detectors, magnetic contacts, control panel, alarm.',
		areas: ['elektro', 'normen'],
		related: ['ZKS', 'VSS', 'PIR']
	},
	{
		short: 'VSS',
		long: 'Videoüberwachungssystem',
		description: 'Videoanlage zur Überwachung — IP-Kameras, NVR, Analyse-Software. CH-Begriff; international gebräuchlicher: CCTV / Video Surveillance.',
		descriptionEn: 'Video surveillance system — IP cameras, NVR, analytics software. Swiss term; internationally: CCTV / video surveillance.',
		areas: ['elektro', 'it'],
		related: ['CCTV', 'EMA']
	},
	{
		short: 'CCTV',
		long: 'Closed Circuit Television',
		description: 'Englisch für Videoüberwachung. Heute fast immer IP-basiert über PoE.',
		descriptionEn: 'Closed circuit television — video surveillance. Today almost always IP-based via PoE.',
		areas: ['elektro', 'it'],
		related: ['VSS', 'PoE']
	},
	{
		short: 'RFID',
		long: 'Radio Frequency Identification',
		description: 'Funkbasierte Identifikation (125 kHz, 13,56 MHz). Standard für Mitarbeiterausweise im ZKS.',
		descriptionEn: 'Radio-frequency identification (125 kHz, 13.56 MHz). Standard for employee badges in access control.',
		areas: ['elektro', 'it'],
		related: ['NFC', 'ZKS']
	},
	{
		short: 'NFC',
		long: 'Near Field Communication',
		description: 'Kurzdistanz-Funk (13,56 MHz, < 10 cm). Erweiterung von RFID. Häufig in Smartphones, Smart-Locks.',
		descriptionEn: 'Short-range radio (13.56 MHz, < 10 cm). Extension of RFID. Common in smartphones, smart locks.',
		areas: ['elektro', 'it'],
		related: ['RFID', 'BLE']
	},

	// ──────────────────────────────────────────────────────
	// HLK & Hydraulik (erweitert)
	// ──────────────────────────────────────────────────────
	{
		short: 'TABS',
		long: 'Thermoaktive Bauteilsysteme',
		description: 'Heiz-/Kühlsystem in Betondecken oder -wänden integriert. Träge (Speichermasse), Niedrigtemperatur — ideal für Wärmepumpe und Free Cooling.',
		descriptionEn: 'Heating/cooling system integrated in concrete slabs or walls. Sluggish (thermal mass), low temperature — ideal for heat pumps and free cooling.',
		areas: ['hlk'],
		related: ['BKA', 'FBH', 'WP']
	},
	{
		short: 'BKA',
		long: 'Betonkernaktivierung',
		description: 'Synonym TABS — speziell die Variante mit Rohren im Beton-Kern (nicht im Estrich).',
		descriptionEn: 'Synonym for TABS — specifically with pipes embedded in the concrete core (not in the screed).',
		areas: ['hlk'],
		related: ['TABS']
	},
	{
		short: 'WT',
		long: 'Wärmetauscher',
		description: 'Sammelbegriff für Apparate zur Wärmeübertragung. Bauformen: Platten-, Rohrbündel-, Lamellen-, Spiral-WT.',
		descriptionEn: 'General term for heat transfer apparatus. Forms: plate, shell-and-tube, finned, spiral.',
		areas: ['hlk'],
		related: ['PWT', 'WRG']
	},
	{
		short: 'PWT',
		long: 'Plattenwärmetauscher',
		description: 'Kompakter WT mit dünnen Edelstahl-Platten. Hohe Leistungsdichte. Für hydraulische Trennung, Fernwärme-Übergabe.',
		descriptionEn: 'Compact heat exchanger with thin stainless steel plates. High power density. For hydraulic separation, district heat transfer.',
		areas: ['hlk'],
		related: ['WT']
	},
	{
		short: '3WV',
		long: '3-Wege-Ventil',
		description: 'Mischventil oder Verteilventil. Zwei Eingänge / ein Ausgang (Mischen) oder umgekehrt. Stetig regelbar (0–10 V) oder schaltend.',
		descriptionEn: '3-way valve — mixing or diverting. Two inputs / one output (mixing) or vice versa. Continuously controllable (0–10 V) or switching.',
		areas: ['hlk'],
		related: ['Kv', 'AO']
	},

	// ──────────────────────────────────────────────────────
	// Sanitär (erweitert)
	// ──────────────────────────────────────────────────────
	{
		short: 'EWS',
		long: 'Erdwärmesonde',
		description: 'Vertikales Sondenrohr (PE) im Erdreich (typ. 100–300 m tief) als Wärmequelle für Sole-Wasser-WP. Auslegung nach SIA 384/6.',
		descriptionEn: 'Vertical PE probe in the ground (typ. 100–300 m deep) as a heat source for brine-water heat pumps. Sizing per SIA 384/6.',
		areas: ['hlk'],
		related: ['EWP', 'WP']
	},
	{
		short: 'SVGW',
		long: 'Schweizerischer Verein des Gas- und Wasserfaches',
		description: 'CH-Fachverband. Herausgeber W3 (Trinkwasserinstallationen) und G1 (Gasinstallationen) — verbindliche Werke.',
		descriptionEn: 'Swiss professional association for gas and water. Publisher of W3 (drinking water installations) and G1 (gas installations) — mandatory works.',
		areas: ['sanitaer', 'normen'],
		related: ['SIA']
	},
	{
		short: 'DM',
		long: 'Druckminderer',
		description: 'Reduziert den Eingangsdruck auf einen einstellbaren Ausgangsdruck. Pflicht für Hausinstallationen > 5 bar (W3).',
		descriptionEn: 'Reduces inlet pressure to an adjustable outlet pressure. Mandatory for domestic installations > 5 bar (W3).',
		areas: ['sanitaer'],
		related: ['MAG', 'PN']
	},

	// ──────────────────────────────────────────────────────
	// Elektro (erweitert)
	// ──────────────────────────────────────────────────────
	{
		short: 'SPD',
		long: 'Surge Protection Device',
		description: 'Überspannungsschutz für Stromversorgung und Datenleitungen. Typen 1 / 2 / 3 nach IEC 61643 (Blitzstromableiter bis Endgeräteschutz).',
		descriptionEn: 'Surge protection device for power and data lines. Types 1 / 2 / 3 per IEC 61643 (lightning current arrester to terminal device protection).',
		areas: ['elektro', 'normen'],
		related: ['ÜSS']
	},
	{
		short: 'ÜSS',
		long: 'Überspannungsschutz',
		description: 'Deutsche Bezeichnung für SPD. In NIN 2020 / SIA für viele GA-Anlagen verbindlich.',
		descriptionEn: 'German term for SPD. Mandatory under NIN 2020 / SIA for many BA installations.',
		areas: ['elektro', 'normen'],
		related: ['SPD']
	},
	{
		short: 'cos φ',
		long: 'Leistungsfaktor (cos phi)',
		description: 'Verhältnis Wirk- zu Scheinleistung. Ideal 1,0; induktive Lasten (Motoren) verschlechtern → Kompensation nötig. Industrie typ. ≥ 0,9.',
		descriptionEn: 'Ratio of active to apparent power. Ideal 1.0; inductive loads (motors) worsen → compensation needed. Industrial typically ≥ 0.9.',
		areas: ['elektro'],
		related: ['kVA']
	},
	{
		short: 'kVA',
		long: 'Kilovoltampere',
		description: 'Einheit der Scheinleistung. 1 kVA = √(P² + Q²). Auslegungsgrösse für Trafos, USV, Schaltanlagen.',
		descriptionEn: 'Unit of apparent power. 1 kVA = √(P² + Q²). Sizing variable for transformers, UPS, switchgear.',
		areas: ['elektro'],
		related: ['cos φ']
	},
	{
		short: 'TN-S',
		long: 'TN-S-Netzform',
		description: 'Niederspannungsnetz mit separat geführtem N- und PE-Leiter. Standard in CH/DE Neuanlagen — geringe EMV-Probleme.',
		descriptionEn: 'Low-voltage network with separately routed N and PE conductors. Standard in CH/DE new installations — low EMC issues.',
		areas: ['elektro', 'normen'],
		related: ['NIN', 'PELV']
	},

	// ──────────────────────────────────────────────────────
	// IT / Daten (erweitert)
	// ──────────────────────────────────────────────────────
	{
		short: 'IP',
		long: 'Internet Protocol',
		description: 'Vermittlungsprotokoll der TCP/IP-Familie. IPv4 (32 bit) und IPv6 (128 bit). Adressiert Teilnehmer im LAN/Internet.',
		descriptionEn: 'Network layer protocol of the TCP/IP family. IPv4 (32 bit) and IPv6 (128 bit). Addresses participants in LAN/internet.',
		areas: ['it'],
		related: ['TCP/IP', 'UDP', 'LAN']
	},
	{
		short: 'HTTPS',
		long: 'Hypertext Transfer Protocol Secure',
		description: 'HTTP über TLS. Pflicht für GLT-Web-Visualisierungen mit Fernzugriff. Heute Standard, nicht mehr nur HTTP.',
		descriptionEn: 'HTTP over TLS. Mandatory for BMS web visualisations with remote access. Today the standard, no longer plain HTTP.',
		areas: ['it'],
		related: ['TLS', 'API', 'REST']
	},
	{
		short: 'SSH',
		long: 'Secure Shell',
		description: 'Verschlüsselter Fernzugriff auf Server / Embedded-Geräte. Ersatz für Telnet. Port 22.',
		descriptionEn: 'Encrypted remote access to servers / embedded devices. Replacement for Telnet. Port 22.',
		areas: ['it'],
		related: ['TLS', 'VPN']
	},
	{
		short: 'DMZ',
		long: 'Demilitarized Zone',
		description: 'Netzwerk-Zone zwischen LAN und Internet. Server mit externem Zugriff (z.B. GLT-Webserver) gehören hierher — schützt Innennetz bei Kompromittierung.',
		descriptionEn: 'Network zone between LAN and internet. Servers with external access (e.g. BMS web server) belong here — protects internal network if compromised.',
		areas: ['it'],
		related: ['VLAN', 'VPN']
	},

	// ──────────────────────────────────────────────────────
	// Normen (erweitert) & Kennzahlen
	// ──────────────────────────────────────────────────────
	{
		short: 'IEC',
		long: 'International Electrotechnical Commission',
		description: 'Internationale Normungsorganisation für Elektro- und Informationstechnik. Viele Normen werden 1:1 als EN übernommen (z.B. IEC 60364 = EN 60364).',
		descriptionEn: 'International standards body for electrical and information technology. Many standards are adopted 1:1 as EN (e.g. IEC 60364 = EN 60364).',
		areas: ['normen', 'elektro'],
		related: ['EN', 'ISO']
	},
	{
		short: 'HOAI',
		long: 'Honorarordnung für Architekten und Ingenieure (DE)',
		description: 'DE-Verordnung zu Planerhonoraren. Leistungsphasen 1–9 — Grundlage für TGA-/HLK-Planungsverträge.',
		descriptionEn: 'German regulation on architect and engineer fees. Service phases 1–9 — basis for MEP/HVAC planning contracts.',
		areas: ['normen'],
		related: ['SIA']
	},
	{
		short: 'LCA',
		long: 'Life Cycle Assessment',
		description: 'Ökobilanz über den gesamten Lebenszyklus — Rohstoff, Herstellung, Betrieb, Entsorgung. Komplementär zu LCC (Kosten).',
		descriptionEn: 'Life cycle assessment covering the entire life — raw material, manufacture, operation, disposal. Complementary to LCC (cost).',
		areas: ['normen'],
		related: ['LCC']
	},
	{
		short: 'KPI',
		long: 'Key Performance Indicator',
		description: 'Kennzahl zur Bewertung von Anlagen oder Prozessen. GA-typische KPIs: SFP, JAZ, Energieverbrauch/m², Komfort-Compliance.',
		descriptionEn: 'Performance metric for evaluating systems or processes. BA-typical KPIs: SFP, SCOP, energy consumption/m², comfort compliance.',
		areas: ['ga'],
		related: ['EMS', 'JAZ', 'SFP']
	},
	{
		short: 'ROI',
		long: 'Return on Investment',
		description: 'Amortisationszeit einer Investition. Wichtige Kennzahl bei GA-/Effizienz-Massnahmen — typisch akzeptiert 5–10 Jahre.',
		descriptionEn: 'Payback period of an investment. Important metric for BA/efficiency measures — typically 5–10 years accepted.',
		areas: ['ga'],
		related: ['LCC', 'LCA']
	}
];

// Index by first letter for A-Z quick nav
export const byLetter: Record<string, Abbreviation[]> = abbreviations.reduce(
	(acc, a) => {
		const letter = a.short[0].toUpperCase();
		(acc[letter] = acc[letter] ?? []).push(a);
		return acc;
	},
	{} as Record<string, Abbreviation[]>
);

export const letters = Object.keys(byLetter).sort();
