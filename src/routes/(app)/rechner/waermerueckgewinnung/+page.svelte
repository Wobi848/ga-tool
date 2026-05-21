<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Typ WRG-System
	type WrgType = 'kreuzgegenstrom' | 'rotations' | 'platte' | 'laufrad';
	let wrgType: WrgType = $state('kreuzgegenstrom');

	const wrgInfoBase: Record<
		WrgType,
		{ labelKey: string; etaH: [number, number]; etaF: [number, number]; noteKey: string }
	> = {
		kreuzgegenstrom: {
			labelKey: 'rechner.waermerueckgewinnungUi.enthalpyExchanger',
			etaH: [0.7, 0.9],
			etaF: [0.5, 0.8],
			noteKey: 'rechner.waermerueckgewinnungUi.noteEnthalpyExchanger'
		},
		rotations: {
			labelKey: 'rechner.waermerueckgewinnungUi.rotarySorption',
			etaH: [0.7, 0.85],
			etaF: [0.6, 0.85],
			noteKey: 'rechner.waermerueckgewinnungUi.noteRotarySorption'
		},
		platte: {
			labelKey: 'rechner.waermerueckgewinnungUi.plateHeatEx',
			etaH: [0.5, 0.8],
			etaF: [0.0, 0.0],
			noteKey: 'rechner.waermerueckgewinnungUi.notePlateHeatEx'
		},
		laufrad: {
			labelKey: 'rechner.waermerueckgewinnungUi.recirculationSystem',
			etaH: [0.4, 0.65],
			etaF: [0.0, 0.0],
			noteKey: 'rechner.waermerueckgewinnungUi.noteRecirculation'
		}
	};
	const wrgInfo = $derived(
		Object.fromEntries(
			Object.entries(wrgInfoBase).map(([k, v]) => [
				k,
				{ ...v, label: $_(v.labelKey), note: $_(v.noteKey) }
			])
		) as unknown as Record<
			WrgType,
			{ label: string; note: string; etaH: [number, number]; etaF: [number, number] }
		>
	);

	// Eingaben
	let q = $state(3000); // m³/h Volumenstrom
	let tAbluft = $state(22); // °C Ablufttemperatur (innen, warm)
	let tAussenluft = $state(-5); // °C Aussenlufttemperatur (kalt im Winter)
	let rhAbluft = $state(50); // % rel. Feuchte Abluft
	let etaT = $state(0.8); // Temperaturrückgewinnungsgrad
	let etaF = $state(0.7); // Feuchtewirkungsgrad (wenn vorhanden)
	let rhocp = 0.34; // Wh/(m³·K) — spez. Wärmekapazität Luft

	const sys = $derived(wrgInfo[wrgType]);

	// Zulufttemperatur nach WRG
	const result = $derived.by(() => {
		const dt = tAbluft - tAussenluft;
		const tZuluft = tAussenluft + etaT * dt;

		// Wärmeleistung [W] = q/3600 * rhocp * dt_gewonnen * 1000
		const qRecovered = (q / 3600) * 1.2 * 1005 * (tZuluft - tAussenluft); // W
		const qMax = (q / 3600) * 1.2 * 1005 * dt;

		// Feuchtegehalt Abluft (Magnus-Näherung)
		const pSatAb = 610.78 * Math.exp((17.27 * tAbluft) / (tAbluft + 237.3));
		const xAb = (0.622 * ((rhAbluft / 100) * pSatAb)) / (101325 - (rhAbluft / 100) * pSatAb); // kg/kg
		const xAussen = 0.002; // Typisch -5°C, ~80% RH ≈ 2g/kg

		// Zuluft-Feuchtegehalt nach Feuchte-WRG
		const xZuluft = xAussen + etaF * (xAb - xAussen);

		// Energieersparnis vs. keine WRG (Heizen von tAussenluft auf tAbluft)
		const qOhneWrg = qMax;
		const savings = qRecovered;
		const savingsPercent = qMax > 0 ? (savings / qOhneWrg) * 100 : 0;

		// Betriebskosten-Ersparnis: 2000h/a, 0.12 CHF/kWh
		const annualKwh = (savings / 1000) * 2000;
		const annualChf = annualKwh * 0.12;

		return { tZuluft, qRecovered, qMax, savingsPercent, xAb, xZuluft, annualKwh, annualChf };
	});

	function co2Color(eta: number): string {
		if (eta >= 0.7) return '#16a34a';
		if (eta >= 0.5) return '#ca8a04';
		return '#ea580c';
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
			<h1 class="calc-title">{$_('rechner.waermerueckgewinnung.name')}</h1>
			<FavButton
				type="rechner"
				slug="waermerueckgewinnung"
				title={$_('rechner.waermerueckgewinnung.name')}
				size={20}
			/>
		</div>
	</header>

	<!-- WRG-Typ -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.waermerueckgewinnungUi.wrgType')}</h2>
		<div class="type-grid">
			{#each Object.entries(wrgInfo) as [k, v]}
				<button
					class="type-btn"
					class:active={wrgType === k}
					onclick={() => (wrgType = k as WrgType)}>{v.label}</button
				>
			{/each}
		</div>
		<p class="type-note">{sys.note}</p>
		<div class="eta-range-row">
			<span
				>{$_('rechner.waermerueckgewinnungUi.typicalEta')}
				{sys.etaH[0] * 100}–{sys.etaH[1] * 100}%</span
			>
			{#if sys.etaF[1] > 0}
				<span>η<sub>F</sub>: {sys.etaF[0] * 100}–{sys.etaF[1] * 100}%</span>
			{:else}
				<span class="no-moisture">{$_('rechner.waermerueckgewinnungUi.noMoistureTransfer')}</span>
			{/if}
		</div>
	</div>

	<!-- Eingaben -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.waermerueckgewinnungUi.operatingConditions')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="q-in"
				>{$_('rechner.waermerueckgewinnungUi.volumeFlow')}</label
			>
			<div class="calc-input-wrap">
				<input id="q-in" type="number" step="100" min="100" bind:value={q} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="ta-in"
				>{$_('rechner.waermerueckgewinnungUi.exhaustAirTemp')}</label
			>
			<div class="calc-input-wrap">
				<input id="ta-in" type="number" step="1" bind:value={tAbluft} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="tau-in"
				>{$_('rechner.waermerueckgewinnungUi.outsideAirTemp')}</label
			>
			<div class="calc-input-wrap">
				<input id="tau-in" type="number" step="1" bind:value={tAussenluft} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="rha-in"
				>{$_('rechner.waermerueckgewinnungUi.exhaustAirHumidity')}</label
			>
			<div class="calc-input-wrap">
				<input
					id="rha-in"
					type="number"
					step="5"
					min="10"
					max="90"
					bind:value={rhAbluft}
					class="calc-input"
				/>
				<span class="calc-input-unit">%</span>
			</div>
		</div>
	</div>

	<!-- Wirkungsgrade -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.waermerueckgewinnungUi.efficiencies')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="etat-in">
				{$_('rechner.waermerueckgewinnungUi.tempEfficiency')}
				<span class="calc-field-hint"
					>{$_('rechner.waermerueckgewinnungUi.typicalEtaHint', {
						values: {
							min: sys.etaH[0] * 100,
							max: sys.etaH[1] * 100,
							type: sys.label.split(' ')[0]
						}
					})}</span
				>
			</label>
			<div class="calc-input-wrap">
				<input
					id="etat-in"
					type="number"
					step="0.01"
					min="0.1"
					max="0.99"
					bind:value={etaT}
					class="calc-input"
				/>
				<span class="calc-input-unit" style="color:{co2Color(etaT)}">{fmt(etaT * 100, 0)} %</span>
			</div>
		</div>
		{#if sys.etaF[1] > 0}
			<div class="calc-field">
				<label class="calc-field-label" for="etaf-in">
					{$_('rechner.waermerueckgewinnungUi.humidityEfficiency')}
				</label>
				<div class="calc-input-wrap">
					<input
						id="etaf-in"
						type="number"
						step="0.01"
						min="0"
						max="0.95"
						bind:value={etaF}
						class="calc-input"
					/>
					<span class="calc-input-unit">{fmt(etaF * 100, 0)} %</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Ergebnisse -->
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermerueckgewinnungUi.supplyAirTemp')}</span>
			<span class="calc-result-value primary"
				>{fmt(result.tZuluft, 1)}<span class="calc-result-unit">°C</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermerueckgewinnungUi.recoveredPower')}</span>
			<span class="calc-result-value"
				>{fmt(result.qRecovered / 1000, 1)}<span class="calc-result-unit">kW</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermerueckgewinnungUi.energySaving')}</span>
			<span class="calc-result-value"
				>{fmt(result.savingsPercent, 0)}<span class="calc-result-unit">%</span></span
			>
		</div>
		{#if sys.etaF[1] > 0}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.waermerueckgewinnungUi.supplyHumidity')}</span>
				<span class="calc-result-value"
					>{fmt(result.xZuluft * 1000, 1)}<span class="calc-result-unit">g/kg</span></span
				>
			</div>
		{/if}
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermerueckgewinnungUi.annualSaving')}</span>
			<span class="calc-result-value"
				>{fmt(result.annualChf, 0)}<span class="calc-result-unit">CHF/a</span></span
			>
		</div>
	</div>

	<p class="calc-info">
		η<sub>T</sub> = (T<sub>Zuluft</sub> − T<sub>Aussenluft</sub>) / (T<sub>Abluft</sub> − T<sub
			>Aussenluft</sub
		>) per EN 308.
		{$_('rechner.waermerueckgewinnungUi.annualSavingNote')}
	</p>
</div>

<style>
	.type-grid {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		margin-bottom: 0.5rem;
	}

	.type-btn {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-family: inherit;
		font-size: 0.8125rem;
		color: var(--muted);
		cursor: pointer;
		text-align: left;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.type-btn.active {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}

	.type-note {
		font-size: 0.75rem;
		color: var(--muted);
		line-height: 1.5;
		margin: 0.25rem 0 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--bg);
		border-radius: 0.375rem;
		border-left: 3px solid var(--color-primary);
	}

	.eta-range-row {
		display: flex;
		gap: 1.5rem;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.no-moisture {
		color: #dc2626;
		opacity: 0.7;
	}
</style>
