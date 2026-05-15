import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: { enabled: false },
			manifest: {
				name: 'GA Tool',
				short_name: 'GA Tool',
				description: 'Die GA-Referenz für den Alltag — Konverter, Rechner, Wissensbasis',
				theme_color: '#7c3aed',
				background_color: '#1e1e2e',
				display: 'standalone',
				orientation: 'portrait-primary',
				start_url: '/',
				scope: '/',
				lang: 'de',
				icons: [
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				],
				categories: ['utilities', 'productivity'],
				shortcuts: [
					{
						name: 'Konverter',
						url: '/konverter',
						description: 'Einheiten konvertieren'
					},
					{
						name: 'Rechner',
						url: '/rechner',
						description: 'Technische Rechner'
					},
					{
						name: 'Checklisten',
						url: '/checklisten',
						description: 'IBN & Übergabe-Checklisten'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				navigateFallback: null,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
							cacheableResponse: { statuses: [0, 200] }
						}
					},
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'pages-cache',
							expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
							networkTimeoutSeconds: 3,
							cacheableResponse: { statuses: [0, 200] }
						}
					}
				]
			}
		})
	]
});
