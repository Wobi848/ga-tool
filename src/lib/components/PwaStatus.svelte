<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let isOnline = $state(true);
	let showOfflineReady = $state(false);
	let isStandalone = $state(false);
	let installPromptEvent: (Event & { prompt: () => Promise<void> }) | null = $state(null);
	let installDismissed = $state(false);

	onMount(() => {
		let unsubOffline: (() => void) | undefined;

		isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			('standalone' in navigator && (navigator as Navigator & { standalone: boolean }).standalone);

		// Dynamic import keeps navigator/SW calls out of SSR
		import('virtual:pwa-register/svelte').then(({ useRegisterSW }) => {
			const { offlineReady } = useRegisterSW();
			unsubOffline = offlineReady.subscribe((ready) => {
				if (ready) {
					showOfflineReady = true;
					setTimeout(() => (showOfflineReady = false), 4000);
				}
			});
		});

		isOnline = navigator.onLine;
		const goOnline = () => (isOnline = true);
		const goOffline = () => (isOnline = false);
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		const beforeInstall = (e: Event) => {
			e.preventDefault();
			installPromptEvent = e as Event & { prompt: () => Promise<void> };
		};
		window.addEventListener('beforeinstallprompt', beforeInstall);

		return () => {
			unsubOffline?.();
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
			window.removeEventListener('beforeinstallprompt', beforeInstall);
		};
	});

	async function installApp() {
		if (!installPromptEvent) return;
		await installPromptEvent.prompt();
		installPromptEvent = null;
	}

	function dismissInstall() {
		installDismissed = true;
		installPromptEvent = null;
	}
</script>

{#if !isOnline && isStandalone}
	<div class="offline-banner" role="status" aria-live="polite">
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		>
			<line x1="1" y1="1" x2="23" y2="23" />
			<path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
			<path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
			<path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
			<path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
			<path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
			<line x1="12" y1="20" x2="12.01" y2="20" stroke-width="3" />
		</svg>
		{$_('pwa.offline')}
	</div>
{/if}

{#if showOfflineReady}
	<div class="toast toast--ready" role="status">
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<polyline points="22 4 12 14.01 9 11.01" />
		</svg>
		{$_('pwa.offlineReady')}
		<button
			class="toast-close"
			onclick={() => (showOfflineReady = false)}
			aria-label={$_('nav.close')}>×</button
		>
	</div>
{/if}

{#if installPromptEvent && !installDismissed}
	<div class="toast toast--install" role="status">
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="7 10 12 15 17 10" />
			<line x1="12" y1="15" x2="12" y2="3" />
		</svg>
		<span>{$_('pwa.install')}</span>
		<button class="toast-action" onclick={installApp}>{$_('pwa.installBtn')}</button>
		<button class="toast-close" onclick={dismissInstall} aria-label={$_('nav.close')}>×</button>
	</div>
{/if}

<style>
	.offline-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: #b45309;
		color: #fff;
		font-size: 0.8125rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
	}

	.toast {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9998;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		border-radius: 0.625rem;
		font-size: 0.8125rem;
		font-weight: 500;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
	}

	.toast--ready {
		background: #166534;
		color: #bbf7d0;
		bottom: 5rem;
	}

	.toast--install {
		background: var(--surface);
		color: var(--text);
		border: 1px solid var(--border);
		bottom: 5rem;
		gap: 0.625rem;
	}

	.toast-action {
		background: var(--color-primary);
		color: #fff;
		border: none;
		border-radius: 0.375rem;
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
	}

	.toast-close {
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		padding: 0 0.125rem;
		opacity: 0.7;
		font-family: inherit;
	}

	.toast-close:hover {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.toast {
			bottom: 4.5rem;
			left: 1rem;
			right: 1rem;
			transform: none;
			white-space: normal;
		}
		.toast--ready {
			bottom: 5rem;
		}
		.toast--install {
			bottom: 5rem;
		}
	}
</style>
