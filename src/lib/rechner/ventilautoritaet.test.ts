import { describe, it, expect } from 'vitest';
import {
	valveAuthority,
	selectKvs,
	linearValveCurve,
	KVS_OPTIONS,
	KVS_RESERVE_FACTOR
} from './ventilautoritaet';

describe('valveAuthority', () => {
	it('α = ΔpV / (ΔpV + ΔpSystem)', () => {
		const r = valveAuthority({ dpv100: 3000, dpSystem: 8000 });
		expect(r.alpha).toBeCloseTo(3000 / 11000, 5);
		expect(r.dpTotal).toBe(11000);
	});

	it('Rating-Schwellen: 0.5/0.3/0.2', () => {
		expect(valveAuthority({ dpv100: 100, dpSystem: 100 }).rating).toBe('very-good'); // α=0.5
		expect(valveAuthority({ dpv100: 50, dpSystem: 100 }).rating).toBe('good'); // α≈0.33
		expect(valveAuthority({ dpv100: 25, dpSystem: 100 }).rating).toBe('acceptable'); // α=0.2
		expect(valveAuthority({ dpv100: 10, dpSystem: 100 }).rating).toBe('poor'); // α≈0.09
	});

	it('α = 0 wenn ΔpV = 0', () => {
		expect(valveAuthority({ dpv100: 0, dpSystem: 1000 }).alpha).toBe(0);
	});

	it('α = 1 wenn ΔpSystem = 0', () => {
		expect(valveAuthority({ dpv100: 1000, dpSystem: 0 }).alpha).toBe(1);
	});
});

describe('selectKvs', () => {
	it('Kv = Q / √(Δp in bar)', () => {
		// flow=1, dpv100=100000 (1 bar) -> Kv=1
		const r = selectKvs({ flow: 1.0, dpv100: 100000 });
		expect(r.kv).toBeCloseTo(1.0, 5);
	});

	it('empfiehlt naechstgroesseren Standard-Kvs mit Reserve-Faktor', () => {
		const r = selectKvs({ flow: 1.0, dpv100: 100000 });
		// Kv=1.0, Kvs >= 1.3 -> 1.6
		expect(r.kvs).toBe(1.6);
		expect(r.kvsFactor).toBeCloseTo(1.6 / 1.0, 3);
	});

	it('Reserve-Faktor sorgt fuer min ' + KVS_RESERVE_FACTOR + 'x Kvs/Kv', () => {
		const r = selectKvs({ flow: 2.5, dpv100: 100000 });
		expect(r.kvsFactor).toBeGreaterThanOrEqual(KVS_RESERVE_FACTOR);
	});

	it('saturiert auf groessten Kvs bei sehr hohem Bedarf', () => {
		const r = selectKvs({ flow: 1000, dpv100: 100000 });
		expect(r.kvs).toBe(KVS_OPTIONS[KVS_OPTIONS.length - 1]);
	});
});

describe('linearValveCurve', () => {
	// Hinweis: Formel q = h / √(1 − α + α·h²)
	//  - α = 0 -> q = h (Linearitaet)
	//  - hoeheres α -> staerkere Aufweitung im mittleren Hubbereich
	//  - α = 1 -> q saettigt bei 1 (worst case, Ventil dominiert nicht mehr)

	it('h=0 -> q=0; h=1 -> q=1', () => {
		const pts = linearValveCurve(0.5);
		expect(pts[0]).toEqual({ h: 0, q: 0 });
		expect(pts[pts.length - 1].h).toBe(100);
		expect(pts[pts.length - 1].q).toBeCloseTo(1, 5);
	});

	it('α=0 -> ideale Linearitaet: q = h', () => {
		const pts = linearValveCurve(0, 4);
		for (const p of pts) {
			expect(p.q).toBeCloseTo(p.h / 100, 5);
		}
	});

	it('α>0 -> Aufweitung im unteren Hubbereich (q > h)', () => {
		const pts = linearValveCurve(0.5, 10);
		const mid = pts.find((p) => p.h === 50)!;
		expect(mid.q).toBeGreaterThan(0.5);
	});

	it('q monoton steigend in h', () => {
		const pts = linearValveCurve(0.5);
		for (let i = 1; i < pts.length; i++) {
			expect(pts[i].q).toBeGreaterThanOrEqual(pts[i - 1].q);
		}
	});
});
