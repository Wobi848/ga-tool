<script lang="ts">
  import { onDestroy } from 'svelte';
  import { PIDSim, fmt } from '$lib/pid/simulation.svelte.js';
  import Chart from '$lib/pid/Chart.svelte';
  import FavButton from '$lib/components/FavButton.svelte';
  import { _ } from 'svelte-i18n';

  const sim = new PIDSim();

  $effect(() => {
    if (sim.running) sim.start();
    else sim.stop();
  });

  onDestroy(() => sim.stop());

  let kpHint = $derived(100 / Math.max(0.1, sim.xp));
  let kp     = $derived(100 / Math.max(0.5, sim.xp));
  let ki     = $derived(sim.tn > 0 ? kp / sim.tn : null);
  let kd     = $derived(sim.tv > 0 ? kp * sim.tv : null);

  let statusClass = $derived(
    sim.display.status === 'settled'   ? 'ok'   :
    sim.display.status === 'saturated' ? 'warn' : 'bad'
  );

  const STATUS_LABELS: Record<string, string> = $derived({
    settled:   $_('rechner.pidSimulatorUi.statusSettled'),
    saturated: $_('rechner.pidSimulatorUi.statusSaturated'),
    deviation: $_('rechner.pidSimulatorUi.status')
  });

  const UNITS = [
    { label: '°C',  value: '°C'  },
    { label: '%rH', value: '%rH' },
    { label: 'Pa',  value: 'Pa'  },
    { label: 'lx',  value: 'lx'  },
    { label: 'ppm', value: 'ppm' },
  ];

  const MODES = $derived([
    { label: $_('rechner.pidSimulatorUi.modeHeat'), value: 'heizen'  },
    { label: $_('rechner.pidSimulatorUi.modeCool'), value: 'kuehlen' },
  ]);

  let xpUnit = $derived(sim.unit === '°C' ? 'K' : sim.unit);

  // Effektiver Sollwert (mit SP-Automatik)
  let spEff = $derived(sim.display.sp);

  // Hilfsfunktion: Slider-Clamp
  const cl = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
</script>

<div class="pid-page">
  <header class="pid-header">
    <a href="/rechner" class="back-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {$_('common.allCalculators')}
    </a>
    <div class="header-row">
      <h1>{$_('rechner.pidSimulator.name')}</h1>
      <div class="status-badge {statusClass}">
        <span class="dot"></span>
        {sim.running ? 'RUN' : 'HOLD'} · {STATUS_LABELS[sim.display.status] ?? sim.display.status}
      </div>
      <FavButton type="rechner" slug="pid-simulator" title={$_('rechner.pidSimulator.name')} size={20} />
    </div>
    <p class="subtitle">{$_('rechner.pidSimulatorUi.subtitle')}</p>
  </header>

  <div class="pid-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">

      <!-- REGLER -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.controller')}</h3>

        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color: #4ade80">Xp</span>
              <span class="name">{$_('rechner.pidSimulatorUi.proportionalBand')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="1" max="200" step="1"
                value={sim.xp}
                oninput={e => sim.xp = cl(parseFloat(e.currentTarget.value) || 1, 1, 200)}
                class="numbox" />
              <span class="unit">{xpUnit}</span>
            </div>
          </div>
          <input type="range" min="1" max="200" step="1" value={sim.xp}
            oninput={e => sim.xp = parseFloat(e.currentTarget.value)}
            class="slider slider-pv" />
          <div class="slider-foot">
            <span>1{xpUnit}</span>
            <span class="hint">Kp = {fmt(kpHint, 2)}</span>
            <span>200{xpUnit}</span>
          </div>
        </div>

        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color: #38bdf8">Tn</span>
              <span class="name">{$_('rechner.pidSimulatorUi.integralTime')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="0" max="3600" step="1"
                value={sim.tn}
                oninput={e => sim.tn = cl(parseFloat(e.currentTarget.value) || 0, 0, 3600)}
                class="numbox" />
              <span class="unit">s</span>
            </div>
          </div>
          <input type="range" min="0" max="3600" step="1" value={sim.tn}
            oninput={e => sim.tn = parseFloat(e.currentTarget.value)}
            class="slider slider-sp" />
          <div class="slider-foot">
            <span>0s</span>
            <span class="hint">{sim.tn === 0 ? $_('rechner.pidSimulatorUi.iTermOff') : `≈ ${fmt(sim.tn/60,1)} min`}</span>
            <span>3600s</span>
          </div>
        </div>

        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color: #fb923c">Tv</span>
              <span class="name">{$_('rechner.pidSimulatorUi.derivativeTime')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="0" max="600" step="1"
                value={sim.tv}
                oninput={e => sim.tv = cl(parseFloat(e.currentTarget.value) || 0, 0, 600)}
                class="numbox" />
              <span class="unit">s</span>
            </div>
          </div>
          <input type="range" min="0" max="600" step="1" value={sim.tv}
            oninput={e => sim.tv = parseFloat(e.currentTarget.value)}
            class="slider slider-y" />
          <div class="slider-foot">
            <span>0s</span>
            <span class="hint">{sim.tv === 0 ? $_('rechner.pidSimulatorUi.dOff') : $_('rechner.pidSimulatorUi.dOn')}</span>
            <span>600s</span>
          </div>
        </div>
      </div>

      <!-- WIRKRICHTUNG -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.direction')}</h3>
        <div class="seg">
          {#each MODES as m}
            <button class="seg-btn" class:active={sim.mode === m.value}
              onclick={() => sim.mode = m.value}>{m.label}</button>
          {/each}
        </div>
        <p class="hint" style="margin-top:6px">
          {sim.mode === 'heizen'
            ? $_('rechner.pidSimulatorUi.hintHeat')
            : $_('rechner.pidSimulatorUi.hintCool')}
        </p>
      </div>

      <!-- SOLLWERT + EINHEIT -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.setpoint')}</h3>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color: #38bdf8">W</span>
              <span class="name">{$_('rechner.pidSimulatorUi.setpoint')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="0" max="100" step="0.5"
                value={sim.sp}
                oninput={e => sim.sp = cl(parseFloat(e.currentTarget.value) || 0, 0, 100)}
                class="numbox" />
              <span class="unit">{sim.unit}</span>
            </div>
          </div>
          <input type="range" min="0" max="100" step="0.5" value={sim.sp}
            oninput={e => sim.sp = parseFloat(e.currentTarget.value)}
            class="slider slider-sp" />
        </div>
        <div class="seg" style="margin-top:8px">
          {#each UNITS as u}
            <button class="seg-btn" class:active={sim.unit === u.value}
              onclick={() => sim.unit = u.value}>{u.label}</button>
          {/each}
        </div>
      </div>

      <!-- THEORIE-LINKS -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.theory')}</h3>
        <div class="theory-links">
          {#each [
            ['pid-regler',          'PID-Regler',             $_('rechner.pidSimulatorUi.theoryBasics')],
            ['regelkreise',         'Regelkreise & Totzeit',  $_('rechner.pidSimulatorUi.theoryBasics')],
            ['steuern-regeln',      'Steuern vs. Regeln',     $_('rechner.pidSimulatorUi.theoryBasics')],
            ['kaskadenregelung',    'Kaskadenregelung',       $_('rechner.pidSimulatorUi.theoryAdvanced')],
            ['druckregelung-lueftung', 'Druckregelung Lüftung', $_('rechner.pidSimulatorUi.theoryAdvanced')],
          ] as [slug, title, level]}
            <a href="/wissen/{slug}" class="theory-link">
              <span class="theory-title">{title}</span>
              <span class="theory-level">{level}</span>
            </a>
          {/each}
        </div>
      </div>

      <!-- PRESETS -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.hvacPresets')}</h3>
        <div class="preset-grid">
          {#each [
            ['raum-heizung', $_('rechner.pidSimulatorUi.presetRaumHeizung')],
            ['vorlauf',      $_('rechner.pidSimulatorUi.presetVorlauf')],
            ['kaelte',       $_('rechner.pidSimulatorUi.presetKaelte')],
            ['druck',        $_('rechner.pidSimulatorUi.presetDruck')],
            ['feuchte',      $_('rechner.pidSimulatorUi.presetFeuchte')],
            ['pid-demo',     $_('rechner.pidSimulatorUi.presetDemo')],
          ] as [key, label]}
            <button class="btn btn-preset" onclick={() => sim.loadPreset(key)}>{label}</button>
          {/each}
        </div>
      </div>

      <!-- SIM-STEUERUNG -->
      <div class="section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.simulation')}</h3>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#38bdf8">v</span>
              <span class="name">{$_('rechner.pidSimulatorUi.timeScale')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="1" max="50" step="1"
                value={sim.speed}
                oninput={e => sim.speed = cl(parseFloat(e.currentTarget.value) || 1, 1, 50)}
                class="numbox" />
              <span class="unit">×</span>
            </div>
          </div>
          <input type="range" min="1" max="50" step="1" value={sim.speed}
            oninput={e => sim.speed = parseFloat(e.currentTarget.value)}
            class="slider slider-sp" />
        </div>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#4ade80">Δt</span>
              <span class="name">{$_('rechner.pidSimulatorUi.viewWindow')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="30" max="1800" step="10"
                value={sim.winSec}
                oninput={e => sim.winSec = cl(parseFloat(e.currentTarget.value) || 30, 30, 1800)}
                class="numbox" />
              <span class="unit">s</span>
            </div>
          </div>
          <input type="range" min="30" max="1800" step="10" value={sim.winSec}
            oninput={e => sim.winSec = parseFloat(e.currentTarget.value)}
            class="slider slider-pv" />
        </div>
        <div class="btn-row" style="margin-top:10px">
          <button class="btn btn-primary" onclick={() => (sim.running = !sim.running)}>
            {sim.running ? '❚❚ Hold' : '▶ Run'}
          </button>
          <button class="btn btn-ghost" onclick={() => sim.reset()}>↺ Reset</button>
        </div>
      </div>
    </aside>

    <div class="main-col">
    <!-- CHART + READOUTS -->
    <section class="chart-pane">
      <!-- CHART -->
      <div class="chart-wrap">
        <div class="chart-legend">
          <span class="legend-item" style="color:#38bdf8">
            <span class="swatch dashed"></span>
            {$_('rechner.pidSimulatorUi.setpointW')} &nbsp;<b>{fmt(spEff, 1)} {sim.unit}</b>
            {#if sim.spAutoActive}<span class="sp-auto-badge">AUTO</span>{/if}
          </span>
          <span class="legend-item" style="color:#4ade80">
            <span class="swatch"></span>
            {$_('rechner.pidSimulatorUi.actualValueX')} &nbsp;<b>{fmt(sim.display.pv, 2)} {sim.unit}</b>
          </span>
          <span class="legend-item" style="color:#fb923c">
            <span class="swatch"></span>
            {$_('rechner.pidSimulatorUi.outputY')} &nbsp;<b>{fmt(sim.display.y, 1)} %</b>
          </span>
          <span class="legend-meta">
            {$_('rechner.pidSimulatorUi.windowMeta')} <b>{sim.winSec}s</b> · Auto-scale
          </span>
        </div>
        <div class="canvas-wrap">
          <Chart {sim} />
        </div>
      </div>

      <!-- READOUTS -->
      <div class="readouts">
        <div class="readout">
          <div class="ro-label" style="color:#38bdf8">
            <span class="ro-swatch" style="background:#38bdf8"></span>{$_('rechner.pidSimulatorUi.setpointW')}
          </div>
          <div class="ro-value">{fmt(spEff, 1)}<span class="ro-unit">{sim.unit}</span></div>
          {#if sim.spAutoActive}
            <div class="ro-sub">
              <span style="color:#38bdf8">↑ {fmt(sim.spAutoHigh,1)}</span>
              <span style="color:var(--muted)">↓ {fmt(sim.spAutoLow,1)}</span>
            </div>
          {/if}
        </div>
        <div class="readout">
          <div class="ro-label" style="color:#4ade80">
            <span class="ro-swatch" style="background:#4ade80"></span>{$_('rechner.pidSimulatorUi.actualValueX')}
          </div>
          <div class="ro-value">{fmt(sim.display.pv, 2)}<span class="ro-unit">{sim.unit}</span></div>
        </div>
        <div class="readout">
          <div class="ro-label" style="color:#fb923c">
            <span class="ro-swatch" style="background:#fb923c"></span>{$_('rechner.pidSimulatorUi.outputY')}
          </div>
          <div class="ro-value">{fmt(sim.display.y, 1)}<span class="ro-unit">%</span></div>
        </div>
        <div class="readout">
          <div class="ro-label" style="color:#f87171">
            <span class="ro-swatch" style="background:#f87171"></span>{$_('rechner.pidSimulatorUi.controlDeviation')}
          </div>
          <div class="ro-value">{fmt(sim.display.e, 2)}<span class="ro-unit">{sim.unit}</span></div>
        </div>
        <div class="readout">
          <div class="ro-label">{$_('rechner.pidSimulatorUi.disturbance')}</div>
          <div class="ro-value" style:color={sim.display.dist === 0 && sim.display.autoDist === 0 ? 'var(--muted)' : 'var(--text)'}>
            {(sim.display.dist + sim.display.autoDist) >= 0 ? '+' : ''}{fmt(sim.display.dist + sim.display.autoDist, 2)}<span class="ro-unit">{sim.unit}</span>
          </div>
          {#if sim.autoDistActive}
            <div class="ro-sub">
              <span style="color:var(--muted)">d<sub>man</sub></span>
              <span>{sim.display.dist >= 0 ? '+' : ''}{fmt(sim.display.dist,1)}</span>
              <span style="color:#f87171; margin-left:6px">d<sub>auto</sub></span>
              <span style="color:#f87171">{sim.display.autoDist >= 0 ? '+' : ''}{fmt(sim.display.autoDist,2)}</span>
            </div>
          {/if}
        </div>
        <div class="readout">
          <div class="ro-label">{$_('rechner.pidSimulatorUi.status')}</div>
          <div class="ro-value" style="font-size:13px; padding-top:2px">
            <span class="status-pill {statusClass}">
              <span class="pill-dot"></span>
              {STATUS_LABELS[sim.display.status] ?? sim.display.status}
            </span>
          </div>
        </div>
      </div>

      <!-- STATUS STRIP -->
      <div class="status-strip">
        <div class="strip-cell label">{$_('rechner.pidSimulatorUi.controllerTerms')}</div>
        <div class="strip-cell grow">
          <span class="term" style="color:#4ade80">P <b>{fmt(sim.display.p, 2)}</b><em>%</em></span>
          <span class="term" style="color:#38bdf8">I <b>{fmt(sim.display.i, 2)}</b><em>%</em></span>
          <span class="term" style="color:#fb923c">D <b>{fmt(sim.display.d, 2)}</b><em>%</em></span>
          <span class="term">Σ <b>{fmt(sim.display.p + sim.display.i + sim.display.d, 2)}</b><em>%</em></span>
        </div>
        <div class="strip-cell">
          Kp <b>{fmt(kp, 2)}</b>
          &ensp;Ki <b>{ki !== null ? fmt(ki, 4) : '—'}</b>
          &ensp;Kd <b>{kd !== null ? fmt(kd, 2) : '—'}</b>
        </div>
        <div class="strip-cell">
          Sat <b style:color={sim.display.sat ? '#fb923c' : 'var(--muted)'}>
            {sim.display.sat ? $_('rechner.pidSimulatorUi.yes') : $_('rechner.pidSimulatorUi.no')}
          </b>
        </div>
      </div>
    </section>

    <!-- ENV-PANEL: Strecke · Störung · Auto-Störgrösse · SP-Automatik -->
    <div class="env-panel">

      <div class="env-section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.plantModel')}</h3>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#fb923c">Tt</span>
              <span class="name">{$_('rechner.pidSimulatorUi.deadTime')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="0" max="120" step="0.5"
                value={sim.tt}
                oninput={e => sim.tt = cl(parseFloat(e.currentTarget.value)||0, 0, 120)}
                class="numbox" /><span class="unit">s</span>
            </div>
          </div>
          <input type="range" min="0" max="120" step="0.5" value={sim.tt}
            oninput={e => sim.tt = parseFloat(e.currentTarget.value)}
            class="slider slider-y" />
        </div>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#4ade80">T1</span>
              <span class="name">{$_('rechner.pidSimulatorUi.timeConstant')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="1" max="600" step="1"
                value={sim.t1}
                oninput={e => sim.t1 = cl(parseFloat(e.currentTarget.value)||1, 1, 600)}
                class="numbox" /><span class="unit">s</span>
            </div>
          </div>
          <input type="range" min="1" max="600" step="1" value={sim.t1}
            oninput={e => sim.t1 = parseFloat(e.currentTarget.value)}
            class="slider slider-pv" />
        </div>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#38bdf8">Ks</span>
              <span class="name">{$_('rechner.pidSimulatorUi.gain')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="0.05" max="3" step="0.05"
                value={sim.ks}
                oninput={e => sim.ks = cl(parseFloat(e.currentTarget.value)||0.05, 0.05, 3)}
                class="numbox" /><span class="unit">{sim.unit}/%</span>
            </div>
          </div>
          <input type="range" min="0.05" max="3" step="0.05" value={sim.ks}
            oninput={e => sim.ks = parseFloat(e.currentTarget.value)}
            class="slider slider-sp" />
          <div class="slider-foot">
            <span></span>
            <span class="hint">y∞ ≈ {fmt(sim.ks * 100, 1)} {sim.unit} bei Y=100%</span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="env-section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.disturbanceSection')}</h3>
        <div class="slider-row">
          <div class="slider-head">
            <div class="slider-label">
              <span class="key" style="color:#fb923c">Δd</span>
              <span class="name">{$_('rechner.pidSimulatorUi.jumpAmplitude')}</span>
            </div>
            <div class="numwrap">
              <input type="number" min="-50" max="50" step="1"
                value={sim.distStep}
                oninput={e => sim.distStep = cl(parseFloat(e.currentTarget.value)||0, -50, 50)}
                class="numbox" /><span class="unit">{sim.unit}</span>
            </div>
          </div>
          <input type="range" min="-50" max="50" step="1" value={sim.distStep}
            oninput={e => sim.distStep = parseFloat(e.currentTarget.value)}
            class="slider slider-y" />
        </div>
        <div class="btn-row">
          <button class="btn btn-warn" onclick={() => sim.applyDisturbance(sim.distStep)}>
            ↑ +{sim.distStep} {sim.unit}
          </button>
          <button class="btn btn-ghost" onclick={() => sim.applyDisturbance(-sim.distStep)}>
            ↓ −{sim.distStep} {sim.unit}
          </button>
        </div>
        {#if sim.display.dist !== 0}
          <button class="btn btn-ghost full" style="margin-top:6px"
            onclick={() => sim.clearDisturbance()}>
            {$_('rechner.pidSimulatorUi.resetDist', { values: { val: fmt(sim.display.dist, 1), unit: sim.unit } })}
          </button>
        {/if}
      </div>

      <div class="env-section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.autoDisturbance')}</h3>
        <div class="autodist-header">
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-cb" bind:checked={sim.autoDistActive} />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">{sim.autoDistActive ? $_('rechner.pidSimulatorUi.active') : $_('rechner.pidSimulatorUi.inactive')}</span>
          </label>
          {#if sim.autoDistActive}
            <span class="autodist-live" style="color:#f87171">
              d̃ = {fmt(sim.display.autoDist, 2)} {sim.unit}
            </span>
          {/if}
        </div>
        {#if sim.autoDistActive}
          <div class="seg" style="margin:8px 0 10px">
            {#each [['sin',`∿ ${$_('rechner.pidSimulatorUi.sine')}`],['square',`⊓ ${$_('rechner.pidSimulatorUi.square')}`],['noise',`≈ ${$_('rechner.pidSimulatorUi.noise')}`]] as [v,l]}
              <button class="seg-btn" class:active={sim.autoDistType === v}
                onclick={() => sim.autoDistType = v}>{l}</button>
            {/each}
          </div>
          <div class="slider-row">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#f87171">A</span><span class="name">{$_('rechner.pidSimulatorUi.amplitude')}</span></div>
              <div class="numwrap">
                <input type="number" min="0.1" max="50" step="0.5" value={sim.autoDistAmp}
                  oninput={e => sim.autoDistAmp = cl(parseFloat(e.currentTarget.value)||0.1, 0.1, 50)}
                  class="numbox" /><span class="unit">{sim.unit}</span>
              </div>
            </div>
            <input type="range" min="0.1" max="50" step="0.5" value={sim.autoDistAmp}
              oninput={e => sim.autoDistAmp = parseFloat(e.currentTarget.value)}
              class="slider" style="accent-color:#f87171" />
          </div>
          {#if sim.autoDistType !== 'noise'}
            <div class="slider-row">
              <div class="slider-head">
                <div class="slider-label"><span class="key" style="color:#f87171">T</span><span class="name">{$_('rechner.pidSimulatorUi.period')}</span></div>
                <div class="numwrap">
                  <input type="number" min="5" max="600" step="5" value={sim.autoDistPeriod}
                    oninput={e => sim.autoDistPeriod = cl(parseFloat(e.currentTarget.value)||5, 5, 600)}
                    class="numbox" /><span class="unit">s</span>
                </div>
              </div>
              <input type="range" min="5" max="600" step="5" value={sim.autoDistPeriod}
                oninput={e => sim.autoDistPeriod = parseFloat(e.currentTarget.value)}
                class="slider" style="accent-color:#f87171" />
              <div class="slider-foot"><span>5s</span><span class="hint">≈ {fmt(sim.autoDistPeriod/60,1)} min</span><span>600s</span></div>
            </div>
          {/if}
          <div class="slider-row">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#a78bfa">Tc</span><span class="name">{$_('rechner.pidSimulatorUi.filterPT1')}</span></div>
              <div class="numwrap">
                <input type="number" min="0" max="120" step="1" value={sim.autoDistTc}
                  oninput={e => sim.autoDistTc = cl(parseFloat(e.currentTarget.value)||0, 0, 120)}
                  class="numbox" /><span class="unit">s</span>
              </div>
            </div>
            <input type="range" min="0" max="120" step="1" value={sim.autoDistTc}
              oninput={e => sim.autoDistTc = parseFloat(e.currentTarget.value)}
              class="slider" style="accent-color:#a78bfa" />
            <div class="slider-foot"><span>0s</span><span class="hint">{sim.autoDistTc === 0 ? $_('rechner.pidSimulatorUi.noFilter') : `PT1 ≈ ${fmt(sim.autoDistTc,0)}s`}</span><span>120s</span></div>
          </div>
          <div class="slider-row">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#a78bfa">B</span><span class="name">{$_('rechner.pidSimulatorUi.bias')}</span></div>
              <div class="numwrap">
                <input type="number" min="-20" max="20" step="0.5" value={sim.autoDistBias}
                  oninput={e => sim.autoDistBias = cl(parseFloat(e.currentTarget.value)||0, -20, 20)}
                  class="numbox" /><span class="unit">{sim.unit}</span>
              </div>
            </div>
            <input type="range" min="-20" max="20" step="0.5" value={sim.autoDistBias}
              oninput={e => sim.autoDistBias = parseFloat(e.currentTarget.value)}
              class="slider" style="accent-color:#a78bfa" />
            <div class="slider-foot"><span>−20</span><span class="hint">{sim.autoDistBias === 0 ? $_('rechner.pidSimulatorUi.noOffset') : `${sim.autoDistBias > 0 ? '+' : ''}${fmt(sim.autoDistBias,1)} ${sim.unit}`}</span><span>+20</span></div>
          </div>
        {/if}
      </div>

      <div class="env-section">
        <h3 class="section-title">{$_('rechner.pidSimulatorUi.spAutoSection')}</h3>
        <div class="autodist-header">
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-cb" bind:checked={sim.spAutoActive} />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">{sim.spAutoActive ? $_('rechner.pidSimulatorUi.active') : $_('rechner.pidSimulatorUi.inactive')}</span>
          </label>
          {#if sim.spAutoActive}
            <span class="autodist-live" style="color:#38bdf8">W = {fmt(spEff, 1)} {sim.unit}</span>
          {/if}
        </div>
        {#if sim.spAutoActive}
          <div class="slider-row" style="margin-top:8px">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#38bdf8">W↑</span><span class="name">{$_('rechner.pidSimulatorUi.dayValue')}</span></div>
              <div class="numwrap">
                <input type="number" min="0" max="200" step="0.5" value={sim.spAutoHigh}
                  oninput={e => sim.spAutoHigh = cl(parseFloat(e.currentTarget.value)||0, 0, 200)}
                  class="numbox" /><span class="unit">{sim.unit}</span>
              </div>
            </div>
            <input type="range" min="0" max="200" step="0.5" value={sim.spAutoHigh}
              oninput={e => sim.spAutoHigh = parseFloat(e.currentTarget.value)}
              class="slider slider-sp" />
          </div>
          <div class="slider-row">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#7dd3fc">W↓</span><span class="name">{$_('rechner.pidSimulatorUi.nightValue')}</span></div>
              <div class="numwrap">
                <input type="number" min="0" max="200" step="0.5" value={sim.spAutoLow}
                  oninput={e => sim.spAutoLow = cl(parseFloat(e.currentTarget.value)||0, 0, 200)}
                  class="numbox" /><span class="unit">{sim.unit}</span>
              </div>
            </div>
            <input type="range" min="0" max="200" step="0.5" value={sim.spAutoLow}
              oninput={e => sim.spAutoLow = parseFloat(e.currentTarget.value)}
              class="slider" style="accent-color:#7dd3fc" />
            <div class="slider-foot"><span></span><span class="hint">Δ = {fmt(Math.abs(sim.spAutoHigh - sim.spAutoLow),1)} {sim.unit}</span><span></span></div>
          </div>
          <div class="slider-row">
            <div class="slider-head">
              <div class="slider-label"><span class="key" style="color:#38bdf8">T</span><span class="name">{$_('rechner.pidSimulatorUi.switchPeriod')}</span></div>
              <div class="numwrap">
                <input type="number" min="10" max="1800" step="10" value={sim.spAutoPeriod}
                  oninput={e => sim.spAutoPeriod = cl(parseFloat(e.currentTarget.value)||10, 10, 1800)}
                  class="numbox" /><span class="unit">s</span>
              </div>
            </div>
            <input type="range" min="10" max="1800" step="10" value={sim.spAutoPeriod}
              oninput={e => sim.spAutoPeriod = parseFloat(e.currentTarget.value)}
              class="slider slider-sp" />
            <div class="slider-foot"><span>10s</span><span class="hint">≈ {fmt(sim.spAutoPeriod/60,1)} min/Phase</span><span>1800s</span></div>
          </div>
        {/if}
      </div>

    </div><!-- /env-panel -->
    </div><!-- /main-col -->
  </div>
</div>

<style>
  /* ── Layout ─────────────────────────────────────────────────── */
  .pid-page {
    padding: 1.25rem 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .pid-header { margin-bottom: 1.25rem; }

  .back-link {
    display: inline-flex; align-items: center; gap: 0.25rem;
    font-size: 0.8125rem; color: var(--muted); text-decoration: none;
    margin-bottom: 0.5rem;
  }
  .back-link:hover { color: var(--color-primary); }

  .header-row {
    display: flex; align-items: center; gap: 0.75rem;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 1.375rem; font-weight: 700;
    color: var(--text); margin: 0;
  }

  .subtitle { font-size: 0.8125rem; color: var(--muted); margin: 0.25rem 0 0; }

  .pid-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 1rem;
    align-items: start;
  }

  .main-col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
  }

  /* ── Env-Panel unterhalb Chart ───────────────────────────────── */
  .env-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 0.75rem;
  }

  .env-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 0.875rem 1rem;
  }

  @media (max-width: 960px) {
    .pid-layout { grid-template-columns: 1fr; }
    .env-panel { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .env-panel { grid-template-columns: 1fr; }
  }

  /* ── Sidebar ─────────────────────────────────────────────────── */
  .sidebar {
    display: flex; flex-direction: column; gap: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .section {
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--border);
  }
  .section:last-child { border-bottom: none; }

  .section-title {
    font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--muted);
    margin: 0 0 0.625rem;
  }

  /* ── Sliders ─────────────────────────────────────────────────── */
  .slider-row { margin-bottom: 0.625rem; }
  .slider-row:last-child { margin-bottom: 0; }

  .slider-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 4px;
  }

  .slider-label { display: flex; align-items: baseline; gap: 0.375rem; }
  .key  { font-size: 0.8125rem; font-weight: 700; font-family: ui-monospace, monospace; }
  .name { font-size: 0.75rem; color: var(--muted); }

  .numwrap { display: flex; align-items: center; gap: 4px; }
  .numbox {
    width: 56px; padding: 2px 6px;
    font-size: 0.8125rem; font-family: ui-monospace, monospace;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 4px; color: var(--text);
    text-align: right;
  }
  .numbox:focus { outline: none; border-color: var(--color-primary); }
  .unit { font-size: 0.75rem; color: var(--muted); min-width: 28px; }

  .slider {
    width: 100%; height: 4px; border-radius: 2px;
    cursor: pointer; accent-color: var(--color-primary);
    display: block;
  }
  .slider-pv  { accent-color: #4ade80; }
  .slider-sp  { accent-color: #38bdf8; }
  .slider-y   { accent-color: #fb923c; }

  .slider-foot {
    display: flex; justify-content: space-between;
    font-size: 0.6875rem; color: var(--muted); margin-top: 2px;
  }

  .hint { font-size: 0.6875rem; color: var(--muted); }

  /* ── Segmented control ───────────────────────────────────────── */
  .seg {
    display: flex; gap: 4px; flex-wrap: wrap;
  }
  .seg-btn {
    flex: 1; padding: 4px 8px;
    font-size: 0.75rem; font-weight: 500;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 5px; color: var(--muted);
    cursor: pointer; transition: all 0.12s; white-space: nowrap;
  }
  .seg-btn:hover { border-color: var(--color-primary); color: var(--text); }
  .seg-btn.active {
    background: color-mix(in srgb, var(--color-primary) 12%, transparent);
    border-color: var(--color-primary);
    color: var(--color-primary); font-weight: 600;
  }

  /* ── Buttons ─────────────────────────────────────────────────── */
  .btn {
    flex: 1; padding: 6px 10px; font-size: 0.8125rem; font-weight: 500;
    border-radius: 6px; cursor: pointer; border: 1px solid var(--border);
    transition: all 0.12s;
  }
  .btn-primary {
    background: var(--color-primary); border-color: var(--color-primary);
    color: #fff;
  }
  .btn-primary:hover { background: var(--color-primary-hover); border-color: var(--color-primary-hover); }
  .btn-warn {
    background: color-mix(in srgb, #fb923c 12%, transparent);
    border-color: #fb923c; color: #fb923c;
  }
  .btn-warn:hover { background: color-mix(in srgb, #fb923c 20%, transparent); }
  .btn-ghost {
    background: var(--bg); color: var(--muted);
  }
  .btn-ghost:hover { border-color: var(--color-primary); color: var(--text); }
  .btn.full { width: 100%; }

  .btn-row { display: flex; gap: 6px; }

  .preset-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5px;
  }
  .btn-preset {
    padding: 5px 8px; font-size: 0.75rem;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 5px; color: var(--text); cursor: pointer;
    transition: all 0.12s; text-align: center;
  }
  .btn-preset:hover { border-color: var(--color-secondary); color: var(--color-secondary); }

  /* ── Chart pane ──────────────────────────────────────────────── */
  .chart-pane {
    display: flex; flex-direction: column; gap: 0.75rem;
  }

  .chart-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .chart-legend {
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    padding: 0.625rem 1rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.8125rem;
  }
  .legend-item { display: flex; align-items: center; gap: 0.375rem; }
  .swatch {
    display: inline-block; width: 24px; height: 2px;
    background: currentColor; border-radius: 1px;
  }
  .dashed {
    background: none;
    border-top: 2px dashed currentColor;
  }
  .legend-meta { margin-left: auto; font-size: 0.75rem; color: var(--muted); }

  .canvas-wrap { height: 320px; padding: 0; }

  /* ── Readouts ────────────────────────────────────────────────── */
  .readouts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  @media (max-width: 700px) {
    .readouts { grid-template-columns: repeat(2, 1fr); }
  }

  .readout {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.625rem;
    padding: 0.625rem 0.75rem;
  }

  .ro-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.6875rem; font-weight: 500; color: var(--muted);
    margin-bottom: 4px;
  }
  .ro-swatch { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .ro-value {
    font-size: 1.25rem; font-weight: 700; font-family: ui-monospace, monospace;
    color: var(--text); line-height: 1.2;
  }
  .ro-unit { font-size: 0.75rem; font-weight: 400; color: var(--muted); margin-left: 3px; }

  /* ── Status strip ────────────────────────────────────────────── */
  .status-strip {
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.625rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem; color: var(--muted);
  }

  .strip-cell { display: flex; align-items: center; gap: 0.375rem; white-space: nowrap; }
  .strip-cell.label { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
  .strip-cell.grow { flex: 1; display: flex; gap: 1rem; flex-wrap: wrap; }
  .strip-cell b { color: var(--text); font-family: ui-monospace, monospace; }

  .term { display: inline-flex; align-items: baseline; gap: 4px; }
  .term b { font-family: ui-monospace, monospace; }
  .term em { font-style: normal; font-size: 0.6875rem; color: var(--muted); }

  /* ── Status badges ───────────────────────────────────────────── */
  .status-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 0.75rem; font-weight: 600;
    border: 1px solid;
  }
  .status-badge.ok   { background: #16a34a1a; border-color: #16a34a; color: #16a34a; }
  .status-badge.warn { background: #fb923c1a; border-color: #fb923c; color: #fb923c; }
  .status-badge.bad  { background: #ef44441a; border-color: #ef4444; color: #ef4444; }

  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 8px; border-radius: 99px;
    font-size: 0.75rem; font-weight: 600; border: 1px solid;
  }
  .status-pill.ok   { background: #16a34a1a; border-color: #16a34a; color: #16a34a; }
  .status-pill.warn { background: #fb923c1a; border-color: #fb923c; color: #fb923c; }
  .status-pill.bad  { background: #ef44441a; border-color: #ef4444; color: #ef4444; }
  .pill-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

  /* ── Auto-Störgrösse ─────────────────────────────────────────── */
  .autodist-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 4px;
  }
  .autodist-live {
    font-size: 0.75rem; font-family: ui-monospace, monospace; font-weight: 600;
  }

  .toggle-wrap {
    display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  }
  .toggle-cb { display: none; }
  .toggle-track {
    width: 34px; height: 18px; border-radius: 9px;
    background: var(--border); border: 1px solid var(--border);
    position: relative; transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }
  .toggle-cb:checked ~ .toggle-track {
    background: #f8712340; border-color: #f87123;
  }
  .toggle-thumb {
    position: absolute; top: 2px; left: 2px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--muted); transition: left 0.15s, background 0.15s;
  }
  .toggle-cb:checked ~ .toggle-track .toggle-thumb {
    left: 18px; background: #f87171;
  }
  .toggle-label { font-size: 0.8125rem; color: var(--text); }

  .ro-sub {
    display: flex; align-items: center; gap: 3px; flex-wrap: wrap;
    font-size: 0.6875rem; font-family: ui-monospace, monospace;
    color: var(--muted); margin-top: 4px;
  }

  /* ── Theorie-Links ───────────────────────────────────────────── */
  .theory-links { display: flex; flex-direction: column; gap: 3px; }

  .theory-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 5px 8px;
    border-radius: 5px; text-decoration: none;
    border: 1px solid transparent;
    transition: background 0.12s, border-color 0.12s;
  }
  .theory-link:hover {
    background: color-mix(in srgb, var(--color-secondary) 10%, transparent);
    border-color: var(--color-secondary);
  }
  .theory-title {
    font-size: 0.8125rem; color: var(--text); font-weight: 500;
  }
  .theory-level {
    font-size: 0.6875rem; color: var(--muted);
    white-space: nowrap;
  }

  .sp-auto-badge {
    display: inline-block;
    padding: 1px 5px; border-radius: 3px; margin-left: 4px;
    font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em;
    background: #38bdf820; border: 1px solid #38bdf8; color: #38bdf8;
  }
</style>
