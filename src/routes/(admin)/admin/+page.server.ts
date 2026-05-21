import { db } from '$lib/server/db';
import {
	user as userTable,
	session as sessionTable,
	account as accountTable
} from '$lib/server/db/auth.schema';
import { userFavorites } from '$lib/server/db/favorites.schema';
import { eq, desc, sql } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { hashPassword } from 'better-auth/crypto';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') redirect(302, '/');
	const [users, favRows, lastLoginRows] = await Promise.all([
		db
			.select({
				id: userTable.id,
				name: userTable.name,
				email: userTable.email,
				emailVerified: userTable.emailVerified,
				role: userTable.role,
				banned: userTable.banned,
				banReason: userTable.banReason,
				createdAt: userTable.createdAt,
				updatedAt: userTable.updatedAt,
				profileRole: userTable.profileRole,
				company: userTable.company
			})
			.from(userTable)
			.orderBy(desc(userTable.createdAt)),

		db.select({ userId: userFavorites.userId, data: userFavorites.data }).from(userFavorites),

		db
			.select({
				userId: sessionTable.userId,
				lastLogin: sql<number>`max(${sessionTable.createdAt})`
			})
			.from(sessionTable)
			.groupBy(sessionTable.userId)
	]);

	const favMap = Object.fromEntries(favRows.map((r) => [r.userId, r.data]));
	const loginMap = Object.fromEntries(lastLoginRows.map((r) => [r.userId, r.lastLogin]));

	const usersWithData = users.map((u) => {
		let favs: { type: string; slug: string; title: string }[] = [];
		try {
			favs = JSON.parse(favMap[u.id] ?? '[]');
		} catch {
			/* ignore */
		}
		return { ...u, favorites: favs, lastLogin: loginMap[u.id] ?? null };
	});

	return { users: usersWithData };
};

export const actions: Actions = {
	ban: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const reason = (data.get('reason') as string)?.trim() || 'Gesperrt durch Admin';

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id)
			return fail(400, { error: 'Eigener Account kann nicht gesperrt werden' });

		await db
			.update(userTable)
			.set({ banned: true, banReason: reason })
			.where(eq(userTable.id, userId));

		await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

		return { success: true, action: 'ban' };
	},

	unban: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });

		await db
			.update(userTable)
			.set({ banned: false, banReason: null })
			.where(eq(userTable.id, userId));

		return { success: true, action: 'unban' };
	},

	setRole: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const role = data.get('role') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id)
			return fail(400, { error: 'Eigene Rolle kann nicht geändert werden' });
		if (role !== 'admin' && role !== 'user') return fail(400, { error: 'Ungültige Rolle' });

		await db.update(userTable).set({ role }).where(eq(userTable.id, userId));

		return { success: true, action: 'setRole' };
	},

	deleteUser: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id)
			return fail(400, { error: 'Eigener Account kann nicht gelöscht werden' });

		await db.delete(userTable).where(eq(userTable.id, userId));

		return { success: true, action: 'delete' };
	},

	resetPassword: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const newPassword = (data.get('newPassword') as string)?.trim();

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (!newPassword || newPassword.length < 8)
			return fail(400, { error: 'Passwort min. 8 Zeichen' });
		if (userId === locals.user?.id)
			return fail(400, { error: 'Eigenes Passwort hier nicht ändern — Profil verwenden' });

		const hashed = await hashPassword(newPassword);

		await db.update(accountTable).set({ password: hashed }).where(eq(accountTable.userId, userId));

		await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

		return { success: true, action: 'resetPassword' };
	},

	sendTestEmail: async ({ locals }) => {
		if (!env.RESEND_API_KEY) return fail(400, { error: 'RESEND_API_KEY nicht gesetzt' });
		if (!locals.user?.email) return fail(401, { error: 'Nicht eingeloggt' });

		const resend = new Resend(env.RESEND_API_KEY);
		const FROM = env.RESEND_FROM ?? 'GA Tool <noreply@ga-tool.app>';
		const safeEmail = locals.user.email
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		const { error } = await resend.emails.send({
			from: FROM,
			to: locals.user.email,
			subject: 'Test-E-Mail — GA Tool',
			html: `
				<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem">
					<h2 style="margin:0 0 1rem;color:#1e293b">Test-E-Mail erfolgreich</h2>
					<p style="color:#475569;margin:0 0 1rem">
						Die E-Mail-Konfiguration deines GA Tool funktioniert korrekt.
					</p>
					<p style="color:#94a3b8;font-size:0.8125rem;margin:0">
						Gesendet an: <strong>${safeEmail}</strong>
					</p>
				</div>
			`
		});

		if (error) return fail(500, { error: `Resend Fehler: ${error.message}` });
		return { success: true, action: 'sendTestEmail' };
	},

	createUser: async ({ request }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim().toLowerCase();
		const password = (data.get('password') as string)?.trim();
		const name = (data.get('name') as string)?.trim() || email?.split('@')[0] || '';
		const role = (data.get('role') as string) === 'admin' ? 'admin' : 'user';

		if (!email || !email.includes('@')) return fail(400, { error: 'Gültige E-Mail erforderlich' });
		if (!password || password.length < 8) return fail(400, { error: 'Passwort min. 8 Zeichen' });

		const existing = await db
			.select({ id: userTable.id })
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1);
		if (existing.length > 0) return fail(400, { error: 'E-Mail bereits registriert' });

		const userId = crypto.randomUUID();
		const hashed = await hashPassword(password);

		await db.insert(userTable).values({
			id: userId,
			name: name || email.split('@')[0],
			email,
			emailVerified: true,
			role
		});

		await db.insert(accountTable).values({
			id: crypto.randomUUID(),
			userId,
			providerId: 'credential',
			accountId: userId,
			password: hashed
		});

		if (env.RESEND_API_KEY) {
			const resend = new Resend(env.RESEND_API_KEY);
			const FROM = env.RESEND_FROM ?? 'GA Tool <noreply@ga-tool.app>';
			const base = env.ORIGIN ?? 'https://ga-tool.app';
			const firstName = name.split(' ')[0] || name;
			await resend.emails
				.send({
					from: FROM,
					to: email,
					subject: 'Dein GA Tool Account ist bereit',
					html: `
					<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem">
						<div style="background:#2563eb;border-radius:0.75rem;padding:1.5rem;margin-bottom:1.5rem;text-align:center">
							<h1 style="color:#fff;margin:0;font-size:1.5rem">GA Tool</h1>
							<p style="color:#bfdbfe;margin:0.25rem 0 0;font-size:0.875rem">Gebäudeautomation Referenz</p>
						</div>
						<h2 style="margin:0 0 0.75rem;color:#1e293b">Hallo ${firstName}!</h2>
						<p style="color:#475569;margin:0 0 1.25rem;line-height:1.6">
							Ein Administrator hat einen Account für dich erstellt. Du kannst dich ab sofort anmelden.
						</p>
						<table style="width:100%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:1rem;margin-bottom:1.5rem;border-collapse:collapse">
							<tr><td style="padding:0.25rem 0;color:#64748b;font-size:0.875rem">E-Mail</td><td style="padding:0.25rem 0;font-weight:600;color:#1e293b;font-size:0.875rem">${email}</td></tr>
							<tr><td style="padding:0.25rem 0;color:#64748b;font-size:0.875rem">Passwort</td><td style="padding:0.25rem 0;font-weight:600;color:#1e293b;font-size:0.875rem;font-family:monospace">${password}</td></tr>
						</table>
						<a href="${base}/login" style="display:block;text-align:center;background:#2563eb;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600">Jetzt anmelden →</a>
						<p style="color:#94a3b8;font-size:0.75rem;margin:1.5rem 0 0;text-align:center">Bitte ändere dein Passwort nach der ersten Anmeldung im Profil.</p>
					</div>
				`
				})
				.catch(() => {});
		}

		return { success: true, action: 'createUser', newUserId: userId };
	}
};
