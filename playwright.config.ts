import { defineConfig, devices } from '@playwright/test';

// Playwright E2E config. Tests in e2e/ benoetigen einen laufenden Dev-Server.
// `webServer` startet Vite automatisch fuer die Test-Session.
export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		locale: 'de-CH',
		timezoneId: 'Europe/Zurich'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
		stdout: 'ignore',
		stderr: 'pipe'
	}
});
