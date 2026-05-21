import type { Abbreviation, AbbrLang } from './types';

/**
 * Konzept-Gruppen — Kürzel die *dasselbe* meinen (Übersetzungen oder Synonyme).
 * Single source of truth: jede Gruppe einmal deklariert, beide Richtungen automatisch.
 * Zukünftig erweiterbar für FR/IT etc.
 */
export const conceptGroups: string[][] = [
	['GLT', 'BMS'],
	['SPS', 'PLC'],
	['HLK', 'HVAC'],
	['HLKSE', 'TGA', 'MEP'],
	['RLT', 'AHU'],
	['WRG', 'HRV'],
	['BHKW', 'KWK', 'CHP'],
	['FU', 'VFD'],
	['FI', 'RCD'],
	['LS', 'MCB'],
	['FBH', 'UFH'],
	['TWW', 'DHW'],
	['USV', 'UPS'],
	['EnEV', 'GEG'],
	['FCU', 'ULK'],
	['PELV', 'SELV'],
	['VSS', 'CCTV'],
	['CRI', 'Ra'],
	['SPD', 'ÜSS'],
	['TABS', 'BKA'],
	['EVG', 'ECG'],
];

/**
 * Sprach-Override für Kürzel, die nicht der Default-Sprache (`de`) entsprechen.
 * Nicht aufgeführte Einträge sind `de` (oder was im Abbreviation-Objekt steht).
 */
export const langMap: Record<string, AbbrLang> = {
	// English terms
	BMS: 'en', BACS: 'en', HMI: 'en', SCADA: 'en', FAT: 'en', SAT: 'en',
	HVAC: 'en', AHU: 'en', HRV: 'en', ERV: 'en', VAV: 'en', CAV: 'en', DCV: 'en',
	HEPA: 'en', EER: 'en', SEER: 'en', VRF: 'en', DX: 'en', TXV: 'en', EEV: 'en',
	COP: 'en', SCOP: 'en', CHP: 'en', VFD: 'en', RCD: 'en', RCBO: 'en',
	ASHRAE: 'en', LEED: 'en', DGNB: 'en', BREEAM: 'en',
	UFH: 'en', DHW: 'en', MCB: 'en', MEP: 'en', UPS: 'en',
	PLC: 'en', LWP: 'de',
	DDC: 'en', 'EC-Motor': 'en',
	IDA: 'en', ODA: 'en', SUP: 'en', ETA: 'en', EHA: 'en', RCA: 'en',
	FCU: 'en', SFP: 'en', CHW: 'en',
	LDR: 'en', IoT: 'en', OT: 'en', RTU: 'en',
	BIM: 'en', IFC: 'en', MPC: 'en', LCC: 'en',
	V2G: 'en', MPPT: 'en',
	CCTV: 'en', HCL: 'en', ECG: 'en', SPD: 'en',
	DMZ: 'en', SSH: 'en', LCA: 'en', KPI: 'en', ROI: 'en',

	// International (standards, protocols, universal technical terms)
	PID: 'intl', PI: 'intl', P: 'intl',
	ΔT: 'intl', ΔP: 'intl',
	'OPC UA': 'intl', GWP: 'intl', ODP: 'intl',
	BACnet: 'intl', Modbus: 'intl', 'M-Bus': 'intl', 'wM-Bus': 'intl',
	MQTT: 'intl', KNX: 'intl', EIB: 'intl', DALI: 'intl', 'DALI-2': 'intl', LON: 'intl',
	LoRa: 'intl', LoRaWAN: 'intl', Zigbee: 'intl', 'Z-Wave': 'intl', EnOcean: 'intl',
	BLE: 'intl', PoE: 'intl', 'TCP/IP': 'intl', UDP: 'intl',
	LAN: 'intl', DNS: 'intl',
	DHCP: 'intl', NTP: 'intl', SNMP: 'intl', VLAN: 'intl', VPN: 'intl', TLS: 'intl',
	API: 'intl', REST: 'intl', JSON: 'intl', 'IEC 61850': 'intl',
	NTC: 'intl', PTC: 'intl', Pt100: 'intl', Pt1000: 'intl',
	'CO₂': 'intl', VOC: 'intl', RH: 'intl', PIR: 'intl',
	'0–10 V': 'intl', '4–20 mA': 'intl', PWM: 'intl',
	DI: 'intl', DO: 'intl', AI: 'intl', AO: 'intl',
	IE3: 'intl', IE4: 'intl', IE5: 'intl',
	PMV: 'intl', PPD: 'intl', LUX: 'intl',
	PV: 'intl', kWp: 'intl', BIPV: 'intl',
	EN: 'intl', ISO: 'intl', IEC: 'intl', R32: 'intl', R290: 'intl', R744: 'intl',
	ePM1: 'intl', 'ePM2.5': 'intl', ePM10: 'intl', F7: 'intl',
	DN: 'intl', PN: 'intl', Kv: 'intl',
	PELV: 'intl', SELV: 'intl',
	ppm: 'intl', CAFM: 'intl', 'SG Ready': 'intl',
};

export function langOf(short: string, fallback: AbbrLang = 'de'): AbbrLang {
	return langMap[short] ?? fallback;
}

/**
 * Liefert alle Kürzel, die im selben Konzept wie `short` liegen (ohne `short` selbst).
 * Z.B. `equivalentShorts('GLT')` → `['BMS']`
 */
export function equivalentShorts(short: string): string[] {
	const result: string[] = [];
	for (const group of conceptGroups) {
		if (group.includes(short)) {
			for (const s of group) {
				if (s !== short && !result.includes(s)) result.push(s);
			}
		}
	}
	return result;
}

/**
 * Liefert die vollen Abbreviation-Objekte aller Equivalent-Kürzel.
 * Reihenfolge: deutsch zuerst, dann englisch, dann intl.
 */
export function getEquivalents(short: string, all: Abbreviation[]): Abbreviation[] {
	const shorts = equivalentShorts(short);
	const order: AbbrLang[] = ['de', 'en', 'intl'];
	return shorts
		.map((s) => all.find((a) => a.short === s))
		.filter((a): a is Abbreviation => !!a)
		.sort((a, b) => order.indexOf(langOf(a.short)) - order.indexOf(langOf(b.short)));
}
