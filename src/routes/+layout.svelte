<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { setupI18n } from '$lib/i18n';

	let { children } = $props();

	onMount(() => {
		setupI18n();
	});

	// Apply theme to <html> whenever it changes
	$effect(() => {
		document.documentElement.setAttribute('data-theme', $theme);
	});
</script>

{@render children()}
