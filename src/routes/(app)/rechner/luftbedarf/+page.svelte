<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// EN 16798-1 Kategorien (Aussenluftvolumenstrom pro Person + pro m² Boden)
	type Cat = 'I' | 'II' | 'III' | 'IV';
	const categoriesData: Record<
		Cat,
		{ labelKey: string; perPerson: number; perArea: number; co2: number; descKey: string }
	> = {
		I: {
			labelKey: 'rechner.luftbedarfUi.cat1',
			perPerson: 10,
			perArea: 1.0,
			co2: 550,
			descKey: 'rechner.luftbedarfUi.cat1desc'
		},
		II: {
			labelKey: 'rechner.luftbedarfUi.cat2',
			perPerson: 7,
			perArea: 0.7,
			co2: 800,
			descKey: 'rechner.luftbedarfUi.cat2desc'
		},
		III: {
			labelKey: 'rechner.luftbedarfUi.cat3',
			perPerson: 4,
			perArea: 0.4,
			co2: 1350,
			descKey: 'rechner.luftbedarfUi.cat3desc'
		},
		IV: {
			labelKey: 'rechner.luftbedarfUi.cat4',
			perPerson: 2.5,
			perArea: 0.3,
			co2: 1500,
			descKey: 'rechner.luftbedarfUi.cat4desc'
		}
	};
	const categories = $derived(
		Object.fromEntries(
			Object.entries(categoriesData).map(([k, v]) => [
				k,
				{ ...v, label: $_(v.labelKey), desc: $_(v.descKey) }
			])
		) as unknown as Record<
			Cat,
			{ label: string; desc: string; perPerson: number; perArea: number; co2: number }
		>
	);

	let area = $state(25); // m²
	let height = $state(2.7); // m
	let persons = $state(2);
	let cat: Cat = $state('II');
	let activity = $state<'rest' | 'office' | 'physical'>('office');

	const activityFactorsData: Record<string, { co2: number; labelKey: string }> = {
		rest: { co2: 17, labelKey: 'rechner.luftbedarfUi.actRest' },
		office: { co2: 19, labelKey: 'rechner.luftbedarfUi.actOffice' },
		physical: { co2: 35, labelKey: 'rechner.luftbedarfUi.actPhysical' }
	};
	const activityFactors = $derived(
		Object.fromEntries(
			Object.entries(activityFactorsData).map(([k, v]) => [k, { ...v, label: $_(v.labelKey) }])
		) as unknown as Record<string, { co2: number; label: string }>
	);

	const result = $derived.by(() => {
		const c = categories[cat];
		const perPerson = c.perPerson * 3.6; // l/s → m³/h
		const perArea = c.perArea * 3.6;
		const flowEN = persons * perPerson + area * perArea; // m³/h

		// CO₂-Bilanz: V̇ = n × CO₂_Person / (c_innen − c_aussen) (in m³/h)
		// Atmungs-CO₂-Produktion in l/h ≈ activity.co2 (typisch 17–35 l/h pro Person)
		const co2Out = 400; // ppm Aussenluft
		const co2In = c.co2; // ppm Zielwert
		const co2ProdLh = persons * activityFactors[activity].co2;
		const flowCO2 = (co2ProdLh * 1000) / (co2In - co2Out); // m³/h

		const volume = area * height;
		const ach = Math.max(flowEN, flowCO2) / volume; // air changes per hour

		const recommended = Math.max(flowEN, flowCO2);

		return { flowEN, flowCO2, recommended, ach, volume, co2Target: c.co2 };
	});
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
			<h1 class="calc-title">{$_('rechner.luftbedarf.name')}</h1>
			<FavButton type="rechner" slug="luftbedarf" title={$_('rechner.luftbedarf.name')} size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.luftbedarfUi.room')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="area-in">{$_('rechner.luftbedarfUi.floorArea')}</label>
			<div class="calc-input-wrap">
				<input id="area-in" type="number" step="1" min="1" bind:value={area} class="calc-input" />
				<span class="calc-input-unit">m²</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="h-in">{$_('rechner.luftbedarfUi.roomHeight')}</label>
			<div class="calc-input-wrap">
				<input id="h-in" type="number" step="0.1" min="2" bind:value={height} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="p-in">{$_('rechner.luftbedarfUi.occupants')}</label>
			<div class="calc-input-wrap">
				<input id="p-in" type="number" step="1" min="0" bind:value={persons} class="calc-input" />
				<span class="calc-input-unit">{$_('rechner.co2RegelungUi.persons')}</span>
			</div>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.luftbedarfUi.requirement')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="cat-sel">
				{$_('rechner.luftbedarfUi.category')}
				<span class="calc-field-hint">{categories[cat].desc}</span>
			</label>
			<select id="cat-sel" bind:value={cat} class="calc-select">
				{#each Object.entries(categories) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="act-sel"
				>{$_('rechner.luftbedarfUi.activityLevel')}</label
			>
			<select id="act-sel" bind:value={activity} class="calc-select">
				{#each Object.entries(activityFactors) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.luftbedarfUi.recommendedFlow')}</span>
			<span class="calc-result-value primary"
				>{fmt(result.recommended, 0)}<span class="calc-result-unit">m³/h</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.luftbedarfUi.perEN')}</span>
			<span class="calc-result-value"
				>{fmt(result.flowEN, 0)}<span class="calc-result-unit">m³/h</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label"
				>{$_('rechner.luftbedarfUi.perCO2', { values: { ppm: result.co2Target } })}</span
			>
			<span class="calc-result-value"
				>{fmt(result.flowCO2, 0)}<span class="calc-result-unit">m³/h</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.luftbedarfUi.airChange')}</span>
			<span class="calc-result-value"
				>{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.luftbedarfUi.roomVolume')}</span>
			<span class="calc-result-value"
				>{fmt(result.volume, 1)}<span class="calc-result-unit">m³</span></span
			>
		</div>
	</div>

	<p class="calc-info">{$_('rechner.luftbedarfUi.formulaNote')}</p>
</div>
