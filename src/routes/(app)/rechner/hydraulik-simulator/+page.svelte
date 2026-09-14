<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';
	import {
		betriebspunkt,
		betriebskennlinie,
		eigenkennlinie,
		kvsAus,
		verzerrung,
		beimischung,
		type Auslegung,
		type Kennlinie,
		type Pumpenart
	} from '$lib/hydraulik/simulation';

	let schaltung: 'drossel' | 'beimischung' = $state('drossel');
	let q100 = $state(2);
	let dpGesamt = $state(50);
	let autoritaet = $state(0.5);
	let kennlinie: Kennlinie = $state('gleichprozentig');
	let stellverhaeltnis = $state(25);
	let pumpe: Pumpenart = $state('konstant');
	let hub = $state(0.5);
	let tPrimaer = $state(70);
	let tRuecklauf = $state(40);

	const auslegung: Auslegung = $derived({
		q100,
		dpGesamt,
		autoritaet,
		kennlinie,
		pumpe,
		stellverhaeltnis
	});

	const punkt = $derived(betriebspunkt(auslegung, hub));
	const kurveBetrieb = $derived(betriebskennlinie(auslegung, 41));
	const kurveEigen = $derived(eigenkennlinie(auslegung, 41));
	const kvs = $derived(kvsAus(auslegung));
	const abweichung = $derived(verzerrung(auslegung));
	const misch = $derived(beimischung(auslegung, hub, tPrimaer, tRuecklauf));

	/* Diagramm: 0…1 auf beiden Achsen, damit Eigen- und Betriebskennlinie
	   direkt vergleichbar sind — genau darum geht es hier. */
	const B = 300;
	const H = 200;
	const x = (v: number) => 30 + v * (B - 40);
	const y = (v: number) => H - 24 - v * (H - 40);
	const pfad = (p: { hub: number; wert: number }[]) =>
		p.map((q, i) => `${i ? 'L' : 'M'}${x(q.hub).toFixed(1)},${y(q.wert).toFixed(1)}`).join(' ');

	const pfadBetrieb = $derived(pfad(kurveBetrieb.map((p) => ({ hub: p.hub, wert: p.qRelativ }))));
	const pfadEigen = $derived(pfad(kurveEigen.map((p) => ({ hub: p.hub, wert: p.kvRelativ }))));
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
			<h1 class="calc-title">{$_('rechner.hydraulikSimulator.name')}</h1>
			<FavButton
				type="rechner"
				slug="hydraulik-simulator"
				title={$_('rechner.hydraulikSimulator.name')}
				size={20}
			/>
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.hydraulikSimulatorUi.schaltung')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="schaltung-sel">
				{$_('rechner.hydraulikSimulatorUi.schaltung')}
			</label>
			<select id="schaltung-sel" bind:value={schaltung} class="calc-select">
				<option value="drossel">{$_('rechner.hydraulikSimulatorUi.drossel')}</option>
				<option value="beimischung">{$_('rechner.hydraulikSimulatorUi.beimischung')}</option>
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.hydraulikSimulatorUi.auslegung')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="q100-in">{$_('rechner.hydraulikSimulatorUi.q100')}</label
			>
			<div class="calc-input-wrap">
				<input
					id="q100-in"
					type="number"
					step="0.1"
					min="0.1"
					bind:value={q100}
					class="calc-input"
				/>
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="dp-in"
				>{$_('rechner.hydraulikSimulatorUi.dpGesamt')}</label
			>
			<div class="calc-input-wrap">
				<input id="dp-in" type="number" step="5" min="1" bind:value={dpGesamt} class="calc-input" />
				<span class="calc-input-unit">kPa</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="a-in">
				{$_('rechner.hydraulikSimulatorUi.autoritaet')}
			</label>
			<div class="calc-input-wrap schieber">
				<input id="a-in" type="range" min="0.05" max="1" step="0.05" bind:value={autoritaet} />
				<span class="calc-input-unit">{fmt(autoritaet, 2)}</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="kl-sel"
				>{$_('rechner.hydraulikSimulatorUi.kennlinie')}</label
			>
			<select id="kl-sel" bind:value={kennlinie} class="calc-select">
				<option value="gleichprozentig">{$_('rechner.hydraulikSimulatorUi.gleichprozentig')}</option
				>
				<option value="linear">{$_('rechner.hydraulikSimulatorUi.linear')}</option>
			</select>
		</div>
		{#if kennlinie === 'gleichprozentig'}
			<div class="calc-field">
				<label class="calc-field-label" for="sv-sel">
					{$_('rechner.hydraulikSimulatorUi.stellverhaeltnis')}
				</label>
				<select id="sv-sel" bind:value={stellverhaeltnis} class="calc-select">
					<option value={25}>25 : 1</option>
					<option value={50}>50 : 1</option>
					<option value={100}>100 : 1</option>
				</select>
			</div>
		{/if}
		<div class="calc-field">
			<label class="calc-field-label" for="pu-sel">{$_('rechner.hydraulikSimulatorUi.pumpe')}</label
			>
			<select id="pu-sel" bind:value={pumpe} class="calc-select">
				<option value="konstant">{$_('rechner.hydraulikSimulatorUi.konstant')}</option>
				<option value="proportional">{$_('rechner.hydraulikSimulatorUi.proportional')}</option>
			</select>
		</div>
	</div>

	{#if schaltung === 'beimischung'}
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.hydraulikSimulatorUi.temperaturen')}</h2>
			<div class="calc-field">
				<label class="calc-field-label" for="tp-in"
					>{$_('rechner.hydraulikSimulatorUi.tPrimaer')}</label
				>
				<div class="calc-input-wrap">
					<input id="tp-in" type="number" step="1" bind:value={tPrimaer} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="tr-in">
					{$_('rechner.hydraulikSimulatorUi.tRuecklauf')}
				</label>
				<div class="calc-input-wrap">
					<input id="tr-in" type="number" step="1" bind:value={tRuecklauf} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
		</div>
	{/if}

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.hydraulikSimulatorUi.hub')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="hub-in">{$_('rechner.hydraulikSimulatorUi.hub')}</label>
			<div class="calc-input-wrap schieber">
				<input id="hub-in" type="range" min="0" max="1" step="0.01" bind:value={hub} />
				<span class="calc-input-unit">{fmt(hub * 100, 0)} %</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		{#if schaltung === 'drossel'}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.durchfluss')}</span>
				<span class="calc-result-value primary">
					{fmt(punkt.q, 2)}<span class="calc-result-unit">m³/h</span>
				</span>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.relativ')}</span>
				<span class="calc-result-value">
					{fmt(punkt.qRelativ * 100, 0)}<span class="calc-result-unit">%</span>
				</span>
			</div>
		{:else}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.tVorlauf')}</span>
				<span class="calc-result-value primary">
					{fmt(misch.tVorlauf, 1)}<span class="calc-result-unit">°C</span>
				</span>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.durchfluss')}</span>
				<span class="calc-result-value">
					{fmt(q100, 2)}<span class="calc-result-unit">m³/h</span>
				</span>
			</div>
		{/if}
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.dpVentil')}</span>
			<span class="calc-result-value"
				>{fmt(punkt.dpVentil, 1)}<span class="calc-result-unit">kPa</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.dpAnlage')}</span>
			<span class="calc-result-value"
				>{fmt(punkt.dpAnlage, 1)}<span class="calc-result-unit">kPa</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.dpPumpe')}</span>
			<span class="calc-result-value"
				>{fmt(punkt.dpPumpe, 1)}<span class="calc-result-unit">kPa</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.kvs')}</span>
			<span class="calc-result-value">{fmt(kvs, 2)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.kvAktuell')}</span>
			<span class="calc-result-value"
				>{fmt(punkt.kv, 2)}<span class="calc-result-unit">m³/h</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.hydraulikSimulatorUi.verzerrung')}</span>
			<span class="calc-result-value"
				>{fmt(abweichung * 100, 0)}<span class="calc-result-unit">%</span></span
			>
		</div>
	</div>

	{#if autoritaet < 0.3}
		<div class="calc-warning">
			⚠ {$_('rechner.hydraulikSimulatorUi.warnAutoritaet', {
				values: { a: fmt(autoritaet, 2) }
			})}
		</div>
	{/if}

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.hydraulikSimulatorUi.kennlinienbild')}</h2>
		<svg
			viewBox="0 0 {B} {H}"
			class="bild"
			role="img"
			aria-label={$_('rechner.hydraulikSimulatorUi.kennlinienbild')}
		>
			<line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(0)} class="achse" />
			<line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(1)} class="achse" />
			<line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} class="gerade" />
			<path d={pfadEigen} class="eigen" />
			<path d={pfadBetrieb} class="betrieb" />
			<circle cx={x(hub)} cy={y(punkt.qRelativ)} r="4" class="punkt" />
			<text x={x(0) - 4} y={y(1)} class="beschriftung" text-anchor="end">100%</text>
			<text x={x(0) - 4} y={y(0) + 4} class="beschriftung" text-anchor="end">0</text>
			<text x={x(1)} y={y(0) + 14} class="beschriftung" text-anchor="end">Hub 100%</text>
		</svg>
		<div class="legende">
			<span><i class="s-betrieb"></i>{$_('rechner.hydraulikSimulatorUi.betrieb')}</span>
			<span><i class="s-eigen"></i>{$_('rechner.hydraulikSimulatorUi.eigen')}</span>
			<span><i class="s-gerade"></i>{$_('rechner.hydraulikSimulatorUi.ideal')}</span>
		</div>
	</div>

	<p class="calc-info">
		{schaltung === 'drossel'
			? $_('rechner.hydraulikSimulatorUi.hinweisDrossel')
			: $_('rechner.hydraulikSimulatorUi.hinweisBeimischung')}
		<br />
		{$_('rechner.hydraulikSimulatorUi.formel')}
	</p>
</div>

<style>
	.calc-input-wrap.schieber {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.calc-input-wrap.schieber input[type='range'] {
		flex: 1;
		accent-color: var(--color-primary, #ea580c);
	}
	.bild {
		width: 100%;
		height: auto;
		max-width: 34rem;
		display: block;
		margin: 0 auto;
	}
	.achse {
		stroke: var(--border);
		stroke-width: 1;
	}
	.gerade {
		stroke: var(--muted);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0.6;
	}
	.eigen {
		fill: none;
		stroke: var(--muted);
		stroke-width: 1.5;
		stroke-dasharray: 5 3;
	}
	.betrieb {
		fill: none;
		stroke: var(--color-primary, #ea580c);
		stroke-width: 2.5;
	}
	.punkt {
		fill: var(--color-secondary, #0d9488);
		stroke: var(--surface);
		stroke-width: 2;
	}
	.beschriftung {
		font-size: 9px;
		fill: var(--muted);
	}
	.legende {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 0.5rem;
		font-size: 0.8rem;
		color: var(--muted);
	}
	.legende i {
		display: inline-block;
		width: 1.1rem;
		height: 0;
		border-top-width: 2px;
		border-top-style: solid;
		margin-right: 0.35rem;
		vertical-align: middle;
	}
	.legende .s-betrieb {
		border-color: var(--color-primary, #ea580c);
	}
	.legende .s-eigen {
		border-color: var(--muted);
		border-top-style: dashed;
	}
	.legende .s-gerade {
		border-color: var(--muted);
		border-top-style: dashed;
		opacity: 0.6;
	}
</style>
