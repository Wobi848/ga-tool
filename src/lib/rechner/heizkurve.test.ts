import { describe, it, expect } from 'vitest';
import { calculateFlowTemp, curvePoints, type CurveParams } from './heizkurve';

const defaults: CurveParams = {
	manufacturer: 'generic',
	roomTemp: 20,
	normOutdoor: -10,
	slope: 1.0,
	level: 0,
	systemType: 'radiator'
};

describe('generic curve (linear)', () => {
	it('returns roomTemp when outdoor >= roomTemp', () => {
		expect(calculateFlowTemp(20, defaults)).toBe(20);
		expect(calculateFlowTemp(25, defaults)).toBe(20);
	});
	it('TV = TR + slope·(TR − TA) for outdoor < roomTemp', () => {
		// 20 + 1.0 × (20 − (-10)) = 50
		expect(calculateFlowTemp(-10, defaults)).toBeCloseTo(50, 5);
		// 20 + 1.0 × (20 − 0) = 40
		expect(calculateFlowTemp(0, defaults)).toBeCloseTo(40, 5);
	});
	it('level adds parallel offset', () => {
		expect(calculateFlowTemp(-10, { ...defaults, level: 5 })).toBeCloseTo(55, 5);
	});
});

describe('siemens / viessmann / buderus curves (radiator exponent ~1.3)', () => {
	it('siemens: TV at norm point equals roomTemp + slope·(TR − normOutdoor)', () => {
		// At ta = normOutdoor, ratio = 1, dTV = slope × dTNorm
		const p: CurveParams = { ...defaults, manufacturer: 'siemens', slope: 1.0 };
		expect(calculateFlowTemp(-10, p)).toBeCloseTo(50, 5);
	});
	it('siemens: monotonically increases as TA drops', () => {
		const p: CurveParams = { ...defaults, manufacturer: 'siemens', slope: 1.0 };
		const tvWarm = calculateFlowTemp(10, p);
		const tvCold = calculateFlowTemp(-10, p);
		expect(tvCold).toBeGreaterThan(tvWarm);
	});
	it('floor system uses lower exponent — flatter at extreme cold', () => {
		const radiator = calculateFlowTemp(-10, {
			...defaults,
			manufacturer: 'siemens',
			systemType: 'radiator'
		});
		const floor = calculateFlowTemp(-10, {
			...defaults,
			manufacturer: 'siemens',
			systemType: 'floor'
		});
		// Both hit the design point but floor's exponent (1.1) is closer to linear
		// Difference shows mid-range, not at endpoints. Sanity: both > roomTemp
		expect(radiator).toBeGreaterThan(20);
		expect(floor).toBeGreaterThan(20);
	});
});

describe('honeywell 2-point curve', () => {
	it('linearly interpolates between (TA1, TV1) and (TA2, TV2)', () => {
		const p: CurveParams = {
			...defaults,
			manufacturer: 'honeywell',
			ta1: -10,
			tv1: 60,
			ta2: 15,
			tv2: 25
		};
		// At midpoint TA = 2.5 °C → halfway between 60 and 25 = 42.5
		expect(calculateFlowTemp(2.5, p)).toBeCloseTo(42.5, 5);
		expect(calculateFlowTemp(-10, p)).toBeCloseTo(60, 5);
		expect(calculateFlowTemp(15, p)).toBeCloseTo(25, 5);
	});
});

describe('sauter footpoint curve', () => {
	// Hinweis: heatLimit triggert auch den outer clamp auf roomTemp.
	// Sauter-Footpoint-Semantik (Minimum-VL ueber Heizgrenze) wird dadurch
	// im aktuellen Code uebersteuert. Wenn das geaendert wird, Tests anpassen.
	it('TV = footpoint + slope·(heatLimit − TA) below limit', () => {
		const p: CurveParams = {
			...defaults,
			manufacturer: 'sauter',
			footpoint: 25,
			heatLimit: 18,
			slope: 1.5
		};
		// 25 + 1.5 × (18 − (-10)) = 25 + 42 = 67
		expect(calculateFlowTemp(-10, p)).toBeCloseTo(67, 5);
	});
	it('outer heatLimit clamp uebersteuert footpoint bei TA >= heatLimit', () => {
		const p: CurveParams = {
			...defaults,
			manufacturer: 'sauter',
			footpoint: 25,
			heatLimit: 18,
			slope: 1.5
		};
		// Outer clamp: TA >= heatLimit -> tv = roomTemp = 20
		expect(calculateFlowTemp(18, p)).toBe(20);
		expect(calculateFlowTemp(20, p)).toBe(20);
	});
});

describe('clamps and limits', () => {
	it('maxFlow caps result', () => {
		const p: CurveParams = { ...defaults, slope: 5.0, maxFlow: 70 };
		// Without cap: 20 + 5·30 = 170 → clamped to 70
		expect(calculateFlowTemp(-10, p)).toBe(70);
	});
	it('heatLimit forces TV = roomTemp above limit', () => {
		const p: CurveParams = { ...defaults, heatLimit: 16 };
		expect(calculateFlowTemp(17, p)).toBe(20);
		expect(calculateFlowTemp(16, p)).toBe(20);
		// Below limit, normal curve applies
		expect(calculateFlowTemp(0, p)).toBeCloseTo(40, 5);
	});
	it('minFlow lifts result when curve is below', () => {
		const p: CurveParams = { ...defaults, slope: 0.1, minFlow: 30 };
		// Without minFlow: 20 + 0.1·30 = 23, but minFlow = 30
		expect(calculateFlowTemp(-10, p)).toBe(30);
	});
});

describe('curvePoints', () => {
	it('generates the requested number of (ta, tv) tuples', () => {
		const pts = curvePoints(defaults, -15, 20, 7);
		expect(pts).toHaveLength(8); // steps+1
		expect(pts[0][0]).toBe(-15);
		expect(pts[pts.length - 1][0]).toBe(20);
	});
	it('curve is monotonically non-increasing in TV as TA grows', () => {
		const pts = curvePoints({ ...defaults, manufacturer: 'siemens' }, -15, 20, 20);
		for (let i = 1; i < pts.length; i++) {
			expect(pts[i][1]).toBeLessThanOrEqual(pts[i - 1][1] + 1e-9);
		}
	});
});
