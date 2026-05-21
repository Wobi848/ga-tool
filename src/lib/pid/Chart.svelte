<script>
	// @ts-nocheck
	/* Canvas-Chart für PID-Simulation. Liest direkt aus sim.sim.history per
     RAF — keine Svelte-Reaktivität im Hot Path, dafür 60 fps. */

	let { sim } = $props();

	let canvas;

	// Farben: neutral-dunkle Basis (kein Blau-Cast), Signal-Farben ans ga-tool
	const COLORS = {
		bg: '#0a0e12',
		panel: '#11171d',
		grid: '#1a232c',
		gridHi: '#243038',
		border: '#2e3a46',
		dim: '#6b7d8a',
		dimmer: '#45525d',
		sp: '#38bdf8', // sky-400   — Sollwert
		pv: '#4ade80', // green-400 — Istwert
		y: '#fb923c' // orange-400 — Stellgrösse
	};

	function fmt(v, d = 2) {
		if (!isFinite(v)) return '—';
		const f = Math.pow(10, d);
		return (Math.round(v * f) / f).toFixed(d);
	}

	function niceTicks(min, max, n) {
		if (!isFinite(min) || !isFinite(max) || max <= min) return [min, max];
		const range = max - min;
		const step0 = range / Math.max(1, n);
		const mag = Math.pow(10, Math.floor(Math.log10(step0)));
		const norm = step0 / mag;
		let step;
		if (norm < 1.5) step = 1 * mag;
		else if (norm < 3.0) step = 2 * mag;
		else if (norm < 7.0) step = 5 * mag;
		else step = 10 * mag;
		const start = Math.ceil(min / step) * step;
		const out = [];
		for (let v = start; v <= max + 1e-9; v += step) out.push(v);
		return out;
	}

	function draw() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		if (
			canvas.width !== Math.floor(rect.width * dpr) ||
			canvas.height !== Math.floor(rect.height * dpr)
		) {
			canvas.width = Math.floor(rect.width * dpr);
			canvas.height = Math.floor(rect.height * dpr);
		}
		const W = rect.width,
			H = rect.height;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = COLORS.panel;
		ctx.fillRect(0, 0, W, H);

		const pad = { top: 16, right: 58, bottom: 28, left: 58 };
		const cw = Math.max(10, W - pad.left - pad.right);
		const ch = Math.max(10, H - pad.top - pad.bottom);

		const s = sim.sim;
		const winSec = sim.winSec;
		const tMax = Math.max(s.t, winSec * 0.01);
		const tMin = Math.max(0, tMax - winSec);

		let yMin = Infinity,
			yMax = -Infinity;
		let hasData = false;
		for (const p of s.history) {
			if (p.t < tMin) continue;
			hasData = true;
			if (p.sp < yMin) yMin = p.sp;
			if (p.sp > yMax) yMax = p.sp;
			if (p.pv < yMin) yMin = p.pv;
			if (p.pv > yMax) yMax = p.pv;
			if (p.u < yMin) yMin = p.u;
			if (p.u > yMax) yMax = p.u;
		}
		if (!hasData) {
			yMin = Math.min(0, sim.sp - 10);
			yMax = Math.max(100, sim.sp + 10);
		}
		if (yMax - yMin < 10) {
			const c = (yMin + yMax) / 2;
			yMin = c - 5;
			yMax = c + 5;
		}
		const yPad = (yMax - yMin) * 0.08;
		yMin -= yPad;
		yMax += yPad;

		const xFor = (t) => pad.left + (cw * (t - tMin)) / (tMax - tMin || 1);
		const yFor = (v) => pad.top + ch * (1 - (v - yMin) / (yMax - yMin || 1));

		ctx.font = '11px ui-monospace, "JetBrains Mono", monospace';
		ctx.lineWidth = 1;

		const yTicks = niceTicks(yMin, yMax, 6);
		ctx.strokeStyle = COLORS.grid;
		yTicks.forEach((yt) => {
			const py = Math.round(yFor(yt)) + 0.5;
			ctx.beginPath();
			ctx.moveTo(pad.left, py);
			ctx.lineTo(pad.left + cw, py);
			ctx.stroke();
		});
		const xTicks = niceTicks(tMin, tMax, 8);
		xTicks.forEach((xt) => {
			const px = Math.round(xFor(xt)) + 0.5;
			ctx.beginPath();
			ctx.moveTo(px, pad.top);
			ctx.lineTo(px, pad.top + ch);
			ctx.stroke();
		});

		ctx.fillStyle = COLORS.dim;
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		yTicks.forEach((yt) =>
			ctx.fillText(fmt(yt, Math.abs(yt) >= 100 ? 0 : 1), pad.left - 8, yFor(yt))
		);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		xTicks.forEach((xt) => ctx.fillText(fmt(xt, 0) + 's', xFor(xt), pad.top + ch + 6));

		[0, 100].forEach((ref) => {
			if (ref < yMin || ref > yMax) return;
			const py = Math.round(yFor(ref)) + 0.5;
			ctx.strokeStyle = COLORS.gridHi;
			ctx.setLineDash([2, 4]);
			ctx.beginPath();
			ctx.moveTo(pad.left, py);
			ctx.lineTo(pad.left + cw, py);
			ctx.stroke();
			ctx.setLineDash([]);
		});

		ctx.strokeStyle = COLORS.border;
		ctx.strokeRect(pad.left + 0.5, pad.top + 0.5, cw, ch);

		// Sättigungs-Bands
		ctx.fillStyle = 'rgba(251,146,60,0.08)';
		let band = null;
		for (const p of s.history) {
			if (p.t < tMin) continue;
			if (p.sat && !band) band = { start: p.t, end: p.t };
			else if (p.sat && band) band.end = p.t;
			else if (!p.sat && band) {
				ctx.fillRect(xFor(band.start), pad.top, Math.max(1, xFor(band.end) - xFor(band.start)), ch);
				band = null;
			}
		}
		if (band)
			ctx.fillRect(xFor(band.start), pad.top, Math.max(1, xFor(band.end) - xFor(band.start)), ch);

		const drawSeries = (key, color, opts = {}) => {
			ctx.strokeStyle = color;
			ctx.lineWidth = opts.width || 1.8;
			if (opts.dash) ctx.setLineDash(opts.dash);
			ctx.beginPath();
			let started = false;
			for (const p of s.history) {
				if (p.t < tMin - 1) continue;
				const x = xFor(p.t),
					y = yFor(p[key]);
				if (!started) {
					ctx.moveTo(x, y);
					started = true;
				} else ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.setLineDash([]);
		};

		drawSeries('u', COLORS.y, { width: 1.4 });
		drawSeries('sp', COLORS.sp, { width: 1.6, dash: [6, 4] });
		drawSeries('pv', COLORS.pv, { width: 2.2 });

		if (hasData) {
			const last = s.history[s.history.length - 1];
			const x = xFor(last.t);
			[
				['pv', COLORS.pv],
				['sp', COLORS.sp],
				['u', COLORS.y]
			].forEach(([k, c]) => {
				const y = yFor(last[k]);
				ctx.fillStyle = c;
				ctx.beginPath();
				ctx.arc(x, y, 2.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.textAlign = 'left';
				ctx.textBaseline = 'middle';
				ctx.fillText(fmt(last[k], 1), pad.left + cw + 6, y);
			});
		}

		ctx.fillStyle = COLORS.dimmer;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText('PV / SP [' + sim.unit + ']   |   Y [%]', pad.left + 6, pad.top + 4);
	}

	$effect(() => {
		let raf;
		const loop = () => {
			draw();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	$effect(() => {
		if (!canvas) return;
		const obs = new ResizeObserver(() => draw());
		obs.observe(canvas);
		return () => obs.disconnect();
	});
</script>

<canvas bind:this={canvas} class="chart"></canvas>

<style>
	.chart {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
</style>
