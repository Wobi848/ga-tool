import { describe, it, expect } from 'vitest';
import { luftbedarf, CATEGORIES, ACTIVITY_CO2_LPH } from './luftbedarf';

describe('luftbedarf', () => {
	it('Standard-Buero Kat II', () => {
		const r = luftbedarf({
			area: 25,
			height: 2.7,
			persons: 2,
			cat: 'II',
			activity: 'office'
		});
		// EN: 2×7×3.6 + 25×0.7×3.6 = 50.4 + 63 = 113.4 m³/h
		expect(r.flowEN).toBeCloseTo(113.4, 1);
		// CO2: 2×19 l/h = 38 l/h; Δc = 800-400 = 400; q = 38e3/400 = 95 m³/h
		expect(r.flowCO2).toBeCloseTo(95, 1);
		// recommended = max
		expect(r.recommended).toBeCloseTo(113.4, 1);
		expect(r.volume).toBeCloseTo(67.5, 1);
		expect(r.co2Target).toBe(800);
	});

	it('Kategorie I ist strenger als Kategorie IV', () => {
		const I = luftbedarf({ area: 25, height: 2.7, persons: 2, cat: 'I', activity: 'office' });
		const IV = luftbedarf({ area: 25, height: 2.7, persons: 2, cat: 'IV', activity: 'office' });
		expect(I.flowEN).toBeGreaterThan(IV.flowEN);
		expect(I.flowCO2).toBeGreaterThan(IV.flowCO2);
	});

	it('hoehere Personenzahl -> mehr Bedarf (sowohl EN als auch CO2)', () => {
		const base = luftbedarf({ area: 25, height: 2.7, persons: 2, cat: 'II', activity: 'office' });
		const more = luftbedarf({ area: 25, height: 2.7, persons: 8, cat: 'II', activity: 'office' });
		expect(more.flowEN).toBeGreaterThan(base.flowEN);
		expect(more.flowCO2).toBeGreaterThan(base.flowCO2);
	});

	it('flowCO2 = 0 bei Aussenluft >= Ziel (kein Beduerfnis)', () => {
		const r = luftbedarf({
			area: 25,
			height: 2.7,
			persons: 2,
			cat: 'II',
			activity: 'office',
			co2Outside: 900 // > Ziel 800
		});
		expect(r.flowCO2).toBe(0);
	});

	it('CO2 dominiert bei hoher Personendichte und niedriger Flaeche', () => {
		const r = luftbedarf({
			area: 10,
			height: 2.7,
			persons: 15, // ueberbelegt
			cat: 'I',
			activity: 'physical'
		});
		expect(r.flowCO2).toBeGreaterThan(r.flowEN);
		expect(r.recommended).toBeCloseTo(r.flowCO2, 1);
	});

	it('EN-Bedarf dominiert bei grosser Flaeche mit wenig Personen', () => {
		const r = luftbedarf({
			area: 200,
			height: 3,
			persons: 1,
			cat: 'II',
			activity: 'rest'
		});
		expect(r.flowEN).toBeGreaterThan(r.flowCO2);
	});

	it('ACH = recommended / volume', () => {
		const r = luftbedarf({ area: 25, height: 2.7, persons: 2, cat: 'II', activity: 'office' });
		expect(r.ach).toBeCloseTo(r.recommended / r.volume, 5);
	});

	it('Aktivitaet beeinflusst nur flowCO2', () => {
		const office = luftbedarf({
			area: 25,
			height: 2.7,
			persons: 5,
			cat: 'II',
			activity: 'office'
		});
		const physical = luftbedarf({
			area: 25,
			height: 2.7,
			persons: 5,
			cat: 'II',
			activity: 'physical'
		});
		expect(physical.flowEN).toBe(office.flowEN);
		expect(physical.flowCO2).toBeGreaterThan(office.flowCO2);
		expect(physical.flowCO2 / office.flowCO2).toBeCloseTo(
			ACTIVITY_CO2_LPH.physical / ACTIVITY_CO2_LPH.office,
			3
		);
	});
});

describe('CATEGORIES', () => {
	it('hat alle 4 Kategorien', () => {
		expect(Object.keys(CATEGORIES)).toEqual(['I', 'II', 'III', 'IV']);
	});
	it('perPerson monoton abnehmend von I nach IV', () => {
		expect(CATEGORIES.I.perPerson).toBeGreaterThan(CATEGORIES.II.perPerson);
		expect(CATEGORIES.II.perPerson).toBeGreaterThan(CATEGORIES.III.perPerson);
		expect(CATEGORIES.III.perPerson).toBeGreaterThan(CATEGORIES.IV.perPerson);
	});
	it('co2-Ziele monoton steigend von I nach IV', () => {
		expect(CATEGORIES.I.co2).toBeLessThan(CATEGORIES.II.co2);
		expect(CATEGORIES.II.co2).toBeLessThan(CATEGORIES.III.co2);
	});
});
