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
		// CO2: 2×18 l/h = 36 l/h; Kat. II erlaubt 800 ppm ueber aussen;
		// q = 36e3/800 = 45 m³/h (EN 16798-1, Anhang B)
		expect(r.flowCO2).toBeCloseTo(45, 1);
		// recommended = max
		expect(r.recommended).toBeCloseTo(113.4, 1);
		expect(r.volume).toBeCloseTo(67.5, 1);
		// Hoechstwert im Raum: 420 ppm aussen + 800 ppm = 1220 ppm
		expect(r.co2Target).toBe(1220);
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

	it('der Hoechstwert im Raum folgt der Aussenluft, der Luftbedarf nicht', () => {
		// EN 16798 begrenzt die Erhoehung, nicht den absoluten Wert.
		const a = luftbedarf({ area: 25, height: 2.7, persons: 2, cat: 'II', activity: 'office' });
		const b = luftbedarf({
			area: 25,
			height: 2.7,
			persons: 2,
			cat: 'II',
			activity: 'office',
			co2Outside: 450
		});
		expect(b.co2Target).toBe(1250);
		expect(b.flowCO2).toBeCloseTo(a.flowCO2, 6);
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
	it('CO2-Erhoehung nach EN 16798-1: 550 / 800 / 1350 / 1350 ppm', () => {
		expect([CATEGORIES.I.co2, CATEGORIES.II.co2, CATEGORIES.III.co2, CATEGORIES.IV.co2]).toEqual([
			550, 800, 1350, 1350
		]);
	});
});
