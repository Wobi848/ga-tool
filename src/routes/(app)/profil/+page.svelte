<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, untrack } from 'svelte';
	import { theme, type Theme } from '$lib/stores/theme';
	import { getRecent, clearRecent, type RecentItem } from '$lib/stores/recent';
	import { swissNormOutdoor } from '$lib/rechner/heizkurve';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const initial = untrack(() => data.profile);

	const disciplines = ['HLK', 'Sanitär', 'Elektro', 'GA', 'IT', 'Normen'];
	const manufacturers = ['Siemens', 'Viessmann', 'Buderus', 'Honeywell', 'Sauter', 'Schneider Electric', 'Saia/Beckhoff', 'WAGO'];
	const roles = [
		'Servicetechniker',
		'Projektleiter',
		'Inbetriebnehmer',
		'Planer / Ingenieur',
		'Lernender',
		'Andere'
	];
	const themes: Array<{ id: Theme; label: string }> = [
		{ id: 'auto', label: 'Auto' },
		{ id: 'light', label: 'Hell' },
		{ id: 'dark', label: 'Dunkel' },
		{ id: 'oled', label: 'OLED' }
	];

	// Form state — initialized from server, locally editable
	let editName = $state(initial.name);
	let editProfileRole = $state(initial.profileRole);
	let editCompany = $state(initial.company);
	let editDisciplines: string[] = $state([...initial.disciplines]);
	let editMfrPrefs: string[] = $state([...initial.mfrPrefs]);
	let editDefaultCity = $state(initial.defaultCity);
	let editNotes = $state(initial.notes);

	let savedFlash = $state(false);
	let saving = $state(false);

	$effect(() => {
		if (form?.success) {
			savedFlash = true;
			setTimeout(() => (savedFlash = false), 2000);
		}
	});

	function toggle(arr: string[], v: string): string[] {
		return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
	}

	// Recent items (client-only)
	let recents: RecentItem[] = $state([]);
	onMount(() => {
		recents = getRecent();
	});

	function formatTimeAgo(ts: number): string {
		const sec = (Date.now() - ts) / 1000;
		if (sec < 60) return 'gerade eben';
		if (sec < 3600) return `vor ${Math.floor(sec / 60)} min`;
		if (sec < 86400) return `vor ${Math.floor(sec / 3600)} h`;
		return `vor ${Math.floor(sec / 86400)} Tagen`;
	}

	const typeLabel: Record<RecentItem['type'], string> = {
		konverter: 'Konverter',
		rechner: 'Rechner',
		wissen: 'Artikel',
		referenz: 'Referenz',
		checkliste: 'Checkliste'
	};

	const typeColor: Record<RecentItem['type'], string> = {
		konverter: '#2563eb',
		rechner: '#ea580c',
		wissen: '#16a34a',
		referenz: '#0891b2',
		checkliste: '#7c3aed'
	};

	function urlFor(item: RecentItem) {
		return `/${item.type}/${item.slug}`;
	}

	function clearRecents() {
		clearRecent();
		recents = [];
	}
</script>

<div class="profile-page">
	<header class="profile-header">
		<h1>Profil</h1>
		<p class="subtitle">Persönliche Daten, Präferenzen und Übersicht</p>
	</header>

	<!-- Profile card summary -->
	<div class="profile-card">
		<div class="profile-avatar">
			{(editName || data.profile.email)[0]?.toUpperCase()}
		</div>
		<div class="profile-info">
			<h2 class="profile-name">{editName || '—'}</h2>
			<p class="profile-email">{data.profile.email}</p>
			{#if editProfileRole || editCompany}
				<p class="profile-meta">
					{#if editProfileRole}{editProfileRole}{/if}{#if editProfileRole && editCompany} · {/if}{#if editCompany}{editCompany}{/if}
				</p>
			{/if}
			{#if data.profile.role === 'admin'}
				<span class="badge badge-admin">Admin</span>
			{/if}
		</div>
	</div>

	{#if editDisciplines.length || editMfrPrefs.length}
		<div class="chips-row">
			{#each editDisciplines as d}
				<span class="chip chip-discipline">{d}</span>
			{/each}
			{#each editMfrPrefs as m}
				<span class="chip chip-mfr">{m}</span>
			{/each}
		</div>
	{/if}

	<!-- Recent items -->
	<section class="section">
		<header class="section-header">
			<h2 class="section-title">Zuletzt verwendet</h2>
			{#if recents.length}
				<button class="btn-link" onclick={clearRecents}>Leeren</button>
			{/if}
		</header>
		{#if recents.length === 0}
			<p class="empty">Noch nichts geöffnet. Konverter und Rechner erscheinen hier nach dem ersten Aufruf.</p>
		{:else}
			<div class="recent-list">
				{#each recents as item}
					<a href={urlFor(item)} class="recent-item">
						<span class="recent-type" style="background: {typeColor[item.type]}20; color: {typeColor[item.type]}">
							{typeLabel[item.type]}
						</span>
						<span class="recent-name">{item.name}</span>
						<span class="recent-time">{formatTimeAgo(item.at)}</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Quick settings -->
	<section class="section">
		<h2 class="section-title">Schnelleinstellungen</h2>
		<div class="setting-row">
			<span class="setting-label">Theme</span>
			<div class="theme-buttons">
				{#each themes as t}
					<button
						class="theme-btn"
						class:active={$theme === t.id}
						onclick={() => theme.set(t.id)}
					>{t.label}</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Profile form -->
	<form method="POST" action="?/save" use:enhance={() => {
		saving = true;
		return async ({ update }) => {
			await update({ reset: false });
			saving = false;
		};
	}}>
		<section class="section">
			<h2 class="section-title">Persönliche Daten</h2>
			<div class="form-grid">
				<label class="form-field">
					<span class="form-label">Name</span>
					<input name="name" type="text" bind:value={editName} required class="form-input" />
				</label>
				<label class="form-field">
					<span class="form-label">E-Mail</span>
					<input type="email" value={data.profile.email} readonly disabled class="form-input" />
					<span class="form-hint">E-Mail ist via Anmeldung gesetzt</span>
				</label>
				<label class="form-field">
					<span class="form-label">Berufliche Rolle</span>
					<select name="profileRole" bind:value={editProfileRole} class="form-input">
						<option value="">— wählen —</option>
						{#each roles as r}
							<option value={r}>{r}</option>
						{/each}
					</select>
				</label>
				<label class="form-field">
					<span class="form-label">Firma</span>
					<input name="company" type="text" bind:value={editCompany} class="form-input" />
				</label>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Fachbereiche</h2>
			<p class="section-hint">Mehrfachauswahl — beeinflusst Filter in der Wissensbasis</p>
			<div class="chips-edit">
				{#each disciplines as d}
					<label class="chip-toggle">
						<input
							type="checkbox"
							name="disciplines"
							value={d}
							checked={editDisciplines.includes(d)}
							onchange={() => (editDisciplines = toggle(editDisciplines, d))}
						/>
						<span>{d}</span>
					</label>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Bevorzugte Hersteller</h2>
			<p class="section-hint">Wird als Default im Heizkurven-Rechner verwendet</p>
			<div class="chips-edit">
				{#each manufacturers as m}
					<label class="chip-toggle">
						<input
							type="checkbox"
							name="mfrPrefs"
							value={m}
							checked={editMfrPrefs.includes(m)}
							onchange={() => (editMfrPrefs = toggle(editMfrPrefs, m))}
						/>
						<span>{m}</span>
					</label>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Standard-Standort</h2>
			<p class="section-hint">Setzt automatisch die Normaussentemperatur im Heizkurven-Rechner</p>
			<div class="form-grid">
				<label class="form-field">
					<span class="form-label">Ort (CH)</span>
					<select name="defaultCity" bind:value={editDefaultCity} class="form-input">
						<option value="">— kein Default —</option>
						{#each swissNormOutdoor as c}
							<option value={c.ort}>{c.ort} ({c.t} °C)</option>
						{/each}
					</select>
				</label>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Notizen</h2>
			<label class="form-field">
				<span class="form-hint">Eigene Notizen, Setup-Infos, etc.</span>
				<textarea name="notes" bind:value={editNotes} rows="5" class="form-input form-textarea"></textarea>
			</label>
		</section>

		<div class="form-actions">
			{#if form?.error}
				<span class="form-error">{form.error}</span>
			{/if}
			{#if savedFlash}
				<span class="form-success">✓ Gespeichert</span>
			{/if}
			<button type="submit" class="btn-primary" disabled={saving}>
				{saving ? 'Speichern…' : 'Speichern'}
			</button>
		</div>
	</form>
</div>

<style>
	.profile-page {
		max-width: 640px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.profile-header {
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.subtitle {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0;
	}

	/* Profile card */
	.profile-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.profile-avatar {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.profile-info {
		flex: 1;
		min-width: 0;
	}

	.profile-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 0.15rem;
	}

	.profile-email {
		font-size: 0.875rem;
		color: var(--muted);
		margin: 0 0 0.25rem;
	}

	.profile-meta {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0;
	}

	.badge {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		border-radius: 1rem;
		font-size: 0.7rem;
		font-weight: 600;
		margin-top: 0.25rem;
	}

	.badge-admin {
		background: color-mix(in srgb, var(--color-primary) 15%, transparent);
		color: var(--color-primary);
	}

	/* Chip row preview */
	.chips-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		padding: 0 0.25rem 1rem;
	}

	.chip {
		font-size: 0.7rem;
		font-weight: 500;
		padding: 0.2rem 0.55rem;
		border-radius: 1rem;
	}

	.chip-discipline {
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.chip-mfr {
		background: color-mix(in srgb, var(--muted) 20%, transparent);
		color: var(--text);
	}

	/* Sections */
	.section {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem 1.25rem;
		margin-bottom: 0.75rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 0;
	}

	.section-hint {
		font-size: 0.75rem;
		color: var(--muted);
		margin: 0.25rem 0 0.75rem;
	}

	.empty {
		font-size: 0.8125rem;
		color: var(--muted);
		font-style: italic;
		margin: 0.5rem 0;
	}

	/* Recent list */
	.recent-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.recent-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		color: var(--text);
		transition: background 0.15s;
	}

	.recent-item:hover {
		background: var(--surface-hover);
	}

	.recent-type {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 0.25rem;
		min-width: 4.5rem;
		text-align: center;
	}

	.recent-name {
		flex: 1;
		font-size: 0.875rem;
	}

	.recent-time {
		font-size: 0.7rem;
		color: var(--muted);
	}

	.btn-link {
		background: none;
		border: none;
		color: var(--muted);
		font-size: 0.75rem;
		cursor: pointer;
		text-decoration: underline;
		font-family: inherit;
	}

	.btn-link:hover {
		color: var(--color-primary);
	}

	/* Setting row */
	.setting-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.setting-label {
		font-size: 0.875rem;
		color: var(--text);
	}

	.theme-buttons {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.theme-btn {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text);
		font-family: inherit;
		cursor: pointer;
	}

	.theme-btn.active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	/* Form grid */
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	@media (max-width: 540px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.form-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--muted);
	}

	.form-hint {
		font-size: 0.7rem;
		color: var(--muted);
		opacity: 0.8;
	}

	.form-input {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.5rem 0.625rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
		width: 100%;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	.form-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-textarea {
		resize: vertical;
		font-family: inherit;
	}

	/* Chips edit */
	.chips-edit {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.chip-toggle {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}

	.chip-toggle input {
		display: none;
	}

	.chip-toggle span {
		display: inline-block;
		font-size: 0.8125rem;
		padding: 0.3rem 0.7rem;
		border-radius: 1rem;
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text);
		transition: all 0.15s;
	}

	.chip-toggle input:checked + span {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	/* Form actions */
	.form-actions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: 0.5rem;
		padding: 0.625rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
	}

	.btn-primary:hover {
		background: var(--color-primary-hover);
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.form-error {
		color: #dc2626;
		font-size: 0.8125rem;
	}

	.form-success {
		color: #16a34a;
		font-size: 0.8125rem;
		font-weight: 500;
	}
</style>
