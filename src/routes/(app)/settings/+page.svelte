<script lang="ts">
	import { theme, type Theme } from '$lib/stores/theme';
	import { APP_VERSION } from '$lib/version';
	import { setLang, getSavedLang, type Lang } from '$lib/i18n';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	const themeValues: Theme[] = ['auto', 'light', 'dark', 'oled'];
	const langValues: { value: Lang; labelKey: string }[] = [
		{ value: 'auto', labelKey: 'settings.langAuto' },
		{ value: 'de', labelKey: 'settings.langDe' },
		{ value: 'en', labelKey: 'settings.langEn' }
	];

	let currentLang = $state<Lang>('auto');
	onMount(() => {
		currentLang = getSavedLang();
	});
</script>

<svelte:head>
	<title>{$_('settings.title')} — GA Tool</title>
</svelte:head>

<div class="settings-page">
	<h1>{$_('settings.title')}</h1>

	<div class="settings-sections">
		<!-- Theme -->
		<section class="settings-section card">
			<h2>{$_('settings.theme')}</h2>

			<div class="setting-row">
				<span class="setting-label">{$_('settings.theme')}</span>
				<div class="theme-options">
					{#each themeValues as tv (tv)}
						<button class="theme-btn" class:active={$theme === tv} onclick={() => theme.set(tv)}>
							{$_(`settings.theme${tv.charAt(0).toUpperCase() + tv.slice(1)}`)}
						</button>
					{/each}
				</div>
			</div>

			<div class="setting-row">
				<span class="setting-label">{$_('settings.language')}</span>
				<div class="theme-options">
					{#each langValues as lv (lv)}
						<button
							class="theme-btn"
							class:active={currentLang === lv.value}
							onclick={() => {
								currentLang = lv.value;
								setLang(lv.value);
							}}>{$_(lv.labelKey)}</button
						>
					{/each}
				</div>
			</div>
		</section>

		<!-- Info -->
		<section class="settings-section card">
			<h2>Info</h2>
			<div class="info-row">
				<span>Version</span>
				<span class="text-muted">v{APP_VERSION}</span>
			</div>
			<div class="info-row">
				<span>Stack</span>
				<span class="text-muted">SvelteKit · SQLite · better-auth</span>
			</div>
		</section>
	</div>
</div>

<style>
	.settings-page {
		max-width: 600px;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 1.5rem;
	}

	.settings-sections {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

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

	.theme-btn:hover {
		color: var(--text);
		border-color: var(--color-primary);
	}
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

	.info-row + .info-row {
		border-top: 1px solid var(--border);
	}
</style>
