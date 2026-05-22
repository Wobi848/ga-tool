// Pure Utility-Funktionen fuer den Analytics-Rollup. Separat von der
// DB-Logik, damit sie ohne $env-Setup getestet werden koennen.

/** Default: alles aelter als 30 Tage rollen. */
export const DEFAULT_RETENTION_DAYS = 30;

/** Berechnet den Cutoff (Millisekunden) — alles AeLTER wird gerollt.
 *  Auf UTC-Mitternacht abgerundet, damit Tageaggregate sauber abgegrenzt sind. */
export function cutoffMs(retentionDays: number, now = Date.now()): number {
	const day = 86_400_000;
	const ms = now - retentionDays * day;
	return Math.floor(ms / day) * day;
}

/** Formatiert einen Millisekunden-Timestamp als YYYY-MM-DD (UTC). */
export function dayKey(ms: number): string {
	return new Date(ms).toISOString().slice(0, 10);
}
