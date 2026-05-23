<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusSegment, ImportState, DeviceStatus } from '../types';
	import { STATUS_COLORS } from '../constants';

	interface Props {
		state: ImportState;
		segments: BusSegment[];
		statusLabel: (s: DeviceStatus) => string;
		onConfirm: () => void;
	}

	let { state = $bindable(), segments, statusLabel, onConfirm }: Props = $props();

	function close() {
		state.open = false;
	}
</script>

{#if state.open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="modal-overlay no-print" role="presentation" onclick={close}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="modal-head">
				<div>
					<div class="modal-title">{$_('busIbn.importTitle')}</div>
					<div class="modal-sub">
						{state.filename} · {state.rows.length}
						{$_('common.rows')}
					</div>
				</div>
				<button type="button" class="btn-icon" aria-label={$_('common.close')} onclick={close}>
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
			<div class="modal-body">
				{#if segments.length > 1}
					<label class="modal-field">
						<span class="settings-label">{$_('busIbn.importTargetSegment')}</span>
						<select class="settings-select" bind:value={state.targetSegId}>
							{#each segments as s (s.id)}
								<option value={s.id}>{s.name}</option>
							{/each}
						</select>
					</label>
				{/if}
				<div class="import-preview-wrap">
					<table class="import-table">
						<thead>
							<tr>
								<th>{$_('busIbn.importColMac')}</th>
								<th>{$_('busIbn.importColName')}</th>
								<th>{$_('busIbn.importColType')}</th>
								<th>{$_('busIbn.importColMfr')}</th>
								<th>{$_('busIbn.importColModel')}</th>
								<th>{$_('busIbn.importColGroup')}</th>
								<th>{$_('busIbn.importColStatus')}</th>
							</tr>
						</thead>
						<tbody>
							{#each state.rows as row, i (i)}
								<tr class:import-row-invalid={!row.valid}>
									<td class="import-mac">{row.mac}</td>
									<td>{row.name || '—'}</td>
									<td>{row.deviceType || '—'}</td>
									<td>{row.manufacturer || '—'}</td>
									<td>{row.model || '—'}</td>
									<td>{row.group || '—'}</td>
									<td>
										<span class="status-pill" style="--sc:{STATUS_COLORS[row.status]};">
											<i class="status-dot"></i>{statusLabel(row.status)}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-foot">
				<span class="modal-foot-info">
					{state.rows.filter((r) => r.valid).length} von {state.rows.length} Zeilen werden importiert
				</span>
				<button type="button" class="btn-cancel" onclick={close}>{$_('common.cancel')}</button>
				<button type="button" class="btn-confirm" onclick={onConfirm}>
					{$_('busIbn.importConfirm')} ({state.rows.filter((r) => r.valid).length})
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.modal {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		max-width: 900px;
		width: 100%;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.modal-head {
		display: flex;
		align-items: start;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--border);
	}
	.modal-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}
	.modal-sub {
		font-size: 0.8125rem;
		color: var(--muted);
		margin-top: 0.125rem;
	}
	.modal-body {
		flex: 1;
		overflow: auto;
		padding: 1rem 1.25rem;
	}
	.modal-field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		margin-bottom: 1rem;
	}
	.modal-foot {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.25rem;
		border-top: 1px solid var(--border);
		background: var(--bg);
	}
	.modal-foot-info {
		flex: 1;
		font-size: 0.8125rem;
		color: var(--muted);
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
	.btn-cancel,
	.btn-confirm {
		font-family: inherit;
		font-size: 0.8125rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		cursor: pointer;
	}
	.btn-cancel {
		background: var(--card);
		color: var(--text);
	}
	.btn-confirm {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
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
	.import-preview-wrap {
		max-height: 50vh;
		overflow: auto;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}
	.import-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}
	.import-table th {
		text-align: left;
		padding: 0.5rem 0.625rem;
		background: var(--bg);
		border-bottom: 1px solid var(--border);
		font-weight: 600;
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		position: sticky;
		top: 0;
	}
	.import-table td {
		padding: 0.4rem 0.625rem;
		border-top: 1px solid var(--border);
		color: var(--text);
	}
	.import-table tr:first-child td {
		border-top: none;
	}
	.import-row-invalid {
		opacity: 0.4;
		background: color-mix(in srgb, #dc2626 5%, transparent);
	}
	.import-mac {
		font-family: ui-monospace, monospace;
		font-weight: 600;
	}
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.7rem;
		padding: 0.15rem 0.45rem;
		border-radius: 999px;
		border: 1px solid var(--sc);
		color: var(--sc);
	}
	.status-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--sc);
	}
</style>
