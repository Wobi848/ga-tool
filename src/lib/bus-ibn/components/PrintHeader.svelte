<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BusProject } from '../types';

	interface Props {
		project: BusProject;
		formatDate: (ts: number) => string;
	}

	let { project, formatDate }: Props = $props();
</script>

<div class="print-only print-header">
	<div class="print-title">{project.name}</div>
	<div class="print-meta">
		<span>{$_('busIbn.site')}: {project.site || '—'}</span>
		<span>{$_('busIbn.engineer')}: {project.engineer || '—'}</span>
		<span>{$_('busIbn.version')}: {project.version}</span>
		<span>{$_('busIbn.date')}: {formatDate(project.createdAt)}</span>
	</div>
	<div class="print-subtitle">{$_('busIbn.printTitle')}</div>
</div>

<style>
	.print-only {
		display: none;
	}
	@media print {
		.print-only {
			display: block;
		}
		.print-header {
			margin-bottom: 12pt;
			padding-bottom: 8pt;
			border-bottom: 2pt solid #000;
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 4pt;
		}
		.print-title {
			font-size: 16pt;
			font-weight: 700;
			grid-column: 1 / -1;
		}
		.print-meta {
			grid-column: 1 / -1;
			display: flex;
			gap: 16pt;
			font-size: 9pt;
			color: #444;
		}
		.print-subtitle {
			grid-column: 1 / -1;
			font-size: 10pt;
			color: #666;
		}
	}
</style>
