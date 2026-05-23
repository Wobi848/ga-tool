import { describe, it, expect } from 'vitest';
import { wrgBilanz, WRG_TYPES, ANNUAL_HOURS, ENERGY_PRICE_CHF_KWH } from './waermerueckgewinnung';

const baseInput = {
	q: 3000,
	tAbluft: 22,
	tAussenluft: -5,
	rhAbluft: 50,
	etaT: 0.8,
	etaF: 0.7
};

describe('wrgBilanz', () => {
	it('Zulufttemperatur: t_aussen + η·(t_ab − t_aussen)', () => {
		// dt = 27, etaT=0.8 -> tZuluft = -5 + 0.8×27 = 16.6
		const r = wrgBilanz(baseInput);
		expect(r.tZuluft).toBeCloseTo(16.6, 2);
	});

	it('η = 1 -> Zuluft = Abluft (vollstaendige Rueckgewinnung)', () => {
		const r = wrgBilanz({ ...baseInput, etaT: 1 });
		expect(r.tZuluft).toBeCloseTo(baseInput.tAbluft, 5);
	});

	it('η = 0 -> Zuluft = Aussenluft (keine Rueckgewinnung)', () => {
		const r = wrgBilanz({ ...baseInput, etaT: 0 });
		expect(r.tZuluft).toBeCloseTo(baseInput.tAussenluft, 5);
		expect(r.qRecovered).toBeCloseTo(0, 5);
	});

	it('savingsPercent ≈ η × 100 %', () => {
		const r = wrgBilanz({ ...baseInput, etaT: 0.8 });
		expect(r.savingsPercent).toBeCloseTo(80, 1);
	});

	it('qRecovered skaliert linear mit Volumenstrom', () => {
		const r1 = wrgBilanz(baseInput);
		const r2 = wrgBilanz({ ...baseInput, q: 6000 });
		expect(r2.qRecovered).toBeCloseTo(r1.qRecovered * 2, 2);
	});

	it('Feuchte: etaF=0 -> Zuluft = Aussenluft (xZuluft = xAussen)', () => {
		const r = wrgBilanz({ ...baseInput, etaF: 0 });
		expect(r.xZuluft).toBeCloseTo(0.002, 5);
	});

	it('Feuchte: etaF=1 -> Zuluft = Abluft (xZuluft = xAb)', () => {
		const r = wrgBilanz({ ...baseInput, etaF: 1 });
		expect(r.xZuluft).toBeCloseTo(r.xAb, 5);
	});

	it('Abluft-Feuchtegehalt: 22 °C / 50 % rH ≈ 8.2 g/kg', () => {
		const r = wrgBilanz(baseInput);
		expect(r.xAb * 1000).toBeCloseTo(8.2, 1);
	});

	it('Jahresenergie = qRecovered [kW] × ANNUAL_HOURS', () => {
		const r = wrgBilanz(baseInput);
		expect(r.annualKwh).toBeCloseTo((r.qRecovered / 1000) * ANNUAL_HOURS, 2);
		expect(r.annualChf).toBeCloseTo(r.annualKwh * ENERGY_PRICE_CHF_KWH, 2);
	});

	it('qMax = qRecovered bei eta=1', () => {
		const r = wrgBilanz({ ...baseInput, etaT: 1 });
		expect(r.qRecovered).toBeCloseTo(r.qMax, 2);
	});
});

describe('WRG_TYPES', () => {
	it('hat alle 4 Typen', () => {
		expect(Object.keys(WRG_TYPES).sort()).toEqual(
			['kreuzgegenstrom', 'rotations', 'platte', 'laufrad'].sort()
		);
	});
	it('platte und laufrad haben keinen Feuchtetausch', () => {
		expect(WRG_TYPES.platte.etaF).toEqual([0, 0]);
		expect(WRG_TYPES.laufrad.etaF).toEqual([0, 0]);
	});
	it('Rotations hoechster Feuchteruckgewinnungs-Bereich', () => {
		expect(WRG_TYPES.rotations.etaF[1]).toBeGreaterThanOrEqual(WRG_TYPES.kreuzgegenstrom.etaF[1]);
	});
});
