import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: 'logic',
					include: ['src/**/*.test.ts'],
					exclude: ['src/**/*.svelte.test.ts'],
					environment: 'node'
				}
			},
			{
				extends: true,
				test: {
					name: 'components',
					include: ['src/**/*.svelte.test.ts'],
					environment: 'jsdom',
					setupFiles: ['./src/test-setup.ts']
				}
			}
		]
	}
});
