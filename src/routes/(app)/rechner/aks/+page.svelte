<script lang="ts">
	import FavButton from '$lib/components/FavButton.svelte';
	import { _, locale } from 'svelte-i18n';
	import {
		BTA_ARTEN,
		APPARAT_ARTEN_PROZESS,
		APPARAT_ARTEN_SGK,
		FUNKTIONS_ARTEN,
		ebeneText,
		apparatNrText,
		messanlageText,
		kennzeichen,
		objektname,
		zerlegen,
		pruefen,
		erklaeren,
		type AksTeile,
		type AksFeld,
		type Lang
	} from '$lib/generatoren/aks';

	const lang = $derived<Lang>($locale?.startsWith('en') ? 'en' : 'de');

	let mode = $state<'build' | 'parse'>('build');
	let ort = $state('apparat' as 'feld' | 'apparat');

	let t = $state<Required<AksTeile>>({
		anlage: '3022',
		objekt: 'HZ',
		ebene: '1',
		btaArt: 'L',
		btaNr: '13',
		apparatArt: 'M',
		apparatNr: '100',
		funktionArt: 'S',
		funktionNr: '0'
	});

	const EBENEN = ['3', '2', '1', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	const apparatArten = $derived(ort === 'feld' ? APPARAT_ARTEN_PROZESS : APPARAT_ARTEN_SGK);

	const fehler = $derived(pruefen(t));
	const fehlerVon = (f: AksFeld) => fehler.find((x) => x.feld === f);
	const kz = $derived(kennzeichen(t));
	const kzLesbar = $derived(kennzeichen(t, true));
	const name = $derived(objektname(t));
	const nrHinweis = $derived.by(() => {
		const n = Number(t.apparatNr);
		return /^\d{3}$/.test(t.apparatNr) ? apparatNrText(t.btaArt, n, lang) : null;
	});
	const btaHinweis = $derived(
		(t.btaArt === 'Q' || t.btaArt === 'R') && /^\d{2}$/.test(t.btaNr)
			? messanlageText(Number(t.btaNr), lang)
			: null
	);

	// Zerlegen
	let eingabe = $state('+3022 HZ1 = L13 - M100 : S0');
	const zerlegt = $derived(zerlegen(eingabe));
	const erklaerung = $derived(erklaeren(zerlegt.teile, lang));

	function uebernehmen() {
		const z = zerlegt.teile;
		t = {
			anlage: z.anlage ?? '',
			objekt: z.objekt ?? '',
			ebene: z.ebene ?? '',
			btaArt: z.btaArt ?? '',
			btaNr: z.btaNr ?? '',
			apparatArt: z.apparatArt ?? '',
			apparatNr: z.apparatNr ?? '',
			funktionArt: z.funktionArt ?? '',
			funktionNr: z.funktionNr ?? ''
		};
		if (z.apparatArt && !APPARAT_ARTEN_SGK[z.apparatArt]) ort = 'feld';
		else if (z.apparatArt && !APPARAT_ARTEN_PROZESS[z.apparatArt]) ort = 'apparat';
		mode = 'build';
	}

	let kopiert = $state('');
	async function kopieren(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			kopiert = text;
			setTimeout(() => (kopiert = ''), 1500);
		} catch {
			/* Zwischenablage nicht verfügbar */
		}
	}
</script>

<div class="calc-page">
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
			<h1 class="calc-title">{$_('rechner.aks.name')}</h1>
			<FavButton type="rechner" slug="aks" title={$_('rechner.aks.name')} size={20} />
		</div>
	</header>

	<div class="mode-tabs">
		<button class="mode-tab" class:active={mode === 'build'} onclick={() => (mode = 'build')}>
			{$_('rechner.aksUi.tabBuild')}
		</button>
		<button class="mode-tab" class:active={mode === 'parse'} onclick={() => (mode = 'parse')}>
			{$_('rechner.aksUi.tabParse')}
		</button>
	</div>

	{#if mode === 'build'}
		<div class="calc-result-section">
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.aksUi.kennzeichen')}</span>
				<button class="copy" onclick={() => kopieren(kz)} title={$_('rechner.aksUi.copy')}>
					<span class="calc-result-value primary mono">{kzLesbar}</span>
					<span class="copy-hint">{kopiert === kz ? $_('rechner.aksUi.copied') : '⧉'}</span>
				</button>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.aksUi.objektname')}</span>
				<button class="copy" onclick={() => kopieren(name)} title={$_('rechner.aksUi.copy')}>
					<span class="calc-result-value mono">{name}</span>
					<span class="copy-hint">{kopiert === name ? $_('rechner.aksUi.copied') : '⧉'}</span>
				</button>
			</div>
		</div>
		{#if fehler.length}
			<div class="calc-warning">
				{#each fehler as f (f.feld + f.de)}
					<div>⚠ {$_('rechner.aksUi.f.' + f.feld)}: {f[lang]}</div>
				{/each}
			</div>
		{/if}

		<div class="calc-section">
			<h2 class="calc-section-title">+ {$_('rechner.aksUi.blockOrt')}</h2>
			<div class="row">
				<div class="calc-field">
					<label class="calc-field-label" for="aks-anlage">{$_('rechner.aksUi.f.anlage')}</label>
					<input
						id="aks-anlage"
						class="calc-input mono"
						class:bad={fehlerVon('anlage')}
						maxlength="4"
						inputmode="numeric"
						bind:value={t.anlage}
					/>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="aks-objekt">{$_('rechner.aksUi.f.objekt')}</label>
					<input
						id="aks-objekt"
						class="calc-input mono"
						class:bad={fehlerVon('objekt')}
						maxlength="2"
						bind:value={t.objekt}
					/>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="aks-ebene">{$_('rechner.aksUi.f.ebene')}</label>
					<select id="aks-ebene" class="calc-select" bind:value={t.ebene}>
						<option value="">—</option>
						{#each EBENEN as e (e)}
							<option value={e}>{e} · {ebeneText(e, lang)}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="calc-section">
			<h2 class="calc-section-title">= {$_('rechner.aksUi.blockBta')}</h2>
			<div class="row">
				<div class="calc-field grow">
					<label class="calc-field-label" for="aks-bta">{$_('rechner.aksUi.f.btaArt')}</label>
					<select id="aks-bta" class="calc-select" bind:value={t.btaArt}>
						<option value="">—</option>
						{#each Object.entries(BTA_ARTEN) as [k, v] (k)}
							<option value={k}>{k} · {v[lang]}</option>
						{/each}
					</select>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="aks-btanr">{$_('rechner.aksUi.f.btaNr')}</label>
					<input
						id="aks-btanr"
						class="calc-input mono"
						class:bad={fehlerVon('btaNr')}
						maxlength="2"
						inputmode="numeric"
						bind:value={t.btaNr}
					/>
				</div>
			</div>
			{#if btaHinweis}<p class="calc-field-hint">{btaHinweis}</p>{/if}
		</div>

		<div class="calc-section">
			<h2 class="calc-section-title">- {$_('rechner.aksUi.blockApparat')}</h2>
			<div class="ort-switch">
				<label
					><input type="radio" bind:group={ort} value="feld" />
					{$_('rechner.aksUi.feld')}</label
				>
				<label
					><input type="radio" bind:group={ort} value="apparat" />
					{$_('rechner.aksUi.schaltschrank')}</label
				>
			</div>
			<div class="row">
				<div class="calc-field grow">
					<label class="calc-field-label" for="aks-app">{$_('rechner.aksUi.f.apparatArt')}</label>
					<select id="aks-app" class="calc-select" bind:value={t.apparatArt}>
						<option value="">—</option>
						{#each Object.entries(apparatArten) as [k, v] (k)}
							<option value={k}>{k} · {v[lang]}</option>
						{/each}
					</select>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="aks-appnr">{$_('rechner.aksUi.f.apparatNr')}</label>
					<input
						id="aks-appnr"
						class="calc-input mono"
						class:bad={fehlerVon('apparatNr')}
						maxlength="3"
						inputmode="numeric"
						bind:value={t.apparatNr}
					/>
				</div>
			</div>
			{#if nrHinweis}<p class="calc-field-hint">{$_('rechner.aksUi.nrHint')}: {nrHinweis}</p>{/if}
		</div>

		<div class="calc-section">
			<h2 class="calc-section-title">: {$_('rechner.aksUi.blockFunktion')}</h2>
			<div class="row">
				<div class="calc-field grow">
					<label class="calc-field-label" for="aks-fkt">{$_('rechner.aksUi.f.funktionArt')}</label>
					<select id="aks-fkt" class="calc-select" bind:value={t.funktionArt}>
						<option value="">—</option>
						{#each Object.entries(FUNKTIONS_ARTEN) as [k, v] (k)}
							<option value={k}>{k} · {v[lang]}{v.bacnet ? ' (BACnet)' : ''}</option>
						{/each}
					</select>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="aks-fktnr">{$_('rechner.aksUi.f.funktionNr')}</label>
					<input
						id="aks-fktnr"
						class="calc-input mono"
						class:bad={fehlerVon('funktionNr')}
						maxlength="1"
						inputmode="numeric"
						bind:value={t.funktionNr}
					/>
				</div>
			</div>
		</div>
	{:else}
		<div class="calc-section">
			<div class="calc-field">
				<label class="calc-field-label" for="aks-in">{$_('rechner.aksUi.parseInput')}</label>
				<input id="aks-in" class="calc-input mono" bind:value={eingabe} spellcheck="false" />
				<p class="calc-field-hint">{$_('rechner.aksUi.parseHint')}</p>
			</div>
		</div>

		{#if erklaerung.length}
			<div class="calc-section">
				<table class="explain">
					<tbody>
						{#each erklaerung as e, i (i)}
							<tr>
								<td class="blk">{e.block}</td>
								<td class="mono val">{e.wert}</td>
								<td>{e.bedeutung}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		{#if zerlegt.rest.length || zerlegt.fehler.length}
			<div class="calc-warning">
				{#if zerlegt.rest.length}
					<div>
						⚠ {$_('rechner.aksUi.unrecognized')}: <span class="mono">{zerlegt.rest.join(' ')}</span>
					</div>
				{/if}
				{#each zerlegt.fehler as f (f.feld + f.de)}
					<div>⚠ {$_('rechner.aksUi.f.' + f.feld)}: {f[lang]}</div>
				{/each}
			</div>
		{/if}

		{#if erklaerung.length}
			<div class="calc-result-section">
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.aksUi.kennzeichen')}</span>
					<span class="calc-result-value mono">{kennzeichen(zerlegt.teile, true)}</span>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.aksUi.objektname')}</span>
					<span class="calc-result-value mono">{objektname(zerlegt.teile)}</span>
				</div>
			</div>
			<button class="take" onclick={uebernehmen}>{$_('rechner.aksUi.takeOver')}</button>
		{/if}
	{/if}

	<p class="calc-info">
		{$_('rechner.aksUi.note')}
		<a href="/wissen/kbob-bacnet">{$_('rechner.aksUi.moreLink')}</a>
	</p>
</div>

<style>
	.mode-tabs {
		display: flex;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.25rem;
	}
	.mode-tab {
		flex: 1;
		padding: 0.4rem 0.75rem;
		border: none;
		border-radius: 0.5rem;
		background: transparent;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--muted);
		cursor: pointer;
	}
	.mode-tab.active {
		background: var(--color-primary);
		color: #fff;
	}
	.row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
	.row .calc-field {
		flex: 1 1 6rem;
		min-width: 0;
	}
	.row .calc-field.grow {
		flex: 3 1 12rem;
	}
	.mono {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
	}
	.bad {
		border-color: #dc2626 !important;
	}
	.copy {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: inherit;
		font: inherit;
		text-align: right;
		min-width: 0;
	}
	.copy .calc-result-value {
		overflow-wrap: anywhere;
	}
	.copy-hint {
		font-size: 0.75rem;
		color: var(--muted);
		white-space: nowrap;
	}
	.ort-switch {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}
	.explain {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}
	.explain td {
		padding: 0.35rem 0.5rem;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
	}
	.explain .blk {
		color: var(--muted);
		font-size: 0.75rem;
		white-space: nowrap;
	}
	.explain .val {
		font-weight: 600;
		white-space: nowrap;
	}
	.take {
		margin: 0.5rem 0 0.75rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		background: var(--surface);
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
</style>
