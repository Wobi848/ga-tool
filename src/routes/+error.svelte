<script lang="ts">
	import { page } from '$app/stores';
	import './layout.css';

	const status = $derived($page.status);
	const message = $derived($page.error?.message ?? 'Unbekannter Fehler');

	const title = $derived(
		status === 404
			? 'Seite nicht gefunden'
			: status === 403
				? 'Zugriff verweigert'
				: status === 401
					? 'Nicht angemeldet'
					: 'Serverfehler'
	);

	const description = $derived(
		status === 404
			? 'Die aufgerufene Seite existiert nicht oder wurde verschoben.'
			: status === 403
				? 'Sie haben keine Berechtigung für diese Seite.'
				: status === 401
					? 'Bitte melden Sie sich an, um fortzufahren.'
					: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
	);
</script>

<svelte:head>
	<title>{status} — {title}</title>
</svelte:head>

<div class="error-page">
	<div class="error-card">
		<div class="error-code">{status}</div>
		<h1 class="error-title">{title}</h1>
		<p class="error-desc">{description}</p>
		{#if status >= 500}
			<p class="error-detail">{message}</p>
		{/if}
		<div class="error-actions">
			<a href="/" class="btn-primary">Zur Startseite</a>
			<button type="button" class="btn-ghost" onclick={() => history.back()}>Zurück</button>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		background: var(--bg, #f8fafc);
		color: var(--text, #0f172a);
		font-family: 'Rubik', system-ui, sans-serif;
		min-height: 100vh;
	}

	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: var(--bg);
	}

	.error-card {
		text-align: center;
		max-width: 420px;
		width: 100%;
	}

	.error-code {
		font-family: 'Bebas Neue', 'Rubik', sans-serif;
		font-size: 7rem;
		line-height: 1;
		color: var(--color-primary, #ea580c);
		letter-spacing: 0.02em;
		margin-bottom: 0.5rem;
		opacity: 0.9;
	}

	.error-title {
		font-family: 'Bebas Neue', 'Rubik', sans-serif;
		font-size: 1.75rem;
		font-weight: 400;
		letter-spacing: 0.04em;
		margin: 0 0 0.75rem;
		color: var(--text);
	}

	.error-desc {
		color: var(--muted, #64748b);
		font-size: 0.9375rem;
		margin: 0 0 0.5rem;
		line-height: 1.5;
	}

	.error-detail {
		font-size: 0.8125rem;
		color: var(--muted);
		background: var(--surface, #fff);
		border: 1px solid var(--border, #e2e8f0);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		margin: 0.5rem 0 0;
		font-family: ui-monospace, monospace;
		word-break: break-word;
	}

	.error-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.btn-primary {
		background: var(--color-primary, #ea580c);
		color: #fff;
		border: none;
		border-radius: 0.5rem;
		padding: 0.625rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		font-family: inherit;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.15s;
	}

	.btn-primary:hover {
		background: var(--color-primary-hover, #c2410c);
	}

	.btn-ghost {
		background: transparent;
		color: var(--muted, #64748b);
		border: 1px solid var(--border, #e2e8f0);
		border-radius: 0.5rem;
		padding: 0.625rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.btn-ghost:hover {
		background: var(--surface-hover, #f1f5f9);
		color: var(--text, #0f172a);
	}
</style>
