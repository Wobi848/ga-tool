<script lang="ts">
	import FavButton from '$lib/components/FavButton.svelte';
	import { _, locale } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { BTA_ARTEN, ebeneText, type Lang } from '$lib/generatoren/aks';
	import {
		GA_FUNKTIONEN,
		GA_FUNKTION_MAP,
		KATEGORIEN,
		MESSGROESSEN,
		ackRequired,
		type Kategorie
	} from '$lib/generatoren/kbob-funktionen';
	import {
		generieren,
		neuesProjekt,
		exportCsv,
		exportEde,
		exportAlarmCsv,
		alarmliste,
		type Projekt,
		type FunktionEintrag
	} from '$lib/generatoren/dpl';

	const SPEICHER = 'ga-tool:bacnet-dpl';
	const lang = $derived<Lang>($locale?.startsWith('en') ? 'en' : 'de');

	let p = $state<Projekt>(neuesProjekt());
	let geladen = $state(false);
	let ansicht = $state<'objekte' | 'alarme'>('objekte');
	let neueFunktion = $state<Record<string, string>>({});

	onMount(() => {
		try {
			const s = localStorage.getItem(SPEICHER);
			if (s) p = { ...neuesProjekt(), ...JSON.parse(s) };
		} catch {
			/* kein Speicher verfügbar */
		}
		if (p.anlagen.length === 0) beispiel();
		geladen = true;
	});

	$effect(() => {
		const json = JSON.stringify(p);
		if (!geladen) return;
		try {
			localStorage.setItem(SPEICHER, json);
		} catch {
			/* ignorieren */
		}
	});

	const zeilen = $derived(generieren(p, lang));
	const alarme = $derived(alarmliste(zeilen));
	const warnungen = $derived(zeilen.filter((z) => z.warnung?.length).length);

	const id = () => Math.random().toString(36).slice(2, 9);

	function beispiel() {
		p.anlagen = [
			{
				id: id(),
				btaArt: 'L',
				btaNr: '13',
				name: lang === 'de' ? 'Lüftung Büro' : 'Office ventilation',
				funktionen: [
					funktion('as', 'AS'),
					funktion('anlageschalter', lang === 'de' ? 'Anlage' : 'Plant'),
					funktion('antrieb', lang === 'de' ? 'Zuluftventilator' : 'Supply fan', 'M', '100'),
					funktion('antrieb', lang === 'de' ? 'Abluftventilator' : 'Extract fan', 'M', '130'),
					funktion(
						'stellorgan-stetig',
						lang === 'de' ? 'Ventil Lufterhitzer' : 'Heating coil valve',
						'Y',
						'730'
					),
					{
						...funktion(
							'messwert',
							lang === 'de' ? 'Zulufttemperatur' : 'Supply air temperature',
							'B',
							'802'
						),
						messgroesse: 'temp'
					},
					funktion('waechter', lang === 'de' ? 'Frostschutz' : 'Frost protection', 'B', '900')
				]
			}
		];
	}

	function funktion(key: string, bezeichnung = '', art?: string, nr?: string): FunktionEintrag {
		const d = GA_FUNKTION_MAP[key];
		return {
			id: id(),
			key,
			bezeichnung,
			apparatArt: art ?? d.apparat.art,
			apparatNr: nr ?? d.apparat.nr,
			stufen: d.stufen?.standard,
			messgroesse: d.messgroesse,
			optional: true
		};
	}

	function anlageNeu() {
		const nr = String(p.anlagen.length + 1).padStart(2, '0');
		p.anlagen.push({ id: id(), btaArt: 'H', btaNr: nr, name: '', funktionen: [] });
	}

	function funktionNeu(aIdx: number) {
		const a = p.anlagen[aIdx];
		const key = neueFunktion[a.id] || GA_FUNKTIONEN[0].key;
		a.funktionen.push(funktion(key));
	}

	function ohneUmschalten(f: FunktionEintrag, oid: string) {
		const ohne = f.ohne ?? [];
		f.ohne = ohne.includes(oid) ? ohne.filter((x) => x !== oid) : [...ohne, oid];
	}

	function herunterladen(name: string, inhalt: string, bom = true) {
		const blob = new Blob([(bom ? '﻿' : '') + inhalt], { type: 'text/csv;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const el = document.createElement('a');
		el.href = url;
		el.download = name;
		el.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	const dateiname = $derived((p.name || 'Projekt').replace(/[^\w.-]+/g, '_'));

	function edeLaden(teil: 'ede' | 'stateTexts' | 'units' | 'objTypes') {
		const e = exportEde(p, zeilen);
		const suffix = { ede: 'EDE', stateTexts: 'StateTexts', units: 'Units', objTypes: 'ObjTypes' }[
			teil
		];
		herunterladen(`${dateiname}_${suffix}.csv`, e[teil], false);
	}

	function projektSpeichern() {
		const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const el = document.createElement('a');
		el.href = url;
		el.download = `${dateiname}.json`;
		el.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	function projektLaden(ev: Event) {
		const file = (ev.target as HTMLInputElement).files?.[0];
		if (!file) return;
		file.text().then((t) => {
			try {
				const d = JSON.parse(t);
				if (d && Array.isArray(d.anlagen)) p = { ...neuesProjekt(), ...d };
			} catch {
				/* ungültige Datei */
			}
		});
	}

	function zuruecksetzen() {
		if (confirm($_('rechner.dplUi.resetConfirm'))) {
			p = neuesProjekt();
			beispiel();
		}
	}

	const ackText = (nc: number) => {
		const a = ackRequired(nc);
		if (!a) return '';
		const teile = ['OFFNORMAL', 'FAULT', 'NORMAL'].filter((_, i) => a[i]);
		return teile.length ? teile.join(', ') : $_('rechner.dplUi.noAck');
	};
	const ackKurz = (a?: boolean[]) => (a ? a.map((x) => (x ? 'Q' : '–')).join('') : '');
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
			<h1 class="calc-title">{$_('rechner.bacnetDpl.name')}</h1>
			<FavButton type="rechner" slug="bacnet-dpl" title={$_('rechner.bacnetDpl.name')} size={20} />
		</div>
	</header>

	<p class="calc-info">{$_('rechner.dplUi.intro')}</p>

	<!-- Projekt -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.dplUi.project')}</h2>
		<div class="row">
			<div class="calc-field grow">
				<label class="calc-field-label" for="p-name">{$_('rechner.dplUi.projectName')}</label>
				<input id="p-name" class="calc-input" bind:value={p.name} />
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="p-dev">Device-ID</label>
				<input
					id="p-dev"
					class="calc-input mono"
					type="number"
					min="0"
					max="4194302"
					bind:value={p.deviceId}
				/>
			</div>
		</div>
		<div class="row">
			<div class="calc-field">
				<label class="calc-field-label" for="p-anl">{$_('rechner.aksUi.f.anlage')}</label>
				<input id="p-anl" class="calc-input mono" maxlength="4" bind:value={p.anlage} />
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="p-obj">{$_('rechner.aksUi.f.objekt')}</label>
				<input id="p-obj" class="calc-input mono" maxlength="2" bind:value={p.objekt} />
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="p-eb">{$_('rechner.aksUi.f.ebene')}</label>
				<select id="p-eb" class="calc-select" bind:value={p.ebene}>
					{#each ['3', '2', '1', '0', 'A', 'B', 'C', 'D', 'E', 'F'] as e (e)}
						<option value={e}>{e} · {ebeneText(e, lang)}</option>
					{/each}
				</select>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="p-fnr">{$_('rechner.dplUi.fktFrom')}</label>
				<select id="p-fnr" class="calc-select" bind:value={p.fktNrAb}>
					<option value={0}>0 (S0, M0 …)</option>
					<option value={1}>1 (S1, M1 …)</option>
				</select>
			</div>
		</div>

		<details class="nc">
			<summary>{$_('rechner.dplUi.ncMapping')}</summary>
			<p class="calc-field-hint">{$_('rechner.dplUi.ncHint')}</p>
			<div class="nc-grid">
				{#each Object.entries(KATEGORIEN) as [k, v] (k)}
					<label for="nc-{k}">{v[lang]}</label>
					<select id="nc-{k}" class="calc-select" bind:value={p.nc[k as Kategorie]}>
						{#each Array.from({ length: v.anzahl }, (_, i) => v.basis + i) as nc (nc)}
							<option value={nc}>NC{nc} · {ackText(nc)}</option>
						{/each}
					</select>
				{/each}
			</div>
		</details>
	</div>

	<!-- Anlagen -->
	{#each p.anlagen as a, ai (a.id)}
		<div class="calc-section anlage">
			<div class="row">
				<div class="calc-field grow">
					<label class="calc-field-label" for="a-art-{a.id}">{$_('rechner.aksUi.f.btaArt')}</label>
					<select id="a-art-{a.id}" class="calc-select" bind:value={a.btaArt}>
						{#each Object.entries(BTA_ARTEN) as [k, v] (k)}
							<option value={k}>{k} · {v[lang]}</option>
						{/each}
					</select>
				</div>
				<div class="calc-field">
					<label class="calc-field-label" for="a-nr-{a.id}">{$_('rechner.aksUi.f.btaNr')}</label>
					<input id="a-nr-{a.id}" class="calc-input mono" maxlength="2" bind:value={a.btaNr} />
				</div>
				<div class="calc-field grow">
					<label class="calc-field-label" for="a-name-{a.id}">{$_('rechner.dplUi.plantName')}</label
					>
					<input id="a-name-{a.id}" class="calc-input" bind:value={a.name} />
				</div>
				<button
					class="icon-btn"
					title={$_('rechner.dplUi.remove')}
					onclick={() => p.anlagen.splice(ai, 1)}>✕</button
				>
			</div>

			{#each a.funktionen as f, fi (f.id)}
				{@const d = GA_FUNKTION_MAP[f.key]}
				<div class="fkt">
					<div class="fkt-head">
						<span class="fkt-typ">{d[lang]}</span>
						<button
							class="icon-btn"
							title={$_('rechner.dplUi.remove')}
							onclick={() => a.funktionen.splice(fi, 1)}>✕</button
						>
					</div>
					<div class="row">
						<div class="calc-field grow">
							<label class="calc-field-label" for="f-b-{f.id}">{$_('rechner.dplUi.label')}</label>
							<input id="f-b-{f.id}" class="calc-input" bind:value={f.bezeichnung} />
						</div>
						<div class="calc-field small">
							<label class="calc-field-label" for="f-a-{f.id}"
								>{$_('rechner.aksUi.blockApparat')}</label
							>
							<div class="app">
								<input
									id="f-a-{f.id}"
									class="calc-input mono"
									maxlength="1"
									bind:value={f.apparatArt}
								/>
								<input
									class="calc-input mono"
									maxlength="3"
									aria-label={$_('rechner.aksUi.f.apparatNr')}
									bind:value={f.apparatNr}
								/>
							</div>
						</div>
						{#if d.stufen}
							<div class="calc-field small">
								<label class="calc-field-label" for="f-s-{f.id}">{$_('rechner.dplUi.stages')}</label
								>
								<input
									id="f-s-{f.id}"
									class="calc-input"
									type="number"
									min={d.stufen.min}
									max={d.stufen.max}
									bind:value={f.stufen}
								/>
							</div>
						{/if}
						{#if d.messgroesse}
							<div class="calc-field grow">
								<label class="calc-field-label" for="f-m-{f.id}"
									>{$_('rechner.dplUi.quantity')}</label
								>
								<select id="f-m-{f.id}" class="calc-select" bind:value={f.messgroesse}>
									{#each Object.entries(MESSGROESSEN) as [k, m] (k)}
										<option value={k}>{m[lang]}{m.symbol ? ` [${m.symbol}]` : ''}</option>
									{/each}
								</select>
							</div>
							<div class="calc-field small">
								<label class="calc-field-label" for="f-x-{f.id}">max</label>
								<input id="f-x-{f.id}" class="calc-input" type="number" bind:value={f.max} />
							</div>
						{/if}
					</div>
					<label class="opt-toggle">
						<input type="checkbox" bind:checked={f.optional} />
						{$_('rechner.dplUi.optional')}
					</label>
					{#if f.optional}
						<div class="opt-list">
							{#each d.objekte(f.stufen ?? 1).filter((o) => !o.pflicht) as o (o.id)}
								<label>
									<input
										type="checkbox"
										checked={!(f.ohne ?? []).includes(o.id)}
										onchange={() => ohneUmschalten(f, o.id)}
									/>
									<span class="mono">{o.typ}</span>
									{o[lang]}
								</label>
							{/each}
						</div>
					{/if}
				</div>
			{/each}

			<div class="add-row">
				<select
					class="calc-select"
					aria-label={$_('rechner.dplUi.addFunction')}
					bind:value={neueFunktion[a.id]}
				>
					{#each GA_FUNKTIONEN as g (g.key)}
						<option value={g.key}>{g[lang]}</option>
					{/each}
				</select>
				<button class="btn" onclick={() => funktionNeu(ai)}
					>+ {$_('rechner.dplUi.addFunction')}</button
				>
			</div>
		</div>
	{/each}

	<div class="add-row">
		<button class="btn" onclick={anlageNeu}>+ {$_('rechner.dplUi.addPlant')}</button>
		<button class="btn ghost" onclick={zuruecksetzen}>{$_('rechner.dplUi.reset')}</button>
	</div>

	<!-- Ergebnis -->
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.dplUi.objects')}</span>
			<span class="calc-result-value primary">{zeilen.length}</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.dplUi.alarms')}</span>
			<span class="calc-result-value">{alarme.length}</span>
		</div>
		{#if warnungen}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.dplUi.warnings')}</span>
				<span class="calc-result-value warn">{warnungen}</span>
			</div>
		{/if}
	</div>

	<div class="export">
		<button
			class="btn"
			onclick={() => herunterladen(`${dateiname}_Objekte.csv`, exportCsv(zeilen, lang))}>CSV</button
		>
		<button
			class="btn"
			onclick={() => herunterladen(`${dateiname}_Alarme.csv`, exportAlarmCsv(zeilen, lang))}
			>{$_('rechner.dplUi.alarmCsv')}</button
		>
		<button class="btn" onclick={() => edeLaden('ede')}>EDE</button>
		<button class="btn ghost" onclick={() => edeLaden('stateTexts')}>StateTexts</button>
		<button class="btn ghost" onclick={() => edeLaden('units')}>Units</button>
		<button class="btn ghost" onclick={() => edeLaden('objTypes')}>ObjTypes</button>
		<button class="btn ghost" onclick={projektSpeichern}>{$_('rechner.dplUi.saveJson')}</button>
		<label class="btn ghost">
			{$_('rechner.dplUi.loadJson')}
			<input type="file" accept="application/json,.json" onchange={projektLaden} hidden />
		</label>
	</div>

	<div class="mode-tabs">
		<button
			class="mode-tab"
			class:active={ansicht === 'objekte'}
			onclick={() => (ansicht = 'objekte')}
		>
			{$_('rechner.dplUi.objectList')}
		</button>
		<button
			class="mode-tab"
			class:active={ansicht === 'alarme'}
			onclick={() => (ansicht = 'alarme')}
		>
			{$_('rechner.dplUi.alarmList')}
		</button>
	</div>

	<div class="table-wrap">
		{#if ansicht === 'objekte'}
			<table class="dpl">
				<thead>
					<tr>
						<th>Object_Name</th>
						<th>{$_('rechner.dplUi.type')}</th>
						<th>Inst.</th>
						<th>Description</th>
						<th>{$_('rechner.dplUi.textsUnit')}</th>
						<th>NC</th>
						<th>COV / Trend</th>
					</tr>
				</thead>
				<tbody>
					{#each zeilen as z, i (i)}
						<tr class:optional-row={!z.pflicht} class:bad={z.warnung?.length}>
							<td class="mono">{z.objektname}</td>
							<td class="mono">{z.typ}</td>
							<td class="mono num">{z.instanz}</td>
							<td>
								{z.beschreibung}
								{#if z.hinweis}<div class="hint">{z.hinweis}</div>{/if}
								{#if z.warnung}<div class="hint warn">⚠ {z.warnung.join(', ')}</div>{/if}
							</td>
							<td>
								{#if z.zustaende}{z.zustaende.join(
										' / '
									)}{:else if z.inaktiv !== undefined}{z.inaktiv}
									/ {z.aktiv}{:else}{z.einheit ?? ''}{/if}
							</td>
							<td class="mono">{z.nc ?? ''}</td>
							<td class="mono">
								{#if z.trendVon}{z.trendArt}{:else}{z.cov ?? ''}{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<table class="dpl">
				<thead>
					<tr>
						<th>Object_Name</th>
						<th>Description</th>
						<th>{$_('rechner.dplUi.category')}</th>
						<th>NC</th>
						<th>Notify</th>
						<th title="TO-OFFNORMAL / TO-FAULT / TO-NORMAL">Ack</th>
						<th>{$_('rechner.dplUi.alarmState')}</th>
					</tr>
				</thead>
				<tbody>
					{#each alarme as z, i (i)}
						<tr>
							<td class="mono">{z.objektname}</td>
							<td>{z.beschreibung}</td>
							<td>
								{#each Object.entries(KATEGORIEN).filter(([, v]) => z.nc! >= v.basis && z.nc! < v.basis + v.anzahl) as [k, v] (k)}{v[
										lang
									]}{/each}
							</td>
							<td class="mono">{z.nc}</td>
							<td class="mono">{z.notify}</td>
							<td class="mono">{ackKurz(z.ack)}</td>
							<td>
								{z.alarmValue === 'ACTIVE'
									? z.aktiv
									: z.alarmValue === 'INACTIVE'
										? z.inaktiv
										: z.typ === 'EE'
											? 'Event_Parameters'
											: z.typ === 'LP'
												? 'Error_Limit'
												: 'High_/Low_Limit'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>

	<p class="calc-info">
		{$_('rechner.dplUi.note')}
		<a href="/wissen/kbob-bacnet">{$_('rechner.aksUi.moreLink')}</a>
	</p>
</div>

<style>
	.wide {
		max-width: 64rem;
	}
	.row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		align-items: flex-end;
	}
	.row .calc-field {
		flex: 1 1 6rem;
		min-width: 0;
	}
	.row .calc-field.grow {
		flex: 3 1 11rem;
	}
	.row .calc-field.small {
		flex: 0 1 7rem;
	}
	.app {
		display: flex;
		gap: 0.25rem;
	}
	.app input:first-child {
		width: 2.5rem;
		flex: 0 0 2.5rem;
	}
	.row .calc-field {
		flex-direction: column;
		align-items: stretch;
		gap: 0.25rem;
		border-top: none;
	}
	.row .calc-field-label {
		flex: none;
		font-size: 0.75rem;
		color: var(--muted);
	}
	.row .calc-input,
	.row .calc-select {
		width: 100%;
		text-align: left;
	}
	.mono {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
	}
	.anlage {
		border-left: 3px solid var(--color-primary);
	}
	.fkt {
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		margin-top: 0.75rem;
	}
	.fkt-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.25rem;
	}
	.fkt-typ {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--muted);
	}
	.opt-toggle {
		display: flex;
		gap: 0.4rem;
		align-items: center;
		font-size: 0.85rem;
		margin-top: 0.5rem;
	}
	.opt-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: 0.15rem 0.75rem;
		font-size: 0.8rem;
		margin-top: 0.25rem;
		padding-left: 1.4rem;
	}
	.opt-list label {
		display: flex;
		gap: 0.35rem;
		align-items: center;
	}
	.opt-list .mono {
		color: var(--muted);
		min-width: 2.5rem;
	}
	.icon-btn {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0.25rem 0.4rem;
	}
	.add-row,
	.export {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0.75rem 0;
	}
	.add-row .calc-select {
		flex: 1 1 12rem;
	}
	.btn {
		padding: 0.45rem 0.9rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-primary);
		background: var(--color-primary);
		color: #fff;
		font: inherit;
		font-size: 0.85rem;
		cursor: pointer;
	}
	.btn.ghost {
		background: var(--surface);
		color: inherit;
		border-color: var(--border);
	}
	.nc {
		margin-top: 0.75rem;
		font-size: 0.875rem;
	}
	.nc summary {
		cursor: pointer;
		font-weight: 500;
	}
	.nc-grid {
		display: grid;
		grid-template-columns: minmax(8rem, auto) 1fr;
		gap: 0.35rem 0.75rem;
		align-items: center;
		margin-top: 0.5rem;
	}
	.mode-tabs {
		display: flex;
		gap: 0.375rem;
		margin: 0.75rem 0;
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
	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}
	.dpl {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8rem;
	}
	.dpl th,
	.dpl td {
		padding: 0.3rem 0.5rem;
		border-bottom: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}
	.dpl th {
		background: var(--surface);
		position: sticky;
		top: 0;
		white-space: nowrap;
	}
	.dpl td.mono {
		white-space: nowrap;
	}
	.dpl .num {
		text-align: right;
	}
	.dpl tr.optional-row td {
		color: var(--muted);
	}
	.dpl tr.bad td {
		background: color-mix(in srgb, #dc2626 8%, transparent);
	}
	.hint {
		font-size: 0.72rem;
		color: var(--muted);
	}
	.warn {
		color: #dc2626;
	}
</style>
