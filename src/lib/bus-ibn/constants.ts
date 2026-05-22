// Konstanten fuer Bus-IBN
import type { BusType, DeviceStatus } from './types';

export const STORAGE_KEY = 'ga-bus-ibn-project';
export const PREFS_KEY = 'ga-bus-ibn-prefs';

export const BUS_LABELS: Record<BusType, string> = {
	'bacnet-mstp': 'BACnet MSTP',
	'bacnet-ip': 'BACnet IP',
	'modbus-rtu': 'Modbus RTU',
	knx: 'KNX'
};

export const BUS_COLORS: Record<BusType, string> = {
	'bacnet-mstp': '#2563eb',
	'bacnet-ip': '#0891b2',
	'modbus-rtu': '#ea580c',
	knx: '#7c3aed'
};

export const ADDR_RANGE: Record<BusType, { min: number; max: number; label: string }> = {
	'bacnet-mstp': { min: 1, max: 127, label: 'MAC' },
	'bacnet-ip': { min: 1, max: 4194302, label: 'Device Instance' },
	'modbus-rtu': { min: 1, max: 247, label: 'Slave ID' },
	knx: { min: 1, max: 255, label: 'Adresse' }
};

export const BAUD_OPTIONS = [9600, 19200, 38400, 76800, 115200];

export const STATUS_LABEL_KEYS: Record<DeviceStatus, string> = {
	planned: 'busIbn.statusPlanned',
	configured: 'busIbn.statusConfigured',
	online: 'busIbn.statusOnline',
	error: 'busIbn.statusError'
};

export const STATUS_COLORS: Record<DeviceStatus, string> = {
	planned: '#6b7280',
	configured: '#2563eb',
	online: '#16a34a',
	error: '#dc2626'
};

export const STATUS_ORDER: DeviceStatus[] = ['planned', 'configured', 'online', 'error'];
