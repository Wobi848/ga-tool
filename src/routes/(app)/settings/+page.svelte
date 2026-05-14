<script lang="ts">
	import { theme, type Theme } from '$lib/stores/theme';
	import { setLang, locale } from '$lib/i18n';
	import { _ } from 'svelte-i18n';

	const themes: { value: Theme; label: string }[] = [
		{ value: 'auto', label: 'Auto (System)' },
		{ value: 'light', label: 'Hell' },
		{ value: 'dark', label: 'Dunkel' },
		{ value: 'oled', label: 'OLED' }
	];

	const languages = [
		{ value: 'de', label: 'Deutsch' },
		{ value: 'en', label: 'English' }
	];
</script>

<svelte:head>
	<title>Einstellungen — GA Tool</title>
</svelte:head>

<div class="settings-page">
	<h1>Einstellungen</h1>

	<div class="settings-sections">
		<!-- Theme -->
		<section class="settings-section card">
			<h2>Darstellung</h2>

			<div class="setting-row">
				<label for="theme-select">Theme</label>
				<div class="theme-options">
					{#each themes as t}
						<button
							class="theme-btn"
							class:active={$theme === t.value}
							onclick={() => theme.set(t.value)}
						>
							{t.label}
						</button>
					{/each}
				</div>
			</div>

			<div class="setting-row">
				<label for="lang-select">Sprache</label>
				<select
					id="lang-select"
					class="input-base"
					style="width: auto"
					value={$locale}
					onchange={(e) => setLang(e.currentTarget.value as 'de' | 'en')}
				>
					{#each languages as lang}
						<option value={lang.value}>{lang.label}</option>
					{/each}
				</select>
			</div>
		</section>

		<!-- Info -->
		<section class="settings-section card">
			<h2>Info</h2>
			<div class="info-row">
				<span>Version</span>
				<span class="text-muted">v0.0.1</span>
			</div>
			<div class="info-row">
				<span>Stack</span>
				<span class="text-muted">SvelteKit · SQLite · better-auth</span>
			</div>
		</section>
	</div>
</div>

<style>
	.settings-page { max-width: 600px; }

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 1.5rem;
	}

	.settings-sections { display: flex; flex-direction: column; gap: 1rem; }

	.settings-section h2 {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 1rem;
	}

	.setting-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
	}

	.setting-row + .setting-row {
		border-top: 1px solid var(--border);
	}

	.setting-row label {
		font-size: 0.9375rem;
		color: var(--text);
		flex-shrink: 0;
	}

	.theme-options {
		display: flex;
		gap: 0.375rem;
		flex-wrap: wrap;
	}

	.theme-btn {
		padding: 0.375rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 500;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
		font-family: var(--font-sans);
	}

	.theme-btn:hover { color: var(--text); border-color: var(--color-primary); }
	.theme-btn.active {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		font-size: 0.9375rem;
		color: var(--text);
	}

	.info-row + .info-row { border-top: 1px solid var(--border); }
</style>
