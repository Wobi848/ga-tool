import { db } from '$lib/server/db';
import { analyticsEvent } from '$lib/server/db/analytics.schema';
import { sql, desc, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const topItems = await db
		.select({
			module: analyticsEvent.module,
			slug: analyticsEvent.slug,
			cnt: count()
		})
		.from(analyticsEvent)
		.where(sql`${analyticsEvent.slug} is not null`)
		.groupBy(analyticsEvent.module, analyticsEvent.slug)
		.orderBy(desc(count()))
		.limit(5);

	return { topItems };
};
