<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import {
		luftbedarf,
		CATEGORIES,
		ACTIVITY_CO2_LPH,
		type LuftCat,
		type LuftActivity
	} from '$lib/rechner/luftbedarf';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	const categoriesData: Record<
		LuftCat,
		{ labelKey: string; perPerson: number; perArea: number; co2: number; descKey: string }
	> = {
		I: {
			labelKey: 'rechner.luftbedarfUi.cat1',
			...CATEGORIES.I,
			descKey: 'rechner.luftbedarfUi.cat1desc'
		},
		II: {
			labelKey: 'rechner.luftbedarfUi.cat2',
			...CATEGORIES.II,
			descKey: 'rechner.luftbedarfUi.cat2desc'
		},
		III: {
			labelKey: 'rechner.luftbedarfUi.cat3',
			...CATEGORIES.III,
			descKey: 'rechner.luftbedarfUi.cat3desc'
		},
		IV: {
			labelKey: 'rechner.luftbedarfUi.cat4',
			...CATEGORIES.IV,
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
			LuftCat,
			{ label: string; desc: string; perPerson: number; perArea: number; co2: number }
		>
	);

	let area = $state(25); // m²
	let height = $state(2.7); // m
	let persons = $state(2);
	let cat: LuftCat = $state('II');
	let activity = $state<LuftActivity>('office');

	const activityFactorsData: Record<LuftActivity, { co2: number; labelKey: string }> = {
		rest: { co2: ACTIVITY_CO2_LPH.rest, labelKey: 'rechner.luftbedarfUi.actRest' },
		office: { co2: ACTIVITY_CO2_LPH.office, labelKey: 'rechner.luftbedarfUi.actOffice' },
		physical: { co2: ACTIVITY_CO2_LPH.physical, labelKey: 'rechner.luftbedarfUi.actPhysical' }
	};
	const activityFactors = $derived(
		Object.fromEntries(
			Object.entries(activityFactorsData).map(([k, v]) => [k, { ...v, label: $_(v.labelKey) }])
		) as unknown as Record<LuftActivity, { co2: number; label: string }>
	);

	const result = $derived(luftbedarf({ area, height, persons, cat, activity }));
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
				{#each Object.entries(categories) as [k, v] (k)}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="act-sel"
				>{$_('rechner.luftbedarfUi.activityLevel')}</label
			>
			<select id="act-sel" bind:value={activity} class="calc-select">
				{#each Object.entries(activityFactors) as [k, v] (k)}
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
