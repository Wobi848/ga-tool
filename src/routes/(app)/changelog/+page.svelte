<script lang="ts">
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	let { data }: { data: PageData } = $props();
	const isEn = $derived($locale === 'en');
	const html = $derived(isEn && data.htmlEn ? data.htmlEn : data.htmlDe);
</script>

<div class="page">
	<div class="header">
		<h1>{$_('changelog.title')}</h1>
		<p class="sub">{$_('changelog.subtitle')}</p>
	</div>
	<div class="changelog prose">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</div>
</div>

<style>
	.page {
		max-width: 760px;
	}

	.header {
		margin-bottom: 2rem;
	}

	.header h1 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.sub {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0;
	}

	.changelog :global(h2) {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
		margin: 2rem 0 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.changelog :global(h2:first-child) {
		margin-top: 0;
	}

	.changelog :global(h3) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 1.25rem 0 0.5rem;
	}

	.changelog :global(ul) {
		margin: 0 0 0.75rem;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.changelog :global(li) {
		font-size: 0.875rem;
		color: var(--text);
		line-height: 1.55;
	}

	.changelog :global(strong) {
		color: var(--color-primary);
		font-weight: 600;
	}

	.changelog :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.changelog :global(p) {
		font-size: 0.875rem;
		color: var(--muted);
		margin: 0.25rem 0;
	}
</style>
