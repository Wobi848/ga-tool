import { describe, it, expect, vi, beforeEach } from 'vitest';

/* Pruefung der Absenderermittlung.
 *
 * Sie entscheidet, gegen wen die Anmeldebremse zaehlt. Zwei Fehler waeren hier
 * teuer: glaubt sie der Kopfzeile zu leichtfertig, kann sich jeder eine
 * Adresse ausdenken und die Bremse umgehen. Glaubt sie ihr gar nicht, teilen
 * sich alle durch den Tunnel einen Topf — und fuenf falsche Versuche von
 * irgendwoher sperren den Besitzer aus.
 */

const PROXY = '192.168.178.2';

function ereignis(direkt: string, xff?: string) {
	return {
		getClientAddress: () => direkt,
		request: new Request('http://x/', { headers: xff ? { 'x-forwarded-for': xff } : {} })
	};
}

async function laden(vertraut?: string) {
	vi.resetModules();
	vi.doMock('$env/dynamic/private', () => ({
		env: vertraut === undefined ? {} : { VERTRAUTER_PROXY: vertraut }
	}));
	return (await import('./clientIp')).clientIp;
}

beforeEach(() => vi.resetModules());

describe('ohne vertrauten Proxy', () => {
	it('nimmt die direkte Adresse', async () => {
		const clientIp = await laden();
		expect(clientIp(ereignis('203.0.113.9'))).toBe('203.0.113.9');
	});

	it('ignoriert eine mitgeschickte Kopfzeile', async () => {
		// Sonst koennte sich jeder eine Absenderadresse ausdenken.
		const clientIp = await laden();
		expect(clientIp(ereignis('203.0.113.9', '1.2.3.4'))).toBe('203.0.113.9');
	});
});

describe('mit vertrautem Proxy', () => {
	it('nimmt die Kopfzeile, wenn die Anfrage vom Tunnel kommt', async () => {
		const clientIp = await laden(PROXY);
		expect(clientIp(ereignis(PROXY, '100.64.0.7'))).toBe('100.64.0.7');
	});

	it('glaubt der Kopfzeile nicht, wenn die Anfrage woanders herkommt', async () => {
		// Der entscheidende Fall: ein Gerät im LAN behauptet, der Tunnel zu sein.
		const clientIp = await laden(PROXY);
		expect(clientIp(ereignis('192.168.178.99', '100.64.0.7'))).toBe('192.168.178.99');
	});

	it('nimmt den letzten Eintrag der Kette', async () => {
		// Alles davor kann der Aufrufer selbst geschrieben haben; den letzten
		// setzt unser eigener Tunnel.
		const clientIp = await laden(PROXY);
		expect(clientIp(ereignis(PROXY, '1.2.3.4, 5.6.7.8, 100.64.0.7'))).toBe('100.64.0.7');
	});

	it('faellt ohne Kopfzeile auf die direkte Adresse zurueck', async () => {
		// Direkter Aufruf im LAN — genau der Fall, an dem ADDRESS_HEADER
		// geworfen haette.
		const clientIp = await laden(PROXY);
		expect(clientIp(ereignis(PROXY))).toBe(PROXY);
	});

	it('kommt mit einer leeren Kopfzeile zurecht', async () => {
		const clientIp = await laden(PROXY);
		expect(clientIp(ereignis(PROXY, '   '))).toBe(PROXY);
	});
});
