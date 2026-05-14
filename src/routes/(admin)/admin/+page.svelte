<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>Admin — GA Tool</title></svelte:head>

<div style="max-width: 700px">
	<h1 style="font-size:1.5rem; font-weight:600; color:var(--text); margin:0 0 0.25rem">Admin</h1>
	<p style="color:var(--muted); margin:0 0 2rem">Eingeloggt als: {data.user.email}</p>

	<div class="card">
		<h2 style="font-size:1rem; font-weight:600; color:var(--text); margin:0 0 1rem">Bereich</h2>
		<p style="color:var(--muted); font-size:0.9375rem">
			Benutzerverwaltung, Content-Verwaltung und System-Infos folgen hier.
		</p>
	</div>
</div>
