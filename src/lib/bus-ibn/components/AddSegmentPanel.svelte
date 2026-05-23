<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusType } from '../types';
	import { BUS_COLORS, BUS_LABELS } from '../constants';

	interface Props {
		show: boolean;
		segType: BusType;
		onAdd: () => void;
	}

	let { show = $bindable(), segType = $bindable(), onAdd }: Props = $props();
</script>

<div class="add-seg-area no-print">
	{#if show}
		<div class="add-seg-panel">
			<span class="add-seg-label">{$_('busIbn.chooseProtocol')}</span>
			{#each ['bacnet-mstp', 'bacnet-ip', 'modbus-rtu', 'knx'] as BusType[] as type (type)}
				<button
					type="button"
					class="btn-bus-type"
					class:btn-bus-type--active={segType === type}
					style="--bus-color:{BUS_COLORS[type]}"
					onclick={() => (segType = type)}
				>
					{BUS_LABELS[type]}
				</button>
			{/each}
			<button type="button" class="btn-confirm" onclick={onAdd}>
				{$_('busIbn.addSegmentBtn')}
			</button>
			<button type="button" class="btn-cancel" onclick={() => (show = false)}>
				{$_('common.cancel')}
			</button>
		</div>
	{:else}
		<button type="button" class="btn-add-seg" onclick={() => (show = true)}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
			{$_('busIbn.addSegment')}
		</button>
	{/if}
</div>

<style>
	.add-seg-area {
		margin-top: 1rem;
	}
	.btn-add-seg {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.875rem;
		background: var(--card);
		border: 1px dashed var(--border);
		border-radius: 0.5rem;
		color: var(--muted);
		font-size: 0.8125rem;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
	}
	.btn-add-seg:hover {
		background: var(--bg);
		color: var(--color-primary);
		border-color: var(--color-primary);
		border-style: solid;
	}
	.add-seg-panel {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		flex-wrap: wrap;
	}
	.add-seg-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		margin-right: 0.375rem;
	}
	.btn-bus-type {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.35rem 0.7rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
	}
	.btn-bus-type--active {
		background: var(--bus-color);
		color: white;
		border-color: var(--bus-color);
	}
	.btn-confirm,
	.btn-cancel {
		font-family: inherit;
		font-size: 0.8125rem;
		font-weight: 500;
		padding: 0.4rem 0.875rem;
		border-radius: 0.375rem;
		cursor: pointer;
	}
	.btn-confirm {
		background: var(--color-primary);
		color: white;
		border: 1px solid var(--color-primary);
		margin-left: auto;
	}
	.btn-cancel {
		background: var(--card);
		color: var(--text);
		border: 1px solid var(--border);
	}
</style>
