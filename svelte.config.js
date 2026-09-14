import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		/* Inhaltsrichtlinie. Seit dem 14.09.2026 steht das Portal oeffentlich.
		 *
		 * Moeglich ist die strenge Fassung nur, weil seit v0.10.0 nichts mehr
		 * von fremden Servern geladen wird — die Schriften kamen vorher von
		 * fonts.googleapis.com und haetten hier eine Ausnahme erzwungen.
		 *
		 * `mode: 'auto'` laesst SvelteKit die Nonces und Hashes fuer die eigenen
		 * Skripte setzen. Das Themen-Skript in app.html traegt darum
		 * `nonce="%sveltekit.nonce%"`.
		 */
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				// Svelte und Tailwind setzen Stile zur Laufzeit direkt am Element;
				// ohne 'unsafe-inline' bliebe die Seite ungestaltet. Fuer Stile ist
				// das deutlich weniger heikel als fuer Skripte.
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'connect-src': ['self'],
				'worker-src': ['self'],
				'manifest-src': ['self'],
				// Nicht in fremde Rahmen einbetten lassen.
				'frame-ancestors': ['none'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'object-src': ['none']
			}
		},
		typescript: {
			config: (config) => ({
				...config,
				include: [...config.include, '../drizzle.config.ts']
			})
		}
	}
};

export default config;
