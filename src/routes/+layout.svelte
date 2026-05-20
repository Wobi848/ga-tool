<script lang="ts">
	import './layout.css';
	import { theme } from '$lib/stores/theme';
	import { locale } from '$lib/i18n';

	let { children, data } = $props();

	// Set locale from cookie (server-readable) before first render — prevents flash
	locale.set(data.lang);

	// Apply theme to <html> whenever it changes
	$effect(() => {
		document.documentElement.setAttribute('data-theme', $theme);
	});
</script>

{@render children()}
