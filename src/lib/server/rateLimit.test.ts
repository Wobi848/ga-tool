import { describe, it, expect, beforeEach, vi } from 'vitest';

// Re-import module fresh each test to reset the in-memory store
let rateLimit: (key: string, max: number, windowMs: number) => boolean;

beforeEach(async () => {
	vi.resetModules();
	({ rateLimit } = await import('./rateLimit.js'));
});

describe('rateLimit', () => {
	it('allows first request', () => {
		expect(rateLimit('test', 3, 60_000)).toBe(true);
	});

	it('allows up to max requests', () => {
		expect(rateLimit('k', 3, 60_000)).toBe(true);
		expect(rateLimit('k', 3, 60_000)).toBe(true);
		expect(rateLimit('k', 3, 60_000)).toBe(true);
	});

	it('blocks request exceeding limit', () => {
		rateLimit('k', 2, 60_000);
		rateLimit('k', 2, 60_000);
		expect(rateLimit('k', 2, 60_000)).toBe(false);
	});

	it('resets after window expires', () => {
		vi.useFakeTimers();
		rateLimit('k', 1, 5_000);
		expect(rateLimit('k', 1, 5_000)).toBe(false);

		vi.advanceTimersByTime(5_001);
		expect(rateLimit('k', 1, 5_000)).toBe(true);
		vi.useRealTimers();
	});

	it('isolates different keys', () => {
		rateLimit('a', 1, 60_000);
		expect(rateLimit('a', 1, 60_000)).toBe(false);
		expect(rateLimit('b', 1, 60_000)).toBe(true);
	});
});
