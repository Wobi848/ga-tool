<script lang="ts">
	import { browser } from '$app/environment';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	type Protocol = 'bacnet-mstp' | 'modbus-rtu' | 'knx' | 'custom';

	const STORAGE_KEY = 'ga-dip-switch-prefs';

	interface ProtocolPreset {
		label: string;
		switches: number;
		min: number;
		max: number;
		addressLabel: string;
		info: string;
	}

	interface ProtocolPresetBase {
		label: string;
		switches: number;
		min: number;
		max: number;
		addressLabel: string;
		addressLabelKey?: string;
		infoKey: string;
	}

	const presetsBase: Record<Protocol, ProtocolPresetBase> = {
		'bacnet-mstp': {
			label: 'BACnet MSTP',
			switches: 7,
			min: 0,
			max: 127,
			addressLabel: 'MAC Address',
			infoKey: 'rechner.dipSwitchUi.infoBacnetMstp'
		},
		'modbus-rtu': {
			label: 'Modbus RTU',
			switches: 8,
			min: 1,
			max: 247,
			addressLabel: 'Slave ID',
			infoKey: 'rechner.dipSwitchUi.infoModbusRtu'
		},
		knx: {
			label: 'KNX',
			switches: 8,
			min: 0,
			max: 255,
			addressLabel: 'Physical address (line)',
			addressLabelKey: 'rechner.dipSwitchUi.addressLabelKnx',
			infoKey: 'rechner.dipSwitchUi.infoKnx'
		},
		custom: {
			label: 'Custom',
			switches: 8,
			min: 0,
			max: 255,
			addressLabel: 'Address',
			addressLabelKey: 'rechner.dipSwitchUi.addressLabelCustom',
			infoKey: 'rechner.dipSwitchUi.infoCustom'
		}
	};
	const presets = $derived(
		Object.fromEntries(
			Object.entries(presetsBase).map(([k, v]) => [
				k,
				{
					...v,
					label: k === 'custom' ? $_('rechner.dipSwitchUi.custom') : v.label,
					addressLabel: v.addressLabelKey ? $_(v.addressLabelKey) : v.addressLabel,
					info: $_(v.infoKey)
				}
			])
		) as unknown as Record<Protocol, ProtocolPreset>
	);

	function loadPrefs() {
		if (!browser) return {};
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
		} catch {
			return {};
		}
	}

	const saved = loadPrefs();

	let protocol = $state<Protocol>(saved.protocol ?? 'bacnet-mstp');
	let customMin = $state(saved.customMin ?? 0);
	let customMax = $state(saved.customMax ?? 255);
	let customSwitches = $state(saved.customSwitches ?? 8);
	let invertedLogic = $state(saved.invertedLogic ?? false);
	let msbLeft = $state(saved.msbLeft ?? true);

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				protocol,
				customMin,
				customMax,
				customSwitches,
				invertedLogic,
				msbLeft
			})
		);
	});

	const preset = $derived(presets[protocol]);
	const switchCount = $derived(protocol === 'custom' ? customSwitches : preset.switches);
	const rangeMin = $derived(protocol === 'custom' ? customMin : preset.min);
	const rangeMax = $derived(protocol === 'custom' ? customMax : preset.max);

	// address is the single source of truth — writable but resets when protocol changes
	// eslint-disable-next-line svelte/prefer-writable-derived
	let address = $state(0);

	$effect(() => {
		address = presets[protocol].min;
	});

	function setAddress(val: number) {
		address = Math.max(rangeMin, Math.min(rangeMax, val));
	}

	// Derive switch visual states from address
	// invertedLogic: ON visually = bit 0, OFF visually = bit 1
	const switches = $derived.by(() => {
		const result: boolean[] = [];
		for (let i = 0; i < switchCount; i++) {
			const bitPos = msbLeft ? switchCount - 1 - i : i;
			const bit = (address >> bitPos) & 1;
			result.push(invertedLogic ? bit === 0 : bit === 1);
		}
		return result;
	});

	function toggleSwitch(i: number) {
		const bitPos = msbLeft ? switchCount - 1 - i : i;
		setAddress(address ^ (1 << bitPos));
	}

	function bitValue(i: number): number {
		const bitPos = msbLeft ? switchCount - 1 - i : i;
		return 1 << bitPos;
	}

	const binary = $derived(address.toString(2).padStart(switchCount, '0'));
	const hex = $derived(
		address
			.toString(16)
			.toUpperCase()
			.padStart(Math.ceil(switchCount / 4), '0')
	);
	const addressInRange = $derived(address >= rangeMin && address <= rangeMax);
</script>

<div class="page">
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
		<h1 class="page-title">{$_('rechner.dipSwitch.name')}</h1>
		<FavButton type="rechner" slug="dip-switch" title={$_('rechner.dipSwitch.name')} size={20} />
	</div>
	<p class="page-sub">{$_('rechner.dipSwitchUi.subtitle')}</p>

	<div class="layout">
		<!-- ── Left: Config ── -->
		<div class="config-panel">
			<!-- Protocol -->
			<div class="card">
				<div class="card-label">{$_('rechner.dipSwitchUi.protocol')}</div>
				<div class="seg-group">
					{#each Object.entries(presets) as [key, p]}
						<button
							type="button"
							class="seg-btn"
							class:active={protocol === key}
							onclick={() => {
								protocol = key as Protocol;
								setAddress(presets[key as Protocol].min);
							}}>{p.label}</button
						>
					{/each}
				</div>
			</div>

			<!-- Custom range (only for custom) -->
			{#if protocol === 'custom'}
				<div class="card">
					<div class="card-label">{$_('rechner.dipSwitchUi.custom')}</div>
					<div class="custom-grid">
						<div class="field">
							<label class="field-label" for="inp-sw-count"
								>{$_('rechner.dipSwitchUi.switchCount')}</label
							>
							<input
								id="inp-sw-count"
								type="number"
								class="input"
								min="4"
								max="10"
								bind:value={customSwitches}
								onchange={() => setAddress(customMin)}
							/>
						</div>
						<div class="field">
							<label class="field-label" for="inp-min">Min</label>
							<input
								id="inp-min"
								type="number"
								class="input"
								min="0"
								max="1023"
								bind:value={customMin}
							/>
						</div>
						<div class="field">
							<label class="field-label" for="inp-max">Max</label>
							<input
								id="inp-max"
								type="number"
								class="input"
								min="1"
								max="1023"
								bind:value={customMax}
							/>
						</div>
					</div>
				</div>
			{/if}

			<!-- Options -->
			<div class="card">
				<div class="card-label">{$_('rechner.dipSwitchUi.options')}</div>

				<div class="option-row">
					<span class="option-label">{$_('rechner.dipSwitchUi.numbering')}</span>
					<div class="seg-group seg-group--sm">
						<button
							type="button"
							class="seg-btn"
							class:active={msbLeft}
							onclick={() => (msbLeft = true)}>MSB links (1 → {switchCount})</button
						>
						<button
							type="button"
							class="seg-btn"
							class:active={!msbLeft}
							onclick={() => (msbLeft = false)}>MSB rechts ({switchCount} → 1)</button
						>
					</div>
				</div>

				<div class="option-row">
					<span class="option-label">{$_('rechner.dipSwitchUi.invertedLogic')}</span>
					<label class="toggle">
						<input type="checkbox" bind:checked={invertedLogic} />
						<span class="toggle-track"></span>
					</label>
					<span class="option-hint">{$_('rechner.dipSwitchUi.invertedDesc')}</span>
				</div>
			</div>

			<!-- Info -->
			<div class="info-box">
				<div class="info-title">{$_('rechner.dipSwitchUi.protocolInfo')}</div>
				<p class="info-text">{preset.info}</p>
				<div class="info-meta">
					<span>Switches: {switchCount}</span>
					<span>{$_('rechner.dipSwitchUi.range')}: {rangeMin}–{rangeMax}</span>
					<span>{$_('rechner.dipSwitchUi.bitResolution')}: {switchCount} Bit</span>
				</div>
			</div>
		</div>

		<!-- ── Right: DIP Visual ── -->
		<div class="dip-panel">
			<div class="dip-card">
				<div class="dip-header">
					<span class="dip-title">{$_('rechner.dipSwitchUi.dipSwitchPositions')}</span>
					<span class="dip-range-badge">{rangeMin}–{rangeMax}</span>
					<div class="dip-stepper">
						<button
							type="button"
							class="step-btn step-btn--minus"
							onclick={() => setAddress(address - 1)}
							disabled={address <= rangeMin}>−</button
						>
						<input
							type="number"
							class="step-input"
							class:out-of-range={!addressInRange}
							value={address}
							min={rangeMin}
							max={rangeMax}
							oninput={(e) => setAddress(parseInt((e.target as HTMLInputElement).value) || 0)}
						/>
						<button
							type="button"
							class="step-btn step-btn--plus"
							onclick={() => setAddress(address + 1)}
							disabled={address >= rangeMax}>+</button
						>
					</div>
				</div>

				<!-- Switch labels top -->
				<div class="switch-row">
					{#each Array(switchCount) as _, i}
						<div class="switch-col">
							<span class="switch-num">{i + 1}</span>
							<span class="switch-val">{bitValue(i)}</span>
						</div>
					{/each}
				</div>

				<!-- ON labels -->
				<div class="switch-row switch-row--label">
					{#each Array(switchCount) as _, _i (_i)}
						<div class="switch-col">
							<span class="state-label state-label--on">ON</span>
						</div>
					{/each}
				</div>

				<!-- Switches -->
				<div class="switch-row">
					{#each Array(switchCount) as _, i}
						<div class="switch-col">
							<button
								type="button"
								class="dip-switch"
								class:dip-on={switches[i]}
								onclick={() => toggleSwitch(i)}
								aria-label="Switch {i + 1} {switches[i] ? 'ON' : 'OFF'}"
							>
								<div class="dip-thumb"></div>
							</button>
						</div>
					{/each}
				</div>

				<!-- OFF labels -->
				<div class="switch-row switch-row--label">
					{#each Array(switchCount) as _, _i (_i)}
						<div class="switch-col">
							<span class="state-label state-label--off">OFF</span>
						</div>
					{/each}
				</div>

				<!-- Result bar -->
				<div class="result-bar">
					<span class="result-item"
						><span class="result-lbl">B:</span>
						<span class="result-val result-val--mono">{binary}</span></span
					>
					<span class="result-sep">·</span>
					<span class="result-item"
						><span class="result-lbl">{preset.addressLabel}:</span>
						<span class="result-val result-val--big" class:out-of-range={!addressInRange}
							>{address}</span
						></span
					>
					<span class="result-sep">·</span>
					<span class="result-item"
						><span class="result-lbl">H:</span>
						<span class="result-val result-val--mono">0x{hex}</span></span
					>
				</div>

				{#if !addressInRange}
					<div class="range-warning">
						⚠ {$_('rechner.dipSwitchUi.warnOutOfRange', {
							values: { min: rangeMin, max: rangeMax }
						})}
					</div>
				{/if}
			</div>

			<!-- Quick reference -->
			<div class="quick-ref">
				<div class="qr-title">{$_('rechner.dipSwitchUi.bitWeight')}</div>
				<div class="qr-grid">
					{#each Array(switchCount) as _, i}
						<div class="qr-item" class:qr-active={switches[i]}>
							<span class="qr-sw">SW{i + 1}</span>
							<span class="qr-bv">{bitValue(i)}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		max-width: 1100px;
		margin: 0 auto;
	}

	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.25rem;
	}

	.page-sub {
		font-size: 0.875rem;
		color: var(--muted);
		margin-bottom: 1.75rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 380px 1fr;
		gap: 1.5rem;
		align-items: start;
	}

	/* ── Cards ── */
	.card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 1rem;
	}

	.card-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
		margin-bottom: 0.75rem;
	}

	/* ── Segment buttons ── */
	.seg-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.seg-btn {
		padding: 0.4rem 0.75rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}

	.seg-btn:hover {
		border-color: var(--color-primary);
		color: var(--text);
	}

	.seg-btn.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
		font-weight: 600;
	}

	.seg-group--sm .seg-btn {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
	}

	/* ── Options ── */
	.option-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding: 0.5rem 0;
		border-top: 1px solid var(--border);
	}

	.option-row:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.option-label {
		font-size: 0.8125rem;
		color: var(--text);
		min-width: 130px;
	}

	.option-hint {
		font-size: 0.75rem;
		color: var(--muted);
	}

	/* ── Toggle ── */
	.toggle {
		position: relative;
		display: inline-flex;
		cursor: pointer;
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}

	.toggle-track {
		width: 36px;
		height: 20px;
		background: var(--border);
		border-radius: 10px;
		transition: background 0.2s;
		position: relative;
	}

	.toggle-track::after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		width: 14px;
		height: 14px;
		background: #fff;
		border-radius: 50%;
		transition: transform 0.2s;
	}

	.toggle input:checked + .toggle-track {
		background: var(--color-primary);
	}

	.toggle input:checked + .toggle-track::after {
		transform: translateX(16px);
	}

	/* ── Custom fields ── */
	.custom-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.75rem;
	}

	.field-label {
		display: block;
		font-size: 0.75rem;
		color: var(--muted);
		margin-bottom: 0.3rem;
	}

	.input {
		width: 100%;
		padding: 0.45rem 0.6rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--text);
		font-size: 0.875rem;
		font-family: inherit;
	}

	/* ── Info box ── */
	.info-box {
		background: color-mix(in srgb, var(--color-primary) 6%, var(--surface));
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		border-radius: 0.75rem;
		padding: 1rem 1.25rem;
	}

	.info-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}

	.info-text {
		font-size: 0.8125rem;
		color: var(--muted);
		line-height: 1.5;
		margin: 0 0 0.75rem 0;
	}

	.info-meta {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		font-size: 0.75rem;
		color: var(--text);
		font-weight: 500;
	}

	/* ── DIP Panel ── */
	.dip-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.dip-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.dip-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		flex: 1;
	}

	.dip-range-badge {
		font-size: 0.75rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.2rem 0.5rem;
		color: var(--muted);
	}

	/* ── Stepper ── */
	.dip-stepper {
		display: flex;
		align-items: center;
		gap: 0;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.step-btn {
		width: 36px;
		height: 36px;
		border: none;
		background: var(--bg);
		color: var(--text);
		font-size: 1.25rem;
		cursor: pointer;
		transition: background 0.15s;
		font-family: inherit;
	}

	.step-btn:hover:not(:disabled) {
		background: var(--surface-hover);
	}

	.step-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}

	.step-btn--plus {
		background: #16a34a;
		color: #fff;
	}

	.step-btn--plus:hover:not(:disabled) {
		background: #15803d;
	}

	.step-input {
		width: 64px;
		text-align: center;
		border: none;
		border-left: 1px solid var(--border);
		border-right: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
		font-size: 0.9375rem;
		font-weight: 600;
		font-family: inherit;
		padding: 0.4rem 0.25rem;
		height: 36px;
	}

	.step-input.out-of-range {
		color: #dc2626;
	}

	/* ── Switch rows ── */
	.switch-row {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.switch-row--label {
		margin-bottom: 0.1rem;
	}

	.switch-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 52px;
	}

	.switch-num {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text);
	}

	.switch-val {
		font-size: 0.65rem;
		color: var(--muted);
		margin-top: 1px;
	}

	.state-label {
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.state-label--on {
		color: #16a34a;
	}
	.state-label--off {
		color: var(--muted);
	}

	/* ── DIP Switch ── */
	.dip-switch {
		width: 44px;
		height: 72px;
		background: var(--bg);
		border: 2px solid var(--border);
		border-radius: 5px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: border-color 0.15s;
	}

	.dip-switch:hover {
		border-color: var(--color-primary);
	}

	.dip-thumb {
		position: absolute;
		left: 5px;
		right: 5px;
		height: 28px;
		background: color-mix(in srgb, var(--muted) 50%, var(--surface));
		border-radius: 3px;
		top: calc(100% - 34px);
		transition:
			top 0.15s ease,
			background 0.15s;
	}

	.dip-switch.dip-on .dip-thumb {
		top: 6px;
		background: var(--text);
	}

	/* ── Result bar ── */
	.result-bar {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		margin-top: 1.25rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.result-lbl {
		font-size: 0.75rem;
		color: var(--muted);
		font-weight: 500;
	}

	.result-val {
		font-size: 0.875rem;
		color: var(--text);
	}

	.result-val--mono {
		font-family: 'Courier New', monospace;
		letter-spacing: 0.05em;
	}

	.result-val--big {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.result-val--big.out-of-range {
		color: #dc2626;
	}

	.result-sep {
		color: var(--border);
		font-size: 1.2rem;
	}

	.range-warning {
		text-align: center;
		font-size: 0.8rem;
		color: #dc2626;
		margin-top: 0.5rem;
		font-weight: 500;
	}

	/* ── Quick ref ── */
	.quick-ref {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem 1.25rem;
	}

	.qr-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
		margin-bottom: 0.75rem;
	}

	.qr-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.qr-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.35rem 0.5rem;
		min-width: 48px;
		transition:
			background 0.15s,
			border-color 0.15s;
	}

	.qr-item.qr-active {
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
		border-color: var(--color-primary);
	}

	.qr-sw {
		font-size: 0.65rem;
		color: var(--muted);
	}

	.qr-bv {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--text);
	}

	.qr-active .qr-bv {
		color: var(--color-primary);
	}

	/* ── Responsive ── */
	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 540px) {
		.switch-col {
			width: 40px;
		}
		.dip-switch {
			width: 34px;
			height: 58px;
		}
		.dip-thumb {
			height: 22px;
			top: calc(100% - 28px);
		}
		.dip-switch.dip-on .dip-thumb {
			top: 5px;
		}
	}
</style>
