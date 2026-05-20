import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import { rateLimit } from '$lib/server/rateLimit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(302, '/');
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const ip = event.getClientAddress();
		if (!rateLimit(`login:${ip}`, 5, 5 * 60 * 1000)) {
			return fail(429, { message: 'Zu viele Anmeldeversuche. Bitte 5 Minuten warten.', mode: 'login' });
		}

		const data = await event.request.formData();
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!email || !password) {
			return fail(400, { message: 'E-Mail und Passwort erforderlich', mode: 'login' });
		}

		try {
			await auth.api.signInEmail({ body: { email, password } });
		} catch {
			return fail(400, { message: 'E-Mail oder Passwort falsch', mode: 'login' });
		}

		redirect(302, '/');
	},

	register: async (event) => {
		const ip = event.getClientAddress();
		if (!rateLimit(`register:${ip}`, 5, 60 * 60 * 1000)) {
			return fail(429, { message: 'Zu viele Registrierungsversuche. Bitte später erneut versuchen.', mode: 'register' });
		}

		const data = await event.request.formData();
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const name = data.get('name')?.toString() ?? '';

		if (!email || !password || !name) {
			return fail(400, { message: 'Alle Felder erforderlich', mode: 'register' });
		}

		try {
			const result = await auth.api.signUpEmail({ body: { email, password, name } });
			// If email verification is required, the user is not yet signed in
			if (!result?.user?.emailVerified) {
				return { verifyPending: true, email };
			}
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, { message: err.message, mode: 'register' });
			}
			return fail(500, { message: 'Unbekannter Fehler', mode: 'register' });
		}

		redirect(302, '/');
	},

	resendVerification: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email')?.toString() ?? '';

		if (!rateLimit(`resend:${email}`, 1, 10 * 60 * 1000)) {
			return fail(429, { message: 'E-Mail wurde bereits gesendet. Bitte 10 Minuten warten.', verifyPending: true, email });
		}

		if (!email) return fail(400, { message: 'E-Mail fehlt', verifyPending: true, email: '' });

		try {
			await auth.api.sendVerificationEmail({ body: { email, callbackURL: '/' } });
		} catch {
			// Silently succeed — don't leak whether an email exists
		}

		return { verifyPending: true, email, resentOk: true };
	}
};
