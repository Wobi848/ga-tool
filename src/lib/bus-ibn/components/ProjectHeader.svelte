<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusProject } from '../types';

	interface Props {
		project: BusProject;
		formatDate: (ts: number) => string;
	}

	let { project = $bindable(), formatDate }: Props = $props();
</script>

<div class="project-header">
	<div class="project-fields">
		<label class="project-field">
			<span class="project-label">{$_('busIbn.projectName')}</span>
			<input
				class="project-input"
				type="text"
				bind:value={project.name}
				placeholder={$_('busIbn.projectNamePlaceholder')}
			/>
		</label>
		<label class="project-field">
			<span class="project-label">{$_('busIbn.site')}</span>
			<input
				class="project-input"
				type="text"
				bind:value={project.site}
				placeholder={$_('busIbn.sitePlaceholder')}
			/>
		</label>
		<label class="project-field">
			<span class="project-label">{$_('busIbn.engineer')}</span>
			<input
				class="project-input"
				type="text"
				bind:value={project.engineer}
				placeholder={$_('busIbn.engineerPlaceholder')}
			/>
		</label>
		<label class="project-field">
			<span class="project-label">{$_('busIbn.version')}</span>
			<input
				class="project-input"
				type="text"
				bind:value={project.version}
				placeholder="1.0"
				style="width:70px"
			/>
		</label>
		<div class="project-field">
			<span class="project-label">{$_('busIbn.date')}</span>
			<span class="project-date">{formatDate(project.createdAt)}</span>
		</div>
	</div>
</div>

<style>
	.project-header {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.875rem 1rem;
		margin-bottom: 1.25rem;
	}
	.project-fields {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: 1rem;
	}
	.project-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}
	.project-label {
		font-size: 0.6875rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}
	.project-input {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.5rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
	}
	.project-input:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: -1px;
		border-color: transparent;
	}
	.project-date {
		font-size: 0.875rem;
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}
</style>
