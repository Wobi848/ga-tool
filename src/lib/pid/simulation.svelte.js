/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck — Interne sim-Variablen sind absichtlich nicht reaktiv
//               (RAF-Loop mutiert mit hoher Frequenz). Volle TS-Pruefung
//               wuerde noisy implicit-any/never[]-Fehler erzwingen ohne
//               echten Nutzen — Logik ist via Tests abgedeckt.

/* PID-Regler-Simulation als Svelte-5-Klasse mit Runes.
 *
 * Reaktive Felder (xp, tn, tv, sp, …) per `$state`.
 * Interne Sim-Variablen (sim.t, sim.y, deadBuf, history) sind absichtlich
 * NICHT reaktiv — sie werden im RAF-Loop mit hoher Frequenz mutiert,
 * jede Mutation würde sonst Re-Renders auslösen. Stattdessen wird ein
 * gedrosselter `display`-Snapshot ca. alle 80 ms aktualisiert; das Chart
 * liest direkt aus `sim.history` per Canvas-Draw.
 *
 * Konventionen (gemäss HVAC/MSRL-Standard):
 *   • Xp ist Proportionalbereich in PV-Einheit (K bei °C-Regelung)
 *   • Tn, Tv in Sekunden
 *   • Wirkrichtung: 'heizen' (invers — PV↑ ⇒ Y↓) | 'kuehlen' (direkt)
 *   • Anti-Windup per Conditional Integration
 */

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export class PIDSim {
	// ── Regler-Parameter (HVAC-typische Defaults) ───────────────────
	xp = $state(10); // Proportionalbereich in PV-Einheit (K bei °C)
	tn = $state(300); // Nachstellzeit s    (0 = I aus)
	tv = $state(0); // Vorhaltzeit  s     (0 = D aus, HVAC-Standard)
	sp = $state(21); // Sollwert (Basis)
	unit = $state('°C');
	mode = $state('heizen'); // 'heizen' (invers) | 'kuehlen' (direkt)

	// ── Streckenmodell ──────────────────────────────────────────────
	tt = $state(5); // Totzeit s
	t1 = $state(120); // Zeitkonstante s
	ks = $state(0.3); // Streckenverstärkung [Einheit / %]

	// ── Manuelle Störung ────────────────────────────────────────────
	distStep = $state(15);

	// ── Auto-Störgrösse ─────────────────────────────────────────────
	autoDistActive = $state(false);
	autoDistAmp = $state(3); // Amplitude in PV-Einheit
	autoDistPeriod = $state(60); // Periode in Sim-Sekunden
	autoDistType = $state('sin'); // 'sin' | 'square' | 'noise'
	autoDistTc = $state(0); // PT1-Zeitkonstante der Störgrösse (0 = kein Filter)
	autoDistBias = $state(0); // Statischer Offset (DC-Anteil)

	// ── SP-Automatik (Tag/Nacht) ────────────────────────────────────
	spAutoActive = $state(false);
	spAutoHigh = $state(22); // Tagwert
	spAutoLow = $state(18); // Nachtwert / Absenkwert
	spAutoPeriod = $state(300); // Wechselperiode in Sim-Sekunden

	// ── Sim-Steuerung ───────────────────────────────────────────────
	speed = $state(10); // Zeitraffer
	winSec = $state(300); // Sichtfenster s
	running = $state(true);

	// ── Display (gedrosselt) ────────────────────────────────────────
	display = $state({
		pv: 0,
		y: 0,
		e: 0,
		p: 0,
		i: 0,
		d: 0,
		t: 0,
		sp: 21,
		status: 'init',
		sat: false,
		dist: 0,
		autoDist: 0
	});

	// ── interne Sim (nicht reaktiv) ─────────────────────────────────
	sim = {
		t: 0,
		y: 0,
		integral: 0,
		prevError: 0,
		deadBuf: [],
		dist: 0,
		pTerm: 0,
		iTerm: 0,
		dTerm: 0,
		u: 0,
		history: [],
		yAmb: 0,
		autoDistVal: 0,
		autoDistFiltered: 0,
		spEff: 21
	};

	#raf = null;
	#lastTime = 0;
	#dispAcc = 0;

	start() {
		if (this.#raf != null) return;
		this.#lastTime = performance.now();
		const loop = (now) => {
			const realDt = Math.min(0.1, (now - this.#lastTime) / 1000);
			this.#lastTime = now;
			const simDt = realDt * this.speed;
			const dt = 0.05;
			const steps = clamp(Math.floor(simDt / dt), 1, 4000);
			for (let i = 0; i < steps; i++) this.#step(dt);

			this.#dispAcc += realDt;
			if (this.#dispAcc > 0.08) {
				this.#dispAcc = 0;
				this.#commitDisplay();
			}

			if (this.running) this.#raf = requestAnimationFrame(loop);
			else this.#raf = null;
		};
		this.#raf = requestAnimationFrame(loop);
	}

	stop() {
		if (this.#raf != null) {
			cancelAnimationFrame(this.#raf);
			this.#raf = null;
		}
	}

	reset(initY = 0) {
		this.stop();
		this.sim = {
			t: 0,
			y: initY,
			integral: 0,
			prevError: 0,
			deadBuf: [],
			dist: 0,
			pTerm: 0,
			iTerm: 0,
			dTerm: 0,
			u: 0,
			history: [],
			yAmb: initY,
			autoDistVal: 0,
			autoDistFiltered: 0,
			spEff: this.sp
		};
		this.display = {
			pv: initY,
			y: 0,
			e: 0,
			p: 0,
			i: 0,
			d: 0,
			t: 0,
			sp: this.sp,
			status: 'init',
			sat: false,
			dist: 0,
			autoDist: 0
		};
		if (this.running) this.start();
	}

	applyDisturbance(delta) {
		this.sim.dist += delta;
	}
	clearDisturbance() {
		this.sim.dist = 0;
	}

	/** HVAC-Presets. Schlüssel: 'raum-heizung' | 'vorlauf' | 'kaelte'
	 *  | 'druck' | 'feuchte' | 'pid-demo' */
	loadPreset(name = 'raum-heizung') {
		const P = {
			'raum-heizung': {
				mode: 'heizen',
				unit: '°C',
				xp: 3,
				tn: 600,
				tv: 0,
				sp: 21,
				ks: 0.25,
				tt: 20,
				t1: 300,
				y0: 15
			},
			vorlauf: {
				mode: 'heizen',
				unit: '°C',
				xp: 8,
				tn: 300,
				tv: 0,
				sp: 55,
				ks: 0.7,
				tt: 8,
				t1: 90,
				y0: 35
			},
			kaelte: {
				mode: 'kuehlen',
				unit: '°C',
				xp: 20,
				tn: 420,
				tv: 0,
				sp: 19,
				ks: 0.3,
				tt: 15,
				t1: 180,
				y0: 25
			},
			druck: {
				mode: 'heizen',
				unit: 'Pa',
				xp: 10,
				tn: 120,
				tv: 0,
				sp: 50,
				ks: 0.8,
				tt: 2,
				t1: 15,
				y0: 20
			},
			feuchte: {
				mode: 'heizen',
				unit: '%rH',
				xp: 15,
				tn: 600,
				tv: 0,
				sp: 45,
				ks: 0.5,
				tt: 20,
				t1: 240,
				y0: 30
			},
			'pid-demo': {
				mode: 'heizen',
				unit: '°C',
				xp: 5,
				tn: 180,
				tv: 30,
				sp: 22,
				ks: 0.4,
				tt: 8,
				t1: 90,
				y0: 15
			}
		}[name];
		if (!P) return;
		this.mode = P.mode;
		this.unit = P.unit;
		this.xp = P.xp;
		this.tn = P.tn;
		this.tv = P.tv;
		this.sp = P.sp;
		this.ks = P.ks;
		this.tt = P.tt;
		this.t1 = P.t1;
		this.reset(P.y0);
	}

	// ── Ein Simulationsschritt (Euler, Δt fix) ──────────────────────
	#step(dt) {
		const s = this.sim;

		// SP-Automatik: Wechsel zwischen Tag- und Nachtwert
		if (this.spAutoActive) {
			const phase = s.t % Math.max(1, this.spAutoPeriod);
			s.spEff = phase < this.spAutoPeriod / 2 ? this.spAutoHigh : this.spAutoLow;
		} else {
			s.spEff = this.sp;
		}

		// Anzeige-Abweichung (W − X)
		const e = s.spEff - s.y;
		// Effektive Abweichung mit Wirkrichtung:
		//   Heizen  (invers): PV über SP → Y schliesst   (eEff =  e)
		//   Kühlen  (direkt): PV über SP → Y öffnet      (eEff = −e)
		const eEff = this.mode === 'kuehlen' ? -e : e;
		const kp = 100 / Math.max(0.1, this.xp);

		const pTerm = kp * eEff;
		const newIntegral = s.integral + eEff * dt;
		const iTerm0 = this.tn > 0 ? (kp / this.tn) * newIntegral : 0;
		const dTerm = this.tv > 0 ? (kp * this.tv * (eEff - s.prevError)) / dt : 0;
		const uRaw = pTerm + iTerm0 + dTerm;
		const u = clamp(uRaw, 0, 100);

		// Anti-Windup: Conditional Integration
		if (this.tn > 0) {
			const wouldWindUp = (uRaw > 100 && eEff > 0) || (uRaw < 0 && eEff < 0);
			if (!wouldWindUp) s.integral = newIntegral;
		} else {
			s.integral = 0;
		}
		const iTerm = this.tn > 0 ? (kp / this.tn) * s.integral : 0;

		s.pTerm = pTerm;
		s.iTerm = iTerm;
		s.dTerm = dTerm;
		s.u = u;
		s.prevError = eEff;

		// Strecke: PT1 + Totzeit
		s.deadBuf.push(u);
		const bufSize = Math.max(1, Math.floor(this.tt / dt));
		let uDel = 0;
		if (s.deadBuf.length > bufSize) uDel = s.deadBuf.shift();

		// Auto-Störgrösse: Waveform → PT1-Filter → Strecke
		if (this.autoDistActive) {
			const f = (2 * Math.PI) / Math.max(1, this.autoDistPeriod);
			let raw;
			if (this.autoDistType === 'sin') {
				raw = this.autoDistAmp * Math.sin(f * s.t);
			} else if (this.autoDistType === 'square') {
				raw = Math.sin(f * s.t) >= 0 ? this.autoDistAmp : -this.autoDistAmp;
			} else {
				// Rauschen: begrenzter Random Walk
				s.autoDistVal += (Math.random() - 0.5) * this.autoDistAmp * 0.04;
				s.autoDistVal = clamp(s.autoDistVal, -this.autoDistAmp, this.autoDistAmp);
				raw = s.autoDistVal;
			}
			const target = raw + this.autoDistBias;
			// PT1-Filter auf Störsignal (Tc = 0 → kein Filter)
			if (this.autoDistTc > 0.5) {
				s.autoDistFiltered += ((target - s.autoDistFiltered) / this.autoDistTc) * dt;
			} else {
				s.autoDistFiltered = target;
			}
		} else {
			s.autoDistVal = 0;
			s.autoDistFiltered = 0;
		}

		const T1 = Math.max(0.5, this.t1);
		// Kühlregelung: Gleichgewicht bei Y=0 ist yAmb, Kühlung senkt Temp.
		// Heizregelung: Gleichgewicht bei Y=0 ist 0 (Aussentemperatur).
		const yEquil = this.mode === 'kuehlen' ? s.yAmb - this.ks * uDel : this.ks * uDel;
		const dy = (yEquil + s.dist + s.autoDistFiltered - s.y) / T1;
		s.y += dy * dt;
		s.t += dt;

		// History (abgetastet auf 0.2 s)
		const last = s.history.length ? s.history[s.history.length - 1] : null;
		if (!last || s.t - last.t >= 0.2) {
			s.history.push({
				t: s.t,
				sp: s.spEff,
				pv: s.y,
				u,
				sat: u <= 0.01 || u >= 99.99
			});
			const cutoff = s.t - this.winSec - 30;
			while (s.history.length && s.history[0].t < cutoff) s.history.shift();
		}
	}

	#commitDisplay() {
		const s = this.sim;
		const e = s.spEff - s.y;
		const sat = s.u <= 0.05 || s.u >= 99.95;
		let status = 'deviation';
		if (Math.abs(e) < 0.3 && Math.abs(s.pTerm + s.dTerm) < 1.0) status = 'settled';
		if (sat) status = 'saturated';
		this.display = {
			pv: s.y,
			y: s.u,
			e,
			p: s.pTerm,
			i: s.iTerm,
			d: s.dTerm,
			t: s.t,
			sp: s.spEff,
			status,
			sat,
			dist: s.dist,
			autoDist: s.autoDistFiltered
		};
	}
}

// ── Format-Helper ─────────────────────────────────────────────────
export function fmt(v, d = 2) {
	if (!isFinite(v)) return '—';
	const f = Math.pow(10, d);
	return (Math.round(v * f) / f).toFixed(d);
}
