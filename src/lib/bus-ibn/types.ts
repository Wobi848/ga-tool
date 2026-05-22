// Types fuer Bus-IBN Adresskonfigurator
// Reine Type-Definitionen, keine Runtime-Logik.

export type BusType = 'bacnet-mstp' | 'bacnet-ip' | 'modbus-rtu' | 'knx';
export type DeviceStatus = 'planned' | 'configured' | 'online' | 'error';
export type GroupBy = 'none' | 'group' | 'deviceType' | 'manufacturer';
export type SortKey = 'address' | 'deviceInstance' | 'name' | null;
export type SortDir = 'asc' | 'desc';

export interface MstpSettings {
	baud: number;
	maxMasters: number;
	maxInfoFrames: number;
	apduTimeout: number;
	apduRetries: number;
}
export interface BacnetIpSettings {
	subnet: string;
	port: number;
	broadcastAddr: string;
	bbmd: string;
}
export interface ModbusSettings {
	baud: number;
	parity: string;
	stopBits: number;
}
export interface KnxSettings {
	topology: string;
	medium: string;
}
export type SegmentSettings = MstpSettings | BacnetIpSettings | ModbusSettings | KnxSettings;

export interface BusDevice {
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

export interface BusSegment {
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

export interface BusProject {
	id: string;
	name: string;
	site: string;
	engineer: string;
	version: string;
	createdAt: number;
	segments: BusSegment[];
}

export interface LibraryItemRaw {
	catKey: string;
	vendor: string;
	model: string;
	type: string;
	short: string;
	descKey: string;
	busType: BusType | 'analog';
}
export interface LibraryItem {
	cat: string;
	vendor: string;
	model: string;
	type: string;
	short: string;
	desc: string;
	busType: BusType | 'analog';
}
