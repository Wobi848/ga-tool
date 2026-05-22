// Tests fuer cutoffMs — pure Funktion, keine DB.
// Integration-Tests fuer rollupAnalytics() benoetigen Test-DB (TODO).

import { describe, it, expect } from 'vitest';
import { cutoffMs, DEFAULT_RETENTION_DAYS } from './analytics-rollup-util';

const DAY = 86_400_000;

describe('cutoffMs', () => {
	it('30 Tage Default schneidet vor 30 Tagen UTC-Mitternacht', () => {
		const now = new Date('2026-05-21T15:30:00Z').getTime();
		const cutoff = cutoffMs(DEFAULT_RETENTION_DAYS, now);
		// 30 Tage vor 2026-05-21 15:30 UTC -> 2026-04-21 ~15:30, dann auf 00:00 abgerundet
		const expectedDay = Math.floor((now - 30 * DAY) / DAY) * DAY;
		expect(cutoff).toBe(expectedDay);
		expect(new Date(cutoff).toISOString().slice(0, 10)).toBe('2026-04-21');
	});

	it('0 Tage Retention: cutoff ist morgen 00:00 UTC (alles wird gerollt)', () => {
		const now = new Date('2026-05-21T15:30:00Z').getTime();
		const cutoff = cutoffMs(0, now);
		// (now - 0) / DAY abgerundet -> heute 00:00 UTC
		expect(new Date(cutoff).toISOString().slice(0, 10)).toBe('2026-05-21');
	});

	it('7 Tage Retention', () => {
		const now = new Date('2026-05-21T00:00:00Z').getTime();
		const cutoff = cutoffMs(7, now);
		expect(new Date(cutoff).toISOString().slice(0, 10)).toBe('2026-05-14');
	});

	it('cutoff steigt monoton mit kleinerer Retention', () => {
		const now = Date.now();
		const c30 = cutoffMs(30, now);
		const c7 = cutoffMs(7, now);
		const c1 = cutoffMs(1, now);
		expect(c7).toBeGreaterThan(c30);
		expect(c1).toBeGreaterThan(c7);
	});

	it('idempotent: zwei Aufrufe mit gleichem now liefern gleichen Wert', () => {
		const now = Date.now();
		expect(cutoffMs(30, now)).toBe(cutoffMs(30, now));
	});
});
