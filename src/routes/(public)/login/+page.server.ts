import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(302, '/');
	return {};
};

export const actions: Actions = {
	login: async (event) => {
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
		const data = await event.request.formData();
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const name = data.get('name')?.toString() ?? '';

		if (!email || !password || !name) {
			return fail(400, { message: 'Alle Felder erforderlich', mode: 'register' });
		}

		try {
			await auth.api.signUpEmail({ body: { email, password, name } });
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, { message: err.message, mode: 'register' });
			}
			return fail(500, { message: 'Unbekannter Fehler', mode: 'register' });
		}

		redirect(302, '/');
	}
};
