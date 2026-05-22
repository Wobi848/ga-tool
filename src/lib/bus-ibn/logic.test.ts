import { describe, it, expect } from 'vitest';
import {
	isBacnet,
	defaultSettings,
	normalizeDevice,
	normalizeProject,
	newProject,
	nextFreeAddress,
	newDevice,
	effectiveDI,
	diIsAuto,
	schemaDIPreview,
	dupAddressesInSegment,
	dupDeviceInstances,
	hasAnyConflicts
} from './logic';
import type { BusSegment, BusDevice, BusType, BusProject } from './types';

function segment(overrides: Partial<BusSegment> = {}): BusSegment {
	return {
		id: 'seg-1',
		name: 'Segment 1',
		description: '',
		type: 'bacnet-mstp',
		settings: defaultSettings('bacnet-mstp'),
		devices: [],
		settingsOpen: false,
		diOffset: 100000,
		diAuto: true,
		diSchema: false,
		diSS: 10,
		diBB: 1,
		startAddress: 1,
		...overrides
	};
}

function device(overrides: Partial<BusDevice> = {}): BusDevice {
	return {
		id: 'dev-1',
		name: '',
		deviceType: '',
		manufacturer: '',
		model: '',
		address: 1,
		macLocked: false,
		deviceInstance: 0,
		diLocked: false,
		status: 'planned',
		group: '',
		notes: '',
		...overrides
	};
}

describe('isBacnet', () => {
	it('true fuer bacnet-mstp und bacnet-ip', () => {
		expect(isBacnet('bacnet-mstp')).toBe(true);
		expect(isBacnet('bacnet-ip')).toBe(true);
	});
	it('false fuer modbus und knx', () => {
		expect(isBacnet('modbus-rtu')).toBe(false);
		expect(isBacnet('knx')).toBe(false);
	});
});

describe('defaultSettings', () => {
	it('bacnet-mstp default baudrate 9600', () => {
		const s = defaultSettings('bacnet-mstp');
		expect(s).toMatchObject({ baud: 9600, maxMasters: 127, apduRetries: 3 });
	});
	it('bacnet-ip default port 47808', () => {
		expect(defaultSettings('bacnet-ip')).toMatchObject({ port: 47808 });
	});
	it('modbus default parity Even', () => {
		expect(defaultSettings('modbus-rtu')).toMatchObject({ parity: 'E', stopBits: 1 });
	});
	it('knx default topology 1.1', () => {
		expect(defaultSettings('knx')).toMatchObject({ topology: '1.1', medium: 'TP' });
	});
});

describe('normalizeDevice', () => {
	it('fuellt fehlende Felder mit Defaults', () => {
		const d = normalizeDevice({});
		expect(d.address).toBe(1);
		expect(d.status).toBe('planned');
		expect(d.macLocked).toBe(false);
		expect(typeof d.id).toBe('string'); // UUID
	});
	it('uebernimmt gesetzte Felder', () => {
		const d = normalizeDevice({ name: 'X', address: 42, status: 'configured' });
		expect(d.name).toBe('X');
		expect(d.address).toBe(42);
		expect(d.status).toBe('configured');
	});
});

describe('normalizeProject', () => {
	it('null-tolerant: leeres Objekt -> gueltiges Projekt', () => {
		const p = normalizeProject({});
		expect(p.name).toBe('Neues Projekt');
		expect(p.segments).toEqual([]);
	});
	it('normalisiert verschachtelte Segmente und Geraete', () => {
		const raw = {
			name: 'P',
			segments: [{ type: 'modbus-rtu', devices: [{ address: 5 }] }]
		};
		const p = normalizeProject(raw);
		expect(p.segments).toHaveLength(1);
		expect(p.segments[0].type).toBe('modbus-rtu');
		expect(p.segments[0].devices).toHaveLength(1);
		expect(p.segments[0].devices[0].address).toBe(5);
	});
	it('fuegt fehlende Segment-Settings aus Type ein', () => {
		const p = normalizeProject({ segments: [{ type: 'knx' }] });
		expect(p.segments[0].settings).toMatchObject({ topology: '1.1' });
	});
});

describe('newProject', () => {
	it('startet leer', () => {
		const p = newProject();
		expect(p.segments).toEqual([]);
		expect(p.name).toBe('Neues Projekt');
		expect(p.createdAt).toBeGreaterThan(0);
	});
});

describe('nextFreeAddress', () => {
	it('leeres Segment -> startAddress', () => {
		expect(nextFreeAddress(segment({ startAddress: 1 }))).toBe(1);
		expect(nextFreeAddress(segment({ startAddress: 50 }))).toBe(50);
	});
	it('ueberspringt belegte Adressen', () => {
		const seg = segment({
			devices: [device({ id: 'a', address: 1 }), device({ id: 'b', address: 2 })]
		});
		expect(nextFreeAddress(seg)).toBe(3);
	});
	it('findet Luecken auch zwischen belegten Adressen erst nach lueckenloser Suche ab startAddress', () => {
		// startAddress=1 -> erste freie ist 2 (1 belegt, 3 belegt aber 2 frei)
		const seg = segment({
			startAddress: 1,
			devices: [device({ id: 'a', address: 1 }), device({ id: 'b', address: 3 })]
		});
		expect(nextFreeAddress(seg)).toBe(2);
	});
	it('respektiert Bus-Type-spezifischen max Range (MSTP=127)', () => {
		// Alle 1..127 belegt -> liefert 127 (saturiert)
		const devices = Array.from({ length: 127 }, (_, i) =>
			device({ id: String(i), address: i + 1 })
		);
		const seg = segment({ type: 'bacnet-mstp', devices });
		expect(nextFreeAddress(seg)).toBe(127);
	});
});

describe('newDevice', () => {
	it('auto-DI bei BACnet mit diAuto = offset + addr', () => {
		const seg = segment({ type: 'bacnet-mstp', diOffset: 100000, diAuto: true });
		const d = newDevice(seg);
		expect(d.deviceInstance).toBe(100001);
		expect(d.address).toBe(1);
	});
	it('DI = 0 bei nicht-BACnet', () => {
		const seg = segment({ type: 'modbus-rtu', diOffset: 100000, diAuto: true });
		const d = newDevice(seg);
		expect(d.deviceInstance).toBe(0);
	});
});

describe('effectiveDI', () => {
	it('returns dev.deviceInstance bei diLocked', () => {
		const seg = segment({ type: 'bacnet-mstp', diAuto: true, diOffset: 100000 });
		const dev = device({ address: 5, deviceInstance: 999, diLocked: true });
		expect(effectiveDI(seg, dev)).toBe(999);
	});
	it('returns dev.deviceInstance bei nicht-BACnet', () => {
		const seg = segment({ type: 'modbus-rtu' });
		const dev = device({ address: 5, deviceInstance: 42 });
		expect(effectiveDI(seg, dev)).toBe(42);
	});
	it('returns offset + address bei diAuto ohne schema', () => {
		const seg = segment({ type: 'bacnet-mstp', diAuto: true, diOffset: 100000 });
		expect(effectiveDI(seg, device({ address: 5 }))).toBe(100005);
	});
	it('returns SS·100000 + BB·1000 + addr bei diSchema', () => {
		const seg = segment({
			type: 'bacnet-mstp',
			diAuto: true,
			diSchema: true,
			diSS: 12,
			diBB: 34
		});
		// 12*100000 + 34*1000 + 7 = 1234007
		expect(effectiveDI(seg, device({ address: 7 }))).toBe(1234007);
	});
	it('clamped SS/BB auf 0..99', () => {
		const seg = segment({
			type: 'bacnet-mstp',
			diAuto: true,
			diSchema: true,
			diSS: 200, // clamp -> 99
			diBB: -5 // clamp -> 0
		});
		// 99*100000 + 0*1000 + 1 = 9900001
		expect(effectiveDI(seg, device({ address: 1 }))).toBe(9900001);
	});
});

describe('diIsAuto', () => {
	const types: BusType[] = ['bacnet-mstp', 'bacnet-ip', 'modbus-rtu', 'knx'];
	it('nur BACnet + diAuto + !diLocked => true', () => {
		for (const t of types) {
			const seg = segment({ type: t, diAuto: true });
			const dev = device({ diLocked: false });
			expect(diIsAuto(seg, dev)).toBe(isBacnet(t));
		}
	});
	it('false wenn diLocked', () => {
		const seg = segment({ type: 'bacnet-mstp', diAuto: true });
		expect(diIsAuto(seg, device({ diLocked: true }))).toBe(false);
	});
	it('false wenn diAuto=false', () => {
		const seg = segment({ type: 'bacnet-mstp', diAuto: false });
		expect(diIsAuto(seg, device({}))).toBe(false);
	});
});

describe('schemaDIPreview', () => {
	it('formatiert SS·BB·MMM mit Padding', () => {
		expect(schemaDIPreview(segment({ diSS: 1, diBB: 2 }), 5)).toBe('0102005');
		expect(schemaDIPreview(segment({ diSS: 12, diBB: 34 }), 127)).toBe('1234127');
	});
	it('clamped SS/BB', () => {
		expect(schemaDIPreview(segment({ diSS: 999, diBB: -5 }), 1)).toBe('9900001');
	});
});

describe('dupAddressesInSegment', () => {
	it('leere Liste -> kein Duplikat', () => {
		expect(dupAddressesInSegment(segment({ devices: [] })).size).toBe(0);
	});
	it('eindeutige Adressen -> kein Duplikat', () => {
		const seg = segment({
			devices: [
				device({ id: 'a', address: 1 }),
				device({ id: 'b', address: 2 }),
				device({ id: 'c', address: 3 })
			]
		});
		expect(dupAddressesInSegment(seg).size).toBe(0);
	});
	it('findet Duplikate', () => {
		const seg = segment({
			devices: [
				device({ id: 'a', address: 5 }),
				device({ id: 'b', address: 5 }),
				device({ id: 'c', address: 7 })
			]
		});
		expect(dupAddressesInSegment(seg)).toEqual(new Set([5]));
	});
});

describe('dupDeviceInstances', () => {
	it('ignoriert nicht-BACnet Segmente', () => {
		const segs = [
			segment({
				type: 'modbus-rtu',
				devices: [device({ id: 'a', deviceInstance: 1 }), device({ id: 'b', deviceInstance: 1 })]
			})
		];
		expect(dupDeviceInstances(segs).size).toBe(0);
	});
	it('findet Duplikate ueber Segmente hinweg via effectiveDI', () => {
		// seg1: auto, offset 100000, addr 1 => DI 100001
		// seg2: auto, offset 100000, addr 1 => DI 100001 — Duplikat
		const segs = [
			segment({
				id: 's1',
				type: 'bacnet-mstp',
				diOffset: 100000,
				devices: [device({ id: 'd1', address: 1 })]
			}),
			segment({
				id: 's2',
				type: 'bacnet-mstp',
				diOffset: 100000,
				devices: [device({ id: 'd2', address: 1 })]
			})
		];
		expect(dupDeviceInstances(segs)).toEqual(new Set([100001]));
	});
	it('keine Duplikate bei unterschiedlichen Offsets', () => {
		const segs = [
			segment({ id: 's1', diOffset: 100000, devices: [device({ id: 'd1', address: 1 })] }),
			segment({ id: 's2', diOffset: 200000, devices: [device({ id: 'd2', address: 1 })] })
		];
		expect(dupDeviceInstances(segs).size).toBe(0);
	});
});

describe('hasAnyConflicts', () => {
	function project(segments: BusSegment[]): BusProject {
		return { ...newProject(), segments };
	}
	it('leeres Projekt -> false', () => {
		expect(hasAnyConflicts(project([]))).toBe(false);
	});
	it('Adress-Duplikat triggert true', () => {
		const seg = segment({
			devices: [device({ id: 'a', address: 1 }), device({ id: 'b', address: 1 })]
		});
		expect(hasAnyConflicts(project([seg]))).toBe(true);
	});
	it('DI-Duplikat ueber Segmente triggert true', () => {
		const segs = [
			segment({ id: 's1', diOffset: 100000, devices: [device({ id: 'd1', address: 1 })] }),
			segment({ id: 's2', diOffset: 100000, devices: [device({ id: 'd2', address: 1 })] })
		];
		expect(hasAnyConflicts(project(segs))).toBe(true);
	});
});
