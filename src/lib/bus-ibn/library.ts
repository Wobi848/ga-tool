// Geraete-Bibliothek fuer Bus-IBN — kuratierte Liste typischer GA-Hardware
// pro Hersteller. Wird beim Hinzufuegen eines Geraets zur schnellen Auswahl
// im Library-Drawer angeboten.
import type { LibraryItemRaw } from './types';

export const DEVICE_LIBRARY_RAW: LibraryItemRaw[] = [
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
