import type { ReferenceTable } from '../types';

export const knxDpt: ReferenceTable = {
	slug: 'knx-dpt',
	title: 'KNX Datenpunkttypen (DPT)',
	subtitle: 'Wichtigste DPT für HVAC- und GA-Anwendungen',
	category: 'Protokolle',
	icon: 'list',
	color: '#ea580c',
	areas: ['ga', 'hlk'],
	norm: ['EN 50090', 'KNX Spec. 03.01.02'],
	updated: '2026-05-15',
	description: 'Gebräuchlichste KNX-Datenpunkttypen. Der DPT bestimmt Encoding, Wertebereich und physikalische Einheit eines Gruppenobjekts.',
	columns: [
		{ key: 'dpt',      label: 'DPT',       mono: true, highlight: true },
		{ key: 'name',     label: 'Name',       type: 'text' },
		{ key: 'size',     label: 'Grösse',     type: 'text', hint: 'Byte / Bit' },
		{ key: 'range',    label: 'Wertebereich', type: 'text' },
		{ key: 'unit',     label: 'Einheit',    type: 'text' },
		{ key: 'use',      label: 'Typische Verwendung', type: 'text' }
	],
	rows: [
		// 1-Bit
		{ dpt: '1.001', name: 'DPT_Switch',          size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Ein/Aus (Lampe, Ventil, Pumpe)' },
		{ dpt: '1.002', name: 'DPT_Bool',             size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Allgemeiner Bool-Wert' },
		{ dpt: '1.003', name: 'DPT_Enable',           size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Freigabe / Sperren' },
		{ dpt: '1.008', name: 'DPT_UpDown',           size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Jalousie/Beschattung hoch/runter' },
		{ dpt: '1.009', name: 'DPT_OpenClose',        size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Ventil offen/zu, Klappe' },
		{ dpt: '1.011', name: 'DPT_State',            size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Betriebszustand / Störung' },
		{ dpt: '1.017', name: 'DPT_Trigger',          size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Impuls / Reset-Trigger' },
		{ dpt: '1.018', name: 'DPT_Occupancy',        size: '1 Bit',   range: '0/1',           unit: '—',     use: 'Belegungsmelder (HLK/Licht)' },
		// 4-Bit
		{ dpt: '3.007', name: 'DPT_Control_Dimming',  size: '4 Bit',   range: '0–7',           unit: '—',     use: 'Dimmen relativ (DALI/KNX Dimmer)' },
		{ dpt: '3.008', name: 'DPT_Control_Blinds',   size: '4 Bit',   range: '0–7',           unit: '—',     use: 'Jalousie relativ' },
		// 1-Byte unsigned
		{ dpt: '5.001', name: 'DPT_Scaling',          size: '1 Byte',  range: '0–100',         unit: '%',     use: 'Stellgrad, Dimmen, Klappe, Ventil' },
		{ dpt: '5.003', name: 'DPT_Angle',            size: '1 Byte',  range: '0–360',         unit: '°',     use: 'Winkel, Jalousieneigung' },
		{ dpt: '5.004', name: 'DPT_Percent_U8',       size: '1 Byte',  range: '0–255',         unit: '%',     use: 'Allgemein unsigned Prozent' },
		{ dpt: '5.010', name: 'DPT_Value_1_Ucount',   size: '1 Byte',  range: '0–255',         unit: '—',     use: 'Szenennummer, Zähler' },
		// 2-Byte float (EIS5)
		{ dpt: '9.001', name: 'DPT_Value_Temp',       size: '2 Byte',  range: '-273..+670',    unit: '°C',    use: 'Temperatur (Raum, Vorlauf, Aussen)' },
		{ dpt: '9.002', name: 'DPT_Value_Tempd',      size: '2 Byte',  range: '-670..+670',    unit: 'K',     use: 'Temperaturdifferenz ΔT' },
		{ dpt: '9.004', name: 'DPT_Value_Lux',        size: '2 Byte',  range: '0..+670760',    unit: 'lx',    use: 'Beleuchtungsstärke' },
		{ dpt: '9.005', name: 'DPT_Value_Wsp',        size: '2 Byte',  range: '0..+670',       unit: 'm/s',   use: 'Windgeschwindigkeit' },
		{ dpt: '9.007', name: 'DPT_Value_Humidity',   size: '2 Byte',  range: '0..+670',       unit: '%',     use: 'Relative Luftfeuchtigkeit' },
		{ dpt: '9.008', name: 'DPT_Value_AirQuality', size: '2 Byte',  range: '0..+670760',    unit: 'ppm',   use: 'CO₂ / Luftqualität' },
		{ dpt: '9.010', name: 'DPT_Value_Time1',      size: '2 Byte',  range: '-670..+670',    unit: 's',     use: 'Zeitwert in Sekunden' },
		{ dpt: '9.016', name: 'DPT_Value_Volume_Flow',size: '2 Byte',  range: '-671..+670',    unit: 'l/h',   use: 'Volumenstrom' },
		{ dpt: '9.017', name: 'DPT_Rain_Amount',      size: '2 Byte',  range: '-671..+670',    unit: 'l/m²',  use: 'Regenmenge' },
		{ dpt: '9.020', name: 'DPT_Value_Volt',       size: '2 Byte',  range: '-671..+670',    unit: 'mV',    use: 'Spannung (Sensor)' },
		{ dpt: '9.021', name: 'DPT_Value_Curr',       size: '2 Byte',  range: '-671..+670',    unit: 'mA',    use: 'Strom (Sensor)' },
		// 2-Byte signed
		{ dpt: '8.001', name: 'DPT_Value_2_Count',    size: '2 Byte',  range: '-32768..+32767','unit': '—',   use: 'Zähler, Differenzwert' },
		// 4-Byte
		{ dpt: '12.001', name: 'DPT_Value_4_Ucount',  size: '4 Byte',  range: '0..4294967295', unit: '—',     use: 'Energiezähler, Betriebsstunden' },
		{ dpt: '13.001', name: 'DPT_Value_4_Count',   size: '4 Byte',  range: '±2.1·10⁹',     unit: '—',     use: 'Signed Zähler' },
		{ dpt: '14.019', name: 'DPT_Value_Electric_Current', size: '4 Byte', range: 'IEEE 754', unit: 'A',    use: 'Elektrischer Strom (genau)' },
		{ dpt: '14.031', name: 'DPT_Value_Heat_FlowRate', size: '4 Byte', range: 'IEEE 754',   unit: 'W',     use: 'Wärmeleistung' },
		{ dpt: '14.033', name: 'DPT_Value_Humidity',  size: '4 Byte',  range: 'IEEE 754',      unit: '%',     use: 'Feuchte (hohe Auflösung)' },
		{ dpt: '14.056', name: 'DPT_Value_Power',     size: '4 Byte',  range: 'IEEE 754',      unit: 'W',     use: 'Leistung (Energiemessung)' },
		{ dpt: '14.065', name: 'DPT_Value_Pressure',  size: '4 Byte',  range: 'IEEE 754',      unit: 'Pa',    use: 'Druck (hohe Auflösung)' },
		{ dpt: '14.076', name: 'DPT_Value_Temp_F',    size: '4 Byte',  range: 'IEEE 754',      unit: '°C',    use: 'Temperatur (hohe Auflösung)' },
		// Time/Date
		{ dpt: '10.001', name: 'DPT_TimeOfDay',       size: '3 Byte',  range: '0-6/0-23/0-63', unit: '—',     use: 'Wochentag + Uhrzeit' },
		{ dpt: '11.001', name: 'DPT_Date',            size: '3 Byte',  range: 'YY.MM.DD',      unit: '—',     use: 'Datum' },
		// Scene
		{ dpt: '17.001', name: 'DPT_SceneNumber',     size: '1 Byte',  range: '0–63',          unit: '—',     use: 'Szenenabruf' },
		{ dpt: '18.001', name: 'DPT_SceneControl',    size: '1 Byte',  range: '0–63/64–127',   unit: '—',     use: 'Szene abrufen / speichern' },
		// HVAC
		{ dpt: '20.102', name: 'DPT_HVACMode',        size: '1 Byte',  range: '0–4',           unit: '—',     use: 'Auto/Komfort/Standby/Nacht/Frost' },
		{ dpt: '20.103', name: 'DPT_DHWMode',         size: '1 Byte',  range: '0–4',           unit: '—',     use: 'Warmwasserbereitung Betriebsart' },
		{ dpt: '20.105', name: 'DPT_HVACControlMode', size: '1 Byte',  range: '0–20',          unit: '—',     use: 'HLK-Reglerbetriebsart' },
		{ dpt: '20.108', name: 'DPT_BuildingMode',    size: '1 Byte',  range: '0–4',           unit: '—',     use: 'Gebäudebetriebsart (Anwesenheit)' },
	],
	notes: 'DPT 9.xxx: 16-Bit Gleitkomma (EIS5), Auflösung 0.01 Einheiten, nicht für Energiezähler geeignet (Rundungsfehler). Für Zähler DPT 12 oder 13 verwenden.'
};
