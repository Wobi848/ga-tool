<script lang="ts">
	let { data } = $props();

	const moduleLabels: Record<string, string> = {
		dashboard: 'Dashboard', konverter: 'Konverter', rechner: 'Rechner',
		wissen: 'Wissensbasis', checkliste: 'Checklisten', referenz: 'Referenz',
		abkuerzungen: 'Abkürzungen', profil: 'Profil', settings: 'Einstellungen', other: 'Sonstiges'
	};

	const moduleColors: Record<string, string> = {
		dashboard: '#6366f1', konverter: '#ea580c', rechner: '#0d9488',
		wissen: '#2563eb', checkliste: '#7c3aed', referenz: '#0891b2',
		abkuerzungen: '#65a30d', profil: '#d97706', settings: '#6b7280', other: '#9ca3af'
	};

	const maxModule  = $derived(Math.max(...data.byModule.map(m => m.cnt), 1));
	const maxDaily   = $derived(Math.max(...data.daily.map(d => d.cnt), 1));
	const maxReg     = $derived(Math.max(...data.regDaily.map(d => d.cnt), 1));
	const maxFav     = $derived(data.topFavorites[0]?.count ?? 1);
	const maxUser    = $derived(data.topUsers[0]?.cnt ?? 1);

	const trend7d = $derived(() => {
		if (data.prev7d === 0) return null;
		const pct = Math.round(((data.last7d - data.prev7d) / data.prev7d) * 100);
		return pct;
	});

	const favTypeColor: Record<string, string> = {
		rechner: '#0d9488', artikel: '#2563eb', konverter: '#ea580c',
		referenz: '#0891b2', checkliste: '#7c3aed'
	};

	function fmtDay(iso: string) {
		const d = new Date(iso + 'T12:00:00');
		return new Intl.DateTimeFormat('de-CH', { day: '2-digit', month: '2-digit' }).format(d);
	}

	const slugsByModule = $derived(data.topSlugs.reduce(
		(acc, r) => {
			const mod = r.module;
			if (!acc[mod]) acc[mod] = [];
			acc[mod].push({ slug: r.slug ?? '—', cnt: r.cnt });
			return acc;
		},
		{} as Record<string, { slug: string; cnt: number }[]>
	));
</script>

<svelte:head><title>Admin — Analytics</title></svelte:head>

<div class="analytics">
	<!-- Summary cards -->
	<div class="cards">
		<div class="card">
			<div class="card-value">{data.total.toLocaleString('de-CH')}</div>
			<div class="card-label">Events gesamt</div>
		</div>
		<div class="card">
			<div class="card-value">{data.last30d.toLocaleString('de-CH')}</div>
			<div class="card-label">Letzte 30 Tage</div>
		</div>
		<div class="card">
			<div class="card-value">
				{data.last7d.toLocaleString('de-CH')}
				{#if trend7d() !== null}
					<span class="trend" class:trend--up={trend7d()! > 0} class:trend--down={trend7d()! < 0}>
						{trend7d()! > 0 ? '↑' : trend7d()! < 0 ? '↓' : '→'}{Math.abs(trend7d()!)}%
					</span>
				{/if}
			</div>
			<div class="card-label">Letzte 7 Tage</div>
		</div>
		<div class="card">
			<div class="card-value">{data.uniqueUsers}</div>
			<div class="card-label">Aktive User (30d)</div>
		</div>
		<div class="card">
			<div class="card-value">{data.totalUsers}</div>
			<div class="card-label">Registrierte User</div>
		</div>
	</div>

	<div class="two-col">
		<!-- Daily events chart -->
		<div class="section">
			<h2 class="section-title">Tägliche Aufrufe — letzte 30 Tage</h2>
			<div class="chart-wrap">
				<div class="bar-chart">
					{#each data.daily as d}
						<div class="bar-col" title="{fmtDay(d.day)}: {d.cnt} Events">
							<div class="bar" style:height="{(d.cnt / maxDaily) * 100}%" style:background={d.cnt > 0 ? '#7c3aed' : 'var(--border)'}></div>
						</div>
					{/each}
				</div>
				<div class="chart-x">
					<span>{fmtDay(data.daily[0]?.day ?? '')}</span>
					<span>{fmtDay(data.daily[14]?.day ?? '')}</span>
					<span>{fmtDay(data.daily[29]?.day ?? '')}</span>
				</div>
			</div>
		</div>

		<!-- Module breakdown -->
		<div class="section">
			<h2 class="section-title">Module — Gesamtaufrufe</h2>
			<div class="module-list">
				{#each data.byModule as m}
					<div class="module-row">
						<div class="module-name" style:color={moduleColors[m.module] ?? '#6b7280'}>
							{moduleLabels[m.module] ?? m.module}
						</div>
						<div class="module-bar-wrap">
							<div class="module-bar" style:width="{(m.cnt / maxModule) * 100}%" style:background={moduleColors[m.module] ?? '#6b7280'}></div>
						</div>
						<div class="module-count">{m.cnt.toLocaleString('de-CH')}</div>
					</div>
				{/each}
				{#if data.byModule.length === 0}
					<p class="empty">Noch keine Daten</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="two-col">
		<!-- Registration trend -->
		<div class="section">
			<h2 class="section-title">Neue Registrierungen — letzte 30 Tage</h2>
			<div class="chart-wrap">
				<div class="bar-chart bar-chart--sm">
					{#each data.regDaily as d}
						<div class="bar-col" title="{fmtDay(d.day)}: {d.cnt} Registrierungen">
							<div class="bar" style:height="{maxReg > 0 ? (d.cnt / maxReg) * 100 : 0}%" style:background={d.cnt > 0 ? '#0d9488' : 'var(--border)'}></div>
						</div>
					{/each}
				</div>
				<div class="chart-x">
					<span>{fmtDay(data.regDaily[0]?.day ?? '')}</span>
					<span>{fmtDay(data.regDaily[14]?.day ?? '')}</span>
					<span>{fmtDay(data.regDaily[29]?.day ?? '')}</span>
				</div>
			</div>
		</div>

		<!-- Top active users -->
		<div class="section">
			<h2 class="section-title">Aktivste User (30d)</h2>
			{#if data.topUsers.length}
				<div class="user-list">
					{#each data.topUsers as u, i}
						<div class="user-row">
							<span class="user-rank">{i + 1}</span>
							<span class="user-email-txt">{u.email}</span>
							<div class="module-bar-wrap">
								<div class="module-bar" style:width="{(u.cnt / maxUser) * 100}%" style:background="#0891b2"></div>
							</div>
							<span class="module-count">{u.cnt}</span>
						</div>
					{/each}
				</div>
			{:else}
				<p class="empty">Noch keine Daten</p>
			{/if}
		</div>
	</div>

	<!-- Top favorites -->
	<div class="section">
		<h2 class="section-title">Meist gemerkte Inhalte (Favoriten)</h2>
		{#if data.topFavorites.length}
			<div class="fav-list">
				{#each data.topFavorites as f}
				<div class="fav-row">
					<span class="fav-badge" style:background="color-mix(in srgb, {favTypeColor[f.type] ?? '#64748b'} 15%, transparent)" style:color={favTypeColor[f.type] ?? '#64748b'}>{f.type}</span>
					<span class="fav-name">{f.title}</span>
					<div class="fav-bar-wrap">
						<div class="fav-bar" style:width="{(f.count / maxFav) * 100}%" style:background={favTypeColor[f.type] ?? '#64748b'}></div>
					</div>
					<span class="fav-count">{f.count}×</span>
				</div>
				{/each}
			</div>
		{:else}
			<p class="empty">Noch keine Favoriten gesetzt</p>
		{/if}
	</div>

	<!-- Top items per module -->
	<div class="section">
		<h2 class="section-title">Top Inhalte</h2>
		<div class="top-grid">
			{#each Object.entries(slugsByModule) as [mod, items]}
				<div class="top-card">
					<div class="top-card-header" style:color={moduleColors[mod] ?? '#6b7280'}>
						{moduleLabels[mod] ?? mod}
					</div>
					<ol class="top-list">
						{#each items.slice(0, 5) as item, i}
							<li class="top-item">
								<span class="top-rank">{i + 1}</span>
								<span class="top-slug">{item.slug}</span>
								<span class="top-cnt">{item.cnt}</span>
							</li>
						{/each}
					</ol>
				</div>
			{/each}
			{#if Object.keys(slugsByModule).length === 0}
				<p class="empty">Noch keine Daten</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.analytics { display: flex; flex-direction: column; gap: 1.5rem; }

	.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; }

	.card { background: var(--surface); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem 1.25rem; }

	.card-value {
		font-family: var(--font-display);
		font-size: 2rem; font-weight: 400; color: var(--text);
		line-height: 1; margin-bottom: 0.25rem;
		display: flex; align-items: baseline; gap: 0.5rem;
	}

	.card-label { font-size: 0.75rem; color: var(--muted); font-weight: 500; }

	.trend { font-size: 0.75rem; font-weight: 700; padding: 0.1rem 0.4rem; border-radius: 9999px; }
	.trend--up { background: color-mix(in srgb, #16a34a 15%, transparent); color: #16a34a; }
	.trend--down { background: color-mix(in srgb, #dc2626 15%, transparent); color: #dc2626; }

	.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	@media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }

	.section { background: var(--surface); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem; }

	.section-title { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); margin: 0 0 1rem; }

	.chart-wrap { display: flex; flex-direction: column; gap: 0.375rem; }

	.bar-chart { display: flex; align-items: flex-end; gap: 2px; height: 80px; }
	.bar-chart--sm { height: 56px; }

	.bar-col { flex: 1; height: 100%; display: flex; align-items: flex-end; cursor: default; }

	.bar { width: 100%; border-radius: 2px 2px 0 0; min-height: 2px; transition: opacity 0.15s; }
	.bar-col:hover .bar { opacity: 0.75; }

	.chart-x { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--muted); }

	.module-list { display: flex; flex-direction: column; gap: 0.5rem; }

	.module-row { display: grid; grid-template-columns: 110px 1fr 50px; align-items: center; gap: 0.5rem; }

	.module-name { font-size: 0.8125rem; font-weight: 600; }

	.module-bar-wrap { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }

	.module-bar { height: 100%; border-radius: 3px; transition: width 0.3s; }

	.module-count { font-size: 0.75rem; color: var(--muted); text-align: right; font-variant-numeric: tabular-nums; }

	/* Top active users */
	.user-list { display: flex; flex-direction: column; gap: 0.4rem; }

	.user-row { display: grid; grid-template-columns: 1.25rem 1fr 5rem 2.5rem; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }

	.user-rank { font-size: 0.65rem; color: var(--muted); text-align: right; }

	.user-email-txt { color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }

	/* Top items grid */
	.top-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem; }

	.top-card { background: var(--bg); border: 1px solid var(--border); border-radius: 0.5rem; overflow: hidden; }

	.top-card-header { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border); }

	.top-list { list-style: none; margin: 0; padding: 0.375rem 0; }

	.top-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0.75rem; font-size: 0.8125rem; }

	.top-rank { font-size: 0.65rem; color: var(--muted); width: 1rem; flex-shrink: 0; }
	.top-slug { flex: 1; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.top-cnt { font-size: 0.75rem; color: var(--muted); font-variant-numeric: tabular-nums; }

	.empty { color: var(--muted); font-size: 0.875rem; text-align: center; padding: 1rem; margin: 0; }

	.fav-list { display: flex; flex-direction: column; gap: 0.4rem; }

	.fav-row { display: grid; grid-template-columns: 5.5rem 1fr 10rem 2.5rem; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }

	.fav-badge { font-size: 0.65rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; text-align: center; }
	.fav-name { color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.fav-bar-wrap { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
	.fav-bar { height: 100%; border-radius: 3px; transition: width 0.3s; }
	.fav-count { font-size: 0.75rem; color: var(--muted); text-align: right; font-variant-numeric: tabular-nums; }
</style>
