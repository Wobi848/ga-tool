<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Normaussentemperatur Schweizer Standorte (SIA 381/1 Klimadaten)
	const standorte = [
		{ label: 'Zürich', te: -10 },
		{ label: 'Bern', te: -11 },
		{ label: 'Basel', te: -9 },
		{ label: 'Genf', te: -8 },
		{ label: 'Luzern', te: -10 },
		{ label: 'St. Gallen', te: -13 },
		{ label: 'Davos', te: -21 },
		{ label: 'Lugano', te: -5 },
		{ label: 'Chur', te: -14 },
		{ label: null, te: -10 },
	];

	let standortIdx = $state(0);
	let teManual = $state(-10);

	const te = $derived(standortIdx < standorte.length - 1 ? standorte[standortIdx].te : teManual);

	$effect(() => {
		if (standortIdx < standorte.length - 1) {
			teManual = standorte[standortIdx].te;
		}
	});

	// Raumtyp-Vorlagen
	type RoomType = 'wohnen' | 'schlafen' | 'bad' | 'buero' | 'treppenhaus' | 'keller';
	const roomTypeKeys: Record<RoomType, { ti: number; i18nKey: string }> = {
		wohnen:      { ti: 20, i18nKey: 'rechner.heizlastUi.roomWohnen' },
		schlafen:    { ti: 18, i18nKey: 'rechner.heizlastUi.roomSchlafen' },
		bad:         { ti: 24, i18nKey: 'rechner.heizlastUi.roomBad' },
		buero:       { ti: 20, i18nKey: 'rechner.heizlastUi.roomBuero' },
		treppenhaus: { ti: 15, i18nKey: 'rechner.heizlastUi.roomTreppenhaus' },
		keller:      { ti: 10, i18nKey: 'rechner.heizlastUi.roomKeller' },
	};

	type Raum = {
		id: number;
		label: string;
		ti: number;       // Raumsolltemperatur °C
		area: number;     // m²
		height: number;   // m
		uWall: number;    // W/(m²K)
		uRoof: number;    // W/(m²K)
		uFloor: number;   // W/(m²K)
		uWindow: number;  // W/(m²K)
		windowArea: number; // m²
		ach: number;      // Luftwechsel 1/h (Infiltration)
	};

	let rooms: Raum[] = $state([
		{ id: 1, label: 'Room 1', ti: 20, area: 25, height: 2.6, uWall: 0.20, uRoof: 0.15, uFloor: 0.25, uWindow: 0.9, windowArea: 4.0, ach: 0.3 },
		{ id: 2, label: 'Room 2', ti: 18, area: 16, height: 2.6, uWall: 0.20, uRoof: 0.15, uFloor: 0.25, uWindow: 0.9, windowArea: 2.5, ach: 0.3 },
		{ id: 3, label: 'Room 3', ti: 24, area: 8, height: 2.6, uWall: 0.20, uRoof: 0.15, uFloor: 0.25, uWindow: 0.9, windowArea: 0.5, ach: 0.5 },
	]);

	let nextId = $state(4);

	function addRoom(type: RoomType, label: string) {
		const d = roomTypeKeys[type];
		rooms = [...rooms, {
			id: nextId++,
			label,
			ti: d.ti,
			area: 20,
			height: 2.6,
			uWall: 0.20,
			uRoof: 0.15,
			uFloor: 0.25,
			uWindow: 0.9,
			windowArea: 3.0,
			ach: 0.3
		}];
	}

	function removeRoom(id: number) {
		rooms = rooms.filter(r => r.id !== id);
	}

	// Heizlast pro Raum [W]
	function roomLoad(r: Raum): number {
		const dt = r.ti - te;
		if (dt <= 0) return 0;

		// Aussenwand: Fläche = Grundfläche × 4 × Faktor − Fensterfläche (vereinfacht: Hüllflächenanteil)
		// Vereinfachung: Aussenwand = Umfang × Höhe, Umfang ≈ 4 × sqrt(Fläche)
		const perimeter = 4 * Math.sqrt(r.area);
		const wallArea = perimeter * r.height - r.windowArea;

		const qTrans =
			wallArea * r.uWall * dt +
			r.area * r.uRoof * dt +
			r.area * r.uFloor * dt * 0.5 + // Boden gegen Erdreich: 50% Abschlag
			r.windowArea * r.uWindow * dt;

		// Lüftungswärmeverlust: Q = V̇ × ρ × cp × ΔT = ACH × V × 0.34 × ΔT
		const volume = r.area * r.height;
		const qVent = r.ach * volume * 0.34 * dt;

		return qTrans + qVent;
	}

	const results = $derived(rooms.map(r => ({ ...r, load: roomLoad(r) })));
	const totalLoad = $derived(results.reduce((s, r) => s + r.load, 0));
	const totalArea = $derived(rooms.reduce((s, r) => s + r.area, 0));
	const spezifisch = $derived(totalArea > 0 ? totalLoad / totalArea : 0);

	// Ausgewählter Raum für Detail-Bearbeitung
	let selectedId = $state<number | null>(null);
	const selectedRoom = $derived(rooms.find(r => r.id === selectedId) ?? null);

	function updateRoom(id: number, field: keyof Raum, value: number | string) {
		rooms = rooms.map(r => r.id === id ? { ...r, [field]: typeof value === 'string' ? value : value } : r);
	}
</script>

<div class="calc-page">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			{$_('common.allCalculators')}
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">{$_('rechner.heizlast.name')}</h1>
			<FavButton type="rechner" slug="heizlast" title={$_('rechner.heizlast.name')} size={20} />
		</div>
	</header>

	<!-- Standort -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.heizlastUi.locationNorm')}</h2>
		<div class="standort-grid">
			{#each standorte as s, i}
				<button
					class="standort-btn"
					class:active={standortIdx === i}
					onclick={() => standortIdx = i}
				>
					<span>{s.label ?? $_('rechner.heizlastUi.custom')}</span>
					{#if i < standorte.length - 1}
					<span class="standort-te">{s.te}°C</span>
					{/if}
				</button>
			{/each}
		</div>
		{#if standortIdx === standorte.length - 1}
		<div class="calc-field">
			<label class="calc-field-label" for="te-in">{$_('rechner.heizlastUi.normOutdoor')}</label>
			<div class="calc-input-wrap">
				<input id="te-in" type="number" step="1" bind:value={teManual} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		{:else}
		<p class="te-display">{$_('rechner.heizlastUi.normOutdoorIs')} <strong>{te}°C</strong></p>
		{/if}
	</div>

	<!-- Räume Liste -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.heizlastUi.rooms')}</h2>
		{#each results as r}
		<div class="room-row" class:selected={selectedId === r.id}>
			<button class="room-main" onclick={() => selectedId = selectedId === r.id ? null : r.id}>
				<span class="room-label">{r.label}</span>
				<span class="room-area">{r.area} m²</span>
				<span class="room-ti">{r.ti}°C</span>
				<span class="room-load">{fmt(r.load, 0)} W</span>
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="room-chevron" class:open={selectedId === r.id}>
					<path d="M6 9l6 6 6-6"/>
				</svg>
			</button>

			{#if selectedId === r.id}
			<div class="room-detail">
				<div class="detail-grid">
					<div class="detail-field">
						<label for="{r.id}-label">{$_('rechner.heizlastUi.designation')}</label>
						<input id="{r.id}-label" type="text" value={r.label} oninput={e => updateRoom(r.id, 'label', (e.target as HTMLInputElement).value)} class="detail-input" />
					</div>
					<div class="detail-field">
						<label for="{r.id}-ti">{$_('rechner.heizlastUi.roomSetpoint')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-ti" type="number" step="1" value={r.ti} oninput={e => updateRoom(r.id, 'ti', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">°C</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-area">{$_('rechner.heizlastUi.floorArea')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-area" type="number" step="1" min="1" value={r.area} oninput={e => updateRoom(r.id, 'area', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">m²</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-height">{$_('rechner.heizlastUi.roomHeight')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-height" type="number" step="0.1" min="2" value={r.height} oninput={e => updateRoom(r.id, 'height', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">m</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-uwall">{$_('rechner.heizlastUi.uWallLabel')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-uwall" type="number" step="0.01" min="0.05" value={r.uWall} oninput={e => updateRoom(r.id, 'uWall', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">W/m²K</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-uroof">{$_('rechner.heizlastUi.uRoofLabel')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-uroof" type="number" step="0.01" min="0.05" value={r.uRoof} oninput={e => updateRoom(r.id, 'uRoof', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">W/m²K</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-ufloor">{$_('rechner.heizlastUi.uFloorLabel')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-ufloor" type="number" step="0.01" min="0.05" value={r.uFloor} oninput={e => updateRoom(r.id, 'uFloor', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">W/m²K</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-uwindow">{$_('rechner.heizlastUi.uWindowLabel')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-uwindow" type="number" step="0.1" min="0.5" value={r.uWindow} oninput={e => updateRoom(r.id, 'uWindow', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">W/m²K</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-winarea">{$_('rechner.heizlastUi.windowArea')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-winarea" type="number" step="0.5" min="0" value={r.windowArea} oninput={e => updateRoom(r.id, 'windowArea', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">m²</span>
						</div>
					</div>
					<div class="detail-field">
						<label for="{r.id}-ach">{$_('rechner.heizlastUi.airChange')}</label>
						<div class="detail-wrap">
							<input id="{r.id}-ach" type="number" step="0.1" min="0.1" value={r.ach} oninput={e => updateRoom(r.id, 'ach', parseFloat((e.target as HTMLInputElement).value))} class="detail-input detail-num" />
							<span class="detail-unit">1/h</span>
						</div>
					</div>
				</div>
				<div class="room-result-row">
					<span class="room-result-label">{$_('rechner.heizlastUi.roomHeatload')}</span>
					<span class="room-result-val">{fmt(r.load, 0)} W = {fmt(r.load/1000, 2)} kW</span>
					<span class="room-result-spec">{fmt(r.area > 0 ? r.load / r.area : 0, 0)} W/m²</span>
				</div>
				<button class="room-delete" onclick={() => { removeRoom(r.id); selectedId = null; }}>{$_('rechner.heizlastUi.removeRoom')}</button>
			</div>
			{/if}
		</div>
		{/each}

		<!-- Add room -->
		<div class="add-room-row">
			<span class="add-room-label">{$_('rechner.heizlastUi.addRoom')}</span>
			{#each Object.entries(roomTypeKeys) as [k, v]}
				{@const label = $_(v.i18nKey)}
				<button class="add-room-btn" onclick={() => addRoom(k as RoomType, label)}>{label.split(' ')[0]}</button>
			{/each}
		</div>
	</div>

	<!-- Total result -->
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.heizlastUi.totalHeatload')}</span>
			<span class="calc-result-value primary">{fmt(totalLoad, 0)}<span class="calc-result-unit">W</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.heizlastUi.totalHeatload')}</span>
			<span class="calc-result-value">{fmt(totalLoad / 1000, 2)}<span class="calc-result-unit">kW</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.heizlastUi.specificHeatload')}</span>
			<span class="calc-result-value"
				style="color: {spezifisch < 40 ? '#16a34a' : spezifisch < 70 ? '#ca8a04' : '#dc2626'}">
				{fmt(spezifisch, 0)}<span class="calc-result-unit">W/m²</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.heizlastUi.totalArea')}</span>
			<span class="calc-result-value">{fmt(totalArea, 0)}<span class="calc-result-unit">m²</span></span>
		</div>
	</div>

	<div class="benchmark">
		<span class="bm-title">{$_('rechner.heizlastUi.benchmarkTitle')}</span>
		<span class="bm-item" style="color:#16a34a">{$_('rechner.heizlastUi.benchmarkMinergie')}</span>
		<span class="bm-item" style="color:#ca8a04">{$_('rechner.heizlastUi.benchmarkNew')}</span>
		<span class="bm-item" style="color:#ea580c">{$_('rechner.heizlastUi.benchmarkOld')}</span>
		<span class="bm-item" style="color:#dc2626">{$_('rechner.heizlastUi.benchmarkUninsulated')}</span>
	</div>

	<p class="calc-info">{$_('rechner.heizlastUi.calcNote')}</p>
</div>

<style>
	.standort-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.375rem;
		margin-bottom: 0.5rem;
	}

	.standort-btn {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.35rem 0.5rem;
		font-family: inherit;
		font-size: 0.75rem;
		color: var(--muted);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		transition: border-color 0.15s, color 0.15s;
	}

	.standort-btn.active {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}

	.standort-te {
		font-weight: 700;
		font-size: 0.8125rem;
	}

	.te-display {
		font-size: 0.8125rem;
		color: var(--muted);
		margin-top: 0.25rem;
	}

	/* Room list */
	.room-row {
		border-bottom: 1px solid var(--border);
	}

	.room-row.selected {
		background: color-mix(in srgb, var(--color-primary) 4%, transparent);
	}

	.room-main {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
		padding: 0.5rem 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		color: var(--text);
		text-align: left;
	}

	.room-label { flex: 1; font-size: 0.8125rem; font-weight: 500; }
	.room-area  { font-size: 0.75rem; color: var(--muted); min-width: 3rem; text-align: right; }
	.room-ti    { font-size: 0.75rem; color: var(--muted); min-width: 2.5rem; text-align: right; }
	.room-load  { font-size: 0.8125rem; font-weight: 600; color: var(--color-primary); min-width: 4rem; text-align: right; font-family: ui-monospace, monospace; }

	.room-chevron { color: var(--muted); flex-shrink: 0; transition: transform 0.2s; }
	.room-chevron.open { transform: rotate(180deg); }

	/* Detail */
	.room-detail {
		padding: 0.75rem 0 1rem;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.detail-field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.detail-field label {
		font-size: 0.7rem;
		color: var(--muted);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.detail-wrap {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.detail-input {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.4rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		width: 100%;
	}

	.detail-input.detail-num {
		text-align: right;
		width: 5rem;
	}

	.detail-input:focus { outline: none; border-color: var(--color-primary); }

	.detail-unit { font-size: 0.7rem; color: var(--muted); white-space: nowrap; }

	.room-result-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		background: var(--bg);
		border-radius: 0.5rem;
		font-size: 0.8125rem;
		margin-bottom: 0.5rem;
	}

	.room-result-label { color: var(--muted); flex: 1; }
	.room-result-val { font-weight: 700; color: var(--color-primary); font-family: ui-monospace, monospace; }
	.room-result-spec { color: var(--muted); font-family: ui-monospace, monospace; }

	.room-delete {
		background: none;
		border: none;
		color: #dc2626;
		font-size: 0.75rem;
		cursor: pointer;
		font-family: inherit;
		padding: 0.25rem 0;
		opacity: 0.6;
		transition: opacity 0.15s;
	}
	.room-delete:hover { opacity: 1; }

	/* Add room */
	.add-room-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.375rem;
		padding-top: 0.5rem;
	}

	.add-room-label { font-size: 0.75rem; color: var(--muted); flex-shrink: 0; }

	.add-room-btn {
		background: transparent;
		border: 1px dashed var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-family: inherit;
		color: var(--muted);
		cursor: pointer;
		transition: border-color 0.15s, color 0.15s;
	}
	.add-room-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

	/* Benchmark */
	.benchmark {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.bm-title { color: var(--muted); font-weight: 600; }
	.bm-item { font-weight: 500; }

	@media (max-width: 480px) {
		.standort-grid { grid-template-columns: 1fr 1fr; }
		.detail-grid   { grid-template-columns: 1fr; }
	}
</style>
