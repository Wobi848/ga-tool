<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _, locale } from 'svelte-i18n';
	import { checklists, countItems } from '$lib/checklisten';
	import {
		objekt as ladeObjekt,
		objektAendern,
		anlagen as ladeAnlagen,
		anlageAnlegen,
		anlageLoeschen,
		durchlaeufe as ladeDurchlaeufe,
		durchlaufAnlegen,
		durchlaufAbschliessen,
		durchlaufLoeschen,
		fortschritt
	} from '$lib/objekte/store';
	import type { Anlage, Durchlauf, Objekt } from '$lib/objekte/types';

	const id = $derived($page.params.id!);

	let objekt = $state<Objekt | null>(null);
	let anlagenListe = $state<Anlage[]>([]);
	let laeufe = $state<Durchlauf[]>([]);
	let geladen = $state(false);

	let anlageName = $state('');
	let neuVorlage = $state('');
	let neuTitel = $state('');
	let neuAnlage = $state('');
	let bearbeiten = $state(false);

	const isEn = $derived($locale === 'en');
	const vorlagen = $derived(
		[...checklists].sort((a, b) =>
			(isEn ? (a.title_en ?? a.title) : a.title).localeCompare(
				isEn ? (b.title_en ?? b.title) : b.title
			)
		)
	);

	function neuLaden() {
		objekt = ladeObjekt(id);
		anlagenListe = ladeAnlagen(id);
		laeufe = ladeDurchlaeufe(id);
		geladen = true;
	}

	onMount(neuLaden);

	function anlageHinzu(e: Event) {
		e.preventDefault();
		if (!anlageName.trim()) return;
		anlageAnlegen(id, anlageName);
		anlageName = '';
		neuLaden();
	}

	function anlageWeg(a: Anlage) {
		if (!confirm($_('objekte.anlageLoeschenFrage'))) return;
		anlageLoeschen(a.id);
		neuLaden();
	}

	function durchlaufStarten(e: Event) {
		e.preventDefault();
		const vorlage = checklists.find((c) => c.slug === neuVorlage);
		if (!vorlage) return;
		const d = durchlaufAnlegen({
			objektId: id,
			vorlage: vorlage.slug,
			// Ohne eigene Bezeichnung den Vorlagentitel nehmen — ein leeres Feld
			// in der Liste hilft niemandem.
			titel: neuTitel.trim() || (isEn ? (vorlage.title_en ?? vorlage.title) : vorlage.title),
			anlageId: neuAnlage || undefined,
			gesamt: countItems(vorlage)
		});
		neuTitel = '';
		neuVorlage = '';
		goto(`/checklisten/${vorlage.slug}?durchlauf=${d.id}`);
	}

	function abschliessen(d: Durchlauf) {
		durchlaufAbschliessen(d.id, !d.abgeschlossenAm);
		neuLaden();
	}

	function durchlaufWeg(d: Durchlauf) {
		if (!confirm($_('objekte.durchlaufLoeschenFrage'))) return;
		durchlaufLoeschen(d.id);
		neuLaden();
	}

	function speichereKopf() {
		if (!objekt) return;
		objektAendern(id, {
			name: objekt.name,
			adresse: objekt.adresse,
			auftraggeber: objekt.auftraggeber,
			notiz: objekt.notiz
		});
		bearbeiten = false;
		neuLaden();
	}

	/** Durchläufe einer Anlage — `null` heisst: die ohne Anlage. */
	function laeufeVon(anlageId: string | null) {
		return laeufe.filter((d) => (anlageId ? d.anlageId === anlageId : !d.anlageId));
	}

	/** Nach Anlage gruppiert, die ohne Anlage zuletzt. */
	const gruppen = $derived([
		...anlagenListe.map((a) => ({ anlage: a as Anlage | null, items: laeufeVon(a.id) })),
		{ anlage: null as Anlage | null, items: laeufeVon(null) }
	]);

	function datum(ms: number) {
		return new Date(ms).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit' });
	}
</script>

<svelte:head>
	<title>{objekt?.name ?? $_('objekte.title')} — GA Tool</title>
</svelte:head>

<div class="seite">
	<a href="/objekte" class="zurueck">← {$_('objekte.zurueck')}</a>

	{#if geladen && !objekt}
		<div class="karte leer"><p>{$_('objekte.keine')}</p></div>
	{:else if objekt}
		<header>
			{#if bearbeiten}
				<div class="karte form">
					<label>
						{$_('objekte.name')}
						<input bind:value={objekt.name} />
					</label>
					<div class="zwei">
						<label>
							{$_('objekte.adresse')}
							<input bind:value={objekt.adresse} />
						</label>
						<label>
							{$_('objekte.auftraggeber')}
							<input bind:value={objekt.auftraggeber} />
						</label>
					</div>
					<label>
						{$_('objekte.notiz')}
						<textarea bind:value={objekt.notiz} rows="2"></textarea>
					</label>
					<div class="knoepfe">
						<button class="haupt" onclick={speichereKopf}>{$_('objekte.speichern')}</button>
						<button onclick={() => (bearbeiten = false)}>{$_('objekte.abbrechen')}</button>
					</div>
				</div>
			{:else}
				<div>
					<h1>{objekt.name}</h1>
					{#if objekt.adresse || objekt.auftraggeber}
						<p class="unter">
							{[objekt.adresse, objekt.auftraggeber].filter(Boolean).join(' · ')}
						</p>
					{/if}
					{#if objekt.notiz}<p class="notiz">{objekt.notiz}</p>{/if}
				</div>
				<button onclick={() => (bearbeiten = true)}>{$_('objekte.bearbeiten')}</button>
			{/if}
		</header>

		<section>
			<h2>{$_('objekte.durchlaeufe')}</h2>
			<form onsubmit={durchlaufStarten} class="karte form">
				<div class="drei">
					<label>
						{$_('objekte.vorlage')}
						<select bind:value={neuVorlage} required>
							<option value="">{$_('objekte.vorlageWaehlen')}</option>
							{#each vorlagen as v (v.slug)}
								<option value={v.slug}>{isEn ? (v.title_en ?? v.title) : v.title}</option>
							{/each}
						</select>
					</label>
					<label>
						{$_('objekte.durchlaufTitel')}
						<input bind:value={neuTitel} placeholder={$_('objekte.durchlaufTitelPlaceholder')} />
					</label>
					<label>
						{$_('objekte.anlagen')}
						<select bind:value={neuAnlage}>
							<option value="">{$_('objekte.ohneAnlage')}</option>
							{#each anlagenListe as a (a.id)}
								<option value={a.id}>{a.name}</option>
							{/each}
						</select>
					</label>
				</div>
				<div class="knoepfe">
					<button type="submit" class="haupt" disabled={!neuVorlage}>
						{$_('objekte.durchlaufNeu')}
					</button>
					<span class="unter">{$_('objekte.mehrereHinweis')}</span>
				</div>
			</form>

			{#if laeufe.length === 0}
				<p class="unter">{$_('objekte.keineDurchlaeufe')}</p>
			{:else}
				{#each gruppen as gruppe (gruppe.anlage?.id ?? '__ohne')}
					{#if gruppe.items.length || gruppe.anlage}
						<div class="gruppe">
							<div class="gruppenkopf">
								<h3>{gruppe.anlage ? gruppe.anlage.name : $_('objekte.ohneAnlage')}</h3>
								{#if gruppe.anlage}
									{@const a = gruppe.anlage}
									<button class="klein gefahr" onclick={() => anlageWeg(a)}>
										{$_('objekte.loeschen')}
									</button>
								{/if}
							</div>
							{#if gruppe.items.length === 0}
								<p class="unter klein">{$_('objekte.keineDurchlaeufe')}</p>
							{:else}
								<ul class="liste">
									{#each gruppe.items as d (d.id)}
										<li class="karte" class:fertig={d.abgeschlossenAm}>
											<a href="/checklisten/{d.vorlage}?durchlauf={d.id}" class="titel">
												<span class="name">{d.titel}</span>
												<span class="unter">
													{d.erledigt}/{d.gesamt}
													{$_('objekte.erledigt')} · {datum(d.geaendertAm)}
													{#if d.abgeschlossenAm}· {$_('objekte.abgeschlossen')}{/if}
												</span>
											</a>
											<div class="balken" aria-hidden="true">
												<div style="width: {fortschritt(d)}%"></div>
											</div>
											<div class="aktionen">
												<button class="klein" onclick={() => abschliessen(d)}>
													{d.abgeschlossenAm
														? $_('objekte.wiederOeffnen')
														: $_('objekte.abschliessen')}
												</button>
												<button class="klein gefahr" onclick={() => durchlaufWeg(d)}>
													{$_('objekte.loeschen')}
												</button>
											</div>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/if}
				{/each}
			{/if}
		</section>

		<section>
			<h2>{$_('objekte.anlagen')}</h2>
			<form onsubmit={anlageHinzu} class="karte form zeile">
				<input bind:value={anlageName} placeholder={$_('objekte.anlageNamePlaceholder')} />
				<button type="submit" disabled={!anlageName.trim()}>{$_('objekte.anlageNeu')}</button>
			</form>
			{#if anlagenListe.length === 0}
				<p class="unter">{$_('objekte.keineAnlagen')}</p>
			{/if}
		</section>
	{/if}
</div>

<style>
	.seite {
		max-width: 56rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 3rem;
	}
	.zurueck {
		display: inline-block;
		margin-bottom: 1rem;
		color: var(--muted);
		text-decoration: none;
		font-size: 0.875rem;
	}
	.zurueck:hover {
		color: var(--text);
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.75rem;
	}
	header > .karte {
		flex: 1;
	}
	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.75rem;
		letter-spacing: 0.02em;
	}
	h2 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted);
		margin: 0 0 0.6rem;
	}
	h3 {
		margin: 0;
		font-size: 0.95rem;
	}
	section {
		margin-bottom: 2rem;
	}
	.unter {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}
	.unter.klein {
		font-size: 0.8rem;
	}
	.notiz {
		margin: 0.5rem 0 0;
		font-size: 0.875rem;
	}
	.karte {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}
	.form.zeile {
		flex-direction: row;
		align-items: center;
	}
	.form.zeile input {
		flex: 1;
	}
	.zwei,
	.drei {
		display: grid;
		gap: 0.75rem;
	}
	.zwei {
		grid-template-columns: 1fr 1fr;
	}
	.drei {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (max-width: 40rem) {
		.zwei,
		.drei {
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
	input,
	select,
	textarea {
		padding: 0.5rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		background: var(--bg);
		color: var(--text);
		font: inherit;
	}
	.knoepfe {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
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
	button.klein {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
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
	.gruppe {
		margin-bottom: 1.25rem;
	}
	.gruppenkopf {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.4rem;
	}
	.liste {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.liste li {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem 1rem;
		align-items: center;
	}
	.liste li.fertig {
		opacity: 0.65;
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
	.balken {
		grid-column: 1;
		height: 4px;
		background: var(--border);
		border-radius: 2px;
		overflow: hidden;
	}
	.balken div {
		height: 100%;
		background: var(--color-secondary, #0d9488);
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
		padding: 2rem 1rem;
	}
</style>
