<script lang="ts">
	import FavButton from '$lib/components/FavButton.svelte';
	import { _, locale } from 'svelte-i18n';
	import type { Lang } from '$lib/generatoren/aks';
	import {
		pruefen,
		stateTextRefs,
		typKurz,
		befundText,
		type EdeErgebnis,
		type Schwere
	} from '$lib/generatoren/ede-pruefer';

	const lang = $derived<Lang>($locale?.startsWith('en') ? 'en' : 'de');

	let edeText = $state('');
	let stText = $state('');
	let aks = $state(true);
	let descMax = $state(64);
	let filter = $state<Schwere | 'alle'>('alle');

	const ergebnis = $derived<EdeErgebnis | null>(
		edeText
			? pruefen(edeText, {
					aks,
					descMax,
					stateTexts: stText ? stateTextRefs(stText) : undefined
				})
			: null
	);
	const anzahl = $derived.by(() => {
		const a = { fehler: 0, warnung: 0, hinweis: 0 };
		for (const b of ergebnis?.befunde ?? []) a[b.schwere]++;
		return a;
	});
	const sichtbar = $derived(
		(ergebnis?.befunde ?? []).filter((b) => filter === 'alle' || b.schwere === filter)
	);

	async function laden(ev: Event, ziel: 'ede' | 'st') {
		const f = (ev.target as HTMLInputElement).files?.[0];
		if (!f) return;
		const buf = await f.arrayBuffer();
		// UTF-8 versuchen, sonst Windows-1252 (häufig bei Excel-Exporten)
		let t = new TextDecoder('utf-8').decode(buf);
		if (t.includes('�')) t = new TextDecoder('windows-1252').decode(buf);
		if (ziel === 'ede') {
			edeText = t;
		} else {
			stText = t;
		}
	}
</script>

<div class="calc-page wide">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M15 18l-6-6 6-6" />
			</svg>
			{$_('common.allCalculators')}
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">{$_('rechner.edePruefer.name')}</h1>
			<FavButton
				type="rechner"
				slug="ede-pruefer"
				title={$_('rechner.edePruefer.name')}
				size={20}
			/>
		</div>
	</header>

	<p class="calc-info">{$_('rechner.edeUi.intro')}</p>

	<div class="calc-section">
		<div class="dateien">
			<label class="datei">
				<span class="calc-field-label">{$_('rechner.edeUi.edeFile')}</span>
				<input type="file" accept=".csv,.txt,text/csv" onchange={(e) => laden(e, 'ede')} />
			</label>
			<label class="datei">
				<span class="calc-field-label">{$_('rechner.edeUi.stateFile')}</span>
				<input type="file" accept=".csv,.txt,text/csv" onchange={(e) => laden(e, 'st')} />
			</label>
		</div>
		<div class="optionen">
			<label><input type="checkbox" bind:checked={aks} /> {$_('rechner.edeUi.checkAks')}</label>
			<label>
				{$_('rechner.edeUi.descLimit')}
				<select class="calc-select" bind:value={descMax}>
					<option value={64}>64 (AS-CH)</option>
					<option value={128}>128 (MBE-CH)</option>
				</select>
			</label>
		</div>
	</div>

	{#if ergebnis}
		<div class="calc-result-section">
			{#if ergebnis.projekt}
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.edeUi.project')}</span>
					<span class="calc-result-value">{ergebnis.projekt}</span>
				</div>
			{/if}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.edeUi.objects')}</span>
				<span class="calc-result-value primary"
					>{ergebnis.objekte.length}
					<span class="calc-result-unit"
						>{$_('rechner.edeUi.inDevices', { values: { n: ergebnis.geraete.length } })}</span
					></span
				>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.edeUi.findings')}</span>
				<span class="calc-result-value">
					<span class="s-fehler">{anzahl.fehler}</span> /
					<span class="s-warnung">{anzahl.warnung}</span> /
					<span class="s-hinweis">{anzahl.hinweis}</span>
				</span>
			</div>
		</div>

		<div class="typen">
			{#each Object.entries(ergebnis.proTyp).sort((a, b) => Number(a[0]) - Number(b[0])) as [t, n] (t)}
				<span class="chip"><b>{typKurz(Number(t))}</b> {n}</span>
			{/each}
		</div>

		<div class="filter">
			{#each ['alle', 'fehler', 'warnung', 'hinweis'] as const as f (f)}
				<button class="chip-btn" class:active={filter === f} onclick={() => (filter = f)}>
					{$_('rechner.edeUi.f_' + f)}
				</button>
			{/each}
		</div>

		{#if sichtbar.length}
			<div class="table-wrap">
				<table class="befunde">
					<thead>
						<tr>
							<th></th>
							<th>{$_('rechner.edeUi.line')}</th>
							<th>Object_Name</th>
							<th>{$_('rechner.edeUi.finding')}</th>
						</tr>
					</thead>
					<tbody>
						{#each sichtbar as b, i (i)}
							<tr>
								<td class="s-{b.schwere}">●</td>
								<td class="num">{b.zeile || '—'}</td>
								<td class="mono">{b.objekt ?? ''}</td>
								<td>{befundText(b, lang)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p class="ok">✓ {$_('rechner.edeUi.noFindings')}</p>
		{/if}
	{/if}

	<p class="calc-info">
		{$_('rechner.edeUi.note')}
		<a href="/wissen/kbob-bacnet">{$_('rechner.aksUi.moreLink')}</a>
	</p>
</div>

<style>
	.wide {
		max-width: 64rem;
	}
	.dateien {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 0.75rem;
	}
	.datei {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: 0.85rem;
	}
	.optionen {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		align-items: center;
		margin-top: 0.75rem;
		font-size: 0.85rem;
	}
	.optionen label {
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}
	.typen,
	.filter {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0.75rem 0;
	}
	.chip {
		font-size: 0.75rem;
		padding: 0.15rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 999px;
	}
	.chip-btn {
		font: inherit;
		font-size: 0.8rem;
		padding: 0.3rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
		color: inherit;
		cursor: pointer;
	}
	.chip-btn.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
	}
	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}
	.befunde {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8rem;
	}
	.befunde th,
	.befunde td {
		padding: 0.3rem 0.5rem;
		border-bottom: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}
	.befunde th {
		background: var(--surface);
	}
	.num {
		text-align: right;
		white-space: nowrap;
	}
	.mono {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		white-space: nowrap;
	}
	.s-fehler {
		color: #dc2626;
	}
	.s-warnung {
		color: #d97706;
	}
	.s-hinweis {
		color: #2563eb;
	}
	.ok {
		color: #16a34a;
		font-weight: 500;
	}
</style>
