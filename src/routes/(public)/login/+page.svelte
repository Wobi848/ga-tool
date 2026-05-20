<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let loading = $state(false);
	let mode = $state<'login' | 'register'>('login');
	if ((form as { mode?: string } | null)?.mode === 'register') mode = 'register';

	const verifyPending = $derived(!!(form as { verifyPending?: boolean } | null)?.verifyPending);
	const verifyEmail = $derived((form as { email?: string } | null)?.email ?? '');
	const resentOk = $derived(!!(form as { resentOk?: boolean } | null)?.resentOk);
</script>

<svelte:head>
	<title>{mode === 'login' ? 'Anmelden' : 'Account erstellen'} — GA Tool</title>
</svelte:head>

<div class="page">
	<div class="container">
		<!-- Logo -->
		<div class="logo-block">
			<div class="logo-icon">
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
			</div>
			<h1>GA Tool</h1>
			<p>Gebäudeautomation Referenz</p>
		</div>

		<!-- E-Mail verification pending -->
		{#if verifyPending}
			<div class="card verify-card">
				<div class="verify-icon">✉️</div>
				<h2>E-Mail bestätigen</h2>
				<p class="verify-text">
					Wir haben einen Bestätigungslink an <strong>{verifyEmail}</strong> gesendet.
					Klicke den Link in der E-Mail um deinen Account zu aktivieren.
				</p>
				<p class="verify-sub">Kein E-Mail erhalten? Prüfe deinen Spam-Ordner.</p>
				{#if form?.message && !resentOk}
					<p class="error-msg" style="margin-bottom: 0.75rem">{form.message}</p>
				{/if}
				{#if resentOk}
					<p class="resent-ok">E-Mail erneut gesendet ✓</p>
				{:else}
					<form method="POST" action="?/resendVerification" use:enhance={() => {
						loading = true;
						return async ({ update }) => { loading = false; update(); };
					}}>
						<input type="hidden" name="email" value={verifyEmail} />
						<button type="submit" class="btn-primary resend-btn" disabled={loading}>
							{loading ? '…' : 'E-Mail erneut senden'}
						</button>
					</form>
				{/if}
				<button class="toggle-btn" onclick={() => mode = 'login'}>Zurück zur Anmeldung</button>
			</div>
		{:else}
			<!-- Auth card -->
			<div class="card">
				<h2>{mode === 'login' ? 'Anmelden' : 'Account erstellen'}</h2>

				<form
					method="post"
					action={mode === 'login' ? '?/login' : '?/register'}
					use:enhance={() => {
						loading = true;
						return async ({ update }) => { loading = false; update(); };
					}}
					class="form"
				>
					{#if mode === 'register'}
						<div class="field">
							<label for="name">Name</label>
							<input id="name" name="name" type="text" autocomplete="name" required class="input-base" placeholder="Max Muster" />
						</div>
					{/if}

					<div class="field">
						<label for="email">E-Mail</label>
						<input id="email" name="email" type="email" autocomplete="email" required class="input-base" placeholder="name@beispiel.ch" />
					</div>

					<div class="field">
						<label for="password">Passwort</label>
						<input id="password" name="password" type="password" autocomplete={mode === 'login' ? 'current-password' : 'new-password'} required class="input-base" placeholder="••••••••" />
					</div>

					{#if form?.message}
						<p class="error-msg">{form.message}</p>
					{/if}

					<button type="submit" disabled={loading} class="btn-primary submit-btn">
						{loading ? '…' : mode === 'login' ? 'Anmelden' : 'Account erstellen'}
					</button>
				</form>

				<div class="divider"></div>

				<button class="toggle-btn" onclick={() => (mode = mode === 'login' ? 'register' : 'login')}>
					{mode === 'login' ? 'Noch kein Account? Erstellen' : 'Bereits registriert? Anmelden'}
				</button>
			</div>
		{/if}

		<a href="/" class="back-link">← Zurück zur App</a>
		<p class="footer-note">Nur Session-Cookies · Kein Tracking</p>
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background-color: var(--bg);
	}

	.container { width: 100%; max-width: 360px; }

	.logo-block { text-align: center; margin-bottom: 2rem; }

	.logo-icon {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 1rem;
		background-color: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 0.75rem;
	}

	.logo-block h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.logo-block p { color: var(--muted); margin: 0; font-size: 0.9375rem; }

	.card h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 1.25rem;
	}

	.form { display: flex; flex-direction: column; gap: 0.875rem; }

	.field { display: flex; flex-direction: column; gap: 0.375rem; }

	.field label { font-size: 0.875rem; font-weight: 500; color: var(--text); }

	.error-msg {
		font-size: 0.875rem;
		color: #dc2626;
		background: #fef2f2;
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
	}

	.submit-btn { width: 100%; padding: 0.625rem; margin-top: 0.25rem; font-size: 0.9375rem; }

	.divider {
		height: 1px;
		background: var(--border);
		margin: 1.25rem 0;
	}

	.toggle-btn {
		width: 100%;
		background: none;
		border: none;
		color: var(--color-primary);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		font-family: var(--font-sans);
		padding: 0;
	}

	.toggle-btn:hover { text-decoration: underline; }

	.back-link {
		display: block;
		text-align: center;
		color: var(--muted);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1.25rem;
	}
	.back-link:hover { color: var(--color-primary); }

	.footer-note { text-align: center; color: var(--muted); font-size: 0.75rem; margin-top: 0.75rem; }

	.verify-card { text-align: center; }
	.verify-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
	.verify-card h2 { margin: 0 0 1rem; }
	.verify-text { font-size: 0.9375rem; color: var(--text); line-height: 1.6; margin: 0 0 0.5rem; }
	.verify-sub { font-size: 0.8125rem; color: var(--muted); margin: 0 0 1rem; }

	.resend-btn { width: 100%; padding: 0.5rem; font-size: 0.875rem; margin-bottom: 0.75rem; }

	.resent-ok {
		font-size: 0.875rem; color: #16a34a;
		background: #f0fdf4; border-radius: 0.5rem;
		padding: 0.5rem 0.75rem; margin: 0 0 0.75rem;
	}
</style>
