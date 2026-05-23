<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusSegment } from '../types';
	import { asMstp, asIp, asModbus, asKnx } from '../logic';
	import { BAUD_OPTIONS } from '../constants';

	interface Props {
		seg: BusSegment;
	}

	let { seg = $bindable() }: Props = $props();
</script>

{#if seg.settingsOpen}
	<div class="seg-settings no-print">
		{#if seg.type === 'bacnet-mstp'}
			{@const s = asMstp(seg.settings)}
			<div class="settings-grid">
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.baudrate')}</span>
					<select class="settings-select" bind:value={s.baud}>
						{#each BAUD_OPTIONS as b (b)}
							<option value={b}>{b}</option>
						{/each}
					</select>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.maxMasters')}</span>
					<input class="settings-input" type="number" min="1" max="127" bind:value={s.maxMasters} />
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.maxInfoFrames')}</span>
					<input
						class="settings-input"
						type="number"
						min="1"
						max="255"
						bind:value={s.maxInfoFrames}
					/>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.apduTimeout')}</span>
					<input
						class="settings-input"
						type="number"
						min="100"
						max="60000"
						step="100"
						bind:value={s.apduTimeout}
					/>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.apduRetries')}</span>
					<input class="settings-input" type="number" min="0" max="10" bind:value={s.apduRetries} />
				</label>
			</div>
		{:else if seg.type === 'bacnet-ip'}
			{@const s = asIp(seg.settings)}
			<div class="settings-grid">
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.subnet')}</span>
					<input
						class="settings-input"
						type="text"
						bind:value={s.subnet}
						placeholder={$_('busIbn.subnetPlaceholder')}
					/>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.udpPort')}</span>
					<input class="settings-input" type="number" min="1" max="65535" bind:value={s.port} />
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.broadcast')}</span>
					<input class="settings-input" type="text" bind:value={s.broadcastAddr} />
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.bbmd')}</span>
					<input
						class="settings-input"
						type="text"
						bind:value={s.bbmd}
						placeholder={$_('busIbn.bbmdPlaceholder')}
					/>
				</label>
			</div>
		{:else if seg.type === 'modbus-rtu'}
			{@const s = asModbus(seg.settings)}
			<div class="settings-grid">
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.baudrate')}</span>
					<select class="settings-select" bind:value={s.baud}>
						{#each BAUD_OPTIONS as b (b)}
							<option value={b}>{b}</option>
						{/each}
					</select>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.parity')}</span>
					<select class="settings-select" bind:value={s.parity}>
						<option value="N">{$_('busIbn.parityNone')}</option>
						<option value="E">{$_('busIbn.parityEven')}</option>
						<option value="O">{$_('busIbn.parityOdd')}</option>
					</select>
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.stopBits')}</span>
					<select class="settings-select" bind:value={s.stopBits}>
						<option value={1}>1</option>
						<option value={2}>2</option>
					</select>
				</label>
			</div>
		{:else if seg.type === 'knx'}
			{@const s = asKnx(seg.settings)}
			<div class="settings-grid">
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.topology')}</span>
					<input class="settings-input" type="text" bind:value={s.topology} placeholder="1.1" />
				</label>
				<label class="settings-field">
					<span class="settings-label">{$_('busIbn.medium')}</span>
					<select class="settings-select" bind:value={s.medium}>
						<option value="TP">{$_('busIbn.mediumTP')}</option>
						<option value="IP">{$_('busIbn.mediumIP')}</option>
					</select>
				</label>
			</div>
		{/if}
	</div>
{/if}

<!-- Print summary -->
<div class="print-only seg-settings-print">
	{#if seg.type === 'bacnet-mstp'}
		{@const s = asMstp(seg.settings)}
		Baud: {s.baud} · Max Masters: {s.maxMasters} · APDU Timeout: {s.apduTimeout} ms ·
		{#if seg.diAuto && seg.diSchema}
			DI-Schema: {String(Math.max(0, Math.min(99, seg.diSS))).padStart(2, '0')}·{String(
				Math.max(0, Math.min(99, seg.diBB))
			).padStart(2, '0')}·MMM
		{:else}
			DI-Offset: {seg.diOffset}
		{/if}
	{:else if seg.type === 'bacnet-ip'}
		{@const s = asIp(seg.settings)}
		Subnet: {s.subnet} · Port: {s.port}{s.bbmd ? ` · BBMD: ${s.bbmd}` : ''}
	{:else if seg.type === 'modbus-rtu'}
		{@const s = asModbus(seg.settings)}
		{$_('busIbn.modbusSettings', {
			values: { baud: s.baud, parity: s.parity, stopBits: s.stopBits }
		})}
	{:else if seg.type === 'knx'}
		{@const s = asKnx(seg.settings)}
		{$_('busIbn.knxSettings', { values: { topology: s.topology, medium: s.medium } })}
	{/if}
</div>

<style>
	.seg-settings {
		padding: 0.75rem 1rem;
		background: var(--bg);
		border-bottom: 1px solid var(--border);
	}
	.settings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 0.625rem;
	}
	.settings-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}
	.settings-label {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.settings-input,
	.settings-select {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		min-width: 0;
	}
	.print-only {
		display: none;
	}
	@media print {
		.print-only {
			display: block;
		}
		.seg-settings-print {
			font-size: 9pt;
			color: #666;
			padding: 4pt 0;
			border-bottom: 1pt dashed #ccc;
		}
	}
</style>
