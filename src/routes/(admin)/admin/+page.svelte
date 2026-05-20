<script lang="ts">
	import { enhance } from '$app/forms';
	import { untrack } from 'svelte';

	let { data } = $props();

	let users = $state(untrack(() => data.users));
	let banReason = $state('');
	let confirmDelete: string | null = $state(null);
	let resetTarget: string | null = $state(null);
	let resetPw = $state('');
	let toast: { msg: string; ok: boolean } | null = $state(null);
	let searchQuery = $state('');
	let showCreateForm = $state(false);
	let createEmail = $state('');
	let createName = $state('');
	let createPw = $state('');
	let createRole = $state<'user' | 'admin'>('user');

	const filteredUsers = $derived(
		searchQuery.trim()
			? users.filter(u =>
				u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(u.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
				(u.company ?? '').toLowerCase().includes(searchQuery.toLowerCase())
			)
			: users
	);

	function showToast(msg: string, ok = true) {
		toast = { msg, ok };
		setTimeout(() => (toast = null), 3000);
	}

	function formatDate(d: Date | number | null) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('de-CH', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d));
	}

	function formatRelative(ts: number | null) {
		if (!ts) return '—';
		const diff = Date.now() - ts;
		const min = Math.floor(diff / 60000);
		if (min < 2) return 'gerade eben';
		if (min < 60) return `vor ${min} Min`;
		const h = Math.floor(min / 60);
		if (h < 24) return `vor ${h} Std`;
		const d = Math.floor(h / 24);
		if (d < 30) return `vor ${d} T`;
		return formatDate(ts);
	}

	function initials(email: string) {
		return email[0].toUpperCase();
	}

	const typeColor: Record<string, string> = {
		rechner:    '#0d9488',
		artikel:    '#2563eb',
		konverter:  '#ea580c',
		referenz:   '#0891b2',
		checkliste: '#7c3aed'
	};
</script>

<svelte:head><title>Admin — Benutzerverwaltung</title></svelte:head>

{#if toast}
	<div class="toast" class:toast--err={!toast.ok} role="status">{toast.msg}</div>
{/if}

<div class="admin-page">
	<div class="page-header">
		<div class="header-row">
			<p class="subtitle">{filteredUsers.length} / {users.length} {users.length === 1 ? 'Account' : 'Accounts'}</p>
			<div class="header-actions">
				<input
					type="search"
					class="search-input"
					placeholder="E-Mail, Name, Firma…"
					bind:value={searchQuery}
				/>
				<form
					method="POST"
					action="?/sendTestEmail"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') showToast('Test-E-Mail gesendet ✓');
							else showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
							await update({ reset: false });
						};
					}}
				>
					<button type="submit" class="btn btn--ghost btn--sm" title="Test-E-Mail an eigene Adresse senden">📧 Test-Mail</button>
				</form>
				<button type="button" class="btn btn--primary btn--sm" onclick={() => showCreateForm = !showCreateForm}>
					{showCreateForm ? 'Abbrechen' : '+ Benutzer anlegen'}
				</button>
			</div>
		</div>

		{#if showCreateForm}
			<form
				method="POST"
				action="?/createUser"
				class="create-form"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							showToast('Benutzer angelegt');
							showCreateForm = false;
							createEmail = ''; createName = ''; createPw = ''; createRole = 'user';
							await update();
							users = data.users;
						} else {
							showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
							await update({ reset: false });
						}
					};
				}}
			>
				<input class="input" type="email" name="email" bind:value={createEmail} placeholder="E-Mail *" required />
				<input class="input" type="text" name="name" bind:value={createName} placeholder="Name" />
				<input class="input" type="password" name="password" bind:value={createPw} placeholder="Passwort (min. 8) *" minlength="8" required />
				<select class="input" name="role" bind:value={createRole}>
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</select>
				<button type="submit" class="btn btn--primary btn--sm" disabled={!createEmail || createPw.length < 8}>Anlegen</button>
			</form>
		{/if}
	</div>

	<div class="table-wrap">
		<table class="user-table">
			<thead>
				<tr>
					<th>Benutzer</th>
					<th>Rolle</th>
					<th>Status</th>
					<th>Erstellt</th>
					<th>Letzter Login</th>
					<th>Favoriten</th>
					<th>Aktionen</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as u (u.id)}
					<tr class:row--banned={u.banned}>
						<td>
							<div class="user-cell">
								<div class="avatar" style:background={u.banned ? '#6b7280' : u.role === 'admin' ? '#7c3aed' : '#0891b2'}>
									{initials(u.email)}
								</div>
								<div>
									<div class="user-email">{u.email}</div>
									{#if u.name}
										<div class="user-name">{u.name}</div>
									{/if}
									{#if u.company || u.profileRole}
										<div class="user-meta">{[u.profileRole, u.company].filter(Boolean).join(' · ')}</div>
									{/if}
								</div>
							</div>
						</td>
						<td>
							<form
								method="POST"
								action="?/setRole"
								use:enhance={({ formData }) => {
									return async ({ result, update }) => {
										if (result.type === 'success') {
											const idx = users.findIndex(x => x.id === u.id);
											if (idx !== -1) users[idx] = { ...users[idx], role: formData.get('role') as string };
											showToast('Rolle geändert');
										} else {
											showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
										}
										await update({ reset: false });
									};
								}}
							>
								<input type="hidden" name="userId" value={u.id} />
								<select
									name="role"
									class="role-select"
									class:role-select--admin={u.role === 'admin'}
									onchange={e => (e.currentTarget.closest('form') as HTMLFormElement).requestSubmit()}
								>
									<option value="user" selected={u.role !== 'admin'}>User</option>
									<option value="admin" selected={u.role === 'admin'}>Admin</option>
								</select>
							</form>
						</td>
						<td>
							{#if u.banned}
								<span class="badge badge--banned">Gesperrt</span>
								{#if u.banReason}<div class="ban-reason">{u.banReason}</div>{/if}
							{:else if !u.emailVerified}
								<span class="badge badge--unverified">Unbestätigt</span>
							{:else}
								<span class="badge badge--active">Aktiv</span>
							{/if}
						</td>
						<td class="date-cell">{formatDate(u.createdAt)}</td>
						<td class="date-cell" title={u.lastLogin ? formatDate(u.lastLogin) : ''}>{formatRelative(u.lastLogin)}</td>
						<td class="fav-cell">
							{#if u.favorites?.length}
								<span class="fav-count" title={u.favorites.map(f => f.title).join('\n')}>★ {u.favorites.length}</span>
								<div class="fav-pills">
									{#each u.favorites.slice(0, 4) as f}
										<span class="fav-pill" style:background="color-mix(in srgb, {typeColor[f.type] ?? '#64748b'} 15%, transparent)" style:color={typeColor[f.type] ?? '#64748b'} title={f.title}>
											{f.title.length > 14 ? f.title.slice(0, 13) + '…' : f.title}
										</span>
									{/each}
									{#if u.favorites.length > 4}
										<span class="fav-pill fav-pill--more">+{u.favorites.length - 4}</span>
									{/if}
								</div>
							{:else}
								<span class="no-favs">—</span>
							{/if}
						</td>
						<td>
							<div class="actions">
								{#if u.banned}
									<form method="POST" action="?/unban" use:enhance={() => {
										return async ({ result, update }) => {
											if (result.type === 'success') {
												const idx = users.findIndex(x => x.id === u.id);
												if (idx !== -1) users[idx] = { ...users[idx], banned: false, banReason: null };
												showToast('Entsperrt');
											}
											await update({ reset: false });
										};
									}}>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--ghost" title="Entsperren">{@render LockOpen()}</button>
									</form>
								{:else}
									<form method="POST" action="?/ban" use:enhance={({ formData }) => {
										formData.set('reason', banReason || 'Gesperrt durch Admin');
										return async ({ result, update }) => {
											if (result.type === 'success') {
												const idx = users.findIndex(x => x.id === u.id);
												if (idx !== -1) users[idx] = { ...users[idx], banned: true, banReason: banReason || 'Gesperrt durch Admin' };
												showToast('User gesperrt');
											} else {
												showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
											}
											await update({ reset: false });
										};
									}}>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--ghost btn--warn" title="Sperren">{@render Lock()}</button>
									</form>
								{/if}

								{#if resetTarget === u.id}
									<form method="POST" action="?/resetPassword" use:enhance={() => {
										return async ({ result, update }) => {
											resetTarget = null; resetPw = '';
											if (result.type === 'success') showToast('Passwort zurückgesetzt');
											else showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
											await update({ reset: false });
										};
									}}>
										<input type="hidden" name="userId" value={u.id} />
										<input type="password" name="newPassword" bind:value={resetPw} placeholder="Neues PW (min. 8)" minlength="8" required class="pw-input" />
										<button type="submit" class="btn btn--sm btn--warn" disabled={resetPw.length < 8}>Setzen</button>
										<button type="button" class="btn btn--sm btn--ghost" onclick={() => { resetTarget = null; resetPw = ''; }}>Abbrechen</button>
									</form>
								{:else}
									<button type="button" class="btn btn--sm btn--ghost" title="Passwort zurücksetzen" onclick={() => resetTarget = u.id}>🔑</button>
								{/if}

								{#if confirmDelete === u.id}
									<form method="POST" action="?/deleteUser" use:enhance={() => {
										return async ({ result, update }) => {
											confirmDelete = null;
											if (result.type === 'success') { users = users.filter(x => x.id !== u.id); showToast('User gelöscht'); }
											else showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
											await update({ reset: false });
										};
									}}>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--danger">Löschen?</button>
									</form>
									<button type="button" class="btn btn--sm btn--ghost" onclick={() => confirmDelete = null}>Abbrechen</button>
								{:else}
									<button type="button" class="btn btn--sm btn--ghost btn--danger-ghost" title="Löschen" onclick={() => confirmDelete = u.id}>{@render Trash()}</button>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
				{#if filteredUsers.length === 0}
					<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted);font-size:0.875rem;">Keine Benutzer gefunden</td></tr>
				{/if}
			</tbody>
		</table>
	</div>

	<div class="ban-reason-input">
		<label for="ban-reason-global">Standard Sperrgrund:</label>
		<input id="ban-reason-global" type="text" bind:value={banReason} placeholder="Gesperrt durch Admin" class="input" />
	</div>
</div>

{#snippet Lock()}
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
		<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</svg>
{/snippet}

{#snippet LockOpen()}
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
		<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
	</svg>
{/snippet}

{#snippet Trash()}
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
		<polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
	</svg>
{/snippet}

<style>
	.admin-page { max-width: 1100px; }

	.page-header { margin-bottom: 1.5rem; }

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.75rem;
	}

	.header-actions { display: flex; align-items: center; gap: 0.5rem; }

	.subtitle { color: var(--muted); font-size: 0.875rem; margin: 0; }

	.search-input {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		width: 220px;
	}
	.search-input:focus { outline: none; border-color: var(--color-primary); }

	.create-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
	}

	.table-wrap {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		overflow: hidden;
		overflow-x: auto;
	}

	.user-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }

	.user-table thead { background: var(--bg); border-bottom: 1px solid var(--border); }

	.user-table th {
		padding: 0.625rem 1rem;
		text-align: left;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
		white-space: nowrap;
	}

	.user-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
	.user-table tbody tr:last-child td { border-bottom: none; }
	.user-table tbody tr:hover { background: var(--surface-hover); }
	.row--banned { opacity: 0.65; }

	.user-cell { display: flex; align-items: center; gap: 0.75rem; }

	.avatar {
		width: 2rem; height: 2rem; border-radius: 50%;
		display: flex; align-items: center; justify-content: center;
		font-size: 0.8125rem; font-weight: 700; color: #fff; flex-shrink: 0;
	}

	.user-email { font-weight: 500; color: var(--text); }
	.user-name { font-size: 0.75rem; color: var(--muted); }
	.user-meta { font-size: 0.7rem; color: var(--muted); opacity: 0.75; }

	.role-select {
		background: var(--bg); border: 1px solid var(--border); border-radius: 0.375rem;
		padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 600;
		color: var(--muted); cursor: pointer; font-family: inherit;
	}
	.role-select--admin { background: color-mix(in srgb, #7c3aed 15%, transparent); border-color: #7c3aed; color: #7c3aed; }

	.badge { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 9999px; }
	.badge--active { background: color-mix(in srgb, #16a34a 15%, transparent); color: #16a34a; }
	.badge--banned { background: color-mix(in srgb, #dc2626 15%, transparent); color: #dc2626; }
	.badge--unverified { background: color-mix(in srgb, #ca8a04 15%, transparent); color: #ca8a04; }

	.ban-reason { font-size: 0.7rem; color: var(--muted); margin-top: 0.2rem; }
	.date-cell { color: var(--muted); font-size: 0.8125rem; white-space: nowrap; }

	.actions { display: flex; align-items: center; gap: 0.375rem; }

	.btn {
		display: inline-flex; align-items: center; gap: 0.375rem;
		border: none; border-radius: 0.375rem; cursor: pointer;
		font-family: inherit; font-weight: 500; transition: background 0.15s, color 0.15s;
	}
	.btn--sm { font-size: 0.75rem; padding: 0.3rem 0.6rem; }
	.btn--primary { background: var(--color-primary); color: #fff; border: none; }
	.btn--primary:hover { opacity: 0.9; }
	.btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
	.btn--ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
	.btn--ghost:hover { background: var(--surface-hover); color: var(--text); }
	.btn--warn { color: #ea580c; border-color: color-mix(in srgb, #ea580c 40%, transparent); background: transparent; }
	.btn--warn:hover { background: color-mix(in srgb, #ea580c 12%, transparent); }
	.btn--warn:disabled { opacity: 0.4; cursor: not-allowed; }
	.btn--danger { background: #dc2626; color: #fff; border: none; }
	.btn--danger:hover { background: #b91c1c; }
	.btn--danger-ghost { color: #dc2626; border: 1px solid color-mix(in srgb, #dc2626 40%, transparent); background: transparent; }
	.btn--danger-ghost:hover { background: color-mix(in srgb, #dc2626 12%, transparent); }

	.pw-input {
		background: var(--bg); border: 1px solid var(--border); border-radius: 0.375rem;
		padding: 0.3rem 0.5rem; font-size: 0.75rem; color: var(--text); font-family: inherit; width: 10rem;
	}
	.pw-input:focus { outline: none; border-color: var(--color-primary); }

	.fav-cell { min-width: 160px; max-width: 240px; }
	.fav-count { font-size: 0.75rem; font-weight: 600; color: #eab308; cursor: default; }
	.fav-pills { display: flex; flex-wrap: wrap; gap: 0.2rem; margin-top: 0.25rem; }
	.fav-pill { font-size: 0.65rem; font-weight: 500; padding: 0.1rem 0.4rem; border-radius: 9999px; white-space: nowrap; cursor: default; }
	.fav-pill--more { background: var(--surface-hover); color: var(--muted); }
	.no-favs { color: var(--muted); font-size: 0.8125rem; }

	.ban-reason-input {
		margin-top: 1rem; display: flex; align-items: center;
		gap: 0.75rem; font-size: 0.8125rem; color: var(--muted);
	}

	.input {
		background: var(--surface); border: 1px solid var(--border); border-radius: 0.375rem;
		padding: 0.375rem 0.625rem; font-size: 0.8125rem; color: var(--text); font-family: inherit;
	}
	.input:focus { outline: none; border-color: var(--color-primary); }

	.toast {
		position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
		background: #166534; color: #bbf7d0; padding: 0.625rem 1.25rem;
		border-radius: 0.625rem; font-size: 0.875rem; font-weight: 500;
		z-index: 9999; box-shadow: 0 4px 16px rgba(0,0,0,0.3); white-space: nowrap;
	}
	.toast--err { background: #991b1b; color: #fecaca; }
</style>
