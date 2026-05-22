import { describe, it, expect } from 'vitest';
import { roomLoad, totalLoad, specificLoad, type Raum } from './heizlast';

function room(overrides: Partial<Raum> = {}): Raum {
	return {
		id: 1,
		label: 'Test',
		ti: 20,
		area: 25,
		height: 2.6,
		uWall: 0.2,
		uRoof: 0.15,
		uFloor: 0.25,
		uWindow: 0.9,
		windowArea: 4.0,
		ach: 0.3,
		...overrides
	};
}

describe('roomLoad', () => {
	it('returns 0 when outdoor >= room temp', () => {
		expect(roomLoad(room(), 20)).toBe(0);
		expect(roomLoad(room(), 25)).toBe(0);
	});

	it('positive for outdoor below room temp', () => {
		expect(roomLoad(room(), -10)).toBeGreaterThan(0);
	});

	it('scales linearly with ΔT', () => {
		// ΔT = 20 vs ΔT = 30 -> ratio 1.5
		const r10 = roomLoad(room(), 0); // ΔT = 20
		const r0 = roomLoad(room(), -10); // ΔT = 30
		expect(r0 / r10).toBeCloseTo(30 / 20, 4);
	});

	it('ventilation losses dominate at high ACH', () => {
		const low = roomLoad(room({ ach: 0.1 }), -10);
		const high = roomLoad(room({ ach: 2.0 }), -10);
		expect(high).toBeGreaterThan(low);
	});

	it('window has higher U-value than wall -> bigger window area -> higher load', () => {
		const small = roomLoad(room({ windowArea: 1.0 }), -10);
		const large = roomLoad(room({ windowArea: 8.0 }), -10);
		// Window U=0.9, replaces wall U=0.2 -> more window = more loss
		expect(large).toBeGreaterThan(small);
	});

	it('higher insulation (lower U) reduces load', () => {
		const u01 = roomLoad(room({ uWall: 0.1, uRoof: 0.1, uFloor: 0.1, uWindow: 0.5 }), -10);
		const u05 = roomLoad(room({ uWall: 0.5, uRoof: 0.3, uFloor: 0.5, uWindow: 1.5 }), -10);
		expect(u01).toBeLessThan(u05);
	});

	it('Passivhaus-Niveau ergibt ~10 W/m² (Sanity)', () => {
		// PH: U-Werte < 0.15, ACH ~0.1, hohe Daemmung
		const ph = room({
			area: 100,
			uWall: 0.12,
			uRoof: 0.1,
			uFloor: 0.12,
			uWindow: 0.8,
			windowArea: 15,
			ach: 0.1
		});
		const load = roomLoad(ph, -10); // ΔT = 30
		const specific = load / ph.area; // W/m²
		// Passivhaus typisch 10–15 W/m²; vereinfachte Rechnung leicht abweichend
		expect(specific).toBeGreaterThan(5);
		expect(specific).toBeLessThan(25);
	});

	it('Altbau-Niveau ergibt deutlich hoehere spezifische Heizlast als Neubau', () => {
		const altbau = room({
			uWall: 1.5,
			uRoof: 0.8,
			uFloor: 0.9,
			uWindow: 2.5,
			windowArea: 5,
			ach: 0.8
		});
		const neubau = room({
			uWall: 0.2,
			uRoof: 0.15,
			uFloor: 0.25,
			uWindow: 0.9,
			windowArea: 5,
			ach: 0.3
		});
		const lAlt = roomLoad(altbau, -10);
		const lNeu = roomLoad(neubau, -10);
		expect(lAlt / lNeu).toBeGreaterThan(2);
	});
});

describe('totalLoad / specificLoad', () => {
	const rooms: Raum[] = [
		room({ id: 1, area: 25 }),
		room({ id: 2, area: 15 }),
		room({ id: 3, area: 10 })
	];

	it('total = sum of individual room loads', () => {
		const total = totalLoad(rooms, -10);
		const sum = rooms.reduce((s, r) => s + roomLoad(r, -10), 0);
		expect(total).toBeCloseTo(sum, 5);
	});

	it('specific load = total / total area', () => {
		const total = totalLoad(rooms, -10);
		const totalArea = rooms.reduce((s, r) => s + r.area, 0);
		expect(specificLoad(rooms, -10)).toBeCloseTo(total / totalArea, 5);
	});

	it('empty room list -> specific load 0', () => {
		expect(specificLoad([], -10)).toBe(0);
	});
});
