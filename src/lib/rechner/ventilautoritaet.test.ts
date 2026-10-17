import { describe, it, expect } from 'vitest';
import { valveAuthority, selectKvs, linearValveCurve, KVS_OPTIONS } from './ventilautoritaet';

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

	it('waehlt die naechstliegende Normgroesse, bei Gleichstand die kleinere', () => {
		// Kv = 1.0 liegt genau auf der Reihe
		expect(selectKvs({ flow: 1.0, dpv100: 100000 }).kvs).toBe(1.0);
		// Kv ≈ 1.2: 1.0 liegt naeher als 1.6
		expect(selectKvs({ flow: 1.2, dpv100: 100000 }).kvs).toBe(1.0);
		// Kv ≈ 1.4: 1.6 liegt naeher
		expect(selectKvs({ flow: 1.4, dpv100: 100000 }).kvs).toBe(1.6);
	});

	it('Siemens-Beispiel BT_0100: Kv 26 ergibt Kvs 25, nicht 40', () => {
		// 4.5 m³/h bei 3 kPa → Kv ≈ 26
		const r = selectKvs({ flow: 4.5, dpv100: 3000 });
		expect(r.kv).toBeCloseTo(26, 0);
		expect(r.kvs).toBe(25);
		// tatsaechlicher Druckverlust etwas hoeher als geplant, rund 3.2 kPa
		expect(r.dpEffective).toBeCloseTo(3240, -1);
	});

	it('dpEffective = (Q / Kvs)² in Pa', () => {
		const r = selectKvs({ flow: 2.0, dpv100: 40000 });
		expect(r.dpEffective).toBeCloseTo(Math.pow(2.0 / r.kvs, 2) * 100000, 3);
	});

	it('saturiert auf groessten Kvs bei sehr hohem Bedarf', () => {
		const r = selectKvs({ flow: 1000, dpv100: 100000 });
		expect(r.kvs).toBe(KVS_OPTIONS[KVS_OPTIONS.length - 1]);
	});
});

describe('linearValveCurve', () => {
	// q = h / √(α + (1 − α)·h²): bei α = 1 linear, je kleiner α, desto
	// staerker oeffnet das Ventil schon bei kleinem Hub.

	it('h=0 -> q=0; h=1 -> q=1', () => {
		const pts = linearValveCurve(0.5);
		expect(pts[0]).toEqual({ h: 0, q: 0 });
		expect(pts[pts.length - 1].h).toBe(100);
		expect(pts[pts.length - 1].q).toBeCloseTo(1, 5);
	});

	it('α=1 -> ideale Linearitaet: q = h', () => {
		const pts = linearValveCurve(1, 4);
		for (const p of pts) {
			expect(p.q).toBeCloseTo(p.h / 100, 5);
		}
	});

	it('Handrechnung: α = 0.1, Hub 50 % -> q = 0.5/√0.325 ≈ 0.877', () => {
		// Lehrbuchfall schlechter Autoritaet: das lineare Ventil liefert bei
		// halbem Hub fast 90 % Durchfluss.
		const mid = linearValveCurve(0.1, 10).find((p) => p.h === 50)!;
		expect(mid.q).toBeCloseTo(0.5 / Math.sqrt(0.325), 4);
	});

	it('je kleiner α, desto mehr Durchfluss bei gleichem Hub', () => {
		const q = (a: number) => linearValveCurve(a, 10).find((p) => p.h === 30)!.q;
		expect(q(0.1)).toBeGreaterThan(q(0.3));
		expect(q(0.3)).toBeGreaterThan(q(0.5));
		expect(q(0.5)).toBeGreaterThan(q(1));
	});

	it('q monoton steigend in h', () => {
		const pts = linearValveCurve(0.5);
		for (let i = 1; i < pts.length; i++) {
			expect(pts[i].q).toBeGreaterThanOrEqual(pts[i - 1].q);
		}
	});
});
