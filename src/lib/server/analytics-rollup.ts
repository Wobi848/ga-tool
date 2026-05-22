// Analytics-Rollup: Aggregiert Rohdaten aus analyticsEvent in tagesweise Summen
// (analyticsDaily) und loescht die Rohdaten anschliessend. Verhindert
// unbeschraenktes Wachstum der Event-Tabelle.

import { db } from './db';
import { analyticsEvent } from './db/analytics.schema';
import { analyticsDaily } from './db/analytics-rollup.schema';
import { and, lt, sql, count, countDistinct } from 'drizzle-orm';
import { cutoffMs, dayKey, DEFAULT_RETENTION_DAYS } from './analytics-rollup-util';

export { cutoffMs, dayKey, DEFAULT_RETENTION_DAYS } from './analytics-rollup-util';

export interface RollupResult {
	daysProcessed: number;
	aggregateRowsWritten: number;
	rawRowsDeleted: number;
	cutoffDate: string;
}

/**
 * Fuehrt den Rollup aus. Idempotent: Bei erneutem Aufruf werden bereits
 * aggregierte Tage nicht doppelt gezaehlt (raw events wurden geloescht).
 *
 * @param retentionDays — Rohdaten juenger als so viele Tage bleiben erhalten.
 *                        Default 30. Setze auf 0 zum Aggregieren aller Daten
 *                        (z.B. fuer Tests).
 */
export function rollupAnalytics(retentionDays = DEFAULT_RETENTION_DAYS): RollupResult {
	const cutoff = cutoffMs(retentionDays);
	const cutoffDate = dayKey(cutoff);

	// 1) Aggregat-Rows berechnen: pro (day, module, slug)
	const rows = db
		.select({
			day: sql<string>`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`,
			module: analyticsEvent.module,
			slug: sql<string | null>`${analyticsEvent.slug}`,
			cnt: count(),
			uniqueUsers: countDistinct(analyticsEvent.userId)
		})
		.from(analyticsEvent)
		.where(lt(analyticsEvent.createdAt, new Date(cutoff)))
		.groupBy(
			sql`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`,
			analyticsEvent.module,
			analyticsEvent.slug
		)
		.all();

	if (rows.length === 0) {
		return {
			daysProcessed: 0,
			aggregateRowsWritten: 0,
			rawRowsDeleted: 0,
			cutoffDate
		};
	}

	// 2) In Tagesaggregat-Tabelle einfuegen (mit Merge bei vorhandenen Eintraegen)
	let aggregateRowsWritten = 0;
	const days = new Set<string>();
	for (const r of rows) {
		const slug = r.slug ?? '';
		days.add(r.day);
		// Insert oder Add bei Konflikt (sollte selten passieren — Rohdaten wurden
		// zuvor geloescht. Bei Re-Run schuetzt es trotzdem vor Doppelzaehlung.)
		db.insert(analyticsDaily)
			.values({
				day: r.day,
				module: r.module,
				slug,
				cnt: r.cnt,
				uniqueUsers: r.uniqueUsers
			})
			.onConflictDoUpdate({
				target: [analyticsDaily.day, analyticsDaily.module, analyticsDaily.slug],
				set: {
					cnt: sql`${analyticsDaily.cnt} + ${r.cnt}`,
					uniqueUsers: sql`max(${analyticsDaily.uniqueUsers}, ${r.uniqueUsers})`
				}
			})
			.run();
		aggregateRowsWritten++;
	}

	// 3) Rohdaten loeschen
	const del = db
		.delete(analyticsEvent)
		.where(lt(analyticsEvent.createdAt, new Date(cutoff)))
		.run();

	return {
		daysProcessed: days.size,
		aggregateRowsWritten,
		rawRowsDeleted: del.changes ?? 0,
		cutoffDate
	};
}

/** Zaehlt rohe Events, die durch den naechsten Rollup zusammengefasst wuerden. */
export function pendingRollupCount(retentionDays = DEFAULT_RETENTION_DAYS): number {
	const cutoff = cutoffMs(retentionDays);
	const result = db
		.select({ cnt: count() })
		.from(analyticsEvent)
		.where(lt(analyticsEvent.createdAt, new Date(cutoff)))
		.all();
	return result[0]?.cnt ?? 0;
}

/** Liest Tagesaggregate fuer einen Zeitraum (inclusive). */
export function getDailyAggregates(
	fromDate: string,
	toDate: string
): { day: string; module: string; slug: string; cnt: number; uniqueUsers: number }[] {
	return db
		.select()
		.from(analyticsDaily)
		.where(and(sql`${analyticsDaily.day} >= ${fromDate}`, sql`${analyticsDaily.day} <= ${toDate}`))
		.orderBy(analyticsDaily.day)
		.all();
}
