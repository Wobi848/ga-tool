// Pure Bus-IBN Logik (testbar, framework-frei)
import { ADDR_RANGE } from './constants';
import { randomUUID } from '$lib/uuid';
import type {
	BusType,
	SegmentSettings,
	MstpSettings,
	BacnetIpSettings,
	ModbusSettings,
	KnxSettings,
	BusDevice,
	BusSegment,
	BusProject
} from './types';

export function isBacnet(type: BusType): boolean {
	return type === 'bacnet-mstp' || type === 'bacnet-ip';
}

// Type narrowing helpers — pure assertion-style.
export const asMstp = (s: SegmentSettings): MstpSettings => s as MstpSettings;
export const asIp = (s: SegmentSettings): BacnetIpSettings => s as BacnetIpSettings;
export const asModbus = (s: SegmentSettings): ModbusSettings => s as ModbusSettings;
export const asKnx = (s: SegmentSettings): KnxSettings => s as KnxSettings;

export function defaultSettings(type: BusType): SegmentSettings {
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

// Akzeptiert unvalidiertes JSON aus localStorage/Import.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeDevice(d: any): BusDevice {
	return {
		id: d.id ?? randomUUID(),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProject(p: any): BusProject {
	return {
		id: p.id ?? randomUUID(),
		name: p.name ?? 'Neues Projekt',
		site: p.site ?? '',
		engineer: p.engineer ?? '',
		version: p.version ?? '1.0',
		createdAt: p.createdAt ?? Date.now(),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		segments: (p.segments ?? []).map((s: any) => ({
			id: s.id ?? randomUUID(),
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

export function newProject(): BusProject {
	return {
		id: randomUUID(),
		name: 'Neues Projekt',
		site: '',
		engineer: '',
		version: '1.0',
		createdAt: Date.now(),
		segments: []
	};
}

export function nextFreeAddress(seg: BusSegment): number {
	const range = ADDR_RANGE[seg.type];
	const used = new Set(seg.devices.map((d) => d.address));
	let addr = Math.max(seg.startAddress, range.min);
	while (used.has(addr) && addr <= range.max) addr++;
	return Math.min(addr, range.max);
}

export function newDevice(seg: BusSegment): BusDevice {
	const addr = nextFreeAddress(seg);
	return {
		id: randomUUID(),
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

/** Effektive Device Instance fuer ein Geraet — beruecksichtigt auto/schema/offset. */
export function effectiveDI(seg: BusSegment, dev: BusDevice): number {
	if (dev.diLocked || !isBacnet(seg.type)) return dev.deviceInstance;
	if (!seg.diAuto) return dev.deviceInstance;
	if (seg.diSchema) {
		const ss = Math.max(0, Math.min(99, seg.diSS));
		const bb = Math.max(0, Math.min(99, seg.diBB));
		return ss * 100000 + bb * 1000 + dev.address;
	}
	return seg.diOffset + dev.address;
}

export function diIsAuto(seg: BusSegment, dev: BusDevice): boolean {
	return isBacnet(seg.type) && seg.diAuto && !dev.diLocked;
}

export function schemaDIPreview(seg: BusSegment, mac: number): string {
	const ss = String(Math.max(0, Math.min(99, seg.diSS))).padStart(2, '0');
	const bb = String(Math.max(0, Math.min(99, seg.diBB))).padStart(2, '0');
	const mmm = String(mac).padStart(3, '0');
	return `${ss}${bb}${mmm}`;
}

/** Doppelte Adressen innerhalb eines Segments. */
export function dupAddressesInSegment(seg: BusSegment): Set<number> {
	const seen = new Map<number, number>();
	for (const dev of seg.devices) seen.set(dev.address, (seen.get(dev.address) ?? 0) + 1);
	const dups = new Set<number>();
	for (const [addr, count] of seen) if (count > 1) dups.add(addr);
	return dups;
}

/** Doppelte Device-Instances ueber alle BACnet-Segmente eines Projekts. */
export function dupDeviceInstances(segments: BusSegment[]): Set<number> {
	const seen = new Map<number, number>();
	for (const seg of segments) {
		if (!isBacnet(seg.type)) continue;
		for (const dev of seg.devices) {
			const di = effectiveDI(seg, dev);
			if (di <= 0) continue;
			seen.set(di, (seen.get(di) ?? 0) + 1);
		}
	}
	const dups = new Set<number>();
	for (const [inst, cnt] of seen) if (cnt > 1) dups.add(inst);
	return dups;
}

export function hasAnyConflicts(project: BusProject): boolean {
	if (dupDeviceInstances(project.segments).size > 0) return true;
	for (const seg of project.segments) if (dupAddressesInSegment(seg).size > 0) return true;
	return false;
}
