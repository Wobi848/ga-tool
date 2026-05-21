import { db } from '$lib/server/db';
import { analyticsEvent } from '$lib/server/db/analytics.schema';
import { user as userTable } from '$lib/server/db/auth.schema';
import { userFavorites } from '$lib/server/db/favorites.schema';
import { sql, gte, lt, and, isNotNull, desc, count, countDistinct } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const DAY_MS = 86_400_000;
const now = () => Date.now();

export const load: PageServerLoad = async () => {
	const since30d = new Date(now() - 30 * DAY_MS);
	const since7d = new Date(now() - 7 * DAY_MS);
	const since14d = new Date(now() - 14 * DAY_MS);

	const [
		[{ total }],
		[{ last30d }],
		[{ last7d }],
		[{ prev7d }],
		[{ uniqueUsers }],
		[{ totalUsers }],
		byModule,
		topSlugs,
		dailyRaw,
		topUsersRaw,
		regDailyRaw,
		favRows
	] = await Promise.all([
		db.select({ total: count() }).from(analyticsEvent),

		db
			.select({ last30d: count() })
			.from(analyticsEvent)
			.where(gte(analyticsEvent.createdAt, since30d)),

		db
			.select({ last7d: count() })
			.from(analyticsEvent)
			.where(gte(analyticsEvent.createdAt, since7d)),

		db
			.select({ prev7d: count() })
			.from(analyticsEvent)
			.where(and(gte(analyticsEvent.createdAt, since14d), lt(analyticsEvent.createdAt, since7d))),

		db
			.select({ uniqueUsers: countDistinct(analyticsEvent.userId) })
			.from(analyticsEvent)
			.where(gte(analyticsEvent.createdAt, since30d)),

		db.select({ totalUsers: count() }).from(userTable),

		db
			.select({ module: analyticsEvent.module, cnt: count() })
			.from(analyticsEvent)
			.groupBy(analyticsEvent.module)
			.orderBy(desc(count())),

		db
			.select({ module: analyticsEvent.module, slug: analyticsEvent.slug, cnt: count() })
			.from(analyticsEvent)
			.where(sql`${analyticsEvent.slug} is not null`)
			.groupBy(analyticsEvent.module, analyticsEvent.slug)
			.orderBy(desc(count()))
			.limit(20),

		db
			.select({
				day: sql<string>`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`,
				cnt: count()
			})
			.from(analyticsEvent)
			.where(gte(analyticsEvent.createdAt, since30d))
			.groupBy(sql`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`)
			.orderBy(sql`date(${analyticsEvent.createdAt} / 1000, 'unixepoch')`),

		db
			.select({
				userId: analyticsEvent.userId,
				cnt: count()
			})
			.from(analyticsEvent)
			.where(and(gte(analyticsEvent.createdAt, since30d), isNotNull(analyticsEvent.userId)))
			.groupBy(analyticsEvent.userId)
			.orderBy(desc(count()))
			.limit(10),

		db
			.select({
				day: sql<string>`date(${userTable.createdAt} / 1000, 'unixepoch')`,
				cnt: count()
			})
			.from(userTable)
			.where(gte(userTable.createdAt, since30d))
			.groupBy(sql`date(${userTable.createdAt} / 1000, 'unixepoch')`)
			.orderBy(sql`date(${userTable.createdAt} / 1000, 'unixepoch')`),

		db.select({ data: userFavorites.data }).from(userFavorites)
	]);

	// Fill daily events (30 days)
	const dailyMap = new Map(dailyRaw.map((r) => [r.day, r.cnt]));
	const daily: { day: string; cnt: number }[] = [];
	for (let i = 29; i >= 0; i--) {
		const d = new Date(now() - i * DAY_MS);
		const key = d.toISOString().slice(0, 10);
		daily.push({ day: key, cnt: dailyMap.get(key) ?? 0 });
	}

	// Fill daily registrations (30 days)
	const regMap = new Map(regDailyRaw.map((r) => [r.day, r.cnt]));
	const regDaily: { day: string; cnt: number }[] = [];
	for (let i = 29; i >= 0; i--) {
		const d = new Date(now() - i * DAY_MS);
		const key = d.toISOString().slice(0, 10);
		regDaily.push({ day: key, cnt: regMap.get(key) ?? 0 });
	}

	// Resolve user emails for top active users
	const userIds = topUsersRaw.map((r) => r.userId).filter(Boolean) as string[];
	const userEmailRows = userIds.length
		? await db
				.select({ id: userTable.id, email: userTable.email })
				.from(userTable)
				.where(sql`${userTable.id} in ${userIds}`)
		: [];
	const emailMap = Object.fromEntries(userEmailRows.map((u) => [u.id, u.email]));
	const topUsers = topUsersRaw.map((r) => ({
		email: emailMap[r.userId ?? ''] ?? '(anonym)',
		cnt: r.cnt
	}));

	// Top favorites across all users
	const favCounts = new Map<string, { title: string; type: string; slug: string; count: number }>();
	for (const row of favRows) {
		try {
			const list: { type: string; slug: string; title: string }[] = JSON.parse(row.data);
			for (const f of list) {
				const key = `${f.type}:${f.slug}`;
				const entry = favCounts.get(key);
				if (entry) entry.count++;
				else favCounts.set(key, { title: f.title, type: f.type, slug: f.slug, count: 1 });
			}
		} catch {
			/* ignore */
		}
	}
	const topFavorites = [...favCounts.values()].sort((a, b) => b.count - a.count).slice(0, 15);

	return {
		total,
		last30d,
		last7d,
		prev7d,
		uniqueUsers,
		totalUsers,
		byModule,
		topSlugs,
		daily,
		regDaily,
		topUsers,
		topFavorites
	};
};
