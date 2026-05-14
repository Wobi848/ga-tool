<script lang="ts">
	import { areaLabels, difficultyLabels, difficultyColors } from '$lib/wissen/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const article = $derived(data.article);
	const html = $derived(data.html);
	const related = $derived(data.related);
</script>

<svelte:head>
	<title>{article.title} · Wissensbasis</title>
</svelte:head>

<article class="page">
	<header class="article-header">
		<a href="/wissen" class="back-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Wissensbasis
		</a>

		<div class="meta-row">
			<span class="cat">{article.category}{#if article.subcategory} · {article.subcategory}{/if}</span>
			<span class="diff-badge" style:background={difficultyColors[article.difficulty] + '20'} style:color={difficultyColors[article.difficulty]}>
				{difficultyLabels[article.difficulty]}
			</span>
		</div>

		<h1>{article.title}</h1>

		<div class="badges">
			{#each article.area as a}
				<span class="area-chip">{areaLabels[a]}</span>
			{/each}
			{#each article.norm as n}
				<span class="norm-chip">{n}</span>
			{/each}
		</div>

		{#if article.tags.length}
			<div class="tags">
				{#each article.tags as t}
					<span class="tag-chip">#{t}</span>
				{/each}
			</div>
		{/if}

		{#if article.updated}
			<p class="updated">Aktualisiert: {article.updated}</p>
		{/if}
	</header>

	<div class="prose">
		{@html html}
	</div>

	{#if related.length}
		<aside class="related">
			<h2>Verwandte Artikel</h2>
			<div class="related-list">
				{#each related as r}
					<a href="/wissen/{r.slug}" class="related-card">
						<span class="related-title">{r.title}</span>
						<span class="related-cat">{r.category}</span>
					</a>
				{/each}
			</div>
		</aside>
	{/if}
</article>

<style>
	.page {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.article-header {
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8125rem;
		color: var(--muted);
		text-decoration: none;
		margin-bottom: 0.75rem;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.meta-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.cat {
		font-size: 0.75rem;
		color: var(--muted);
		text-transform: capitalize;
	}

	.diff-badge {
		font-size: 0.65rem;
		padding: 0.15rem 0.5rem;
		border-radius: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.5rem;
		line-height: 1.2;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 0.4rem;
	}

	.area-chip {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.norm-chip {
		font-size: 0.7rem;
		font-weight: 500;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		color: var(--color-primary);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-top: 0.4rem;
	}

	.tag-chip {
		font-size: 0.7rem;
		color: var(--muted);
		padding: 0.12rem 0.45rem;
		border-radius: 0.3rem;
		background: var(--surface-hover);
	}

	.updated {
		font-size: 0.7rem;
		color: var(--muted);
		opacity: 0.7;
		margin: 0.5rem 0 0;
	}

	/* Markdown prose */
	.prose {
		font-size: 0.9375rem;
		line-height: 1.65;
		color: var(--text);
	}

	.prose :global(h1) {
		display: none; /* h1 already rendered from frontmatter title */
	}

	.prose :global(h2) {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 2rem 0 0.75rem;
		color: var(--text);
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--border);
	}

	.prose :global(h3) {
		font-size: 1.05rem;
		font-weight: 600;
		margin: 1.5rem 0 0.5rem;
		color: var(--text);
	}

	.prose :global(h4) {
		font-size: 0.95rem;
		font-weight: 600;
		margin: 1.25rem 0 0.4rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.prose :global(p) {
		margin: 0.6rem 0 0.9rem;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 0.6rem 0 0.9rem;
		padding-left: 1.5rem;
	}

	.prose :global(li) {
		margin: 0.3rem 0;
	}

	.prose :global(li > p) {
		margin: 0.3rem 0;
	}

	.prose :global(strong) {
		font-weight: 600;
		color: var(--text);
	}

	.prose :global(em) {
		font-style: italic;
	}

	.prose :global(a) {
		color: var(--color-primary);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	.prose :global(a:hover) {
		color: var(--color-primary-hover);
	}

	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.85em;
		background: var(--surface);
		padding: 0.12em 0.35em;
		border-radius: 0.25rem;
		border: 1px solid var(--border);
	}

	.prose :global(pre) {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		overflow-x: auto;
		margin: 0.75rem 0 1rem;
		font-size: 0.85rem;
		line-height: 1.5;
	}

	.prose :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
	}

	.prose :global(blockquote) {
		border-left: 3px solid var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 6%, transparent);
		padding: 0.5rem 1rem;
		margin: 0.75rem 0;
		border-radius: 0 0.5rem 0.5rem 0;
		color: var(--text);
	}

	.prose :global(blockquote p) {
		margin: 0.3rem 0;
	}

	.prose :global(table) {
		border-collapse: collapse;
		margin: 0.75rem 0 1rem;
		width: 100%;
		font-size: 0.8125rem;
	}

	.prose :global(th),
	.prose :global(td) {
		text-align: left;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		vertical-align: top;
	}

	.prose :global(th) {
		background: var(--surface);
		font-weight: 600;
		color: var(--text);
	}

	.prose :global(tr:nth-child(even) td) {
		background: color-mix(in srgb, var(--surface) 50%, transparent);
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	/* Related */
	.related {
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}

	.related h2 {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 0 0 0.5rem;
	}

	.related-list {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.related-card {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.625rem 0.875rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		text-decoration: none;
		color: var(--text);
		transition: border-color 0.15s;
	}

	.related-card:hover {
		border-color: var(--color-primary);
	}

	.related-title {
		font-weight: 500;
		font-size: 0.875rem;
	}

	.related-cat {
		font-size: 0.7rem;
		color: var(--muted);
		text-transform: capitalize;
	}
</style>
