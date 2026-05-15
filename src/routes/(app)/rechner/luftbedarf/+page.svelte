<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	// EN 16798-1 Kategorien (Aussenluftvolumenstrom pro Person + pro m² Boden)
	type Cat = 'I' | 'II' | 'III' | 'IV';
	const categories: Record<Cat, { label: string; perPerson: number; perArea: number; co2: number; desc: string }> = {
		I: { label: 'I — hoch (sensible Bereiche)', perPerson: 10, perArea: 1.0, co2: 550, desc: 'Krankenhäuser, Kindergärten' },
		II: { label: 'II — normal (Standard)', perPerson: 7, perArea: 0.7, co2: 800, desc: 'Büros, Wohnungen, Schulen' },
		III: { label: 'III — moderat', perPerson: 4, perArea: 0.4, co2: 1350, desc: 'Bestehende Gebäude' },
		IV: { label: 'IV — minimal', perPerson: 2.5, perArea: 0.3, co2: 1500, desc: 'Temporäre Nutzung' }
	};

	let area = $state(25); // m²
	let height = $state(2.7); // m
	let persons = $state(2);
	let cat: Cat = $state('II');
	let activity = $state<'rest' | 'office' | 'physical'>('office');

	const activityFactors: Record<string, { co2: number; label: string }> = {
		rest: { co2: 17, label: 'Ruhe (Schlafen, Sitzen)' },
		office: { co2: 19, label: 'Büro / leichte Tätigkeit' },
		physical: { co2: 35, label: 'Körperliche Arbeit' }
	};

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
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Alle Rechner
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">Luftbedarf</h1>
			<FavButton type="rechner" slug="luftbedarf" title="Luftbedarf" size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Raum</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="area-in">Bodenfläche</label>
			<div class="calc-input-wrap">
				<input id="area-in" type="number" step="1" min="1" bind:value={area} class="calc-input" />
				<span class="calc-input-unit">m²</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="h-in">Raumhöhe</label>
			<div class="calc-input-wrap">
				<input id="h-in" type="number" step="0.1" min="2" bind:value={height} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="p-in">Personenanzahl</label>
			<div class="calc-input-wrap">
				<input id="p-in" type="number" step="1" min="0" bind:value={persons} class="calc-input" />
				<span class="calc-input-unit">Pers.</span>
			</div>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">Anforderung</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="cat-sel">
				Qualitätskategorie EN 16798-1
				<span class="calc-field-hint">{categories[cat].desc}</span>
			</label>
			<select id="cat-sel" bind:value={cat} class="calc-select">
				{#each Object.entries(categories) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="act-sel">Aktivitätsniveau</label>
			<select id="act-sel" bind:value={activity} class="calc-select">
				{#each Object.entries(activityFactors) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Empfohlener Aussenluftstrom</span>
			<span class="calc-result-value primary">{fmt(result.recommended, 0)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">… davon nach EN 16798</span>
			<span class="calc-result-value">{fmt(result.flowEN, 0)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">… davon CO₂-basiert (Ziel {result.co2Target} ppm)</span>
			<span class="calc-result-value">{fmt(result.flowCO2, 0)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Luftwechselrate</span>
			<span class="calc-result-value">{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Raumvolumen</span>
			<span class="calc-result-value">{fmt(result.volume, 1)}<span class="calc-result-unit">m³</span></span>
		</div>
	</div>

	<p class="calc-info">
		Berechnung nach SN EN 16798-1: massgebend ist der grössere der beiden Werte (Personen- + Flächenbedarf vs. CO₂-Massenbilanz).
		<br />Aussenluft-CO₂ = 400 ppm angenommen.
	</p>
</div>
