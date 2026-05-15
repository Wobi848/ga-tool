import { db } from '$lib/server/db';
import { analyticsEvent } from '$lib/server/db/analytics.schema';
import { user as userTable } from '$lib/server/db/auth.schema';
import { sql, gte, desc, count, countDistinct } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const DAY_MS = 86_400_000;
const now = () => Date.now();

export const load: PageServerLoad = async () => {
	const since30d = new Date(now() - 30 * DAY_MS);
	const since7d = new Date(now() - 7 * DAY_MS);

	// Total events all time
	const [{ total }] = await db
		.select({ total: count() })
		.from(analyticsEvent);

	// Events last 30d
	const [{ last30d }] = await db
		.select({ last30d: count() })
		.from(analyticsEvent)
		.where(gte(analyticsEvent.createdAt, since30d));

	// Unique users last 30d
	const [{ uniqueUsers }] = await db
		.select({ uniqueUsers: countDistinct(analyticsEvent.userId) })
		.from(analyticsEvent)
		.where(gte(analyticsEvent.createdAt, since30d));

	// Total registered users
	const [{ totalUsers }] = await db.select({ totalUsers: count() }).from(userTable);

	// Events per module (all time)
	const byModule = await db
		.select({ module: analyticsEvent.module, cnt: count() })
		.from(analyticsEvent)
		.groupBy(analyticsEvent.module)
		.orderBy(desc(count()));

	// Top slugs (all time) — only where slug is not null
	const topSlugs = await db
		.select({ module: analyticsEvent.module, slug: analyticsEvent.slug, cnt: count() })
		.from(analyticsEvent)
		.where(sql`${analyticsEvent.slug} is not null`)
		.groupBy(analyticsEvent.module, analyticsEvent.slug)
		.orderBy(desc(count()))
		.limit(20);

	// Daily events last 30 days
	const dailyRaw = await db
		.select({
			day: sql<string>`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`,
			cnt: count()
		})
		.from(analyticsEvent)
		.where(gte(analyticsEvent.createdAt, since30d))
		.groupBy(sql`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`)
		.orderBy(sql`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`);

	// Fill in missing days
	const dailyMap = new Map(dailyRaw.map((r) => [r.day, r.cnt]));
	const daily: { day: string; cnt: number }[] = [];
	for (let i = 29; i >= 0; i--) {
		const d = new Date(now() - i * DAY_MS);
		const key = d.toISOString().slice(0, 10);
		daily.push({ day: key, cnt: dailyMap.get(key) ?? 0 });
	}

	// Events last 7 days
	const [{ last7d }] = await db
		.select({ last7d: count() })
		.from(analyticsEvent)
		.where(gte(analyticsEvent.createdAt, since7d));

	return { total, last30d, last7d, uniqueUsers, totalUsers, byModule, topSlugs, daily };
};
