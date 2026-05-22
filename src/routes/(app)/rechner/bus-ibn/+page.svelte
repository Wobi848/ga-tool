<script lang="ts">
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import FavButton from '$lib/components/FavButton.svelte';

	// ── Types ─────────────────────────────────────────────────────────────────

	type BusType = 'bacnet-mstp' | 'bacnet-ip' | 'modbus-rtu' | 'knx';
	type DeviceStatus = 'planned' | 'configured' | 'online' | 'error';
	type GroupBy = 'none' | 'group' | 'deviceType' | 'manufacturer';

	interface MstpSettings {
		baud: number;
		maxMasters: number;
		maxInfoFrames: number;
		apduTimeout: number;
		apduRetries: number;
	}
	interface BacnetIpSettings {
		subnet: string;
		port: number;
		broadcastAddr: string;
		bbmd: string;
	}
	interface ModbusSettings {
		baud: number;
		parity: string;
		stopBits: number;
	}
	interface KnxSettings {
		topology: string;
		medium: string;
	}
	type SegmentSettings = MstpSettings | BacnetIpSettings | ModbusSettings | KnxSettings;

	interface BusDevice {
		id: string;
		name: string;
		deviceType: string;
		manufacturer: string;
		model: string;
		address: number;
		macLocked: boolean;
		deviceInstance: number;
		diLocked: boolean;
		status: DeviceStatus;
		group: string;
		notes: string;
	}

	interface BusSegment {
		id: string;
		name: string;
		description: string;
		type: BusType;
		settings: SegmentSettings;
		devices: BusDevice[];
		settingsOpen: boolean;
		diOffset: number;
		diAuto: boolean;
		diSchema: boolean;
		diSS: number;
		diBB: number;
		startAddress: number;
	}

	interface BusProject {
		id: string;
		name: string;
		site: string;
		engineer: string;
		version: string;
		createdAt: number;
		segments: BusSegment[];
	}

	interface LibraryItemRaw {
		catKey: string;
		vendor: string;
		model: string;
		type: string;
		short: string;
		descKey: string;
		busType: BusType | 'analog';
	}
	interface LibraryItem {
		cat: string;
		vendor: string;
		model: string;
		type: string;
		short: string;
		desc: string;
		busType: BusType | 'analog';
	}

	// ── Constants ─────────────────────────────────────────────────────────────

	const STORAGE_KEY = 'ga-bus-ibn-project';
	const PREFS_KEY = 'ga-bus-ibn-prefs';

	const BUS_LABELS: Record<BusType, string> = {
		'bacnet-mstp': 'BACnet MSTP',
		'bacnet-ip': 'BACnet IP',
		'modbus-rtu': 'Modbus RTU',
		knx: 'KNX'
	};
	const BUS_COLORS: Record<BusType, string> = {
		'bacnet-mstp': '#2563eb',
		'bacnet-ip': '#0891b2',
		'modbus-rtu': '#ea580c',
		knx: '#7c3aed'
	};
	const ADDR_RANGE: Record<BusType, { min: number; max: number; label: string }> = {
		'bacnet-mstp': { min: 1, max: 127, label: 'MAC' },
		'bacnet-ip': { min: 1, max: 4194302, label: 'Device Instance' },
		'modbus-rtu': { min: 1, max: 247, label: 'Slave ID' },
		knx: { min: 1, max: 255, label: 'Adresse' }
	};
	const BAUD_OPTIONS = [9600, 19200, 38400, 76800, 115200];

	const STATUS_LABEL_KEYS: Record<DeviceStatus, string> = {
		planned: 'busIbn.statusPlanned',
		configured: 'busIbn.statusConfigured',
		online: 'busIbn.statusOnline',
		error: 'busIbn.statusError'
	};
	function statusLabel(s: DeviceStatus): string {
		return $_(STATUS_LABEL_KEYS[s]);
	}
	const STATUS_COLORS: Record<DeviceStatus, string> = {
		planned: '#6b7280',
		configured: '#2563eb',
		online: '#16a34a',
		error: '#dc2626'
	};
	const STATUS_ORDER: DeviceStatus[] = ['planned', 'configured', 'online', 'error'];

	const DEVICE_LIBRARY_RAW: LibraryItemRaw[] = [
		// ── BACnet MSTP controllers ───────────────────────────────────────────────
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Siemens',
			model: 'PXC100-E.D',
			type: 'Regler',
			short: 'SIE',
			descKey: 'busIbn.libDesc24io'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Siemens',
			model: 'PXC200-E.D',
			type: 'Regler',
			short: 'SIE',
			descKey: 'busIbn.libDesc48io'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Siemens',
			model: 'PXC50-E.D',
			type: 'Regler',
			short: 'SIE',
			descKey: 'busIbn.libDesc12io'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Loytec',
			model: 'LIOB-586',
			type: 'Regler',
			short: 'LOY',
			descKey: 'busIbn.libDescLiob'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Loytec',
			model: 'LIOB-583',
			type: 'Regler',
			short: 'LOY',
			descKey: 'busIbn.libDescLiob'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Sauter',
			model: 'modu525',
			type: 'Regler',
			short: 'SAU',
			descKey: 'busIbn.libDescModulo5'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Saia',
			model: 'PCD3.M5560',
			type: 'Regler',
			short: 'SAI',
			descKey: 'busIbn.libDescSaiaSps'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'JCI',
			model: 'FEC2611',
			type: 'Regler',
			short: 'JCI',
			descKey: 'busIbn.libDescFec'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'JCI',
			model: 'FEC2615',
			type: 'Regler',
			short: 'JCI',
			descKey: 'busIbn.libDescFec'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Honeywell',
			model: 'WEB-8000',
			type: 'Regler',
			short: 'HON',
			descKey: 'busIbn.libDescExcelWeb'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Distech',
			model: 'EC-gfxP300',
			type: 'Regler',
			short: 'DIS',
			descKey: 'busIbn.libDescEcgfx'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Schneider',
			model: 'SmartX AS-P',
			type: 'Regler',
			short: 'SCH',
			descKey: 'busIbn.libDescSmartX'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Trend',
			model: 'IQ412',
			type: 'Regler',
			short: 'TRD',
			descKey: 'busIbn.libDescIq'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetController',
			vendor: 'Beckhoff',
			model: 'CX5130',
			type: 'Regler',
			short: 'BEK',
			descKey: 'busIbn.libDescBeckhoff'
		},
		// ── BACnet MSTP room controllers ─────────────────────────────────────────
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'Sauter',
			model: 'ecos504',
			type: 'Raumreg.',
			short: 'SAU',
			descKey: 'busIbn.libDescRoomAuto4pipe'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'Siemens',
			model: 'DXR2.E12P',
			type: 'Raumreg.',
			short: 'SIE',
			descKey: 'busIbn.libDescDesigo'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'JCI',
			model: 'FEC26D05',
			type: 'Raumreg.',
			short: 'JCI',
			descKey: 'busIbn.libDescFancoil'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'Honeywell',
			model: 'T6861',
			type: 'Raumreg.',
			short: 'HON',
			descKey: 'busIbn.libDescHoneyRoom'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'Distech',
			model: 'EC-BOS-9',
			type: 'Raumreg.',
			short: 'DIS',
			descKey: 'busIbn.libDescEcBos'
		},
		// ── BACnet MSTP sensors ───────────────────────────────────────────────────
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Thermokon',
			model: 'SR04 P CO2',
			type: 'Sensor',
			short: 'THK',
			descKey: 'busIbn.libDescCo2TempRh'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Thermokon',
			model: 'SR04 P',
			type: 'Sensor',
			short: 'THK',
			descKey: 'busIbn.libDescTempSpStage'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatSensors',
			vendor: 'B.E.G.',
			model: 'PD11-BMS',
			type: 'Sensor',
			short: 'BEG',
			descKey: 'busIbn.libDescPresence'
		},
		// ── BACnet MSTP actuators ─────────────────────────────────────────────────
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Belimo',
			model: 'NMQ24A-BAC-L',
			type: 'Aktor',
			short: 'BEL',
			descKey: 'busIbn.libDescDamperBacnet72'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Belimo',
			model: 'LRQ24A-BAC-L',
			type: 'Aktor',
			short: 'BEL',
			descKey: 'busIbn.libDescDamperBacnet35'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Siemens',
			model: 'GDB..1E',
			type: 'Aktor',
			short: 'SIE',
			descKey: 'busIbn.libDescDamperBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Belimo',
			model: 'LMV-D3-MOD',
			type: 'VAV',
			short: 'BEL',
			descKey: 'busIbn.libDescVavBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Danfoss',
			model: 'NovoCon S',
			type: 'Aktor',
			short: 'DAN',
			descKey: 'busIbn.libDescNovoconBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Danfoss',
			model: 'NovoCon M',
			type: 'Aktor',
			short: 'DAN',
			descKey: 'busIbn.libDescNovoconBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Danfoss',
			model: 'NovoCon L',
			type: 'Aktor',
			short: 'DAN',
			descKey: 'busIbn.libDescNovoconBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Trox',
			model: 'X-CUBE',
			type: 'VAV',
			short: 'TRX',
			descKey: 'busIbn.libDescVavBacnet'
		},
		{
			busType: 'bacnet-mstp',
			catKey: 'busIbn.libCatBacnetActuator',
			vendor: 'Siemens',
			model: 'ASV..',
			type: 'VAV',
			short: 'SIE',
			descKey: 'busIbn.libDescVavBacnet'
		},
		// ── Modbus RTU meters ─────────────────────────────────────────────────────
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Janitza',
			model: 'UMG 96RM',
			type: 'Zähler',
			short: 'JAN',
			descKey: 'busIbn.libDescAnalyzerRtu'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Janitza',
			model: 'UMG 96RM-E',
			type: 'Zähler',
			short: 'JAN',
			descKey: 'busIbn.libDescAnalyzerEth'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Kamstrup',
			model: 'Multical 403',
			type: 'WMZ',
			short: 'KAM',
			descKey: 'busIbn.libDescHeatMeter'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Sontex',
			model: 'Supercal 5',
			type: 'WMZ',
			short: 'SOX',
			descKey: 'busIbn.libDescEnergyMeter'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Eastron',
			model: 'SDM630',
			type: 'Zähler',
			short: 'EAS',
			descKey: 'busIbn.libDescMeter3phase'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Carlo G.',
			model: 'EM24',
			type: 'Zähler',
			short: 'CG',
			descKey: 'busIbn.libDescMeter3phase'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'ABB',
			model: 'B24',
			type: 'Zähler',
			short: 'ABB',
			descKey: 'busIbn.libDescMeter3phase'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Schneider',
			model: 'iEM3455',
			type: 'Zähler',
			short: 'SCH',
			descKey: 'busIbn.libDescMeter3phase'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusMeter',
			vendor: 'Engelmann',
			model: 'Sensostar U',
			type: 'WMZ',
			short: 'ENG',
			descKey: 'busIbn.libDescHeatMeter'
		},
		// ── Modbus RTU sensors ────────────────────────────────────────────────────
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Vaisala',
			model: 'GMW91',
			type: 'Sensor',
			short: 'VAI',
			descKey: 'busIbn.libDescCo2Modbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Siemens',
			model: 'QAA2212',
			type: 'Sensor',
			short: 'SIE',
			descKey: 'busIbn.libDescRoomModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'S+S',
			model: 'FSFTF-Modbus',
			type: 'Sensor',
			short: 'SPS',
			descKey: 'busIbn.libDescDuctTemp'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'S+S',
			model: 'FUHF-Modbus',
			type: 'Sensor',
			short: 'SPS',
			descKey: 'busIbn.libDescDuctTempHum'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Siemens',
			model: 'QAM2301',
			type: 'Sensor',
			short: 'SIE',
			descKey: 'busIbn.libDescDuctTemp'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Siemens',
			model: 'QFM2100',
			type: 'Sensor',
			short: 'SIE',
			descKey: 'busIbn.libDescDuctTempHum'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatSensors',
			vendor: 'Siemens',
			model: 'QFA2060',
			type: 'Sensor',
			short: 'SIE',
			descKey: 'busIbn.libDescRoomCo2Modbus'
		},
		// ── Modbus RTU room controllers ───────────────────────────────────────────
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatRoomController',
			vendor: 'Sauter',
			model: 'EY-TC321',
			type: 'Raumreg.',
			short: 'SAU',
			descKey: 'busIbn.libDescSauterRoom'
		},
		// ── Modbus RTU drives / actuators ─────────────────────────────────────────
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Danfoss',
			model: 'FC 102',
			type: 'FU',
			short: 'DAN',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Danfoss',
			model: 'FC 202',
			type: 'FU',
			short: 'DAN',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Siemens',
			model: 'SINAMICS G120C',
			type: 'FU',
			short: 'SIE',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'ABB',
			model: 'ACS580',
			type: 'FU',
			short: 'ABB',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'ABB',
			model: 'ACS880',
			type: 'FU',
			short: 'ABB',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Schneider',
			model: 'ATV320',
			type: 'FU',
			short: 'SCH',
			descKey: 'busIbn.libDescVfdModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Grundfos',
			model: 'MAGNA3',
			type: 'Pumpe',
			short: 'GRU',
			descKey: 'busIbn.libDescPumpModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Wilo',
			model: 'Stratos MAXO',
			type: 'Pumpe',
			short: 'WIL',
			descKey: 'busIbn.libDescPumpModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'KSB',
			model: 'PumpDrive 2',
			type: 'Pumpe',
			short: 'KSB',
			descKey: 'busIbn.libDescPumpModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Belimo',
			model: 'NMQ24A-MOD',
			type: 'Aktor',
			short: 'BEL',
			descKey: 'busIbn.libDescDamperModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Belimo',
			model: 'NMV-D3-MOD',
			type: 'VAV',
			short: 'BEL',
			descKey: 'busIbn.libDescVavModbus'
		},
		{
			busType: 'modbus-rtu',
			catKey: 'busIbn.libCatModbusActuators',
			vendor: 'Danfoss',
			model: 'NovoCon M',
			type: 'Aktor',
			short: 'DAN',
			descKey: 'busIbn.libDescNovoconModbus'
		},
		// ── KNX ──────────────────────────────────────────────────────────────────
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'ABB',
			model: 'SA/S 8.16.6.1',
			type: 'Aktor',
			short: 'ABB',
			descKey: 'busIbn.libDescSwitchAct'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'ABB',
			model: 'UD/S 4.210.2.1',
			type: 'Aktor',
			short: 'ABB',
			descKey: 'busIbn.libDescKnxDim'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'ABB',
			model: 'M2T/8.16.1',
			type: 'Aktor',
			short: 'ABB',
			descKey: 'busIbn.libDescKnxDimCh'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'MDT',
			model: 'JAL-0810M.02',
			type: 'Aktor',
			short: 'MDT',
			descKey: 'busIbn.libDescBlindsAct'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'MDT',
			model: 'SCN-RT4UP.02',
			type: 'Raumger.',
			short: 'MDT',
			descKey: 'busIbn.libDescKnxThermostat'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'Gira',
			model: '1094 00',
			type: 'Aktor',
			short: 'GIR',
			descKey: 'busIbn.libDescKnxHeating'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'Siemens',
			model: 'QMX3.P37',
			type: 'Raumger.',
			short: 'SIE',
			descKey: 'busIbn.libDescKnxRoom'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'Theben',
			model: 'SENSE 180 KNX',
			type: 'Sensor',
			short: 'THE',
			descKey: 'busIbn.libDescKnxMotion'
		},
		{
			busType: 'knx',
			catKey: 'busIbn.libCatKnxActuators',
			vendor: 'Jung',
			model: '2118 REG-plus',
			type: 'Raumger.',
			short: 'JNG',
			descKey: 'busIbn.libDescKnxThermostat'
		},
		// ── Analog (Brandschutz) ──────────────────────────────────────────────────
		{
			busType: 'analog',
			catKey: 'busIbn.libCatBsk',
			vendor: 'Belimo',
			model: 'FSNF 24 A',
			type: 'BSK',
			short: 'BEL',
			descKey: 'busIbn.libDescBskSpring'
		},
		{
			busType: 'analog',
			catKey: 'busIbn.libCatBsk',
			vendor: 'Belimo',
			model: 'FSTF 24 A',
			type: 'BSK',
			short: 'BEL',
			descKey: 'busIbn.libDescBskThermoFuse'
		},
		{
			busType: 'analog',
			catKey: 'busIbn.libCatBsk',
			vendor: 'Belimo',
			model: 'FSAF 24 A',
			type: 'BSK',
			short: 'BEL',
			descKey: 'busIbn.libDescBskSpring'
		}
	];
	const DEVICE_LIBRARY = $derived(
		DEVICE_LIBRARY_RAW.map((d) => ({
			...d,
			cat: $_(d.catKey),
			desc: $_(d.descKey)
		})) as LibraryItem[]
	);

	// ── Helpers ───────────────────────────────────────────────────────────────

	function isBacnet(type: BusType): boolean {
		return type === 'bacnet-mstp' || type === 'bacnet-ip';
	}
	function intOnly(e: KeyboardEvent) {
		if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
	}
	function asMstp(s: SegmentSettings): MstpSettings {
		return s as MstpSettings;
	}
	function asIp(s: SegmentSettings): BacnetIpSettings {
		return s as BacnetIpSettings;
	}
	function asModbus(s: SegmentSettings): ModbusSettings {
		return s as ModbusSettings;
	}
	function asKnx(s: SegmentSettings): KnxSettings {
		return s as KnxSettings;
	}

	function formatDate(ts: number): string {
		return new Date(ts).toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function defaultSettings(type: BusType): SegmentSettings {
		switch (type) {
			case 'bacnet-mstp':
				return { baud: 9600, maxMasters: 127, maxInfoFrames: 1, apduTimeout: 3000, apduRetries: 3 };
			case 'bacnet-ip':
				return { subnet: '192.168.1.0/24', port: 47808, broadcastAddr: '192.168.1.255', bbmd: '' };
			case 'modbus-rtu':
				return { baud: 9600, parity: 'E', stopBits: 1 };
			case 'knx':
				return { topology: '1.1', medium: 'TP' };
		}
	}

	// Akzeptiert unvalidiertes JSON aus localStorage/Import
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function normalizeDevice(d: any): BusDevice {
		return {
			id: d.id ?? crypto.randomUUID(),
			name: d.name ?? '',
			deviceType: d.deviceType ?? '',
			manufacturer: d.manufacturer ?? '',
			model: d.model ?? '',
			address: d.address ?? 1,
			macLocked: d.macLocked ?? false,
			deviceInstance: d.deviceInstance ?? 0,
			diLocked: d.diLocked ?? false,
			status: d.status ?? 'planned',
			group: d.group ?? '',
			notes: d.notes ?? ''
		};
	}

	// Akzeptiert unvalidiertes JSON aus localStorage/Import
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function normalizeProject(p: any): BusProject {
		return {
			id: p.id ?? crypto.randomUUID(),
			name: p.name ?? 'Neues Projekt',
			site: p.site ?? '',
			engineer: p.engineer ?? '',
			version: p.version ?? '1.0',
			createdAt: p.createdAt ?? Date.now(),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			segments: (p.segments ?? []).map((s: any) => ({
				id: s.id ?? crypto.randomUUID(),
				name: s.name ?? 'Segment',
				description: s.description ?? '',
				type: s.type ?? 'bacnet-mstp',
				settings: s.settings ?? defaultSettings(s.type ?? 'bacnet-mstp'),
				devices: (s.devices ?? []).map(normalizeDevice),
				settingsOpen: false,
				diOffset: s.diOffset ?? 100000,
				diAuto: s.diAuto ?? true,
				diSchema: s.diSchema ?? false,
				diSS: s.diSS ?? 10,
				diBB: s.diBB ?? 1,
				startAddress: s.startAddress ?? 1
			}))
		};
	}

	function newProject(): BusProject {
		return {
			id: crypto.randomUUID(),
			name: 'Neues Projekt',
			site: '',
			engineer: '',
			version: '1.0',
			createdAt: Date.now(),
			segments: []
		};
	}

	function loadProject(): BusProject {
		if (!browser) return newProject();
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return normalizeProject(JSON.parse(raw));
		} catch {
			/* ignore */
		}
		return newProject();
	}

	function loadPrefs(): { showAddressMap: boolean; groupBy: GroupBy } {
		if (!browser) return { showAddressMap: true, groupBy: 'none' };
		try {
			const raw = localStorage.getItem(PREFS_KEY);
			if (raw) {
				const p = JSON.parse(raw);
				return {
					showAddressMap: p.showAddressMap ?? true,
					groupBy: p.groupBy ?? 'none'
				};
			}
		} catch {
			/* ignore */
		}
		return { showAddressMap: true, groupBy: 'none' };
	}

	function nextFreeAddress(seg: BusSegment): number {
		const range = ADDR_RANGE[seg.type];
		const used = new Set(seg.devices.map((d) => d.address));
		let addr = Math.max(seg.startAddress, range.min);
		while (used.has(addr) && addr <= range.max) addr++;
		return Math.min(addr, range.max);
	}

	function newDevice(seg: BusSegment): BusDevice {
		const addr = nextFreeAddress(seg);
		return {
			id: crypto.randomUUID(),
			name: '',
			deviceType: '',
			manufacturer: '',
			model: '',
			address: addr,
			macLocked: false,
			deviceInstance: seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0,
			diLocked: false,
			status: 'planned',
			group: '',
			notes: ''
		};
	}

	// ── State ─────────────────────────────────────────────────────────────────

	let project = $state<BusProject>(loadProject());
	let showAddSegment = $state(false);
	let addSegType = $state<BusType>('bacnet-mstp');

	type SortKey = 'address' | 'deviceInstance' | 'name' | null;
	type SortDir = 'asc' | 'desc';
	let sortState = $state<Record<string, { key: SortKey; dir: SortDir }>>({});

	// Selection per segment: segId → array of devIds
	let selDevices = $state<Record<string, string[]>>({});
	// Library
	let libraryOpen = $state(false);
	let libraryQuery = $state('');
	let libraryTargetSegId = $state<string | null>(null);
	let libraryFilterBus = $state<BusType | 'analog' | 'all'>('all');
	// Display options — restored from prefs
	const _prefs = loadPrefs();
	let showAddressMap = $state(_prefs.showAddressMap);
	let groupBy = $state<GroupBy>(_prefs.groupBy);

	// ── Persistence ───────────────────────────────────────────────────────────

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
	});

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(PREFS_KEY, JSON.stringify({ showAddressMap, groupBy }));
	});

	// Keep bulkState in sync with segments
	// Initialer Snapshot beim Component-Mount — Aenderungen werden via $effect unten getrackt
	const initBulk: Record<string, BulkState> = {};
	// svelte-ignore state_referenced_locally
	for (const seg of project.segments) initBulk[seg.id] = defaultBulkState();
	let bulkState = $state<Record<string, BulkState>>(initBulk);
	$effect(() => {
		for (const seg of project.segments) {
			if (!(seg.id in bulkState)) bulkState[seg.id] = defaultBulkState();
		}
	});

	// ── Sort ─────────────────────────────────────────────────────────────────

	function getSort(segId: string) {
		return sortState[segId] ?? { key: null, dir: 'asc' };
	}
	function toggleSort(segId: string, key: SortKey) {
		const cur = getSort(segId);
		sortState[segId] = { key, dir: cur.key === key && cur.dir === 'asc' ? 'desc' : 'asc' };
	}
	function sortIcon(segId: string, key: SortKey): string {
		const s = getSort(segId);
		if (s.key !== key) return '↕';
		return s.dir === 'asc' ? '↑' : '↓';
	}
	function sortedDevices(seg: BusSegment): BusDevice[] {
		const { key, dir } = getSort(seg.id);
		if (!key) return seg.devices;
		return [...seg.devices].sort((a, b) => {
			let av: number | string, bv: number | string;
			if (key === 'address') {
				av = a.address;
				bv = b.address;
			} else if (key === 'deviceInstance') {
				av = effectiveDI(seg, a);
				bv = effectiveDI(seg, b);
			} else {
				av = a.name.toLowerCase();
				bv = b.name.toLowerCase();
			}
			const cmp = av < bv ? -1 : av > bv ? 1 : 0;
			return dir === 'asc' ? cmp : -cmp;
		});
	}

	// ── Grouping ──────────────────────────────────────────────────────────────

	function getGroups(seg: BusSegment): { key: string | null; devices: BusDevice[] }[] {
		const sorted = sortedDevices(seg);
		if (groupBy === 'none') return [{ key: null, devices: sorted }];
		// Lokales Map, Ergebnis wird zu Array konvertiert — keine Reaktivitaet noetig
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const map = new Map<string, BusDevice[]>();
		for (const dev of sorted) {
			const k =
				(groupBy === 'group'
					? dev.group
					: groupBy === 'deviceType'
						? dev.deviceType
						: dev.manufacturer) || '— Ohne Gruppe';
			if (!map.has(k)) map.set(k, []);
			map.get(k)!.push(dev);
		}
		return Array.from(map, ([key, devices]) => ({ key, devices }));
	}

	// ── Selection ─────────────────────────────────────────────────────────────

	function isSelected(segId: string, devId: string): boolean {
		return (selDevices[segId] ?? []).includes(devId);
	}
	function toggleSel(segId: string, devId: string) {
		const cur = selDevices[segId] ?? [];
		selDevices[segId] = cur.includes(devId) ? cur.filter((id) => id !== devId) : [...cur, devId];
	}
	function getSelCount(segId: string): number {
		return (selDevices[segId] ?? []).length;
	}
	function clearSel(segId: string) {
		selDevices[segId] = [];
	}
	function selectAll(seg: BusSegment) {
		selDevices[seg.id] = seg.devices.map((d) => d.id);
	}
	function isAllSelected(seg: BusSegment): boolean {
		const sel = selDevices[seg.id] ?? [];
		return seg.devices.length > 0 && sel.length === seg.devices.length;
	}
	function fillDown(
		seg: BusSegment,
		key: keyof Pick<BusDevice, 'manufacturer' | 'model' | 'group' | 'deviceType'>
	) {
		const ids = selDevices[seg.id] ?? [];
		if (ids.length < 2) return;
		const first = sortedDevices(seg).find((d) => ids.includes(d.id));
		if (!first) return;
		const val = first[key];
		for (const dev of seg.devices) {
			if (ids.includes(dev.id) && dev.id !== first.id) dev[key] = val;
		}
	}
	function bulkDeleteSelected(seg: BusSegment) {
		const ids = selDevices[seg.id] ?? [];
		seg.devices = seg.devices.filter((d) => !ids.includes(d.id));
		selDevices[seg.id] = [];
	}

	// ── Conflict detection ────────────────────────────────────────────────────

	function effectiveDI(seg: BusSegment, dev: BusDevice): number {
		if (dev.diLocked || !isBacnet(seg.type)) return dev.deviceInstance;
		if (!seg.diAuto) return dev.deviceInstance;
		if (seg.diSchema) {
			const ss = Math.max(0, Math.min(99, seg.diSS));
			const bb = Math.max(0, Math.min(99, seg.diBB));
			return ss * 100000 + bb * 1000 + dev.address;
		}
		return seg.diOffset + dev.address;
	}
	function diIsAuto(seg: BusSegment, dev: BusDevice): boolean {
		return isBacnet(seg.type) && seg.diAuto && !dev.diLocked;
	}
	function schemaDIPreview(seg: BusSegment, mac: number): string {
		const ss = String(Math.max(0, Math.min(99, seg.diSS))).padStart(2, '0');
		const bb = String(Math.max(0, Math.min(99, seg.diBB))).padStart(2, '0');
		const mmm = String(mac).padStart(3, '0');
		return `${ss}${bb}${mmm}`;
	}
	const dupDeviceInstances = $derived.by(() => {
		// Lokale Map nur innerhalb dieser derived-Berechnung — Mutation wird nicht extern beobachtet
		/* eslint-disable svelte/prefer-svelte-reactivity */
		const seen = new Map<number, number>();
		for (const seg of project.segments) {
			if (!isBacnet(seg.type)) continue;
			for (const dev of seg.devices) {
				const di = effectiveDI(seg, dev);
				if (di <= 0) continue;
				seen.set(di, (seen.get(di) ?? 0) + 1);
			}
		}
		const dups = new Set<number>();
		for (const [inst, cnt] of seen) if (cnt > 1) dups.add(inst);
		/* eslint-enable svelte/prefer-svelte-reactivity */
		return dups;
	});
	function dupAddressesInSegment(seg: BusSegment): Set<number> {
		/* eslint-disable svelte/prefer-svelte-reactivity */
		const seen = new Map<number, number>();
		for (const dev of seg.devices) seen.set(dev.address, (seen.get(dev.address) ?? 0) + 1);
		const dups = new Set<number>();
		for (const [addr, count] of seen) if (count > 1) dups.add(addr);
		/* eslint-enable svelte/prefer-svelte-reactivity */
		return dups;
	}
	const hasConflicts = $derived.by(() => {
		if (dupDeviceInstances.size > 0) return true;
		for (const seg of project.segments) if (dupAddressesInSegment(seg).size > 0) return true;
		return false;
	});

	// ── Segment actions ───────────────────────────────────────────────────────

	function addSegment() {
		const idx = project.segments.length + 1;
		project.segments.push({
			id: crypto.randomUUID(),
			name: `${BUS_LABELS[addSegType]} Segment ${idx}`,
			description: '',
			type: addSegType,
			settings: defaultSettings(addSegType),
			devices: [],
			settingsOpen: true,
			diOffset: isBacnet(addSegType) ? idx * 100000 : 0,
			diAuto: true,
			startAddress: ADDR_RANGE[addSegType].min,
			diSchema: false,
			diSS: 10,
			diBB: 1
		});
		showAddSegment = false;
	}
	function removeSegment(segId: string) {
		project.segments = project.segments.filter((s) => s.id !== segId);
	}

	// ── Device actions ────────────────────────────────────────────────────────

	function addDevice(seg: BusSegment) {
		seg.devices.push(newDevice(seg));
	}
	function removeDevice(seg: BusSegment, devId: string) {
		seg.devices = seg.devices.filter((d) => d.id !== devId);
	}

	function duplicateDevice(seg: BusSegment, devId: string) {
		const src = seg.devices.find((d) => d.id === devId);
		if (!src) return;
		const addr = nextFreeAddress(seg);
		seg.devices.push({
			...src,
			id: crypto.randomUUID(),
			address: addr,
			macLocked: false,
			deviceInstance: seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0,
			diLocked: false,
			status: 'planned',
			notes: ''
		});
	}

	function macAdj(seg: BusSegment, dev: BusDevice, delta: number) {
		const range = ADDR_RANGE[seg.type];
		dev.address = Math.max(range.min, Math.min(range.max, dev.address + delta));
	}

	function cycleStatus(dev: BusDevice) {
		const idx = STATUS_ORDER.indexOf(dev.status ?? 'planned');
		dev.status = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
	}

	// ── Library ───────────────────────────────────────────────────────────────

	const filteredLibrary = $derived.by(() => {
		const q = libraryQuery.toLowerCase();
		let items = DEVICE_LIBRARY;
		if (libraryFilterBus !== 'all') items = items.filter((d) => d.busType === libraryFilterBus);
		if (q)
			items = items.filter((d) =>
				`${d.vendor} ${d.model} ${d.type} ${d.cat}`.toLowerCase().includes(q)
			);
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const map = new Map<string, LibraryItem[]>();
		for (const item of items) {
			if (!map.has(item.cat)) map.set(item.cat, []);
			map.get(item.cat)!.push(item);
		}
		return Array.from(map, ([cat, items]) => ({ cat, items }));
	});

	function addFromLibrary(item: LibraryItem) {
		const targetId = libraryTargetSegId ?? project.segments[0]?.id;
		if (!targetId) return;
		const seg = project.segments.find((s) => s.id === targetId);
		if (!seg) return;
		const addr = nextFreeAddress(seg);
		seg.devices.push({
			id: crypto.randomUUID(),
			name: '',
			deviceType: item.type,
			manufacturer: item.vendor,
			model: item.model,
			address: addr,
			macLocked: false,
			deviceInstance: seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0,
			diLocked: false,
			status: 'planned',
			group: '',
			notes: ''
		});
	}

	function openLibraryFor(segId: string) {
		libraryTargetSegId = segId;
		const seg = project.segments.find((s) => s.id === segId);
		libraryFilterBus = seg ? (seg.type as BusType) : 'all';
		libraryOpen = true;
	}

	// ── Import / Export ──────────────────────────────────────────────────────

	function downloadFile(filename: string, content: string, mime: string) {
		const blob = new Blob(['﻿' + content], { type: mime }); // BOM for Excel UTF-8
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function csvQ(s: string | number): string {
		const str = String(s ?? '');
		return str.includes(',') || str.includes('"') || str.includes('\n')
			? '"' + str.replace(/"/g, '""') + '"'
			: str;
	}

	function exportAllCSV() {
		const hdr = get(_)('busIbn.csvHeaderAll');
		const lines = [hdr];
		for (const seg of project.segments) {
			for (const dev of sortedDevices(seg)) {
				lines.push(
					[
						csvQ(seg.name),
						csvQ(BUS_LABELS[seg.type]),
						dev.address,
						csvQ(dev.name),
						csvQ(dev.deviceType),
						csvQ(dev.manufacturer),
						csvQ(dev.model),
						csvQ(dev.group),
						isBacnet(seg.type) ? effectiveDI(seg, dev) : '',
						dev.status ?? 'planned',
						csvQ(dev.notes)
					].join(';')
				);
			}
		}
		downloadFile(
			`${project.name.replace(/[^\w]/g, '_')}_bus-ibn.csv`,
			lines.join('\r\n'),
			'text/csv;charset=utf-8'
		);
	}

	function exportSegmentCSV(seg: BusSegment) {
		const hdr = get(_)('busIbn.csvHeaderSeg');
		const lines = [hdr];
		for (const dev of sortedDevices(seg)) {
			lines.push(
				[
					dev.address,
					csvQ(dev.name),
					csvQ(dev.deviceType),
					csvQ(dev.manufacturer),
					csvQ(dev.model),
					csvQ(dev.group),
					isBacnet(seg.type) ? effectiveDI(seg, dev) : '',
					dev.status ?? 'planned',
					csvQ(dev.notes)
				].join(';')
			);
		}
		downloadFile(
			`${seg.name.replace(/[^\w]/g, '_')}.csv`,
			lines.join('\r\n'),
			'text/csv;charset=utf-8'
		);
	}

	function exportJSON() {
		downloadFile(
			`${project.name.replace(/[^\w]/g, '_')}_bus-ibn.json`,
			JSON.stringify(project, null, 2),
			'application/json'
		);
	}

	// CSV import
	interface ImportRow {
		mac: number;
		name: string;
		deviceType: string;
		manufacturer: string;
		model: string;
		group: string;
		deviceInstance: number;
		status: DeviceStatus;
		notes: string;
		valid: boolean;
	}
	interface ImportState {
		open: boolean;
		targetSegId: string;
		rows: ImportRow[];
		filename: string;
		error: string;
	}
	let importState = $state<ImportState>({
		open: false,
		targetSegId: '',
		rows: [],
		filename: '',
		error: ''
	});

	function parseLine(line: string, sep: string): string[] {
		const result: string[] = [];
		let cur = '',
			inQ = false;
		for (const ch of line) {
			if (ch === '"') inQ = !inQ;
			else if (ch === sep && !inQ) {
				result.push(cur.trim());
				cur = '';
			} else cur += ch;
		}
		result.push(cur.trim());
		return result;
	}

	function handleCSVFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			try {
				const text = (ev.target!.result as string).replace(/^\uFEFF/, ''); // strip BOM
				const lines = text.split(/\r?\n/).filter((l) => l.trim());
				if (lines.length < 2) {
					importState.error = get(_)('busIbn.importFileEmpty');
					return;
				}
				// detect separator: ; or ,
				const sep = lines[0].includes(';') ? ';' : ',';
				const hdr = parseLine(lines[0], sep).map((h) => h.toLowerCase().replace(/[^a-z]/g, ''));
				const col = (terms: string[]) => hdr.findIndex((h) => terms.some((t) => h.includes(t)));
				const macIdx = col(['mac', 'adresse', 'adress', 'slaveid', 'id', 'address']);
				if (macIdx < 0) {
					importState.error = get(_)('busIbn.noMacColumn');
					return;
				}
				const nameIdx = col(['name', 'gert', 'device']);
				const typeIdx = col(['typ', 'type']);
				const mfrIdx = col(['hersteller', 'vendor', 'manuf']);
				const modelIdx = col(['modell', 'model']);
				const groupIdx = col(['gruppe', 'group', 'bereich', 'area']);
				const diIdx = col(['instance', 'di']);
				const statIdx = col(['status']);
				const noteIdx = col(['notiz', 'note']);
				const rows: ImportRow[] = [];
				for (let i = 1; i < lines.length; i++) {
					const c = parseLine(lines[i], sep);
					const mac = parseInt(c[macIdx] ?? '', 10);
					if (isNaN(mac)) continue;
					const raw = (c[statIdx] ?? '').toLowerCase().trim();
					const status = (
						['planned', 'configured', 'online', 'error'].includes(raw) ? raw : 'planned'
					) as DeviceStatus;
					rows.push({
						mac,
						name: c[nameIdx] ?? '',
						deviceType: c[typeIdx] ?? '',
						manufacturer: c[mfrIdx] ?? '',
						model: c[modelIdx] ?? '',
						group: c[groupIdx] ?? '',
						deviceInstance: parseInt(c[diIdx] ?? '', 10) || 0,
						status,
						notes: c[noteIdx] ?? '',
						valid: mac >= 0 && mac <= 255
					});
				}
				if (!rows.length) {
					importState.error = get(_)('busIbn.noValidRows');
					return;
				}
				importState.rows = rows;
				importState.filename = file.name;
				importState.error = '';
				if (!importState.targetSegId) importState.targetSegId = project.segments[0]?.id ?? '';
				importState.open = true;
			} catch {
				importState.error = 'Fehler beim Lesen.';
			}
		};
		reader.readAsText(file, 'UTF-8');
		(e.target as HTMLInputElement).value = '';
	}

	function confirmImport() {
		const seg = project.segments.find((s) => s.id === importState.targetSegId);
		if (!seg) return;
		for (const row of importState.rows.filter((r) => r.valid)) {
			const existing = seg.devices.find((d) => d.address === row.mac);
			if (existing) {
				if (row.name) existing.name = row.name;
				if (row.deviceType) existing.deviceType = row.deviceType;
				if (row.manufacturer) existing.manufacturer = row.manufacturer;
				if (row.model) existing.model = row.model;
				if (row.group) existing.group = row.group;
				if (row.notes) existing.notes = row.notes;
				existing.status = row.status;
			} else {
				const di = seg.diAuto && isBacnet(seg.type) ? seg.diOffset + row.mac : row.deviceInstance;
				seg.devices.push({
					id: crypto.randomUUID(),
					name: row.name,
					deviceType: row.deviceType,
					manufacturer: row.manufacturer,
					model: row.model,
					address: row.mac,
					macLocked: false,
					deviceInstance: di,
					diLocked: row.deviceInstance > 0 && !seg.diAuto,
					status: row.status,
					group: row.group,
					notes: row.notes
				});
			}
		}
		importState.open = false;
	}

	function handleJSONFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			try {
				project = normalizeProject(JSON.parse(ev.target!.result as string));
			} catch {
				alert(get(_)('busIbn.invalidJson'));
			}
		};
		reader.readAsText(file, 'UTF-8');
		(e.target as HTMLInputElement).value = '';
	}

	// ── Bulk add ──────────────────────────────────────────────────────────────

	interface BulkState {
		open: boolean;
		count: number;
		startAddr: number;
		prefix: string;
		startNum: number;
		padWidth: number;
		deviceType: string;
		manufacturer: string;
		model: string;
	}
	function defaultBulkState(): BulkState {
		return {
			open: false,
			count: 5,
			startAddr: 1,
			prefix: '',
			startNum: 1,
			padWidth: 2,
			deviceType: '',
			manufacturer: '',
			model: ''
		};
	}
	function getBulk(segId: string): BulkState {
		return bulkState[segId] ?? defaultBulkState();
	}
	function openBulk(seg: BusSegment) {
		if (!bulkState[seg.id]) bulkState[seg.id] = defaultBulkState();
		bulkState[seg.id].startAddr = nextFreeAddress(seg);
		bulkState[seg.id].open = true;
	}
	function bulkPreview(
		seg: BusSegment
	): { addr: number; name: string; di: number; conflict: boolean }[] {
		const b = getBulk(seg.id);
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const used = new Set(seg.devices.map((d) => d.address));
		const range = ADDR_RANGE[seg.type];
		const preview: { addr: number; name: string; di: number; conflict: boolean }[] = [];
		let addr = Math.max(b.startAddr, range.min);
		for (let i = 0; i < b.count; i++) {
			while (used.has(addr) && addr <= range.max) addr++;
			if (addr > range.max) break;
			const num = b.startNum + i;
			const suffix = b.padWidth > 0 ? String(num).padStart(b.padWidth, '0') : String(num);
			const name = b.prefix ? `${b.prefix} ${suffix}` : '';
			const di = seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0;
			preview.push({ addr, name, di, conflict: false });
			used.add(addr);
			addr++;
		}
		const existingDIs = new Set(
			project.segments.flatMap((s) =>
				isBacnet(s.type) ? s.devices.map((d) => effectiveDI(s, d)) : []
			)
		);
		for (const p of preview) {
			if (p.di > 0 && existingDIs.has(p.di)) p.conflict = true;
		}
		return preview;
	}
	function confirmBulk(seg: BusSegment) {
		const b = bulkState[seg.id];
		if (!b) return;
		for (const p of bulkPreview(seg)) {
			seg.devices.push({
				id: crypto.randomUUID(),
				name: p.name,
				deviceType: b.deviceType,
				manufacturer: b.manufacturer,
				model: b.model,
				address: p.addr,
				macLocked: false,
				deviceInstance: p.di,
				diLocked: false,
				status: 'planned',
				group: '',
				notes: ''
			});
		}
		b.open = false;
	}

	function printNow() {
		window.print();
	}

	function colCount(seg: BusSegment): number {
		return isBacnet(seg.type) ? 11 : 10;
	}
</script>

<!-- ── Print header ──────────────────────────────────────────────────────── -->
<div class="print-only print-header">
	<div class="print-title">{project.name}</div>
	<div class="print-meta">
		<span>{$_('busIbn.site')}: {project.site || '—'}</span>
		<span>{$_('busIbn.engineer')}: {project.engineer || '—'}</span>
		<span>{$_('busIbn.version')}: {project.version}</span>
		<span>{$_('busIbn.date')}: {formatDate(project.createdAt)}</span>
	</div>
	<div class="print-subtitle">{$_('busIbn.printTitle')}</div>
</div>

<!-- ── Page ──────────────────────────────────────────────────────────────── -->
<div class="page">
	<a href="/rechner" class="calc-back no-print">
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg
		>
		{$_('common.allCalculators')}
	</a>

	<div class="calc-title-row no-print">
		<h1 class="page-title">{$_('busIbn.title')}</h1>
		<FavButton type="rechner" slug="bus-ibn" title={$_('busIbn.title')} size={20} />
	</div>
	<p class="page-sub no-print">{$_('busIbn.subtitle')}</p>

	<!-- ── Toolbar ── -->
	<div class="toolbar no-print">
		<button
			type="button"
			class="toolbar-btn"
			onclick={() => {
				libraryTargetSegId = project.segments[0]?.id ?? null;
				libraryFilterBus = 'all';
				libraryOpen = true;
			}}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><rect x="2" y="3" width="7" height="18" rx="1" /><rect
					x="9"
					y="3"
					width="7"
					height="18"
					rx="1"
				/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
			>
			{$_('busIbn.libraryTitle')}
		</button>
		<div class="toolbar-sep"></div>
		<label class="toolbar-toggle">
			<input type="checkbox" bind:checked={showAddressMap} />
			{$_('busIbn.addrMapTitle').split('·')[0].trim()}
		</label>
		<div class="toolbar-sep"></div>
		<span class="toolbar-label">{$_('busIbn.groupBy')}</span>
		<select class="toolbar-select" bind:value={groupBy}>
			<option value="none">{$_('busIbn.groupNone')}</option>
			<option value="group">{$_('busIbn.groupArea')}</option>
			<option value="deviceType">{$_('busIbn.groupDeviceType')}</option>
			<option value="manufacturer">{$_('busIbn.groupManufacturer')}</option>
		</select>
		<div style="flex:1"></div>
		<!-- Import -->
		<label class="toolbar-btn" title={$_('busIbn.importCsv')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
				/></svg
			>
			CSV
			<input type="file" accept=".csv,.txt" onchange={handleCSVFile} style="display:none" />
		</label>
		<label class="toolbar-btn" title={$_('busIbn.importJson')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
				/></svg
			>
			JSON
			<input type="file" accept=".json" onchange={handleJSONFile} style="display:none" />
		</label>
		<div class="toolbar-sep"></div>
		<!-- Export -->
		<button type="button" class="toolbar-btn" onclick={exportAllCSV} title={$_('busIbn.exportCsv')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
				/></svg
			>
			CSV
		</button>
		<button type="button" class="toolbar-btn" onclick={exportJSON} title={$_('busIbn.exportJson')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
				/></svg
			>
			JSON
		</button>
		<div class="toolbar-sep"></div>
		<button type="button" class="btn-print" onclick={printNow}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="6 9 6 2 18 2 18 9" /><path
					d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
				/><rect x="6" y="14" width="12" height="8" /></svg
			>
			Print
		</button>
	</div>

	<!-- ── Project header ── -->
	<div class="project-header">
		<div class="project-fields">
			<div class="project-field">
				<label class="project-label" for="proj-name">{$_('busIbn.projectName')}</label>
				<input
					id="proj-name"
					class="project-input"
					type="text"
					bind:value={project.name}
					placeholder={$_('busIbn.projectNamePlaceholder')}
				/>
			</div>
			<div class="project-field">
				<label class="project-label" for="proj-site">{$_('busIbn.site')}</label>
				<input
					id="proj-site"
					class="project-input"
					type="text"
					bind:value={project.site}
					placeholder={$_('busIbn.sitePlaceholder')}
				/>
			</div>
			<div class="project-field">
				<label class="project-label" for="proj-eng">{$_('busIbn.engineer')}</label>
				<input
					id="proj-eng"
					class="project-input"
					type="text"
					bind:value={project.engineer}
					placeholder={$_('busIbn.engineerPlaceholder')}
				/>
			</div>
			<div class="project-field">
				<label class="project-label" for="proj-ver">{$_('busIbn.version')}</label>
				<input
					id="proj-ver"
					class="project-input"
					type="text"
					bind:value={project.version}
					placeholder="1.0"
					style="width:70px"
				/>
			</div>
			<div class="project-field">
				<span class="project-label">{$_('busIbn.date')}</span>
				<span class="project-date">{formatDate(project.createdAt)}</span>
			</div>
		</div>
	</div>

	<!-- ── Segments ── -->
	{#each project.segments as seg (seg.id)}
		{@const dupAddr = dupAddressesInSegment(seg)}
		{@const selCount = getSelCount(seg.id)}
		<div class="segment">
			<!-- Segment header -->
			<div class="seg-header">
				<span
					class="type-badge"
					style="background:{BUS_COLORS[seg.type]}22;color:{BUS_COLORS[
						seg.type
					]};border-color:{BUS_COLORS[seg.type]}44"
				>
					{BUS_LABELS[seg.type]}
				</span>
				<input
					class="seg-name-input"
					type="text"
					bind:value={seg.name}
					placeholder={$_('busIbn.segmentNamePlaceholder')}
				/>
				<span class="seg-head-sep">·</span>
				<input
					class="seg-desc-input"
					type="text"
					bind:value={seg.description}
					placeholder={$_('busIbn.segmentDescPlaceholder')}
				/>
				<div class="seg-header-actions no-print">
					<button
						type="button"
						class="btn-icon"
						title={$_('busIbn.exportSegmentCsv')}
						onclick={() => exportSegmentCSV(seg)}
					>
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
								d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
							/></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon"
						title={$_('busIbn.addFromLibrary')}
						onclick={() => openLibraryFor(seg.id)}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><rect x="2" y="3" width="7" height="18" rx="1" /><rect
								x="9"
								y="3"
								width="7"
								height="18"
								rx="1"
							/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon"
						onclick={() => (seg.settingsOpen = !seg.settingsOpen)}
						title={$_('busIbn.segmentSettings')}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><circle cx="12" cy="12" r="3" /><path
								d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
							/></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon btn-icon--danger"
						onclick={() => removeSegment(seg.id)}
						title={$_('busIbn.deleteSegment')}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="3 6 5 6 21 6" /><path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
							/></svg
						>
					</button>
				</div>
			</div>

			<!-- Settings panel -->
			{#if seg.settingsOpen}
				<div class="seg-settings no-print">
					{#if seg.type === 'bacnet-mstp'}
						{@const s = asMstp(seg.settings)}
						<div class="settings-grid">
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.baudrate')}</span>
								<select class="settings-select" bind:value={s.baud}
									>{#each BAUD_OPTIONS as b (b)}<option value={b}>{b}</option>{/each}</select
								>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.maxMasters')}</span>
								<input
									class="settings-input"
									type="number"
									min="1"
									max="127"
									bind:value={s.maxMasters}
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.maxInfoFrames')}</span>
								<input
									class="settings-input"
									type="number"
									min="1"
									max="255"
									bind:value={s.maxInfoFrames}
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.apduTimeout')}</span>
								<input
									class="settings-input"
									type="number"
									min="100"
									max="60000"
									step="100"
									bind:value={s.apduTimeout}
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.apduRetries')}</span>
								<input
									class="settings-input"
									type="number"
									min="0"
									max="10"
									bind:value={s.apduRetries}
								/>
							</label>
						</div>
					{:else if seg.type === 'bacnet-ip'}
						{@const s = asIp(seg.settings)}
						<div class="settings-grid">
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.subnet')}</span>
								<input
									class="settings-input"
									type="text"
									bind:value={s.subnet}
									placeholder={$_('busIbn.subnetPlaceholder')}
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.udpPort')}</span>
								<input
									class="settings-input"
									type="number"
									min="1"
									max="65535"
									bind:value={s.port}
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.broadcast')}</span>
								<input class="settings-input" type="text" bind:value={s.broadcastAddr} />
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.bbmd')}</span>
								<input
									class="settings-input"
									type="text"
									bind:value={s.bbmd}
									placeholder={$_('busIbn.bbmdPlaceholder')}
								/>
							</label>
						</div>
					{:else if seg.type === 'modbus-rtu'}
						{@const s = asModbus(seg.settings)}
						<div class="settings-grid">
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.baudrate')}</span>
								<select class="settings-select" bind:value={s.baud}
									>{#each BAUD_OPTIONS as b (b)}<option value={b}>{b}</option>{/each}</select
								>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.parity')}</span>
								<select class="settings-select" bind:value={s.parity}
									><option value="N">{$_('busIbn.parityNone')}</option><option value="E"
										>{$_('busIbn.parityEven')}</option
									><option value="O">{$_('busIbn.parityOdd')}</option></select
								>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.stopBits')}</span>
								<select class="settings-select" bind:value={s.stopBits}
									><option value={1}>1</option><option value={2}>2</option></select
								>
							</label>
						</div>
					{:else if seg.type === 'knx'}
						{@const s = asKnx(seg.settings)}
						<div class="settings-grid">
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.topology')}</span>
								<input
									class="settings-input"
									type="text"
									bind:value={s.topology}
									placeholder="1.1"
								/>
							</label>
							<label class="settings-field">
								<span class="settings-label">{$_('busIbn.medium')}</span>
								<select class="settings-select" bind:value={s.medium}
									><option value="TP">{$_('busIbn.mediumTP')}</option><option value="IP"
										>{$_('busIbn.mediumIP')}</option
									></select
								>
							</label>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Settings print summary -->
			<div class="print-only seg-settings-print">
				{#if seg.type === 'bacnet-mstp'}{@const s = asMstp(seg.settings)}
					Baud: {s.baud} · Max Masters: {s.maxMasters} · APDU Timeout: {s.apduTimeout} ms ·
					{#if seg.diAuto && seg.diSchema}DI-Schema: {String(
							Math.max(0, Math.min(99, seg.diSS))
						).padStart(2, '0')}·{String(Math.max(0, Math.min(99, seg.diBB))).padStart(
							2,
							'0'
						)}·MMM{:else}DI-Offset: {seg.diOffset}{/if}
				{:else if seg.type === 'bacnet-ip'}{@const s = asIp(seg.settings)}
					Subnet: {s.subnet} · Port: {s.port}{s.bbmd ? ` · BBMD: ${s.bbmd}` : ''}
				{:else if seg.type === 'modbus-rtu'}{@const s = asModbus(seg.settings)}
					{$_('busIbn.modbusSettings', {
						values: { baud: s.baud, parity: s.parity, stopBits: s.stopBits }
					})}
				{:else if seg.type === 'knx'}{@const s = asKnx(seg.settings)}
					{$_('busIbn.knxSettings', { values: { topology: s.topology, medium: s.medium } })}
				{/if}
			</div>

			<!-- Address config bar -->
			<div class="di-config no-print">
				<div class="di-offset-wrap">
					<span class="di-offset-label">{$_('busIbn.startAddress')}</span>
					<input
						class="di-offset-input"
						type="number"
						min={ADDR_RANGE[seg.type].min}
						max={ADDR_RANGE[seg.type].max}
						bind:value={seg.startAddress}
						title={$_('busIbn.startAddressHint')}
						onkeydown={intOnly}
					/>
					<span class="di-offset-hint" style="color:var(--muted)"
						>{$_('busIbn.nextFreeHint', { values: { addr: seg.startAddress } })}</span
					>
				</div>
				{#if isBacnet(seg.type)}
					<div class="di-sep"></div>
					<label class="di-label">
						<input type="checkbox" bind:checked={seg.diAuto} />
						Device Instance auto
					</label>
					{#if seg.diAuto}
						<label class="di-label">
							<input type="checkbox" bind:checked={seg.diSchema} />
							Schema SS·BB·MMM
						</label>
						{#if seg.diSchema}
							<div class="di-offset-wrap">
								<span class="di-offset-label">SS</span>
								<input
									class="di-offset-input di-schema-input"
									type="number"
									min="0"
									max="99"
									bind:value={seg.diSS}
									onkeydown={intOnly}
								/>
								<span class="di-offset-label">BB</span>
								<input
									class="di-offset-input di-schema-input"
									type="number"
									min="0"
									max="99"
									bind:value={seg.diBB}
									onkeydown={intOnly}
								/>
								<span class="di-offset-hint"
									>→ {schemaDIPreview(seg, 1)} … {schemaDIPreview(seg, 127)}</span
								>
							</div>
						{:else}
							<div class="di-offset-wrap">
								<span class="di-offset-label">{$_('busIbn.diOffset')}</span>
								<input
									class="di-offset-input"
									type="number"
									min="0"
									max="4000000"
									step="100000"
									bind:value={seg.diOffset}
									onkeydown={intOnly}
								/>
								<span class="di-offset-hint">→ DI = {seg.diOffset} + MAC</span>
							</div>
						{/if}
					{/if}
				{/if}
			</div>

			<!-- Address hint -->
			<div class="addr-hint no-print">
				{#if seg.type === 'bacnet-mstp'}{$_('busIbn.addrHintMstp')}
				{:else if seg.type === 'bacnet-ip'}{$_('busIbn.addrHintIp')}
				{:else if seg.type === 'modbus-rtu'}{$_('busIbn.addrHintModbus')}
				{:else if seg.type === 'knx'}{$_('busIbn.addrHintKnx')}
				{/if}
			</div>

			<!-- Address Map (BACnet MSTP only) -->
			{#if seg.type === 'bacnet-mstp' && showAddressMap}
				{@const usedMacs = new Set(seg.devices.map((d) => d.address))}
				{@const freeCount = 127 - seg.devices.length}
				<div class="addr-map no-print">
					<div class="addr-map-head">
						<span class="addr-map-title">{$_('busIbn.addrMapTitle')}</span>
						<div class="addr-map-legend">
							<span class="legend-item"
								><i class="legend-dot ld-free"></i>{$_('busIbn.legendFree')}
								<b>{freeCount}</b></span
							>
							<span class="legend-item"
								><i class="legend-dot ld-used"></i>{$_('busIbn.legendUsed')}
								<b>{seg.devices.length}</b></span
							>
							<span class="legend-item"
								><i class="legend-dot ld-gateway"></i>{$_('busIbn.legendGateway')}</span
							>
							{#if dupAddr.size > 0}
								<span class="legend-item" style="color:#dc2626"
									><i class="legend-dot ld-conflict"></i>{$_('busIbn.legendConflict')}
									<b>{Math.ceil(dupAddr.size / 2)}</b></span
								>
							{/if}
						</div>
					</div>
					<div class="addr-grid">
						{#each Array.from({ length: 128 }, (_, i) => i) as mac, _mac_i (_mac_i)}
							{@const isGateway = mac === 0}
							{@const isConflict = dupAddr.has(mac)}
							{@const isUsed = usedMacs.has(mac)}
							{@const devAtMac = seg.devices.find((d) => d.address === mac)}
							<div
								class="amap-cell"
								class:amap-gateway={isGateway}
								class:amap-conflict={isConflict}
								class:amap-used={isUsed && !isConflict && !isGateway}
								class:amap-free={!isUsed && !isGateway}
								title={isGateway
									? `MAC ${mac} · Gateway/Router (reserviert)`
									: isConflict
										? `MAC ${mac} · Adresskonflikt!`
										: devAtMac
											? `MAC ${mac} · ${devAtMac.name || '—'}`
											: `MAC ${mac} · frei`}
							>
								{mac}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Bulk selection bar -->
			{#if selCount > 0}
				<div class="bulk-bar no-print">
					<span class="bulk-bar-count"
						>{$_('busIbn.selectionCount').replace('{n}', String(selCount))}</span
					>
					<span class="bulk-bar-sep"></span>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'manufacturer')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownMfr')}
					</button>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'model')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownModel')}
					</button>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'group')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownGroup')}
					</button>
					<span style="flex:1"></span>
					<button
						type="button"
						class="bulk-bar-btn bulk-bar-del"
						onclick={() => bulkDeleteSelected(seg)}
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="3 6 5 6 21 6" /><path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
							/></svg
						>
						{$_('busIbn.deleteSelected')}
					</button>
					<button type="button" class="bulk-bar-close" onclick={() => clearSel(seg.id)}>×</button>
				</div>
			{/if}

			<!-- Device table -->
			<div class="table-wrap">
				<table class="device-table">
					<thead>
						<tr>
							<th class="col-check no-print">
								<button
									type="button"
									class="row-check"
									class:row-check--on={isAllSelected(seg)}
									aria-label={$_('busIbn.selectAll', { default: 'Select all' })}
									aria-pressed={isAllSelected(seg)}
									onclick={() => (isAllSelected(seg) ? clearSel(seg.id) : selectAll(seg))}
								></button>
							</th>
							<th class="col-addr col-sortable" onclick={() => toggleSort(seg.id, 'address')}>
								{ADDR_RANGE[seg.type].label}
								<span class="sort-icon" class:sort-icon--active={getSort(seg.id).key === 'address'}
									>{sortIcon(seg.id, 'address')}</span
								>
							</th>
							<th class="col-name col-sortable" onclick={() => toggleSort(seg.id, 'name')}>
								{$_('busIbn.colName')}
								<span class="sort-icon" class:sort-icon--active={getSort(seg.id).key === 'name'}
									>{sortIcon(seg.id, 'name')}</span
								>
							</th>
							<th class="col-type">{$_('busIbn.colType')}</th>
							<th class="col-mfr">{$_('busIbn.colManufacturer')}</th>
							<th class="col-model">{$_('busIbn.colModel')}</th>
							<th class="col-group">{$_('busIbn.colGroup')}</th>
							{#if isBacnet(seg.type)}
								<th
									class="col-di col-sortable"
									onclick={() => toggleSort(seg.id, 'deviceInstance')}
								>
									{$_('busIbn.colDi')}
									<span
										class="sort-icon"
										class:sort-icon--active={getSort(seg.id).key === 'deviceInstance'}
										>{sortIcon(seg.id, 'deviceInstance')}</span
									>
								</th>
							{/if}
							<th class="col-status">{$_('busIbn.colStatus')}</th>
							<th class="col-notes">{$_('busIbn.colNotes')}</th>
							<th class="col-act no-print"></th>
						</tr>
					</thead>
					<tbody>
						{#each getGroups(seg) as grp, _grp_i (_grp_i)}
							{#if grp.key !== null}
								<tr class="group-row">
									<td colspan={colCount(seg)} class="group-cell">
										{grp.key}<span class="group-count">{grp.devices.length}</span>
									</td>
								</tr>
							{/if}
							{#each grp.devices as dev (dev.id)}
								{@const devStatus = dev.status ?? 'planned'}
								<tr class:row-selected={isSelected(seg.id, dev.id)}>
									<td class="col-check no-print">
										<button
											type="button"
											class="row-check"
											class:row-check--on={isSelected(seg.id, dev.id)}
											aria-label={$_('busIbn.selectRow', { default: 'Select row' })}
											aria-pressed={isSelected(seg.id, dev.id)}
											onclick={() => toggleSel(seg.id, dev.id)}
										></button>
									</td>
									<td class="col-addr">
										<div class="mac-cell">
											<input
												class="tbl-input tbl-input--addr"
												class:tbl-conflict={dupAddr.has(dev.address)}
												class:tbl-addr-locked={dev.macLocked}
												type="number"
												min={ADDR_RANGE[seg.type].min}
												max={ADDR_RANGE[seg.type].max}
												bind:value={dev.address}
												onkeydown={intOnly}
											/>
											<div class="mac-steppers no-print">
												<button
													type="button"
													class="mac-step"
													onclick={() => macAdj(seg, dev, 1)}
													title="+1">▲</button
												>
												<button
													type="button"
													class="mac-step"
													onclick={() => macAdj(seg, dev, -1)}
													title="-1">▼</button
												>
											</div>
											<button
												type="button"
												class="lock-btn"
												class:lock-btn--on={dev.macLocked}
												onclick={() => (dev.macLocked = !dev.macLocked)}
												title={dev.macLocked ? $_('busIbn.fixedAddress') : $_('busIbn.autoAddress')}
											>
												{#if dev.macLocked}
													<svg
														width="11"
														height="11"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2.5"
														><rect x="3" y="11" width="18" height="11" rx="2" /><path
															d="M7 11V7a5 5 0 0 1 10 0v4"
														/></svg
													>
												{:else}
													<svg
														width="11"
														height="11"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2.5"
														opacity="0.4"
														><rect x="3" y="11" width="18" height="11" rx="2" /><path
															d="M7 11V7a5 5 0 0 1 9.9-1"
														/></svg
													>
												{/if}
											</button>
										</div>
									</td>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.name}
											placeholder={$_('busIbn.namePlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.deviceType}
											placeholder={$_('busIbn.typePlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.manufacturer}
											placeholder={$_('busIbn.mfrPlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.model}
											placeholder={$_('busIbn.modelPlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.group}
											placeholder={$_('busIbn.groupPlaceholder')}
										/></td
									>
									{#if isBacnet(seg.type)}
										<td class="col-di">
											<div class="mac-cell">
												{#if diIsAuto(seg, dev)}
													<span
														class="tbl-di-auto"
														class:tbl-conflict={dupDeviceInstances.has(effectiveDI(seg, dev))}
														title={$_('busIbn.autoComputed')
															.replace('{offset}', String(seg.diOffset))
															.replace('{addr}', String(dev.address))
															.replace('{di}', String(effectiveDI(seg, dev)))}
													>
														{effectiveDI(seg, dev)}
													</span>
												{:else}
													<input
														class="tbl-input tbl-input--addr"
														class:tbl-conflict={dev.deviceInstance > 0 &&
															dupDeviceInstances.has(dev.deviceInstance)}
														type="number"
														min="0"
														max="4194302"
														bind:value={dev.deviceInstance}
														onkeydown={intOnly}
													/>
												{/if}
												<button
													type="button"
													class="lock-btn"
													class:lock-btn--on={dev.diLocked}
													onclick={() => {
														dev.diLocked = !dev.diLocked;
														if (!dev.diLocked) dev.deviceInstance = effectiveDI(seg, dev);
													}}
													title={dev.diLocked ? $_('busIbn.fixedDI') : $_('busIbn.autoDI')}
												>
													{#if dev.diLocked}
														<svg
															width="11"
															height="11"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2.5"
															><rect x="3" y="11" width="18" height="11" rx="2" /><path
																d="M7 11V7a5 5 0 0 1 10 0v4"
															/></svg
														>
													{:else}
														<svg
															width="11"
															height="11"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2.5"
															opacity="0.4"
															><rect x="3" y="11" width="18" height="11" rx="2" /><path
																d="M7 11V7a5 5 0 0 1 9.9-1"
															/></svg
														>
													{/if}
												</button>
											</div>
										</td>
									{/if}
									<td class="col-status">
										<button
											type="button"
											class="status-pill no-print"
											style="--sc:{STATUS_COLORS[devStatus]}"
											onclick={() => cycleStatus(dev)}
											title={$_('busIbn.clickToCycle')}
										>
											<i class="status-dot"></i>
											{statusLabel(devStatus)}
										</button>
										<span class="print-only print-status" style="color:{STATUS_COLORS[devStatus]}"
											>{statusLabel(devStatus)}</span
										>
									</td>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.notes}
											placeholder={$_('busIbn.notesPlaceholder')}
										/></td
									>
									<td class="col-act no-print">
										<div class="row-actions">
											<button
												type="button"
												class="btn-row-act"
												onclick={() => duplicateDevice(seg, dev.id)}
												title={$_('busIbn.duplicateDevice')}
											>
												<svg
													width="13"
													height="13"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													><rect x="9" y="9" width="13" height="13" rx="2" /><path
														d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
													/></svg
												>
											</button>
											<button
												type="button"
												class="btn-row-del"
												onclick={() => removeDevice(seg, dev.id)}
												title={$_('busIbn.deleteDevice')}
											>
												<svg
													width="13"
													height="13"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													><line x1="18" y1="6" x2="6" y2="18" /><line
														x1="6"
														y1="6"
														x2="18"
														y2="18"
													/></svg
												>
											</button>
										</div>
									</td>
								</tr>
							{/each}
						{/each}
						{#if seg.devices.length === 0}
							<tr>
								<td colspan={colCount(seg)} class="empty-row no-print">{$_('busIbn.noDevices')}</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<!-- Bulk add panel -->
			{#if getBulk(seg.id).open}
				{@const b = getBulk(seg.id)}
				{@const preview = bulkPreview(seg)}
				<div class="bulk-panel no-print">
					<div class="bulk-header">
						<span class="bulk-title">{$_('busIbn.bulkTitle')}</span>
						<button
							type="button"
							class="btn-cancel"
							onclick={() => {
								if (bulkState[seg.id]) bulkState[seg.id].open = false;
							}}>✕</button
						>
					</div>
					<div class="bulk-fields">
						<div class="bulk-field">
							<label class="settings-label" for="bulk-count-{seg.id}"
								>{$_('busIbn.bulkCount')}</label
							>
							<input
								id="bulk-count-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="1"
								max="100"
								bind:value={b.count}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-start-{seg.id}"
								>Start-{ADDR_RANGE[seg.type].label}</label
							>
							<input
								id="bulk-start-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min={ADDR_RANGE[seg.type].min}
								max={ADDR_RANGE[seg.type].max}
								bind:value={b.startAddr}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-prefix-{seg.id}"
								>{$_('busIbn.bulkPrefix')}</label
							>
							<input
								id="bulk-prefix-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkPrefixPlaceholder')}
								bind:value={b.prefix}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-startnum-{seg.id}"
								>{$_('busIbn.bulkStartNum')}</label
							>
							<input
								id="bulk-startnum-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="0"
								bind:value={b.startNum}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-pad-{seg.id}">{$_('busIbn.bulkPad')}</label>
							<input
								id="bulk-pad-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="0"
								max="4"
								bind:value={b.padWidth}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-type-{seg.id}">{$_('busIbn.bulkType')}</label>
							<input
								id="bulk-type-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkTypePlaceholder')}
								bind:value={b.deviceType}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-mfr-{seg.id}">{$_('busIbn.bulkMfr')}</label>
							<input
								id="bulk-mfr-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkMfrPlaceholder')}
								bind:value={b.manufacturer}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-model-{seg.id}"
								>{$_('busIbn.bulkModel')}</label
							>
							<input
								id="bulk-model-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkModelPlaceholder')}
								bind:value={b.model}
							/>
						</div>
					</div>
					{#if preview.length > 0}
						<div class="bulk-preview">
							<span class="bulk-preview-title"
								>{$_('busIbn.bulkPreviewTitle', { values: { count: preview.length } })}</span
							>
							<div class="bulk-preview-list">
								{#each preview as p (p)}
									<span class="bulk-preview-item" class:bulk-preview-item--conflict={p.conflict}>
										<span class="bulk-addr">{p.addr}</span>
										{#if p.name}<span class="bulk-name">{p.name}</span>{/if}
										{#if p.di > 0}<span class="bulk-di">DI {p.di}</span>{/if}
										{#if p.conflict}<span class="bulk-warn">{$_('busIbn.bulkDiConflict')}</span
											>{/if}
									</span>
								{/each}
							</div>
						</div>
					{:else}
						<p class="bulk-empty">
							{$_('busIbn.noFreeAddresses', { values: { addr: b.startAddr } })}
						</p>
					{/if}
					<div class="bulk-actions">
						<button
							type="button"
							class="btn-confirm"
							onclick={() => confirmBulk(seg)}
							disabled={preview.length === 0}
						>
							{preview.length}
							{$_('busIbn.addDevice')}
						</button>
						<button
							type="button"
							class="btn-cancel"
							onclick={() => {
								if (bulkState[seg.id]) bulkState[seg.id].open = false;
							}}>{$_('common.cancel')}</button
						>
					</div>
				</div>
			{/if}

			<div class="seg-footer no-print">
				<button type="button" class="btn-add-device" onclick={() => addDevice(seg)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
					>
					{$_('busIbn.addDevice')}
				</button>
				<button type="button" class="btn-add-device" onclick={() => openBulk(seg)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /><line
							x1="12"
							y1="5"
							x2="12"
							y2="19"
							transform="translate(7,0)"
						/><line x1="11" y1="12" x2="25" y2="12" transform="translate(7,0)" /></svg
					>
					{$_('busIbn.bulkTitle')}
				</button>
				<button type="button" class="btn-add-device" onclick={() => openLibraryFor(seg.id)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><rect x="2" y="3" width="7" height="18" rx="1" /><rect
							x="9"
							y="3"
							width="7"
							height="18"
							rx="1"
						/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
					>
					{$_('busIbn.addFromLibrary')}
				</button>
				<span class="seg-count"
					>{seg.devices.length}
					{seg.devices.length === 1 ? $_('busIbn.deviceSingular') : $_('busIbn.devicePlural')}</span
				>
				{#if seg.devices.filter((d) => d.status === 'online').length > 0}
					<span class="seg-count" style="color:#16a34a"
						>{seg.devices.filter((d) => d.status === 'online').length} online</span
					>
				{/if}
			</div>
		</div>
	{/each}

	<!-- ── Add segment ── -->
	<div class="add-seg-area no-print">
		{#if showAddSegment}
			<div class="add-seg-panel">
				<span class="add-seg-label">{$_('busIbn.chooseProtocol')}</span>
				{#each ['bacnet-mstp', 'bacnet-ip', 'modbus-rtu', 'knx'] as BusType[] as type (type)}
					<button
						type="button"
						class="btn-bus-type"
						class:btn-bus-type--active={addSegType === type}
						style="--bus-color:{BUS_COLORS[type]}"
						onclick={() => (addSegType = type)}
					>
						{BUS_LABELS[type]}
					</button>
				{/each}
				<button type="button" class="btn-confirm" onclick={addSegment}
					>{$_('busIbn.addSegmentBtn')}</button
				>
				<button type="button" class="btn-cancel" onclick={() => (showAddSegment = false)}
					>{$_('common.cancel')}</button
				>
			</div>
		{:else}
			<button type="button" class="btn-add-seg" onclick={() => (showAddSegment = true)}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
				>
				{$_('busIbn.addSegment')}
			</button>
		{/if}
	</div>
</div>

<!-- ── Import Modal ──────────────────────────────────────────────────────── -->
{#if importState.open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="modal-overlay no-print"
		role="presentation"
		onclick={() => (importState.open = false)}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="modal-head">
				<div>
					<div class="modal-title">{$_('busIbn.importTitle')}</div>
					<div class="modal-sub">
						{importState.filename} · {importState.rows.length}
						{$_('common.rows')}
					</div>
				</div>
				<button
					type="button"
					class="btn-icon"
					aria-label={$_('common.close')}
					onclick={() => (importState.open = false)}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
					>
				</button>
			</div>
			<div class="modal-body">
				{#if project.segments.length > 1}
					<div class="modal-field">
						<span class="settings-label">{$_('busIbn.importTargetSegment')}</span>
						<select class="settings-select" bind:value={importState.targetSegId}>
							{#each project.segments as s (s)}
								<option value={s.id}>{s.name}</option>
							{/each}
						</select>
					</div>
				{/if}
				<div class="import-preview-wrap">
					<table class="import-table">
						<thead>
							<tr>
								<th>{$_('busIbn.importColMac')}</th><th>{$_('busIbn.importColName')}</th><th
									>{$_('busIbn.importColType')}</th
								>
								<th>{$_('busIbn.importColMfr')}</th><th>{$_('busIbn.importColModel')}</th><th
									>{$_('busIbn.importColGroup')}</th
								><th>{$_('busIbn.importColStatus')}</th>
							</tr>
						</thead>
						<tbody>
							{#each importState.rows as row, _row_i (_row_i)}
								<tr class:import-row-invalid={!row.valid}>
									<td class="import-mac">{row.mac}</td>
									<td>{row.name || '—'}</td>
									<td>{row.deviceType || '—'}</td>
									<td>{row.manufacturer || '—'}</td>
									<td>{row.model || '—'}</td>
									<td>{row.group || '—'}</td>
									<td>
										<span
											class="status-pill"
											style="--sc:{STATUS_COLORS[
												row.status
											]}; font-size:0.7rem; padding:0.15rem 0.45rem;"
										>
											<i class="status-dot"></i>{statusLabel(row.status)}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-foot">
				<span class="modal-foot-info"
					>{importState.rows.filter((r) => r.valid).length} von {importState.rows.length} Zeilen werden
					importiert</span
				>
				<button type="button" class="btn-cancel" onclick={() => (importState.open = false)}
					>{$_('common.cancel')}</button
				>
				<button type="button" class="btn-confirm" onclick={confirmImport}>
					{$_('busIbn.importConfirm')} ({importState.rows.filter((r) => r.valid).length})
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ── Conflict Toast ─────────────────────────────────────────────────────── -->
{#if hasConflicts}
	<div class="conflict-toast no-print" role="alert">
		<span class="conflict-toast-dot"></span>
		<span>{$_('busIbn.conflictDetected')}</span>
	</div>
{/if}

<!-- ── Library Drawer ─────────────────────────────────────────────────────── -->
{#if libraryOpen}
	<div class="lib-overlay" role="presentation" onclick={() => (libraryOpen = false)}></div>
{/if}
<div class="lib-drawer" class:lib-drawer--open={libraryOpen}>
	<div class="lib-head">
		<span>{$_('busIbn.libraryTitle')}</span>
		<button
			type="button"
			class="btn-icon"
			aria-label={$_('common.close')}
			onclick={() => (libraryOpen = false)}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
			>
		</button>
	</div>
	{#if project.segments.length > 1}
		<div class="lib-target">
			<span class="settings-label">{$_('busIbn.libraryInsertIn')}</span>
			<select class="settings-select" bind:value={libraryTargetSegId} style="flex:1">
				{#each project.segments as s (s)}
					<option value={s.id}>{s.name}</option>
				{/each}
			</select>
		</div>
	{/if}
	<div class="lib-bus-chips">
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={libraryFilterBus === 'all'}
			onclick={() => (libraryFilterBus = 'all')}>Alle</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={libraryFilterBus === 'bacnet-mstp'}
			onclick={() => (libraryFilterBus = 'bacnet-mstp')}>BACnet MSTP</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={libraryFilterBus === 'modbus-rtu'}
			onclick={() => (libraryFilterBus = 'modbus-rtu')}>Modbus RTU</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={libraryFilterBus === 'knx'}
			onclick={() => (libraryFilterBus = 'knx')}>KNX</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={libraryFilterBus === 'analog'}
			onclick={() => (libraryFilterBus = 'analog')}>Analog</button
		>
	</div>
	<div class="lib-search-wrap">
		<input
			type="search"
			class="lib-search"
			placeholder={$_('busIbn.librarySearchPlaceholder')}
			bind:value={libraryQuery}
		/>
	</div>
	<div class="lib-list">
		{#each filteredLibrary as grp, _grp_i (_grp_i)}
			<div class="lib-cat">{grp.cat}</div>
			{#each grp.items as item (item.vendor + '|' + item.model)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="lib-item" role="button" tabindex="0" onclick={() => addFromLibrary(item)}>
					<div class="lib-item-short">{item.short}</div>
					<div class="lib-item-meta">
						<div class="lib-item-name">{item.vendor} {item.model}</div>
						<div class="lib-item-desc">{item.desc}</div>
					</div>
					<button
						type="button"
						class="lib-item-add"
						onclick={(e) => {
							e.stopPropagation();
							addFromLibrary(item);
						}}
						title={$_('busIbn.libraryAddDevice')}>+</button
					>
				</div>
			{/each}
		{/each}
		{#if filteredLibrary.length === 0}
			<div class="lib-empty">{$_('busIbn.libraryNoResults')}</div>
		{/if}
	</div>
</div>

<style>
	/* ── Page ── */
	.page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}
	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.25rem;
	}
	.page-sub {
		font-size: 0.875rem;
		color: var(--muted);
		margin-bottom: 0.75rem;
	}

	/* ── Toolbar ── */
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.625rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}
	.toolbar-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.3rem 0.7rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.toolbar-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.toolbar-sep {
		width: 1px;
		height: 18px;
		background: var(--border);
		flex-shrink: 0;
	}
	.toolbar-toggle {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--text);
		cursor: pointer;
	}
	.toolbar-label {
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.toolbar-select {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
	}

	/* ── Conflict Toast ── */
	.conflict-toast {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 200;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #fef2f2;
		border: 1px solid #fca5a5;
		color: #b91c1c;
		border-radius: 999px;
		font-size: 0.8125rem;
		font-weight: 500;
		box-shadow: 0 4px 16px rgba(185, 28, 28, 0.15);
		pointer-events: none;
		animation: toast-in 0.2s ease;
	}
	:global(.dark) .conflict-toast {
		background: #450a0a;
		border-color: #7f1d1d;
		color: #fca5a5;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
	}
	.conflict-toast-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #dc2626;
		flex-shrink: 0;
		animation: pulse-conflict 1s ease-in-out infinite;
	}
	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	/* ── Project header ── */
	.project-header {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem 1.25rem;
		margin-bottom: 1.25rem;
	}
	.project-fields {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.project-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 140px;
	}
	.project-label {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
	}
	.project-input {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.4rem 0.6rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
		min-width: 0;
	}
	.project-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}
	.project-date {
		font-size: 0.875rem;
		color: var(--text);
		padding: 0.4rem 0;
	}

	/* ── Buttons ── */
	.btn-print {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem 0.875rem;
		background: var(--color-primary);
		color: #fff;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.15s;
		white-space: nowrap;
	}
	.btn-print:hover {
		opacity: 0.88;
	}

	/* ── Segment ── */
	.segment {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		margin-bottom: 1.25rem;
		overflow: hidden;
	}
	.seg-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		flex-wrap: wrap;
	}
	.type-badge {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		border: 1px solid;
		flex-shrink: 0;
	}
	.seg-name-input {
		flex: 1 1 120px;
		background: transparent;
		border: none;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
		font-family: inherit;
		min-width: 80px;
	}
	.seg-name-input:focus {
		outline: none;
		border-bottom: 1px solid var(--color-primary);
	}
	.seg-head-sep {
		color: var(--muted);
		flex-shrink: 0;
	}
	.seg-desc-input {
		flex: 0 1 200px;
		background: transparent;
		border: none;
		font-size: 0.8125rem;
		color: var(--muted);
		font-family: inherit;
		min-width: 80px;
	}
	.seg-desc-input:focus {
		outline: none;
		color: var(--text);
	}
	.seg-header-actions {
		display: flex;
		gap: 0.375rem;
		margin-left: auto;
		flex-shrink: 0;
	}

	.btn-icon {
		width: 30px;
		height: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-icon:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.btn-icon--danger:hover {
		border-color: #dc2626;
		color: #dc2626;
	}

	/* ── Settings panel ── */
	.seg-settings {
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--color-primary) 3%, var(--surface));
	}
	.settings-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.settings-field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 140px;
	}
	.settings-label {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.settings-input,
	.settings-select {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.35rem 0.55rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
	}
	.settings-input:focus,
	.settings-select:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	/* ── DI config bar ── */
	.di-config {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.4rem 1rem;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, #2563eb 4%, var(--surface));
		font-size: 0.8125rem;
	}
	.di-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--text);
		cursor: pointer;
		font-weight: 500;
	}
	.di-offset-wrap {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.di-offset-label {
		color: var(--muted);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.di-offset-input {
		width: 90px;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		font-variant-numeric: tabular-nums;
	}
	.di-offset-input:focus {
		outline: none;
		border-color: #2563eb;
	}
	.di-schema-input {
		width: 54px;
	}
	.di-offset-hint {
		font-size: 0.75rem;
		color: #2563eb;
		font-weight: 500;
	}
	.di-sep {
		width: 1px;
		height: 1.25rem;
		background: var(--border);
		flex-shrink: 0;
	}

	/* ── Address hint ── */
	.addr-hint {
		font-size: 0.75rem;
		color: var(--muted);
		padding: 0.35rem 1rem;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
	}

	/* ── Address Map ── */
	.addr-map {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
	}
	.addr-map-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.addr-map-title {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.addr-map-legend {
		display: flex;
		gap: 0.875rem;
		align-items: center;
		flex-wrap: wrap;
	}
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.75rem;
		color: var(--muted);
	}
	.legend-item b {
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}
	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		display: inline-block;
		flex-shrink: 0;
	}
	.ld-free {
		background: var(--border);
	}
	.ld-used {
		background: color-mix(in srgb, #2563eb 50%, transparent);
	}
	.ld-gateway {
		background: color-mix(in srgb, #ca8a04 60%, transparent);
	}
	.ld-conflict {
		background: #dc2626;
	}

	.addr-grid {
		display: grid;
		grid-template-columns: repeat(32, 1fr);
		gap: 2px;
	}
	.amap-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20px;
		border-radius: 3px;
		font-size: 0.5625rem;
		font-variant-numeric: tabular-nums;
		cursor: default;
		transition:
			transform 0.1s,
			z-index 0.1s;
		min-width: 0;
		overflow: hidden;
		position: relative;
	}
	.amap-cell:hover {
		transform: scale(1.25);
		z-index: 2;
	}
	.amap-free {
		background: var(--bg);
		color: var(--muted);
		border: 1px solid var(--border);
	}
	.amap-used {
		background: color-mix(in srgb, #2563eb 20%, var(--surface));
		color: #2563eb;
		border: 1px solid color-mix(in srgb, #2563eb 40%, transparent);
		font-weight: 700;
	}
	.amap-gateway {
		background: color-mix(in srgb, #ca8a04 20%, var(--surface));
		color: #ca8a04;
		border: 1px solid color-mix(in srgb, #ca8a04 40%, transparent);
		font-weight: 700;
	}
	.amap-conflict {
		background: #dc2626;
		color: #fff;
		border: 1px solid #b91c1c;
		font-weight: 700;
		animation: pulse-conflict 1s ease-in-out infinite;
	}
	@keyframes pulse-conflict {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.55;
		}
	}

	/* ── Bulk selection bar ── */
	.bulk-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding: 0.5rem 1rem;
		background: color-mix(in srgb, var(--color-primary) 8%, var(--surface));
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
	}
	.bulk-bar-count {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-primary);
		flex-shrink: 0;
	}
	.bulk-bar-sep {
		width: 1px;
		height: 16px;
		background: var(--border);
		flex-shrink: 0;
	}
	.bulk-bar-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.6rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.75rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.bulk-bar-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.bulk-bar-del:hover {
		border-color: #dc2626 !important;
		color: #dc2626 !important;
	}
	.bulk-bar-close {
		background: none;
		border: none;
		color: var(--muted);
		font-size: 1rem;
		cursor: pointer;
		padding: 0 0.25rem;
		transition: color 0.15s;
	}
	.bulk-bar-close:hover {
		color: var(--text);
	}

	/* ── Row checkbox ── */
	.col-check {
		width: 32px;
	}
	.row-check {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1.5px solid var(--border);
		background: var(--bg);
		cursor: pointer;
		transition: all 0.1s;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.row-check:hover {
		border-color: var(--color-primary);
	}
	.row-check--on {
		background: var(--color-primary);
		border-color: var(--color-primary);
	}
	.row-check--on::after {
		content: '';
		display: block;
		width: 9px;
		height: 5px;
		border-left: 2px solid #fff;
		border-bottom: 2px solid #fff;
		transform: rotate(-45deg) translateY(-1px);
	}
	.row-selected {
		background: color-mix(in srgb, var(--color-primary) 5%, var(--surface)) !important;
	}

	/* ── Group row ── */
	.group-row {
		background: var(--bg) !important;
	}
	.group-cell {
		padding: 0.3rem 0.75rem !important;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.group-count {
		font-weight: 400;
		margin-left: 0.5rem;
	}

	/* ── MAC cell with steppers ── */
	.mac-cell {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.mac-cell .tbl-input {
		flex: 1;
		min-width: 0;
	}
	/* hide native browser spin buttons — we have our own steppers */
	.mac-cell input[type='number']::-webkit-inner-spin-button,
	.mac-cell input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.mac-cell input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	.mac-steppers {
		display: flex;
		flex-direction: column;
		gap: 0;
		opacity: 0;
		transition: opacity 0.15s;
		flex-shrink: 0;
	}
	tr:hover .mac-steppers {
		opacity: 1;
	}
	.mac-step {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 11px;
		background: var(--bg);
		border: 1px solid var(--border);
		font-size: 0.5rem;
		cursor: pointer;
		color: var(--muted);
		padding: 0;
		line-height: 1;
	}
	.mac-step:first-child {
		border-radius: 2px 2px 0 0;
		border-bottom: none;
	}
	.mac-step:last-child {
		border-radius: 0 0 2px 2px;
	}
	.mac-step:hover {
		background: var(--surface);
		color: var(--text);
		border-color: var(--color-primary);
	}

	/* ── Lock btn ── */
	.lock-btn {
		width: 20px;
		height: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		color: var(--muted);
		flex-shrink: 0;
		transition: color 0.15s;
		padding: 0;
	}
	.lock-btn:hover {
		color: var(--text);
	}
	.lock-btn--on {
		color: #ea580c;
	}
	.lock-btn--on:hover {
		color: #c2410c;
	}
	.tbl-addr-locked {
		color: #ea580c;
		font-weight: 700;
	}

	/* ── Status pill ── */
	.col-status {
		width: 120px;
	}
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		font-size: 0.725rem;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		border: 1px solid color-mix(in srgb, var(--sc) 40%, transparent);
		background: color-mix(in srgb, var(--sc) 10%, transparent);
		color: var(--sc);
		white-space: nowrap;
		transition: background 0.15s;
	}
	.status-pill:hover {
		background: color-mix(in srgb, var(--sc) 18%, transparent);
	}
	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--sc);
		display: inline-block;
		flex-shrink: 0;
	}

	/* ── Table ── */
	.table-wrap {
		overflow-x: auto;
	}
	.device-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}
	.col-sortable {
		cursor: pointer;
		user-select: none;
	}
	.col-sortable:hover {
		color: var(--color-primary);
	}
	.sort-icon {
		font-size: 0.65rem;
		color: var(--muted);
		margin-left: 2px;
	}
	.sort-icon--active {
		color: var(--color-primary);
	}
	.device-table thead th {
		text-align: left;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		padding: 0.45rem 0.6rem;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
		white-space: nowrap;
	}
	.device-table tbody tr {
		border-bottom: 1px solid var(--border);
	}
	.device-table tbody tr:last-child {
		border-bottom: none;
	}
	.device-table tbody tr:hover {
		background: var(--surface-hover);
	}
	.device-table tbody td {
		padding: 0.2rem 0.3rem;
	}
	.col-addr {
		width: 105px;
	}
	.col-name {
		min-width: 120px;
	}
	.col-type {
		min-width: 90px;
	}
	.col-mfr {
		min-width: 90px;
	}
	.col-model {
		min-width: 90px;
	}
	.col-group {
		min-width: 90px;
	}
	.col-di {
		width: 130px;
	}
	.col-notes {
		min-width: 120px;
	}
	.col-act {
		width: 56px;
	}
	.tbl-input {
		width: 100%;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 0.25rem;
		padding: 0.3rem 0.4rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		box-sizing: border-box;
	}
	.tbl-input:focus {
		outline: none;
		border-color: var(--color-primary);
		background: var(--bg);
	}
	.tbl-input--addr {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		text-align: right;
	}
	.tbl-conflict {
		color: #dc2626 !important;
		border-color: #dc2626 !important;
		background: #fef2f2;
	}
	:global(.dark) .tbl-conflict {
		background: #450a0a;
	}
	.tbl-di-auto {
		display: block;
		padding: 0.3rem 0.4rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: #2563eb;
		text-align: right;
		cursor: default;
	}
	.empty-row {
		text-align: center;
		color: var(--muted);
		font-style: italic;
		padding: 1rem !important;
	}

	/* ── Row actions ── */
	.row-actions {
		display: flex;
		gap: 2px;
		align-items: center;
		justify-content: flex-end;
	}
	.btn-row-act {
		width: 26px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 0.25rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-row-act:hover {
		background: var(--bg);
		color: var(--color-primary);
	}
	.btn-row-del {
		width: 26px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 0.25rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-row-del:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	/* ── Bulk add panel ── */
	.bulk-panel {
		border-top: 1px solid var(--border);
		background: color-mix(in srgb, var(--color-primary) 3%, var(--surface));
		padding: 0.875rem 1rem;
	}
	.bulk-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}
	.bulk-title {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--text);
	}
	.bulk-fields {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-bottom: 0.875rem;
	}
	.bulk-field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.bulk-num {
		width: 80px;
	}
	.bulk-preview {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.625rem 0.75rem;
		margin-bottom: 0.75rem;
	}
	.bulk-preview-title {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		display: block;
		margin-bottom: 0.4rem;
	}
	.bulk-preview-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}
	.bulk-preview-item {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.2rem 0.5rem;
		font-size: 0.75rem;
	}
	.bulk-preview-item--conflict {
		border-color: #fca5a5;
		background: #fef2f2;
	}
	.bulk-addr {
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--color-primary);
	}
	.bulk-name {
		color: var(--text);
	}
	.bulk-di {
		font-size: 0.7rem;
		color: #2563eb;
		font-variant-numeric: tabular-nums;
	}
	.bulk-warn {
		font-size: 0.7rem;
		color: #dc2626;
		font-weight: 600;
	}
	.bulk-empty {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0 0 0.75rem;
	}
	.bulk-actions {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	/* ── Segment footer ── */
	.seg-footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 1rem;
		border-top: 1px solid var(--border);
		flex-wrap: wrap;
	}
	.btn-add-device {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.75rem;
		background: transparent;
		border: 1px dashed var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-add-device:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.seg-count {
		font-size: 0.75rem;
		color: var(--muted);
		margin-left: auto;
	}
	.seg-count + .seg-count {
		margin-left: 0;
	}

	/* ── Add segment ── */
	.add-seg-area {
		margin-top: 0.5rem;
	}
	.btn-add-seg {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.25rem;
		background: transparent;
		border: 1px dashed var(--border);
		border-radius: 0.5rem;
		color: var(--muted);
		font-size: 0.875rem;
		font-family: inherit;
		cursor: pointer;
		width: 100%;
		justify-content: center;
		transition: all 0.15s;
	}
	.btn-add-seg:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.add-seg-panel {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
	}
	.add-seg-label {
		font-size: 0.8125rem;
		color: var(--muted);
		margin-right: 0.25rem;
	}
	.btn-bus-type {
		padding: 0.35rem 0.75rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-bus-type:hover {
		border-color: var(--bus-color);
		color: var(--bus-color);
	}
	.btn-bus-type--active {
		background: color-mix(in srgb, var(--bus-color) 15%, transparent);
		border-color: var(--bus-color);
		color: var(--bus-color);
		font-weight: 600;
	}
	.btn-confirm {
		padding: 0.35rem 0.9rem;
		background: var(--color-primary);
		color: #fff;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		margin-left: auto;
		transition: opacity 0.15s;
	}
	.btn-confirm:hover {
		opacity: 0.88;
	}
	.btn-confirm:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.btn-cancel {
		padding: 0.35rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-family: inherit;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-cancel:hover {
		border-color: var(--text);
		color: var(--text);
	}

	/* ── Library Drawer ── */
	.lib-overlay {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: rgba(0, 0, 0, 0.15);
	}
	.lib-drawer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 320px;
		z-index: 50;
		background: var(--surface);
		border-left: 1px solid var(--border);
		transform: translateX(100%);
		transition: transform 0.25s ease;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.lib-drawer--open {
		transform: translateX(0);
	}
	.lib-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text);
		flex-shrink: 0;
	}
	.lib-target {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--border);
		flex-shrink: 0;
	}
	.lib-bus-chips {
		display: flex;
		gap: 0.375rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--border);
		flex-shrink: 0;
		flex-wrap: wrap;
	}
	.lib-chip {
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted);
		font-size: 0.7rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.1s;
		white-space: nowrap;
	}
	.lib-chip:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.lib-chip--active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
	}
	.lib-search-wrap {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--border);
		flex-shrink: 0;
	}
	.lib-search {
		width: 100%;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.4rem 0.6rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
	}
	.lib-search:focus {
		outline: none;
		border-color: var(--color-primary);
	}
	.lib-list {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem 0;
	}
	.lib-cat {
		padding: 0.4rem 0.875rem 0.25rem;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
	}
	.lib-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.4rem 0.875rem;
		cursor: pointer;
		transition: background 0.1s;
	}
	.lib-item:hover {
		background: var(--surface-hover);
	}
	.lib-item-short {
		width: 34px;
		height: 34px;
		border-radius: 0.375rem;
		background: color-mix(in srgb, var(--color-primary) 10%, var(--bg));
		color: var(--color-primary);
		font-size: 0.65rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.lib-item-meta {
		flex: 1;
		min-width: 0;
	}
	.lib-item-name {
		font-size: 0.8125rem;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lib-item-desc {
		font-size: 0.725rem;
		color: var(--muted);
	}
	.lib-item-add {
		margin-left: auto;
		width: 24px;
		height: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted);
		font-size: 1rem;
		cursor: pointer;
		flex-shrink: 0;
		transition: all 0.1s;
		line-height: 1;
	}
	.lib-item-add:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.lib-empty {
		padding: 1rem;
		text-align: center;
		color: var(--muted);
		font-size: 0.8125rem;
		font-style: italic;
	}

	/* ── Modal ── */
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 300;
		background: rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.modal {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		width: 100%;
		max-width: 760px;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	}
	.modal-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--border);
		flex-shrink: 0;
	}
	.modal-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}
	.modal-sub {
		font-size: 0.8125rem;
		color: var(--muted);
		margin-top: 2px;
	}
	.modal-body {
		padding: 1rem 1.25rem;
		overflow-y: auto;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.modal-field {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.modal-foot {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.25rem;
		border-top: 1px solid var(--border);
		flex-shrink: 0;
	}
	.modal-foot-info {
		font-size: 0.8125rem;
		color: var(--muted);
		flex: 1;
	}
	.import-preview-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}
	.import-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}
	.import-table thead th {
		background: var(--bg);
		padding: 0.4rem 0.6rem;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		border-bottom: 1px solid var(--border);
		text-align: left;
		white-space: nowrap;
	}
	.import-table tbody tr {
		border-bottom: 1px solid var(--border);
	}
	.import-table tbody tr:last-child {
		border-bottom: none;
	}
	.import-table tbody td {
		padding: 0.3rem 0.6rem;
		color: var(--text);
	}
	.import-mac {
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--color-primary);
		width: 50px;
	}
	.import-row-invalid {
		opacity: 0.4;
		text-decoration: line-through;
	}

	/* ── Print ── */
	.print-only {
		display: none;
	}
	.print-status {
		font-size: 0.75rem;
		font-weight: 500;
	}
	.seg-settings-print {
		font-size: 0.75rem;
		color: #555;
		padding: 0.25rem 0;
	}

	@media print {
		.no-print {
			display: none !important;
		}
		.print-only {
			display: revert;
		}

		@page {
			size: A4 landscape;
			margin: 15mm 12mm;
			orphans: 3;
			widows: 3;
		}

		:global(body) {
			font-size: 11pt;
		}

		.print-header {
			margin-bottom: 12pt;
			padding-bottom: 8pt;
			border-bottom: 2pt solid #000;
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 4pt;
		}
		.print-title {
			font-size: 16pt;
			font-weight: 700;
			color: #000;
			grid-column: 1;
		}
		.print-subtitle {
			font-size: 9pt;
			color: #555;
			margin-top: 2pt;
			grid-column: 1;
		}
		.print-meta {
			grid-column: 1 / -1;
			display: flex;
			gap: 20pt;
			flex-wrap: wrap;
			font-size: 9pt;
			color: #333;
			margin-top: 4pt;
			border-top: 0.5pt solid #ccc;
			padding-top: 4pt;
		}
		.print-meta span::before {
			content: attr(data-label) ': ';
			font-weight: 600;
		}

		.page {
			max-width: 100%;
			padding: 0;
		}

		.project-header {
			display: none;
		} /* replaced by print-header */

		.segment {
			background: #fff;
			border: 1pt solid #aaa;
			border-radius: 0;
			margin-bottom: 14pt;
			page-break-inside: avoid;
		}
		.seg-header {
			background: #f0f0f0;
			border-bottom: 1pt solid #aaa;
			padding: 5pt 8pt;
		}
		.seg-name-input,
		.seg-desc-input {
			background: transparent;
			font-size: 10pt;
		}
		.seg-head-sep {
			color: #666;
		}
		.type-badge {
			border: 1pt solid;
			font-size: 7pt;
		}

		.di-config {
			background: #f8f8f8;
			padding: 3pt 8pt;
			font-size: 8pt;
		}
		.seg-settings-print {
			padding: 3pt 8pt;
			font-size: 8pt;
			border-bottom: 0.5pt solid #ddd;
		}
		.addr-hint {
			display: none;
		}

		.device-table {
			font-size: 8pt;
			width: 100%;
		}
		.device-table thead th {
			background: #e8e8e8;
			color: #333;
			border-bottom: 1pt solid #999;
			padding: 3pt 5pt;
			font-size: 7pt;
		}
		.device-table tbody tr {
			border-bottom: 0.5pt solid #ddd;
		}
		.device-table tbody tr:last-child {
			border-bottom: none;
		}
		.device-table tbody td {
			padding: 2pt 5pt;
			vertical-align: middle;
		}

		.tbl-input {
			background: transparent;
			border: none;
			padding: 0;
			font-size: 8pt;
			width: auto;
		}
		.tbl-input--addr {
			font-weight: 700;
		}
		.tbl-conflict {
			color: #c00 !important;
			border: none !important;
			background: transparent !important;
		}

		.lock-btn {
			display: none;
		}
		.tbl-di-auto {
			font-size: 8pt;
			padding: 0;
			color: #1a4db5;
		}
		.print-status {
			display: inline !important;
			font-size: 8pt;
		}

		.seg-footer,
		.bulk-panel,
		.add-seg-area {
			display: none;
		}
		.lib-drawer,
		.conflict-toast,
		.modal-overlay {
			display: none !important;
		}
	}
</style>
