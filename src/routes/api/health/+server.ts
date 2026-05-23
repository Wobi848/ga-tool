import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';

// Health-Check fuer Monitoring/Loadbalancer.
// Prueft DB-Connectivity via Trivial-Query. Liefert 200 wenn alles ok,
// 503 wenn DB nicht erreichbar.

export const GET: RequestHandler = async () => {
	const checks: Record<string, 'ok' | 'fail'> = {};
	let allOk = true;

	try {
		// SQLite einfache Verbindung pruefen
		db.run(sql`SELECT 1`);
		checks.database = 'ok';
	} catch {
		checks.database = 'fail';
		allOk = false;
	}

	return json(
		{
			status: allOk ? 'ok' : 'degraded',
			checks,
			timestamp: new Date().toISOString()
		},
		{ status: allOk ? 200 : 503 }
	);
};
