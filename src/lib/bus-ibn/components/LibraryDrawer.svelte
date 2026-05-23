<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusSegment, BusType, LibraryItem } from '../types';

	type FilterBus = BusType | 'analog' | 'all';

	interface FilteredGroup {
		cat: string;
		items: LibraryItem[];
	}

	interface Props {
		open: boolean;
		targetSegId: string | null;
		filterBus: FilterBus;
		query: string;
		segments: BusSegment[];
		filteredLibrary: FilteredGroup[];
		onAdd: (item: LibraryItem) => void;
	}

	let {
		open = $bindable(),
		targetSegId = $bindable(),
		filterBus = $bindable(),
		query = $bindable(),
		segments,
		filteredLibrary,
		onAdd
	}: Props = $props();
</script>

{#if open}
	<div class="lib-overlay" role="presentation" onclick={() => (open = false)}></div>
{/if}
<div class="lib-drawer" class:lib-drawer--open={open}>
	<div class="lib-head">
		<span>{$_('busIbn.libraryTitle')}</span>
		<button
			type="button"
			class="btn-icon"
			aria-label={$_('common.close')}
			onclick={() => (open = false)}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	</div>
	{#if segments.length > 1}
		<label class="lib-target">
			<span class="settings-label">{$_('busIbn.libraryInsertIn')}</span>
			<select class="settings-select" bind:value={targetSegId} style="flex:1">
				{#each segments as s (s.id)}
					<option value={s.id}>{s.name}</option>
				{/each}
			</select>
		</label>
	{/if}
	<div class="lib-bus-chips">
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={filterBus === 'all'}
			onclick={() => (filterBus = 'all')}>Alle</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={filterBus === 'bacnet-mstp'}
			onclick={() => (filterBus = 'bacnet-mstp')}>BACnet MSTP</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={filterBus === 'modbus-rtu'}
			onclick={() => (filterBus = 'modbus-rtu')}>Modbus RTU</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={filterBus === 'knx'}
			onclick={() => (filterBus = 'knx')}>KNX</button
		>
		<button
			type="button"
			class="lib-chip"
			class:lib-chip--active={filterBus === 'analog'}
			onclick={() => (filterBus = 'analog')}>Analog</button
		>
	</div>
	<div class="lib-search-wrap">
		<input
			type="search"
			class="lib-search"
			placeholder={$_('busIbn.librarySearchPlaceholder')}
			bind:value={query}
		/>
	</div>
	<div class="lib-list">
		{#each filteredLibrary as grp, i (i)}
			<div class="lib-cat">{grp.cat}</div>
			{#each grp.items as item (item.vendor + '|' + item.model)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="lib-item" role="button" tabindex="0" onclick={() => onAdd(item)}>
					<div class="lib-item-short">{item.short}</div>
					<div class="lib-item-meta">
						<div class="lib-item-name">{item.vendor} {item.model}</div>
						<div class="lib-item-desc">{item.desc}</div>
					</div>
					<button
						type="button"
						class="lib-item-add"
						onclick={(e) => {
							e.stopPropagation();
							onAdd(item);
						}}
						title={$_('busIbn.libraryAddDevice')}>+</button
					>
				</div>
			{/each}
		{/each}
		{#if filteredLibrary.length === 0}
			<div class="lib-empty">{$_('busIbn.libraryNoResults')}</div>
		{/if}
	</div>
</div>

<style>
	.lib-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		z-index: 90;
	}
	.lib-drawer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 380px;
		max-width: 90vw;
		background: var(--card);
		border-left: 1px solid var(--border);
		z-index: 95;
		display: flex;
		flex-direction: column;
		transform: translateX(100%);
		transition: transform 0.2s;
	}
	.lib-drawer--open {
		transform: translateX(0);
	}
	.lib-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--border);
		font-weight: 600;
		color: var(--text);
	}
	.lib-target {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 1.25rem;
		border-bottom: 1px solid var(--border);
	}
	.settings-label {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.settings-select {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.5rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
	}
	.lib-bus-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.625rem 1.25rem;
		border-bottom: 1px solid var(--border);
	}
	.lib-chip {
		font-size: 0.6875rem;
		font-weight: 600;
		padding: 0.25rem 0.625rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
	}
	.lib-chip--active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}
	.lib-search-wrap {
		padding: 0.625rem 1.25rem;
		border-bottom: 1px solid var(--border);
	}
	.lib-search {
		width: 100%;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.5rem 0.625rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
	}
	.lib-list {
		flex: 1;
		overflow: auto;
		padding: 0.5rem 0;
	}
	.lib-cat {
		font-size: 0.6875rem;
		font-weight: 700;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.625rem 1.25rem 0.375rem;
	}
	.lib-item {
		display: grid;
		grid-template-columns: 2.5rem 1fr auto;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 1.25rem;
		cursor: pointer;
	}
	.lib-item:hover {
		background: var(--bg);
	}
	.lib-item-short {
		font-size: 0.625rem;
		font-weight: 700;
		text-align: center;
		padding: 0.2rem;
		border-radius: 0.25rem;
		background: var(--bg);
		color: var(--muted);
	}
	.lib-item-meta {
		min-width: 0;
	}
	.lib-item-name {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lib-item-desc {
		font-size: 0.6875rem;
		color: var(--muted);
	}
	.lib-item-add {
		font-size: 1rem;
		font-weight: 700;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--color-primary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
	}
	.lib-item-add:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}
	.lib-empty {
		text-align: center;
		font-size: 0.8125rem;
		color: var(--muted);
		padding: 1.5rem;
	}
	.btn-icon {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
	}
	.btn-icon:hover {
		color: var(--text);
		background: var(--bg);
	}
</style>
