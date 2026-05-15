<script lang="ts">
	import { enhance } from '$app/forms';
	import { untrack } from 'svelte';

	let { data } = $props();

	let users = $state(untrack(() => data.users));
	let banReason = $state('');
	let confirmDelete: string | null = $state(null);
	let toast: { msg: string; ok: boolean } | null = $state(null);

	function showToast(msg: string, ok = true) {
		toast = { msg, ok };
		setTimeout(() => (toast = null), 3000);
	}

	function formatDate(d: Date | null) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('de-CH', { dateStyle: 'short', timeStyle: 'short' }).format(
			new Date(d)
		);
	}

	function initials(email: string) {
		return email[0].toUpperCase();
	}
</script>

<svelte:head><title>Admin — Benutzerverwaltung</title></svelte:head>

<!-- Toast -->
{#if toast}
	<div class="toast" class:toast--err={!toast.ok} role="status">{toast.msg}</div>
{/if}

<div class="admin-page">
	<div class="page-header">
		<p class="subtitle">{users.length} {users.length === 1 ? 'Account' : 'Accounts'} registriert</p>
	</div>

	<div class="table-wrap">
		<table class="user-table">
			<thead>
				<tr>
					<th>Benutzer</th>
					<th>Rolle</th>
					<th>Status</th>
					<th>Erstellt</th>
					<th>Aktionen</th>
				</tr>
			</thead>
			<tbody>
				{#each users as u (u.id)}
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
							<!-- Role toggle form -->
							<form
								method="POST"
								action="?/setRole"
								use:enhance={({ formData }) => {
									return async ({ result, update }) => {
										if (result.type === 'success') {
											const idx = users.findIndex((x) => x.id === u.id);
											if (idx !== -1) {
												users[idx] = { ...users[idx], role: formData.get('role') as string };
											}
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
									onchange={(e) => (e.currentTarget.closest('form') as HTMLFormElement).requestSubmit()}
								>
									<option value="user" selected={u.role !== 'admin'}>User</option>
									<option value="admin" selected={u.role === 'admin'}>Admin</option>
								</select>
							</form>
						</td>
						<td>
							{#if u.banned}
								<span class="badge badge--banned">Gesperrt</span>
								{#if u.banReason}
									<div class="ban-reason">{u.banReason}</div>
								{/if}
							{:else}
								<span class="badge badge--active">Aktiv</span>
							{/if}
						</td>
						<td class="date-cell">{formatDate(u.createdAt)}</td>
						<td>
							<div class="actions">
								{#if u.banned}
									<!-- Unban -->
									<form
										method="POST"
										action="?/unban"
										use:enhance={() => {
											return async ({ result, update }) => {
												if (result.type === 'success') {
													const idx = users.findIndex((x) => x.id === u.id);
													if (idx !== -1) users[idx] = { ...users[idx], banned: false, banReason: null };
													showToast('Entsperrt');
												}
												await update({ reset: false });
											};
										}}
									>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--ghost" title="Entsperren">
											{@render LockOpen()}
										</button>
									</form>
								{:else}
									<!-- Ban -->
									<form
										method="POST"
										action="?/ban"
										use:enhance={({ formData }) => {
											formData.set('reason', banReason || 'Gesperrt durch Admin');
											return async ({ result, update }) => {
												if (result.type === 'success') {
													const idx = users.findIndex((x) => x.id === u.id);
													if (idx !== -1)
														users[idx] = {
															...users[idx],
															banned: true,
															banReason: banReason || 'Gesperrt durch Admin'
														};
													showToast('User gesperrt');
												} else {
													showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
												}
												await update({ reset: false });
											};
										}}
									>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--ghost btn--warn" title="Sperren">
											{@render Lock()}
										</button>
									</form>
								{/if}

								<!-- Delete -->
								{#if confirmDelete === u.id}
									<form
										method="POST"
										action="?/deleteUser"
										use:enhance={() => {
											return async ({ result, update }) => {
												confirmDelete = null;
												if (result.type === 'success') {
													users = users.filter((x) => x.id !== u.id);
													showToast('User gelöscht');
												} else {
													showToast((result as { data?: { error?: string } }).data?.error ?? 'Fehler', false);
												}
												await update({ reset: false });
											};
										}}
									>
										<input type="hidden" name="userId" value={u.id} />
										<button type="submit" class="btn btn--sm btn--danger">Löschen?</button>
									</form>
									<button
										type="button"
										class="btn btn--sm btn--ghost"
										onclick={() => (confirmDelete = null)}>Abbrechen</button
									>
								{:else}
									<button
										type="button"
										class="btn btn--sm btn--ghost btn--danger-ghost"
										title="Löschen"
										onclick={() => (confirmDelete = u.id)}
									>
										{@render Trash()}
									</button>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Optional ban reason input -->
	<div class="ban-reason-input">
		<label for="ban-reason-global">Standard Sperrgrund:</label>
		<input
			id="ban-reason-global"
			type="text"
			bind:value={banReason}
			placeholder="Gesperrt durch Admin"
			class="input"
		/>
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
	.admin-page {
		max-width: 1000px;
	}

	.page-header {
		margin-bottom: 1.5rem;
	}

	.subtitle {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0;
	}

	/* Table */
	.table-wrap {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		overflow: hidden;
		overflow-x: auto;
	}

	.user-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.user-table thead {
		background: var(--bg);
		border-bottom: 1px solid var(--border);
	}

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

	.user-table td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
	}

	.user-table tbody tr:last-child td {
		border-bottom: none;
	}

	.user-table tbody tr:hover {
		background: var(--surface-hover);
	}

	.row--banned {
		opacity: 0.65;
	}

	/* User cell */
	.user-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8125rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.user-email {
		font-weight: 500;
		color: var(--text);
	}

	.user-name {
		font-size: 0.75rem;
		color: var(--muted);
	}

	.user-meta {
		font-size: 0.7rem;
		color: var(--muted);
		opacity: 0.75;
	}

	/* Role select */
	.role-select {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
	}

	.role-select--admin {
		background: color-mix(in srgb, #7c3aed 15%, transparent);
		border-color: #7c3aed;
		color: #7c3aed;
	}

	/* Badges */
	.badge {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
	}

	.badge--active {
		background: color-mix(in srgb, #16a34a 15%, transparent);
		color: #16a34a;
	}

	.badge--banned {
		background: color-mix(in srgb, #dc2626 15%, transparent);
		color: #dc2626;
	}

	.ban-reason {
		font-size: 0.7rem;
		color: var(--muted);
		margin-top: 0.2rem;
	}

	.date-cell {
		color: var(--muted);
		font-size: 0.8125rem;
		white-space: nowrap;
	}

	/* Actions */
	.actions {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-family: inherit;
		font-weight: 500;
		transition: background 0.15s, color 0.15s;
	}

	.btn--sm {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
	}

	.btn--ghost {
		background: transparent;
		color: var(--muted);
		border: 1px solid var(--border);
	}

	.btn--ghost:hover {
		background: var(--surface-hover);
		color: var(--text);
	}

	.btn--warn {
		color: #ea580c;
		border-color: color-mix(in srgb, #ea580c 40%, transparent);
	}

	.btn--warn:hover {
		background: color-mix(in srgb, #ea580c 12%, transparent);
	}

	.btn--danger {
		background: #dc2626;
		color: #fff;
	}

	.btn--danger:hover {
		background: #b91c1c;
	}

	.btn--danger-ghost {
		color: #dc2626;
		border-color: color-mix(in srgb, #dc2626 40%, transparent);
	}

	.btn--danger-ghost:hover {
		background: color-mix(in srgb, #dc2626 12%, transparent);
	}

	/* Ban reason input */
	.ban-reason-input {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.input {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.625rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		width: 280px;
	}

	.input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	/* Toast */
	.toast {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		background: #166534;
		color: #bbf7d0;
		padding: 0.625rem 1.25rem;
		border-radius: 0.625rem;
		font-size: 0.875rem;
		font-weight: 500;
		z-index: 9999;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
	}

	.toast--err {
		background: #991b1b;
		color: #fecaca;
	}
</style>
