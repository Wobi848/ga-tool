import { describe, it, expect, beforeEach } from 'vitest';
import { PIDSim, fmt } from './simulation.svelte.js';

/* Tests der PID-Regelstrecke.
 *
 * Angetrieben wird ueber `advance()` statt `start()`: der RAF-Loop laesst sich
 * ausserhalb eines Browsers nicht takten, und die Regellogik soll ohnehin ohne
 * Bildschirm pruefbar sein.
 *
 * Konventionen der Simulation, die hier geprueft werden:
 *   Kp = 100 / Xp          Xp ist der Proportionalbereich in PV-Einheit
 *   heizen  = invers       PV ueber SP  ->  Y schliesst
 *   kuehlen = direkt       PV ueber SP  ->  Y oeffnet
 *   Strecke = PT1 + Totzeit, Euler-Integration mit festem dt
 */

/** Regler ohne I- und D-Anteil, ohne Totzeit — isoliert den P-Anteil. */
function nurP(overrides: Record<string, unknown> = {}) {
	const s = new PIDSim();
	s.running = false;
	s.tn = 0; // I aus
	s.tv = 0; // D aus
	s.tt = 0; // keine Totzeit
	Object.assign(s, overrides);
	s.reset(0);
	return s;
}

describe('fmt', () => {
	it('rundet auf die gewuenschte Stellenzahl', () => {
		expect(fmt(1.239, 2)).toBe('1.24');
		expect(fmt(1.231, 2)).toBe('1.23');
		expect(fmt(5, 0)).toBe('5');
	});

	it('faengt nicht-endliche Werte ab statt NaN anzuzeigen', () => {
		expect(fmt(NaN)).toBe('—');
		expect(fmt(Infinity)).toBe('—');
		expect(fmt(-Infinity)).toBe('—');
	});
});

describe('P-Anteil', () => {
	it('Kp ergibt sich aus 100/Xp', () => {
		// Xp = 100 -> Kp = 1. Abweichung 5 K -> Y = 5 %.
		const s = nurP({ xp: 100, sp: 5, ks: 0 }); // ks=0: Strecke reagiert nicht
		s.advance(0.05);
		expect(s.display.y).toBeCloseTo(5, 1);
	});

	it('kleineres Xp verstaerkt', () => {
		// Xp = 10 -> Kp = 10. Dieselbe Abweichung von 5 K ergibt Y = 50 %,
		// also das Zehnfache des Xp-100-Falls oben.
		const s = nurP({ xp: 10, sp: 5, ks: 0 });
		s.advance(0.05);
		expect(s.display.y).toBeCloseTo(50, 1);

		const schwach = nurP({ xp: 100, sp: 5, ks: 0 });
		schwach.advance(0.05);
		expect(s.display.y).toBeGreaterThan(schwach.display.y);
	});

	it('Stellgroesse bleibt zwischen 0 und 100', () => {
		const hoch = nurP({ xp: 1, sp: 50, ks: 0 });
		hoch.advance(0.05);
		expect(hoch.display.y).toBeLessThanOrEqual(100);

		const tief = nurP({ xp: 1, sp: -50, ks: 0 });
		tief.advance(0.05);
		expect(tief.display.y).toBeGreaterThanOrEqual(0);
	});
});

describe('Wirkrichtung', () => {
	it('heizen ist invers — PV unter SP oeffnet', () => {
		const s = nurP({ mode: 'heizen', xp: 100, sp: 10, ks: 0 });
		s.advance(0.05);
		expect(s.display.y).toBeGreaterThan(0);
	});

	it('heizen — PV ueber SP schliesst', () => {
		const s = nurP({ mode: 'heizen', xp: 100, sp: 10, ks: 0 });
		s.sim.y = 20; // PV zehn Kelvin ueber Sollwert
		s.advance(0.05);
		expect(s.display.y).toBe(0);
	});

	it('kuehlen ist direkt — PV ueber SP oeffnet', () => {
		const s = nurP({ mode: 'kuehlen', xp: 100, sp: 10, ks: 0 });
		s.sim.y = 20;
		s.advance(0.05);
		expect(s.display.y).toBeGreaterThan(0);
	});

	it('kuehlen — PV unter SP schliesst', () => {
		const s = nurP({ mode: 'kuehlen', xp: 100, sp: 10, ks: 0 });
		s.sim.y = 0;
		s.advance(0.05);
		expect(s.display.y).toBe(0);
	});
});

describe('I-Anteil und Anti-Windup', () => {
	it('Tn = 0 schaltet den I-Anteil ab', () => {
		const s = nurP({ xp: 100, tn: 0, sp: 2, ks: 0 });
		s.advance(60);
		expect(s.display.i).toBe(0);
		expect(s.sim.integral).toBe(0);
	});

	it('I-Anteil raeumt die bleibende Regelabweichung aus', () => {
		const s = new PIDSim();
		s.running = false;
		Object.assign(s, { xp: 20, tn: 30, tv: 0, tt: 0, t1: 10, ks: 0.3, sp: 20 });
		s.reset(0);
		s.advance(1200);
		// Ohne I bliebe bei Ks=0.3 und Y<=100 eine deutliche Abweichung stehen.
		expect(Math.abs(s.display.e)).toBeLessThan(0.5);
	});

	it('Anti-Windup laesst das Integral bei Saettigung nicht weiterlaufen', () => {
		// Unerreichbarer Sollwert: Y bleibt bei 100 %, das Integral duerfte
		// ohne Schutz unbegrenzt wachsen.
		const s = new PIDSim();
		s.running = false;
		Object.assign(s, { xp: 10, tn: 20, tv: 0, tt: 0, t1: 10, ks: 0.05, sp: 200 });
		s.reset(0);
		s.advance(120);
		const nach120 = s.sim.integral;
		s.advance(120);
		const nach240 = s.sim.integral;
		expect(s.display.sat).toBe(true);
		expect(nach240).toBeCloseTo(nach120, 6);
	});

	it('das Integral baut sich ab, wenn die Abweichung das Vorzeichen wechselt', () => {
		// Erst mit erreichbarem Sollwert ein positives Integral aufbauen —
		// bei Saettigung von Anfang an bliebe es wegen Anti-Windup bei 0,
		// und dann waere nichts abzubauen.
		const s = new PIDSim();
		s.running = false;
		Object.assign(s, { xp: 20, tn: 30, tv: 0, tt: 0, t1: 10, ks: 0.3, sp: 15 });
		s.reset(0);
		s.advance(300);
		const aufgebaut = s.sim.integral;
		expect(aufgebaut).toBeGreaterThan(0);

		s.sp = 0; // Sollwert unter den Istwert -> Abweichung kehrt sich um
		s.advance(300);
		expect(s.sim.integral).toBeLessThan(aufgebaut);
	});
});

describe('Strecke: PT1 und Totzeit', () => {
	it('ohne Totzeit reagiert die Strecke sofort', () => {
		const s = nurP({ xp: 100, sp: 10, tt: 0, t1: 10, ks: 0.5 });
		s.advance(1);
		expect(s.display.pv).toBeGreaterThan(0);
	});

	it('mit Totzeit bleibt die Strecke zunaechst stehen', () => {
		const s = nurP({ xp: 100, sp: 10, tt: 10, t1: 10, ks: 0.5 });
		s.advance(5); // halbe Totzeit
		expect(s.display.pv).toBeCloseTo(0, 6);
		s.advance(20); // deutlich nach der Totzeit
		expect(s.display.pv).toBeGreaterThan(0);
	});

	it('PT1 erreicht nach einer Zeitkonstante rund 63 Prozent', () => {
		// Regler auf Anschlag, damit die Stellgroesse konstant 100 % ist:
		// Endwert = Ks · 100 = 30. Nach T1 sollten es ~63 % davon sein.
		const s = nurP({ xp: 0.1, sp: 1000, tt: 0, t1: 60, ks: 0.3 });
		s.advance(60);
		const endwert = 0.3 * 100;
		expect(s.display.pv / endwert).toBeGreaterThan(0.55);
		expect(s.display.pv / endwert).toBeLessThan(0.7);
	});
});

describe('Sollwert-Automatik', () => {
	it('wechselt zwischen Tag- und Nachtwert', () => {
		const s = nurP({ xp: 100, ks: 0 });
		Object.assign(s, {
			spAutoActive: true,
			spAutoHigh: 22,
			spAutoLow: 18,
			spAutoPeriod: 100
		});
		s.reset(0);
		s.advance(10); // erste Haelfte der Periode
		expect(s.display.sp).toBe(22);
		s.advance(50); // ueber die Haelfte hinaus
		expect(s.display.sp).toBe(18);
	});

	it('ohne Automatik bleibt der Basissollwert stehen', () => {
		const s = nurP({ xp: 100, sp: 21, ks: 0 });
		s.advance(500);
		expect(s.display.sp).toBe(21);
	});
});

describe('Stoerung', () => {
	it('eine Stoerung verschiebt die Regelgroesse', () => {
		const s = nurP({ xp: 100, sp: 0, tt: 0, t1: 5, ks: 0 });
		s.applyDisturbance(10);
		s.advance(30);
		expect(s.display.pv).toBeGreaterThan(5);
	});

	it('clearDisturbance nimmt sie zurueck', () => {
		const s = nurP({ xp: 100, sp: 0, tt: 0, t1: 5, ks: 0 });
		s.applyDisturbance(10);
		s.advance(30);
		s.clearDisturbance();
		s.advance(60);
		expect(s.display.pv).toBeCloseTo(0, 1);
	});
});

describe('reset und Presets', () => {
	let s: InstanceType<typeof PIDSim>;
	beforeEach(() => {
		s = new PIDSim();
		s.running = false;
	});

	it('reset setzt Zeit, Integral und Verlauf zurueck', () => {
		Object.assign(s, { xp: 10, tn: 30, tt: 0, ks: 0.3, sp: 20 });
		s.reset(0);
		s.advance(60);
		expect(s.sim.t).toBeGreaterThan(0);
		s.reset(0);
		expect(s.sim.t).toBe(0);
		expect(s.sim.integral).toBe(0);
		expect(s.sim.history).toHaveLength(0);
	});

	it('reset uebernimmt den Startwert als Umgebungswert', () => {
		s.reset(15);
		expect(s.sim.y).toBe(15);
		expect(s.sim.yAmb).toBe(15);
	});

	it('loadPreset setzt die Reglerparameter', () => {
		s.loadPreset('raum-heizung');
		expect(s.xp).toBeGreaterThan(0);
		expect(s.mode).toBe('heizen');
	});

	it('ein unbekanntes Preset kippt die Simulation nicht', () => {
		expect(() => s.loadPreset('gibt-es-nicht')).not.toThrow();
		expect(Number.isFinite(s.xp)).toBe(true);
	});
});

describe('Verlauf', () => {
	it('wird auf etwa 0.2 s abgetastet, nicht bei jedem Schritt', () => {
		const s = nurP({ xp: 100, sp: 10, ks: 0.3, t1: 10 });
		s.advance(10); // 200 Schritte bei dt = 0.05
		expect(s.sim.history.length).toBeGreaterThan(30);
		expect(s.sim.history.length).toBeLessThan(80);
	});

	it('jeder Punkt traegt Zeit, Sollwert, Istwert und Stellgroesse', () => {
		const s = nurP({ xp: 100, sp: 10, ks: 0.3, t1: 10 });
		s.advance(5);
		const p = s.sim.history[0];
		expect(p).toHaveProperty('t');
		expect(p).toHaveProperty('sp');
		expect(p).toHaveProperty('pv');
		expect(p).toHaveProperty('u');
		expect(p).toHaveProperty('sat');
	});
});

describe('Status im Display', () => {
	it('meldet Saettigung, wenn die Stellgroesse am Anschlag steht', () => {
		const s = nurP({ xp: 1, sp: 500, ks: 0.01, t1: 10 });
		s.advance(1);
		expect(s.display.sat).toBe(true);
		expect(s.display.status).toBe('saturated');
	});

	it('meldet eingeschwungen, wenn die Abweichung klein ist', () => {
		const s = new PIDSim();
		s.running = false;
		Object.assign(s, { xp: 20, tn: 30, tv: 0, tt: 0, t1: 10, ks: 0.3, sp: 20 });
		s.reset(0);
		s.advance(1800);
		expect(s.display.status).toBe('settled');
	});
});
