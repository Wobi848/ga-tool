import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { Resend } from 'resend';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
const FROM = env.RESEND_FROM ?? 'GA Tool <noreply@ga-tool.app>';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: !!env.RESEND_API_KEY
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			if (!resend) return;
			await resend.emails.send({
				from: FROM,
				to: user.email,
				subject: 'E-Mail bestätigen — GA Tool',
				html: `
					<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem">
						<h2 style="margin:0 0 1rem;color:#1e293b">Willkommen beim GA Tool</h2>
						<p style="color:#475569;margin:0 0 1.5rem">Klicke den Button um deine E-Mail-Adresse zu bestätigen und deinen Account zu aktivieren.</p>
						<a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;padding:0.625rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600">E-Mail bestätigen</a>
						<p style="color:#94a3b8;font-size:0.8125rem;margin:1.5rem 0 0">Falls du dich nicht registriert hast, ignoriere diese E-Mail.</p>
					</div>
				`
			});
		},
		onEmailVerification: async (user) => {
			if (!resend) return;
			const base = env.ORIGIN ?? 'https://ga-tool.app';
			const name = user.name?.split(' ')[0] || 'Hallo';
			const topLinks = [
				{ label: 'Bus-IBN Adressrechner', url: `${base}/rechner/bus-ibn`, desc: 'BACnet / Modbus / KNX Geräteadressen planen' },
				{ label: 'KNX Gruppenadress-Schema', url: `${base}/referenz/knx-gruppenadresse`, desc: 'Strukturierte GA nach DIN EN 60617' },
				{ label: 'CO₂-Regelung', url: `${base}/rechner/co2-regelung`, desc: 'Volumenstrom & Raumverhalten berechnen' },
				{ label: 'PID-Simulator', url: `${base}/rechner/pid-simulator`, desc: 'Regler interaktiv einstellen & verstehen' },
				{ label: 'Abkürzungen', url: `${base}/abkuerzungen`, desc: '500+ GA/HLK-Begriffe auf einen Blick' },
			];
			const linksHtml = topLinks.map(l => `
				<a href="${l.url}" style="display:block;padding:0.75rem 1rem;margin-bottom:0.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;text-decoration:none;color:#1e293b">
					<span style="font-weight:600;font-size:0.9375rem">${l.label}</span><br/>
					<span style="font-size:0.8125rem;color:#64748b">${l.desc}</span>
				</a>
			`).join('');
			await resend.emails.send({
				from: FROM,
				to: user.email,
				subject: 'Willkommen beim GA Tool 🎉',
				html: `
					<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:2rem">
						<div style="background:#2563eb;border-radius:0.75rem;padding:1.5rem;margin-bottom:1.5rem;text-align:center">
							<h1 style="color:#fff;margin:0;font-size:1.5rem">GA Tool</h1>
							<p style="color:#bfdbfe;margin:0.25rem 0 0;font-size:0.875rem">Gebäudeautomation Referenz</p>
						</div>
						<h2 style="margin:0 0 0.5rem;color:#1e293b">Willkommen, ${name}!</h2>
						<p style="color:#475569;margin:0 0 1.5rem;line-height:1.6">Dein Account ist jetzt aktiv. Das GA Tool enthält Rechner, Referenztabellen, Checklisten und Wissensartikel für den GA-Alltag. Hier sind die besten Einstiegspunkte:</p>
						${linksHtml}
						<a href="${base}" style="display:block;text-align:center;background:#2563eb;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600;margin-top:1.25rem">Zum GA Tool →</a>
						<p style="color:#94a3b8;font-size:0.75rem;margin:1.5rem 0 0;text-align:center">GA Tool · Nur Session-Cookies · Kein Tracking</p>
					</div>
				`
			});
		}
	},
	user: {
		additionalFields: {
			profileRole: { type: 'string', required: false },
			company: { type: 'string', required: false },
			disciplines: { type: 'string', required: false },
			mfrPrefs: { type: 'string', required: false },
			defaultCity: { type: 'string', required: false },
			notes: { type: 'string', required: false }
		}
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
