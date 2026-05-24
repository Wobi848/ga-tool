<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, untrack } from 'svelte';
	import type { Theme } from '$lib/stores/theme';
	import { getRecent, clearRecent, type RecentItem } from '$lib/stores/recent';
	import { _, locale } from 'svelte-i18n';
	import { rechnerMap } from '$lib/rechner';
	import { articleMap } from '$lib/wissen/articles';
	import { converterMap } from '$lib/converters';
	import { referenceMap } from '$lib/referenz';
	import { checklistMap } from '$lib/checklisten';
	import type { ActionData, PageData } from './$types';

	const isEn = $derived($locale === 'en');

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const initial = untrack(() => data.profile);

	const disciplines = ['HLK', 'Sanitär', 'Elektro', 'GA', 'IT', 'Normen'];
	const disciplineLabelEn: Record<string, string> = {
		HLK: 'HVAC',
		Sanitär: 'Plumbing',
		Elektro: 'Electrical',
		GA: 'BA',
		IT: 'IT',
		Normen: 'Standards'
	};
	const manufacturers = [
		'Siemens',
		'Viessmann',
		'Buderus',
		'Honeywell',
		'Sauter',
		'Schneider Electric',
		'Saia/Beckhoff',
		'WAGO'
	];
	const roles = [
		{ value: 'Servicetechniker', label_de: 'Servicetechniker', label_en: 'Service Technician' },
		{ value: 'Projektleiter', label_de: 'Projektleiter', label_en: 'Project Manager' },
		{ value: 'Inbetriebnehmer', label_de: 'Inbetriebnehmer', label_en: 'Commissioning Engineer' },
		{ value: 'Planer / Ingenieur', label_de: 'Planer / Ingenieur', label_en: 'Planner / Engineer' },
		{ value: 'Lernender', label_de: 'Lernender', label_en: 'Apprentice' },
		{ value: 'Andere', label_de: 'Andere', label_en: 'Other' }
	];
	const _themeIds: Theme[] = ['auto', 'light', 'dark', 'oled'];

	// Form state — initialized from server, locally editable
	let editName = $state(initial.name);
	let editProfileRole = $state(initial.profileRole);
	let editCompany = $state(initial.company);
	let editDisciplines: string[] = $state([...initial.disciplines]);
	let editMfrPrefs: string[] = $state([...initial.mfrPrefs]);
	let editDefaultCity = $state(initial.defaultCity ?? '');
	let editDefaultTemp = $state<string>(
		initial.defaultTemp !== null ? String(initial.defaultTemp) : ''
	);
	let editNotes = $state(initial.notes);

	let savedFlash = $state(false);
	let saving = $state(false);
	let pwSaving = $state(false);
	let pwFlash = $state(false);
	let showPwModal = $state(false);
	let pwCurrent = $state('');
	let pwNew = $state('');
	let pwConfirm = $state('');

	$effect(() => {
		if (form?.success) {
			savedFlash = true;
			setTimeout(() => (savedFlash = false), 2000);
		}
		if ((form as { pwSuccess?: boolean } | null)?.pwSuccess) {
			pwFlash = true;
			showPwModal = false;
			pwCurrent = '';
			pwNew = '';
			pwConfirm = '';
			setTimeout(() => (pwFlash = false), 2500);
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
		if (isEn) {
			if (sec < 60) return 'just now';
			if (sec < 3600) return `${Math.floor(sec / 60)} min ago`;
			if (sec < 86400) return `${Math.floor(sec / 3600)} h ago`;
			return `${Math.floor(sec / 86400)} days ago`;
		}
		if (sec < 60) return 'gerade eben';
		if (sec < 3600) return `vor ${Math.floor(sec / 60)} min`;
		if (sec < 86400) return `vor ${Math.floor(sec / 3600)} h`;
		return `vor ${Math.floor(sec / 86400)} Tagen`;
	}

	function resolveRecentTitle(item: RecentItem): string {
		if (item.type === 'rechner') {
			const r = rechnerMap[item.slug];
			return (isEn && r?.name_en ? r.name_en : r?.name) ?? item.name;
		}
		if (item.type === 'konverter') {
			const c = converterMap[item.slug];
			return (isEn && c?.name_en ? c.name_en : c?.name) ?? item.name;
		}
		if (item.type === 'wissen') {
			const a = articleMap[item.slug];
			return (isEn && a?.title_en ? a.title_en : a?.title) ?? item.name;
		}
		if (item.type === 'referenz') {
			const t = referenceMap[item.slug];
			return (isEn && t?.title_en ? t.title_en : t?.title) ?? item.name;
		}
		if (item.type === 'checkliste') {
			const c = checklistMap[item.slug];
			return (isEn && c?.title_en ? c.title_en : c?.title) ?? item.name;
		}
		return item.name;
	}

	const typeLabel: Record<RecentItem['type'], string> = $derived({
		konverter: $_('profil.typeKonverter'),
		rechner: $_('profil.typeRechner'),
		wissen: $_('profil.typeWissen'),
		referenz: $_('profil.typeReferenz'),
		checkliste: $_('profil.typeCheckliste')
	});

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
		<h1>{$_('profil.title')}</h1>
		<p class="subtitle">{$_('profil.subtitle')}</p>
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
					{#if editProfileRole}{editProfileRole}{/if}{#if editProfileRole && editCompany}
						·
					{/if}{#if editCompany}{editCompany}{/if}
				</p>
			{/if}
			{#if data.profile.role === 'systemadmin'}
				<span class="badge badge-admin">System Admin</span>
			{:else if data.profile.role === 'admin'}
				<span class="badge badge-admin">{$_('profil.admin')}</span>
			{/if}
		</div>
	</div>

	{#if editDisciplines.length || editMfrPrefs.length}
		<div class="chips-row">
			{#each editDisciplines as d (d)}
				<span class="chip chip-discipline">{d}</span>
			{/each}
			{#each editMfrPrefs as m (m)}
				<span class="chip chip-mfr">{m}</span>
			{/each}
		</div>
	{/if}

	<!-- Passwort ändern -->
	<div class="section pw-section">
		<div class="pw-section-inner">
			<div>
				<h2 class="section-title">{$_('profil.changePassword')}</h2>
				{#if pwFlash}
					<p class="pw-changed-ok">{$_('profil.passwordChanged')}</p>
				{:else}
					<p class="pw-hint">{$_('profil.currentPassword')}</p>
				{/if}
			</div>
			<button type="button" class="btn-secondary btn-sm" onclick={() => (showPwModal = true)}>
				{$_('profil.changePassword')}
			</button>
		</div>
	</div>

	<!-- Recent items -->
	<section class="section">
		<header class="section-header">
			<h2 class="section-title">{$_('profil.recentlyUsed')}</h2>
			{#if recents.length}
				<button class="btn-link" onclick={clearRecents}>{$_('profil.clear')}</button>
			{/if}
		</header>
		{#if recents.length === 0}
			<p class="empty">{$_('profil.emptyRecent')}</p>
		{:else}
			<div class="recent-list">
				{#each recents as item (item.type + '/' + item.slug)}
					<a href={urlFor(item)} class="recent-item">
						<span
							class="recent-type"
							style="background: {typeColor[item.type]}20; color: {typeColor[item.type]}"
						>
							{typeLabel[item.type]}
						</span>
						<span class="recent-name">{resolveRecentTitle(item)}</span>
						<span class="recent-time">{formatTimeAgo(item.at)}</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Profile form -->
	<form
		method="POST"
		action="?/save"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => {
				await update({ reset: false });
				saving = false;
			};
		}}
	>
		<section class="section">
			<h2 class="section-title">{$_('profil.personalData')}</h2>
			<div class="form-grid">
				<label class="form-field">
					<span class="form-label">{$_('profil.nameLabel')}</span>
					<input name="name" type="text" bind:value={editName} required class="form-input" />
				</label>
				<label class="form-field">
					<span class="form-label">{$_('profil.emailLabel')}</span>
					<input type="email" value={data.profile.email} readonly disabled class="form-input" />
					<span class="form-hint">{$_('profil.emailHint')}</span>
				</label>
				<label class="form-field">
					<span class="form-label">{$_('profil.roleLabel')}</span>
					<select name="profileRole" bind:value={editProfileRole} class="form-input">
						<option value="">{$_('profil.rolePlaceholder')}</option>
						{#each roles as r (r)}
							<option value={r.value}>{isEn ? r.label_en : r.label_de}</option>
						{/each}
					</select>
				</label>
				<label class="form-field">
					<span class="form-label">{$_('profil.companyLabel')}</span>
					<input name="company" type="text" bind:value={editCompany} class="form-input" />
				</label>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">{$_('profil.disciplines')}</h2>
			<p class="section-hint">{$_('profil.disciplinesHint')}</p>
			<div class="chips-edit">
				{#each disciplines as d (d)}
					<label class="chip-toggle">
						<input
							type="checkbox"
							name="disciplines"
							value={d}
							checked={editDisciplines.includes(d)}
							onchange={() => (editDisciplines = toggle(editDisciplines, d))}
						/>
						<span>{isEn ? (disciplineLabelEn[d] ?? d) : d}</span>
					</label>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">{$_('profil.mfrPrefs')}</h2>
			<p class="section-hint">{$_('profil.mfrPrefsHint')}</p>
			<div class="chips-edit">
				{#each manufacturers as m (m)}
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
			<h2 class="section-title">{$_('profil.defaultCity')}</h2>
			<p class="section-hint">{$_('profil.defaultCityHint')}</p>
			<div class="form-grid">
				<label class="form-field">
					<span class="form-label">{$_('profil.cityLabel')}</span>
					<input
						name="defaultCity"
						type="text"
						bind:value={editDefaultCity}
						placeholder="z.B. Rapperswil"
						class="form-input"
					/>
				</label>
				<label class="form-field">
					<span class="form-label">{$_('profil.normTemp')} (°C)</span>
					<input
						name="defaultTemp"
						type="number"
						step="0.5"
						bind:value={editDefaultTemp}
						placeholder="z.B. -10"
						class="form-input"
					/>
				</label>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">{$_('profil.notesLabel')}</h2>
			<label class="form-field">
				<span class="form-hint">{$_('profil.notesHint')}</span>
				<textarea name="notes" bind:value={editNotes} rows="5" class="form-input form-textarea"
				></textarea>
			</label>
		</section>

		<div class="form-actions">
			{#if form?.error}
				<span class="form-error">{$_('profil.errors.' + form.error, { default: form.error })}</span>
			{/if}
			{#if savedFlash}
				<span class="form-success">{$_('profil.saved')}</span>
			{/if}
			<button type="submit" class="btn-primary" disabled={saving}>
				{saving ? $_('profil.saving') : $_('profil.save')}
			</button>
		</div>
	</form>
</div>

<!-- Password Modal -->
{#if showPwModal}
	<div
		class="modal-backdrop"
		onkeydown={(e) => e.key === 'Escape' && (showPwModal = false)}
		role="presentation"
	>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="pw-modal-title"
			tabindex="-1"
		>
			<div class="modal-header">
				<h3 id="pw-modal-title">{$_('profil.changePassword')}</h3>
				<button class="modal-close" onclick={() => (showPwModal = false)} aria-label="Schliessen">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><path d="M18 6 6 18M6 6l12 12" /></svg
					>
				</button>
			</div>
			<form
				method="post"
				action="?/changePassword"
				use:enhance={() => {
					pwSaving = true;
					return async ({ update }) => {
						pwSaving = false;
						update();
					};
				}}
			>
				<div class="modal-body">
					<div class="form-field">
						<label class="form-label" for="cp-current">{$_('profil.currentPassword')}</label>
						<input
							id="cp-current"
							name="currentPassword"
							type="password"
							autocomplete="current-password"
							required
							class="form-input"
							bind:value={pwCurrent}
						/>
					</div>
					<div class="form-field">
						<label class="form-label" for="cp-new">{$_('profil.newPassword')}</label>
						<input
							id="cp-new"
							name="newPassword"
							type="password"
							autocomplete="new-password"
							minlength="8"
							required
							class="form-input"
							bind:value={pwNew}
						/>
					</div>
					<div class="form-field">
						<label class="form-label" for="cp-confirm">{$_('profil.confirmPassword')}</label>
						<input
							id="cp-confirm"
							name="confirmPassword"
							type="password"
							autocomplete="new-password"
							minlength="8"
							required
							class="form-input"
							bind:value={pwConfirm}
						/>
					</div>
					{#if (form as { pwError?: string } | null)?.pwError}
						<p class="form-error">
							{$_('profil.errors.' + (form as { pwError: string }).pwError, {
								default: (form as { pwError: string }).pwError
							})}
						</p>
					{/if}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn-secondary btn-sm" onclick={() => (showPwModal = false)}
						>Abbrechen</button
					>
					<button
						type="submit"
						class="btn-primary btn-sm"
						disabled={pwSaving || pwNew.length < 8 || pwNew !== pwConfirm}
					>
						{pwSaving ? $_('profil.changing') : $_('profil.changePassword')}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.profile-page {
		max-width: 720px;
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

	.btn-secondary {
		background: transparent;
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.625rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.btn-secondary:disabled {
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

	/* Password section */
	.pw-section-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.pw-hint {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0.25rem 0 0;
	}

	.pw-changed-ok {
		font-size: 0.8125rem;
		color: #16a34a;
		font-weight: 500;
		margin: 0.25rem 0 0;
	}

	.btn-sm {
		font-size: 0.8125rem;
		padding: 0.4rem 1rem;
		white-space: nowrap;
	}

	/* Modal */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 1rem;
		width: 100%;
		max-width: 400px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.25rem 0;
	}

	.modal-header h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
	}

	.modal-close {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		border-radius: 0.375rem;
		transition: color 0.15s;
	}

	.modal-close:hover {
		color: var(--text);
	}

	.modal-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 0 1.25rem 1.25rem;
	}
</style>
