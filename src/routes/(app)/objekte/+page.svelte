<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { checklists, countItems } from '$lib/checklisten';
	import {
		objekte as ladeObjekte,
		objektAnlegen,
		objektArchivieren,
		objektLoeschen,
		durchlaeufe as ladeDurchlaeufe,
		uebernehmeAlteStaende
	} from '$lib/objekte/store';
	import type { Objekt } from '$lib/objekte/types';
	import { abgleichen, zuletztAbgeglichen } from '$lib/objekte/sync';
	import { page } from '$app/stores';

	let liste = $state<Objekt[]>([]);
	let mitArchivierten = $state(false);
	let formOffen = $state(false);
	let name = $state('');
	let adresse = $state('');
	let auftraggeber = $state('');
	let uebernommen = $state(0);
	let abgleichStand = $state<number | null>(null);
	let abgleichLaeuft = $state(false);
	let abgleichMeldung = $state('');

	/** Angemeldet? Dann lohnt sich der Abgleich überhaupt. */
	const angemeldet = $derived(Boolean($page.data?.user));

	/** Anzahl Durchläufe je Objekt — ohne das steht in der Liste nur ein Name. */
	let anzahl = $state<Record<string, number>>({});

	function neuLaden() {
		liste = ladeObjekte(!mitArchivierten);
		const n: Record<string, number> = {};
		for (const o of liste) n[o.id] = ladeDurchlaeufe(o.id).length;
		anzahl = n;
	}

	onMount(() => {
		// Frühere Checklisten hereinholen, bevor die Liste gebaut wird — sonst
		// steht beim ersten Aufruf «keine Objekte», obwohl Arbeit da ist.
		uebernommen = uebernehmeAlteStaende(
			(vorlage) => checklists.find((c) => c.slug === vorlage)?.title ?? vorlage,
			(vorlage) => {
				const c = checklists.find((x) => x.slug === vorlage);
				return c ? countItems(c) : 0;
			}
		);
		neuLaden();
		abgleichStand = zuletztAbgeglichen();
		// Beim Öffnen einmal abgleichen, wenn jemand angemeldet ist. Ohne Konto
		// bleibt alles hier — wie bisher.
		if (angemeldet) void starteAbgleich();
	});

	async function starteAbgleich() {
		if (abgleichLaeuft) return;
		abgleichLaeuft = true;
		abgleichMeldung = '';
		const e = await abgleichen();
		abgleichLaeuft = false;
		if (e.ok) {
			abgleichStand = e.abgeglichenAm;
			neuLaden();
		} else if (e.grund === 'kein-netz') {
			abgleichMeldung = $_('objekte.abgleichKeinNetz');
		} else if (e.grund === 'fehler') {
			abgleichMeldung = $_('objekte.abgleichFehler');
		}
	}

	function zeitpunkt(ms: number) {
		return new Date(ms).toLocaleString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function anlegen(e: Event) {
		e.preventDefault();
		if (!name.trim()) return;
		objektAnlegen({ name, adresse, auftraggeber });
		name = adresse = auftraggeber = '';
		formOffen = false;
		neuLaden();
	}

	function archivieren(o: Objekt) {
		objektArchivieren(o.id, !o.archiviertAm);
		neuLaden();
	}

	function loeschen(o: Objekt) {
		if (!confirm($_('objekte.loeschenFrage'))) return;
		objektLoeschen(o.id);
		neuLaden();
	}

	function datum(ms: number) {
		return new Date(ms).toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{$_('objekte.title')} — GA Tool</title>
</svelte:head>

<div class="seite">
	<header>
		<div>
			<h1>{$_('objekte.title')}</h1>
			<p class="unter">{$_('objekte.subtitle')}</p>
		</div>
		<button class="haupt" onclick={() => (formOffen = !formOffen)}>
			{$_('objekte.neu')}
		</button>
	</header>

	{#if uebernommen > 0}
		<div class="hinweis" role="status">
			<strong>{$_('objekte.uebernommenTitel')}</strong>
			<span>{$_('objekte.uebernommenText', { values: { anzahl: uebernommen } })}</span>
		</div>
	{/if}

	{#if formOffen}
		<form onsubmit={anlegen} class="karte form">
			<label>
				{$_('objekte.name')}
				<!-- svelte-ignore a11y_autofocus -->
				<input bind:value={name} placeholder={$_('objekte.namePlaceholder')} autofocus required />
			</label>
			<div class="zwei">
				<label>
					{$_('objekte.adresse')}
					<input bind:value={adresse} />
				</label>
				<label>
					{$_('objekte.auftraggeber')}
					<input bind:value={auftraggeber} />
				</label>
			</div>
			<div class="knoepfe">
				<button type="submit" class="haupt" disabled={!name.trim()}>{$_('objekte.anlegen')}</button>
				<button type="button" onclick={() => (formOffen = false)}>{$_('objekte.abbrechen')}</button>
			</div>
		</form>
	{/if}

	{#if liste.length === 0}
		<div class="karte leer">
			<p><strong>{$_('objekte.keine')}</strong></p>
			<p class="unter">{$_('objekte.keineHinweis')}</p>
		</div>
	{:else}
		<ul class="liste">
			{#each liste as o (o.id)}
				<li class="karte" class:archiviert={o.archiviertAm}>
					<a href="/objekte/{o.id}" class="titel">
						<span class="name">{o.name}</span>
						{#if o.adresse}<span class="unter">{o.adresse}</span>{/if}
					</a>
					<div class="meta">
						{#if o.archiviertAm}<span class="marke">{$_('objekte.archiviert')}</span>{/if}
						<span class="unter">{anzahl[o.id] ?? 0} {$_('objekte.durchlaeufe')}</span>
						<span class="unter">{datum(o.geaendertAm)}</span>
					</div>
					<div class="aktionen">
						<button onclick={() => archivieren(o)}>
							{o.archiviertAm ? $_('objekte.reaktivieren') : $_('objekte.archivieren')}
						</button>
						<button class="gefahr" onclick={() => loeschen(o)}>{$_('objekte.loeschen')}</button>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="abgleich">
		{#if angemeldet}
			<span class="unter">
				{#if abgleichLaeuft}
					{$_('objekte.abgleichLaeuft')}
				{:else if abgleichStand}
					{$_('objekte.abgeglichen')}: {zeitpunkt(abgleichStand)}
				{:else}
					{$_('objekte.abgleich')}: —
				{/if}
			</span>
			<button onclick={starteAbgleich} disabled={abgleichLaeuft}>
				{$_('objekte.abgleichenJetzt')}
			</button>
		{:else}
			<span class="unter" title={$_('objekte.nieAbgeglichenHinweis')}>
				{$_('objekte.nieAbgeglichen')}
			</span>
		{/if}
		{#if abgleichMeldung}<span class="unter warnung">{abgleichMeldung}</span>{/if}
	</div>

	<label class="schalter">
		<input type="checkbox" bind:checked={mitArchivierten} onchange={neuLaden} />
		{$_('objekte.archivierteZeigen')}
	</label>
</div>

<style>
	.seite {
		max-width: 56rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 3rem;
	}
	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}
	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.75rem;
		letter-spacing: 0.02em;
	}
	.unter {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}
	.karte {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem;
	}
	.hinweis {
		background: var(--surface);
		border: 1px solid var(--color-secondary, #0d9488);
		border-radius: 0.75rem;
		padding: 0.875rem 1rem;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}
	.zwei {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}
	@media (max-width: 32rem) {
		.zwei {
			grid-template-columns: 1fr;
		}
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: 0.85rem;
		color: var(--muted);
	}
	input:not([type='checkbox']) {
		padding: 0.5rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		background: var(--bg);
		color: var(--text);
		font: inherit;
	}
	.knoepfe {
		display: flex;
		gap: 0.5rem;
	}
	button {
		font: inherit;
		font-size: 0.875rem;
		padding: 0.45rem 0.9rem;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}
	button:hover:not(:disabled) {
		background: var(--surface-hover);
	}
	button:disabled {
		opacity: 0.5;
		cursor: default;
	}
	button.haupt {
		background: var(--color-primary, #ea580c);
		border-color: var(--color-primary, #ea580c);
		color: #fff;
	}
	button.gefahr:hover {
		border-color: #dc2626;
		color: #dc2626;
	}
	.liste {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.liste li {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem 1rem;
		align-items: center;
	}
	.liste li.archiviert {
		opacity: 0.6;
	}
	.titel {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
	}
	.titel .name {
		font-weight: 600;
	}
	.titel:hover .name {
		text-decoration: underline;
	}
	.meta {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		grid-column: 1;
	}
	.marke {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		border: 1px solid var(--border);
		border-radius: 0.35rem;
		padding: 0.1rem 0.4rem;
		color: var(--muted);
	}
	.aktionen {
		display: flex;
		gap: 0.4rem;
		grid-row: 1 / span 2;
		grid-column: 2;
	}
	@media (max-width: 34rem) {
		.aktionen {
			grid-row: auto;
			grid-column: 1;
		}
	}
	.leer {
		text-align: center;
		padding: 2.5rem 1rem;
	}
	.abgleich {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}
	.abgleich .unter {
		margin: 0;
	}
	.warnung {
		color: #dc2626;
	}
	.schalter {
		flex-direction: row;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1.25rem;
		cursor: pointer;
	}
</style>
