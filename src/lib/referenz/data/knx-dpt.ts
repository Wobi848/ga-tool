import type { ReferenceTable } from '../types';

export const knxDpt: ReferenceTable = {
	slug: 'knx-dpt',
	title: 'KNX Datenpunkttypen (DPT)',
	title_en: 'KNX Data Point Types (DPT)',
	subtitle: 'Wichtigste DPT für HVAC- und GA-Anwendungen',
	subtitle_en: 'Most important DPTs for HVAC and BA applications',
	category: 'Protokolle',
	icon: 'list',
	color: '#ea580c',
	areas: ['ga', 'hlk'],
	norm: ['EN 50090', 'KNX Spec. 03.01.02'],
	updated: '2026-05-15',
	description:
		'Gebräuchlichste KNX-Datenpunkttypen. Der DPT bestimmt Encoding, Wertebereich und physikalische Einheit eines Gruppenobjekts.',
	description_en:
		'Most common KNX data point types. The DPT determines the encoding, value range and physical unit of a group object.',
	columns: [
		{ key: 'dpt', label: 'DPT', mono: true, highlight: true },
		{ key: 'name', label: 'Name', type: 'text' },
		{ key: 'size', label: 'Grösse', label_en: 'Size', type: 'text', hint: 'Byte / Bit' },
		{ key: 'range', label: 'Wertebereich', label_en: 'Range', type: 'text' },
		{ key: 'unit', label: 'Einheit', label_en: 'Unit', type: 'text' },
		{ key: 'use', label: 'Typische Verwendung', label_en: 'Typical Use', type: 'text' }
	],
	rows: [
		// 1-Bit
		{
			dpt: '1.001',
			name: 'DPT_Switch',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Ein/Aus (Lampe, Ventil, Pumpe)',
			use_en: 'On/Off (lamp, valve, pump)'
		},
		{
			dpt: '1.002',
			name: 'DPT_Bool',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Allgemeiner Bool-Wert',
			use_en: 'General boolean value'
		},
		{
			dpt: '1.003',
			name: 'DPT_Enable',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Freigabe / Sperren',
			use_en: 'Enable / disable'
		},
		{
			dpt: '1.008',
			name: 'DPT_UpDown',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Jalousie/Beschattung hoch/runter',
			use_en: 'Blinds/shading up/down'
		},
		{
			dpt: '1.009',
			name: 'DPT_OpenClose',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Ventil offen/zu, Klappe',
			use_en: 'Valve open/close, damper'
		},
		{
			dpt: '1.011',
			name: 'DPT_State',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Betriebszustand / Störung',
			use_en: 'Operating state / fault'
		},
		{
			dpt: '1.017',
			name: 'DPT_Trigger',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Impuls / Reset-Trigger',
			use_en: 'Pulse / reset trigger'
		},
		{
			dpt: '1.018',
			name: 'DPT_Occupancy',
			size: '1 Bit',
			range: '0/1',
			unit: '—',
			use: 'Belegungsmelder (HLK/Licht)',
			use_en: 'Occupancy detector (HVAC/lighting)'
		},
		// 4-Bit
		{
			dpt: '3.007',
			name: 'DPT_Control_Dimming',
			size: '4 Bit',
			range: '0–7',
			unit: '—',
			use: 'Dimmen relativ (DALI/KNX Dimmer)',
			use_en: 'Relative dimming (DALI/KNX dimmer)'
		},
		{
			dpt: '3.008',
			name: 'DPT_Control_Blinds',
			size: '4 Bit',
			range: '0–7',
			unit: '—',
			use: 'Jalousie relativ',
			use_en: 'Blinds relative control'
		},
		// 1-Byte unsigned
		{
			dpt: '5.001',
			name: 'DPT_Scaling',
			size: '1 Byte',
			range: '0–100',
			unit: '%',
			use: 'Stellgrad, Dimmen, Klappe, Ventil',
			use_en: 'Control position, dimming, damper, valve'
		},
		{
			dpt: '5.003',
			name: 'DPT_Angle',
			size: '1 Byte',
			range: '0–360',
			unit: '°',
			use: 'Winkel, Jalousieneigung',
			use_en: 'Angle, slat tilt'
		},
		{
			dpt: '5.004',
			name: 'DPT_Percent_U8',
			size: '1 Byte',
			range: '0–255',
			unit: '%',
			use: 'Allgemein unsigned Prozent',
			use_en: 'General unsigned percentage'
		},
		{
			dpt: '5.010',
			name: 'DPT_Value_1_Ucount',
			size: '1 Byte',
			range: '0–255',
			unit: '—',
			use: 'Szenennummer, Zähler',
			use_en: 'Scene number, counter'
		},
		// 2-Byte float (EIS5)
		{
			dpt: '9.001',
			name: 'DPT_Value_Temp',
			size: '2 Byte',
			range: '-273..+670',
			unit: '°C',
			use: 'Temperatur (Raum, Vorlauf, Aussen)',
			use_en: 'Temperature (room, flow, outdoor)'
		},
		{
			dpt: '9.002',
			name: 'DPT_Value_Tempd',
			size: '2 Byte',
			range: '-670..+670',
			unit: 'K',
			use: 'Temperaturdifferenz ΔT',
			use_en: 'Temperature difference ΔT'
		},
		{
			dpt: '9.004',
			name: 'DPT_Value_Lux',
			size: '2 Byte',
			range: '0..+670760',
			unit: 'lx',
			use: 'Beleuchtungsstärke',
			use_en: 'Illuminance'
		},
		{
			dpt: '9.005',
			name: 'DPT_Value_Wsp',
			size: '2 Byte',
			range: '0..+670',
			unit: 'm/s',
			use: 'Windgeschwindigkeit',
			use_en: 'Wind speed'
		},
		{
			dpt: '9.007',
			name: 'DPT_Value_Humidity',
			size: '2 Byte',
			range: '0..+670',
			unit: '%',
			use: 'Relative Luftfeuchtigkeit',
			use_en: 'Relative humidity'
		},
		{
			dpt: '9.008',
			name: 'DPT_Value_AirQuality',
			size: '2 Byte',
			range: '0..+670760',
			unit: 'ppm',
			use: 'CO₂ / Luftqualität',
			use_en: 'CO₂ / air quality'
		},
		{
			dpt: '9.010',
			name: 'DPT_Value_Time1',
			size: '2 Byte',
			range: '-670..+670',
			unit: 's',
			use: 'Zeitwert in Sekunden',
			use_en: 'Time value in seconds'
		},
		{
			dpt: '9.016',
			name: 'DPT_Value_Volume_Flow',
			size: '2 Byte',
			range: '-671..+670',
			unit: 'l/h',
			use: 'Volumenstrom',
			use_en: 'Volume flow'
		},
		{
			dpt: '9.017',
			name: 'DPT_Rain_Amount',
			size: '2 Byte',
			range: '-671..+670',
			unit: 'l/m²',
			use: 'Regenmenge',
			use_en: 'Rainfall amount'
		},
		{
			dpt: '9.020',
			name: 'DPT_Value_Volt',
			size: '2 Byte',
			range: '-671..+670',
			unit: 'mV',
			use: 'Spannung (Sensor)',
			use_en: 'Voltage (sensor)'
		},
		{
			dpt: '9.021',
			name: 'DPT_Value_Curr',
			size: '2 Byte',
			range: '-671..+670',
			unit: 'mA',
			use: 'Strom (Sensor)',
			use_en: 'Current (sensor)'
		},
		// 2-Byte signed
		{
			dpt: '8.001',
			name: 'DPT_Value_2_Count',
			size: '2 Byte',
			range: '-32768..+32767',
			unit: '—',
			use: 'Zähler, Differenzwert',
			use_en: 'Counter, difference value'
		},
		// 4-Byte
		{
			dpt: '12.001',
			name: 'DPT_Value_4_Ucount',
			size: '4 Byte',
			range: '0..4294967295',
			unit: '—',
			use: 'Energiezähler, Betriebsstunden',
			use_en: 'Energy meter, operating hours'
		},
		{
			dpt: '13.001',
			name: 'DPT_Value_4_Count',
			size: '4 Byte',
			range: '±2.1·10⁹',
			unit: '—',
			use: 'Signed Zähler',
			use_en: 'Signed counter'
		},
		{
			dpt: '14.019',
			name: 'DPT_Value_Electric_Current',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: 'A',
			use: 'Elektrischer Strom (genau)',
			use_en: 'Electric current (high precision)'
		},
		{
			dpt: '14.031',
			name: 'DPT_Value_Heat_FlowRate',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: 'W',
			use: 'Wärmeleistung',
			use_en: 'Heat flow rate'
		},
		{
			dpt: '14.033',
			name: 'DPT_Value_Humidity',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: '%',
			use: 'Feuchte (hohe Auflösung)',
			use_en: 'Humidity (high resolution)'
		},
		{
			dpt: '14.056',
			name: 'DPT_Value_Power',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: 'W',
			use: 'Leistung (Energiemessung)',
			use_en: 'Power (energy metering)'
		},
		{
			dpt: '14.065',
			name: 'DPT_Value_Pressure',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: 'Pa',
			use: 'Druck (hohe Auflösung)',
			use_en: 'Pressure (high resolution)'
		},
		{
			dpt: '14.076',
			name: 'DPT_Value_Temp_F',
			size: '4 Byte',
			range: 'IEEE 754',
			unit: '°C',
			use: 'Temperatur (hohe Auflösung)',
			use_en: 'Temperature (high resolution)'
		},
		// Time/Date
		{
			dpt: '10.001',
			name: 'DPT_TimeOfDay',
			size: '3 Byte',
			range: '0-6/0-23/0-63',
			unit: '—',
			use: 'Wochentag + Uhrzeit',
			use_en: 'Day of week + time of day'
		},
		{
			dpt: '11.001',
			name: 'DPT_Date',
			size: '3 Byte',
			range: 'YY.MM.DD',
			unit: '—',
			use: 'Datum',
			use_en: 'Date'
		},
		// Scene
		{
			dpt: '17.001',
			name: 'DPT_SceneNumber',
			size: '1 Byte',
			range: '0–63',
			unit: '—',
			use: 'Szenenabruf',
			use_en: 'Scene recall'
		},
		{
			dpt: '18.001',
			name: 'DPT_SceneControl',
			size: '1 Byte',
			range: '0–63/64–127',
			unit: '—',
			use: 'Szene abrufen / speichern',
			use_en: 'Scene recall / store'
		},
		// HVAC
		{
			dpt: '20.102',
			name: 'DPT_HVACMode',
			size: '1 Byte',
			range: '0–4',
			unit: '—',
			use: 'Auto/Komfort/Standby/Nacht/Frost',
			use_en: 'Auto/Comfort/Standby/Night/Frost'
		},
		{
			dpt: '20.103',
			name: 'DPT_DHWMode',
			size: '1 Byte',
			range: '0–4',
			unit: '—',
			use: 'Warmwasserbereitung Betriebsart',
			use_en: 'DHW operating mode'
		},
		{
			dpt: '20.105',
			name: 'DPT_HVACControlMode',
			size: '1 Byte',
			range: '0–20',
			unit: '—',
			use: 'HLK-Reglerbetriebsart',
			use_en: 'HVAC controller operating mode'
		},
		{
			dpt: '20.108',
			name: 'DPT_BuildingMode',
			size: '1 Byte',
			range: '0–4',
			unit: '—',
			use: 'Gebäudebetriebsart (Anwesenheit)',
			use_en: 'Building operating mode (occupancy)'
		}
	],
	notes:
		'DPT 9.xxx: 16-Bit Gleitkomma (EIS5), Auflösung 0.01 Einheiten, nicht für Energiezähler geeignet (Rundungsfehler). Für Zähler DPT 12 oder 13 verwenden.',
	notes_en:
		'DPT 9.xxx: 16-bit floating point (EIS5), resolution 0.01 units, not suitable for energy counters (rounding errors). Use DPT 12 or 13 for counters.'
};
