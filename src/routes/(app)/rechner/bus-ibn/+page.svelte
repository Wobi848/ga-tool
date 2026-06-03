<script lang="ts">
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import FavButton from '$lib/components/FavButton.svelte';
	import type {
		BusType,
		DeviceStatus,
		GroupBy,
		SortKey,
		SortDir,
		BusDevice,
		BusSegment,
		BusProject,
		LibraryItem,
		ImportRow,
		ImportState
	} from '$lib/bus-ibn/types';
	import PrintHeader from '$lib/bus-ibn/components/PrintHeader.svelte';
	import ProjectHeader from '$lib/bus-ibn/components/ProjectHeader.svelte';
	import ImportModal from '$lib/bus-ibn/components/ImportModal.svelte';
	import LibraryDrawer from '$lib/bus-ibn/components/LibraryDrawer.svelte';
	import AddSegmentPanel from '$lib/bus-ibn/components/AddSegmentPanel.svelte';
	import SegmentSettings from '$lib/bus-ibn/components/SegmentSettings.svelte';
	import {
		STORAGE_KEY,
		PREFS_KEY,
		BUS_LABELS,
		BUS_COLORS,
		ADDR_RANGE,
		STATUS_LABEL_KEYS,
		STATUS_COLORS,
		STATUS_ORDER
	} from '$lib/bus-ibn/constants';
	import {
		isBacnet,
		defaultSettings,
		normalizeProject,
		newProject,
		nextFreeAddress,
		newDevice,
		effectiveDI,
		diIsAuto,
		schemaDIPreview,
		dupAddressesInSegment,
		dupDeviceInstances as computeDupDIs,
		hasAnyConflicts
	} from '$lib/bus-ibn/logic';
	import { DEVICE_LIBRARY_RAW } from '$lib/bus-ibn/library';
	import { randomUUID } from '$lib/uuid';

	function statusLabel(s: DeviceStatus): string {
		return $_(STATUS_LABEL_KEYS[s]);
	}

	const DEVICE_LIBRARY = $derived(
		DEVICE_LIBRARY_RAW.map((d) => ({
			...d,
			cat: $_(d.catKey),
			desc: $_(d.descKey)
		})) as LibraryItem[]
	);

	// ── Local UI helpers ──────────────────────────────────────────────────────

	function intOnly(e: KeyboardEvent) {
		if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
	}

	function formatDate(ts: number): string {
		return new Date(ts).toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function loadProject(): BusProject {
		if (!browser) return newProject();
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return normalizeProject(JSON.parse(raw));
		} catch {
			/* ignore */
		}
		return newProject();
	}

	function loadPrefs(): { showAddressMap: boolean; groupBy: GroupBy } {
		if (!browser) return { showAddressMap: true, groupBy: 'none' };
		try {
			const raw = localStorage.getItem(PREFS_KEY);
			if (raw) {
				const p = JSON.parse(raw);
				return {
					showAddressMap: p.showAddressMap ?? true,
					groupBy: p.groupBy ?? 'none'
				};
			}
		} catch {
			/* ignore */
		}
		return { showAddressMap: true, groupBy: 'none' };
	}

	// ── State ─────────────────────────────────────────────────────────────────

	let project = $state<BusProject>(loadProject());
	let showAddSegment = $state(false);
	let addSegType = $state<BusType>('bacnet-mstp');

	let sortState = $state<Record<string, { key: SortKey; dir: SortDir }>>({});

	// Selection per segment: segId → array of devIds
	let selDevices = $state<Record<string, string[]>>({});
	// Library
	let libraryOpen = $state(false);
	let libraryQuery = $state('');
	let libraryTargetSegId = $state<string | null>(null);
	let libraryFilterBus = $state<BusType | 'analog' | 'all'>('all');
	// Display options — restored from prefs
	const _prefs = loadPrefs();
	let showAddressMap = $state(_prefs.showAddressMap);
	let groupBy = $state<GroupBy>(_prefs.groupBy);

	// ── Persistence ───────────────────────────────────────────────────────────

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
	});

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(PREFS_KEY, JSON.stringify({ showAddressMap, groupBy }));
	});

	// Keep bulkState in sync with segments
	// Initialer Snapshot beim Component-Mount — Aenderungen werden via $effect unten getrackt
	const initBulk: Record<string, BulkState> = {};
	// svelte-ignore state_referenced_locally
	for (const seg of project.segments) initBulk[seg.id] = defaultBulkState();
	let bulkState = $state<Record<string, BulkState>>(initBulk);
	$effect(() => {
		for (const seg of project.segments) {
			if (!(seg.id in bulkState)) bulkState[seg.id] = defaultBulkState();
		}
	});

	// ── Sort ─────────────────────────────────────────────────────────────────

	function getSort(segId: string) {
		return sortState[segId] ?? { key: null, dir: 'asc' };
	}
	function toggleSort(segId: string, key: SortKey) {
		const cur = getSort(segId);
		sortState[segId] = { key, dir: cur.key === key && cur.dir === 'asc' ? 'desc' : 'asc' };
	}
	function sortIcon(segId: string, key: SortKey): string {
		const s = getSort(segId);
		if (s.key !== key) return '↕';
		return s.dir === 'asc' ? '↑' : '↓';
	}
	function sortedDevices(seg: BusSegment): BusDevice[] {
		const { key, dir } = getSort(seg.id);
		if (!key) return seg.devices;
		return [...seg.devices].sort((a, b) => {
			let av: number | string, bv: number | string;
			if (key === 'address') {
				av = a.address;
				bv = b.address;
			} else if (key === 'deviceInstance') {
				av = effectiveDI(seg, a);
				bv = effectiveDI(seg, b);
			} else {
				av = a.name.toLowerCase();
				bv = b.name.toLowerCase();
			}
			const cmp = av < bv ? -1 : av > bv ? 1 : 0;
			return dir === 'asc' ? cmp : -cmp;
		});
	}

	// ── Grouping ──────────────────────────────────────────────────────────────

	function getGroups(seg: BusSegment): { key: string | null; devices: BusDevice[] }[] {
		const sorted = sortedDevices(seg);
		if (groupBy === 'none') return [{ key: null, devices: sorted }];
		// Lokales Map, Ergebnis wird zu Array konvertiert — keine Reaktivitaet noetig
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const map = new Map<string, BusDevice[]>();
		for (const dev of sorted) {
			const k =
				(groupBy === 'group'
					? dev.group
					: groupBy === 'deviceType'
						? dev.deviceType
						: dev.manufacturer) || '— Ohne Gruppe';
			if (!map.has(k)) map.set(k, []);
			map.get(k)!.push(dev);
		}
		return Array.from(map, ([key, devices]) => ({ key, devices }));
	}

	// ── Selection ─────────────────────────────────────────────────────────────

	function isSelected(segId: string, devId: string): boolean {
		return (selDevices[segId] ?? []).includes(devId);
	}
	function toggleSel(segId: string, devId: string) {
		const cur = selDevices[segId] ?? [];
		selDevices[segId] = cur.includes(devId) ? cur.filter((id) => id !== devId) : [...cur, devId];
	}
	function getSelCount(segId: string): number {
		return (selDevices[segId] ?? []).length;
	}
	function clearSel(segId: string) {
		selDevices[segId] = [];
	}
	function selectAll(seg: BusSegment) {
		selDevices[seg.id] = seg.devices.map((d) => d.id);
	}
	function isAllSelected(seg: BusSegment): boolean {
		const sel = selDevices[seg.id] ?? [];
		return seg.devices.length > 0 && sel.length === seg.devices.length;
	}
	function fillDown(
		seg: BusSegment,
		key: keyof Pick<BusDevice, 'manufacturer' | 'model' | 'group' | 'deviceType'>
	) {
		const ids = selDevices[seg.id] ?? [];
		if (ids.length < 2) return;
		const first = sortedDevices(seg).find((d) => ids.includes(d.id));
		if (!first) return;
		const val = first[key];
		for (const dev of seg.devices) {
			if (ids.includes(dev.id) && dev.id !== first.id) dev[key] = val;
		}
	}
	function bulkDeleteSelected(seg: BusSegment) {
		const ids = selDevices[seg.id] ?? [];
		seg.devices = seg.devices.filter((d) => !ids.includes(d.id));
		selDevices[seg.id] = [];
	}

	// ── Conflict detection (reactive derived from extracted logic) ────────────

	const dupDeviceInstances = $derived(computeDupDIs(project.segments));
	const hasConflicts = $derived(hasAnyConflicts(project));

	// ── Segment actions ───────────────────────────────────────────────────────

	function addSegment() {
		const idx = project.segments.length + 1;
		project.segments.push({
			id: randomUUID(),
			name: `${BUS_LABELS[addSegType]} Segment ${idx}`,
			description: '',
			type: addSegType,
			settings: defaultSettings(addSegType),
			devices: [],
			settingsOpen: true,
			diOffset: isBacnet(addSegType) ? idx * 100000 : 0,
			diAuto: true,
			startAddress: ADDR_RANGE[addSegType].min,
			diSchema: false,
			diSS: 10,
			diBB: 1
		});
		showAddSegment = false;
	}
	function removeSegment(segId: string) {
		project.segments = project.segments.filter((s) => s.id !== segId);
	}

	// ── Device actions ────────────────────────────────────────────────────────

	function addDevice(seg: BusSegment) {
		seg.devices.push(newDevice(seg));
	}
	function removeDevice(seg: BusSegment, devId: string) {
		seg.devices = seg.devices.filter((d) => d.id !== devId);
	}

	function duplicateDevice(seg: BusSegment, devId: string) {
		const src = seg.devices.find((d) => d.id === devId);
		if (!src) return;
		const addr = nextFreeAddress(seg);
		seg.devices.push({
			...src,
			id: randomUUID(),
			address: addr,
			macLocked: false,
			deviceInstance: seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0,
			diLocked: false,
			status: 'planned',
			notes: ''
		});
	}

	function macAdj(seg: BusSegment, dev: BusDevice, delta: number) {
		const range = ADDR_RANGE[seg.type];
		dev.address = Math.max(range.min, Math.min(range.max, dev.address + delta));
	}

	function cycleStatus(dev: BusDevice) {
		const idx = STATUS_ORDER.indexOf(dev.status ?? 'planned');
		dev.status = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
	}

	// ── Library ───────────────────────────────────────────────────────────────

	const filteredLibrary = $derived.by(() => {
		const q = libraryQuery.toLowerCase();
		let items = DEVICE_LIBRARY;
		if (libraryFilterBus !== 'all') items = items.filter((d) => d.busType === libraryFilterBus);
		if (q)
			items = items.filter((d) =>
				`${d.vendor} ${d.model} ${d.type} ${d.cat}`.toLowerCase().includes(q)
			);
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const map = new Map<string, LibraryItem[]>();
		for (const item of items) {
			if (!map.has(item.cat)) map.set(item.cat, []);
			map.get(item.cat)!.push(item);
		}
		return Array.from(map, ([cat, items]) => ({ cat, items }));
	});

	function addFromLibrary(item: LibraryItem) {
		const targetId = libraryTargetSegId ?? project.segments[0]?.id;
		if (!targetId) return;
		const seg = project.segments.find((s) => s.id === targetId);
		if (!seg) return;
		const addr = nextFreeAddress(seg);
		seg.devices.push({
			id: randomUUID(),
			name: '',
			deviceType: item.type,
			manufacturer: item.vendor,
			model: item.model,
			address: addr,
			macLocked: false,
			deviceInstance: seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0,
			diLocked: false,
			status: 'planned',
			group: '',
			notes: ''
		});
	}

	function openLibraryFor(segId: string) {
		libraryTargetSegId = segId;
		const seg = project.segments.find((s) => s.id === segId);
		libraryFilterBus = seg ? (seg.type as BusType) : 'all';
		libraryOpen = true;
	}

	// ── Import / Export ──────────────────────────────────────────────────────

	function downloadFile(filename: string, content: string, mime: string) {
		const blob = new Blob(['﻿' + content], { type: mime }); // BOM for Excel UTF-8
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function csvQ(s: string | number): string {
		const str = String(s ?? '');
		return str.includes(',') || str.includes('"') || str.includes('\n')
			? '"' + str.replace(/"/g, '""') + '"'
			: str;
	}

	function exportAllCSV() {
		const hdr = get(_)('busIbn.csvHeaderAll');
		const lines = [hdr];
		for (const seg of project.segments) {
			for (const dev of sortedDevices(seg)) {
				lines.push(
					[
						csvQ(seg.name),
						csvQ(BUS_LABELS[seg.type]),
						dev.address,
						csvQ(dev.name),
						csvQ(dev.deviceType),
						csvQ(dev.manufacturer),
						csvQ(dev.model),
						csvQ(dev.group),
						isBacnet(seg.type) ? effectiveDI(seg, dev) : '',
						dev.status ?? 'planned',
						csvQ(dev.notes)
					].join(';')
				);
			}
		}
		downloadFile(
			`${project.name.replace(/[^\w]/g, '_')}_bus-ibn.csv`,
			lines.join('\r\n'),
			'text/csv;charset=utf-8'
		);
	}

	function exportSegmentCSV(seg: BusSegment) {
		const hdr = get(_)('busIbn.csvHeaderSeg');
		const lines = [hdr];
		for (const dev of sortedDevices(seg)) {
			lines.push(
				[
					dev.address,
					csvQ(dev.name),
					csvQ(dev.deviceType),
					csvQ(dev.manufacturer),
					csvQ(dev.model),
					csvQ(dev.group),
					isBacnet(seg.type) ? effectiveDI(seg, dev) : '',
					dev.status ?? 'planned',
					csvQ(dev.notes)
				].join(';')
			);
		}
		downloadFile(
			`${seg.name.replace(/[^\w]/g, '_')}.csv`,
			lines.join('\r\n'),
			'text/csv;charset=utf-8'
		);
	}

	function exportJSON() {
		downloadFile(
			`${project.name.replace(/[^\w]/g, '_')}_bus-ibn.json`,
			JSON.stringify(project, null, 2),
			'application/json'
		);
	}

	// CSV import (Types in $lib/bus-ibn/types)
	let importState = $state<ImportState>({
		open: false,
		targetSegId: '',
		rows: [],
		filename: '',
		error: ''
	});

	function parseLine(line: string, sep: string): string[] {
		const result: string[] = [];
		let cur = '',
			inQ = false;
		for (const ch of line) {
			if (ch === '"') inQ = !inQ;
			else if (ch === sep && !inQ) {
				result.push(cur.trim());
				cur = '';
			} else cur += ch;
		}
		result.push(cur.trim());
		return result;
	}

	function handleCSVFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			try {
				const text = (ev.target!.result as string).replace(/^\uFEFF/, ''); // strip BOM
				const lines = text.split(/\r?\n/).filter((l) => l.trim());
				if (lines.length < 2) {
					importState.error = get(_)('busIbn.importFileEmpty');
					return;
				}
				// detect separator: ; or ,
				const sep = lines[0].includes(';') ? ';' : ',';
				const hdr = parseLine(lines[0], sep).map((h) => h.toLowerCase().replace(/[^a-z]/g, ''));
				const col = (terms: string[]) => hdr.findIndex((h) => terms.some((t) => h.includes(t)));
				const macIdx = col(['mac', 'adresse', 'adress', 'slaveid', 'id', 'address']);
				if (macIdx < 0) {
					importState.error = get(_)('busIbn.noMacColumn');
					return;
				}
				const nameIdx = col(['name', 'gert', 'device']);
				const typeIdx = col(['typ', 'type']);
				const mfrIdx = col(['hersteller', 'vendor', 'manuf']);
				const modelIdx = col(['modell', 'model']);
				const groupIdx = col(['gruppe', 'group', 'bereich', 'area']);
				const diIdx = col(['instance', 'di']);
				const statIdx = col(['status']);
				const noteIdx = col(['notiz', 'note']);
				const rows: ImportRow[] = [];
				for (let i = 1; i < lines.length; i++) {
					const c = parseLine(lines[i], sep);
					const mac = parseInt(c[macIdx] ?? '', 10);
					if (isNaN(mac)) continue;
					const raw = (c[statIdx] ?? '').toLowerCase().trim();
					const status = (
						['planned', 'configured', 'online', 'error'].includes(raw) ? raw : 'planned'
					) as DeviceStatus;
					rows.push({
						mac,
						name: c[nameIdx] ?? '',
						deviceType: c[typeIdx] ?? '',
						manufacturer: c[mfrIdx] ?? '',
						model: c[modelIdx] ?? '',
						group: c[groupIdx] ?? '',
						deviceInstance: parseInt(c[diIdx] ?? '', 10) || 0,
						status,
						notes: c[noteIdx] ?? '',
						valid: mac >= 0 && mac <= 255
					});
				}
				if (!rows.length) {
					importState.error = get(_)('busIbn.noValidRows');
					return;
				}
				importState.rows = rows;
				importState.filename = file.name;
				importState.error = '';
				if (!importState.targetSegId) importState.targetSegId = project.segments[0]?.id ?? '';
				importState.open = true;
			} catch {
				importState.error = 'Fehler beim Lesen.';
			}
		};
		reader.readAsText(file, 'UTF-8');
		(e.target as HTMLInputElement).value = '';
	}

	function confirmImport() {
		const seg = project.segments.find((s) => s.id === importState.targetSegId);
		if (!seg) return;
		for (const row of importState.rows.filter((r) => r.valid)) {
			const existing = seg.devices.find((d) => d.address === row.mac);
			if (existing) {
				if (row.name) existing.name = row.name;
				if (row.deviceType) existing.deviceType = row.deviceType;
				if (row.manufacturer) existing.manufacturer = row.manufacturer;
				if (row.model) existing.model = row.model;
				if (row.group) existing.group = row.group;
				if (row.notes) existing.notes = row.notes;
				existing.status = row.status;
			} else {
				const di = seg.diAuto && isBacnet(seg.type) ? seg.diOffset + row.mac : row.deviceInstance;
				seg.devices.push({
					id: randomUUID(),
					name: row.name,
					deviceType: row.deviceType,
					manufacturer: row.manufacturer,
					model: row.model,
					address: row.mac,
					macLocked: false,
					deviceInstance: di,
					diLocked: row.deviceInstance > 0 && !seg.diAuto,
					status: row.status,
					group: row.group,
					notes: row.notes
				});
			}
		}
		importState.open = false;
	}

	function handleJSONFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			try {
				project = normalizeProject(JSON.parse(ev.target!.result as string));
			} catch {
				alert(get(_)('busIbn.invalidJson'));
			}
		};
		reader.readAsText(file, 'UTF-8');
		(e.target as HTMLInputElement).value = '';
	}

	// ── Bulk add ──────────────────────────────────────────────────────────────

	interface BulkState {
		open: boolean;
		count: number;
		startAddr: number;
		prefix: string;
		startNum: number;
		padWidth: number;
		deviceType: string;
		manufacturer: string;
		model: string;
	}
	function defaultBulkState(): BulkState {
		return {
			open: false,
			count: 5,
			startAddr: 1,
			prefix: '',
			startNum: 1,
			padWidth: 2,
			deviceType: '',
			manufacturer: '',
			model: ''
		};
	}
	function getBulk(segId: string): BulkState {
		return bulkState[segId] ?? defaultBulkState();
	}
	function openBulk(seg: BusSegment) {
		if (!bulkState[seg.id]) bulkState[seg.id] = defaultBulkState();
		bulkState[seg.id].startAddr = nextFreeAddress(seg);
		bulkState[seg.id].open = true;
	}
	function bulkPreview(
		seg: BusSegment
	): { addr: number; name: string; di: number; conflict: boolean }[] {
		const b = getBulk(seg.id);
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const used = new Set(seg.devices.map((d) => d.address));
		const range = ADDR_RANGE[seg.type];
		const preview: { addr: number; name: string; di: number; conflict: boolean }[] = [];
		let addr = Math.max(b.startAddr, range.min);
		for (let i = 0; i < b.count; i++) {
			while (used.has(addr) && addr <= range.max) addr++;
			if (addr > range.max) break;
			const num = b.startNum + i;
			const suffix = b.padWidth > 0 ? String(num).padStart(b.padWidth, '0') : String(num);
			const name = b.prefix ? `${b.prefix} ${suffix}` : '';
			const di = seg.diAuto && isBacnet(seg.type) ? seg.diOffset + addr : 0;
			preview.push({ addr, name, di, conflict: false });
			used.add(addr);
			addr++;
		}
		const existingDIs = new Set(
			project.segments.flatMap((s) =>
				isBacnet(s.type) ? s.devices.map((d) => effectiveDI(s, d)) : []
			)
		);
		for (const p of preview) {
			if (p.di > 0 && existingDIs.has(p.di)) p.conflict = true;
		}
		return preview;
	}
	function confirmBulk(seg: BusSegment) {
		const b = bulkState[seg.id];
		if (!b) return;
		for (const p of bulkPreview(seg)) {
			seg.devices.push({
				id: randomUUID(),
				name: p.name,
				deviceType: b.deviceType,
				manufacturer: b.manufacturer,
				model: b.model,
				address: p.addr,
				macLocked: false,
				deviceInstance: p.di,
				diLocked: false,
				status: 'planned',
				group: '',
				notes: ''
			});
		}
		b.open = false;
	}

	function printNow() {
		window.print();
	}

	function colCount(seg: BusSegment): number {
		return isBacnet(seg.type) ? 11 : 10;
	}
</script>

<PrintHeader {project} {formatDate} />

<!-- ── Page ──────────────────────────────────────────────────────────────── -->
<div class="page">
	<a href="/rechner" class="calc-back no-print">
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg
		>
		{$_('common.allCalculators')}
	</a>

	<div class="calc-title-row no-print">
		<h1 class="page-title">{$_('busIbn.title')}</h1>
		<FavButton type="rechner" slug="bus-ibn" title={$_('busIbn.title')} size={20} />
	</div>
	<p class="page-sub no-print">{$_('busIbn.subtitle')}</p>

	<!-- ── Toolbar ── -->
	<div class="toolbar no-print">
		<button
			type="button"
			class="toolbar-btn"
			onclick={() => {
				libraryTargetSegId = project.segments[0]?.id ?? null;
				libraryFilterBus = 'all';
				libraryOpen = true;
			}}
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><rect x="2" y="3" width="7" height="18" rx="1" /><rect
					x="9"
					y="3"
					width="7"
					height="18"
					rx="1"
				/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
			>
			{$_('busIbn.libraryTitle')}
		</button>
		<div class="toolbar-sep"></div>
		<label class="toolbar-toggle">
			<input type="checkbox" bind:checked={showAddressMap} />
			{$_('busIbn.addrMapTitle').split('·')[0].trim()}
		</label>
		<div class="toolbar-sep"></div>
		<span class="toolbar-label">{$_('busIbn.groupBy')}</span>
		<select class="toolbar-select" bind:value={groupBy}>
			<option value="none">{$_('busIbn.groupNone')}</option>
			<option value="group">{$_('busIbn.groupArea')}</option>
			<option value="deviceType">{$_('busIbn.groupDeviceType')}</option>
			<option value="manufacturer">{$_('busIbn.groupManufacturer')}</option>
		</select>
		<div style="flex:1"></div>
		<!-- Import -->
		<label class="toolbar-btn" title={$_('busIbn.importCsv')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
				/></svg
			>
			CSV
			<input type="file" accept=".csv,.txt" onchange={handleCSVFile} style="display:none" />
		</label>
		<label class="toolbar-btn" title={$_('busIbn.importJson')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
				/></svg
			>
			JSON
			<input type="file" accept=".json" onchange={handleJSONFile} style="display:none" />
		</label>
		<div class="toolbar-sep"></div>
		<!-- Export -->
		<button type="button" class="toolbar-btn" onclick={exportAllCSV} title={$_('busIbn.exportCsv')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
				/></svg
			>
			CSV
		</button>
		<button type="button" class="toolbar-btn" onclick={exportJSON} title={$_('busIbn.exportJson')}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
					d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
				/></svg
			>
			JSON
		</button>
		<div class="toolbar-sep"></div>
		<button type="button" class="btn-print" onclick={printNow}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><polyline points="6 9 6 2 18 2 18 9" /><path
					d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
				/><rect x="6" y="14" width="12" height="8" /></svg
			>
			Print
		</button>
	</div>

	<ProjectHeader bind:project {formatDate} />

	<!-- ── Segments ── -->
	{#each project.segments as seg (seg.id)}
		{@const dupAddr = dupAddressesInSegment(seg)}
		{@const selCount = getSelCount(seg.id)}
		<div class="segment">
			<!-- Segment header -->
			<div class="seg-header">
				<span
					class="type-badge"
					style="background:{BUS_COLORS[seg.type]}22;color:{BUS_COLORS[
						seg.type
					]};border-color:{BUS_COLORS[seg.type]}44"
				>
					{BUS_LABELS[seg.type]}
				</span>
				<input
					class="seg-name-input"
					type="text"
					bind:value={seg.name}
					placeholder={$_('busIbn.segmentNamePlaceholder')}
				/>
				<span class="seg-head-sep">·</span>
				<input
					class="seg-desc-input"
					type="text"
					bind:value={seg.description}
					placeholder={$_('busIbn.segmentDescPlaceholder')}
				/>
				<div class="seg-header-actions no-print">
					<button
						type="button"
						class="btn-icon"
						title={$_('busIbn.exportSegmentCsv')}
						onclick={() => exportSegmentCSV(seg)}
					>
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path
								d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.11"
							/></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon"
						title={$_('busIbn.addFromLibrary')}
						onclick={() => openLibraryFor(seg.id)}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><rect x="2" y="3" width="7" height="18" rx="1" /><rect
								x="9"
								y="3"
								width="7"
								height="18"
								rx="1"
							/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon"
						onclick={() => (seg.settingsOpen = !seg.settingsOpen)}
						title={$_('busIbn.segmentSettings')}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><circle cx="12" cy="12" r="3" /><path
								d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
							/></svg
						>
					</button>
					<button
						type="button"
						class="btn-icon btn-icon--danger"
						onclick={() => removeSegment(seg.id)}
						title={$_('busIbn.deleteSegment')}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="3 6 5 6 21 6" /><path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
							/></svg
						>
					</button>
				</div>
			</div>

			<SegmentSettings bind:seg={project.segments[project.segments.indexOf(seg)]} />

			<!-- Address config bar -->
			<div class="di-config no-print">
				<div class="di-offset-wrap">
					<span class="di-offset-label">{$_('busIbn.startAddress')}</span>
					<input
						class="di-offset-input"
						type="number"
						min={ADDR_RANGE[seg.type].min}
						max={ADDR_RANGE[seg.type].max}
						bind:value={seg.startAddress}
						title={$_('busIbn.startAddressHint')}
						onkeydown={intOnly}
					/>
					<span class="di-offset-hint" style="color:var(--muted)"
						>{$_('busIbn.nextFreeHint', { values: { addr: seg.startAddress } })}</span
					>
				</div>
				{#if isBacnet(seg.type)}
					<div class="di-sep"></div>
					<label class="di-label">
						<input type="checkbox" bind:checked={seg.diAuto} />
						Device Instance auto
					</label>
					{#if seg.diAuto}
						<label class="di-label">
							<input type="checkbox" bind:checked={seg.diSchema} />
							Schema SS·BB·MMM
						</label>
						{#if seg.diSchema}
							<div class="di-offset-wrap">
								<span class="di-offset-label">SS</span>
								<input
									class="di-offset-input di-schema-input"
									type="number"
									min="0"
									max="99"
									bind:value={seg.diSS}
									onkeydown={intOnly}
								/>
								<span class="di-offset-label">BB</span>
								<input
									class="di-offset-input di-schema-input"
									type="number"
									min="0"
									max="99"
									bind:value={seg.diBB}
									onkeydown={intOnly}
								/>
								<span class="di-offset-hint"
									>→ {schemaDIPreview(seg, 1)} … {schemaDIPreview(seg, 127)}</span
								>
							</div>
						{:else}
							<div class="di-offset-wrap">
								<span class="di-offset-label">{$_('busIbn.diOffset')}</span>
								<input
									class="di-offset-input"
									type="number"
									min="0"
									max="4000000"
									step="100000"
									bind:value={seg.diOffset}
									onkeydown={intOnly}
								/>
								<span class="di-offset-hint">→ DI = {seg.diOffset} + MAC</span>
							</div>
						{/if}
					{/if}
				{/if}
			</div>

			<!-- Address hint -->
			<div class="addr-hint no-print">
				{#if seg.type === 'bacnet-mstp'}{$_('busIbn.addrHintMstp')}
				{:else if seg.type === 'bacnet-ip'}{$_('busIbn.addrHintIp')}
				{:else if seg.type === 'modbus-rtu'}{$_('busIbn.addrHintModbus')}
				{:else if seg.type === 'knx'}{$_('busIbn.addrHintKnx')}
				{/if}
			</div>

			<!-- Address Map (BACnet MSTP only) -->
			{#if seg.type === 'bacnet-mstp' && showAddressMap}
				{@const usedMacs = new Set(seg.devices.map((d) => d.address))}
				{@const freeCount = 127 - seg.devices.length}
				<div class="addr-map no-print">
					<div class="addr-map-head">
						<span class="addr-map-title">{$_('busIbn.addrMapTitle')}</span>
						<div class="addr-map-legend">
							<span class="legend-item"
								><i class="legend-dot ld-free"></i>{$_('busIbn.legendFree')}
								<b>{freeCount}</b></span
							>
							<span class="legend-item"
								><i class="legend-dot ld-used"></i>{$_('busIbn.legendUsed')}
								<b>{seg.devices.length}</b></span
							>
							<span class="legend-item"
								><i class="legend-dot ld-gateway"></i>{$_('busIbn.legendGateway')}</span
							>
							{#if dupAddr.size > 0}
								<span class="legend-item" style="color:#dc2626"
									><i class="legend-dot ld-conflict"></i>{$_('busIbn.legendConflict')}
									<b>{Math.ceil(dupAddr.size / 2)}</b></span
								>
							{/if}
						</div>
					</div>
					<div class="addr-grid">
						{#each Array.from({ length: 128 }, (_, i) => i) as mac, _mac_i (_mac_i)}
							{@const isGateway = mac === 0}
							{@const isConflict = dupAddr.has(mac)}
							{@const isUsed = usedMacs.has(mac)}
							{@const devAtMac = seg.devices.find((d) => d.address === mac)}
							<div
								class="amap-cell"
								class:amap-gateway={isGateway}
								class:amap-conflict={isConflict}
								class:amap-used={isUsed && !isConflict && !isGateway}
								class:amap-free={!isUsed && !isGateway}
								title={isGateway
									? `MAC ${mac} · Gateway/Router (reserviert)`
									: isConflict
										? `MAC ${mac} · Adresskonflikt!`
										: devAtMac
											? `MAC ${mac} · ${devAtMac.name || '—'}`
											: `MAC ${mac} · frei`}
							>
								{mac}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Bulk selection bar -->
			{#if selCount > 0}
				<div class="bulk-bar no-print">
					<span class="bulk-bar-count"
						>{$_('busIbn.selectionCount').replace('{n}', String(selCount))}</span
					>
					<span class="bulk-bar-sep"></span>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'manufacturer')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownMfr')}
					</button>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'model')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownModel')}
					</button>
					<button type="button" class="bulk-bar-btn" onclick={() => fillDown(seg, 'group')}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"><polyline points="6 9 12 15 18 9" /></svg
						>
						{$_('busIbn.fillDownGroup')}
					</button>
					<span style="flex:1"></span>
					<button
						type="button"
						class="bulk-bar-btn bulk-bar-del"
						onclick={() => bulkDeleteSelected(seg)}
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><polyline points="3 6 5 6 21 6" /><path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
							/></svg
						>
						{$_('busIbn.deleteSelected')}
					</button>
					<button type="button" class="bulk-bar-close" onclick={() => clearSel(seg.id)}>×</button>
				</div>
			{/if}

			<!-- Device table -->
			<div class="table-wrap">
				<table class="device-table">
					<thead>
						<tr>
							<th class="col-check no-print">
								<button
									type="button"
									class="row-check"
									class:row-check--on={isAllSelected(seg)}
									aria-label={$_('busIbn.selectAll', { default: 'Select all' })}
									aria-pressed={isAllSelected(seg)}
									onclick={() => (isAllSelected(seg) ? clearSel(seg.id) : selectAll(seg))}
								></button>
							</th>
							<th class="col-addr col-sortable" onclick={() => toggleSort(seg.id, 'address')}>
								{ADDR_RANGE[seg.type].label}
								<span class="sort-icon" class:sort-icon--active={getSort(seg.id).key === 'address'}
									>{sortIcon(seg.id, 'address')}</span
								>
							</th>
							<th class="col-name col-sortable" onclick={() => toggleSort(seg.id, 'name')}>
								{$_('busIbn.colName')}
								<span class="sort-icon" class:sort-icon--active={getSort(seg.id).key === 'name'}
									>{sortIcon(seg.id, 'name')}</span
								>
							</th>
							<th class="col-type">{$_('busIbn.colType')}</th>
							<th class="col-mfr">{$_('busIbn.colManufacturer')}</th>
							<th class="col-model">{$_('busIbn.colModel')}</th>
							<th class="col-group">{$_('busIbn.colGroup')}</th>
							{#if isBacnet(seg.type)}
								<th
									class="col-di col-sortable"
									onclick={() => toggleSort(seg.id, 'deviceInstance')}
								>
									{$_('busIbn.colDi')}
									<span
										class="sort-icon"
										class:sort-icon--active={getSort(seg.id).key === 'deviceInstance'}
										>{sortIcon(seg.id, 'deviceInstance')}</span
									>
								</th>
							{/if}
							<th class="col-status">{$_('busIbn.colStatus')}</th>
							<th class="col-notes">{$_('busIbn.colNotes')}</th>
							<th class="col-act no-print"></th>
						</tr>
					</thead>
					<tbody>
						{#each getGroups(seg) as grp, _grp_i (_grp_i)}
							{#if grp.key !== null}
								<tr class="group-row">
									<td colspan={colCount(seg)} class="group-cell">
										{grp.key}<span class="group-count">{grp.devices.length}</span>
									</td>
								</tr>
							{/if}
							{#each grp.devices as dev (dev.id)}
								{@const devStatus = dev.status ?? 'planned'}
								<tr class:row-selected={isSelected(seg.id, dev.id)}>
									<td class="col-check no-print">
										<button
											type="button"
											class="row-check"
											class:row-check--on={isSelected(seg.id, dev.id)}
											aria-label={$_('busIbn.selectRow', { default: 'Select row' })}
											aria-pressed={isSelected(seg.id, dev.id)}
											onclick={() => toggleSel(seg.id, dev.id)}
										></button>
									</td>
									<td class="col-addr">
										<div class="mac-cell">
											<input
												class="tbl-input tbl-input--addr"
												class:tbl-conflict={dupAddr.has(dev.address)}
												class:tbl-addr-locked={dev.macLocked}
												type="number"
												min={ADDR_RANGE[seg.type].min}
												max={ADDR_RANGE[seg.type].max}
												bind:value={dev.address}
												onkeydown={intOnly}
											/>
											<div class="mac-steppers no-print">
												<button
													type="button"
													class="mac-step"
													onclick={() => macAdj(seg, dev, 1)}
													title="+1">▲</button
												>
												<button
													type="button"
													class="mac-step"
													onclick={() => macAdj(seg, dev, -1)}
													title="-1">▼</button
												>
											</div>
											<button
												type="button"
												class="lock-btn"
												class:lock-btn--on={dev.macLocked}
												onclick={() => (dev.macLocked = !dev.macLocked)}
												title={dev.macLocked ? $_('busIbn.fixedAddress') : $_('busIbn.autoAddress')}
											>
												{#if dev.macLocked}
													<svg
														width="11"
														height="11"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2.5"
														><rect x="3" y="11" width="18" height="11" rx="2" /><path
															d="M7 11V7a5 5 0 0 1 10 0v4"
														/></svg
													>
												{:else}
													<svg
														width="11"
														height="11"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2.5"
														opacity="0.4"
														><rect x="3" y="11" width="18" height="11" rx="2" /><path
															d="M7 11V7a5 5 0 0 1 9.9-1"
														/></svg
													>
												{/if}
											</button>
										</div>
									</td>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.name}
											placeholder={$_('busIbn.namePlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.deviceType}
											placeholder={$_('busIbn.typePlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.manufacturer}
											placeholder={$_('busIbn.mfrPlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.model}
											placeholder={$_('busIbn.modelPlaceholder')}
										/></td
									>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.group}
											placeholder={$_('busIbn.groupPlaceholder')}
										/></td
									>
									{#if isBacnet(seg.type)}
										<td class="col-di">
											<div class="mac-cell">
												{#if diIsAuto(seg, dev)}
													<span
														class="tbl-di-auto"
														class:tbl-conflict={dupDeviceInstances.has(effectiveDI(seg, dev))}
														title={$_('busIbn.autoComputed')
															.replace('{offset}', String(seg.diOffset))
															.replace('{addr}', String(dev.address))
															.replace('{di}', String(effectiveDI(seg, dev)))}
													>
														{effectiveDI(seg, dev)}
													</span>
												{:else}
													<input
														class="tbl-input tbl-input--addr"
														class:tbl-conflict={dev.deviceInstance > 0 &&
															dupDeviceInstances.has(dev.deviceInstance)}
														type="number"
														min="0"
														max="4194302"
														bind:value={dev.deviceInstance}
														onkeydown={intOnly}
													/>
												{/if}
												<button
													type="button"
													class="lock-btn"
													class:lock-btn--on={dev.diLocked}
													onclick={() => {
														dev.diLocked = !dev.diLocked;
														if (!dev.diLocked) dev.deviceInstance = effectiveDI(seg, dev);
													}}
													title={dev.diLocked ? $_('busIbn.fixedDI') : $_('busIbn.autoDI')}
												>
													{#if dev.diLocked}
														<svg
															width="11"
															height="11"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2.5"
															><rect x="3" y="11" width="18" height="11" rx="2" /><path
																d="M7 11V7a5 5 0 0 1 10 0v4"
															/></svg
														>
													{:else}
														<svg
															width="11"
															height="11"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2.5"
															opacity="0.4"
															><rect x="3" y="11" width="18" height="11" rx="2" /><path
																d="M7 11V7a5 5 0 0 1 9.9-1"
															/></svg
														>
													{/if}
												</button>
											</div>
										</td>
									{/if}
									<td class="col-status">
										<button
											type="button"
											class="status-pill no-print"
											style="--sc:{STATUS_COLORS[devStatus]}"
											onclick={() => cycleStatus(dev)}
											title={$_('busIbn.clickToCycle')}
										>
											<i class="status-dot"></i>
											{statusLabel(devStatus)}
										</button>
										<span class="print-only print-status" style="color:{STATUS_COLORS[devStatus]}"
											>{statusLabel(devStatus)}</span
										>
									</td>
									<td
										><input
											class="tbl-input"
											type="text"
											bind:value={dev.notes}
											placeholder={$_('busIbn.notesPlaceholder')}
										/></td
									>
									<td class="col-act no-print">
										<div class="row-actions">
											<button
												type="button"
												class="btn-row-act"
												onclick={() => duplicateDevice(seg, dev.id)}
												title={$_('busIbn.duplicateDevice')}
											>
												<svg
													width="13"
													height="13"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													><rect x="9" y="9" width="13" height="13" rx="2" /><path
														d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
													/></svg
												>
											</button>
											<button
												type="button"
												class="btn-row-del"
												onclick={() => removeDevice(seg, dev.id)}
												title={$_('busIbn.deleteDevice')}
											>
												<svg
													width="13"
													height="13"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													><line x1="18" y1="6" x2="6" y2="18" /><line
														x1="6"
														y1="6"
														x2="18"
														y2="18"
													/></svg
												>
											</button>
										</div>
									</td>
								</tr>
							{/each}
						{/each}
						{#if seg.devices.length === 0}
							<tr>
								<td colspan={colCount(seg)} class="empty-row no-print">{$_('busIbn.noDevices')}</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<!-- Bulk add panel -->
			{#if getBulk(seg.id).open}
				{@const b = getBulk(seg.id)}
				{@const preview = bulkPreview(seg)}
				<div class="bulk-panel no-print">
					<div class="bulk-header">
						<span class="bulk-title">{$_('busIbn.bulkTitle')}</span>
						<button
							type="button"
							class="btn-cancel"
							onclick={() => {
								if (bulkState[seg.id]) bulkState[seg.id].open = false;
							}}>✕</button
						>
					</div>
					<div class="bulk-fields">
						<div class="bulk-field">
							<label class="settings-label" for="bulk-count-{seg.id}"
								>{$_('busIbn.bulkCount')}</label
							>
							<input
								id="bulk-count-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="1"
								max="100"
								bind:value={b.count}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-start-{seg.id}"
								>Start-{ADDR_RANGE[seg.type].label}</label
							>
							<input
								id="bulk-start-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min={ADDR_RANGE[seg.type].min}
								max={ADDR_RANGE[seg.type].max}
								bind:value={b.startAddr}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-prefix-{seg.id}"
								>{$_('busIbn.bulkPrefix')}</label
							>
							<input
								id="bulk-prefix-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkPrefixPlaceholder')}
								bind:value={b.prefix}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-startnum-{seg.id}"
								>{$_('busIbn.bulkStartNum')}</label
							>
							<input
								id="bulk-startnum-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="0"
								bind:value={b.startNum}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-pad-{seg.id}">{$_('busIbn.bulkPad')}</label>
							<input
								id="bulk-pad-{seg.id}"
								class="settings-input bulk-num"
								type="number"
								min="0"
								max="4"
								bind:value={b.padWidth}
								onkeydown={intOnly}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-type-{seg.id}">{$_('busIbn.bulkType')}</label>
							<input
								id="bulk-type-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkTypePlaceholder')}
								bind:value={b.deviceType}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-mfr-{seg.id}">{$_('busIbn.bulkMfr')}</label>
							<input
								id="bulk-mfr-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkMfrPlaceholder')}
								bind:value={b.manufacturer}
							/>
						</div>
						<div class="bulk-field">
							<label class="settings-label" for="bulk-model-{seg.id}"
								>{$_('busIbn.bulkModel')}</label
							>
							<input
								id="bulk-model-{seg.id}"
								class="settings-input"
								type="text"
								placeholder={$_('busIbn.bulkModelPlaceholder')}
								bind:value={b.model}
							/>
						</div>
					</div>
					{#if preview.length > 0}
						<div class="bulk-preview">
							<span class="bulk-preview-title"
								>{$_('busIbn.bulkPreviewTitle', { values: { count: preview.length } })}</span
							>
							<div class="bulk-preview-list">
								{#each preview as p (p)}
									<span class="bulk-preview-item" class:bulk-preview-item--conflict={p.conflict}>
										<span class="bulk-addr">{p.addr}</span>
										{#if p.name}<span class="bulk-name">{p.name}</span>{/if}
										{#if p.di > 0}<span class="bulk-di">DI {p.di}</span>{/if}
										{#if p.conflict}<span class="bulk-warn">{$_('busIbn.bulkDiConflict')}</span
											>{/if}
									</span>
								{/each}
							</div>
						</div>
					{:else}
						<p class="bulk-empty">
							{$_('busIbn.noFreeAddresses', { values: { addr: b.startAddr } })}
						</p>
					{/if}
					<div class="bulk-actions">
						<button
							type="button"
							class="btn-confirm"
							onclick={() => confirmBulk(seg)}
							disabled={preview.length === 0}
						>
							{preview.length}
							{$_('busIbn.addDevice')}
						</button>
						<button
							type="button"
							class="btn-cancel"
							onclick={() => {
								if (bulkState[seg.id]) bulkState[seg.id].open = false;
							}}>{$_('common.cancel')}</button
						>
					</div>
				</div>
			{/if}

			<div class="seg-footer no-print">
				<button type="button" class="btn-add-device" onclick={() => addDevice(seg)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
					>
					{$_('busIbn.addDevice')}
				</button>
				<button type="button" class="btn-add-device" onclick={() => openBulk(seg)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /><line
							x1="12"
							y1="5"
							x2="12"
							y2="19"
							transform="translate(7,0)"
						/><line x1="11" y1="12" x2="25" y2="12" transform="translate(7,0)" /></svg
					>
					{$_('busIbn.bulkTitle')}
				</button>
				<button type="button" class="btn-add-device" onclick={() => openLibraryFor(seg.id)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><rect x="2" y="3" width="7" height="18" rx="1" /><rect
							x="9"
							y="3"
							width="7"
							height="18"
							rx="1"
						/><rect x="16" y="3" width="6" height="18" rx="1" /></svg
					>
					{$_('busIbn.addFromLibrary')}
				</button>
				<span class="seg-count"
					>{seg.devices.length}
					{seg.devices.length === 1 ? $_('busIbn.deviceSingular') : $_('busIbn.devicePlural')}</span
				>
				{#if seg.devices.filter((d) => d.status === 'online').length > 0}
					<span class="seg-count" style="color:#16a34a"
						>{seg.devices.filter((d) => d.status === 'online').length} online</span
					>
				{/if}
			</div>
		</div>
	{/each}

	<AddSegmentPanel bind:show={showAddSegment} bind:segType={addSegType} onAdd={addSegment} />
</div>

<!-- ── Import Modal ──────────────────────────────────────────────────────── -->
<ImportModal
	bind:state={importState}
	segments={project.segments}
	{statusLabel}
	onConfirm={confirmImport}
/>

<!-- ── Conflict Toast ─────────────────────────────────────────────────────── -->
{#if hasConflicts}
	<div class="conflict-toast no-print" role="alert">
		<span class="conflict-toast-dot"></span>
		<span>{$_('busIbn.conflictDetected')}</span>
	</div>
{/if}

<LibraryDrawer
	bind:open={libraryOpen}
	bind:targetSegId={libraryTargetSegId}
	bind:filterBus={libraryFilterBus}
	bind:query={libraryQuery}
	segments={project.segments}
	{filteredLibrary}
	onAdd={addFromLibrary}
/>

<style>
	/* ── Page ── */
	.page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
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
		margin-bottom: 0.75rem;
	}

	/* ── Toolbar ── */
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.625rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}
	.toolbar-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.3rem 0.7rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.toolbar-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.toolbar-sep {
		width: 1px;
		height: 18px;
		background: var(--border);
		flex-shrink: 0;
	}
	.toolbar-toggle {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--text);
		cursor: pointer;
	}
	.toolbar-label {
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.toolbar-select {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
	}

	/* ── Conflict Toast ── */
	.conflict-toast {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 200;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #fef2f2;
		border: 1px solid #fca5a5;
		color: #b91c1c;
		border-radius: 999px;
		font-size: 0.8125rem;
		font-weight: 500;
		box-shadow: 0 4px 16px rgba(185, 28, 28, 0.15);
		pointer-events: none;
		animation: toast-in 0.2s ease;
	}
	:global(.dark) .conflict-toast {
		background: #450a0a;
		border-color: #7f1d1d;
		color: #fca5a5;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
	}
	.conflict-toast-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #dc2626;
		flex-shrink: 0;
		animation: pulse-conflict 1s ease-in-out infinite;
	}
	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	/* ── Project header ── */

	/* ── Buttons ── */
	.btn-print {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem 0.875rem;
		background: var(--color-primary);
		color: #fff;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.15s;
		white-space: nowrap;
	}
	.btn-print:hover {
		opacity: 0.88;
	}

	/* ── Segment ── */
	.segment {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		margin-bottom: 1.25rem;
		overflow: hidden;
	}
	.seg-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		flex-wrap: wrap;
	}
	.type-badge {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		border: 1px solid;
		flex-shrink: 0;
	}
	.seg-name-input {
		flex: 1 1 120px;
		background: transparent;
		border: none;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
		font-family: inherit;
		min-width: 80px;
	}
	.seg-name-input:focus {
		outline: none;
		border-bottom: 1px solid var(--color-primary);
	}
	.seg-head-sep {
		color: var(--muted);
		flex-shrink: 0;
	}
	.seg-desc-input {
		flex: 0 1 200px;
		background: transparent;
		border: none;
		font-size: 0.8125rem;
		color: var(--muted);
		font-family: inherit;
		min-width: 80px;
	}
	.seg-desc-input:focus {
		outline: none;
		color: var(--text);
	}
	.seg-header-actions {
		display: flex;
		gap: 0.375rem;
		margin-left: auto;
		flex-shrink: 0;
	}

	.btn-icon {
		width: 30px;
		height: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-icon:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.btn-icon--danger:hover {
		border-color: #dc2626;
		color: #dc2626;
	}

	/* ── Settings panel ── */
	.settings-label {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.settings-input,
	.settings-input:focus,

	/* ── DI config bar ── */
	.di-config {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.4rem 1rem;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, #2563eb 4%, var(--surface));
		font-size: 0.8125rem;
	}
	.di-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--text);
		cursor: pointer;
		font-weight: 500;
	}
	.di-offset-wrap {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.di-offset-label {
		color: var(--muted);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.di-offset-input {
		width: 90px;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		font-variant-numeric: tabular-nums;
	}
	.di-offset-input:focus {
		outline: none;
		border-color: #2563eb;
	}
	.di-schema-input {
		width: 54px;
	}
	.di-offset-hint {
		font-size: 0.75rem;
		color: #2563eb;
		font-weight: 500;
	}
	.di-sep {
		width: 1px;
		height: 1.25rem;
		background: var(--border);
		flex-shrink: 0;
	}

	/* ── Address hint ── */
	.addr-hint {
		font-size: 0.75rem;
		color: var(--muted);
		padding: 0.35rem 1rem;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
	}

	/* ── Address Map ── */
	.addr-map {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
	}
	.addr-map-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.addr-map-title {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.addr-map-legend {
		display: flex;
		gap: 0.875rem;
		align-items: center;
		flex-wrap: wrap;
	}
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.75rem;
		color: var(--muted);
	}
	.legend-item b {
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}
	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		display: inline-block;
		flex-shrink: 0;
	}
	.ld-free {
		background: var(--border);
	}
	.ld-used {
		background: color-mix(in srgb, #2563eb 50%, transparent);
	}
	.ld-gateway {
		background: color-mix(in srgb, #ca8a04 60%, transparent);
	}
	.ld-conflict {
		background: #dc2626;
	}

	.addr-grid {
		display: grid;
		grid-template-columns: repeat(32, 1fr);
		gap: 2px;
	}
	.amap-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20px;
		border-radius: 3px;
		font-size: 0.5625rem;
		font-variant-numeric: tabular-nums;
		cursor: default;
		transition:
			transform 0.1s,
			z-index 0.1s;
		min-width: 0;
		overflow: hidden;
		position: relative;
	}
	.amap-cell:hover {
		transform: scale(1.25);
		z-index: 2;
	}
	.amap-free {
		background: var(--bg);
		color: var(--muted);
		border: 1px solid var(--border);
	}
	.amap-used {
		background: color-mix(in srgb, #2563eb 20%, var(--surface));
		color: #2563eb;
		border: 1px solid color-mix(in srgb, #2563eb 40%, transparent);
		font-weight: 700;
	}
	.amap-gateway {
		background: color-mix(in srgb, #ca8a04 20%, var(--surface));
		color: #ca8a04;
		border: 1px solid color-mix(in srgb, #ca8a04 40%, transparent);
		font-weight: 700;
	}
	.amap-conflict {
		background: #dc2626;
		color: #fff;
		border: 1px solid #b91c1c;
		font-weight: 700;
		animation: pulse-conflict 1s ease-in-out infinite;
	}
	@keyframes pulse-conflict {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.55;
		}
	}

	/* ── Bulk selection bar ── */
	.bulk-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding: 0.5rem 1rem;
		background: color-mix(in srgb, var(--color-primary) 8%, var(--surface));
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
	}
	.bulk-bar-count {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-primary);
		flex-shrink: 0;
	}
	.bulk-bar-sep {
		width: 1px;
		height: 16px;
		background: var(--border);
		flex-shrink: 0;
	}
	.bulk-bar-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.6rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.75rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.bulk-bar-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.bulk-bar-del:hover {
		border-color: #dc2626 !important;
		color: #dc2626 !important;
	}
	.bulk-bar-close {
		background: none;
		border: none;
		color: var(--muted);
		font-size: 1rem;
		cursor: pointer;
		padding: 0 0.25rem;
		transition: color 0.15s;
	}
	.bulk-bar-close:hover {
		color: var(--text);
	}

	/* ── Row checkbox ── */
	.col-check {
		width: 32px;
	}
	.row-check {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1.5px solid var(--border);
		background: var(--bg);
		cursor: pointer;
		transition: all 0.1s;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.row-check:hover {
		border-color: var(--color-primary);
	}
	.row-check--on {
		background: var(--color-primary);
		border-color: var(--color-primary);
	}
	.row-check--on::after {
		content: '';
		display: block;
		width: 9px;
		height: 5px;
		border-left: 2px solid #fff;
		border-bottom: 2px solid #fff;
		transform: rotate(-45deg) translateY(-1px);
	}
	.row-selected {
		background: color-mix(in srgb, var(--color-primary) 5%, var(--surface)) !important;
	}

	/* ── Group row ── */
	.group-row {
		background: var(--bg) !important;
	}
	.group-cell {
		padding: 0.3rem 0.75rem !important;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.group-count {
		font-weight: 400;
		margin-left: 0.5rem;
	}

	/* ── MAC cell with steppers ── */
	.mac-cell {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.mac-cell .tbl-input {
		flex: 1;
		min-width: 0;
	}
	/* hide native browser spin buttons — we have our own steppers */
	.mac-cell input[type='number']::-webkit-inner-spin-button,
	.mac-cell input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.mac-cell input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	.mac-steppers {
		display: flex;
		flex-direction: column;
		gap: 0;
		opacity: 0;
		transition: opacity 0.15s;
		flex-shrink: 0;
	}
	tr:hover .mac-steppers {
		opacity: 1;
	}
	.mac-step {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 11px;
		background: var(--bg);
		border: 1px solid var(--border);
		font-size: 0.5rem;
		cursor: pointer;
		color: var(--muted);
		padding: 0;
		line-height: 1;
	}
	.mac-step:first-child {
		border-radius: 2px 2px 0 0;
		border-bottom: none;
	}
	.mac-step:last-child {
		border-radius: 0 0 2px 2px;
	}
	.mac-step:hover {
		background: var(--surface);
		color: var(--text);
		border-color: var(--color-primary);
	}

	/* ── Lock btn ── */
	.lock-btn {
		width: 20px;
		height: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		color: var(--muted);
		flex-shrink: 0;
		transition: color 0.15s;
		padding: 0;
	}
	.lock-btn:hover {
		color: var(--text);
	}
	.lock-btn--on {
		color: #ea580c;
	}
	.lock-btn--on:hover {
		color: #c2410c;
	}
	.tbl-addr-locked {
		color: #ea580c;
		font-weight: 700;
	}

	/* ── Status pill ── */
	.col-status {
		width: 120px;
	}
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		font-size: 0.725rem;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		border: 1px solid color-mix(in srgb, var(--sc) 40%, transparent);
		background: color-mix(in srgb, var(--sc) 10%, transparent);
		color: var(--sc);
		white-space: nowrap;
		transition: background 0.15s;
	}
	.status-pill:hover {
		background: color-mix(in srgb, var(--sc) 18%, transparent);
	}
	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--sc);
		display: inline-block;
		flex-shrink: 0;
	}

	/* ── Table ── */
	.table-wrap {
		overflow-x: auto;
	}
	.device-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}
	.col-sortable {
		cursor: pointer;
		user-select: none;
	}
	.col-sortable:hover {
		color: var(--color-primary);
	}
	.sort-icon {
		font-size: 0.65rem;
		color: var(--muted);
		margin-left: 2px;
	}
	.sort-icon--active {
		color: var(--color-primary);
	}
	.device-table thead th {
		text-align: left;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		padding: 0.45rem 0.6rem;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
		white-space: nowrap;
	}
	.device-table tbody tr {
		border-bottom: 1px solid var(--border);
	}
	.device-table tbody tr:last-child {
		border-bottom: none;
	}
	.device-table tbody tr:hover {
		background: var(--surface-hover);
	}
	.device-table tbody td {
		padding: 0.2rem 0.3rem;
	}
	.col-addr {
		width: 105px;
	}
	.col-name {
		min-width: 120px;
	}
	.col-type {
		min-width: 90px;
	}
	.col-mfr {
		min-width: 90px;
	}
	.col-model {
		min-width: 90px;
	}
	.col-group {
		min-width: 90px;
	}
	.col-di {
		width: 130px;
	}
	.col-notes {
		min-width: 120px;
	}
	.col-act {
		width: 56px;
	}
	.tbl-input {
		width: 100%;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 0.25rem;
		padding: 0.3rem 0.4rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		box-sizing: border-box;
	}
	.tbl-input:focus {
		outline: none;
		border-color: var(--color-primary);
		background: var(--bg);
	}
	.tbl-input--addr {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		text-align: right;
	}
	.tbl-conflict {
		color: #dc2626 !important;
		border-color: #dc2626 !important;
		background: #fef2f2;
	}
	:global(.dark) .tbl-conflict {
		background: #450a0a;
	}
	.tbl-di-auto {
		display: block;
		padding: 0.3rem 0.4rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: #2563eb;
		text-align: right;
		cursor: default;
	}
	.empty-row {
		text-align: center;
		color: var(--muted);
		font-style: italic;
		padding: 1rem !important;
	}

	/* ── Row actions ── */
	.row-actions {
		display: flex;
		gap: 2px;
		align-items: center;
		justify-content: flex-end;
	}
	.btn-row-act {
		width: 26px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 0.25rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-row-act:hover {
		background: var(--bg);
		color: var(--color-primary);
	}
	.btn-row-del {
		width: 26px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: 0.25rem;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-row-del:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	/* ── Bulk add panel ── */
	.bulk-panel {
		border-top: 1px solid var(--border);
		background: color-mix(in srgb, var(--color-primary) 3%, var(--surface));
		padding: 0.875rem 1rem;
	}
	.bulk-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}
	.bulk-title {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--text);
	}
	.bulk-fields {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-bottom: 0.875rem;
	}
	.bulk-field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.bulk-num {
		width: 80px;
	}
	.bulk-preview {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.625rem 0.75rem;
		margin-bottom: 0.75rem;
	}
	.bulk-preview-title {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		display: block;
		margin-bottom: 0.4rem;
	}
	.bulk-preview-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}
	.bulk-preview-item {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.2rem 0.5rem;
		font-size: 0.75rem;
	}
	.bulk-preview-item--conflict {
		border-color: #fca5a5;
		background: #fef2f2;
	}
	.bulk-addr {
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--color-primary);
	}
	.bulk-name {
		color: var(--text);
	}
	.bulk-di {
		font-size: 0.7rem;
		color: #2563eb;
		font-variant-numeric: tabular-nums;
	}
	.bulk-warn {
		font-size: 0.7rem;
		color: #dc2626;
		font-weight: 600;
	}
	.bulk-empty {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0 0 0.75rem;
	}
	.bulk-actions {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	/* ── Segment footer ── */
	.seg-footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 1rem;
		border-top: 1px solid var(--border);
		flex-wrap: wrap;
	}
	.btn-add-device {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.75rem;
		background: transparent;
		border: 1px dashed var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		font-size: 0.8125rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-add-device:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.seg-count {
		font-size: 0.75rem;
		color: var(--muted);
		margin-left: auto;
	}
	.seg-count + .seg-count {
		margin-left: 0;
	}

	/* ── Add segment ── */
	.btn-confirm {
		padding: 0.35rem 0.9rem;
		background: var(--color-primary);
		color: #fff;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		margin-left: auto;
		transition: opacity 0.15s;
	}
	.btn-confirm:hover {
		opacity: 0.88;
	}
	.btn-confirm:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.btn-cancel {
		padding: 0.35rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-family: inherit;
		color: var(--muted);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn-cancel:hover {
		border-color: var(--text);
		color: var(--text);
	}

	/* ── Library Drawer ── */

	/* ── Modal ── */

	/* ── Print ── */
	.print-only {
		display: none;
	}
	.print-status {
		font-size: 0.75rem;
		font-weight: 500;
	}

	@media print {
		.no-print {
			display: none !important;
		}
		.print-only {
			display: revert;
		}

		@page {
			size: A4 landscape;
			margin: 15mm 12mm;
			orphans: 3;
			widows: 3;
		}

		:global(body) {
			font-size: 11pt;
		}

		.page {
			max-width: 100%;
			padding: 0;
		}

		.segment {
			background: #fff;
			border: 1pt solid #aaa;
			border-radius: 0;
			margin-bottom: 14pt;
			page-break-inside: avoid;
		}
		.seg-header {
			background: #f0f0f0;
			border-bottom: 1pt solid #aaa;
			padding: 5pt 8pt;
		}
		.seg-name-input,
		.seg-desc-input {
			background: transparent;
			font-size: 10pt;
		}
		.seg-head-sep {
			color: #666;
		}
		.type-badge {
			border: 1pt solid;
			font-size: 7pt;
		}

		.di-config {
			background: #f8f8f8;
			padding: 3pt 8pt;
			font-size: 8pt;
		}
		.addr-hint {
			display: none;
		}

		.device-table {
			font-size: 8pt;
			width: 100%;
		}
		.device-table thead th {
			background: #e8e8e8;
			color: #333;
			border-bottom: 1pt solid #999;
			padding: 3pt 5pt;
			font-size: 7pt;
		}
		.device-table tbody tr {
			border-bottom: 0.5pt solid #ddd;
		}
		.device-table tbody tr:last-child {
			border-bottom: none;
		}
		.device-table tbody td {
			padding: 2pt 5pt;
			vertical-align: middle;
		}

		.tbl-input {
			background: transparent;
			border: none;
			padding: 0;
			font-size: 8pt;
			width: auto;
		}
		.tbl-input--addr {
			font-weight: 700;
		}
		.tbl-conflict {
			color: #c00 !important;
			border: none !important;
			background: transparent !important;
		}

		.lock-btn {
			display: none;
		}
		.tbl-di-auto {
			font-size: 8pt;
			padding: 0;
			color: #1a4db5;
		}
		.print-status {
			display: inline !important;
			font-size: 8pt;
		}

		.seg-footer,
		.bulk-panel {
			display: none;
		}
	}
</style>
