import { describe, it, expect } from 'vitest';
import {
	kvsAus,
	anlagenwiderstand,
	kvBeiHub,
	betriebspunkt,
	betriebskennlinie,
	eigenkennlinie,
	verzerrung,
	beimischung,
	type Auslegung
} from './simulation';

/* Prüfung des Hydraulik-Modells.
 *
 * Hier stehen Zahlen, nach denen jemand ein Ventil aussucht. Sie müssen gegen
 * Handrechnung stimmen, nicht bloss plausibel aussehen — deshalb prüfen die
 * ersten Tests gegen von Hand nachgerechnete Werte und nicht gegen sich selbst.
 */

const basis = (x: Partial<Auslegung> = {}): Auslegung => ({
	q100: 2,
	dpGesamt: 50,
	autoritaet: 0.5,
	kennlinie: 'linear',
	pumpe: 'konstant',
	...x
});

describe('Auslegung', () => {
	it('Kvs stimmt mit der Handrechnung überein', () => {
		// Δp am Ventil = 0,5 · 50 kPa = 25 kPa = 0,25 bar
		// Kvs = Q / √Δp[bar] = 2 / √0,25 = 4
		expect(kvsAus(basis())).toBeCloseTo(4, 6);
	});

	it('halbe Autorität heisst halber Ventildruck, nicht halbes Kvs', () => {
		// 12,5 kPa → Kvs = 2/√0,125 = 5,657
		expect(kvsAus(basis({ autoritaet: 0.25 }))).toBeCloseTo(2 / Math.sqrt(0.125), 6);
	});

	it('bei Autorität 1 trägt der Kreis keinen Widerstand', () => {
		expect(anlagenwiderstand(basis({ autoritaet: 1 }))).toBe(0);
	});

	it('Anlagenwiderstand stimmt mit der Handrechnung überein', () => {
		// Δp Anlage = 25 kPa bei 2 m³/h → R = 25/4 = 6,25
		expect(anlagenwiderstand(basis())).toBeCloseTo(6.25, 6);
	});
});

describe('Eigenkennlinie des Ventils', () => {
	it('linear: halber Hub, halbes Kv', () => {
		const a = basis();
		expect(kvBeiHub(a, 0.5)).toBeCloseTo(kvsAus(a) / 2, 6);
	});

	it('gleichprozentig: gleicher Hubschritt, gleicher prozentualer Zuwachs', () => {
		// Das ist die Definition — und genau das prüfen wir, nicht eine Formel.
		const a = basis({ kennlinie: 'gleichprozentig', stellverhaeltnis: 25 });
		const v = [0.2, 0.4, 0.6, 0.8].map((h) => kvBeiHub(a, h));
		const faktoren = [v[1] / v[0], v[2] / v[1], v[3] / v[2]];
		for (const f of faktoren) expect(f).toBeCloseTo(faktoren[0], 6);
	});

	it('gleichprozentig: bei h = 1 ist Kv gleich Kvs', () => {
		const a = basis({ kennlinie: 'gleichprozentig' });
		expect(kvBeiHub(a, 1)).toBeCloseTo(kvsAus(a), 6);
	});

	it('gleichprozentig: bei h = 0 bleibt Kv0 = Kvs / Stellverhältnis', () => {
		const a = basis({ kennlinie: 'gleichprozentig', stellverhaeltnis: 50 });
		// Bei Hub 0 ist das Ventil zu — die Eigenkennlinie wird trotzdem bei
		// Kv0 abgeschnitten, sonst gäbe es kein Stellverhältnis.
		expect(kvBeiHub(a, 0.0001)).toBeCloseTo(kvsAus(a) / 50, 2);
	});

	it('geschlossen ist geschlossen', () => {
		expect(kvBeiHub(basis(), 0)).toBe(0);
		expect(betriebspunkt(basis(), 0).q).toBe(0);
	});
});

describe('Betriebspunkt', () => {
	it('bei vollem Hub steht der Auslegungsdurchfluss', () => {
		const p = betriebspunkt(basis(), 1);
		expect(p.q).toBeCloseTo(2, 6);
		expect(p.qRelativ).toBeCloseTo(1, 6);
	});

	it('die Druckanteile ergeben zusammen den Pumpendruck', () => {
		for (const h of [0.2, 0.5, 0.8, 1]) {
			const p = betriebspunkt(basis(), h);
			expect(p.dpVentil + p.dpAnlage).toBeCloseTo(p.dpPumpe, 6);
		}
	});

	it('im Auslegungspunkt teilt sich der Druck nach der Autorität', () => {
		const p = betriebspunkt(basis({ autoritaet: 0.3 }), 1);
		expect(p.dpVentil / (p.dpVentil + p.dpAnlage)).toBeCloseTo(0.3, 6);
	});

	it('schliessen verringert den Durchfluss und erhöht den Ventildruck', () => {
		const offen = betriebspunkt(basis(), 1);
		const halb = betriebspunkt(basis(), 0.5);
		expect(halb.q).toBeLessThan(offen.q);
		expect(halb.dpVentil).toBeGreaterThan(offen.dpVentil);
	});

	it('der Durchfluss steigt über den ganzen Hub monoton', () => {
		for (const kennlinie of ['linear', 'gleichprozentig'] as const) {
			const k = betriebskennlinie(basis({ kennlinie }), 25);
			for (let i = 1; i < k.length; i++) {
				expect(k[i].q, `${kennlinie} bei Hub ${k[i].hub}`).toBeGreaterThanOrEqual(k[i - 1].q);
			}
		}
	});
});

describe('Autorität — worum es eigentlich geht', () => {
	it('bei Autorität 1 folgt die Anlage der Eigenkennlinie', () => {
		// Ohne Fremdwiderstand ist erlebte gleich katalogisierte Kennlinie.
		const a = basis({ autoritaet: 1 });
		const betrieb = betriebskennlinie(a, 21);
		const eigen = eigenkennlinie(a, 21);
		for (let i = 0; i < betrieb.length; i++) {
			expect(betrieb[i].qRelativ).toBeCloseTo(eigen[i].kvRelativ, 6);
		}
	});

	it('ein lineares Ventil mit schwacher Autorität wird zum Auf-Zu-Ventil', () => {
		// Der klassische Befund: bei a = 0,1 sind bei halbem Hub schon fast
		// drei Viertel des Durchflusses da.
		const schwach = betriebspunkt(basis({ autoritaet: 0.1 }), 0.5);
		const gut = betriebspunkt(basis({ autoritaet: 1 }), 0.5);
		expect(schwach.qRelativ).toBeGreaterThan(0.7);
		expect(gut.qRelativ).toBeCloseTo(0.5, 2);
	});

	it('ein gleichprozentiges Ventil wird durch die Anlage linearisiert', () => {
		// Genau dafür ist es gedacht — deshalb sitzt es in Heizkreisen.
		const a = basis({ kennlinie: 'gleichprozentig', autoritaet: 0.5 });
		expect(verzerrung(a)).toBeLessThan(
			verzerrung(basis({ kennlinie: 'gleichprozentig', autoritaet: 1 }))
		);
	});

	it('schwächere Autorität verzerrt stärker', () => {
		const werte = [1, 0.5, 0.25, 0.1].map((autoritaet) => verzerrung(basis({ autoritaet })));
		for (let i = 1; i < werte.length; i++) expect(werte[i]).toBeGreaterThan(werte[i - 1]);
	});
});

describe('Pumpenart', () => {
	it('Proportionaldruck liefert bei kleinem Durchfluss weniger Druck', () => {
		const k = betriebspunkt(basis({ pumpe: 'konstant' }), 0.3);
		const p = betriebspunkt(basis({ pumpe: 'proportional' }), 0.3);
		expect(p.dpPumpe).toBeLessThan(k.dpPumpe);
		expect(p.q).toBeLessThan(k.q);
	});

	it('im Auslegungspunkt sind beide gleich', () => {
		const k = betriebspunkt(basis({ pumpe: 'konstant' }), 1);
		const p = betriebspunkt(basis({ pumpe: 'proportional' }), 1);
		expect(p.q).toBeCloseTo(k.q, 3);
	});
});

describe('Beimischschaltung', () => {
	it('ganz zu heisst Rücklauftemperatur, ganz auf heisst Vorlauftemperatur', () => {
		const a = basis();
		expect(beimischung(a, 0, 70, 40).tVorlauf).toBeCloseTo(40, 6);
		expect(beimischung(a, 1, 70, 40).tVorlauf).toBeCloseTo(70, 6);
	});

	it('die Temperatur bleibt zwischen Rücklauf und Vorlauf', () => {
		const a = basis({ kennlinie: 'gleichprozentig', autoritaet: 0.2 });
		for (let h = 0; h <= 1.0001; h += 0.1) {
			const t = beimischung(a, h, 70, 40).tVorlauf;
			expect(t).toBeGreaterThanOrEqual(40 - 1e-9);
			expect(t).toBeLessThanOrEqual(70 + 1e-9);
		}
	});

	it('schwache Autorität macht auch die Temperaturregelung nervös', () => {
		// Bei halbem Hub ist die Temperatur schon fast oben — dieselbe Ursache
		// wie beim Durchfluss, nur merkt man es hier am Raum.
		const schwach = beimischung(basis({ autoritaet: 0.1 }), 0.5, 70, 40).tVorlauf;
		const gut = beimischung(basis({ autoritaet: 1 }), 0.5, 70, 40).tVorlauf;
		expect(schwach).toBeGreaterThan(gut + 5);
	});
});
