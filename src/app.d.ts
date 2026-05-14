import type { Session } from 'better-auth/minimal';

type User = import('better-auth/minimal').User & {
	role?: 'admin' | 'user' | null;
	banned?: boolean | null;
	profileRole?: string | null;
	company?: string | null;
	disciplines?: string | null;
	mfrPrefs?: string | null;
	defaultCity?: string | null;
	notes?: string | null;
};

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: User;
			session?: Session;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

/// <reference types="vite-plugin-pwa/svelte" />

export {};
