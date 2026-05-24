export const en = {
	app: {
		name: 'GA Tool',
		tagline: 'The BA Reference'
	},
	nav: {
		home: 'Home',
		converter: 'Converter',
		calculator: 'Calculator',
		knowledge: 'Knowledge Base',
		checklists: 'Checklists',
		reference: 'Reference',
		abbreviations: 'Abbreviations',
		settings: 'Settings',
		account: 'Account',
		profile: 'Profile',
		search: 'Search',
		searchOpen: 'Open search',
		close: 'Close',
		changelog: 'Changelog',
		updateNew: 'New in v{version}:',
		updateText:
			'PID Simulator, 16 new knowledge articles, RS-485/CAN/PROFIBUS/Matter, Changelog, Keyboard shortcuts'
	},
	auth: {
		login: 'Sign In',
		logout: 'Sign Out',
		email: 'Email',
		password: 'Password',
		name: 'Name',
		loginButton: 'Sign In',
		loginError: 'Login failed',
		invalidCredentials: 'Invalid email or password'
	},
	dashboard: {
		title: 'Dashboard',
		welcome: 'Welcome to GA Tool',
		tagline: 'The everyday BA reference',
		quickAccess: 'Quick Access',
		favorites: 'Favourites',
		recentlyUsed: 'Most Visited',
		removeFavorite: 'Remove from favourites',
		modules: {
			konverter: {
				name: 'Converter',
				desc: 'Unit converter — pressure, temperature, flow, humidity'
			},
			rechner: { name: 'Calculator', desc: 'Heating curve, Kv value, dew point, psychrometrics' },
			wissen: { name: 'Knowledge Base', desc: 'Articles on HVAC, BA, protocols' },
			checklisten: {
				name: 'Checklists',
				desc: 'Interactive commissioning/handover checklists with CSV export'
			},
			referenz: { name: 'Reference', desc: 'Tables — DN, filters, glycol, refrigerants' },
			abkuerzungen: { name: 'Abbreviations', desc: 'Acronyms — bilingual DE ↔ EN' }
		}
	},
	settings: {
		title: 'Settings',
		theme: 'Theme',
		themeAuto: 'Auto (System)',
		themeLight: 'Light',
		themeDark: 'Dark',
		themeOled: 'OLED',
		language: 'Language',
		langAuto: 'Auto (Browser)',
		langDe: 'German',
		langEn: 'English',
		defaultUnits: 'Default Units',
		normOutsideTemp: 'Design Outside Temperature (Location)'
	},
	common: {
		loading: 'Loading…',
		error: 'Error',
		save: 'Save',
		cancel: 'Cancel',
		search: 'Search…',
		back: 'Back',
		comingSoon: 'Coming soon',
		add: 'Add',
		delete: 'Delete',
		duplicate: 'Duplicate',
		edit: 'Edit',
		copy: 'Copy',
		copied: 'Copied',
		reset: 'Reset',
		close: 'Close',
		confirm: 'Confirm',
		allCalculators: 'All Calculators',
		allConverters: 'All Converters',
		noResults: 'No results.',
		rows: 'Rows',
		results: 'Result',
		resultsPlural: 'Results',
		type: {
			artikel: 'Article',
			rechner: 'Calculator',
			konverter: 'Converter',
			referenz: 'Reference',
			checkliste: 'Checklist'
		},
		addToFavorites: 'Add to favourites',
		removeFromFavorites: 'Remove from favourites',
		actions: 'Actions'
	},

	search: {
		placeholder: 'Search — articles, calculators, converters…',
		noResults: 'No results for "{query}"',
		navigate: 'Navigate',
		openItem: 'Open',
		ariaOverlay: 'Close search',
		ariaModal: 'Global search'
	},

	pwa: {
		offline: 'Offline — using cached data',
		offlineReady: 'Offline use ready',
		install: 'Install GA Tool',
		installBtn: 'Install'
	},

	// ── Areas & Difficulty ───────────────────────────────────────────────────
	area: {
		hlk: 'HVAC',
		sanitaer: 'Plumbing',
		elektro: 'Electrical',
		ga: 'BA',
		it: 'IT',
		normen: 'Standards'
	},

	difficulty: {
		grundlagen: 'Basics',
		fortgeschritten: 'Advanced',
		experte: 'Expert'
	},

	// ── Knowledge Base ────────────────────────────────────────────────────────
	wissen: {
		title: 'Knowledge Base',
		subtitle: 'Articles on controls, heating, ventilation, protocols and more.',
		searchPlaceholder: 'Title, tags, category…',
		resetFilter: 'Reset filters',
		fachbereich: 'Discipline',
		schwierigkeit: 'Difficulty',
		profileHint: 'Disciplines pre-selected from your profile — adjust in Profile.',
		noArticles: 'No articles found.',
		clearFilters: 'Clear all filters',
		backLink: 'Knowledge Base',
		updatedAt: 'Updated:',
		relatedTools: 'Calculators & Tools',
		relatedArticles: 'Related Articles',
		onlyGerman: 'This article is not yet available in English — showing German version.',
		deOnly: 'DE only'
	},

	// ── Checklists ────────────────────────────────────────────────────────────
	checklisten: {
		title: 'Checklists',
		subtitle: 'Interactive checklists — progress is saved automatically.',
		searchPlaceholder: 'Title, category…',
		allCategories: 'All Categories',
		noChecklists: 'No checklists found.',
		points: 'Points',
		critical: 'critical',
		sections: 'Sections',
		backLink: 'All Checklists',
		confirmReset: 'Reset all checkmarks and notes for this checklist?',
		done: 'done',
		showHint: 'Show hint',
		noteBtn: 'Note',
		notePlaceholder: 'Note for this item…',
		allDoneTitle: 'All items done!',
		allDoneText: 'You can now export the checklist as CSV and file it.',
		resetBtn: 'Reset',
		exportCSV: 'Export as CSV',
		infoText:
			'Checkmarks + notes are saved automatically in the browser (per checklist). CSV export for reports.',
		mustCriteria: 'Must criterion',
		savedFlash: '✓ saved',
		anlage: 'System',
		ort: 'Location',
		techniker: 'Technician',
		datum: 'Date',
		anlagePlaceholder: 'e.g. System name, year',
		ortPlaceholder: 'e.g. Location',
		technicianPlaceholder: 'Name',
		csvProgress: 'Progress',
		csvHeaders: 'Section;Item;Done;Critical;Norm;Note',
		csvYes: 'YES',
		csvNo: 'NO'
	},

	// ── Reference ─────────────────────────────────────────────────────────────
	referenz: {
		title: 'Reference',
		subtitle: 'Tables — material properties, standards, filter classes.',
		searchPlaceholder: 'Table title, category, description…',
		allCategories: 'All Categories',
		noTables: 'No tables found.',
		rows: 'Rows',
		backLink: 'All Tables',
		searchInTable: 'Search in table…',
		clickToCopy: 'Click to copy',
		copyRow: 'Copy entire row (TSV)',
		noRowsMatch: 'No rows match the search.',
		noteLabel: 'Note',
		infoText:
			'Click a cell to copy the value. Click the icon on the right to copy the row as TSV. Click a column heading to sort ascending/descending.'
	},

	// ── Abbreviations ─────────────────────────────────────────────────────────
	abkuerzungen: {
		title: 'Abbreviations',
		subtitle: 'Acronyms from building automation, HVAC, IT and standards.',
		searchPlaceholder: 'Acronym, full form or description…',
		reset: 'Reset',
		noResults: 'No results.',
		results: 'Result',
		also: 'Also:',
		related: 'related:',
		wissensartikel: '→ Knowledge article',
		hasArticle: 'Has a knowledge article',
		navAZ: 'Quick navigation A-Z',
		langAuto: 'Auto (Browser)',
		langDe: 'German',
		langEn: 'English',
		langIntl: 'International'
	},

	// ── Calculator Index ──────────────────────────────────────────────────────
	rechner: {
		title: 'Calculators',
		subtitle: 'Engineering calculations for building automation',

		// Calculator names & descriptions
		heizkurve: {
			name: 'Heating Curve',
			short: 'Flow temperature from outdoor temperature — manufacturer-specific'
		},
		kvWert: {
			name: 'Kv Value',
			short: 'Valve sizing: Kv from Δp + flow rate'
		},
		ausdehnungsgefaess: {
			name: 'Expansion Vessel',
			short: 'MAV volume from system content + pressures'
		},
		druckverlust: {
			name: 'Pressure Drop',
			short: 'Pipework: R × L + Σζ → Δp total'
		},
		luftbedarf: {
			name: 'Air Requirement',
			short: 'Minimum outside air volume per EN 16798'
		},
		taupunkt: {
			name: 'Dew Point',
			short: 'From air temperature + relative humidity → dew point'
		},
		waermeleistung: {
			name: 'Thermal Power',
			short: 'Q = ṁ × cp × ΔT (heating/cooling/heat meter)'
		},
		psychrometrie: {
			name: 'Psychrometrics',
			short: 'h-x diagram: all state variables for moist air'
		},
		pidSimulator: {
			name: 'PID Simulator',
			short: 'PT1 + dead time · anti-windup · HVAC presets · real-time simulation'
		},
		leitungslaenge: {
			name: 'Cable Length & Voltage Drop',
			short: 'ΔU = 2×L×ρ×I/A — max. length, cross-section, 24V device presets'
		},
		elektro: {
			name: 'Electrical Basics',
			short: "Ohm's law · P=U×I · AC active/reactive/apparent power · current from power"
		},
		dipSwitch: {
			name: 'DIP Switch Address Calculator',
			short: 'BACnet MSTP · Modbus RTU · KNX — address ↔ DIP switch position'
		},
		gewichteterMittelwert: {
			name: 'Weighted Average',
			short: 'Any number of values with individual weighting'
		},
		co2Regelung: {
			name: 'CO₂ Control',
			short: 'Flow rate sizing + room time constant for DDC parameterisation'
		},
		uWert: {
			name: 'U-Value',
			short: 'Thermal transmittance from layer construction — SIA 380/1 · Minergie'
		},
		ventilautoritaet: {
			name: 'Valve Authority',
			short: 'α = ΔpV / (ΔpV + ΔpSystem) + Kvs selection per EN 60534'
		},
		waermerueckgewinnung: {
			name: 'Heat Recovery',
			short: 'HRV efficiency, supply air temperature, energy saving per EN 308'
		},
		pumpenkennlinie: {
			name: 'Pump Curve',
			short: 'H-Q diagram, operating point, specific speed — Grundfos/Wilo presets'
		},
		heizlast: {
			name: 'Heat Load',
			short: 'Room and building heat load per SIA 384.201 — transmission + ventilation'
		},
		busIbn: {
			name: 'Bus Commissioning Address Configurator',
			short:
				'BACnet MSTP/IP · Modbus RTU · KNX — address management with commissioning document export'
		},
		polynomFit: {
			name: 'Polynomial Fit',
			short: 'Sensor linearization: characteristic curve from measurement points as polynomial',
			intro:
				'Fit a polynomial (degree 1–5) through your measurement points using least squares. Application: linearize sensor characteristics, convert datasheet tables into DDC/PLC-friendly polynomials.'
		},

		// Shared UI strings across calculators
		ui: {
			mode: 'Mode',
			calculate: 'Calculate',
			input: 'Input',
			result: 'Result',
			results: 'Results',
			medium: 'Medium',
			water: 'Water',
			location: 'Location',
			city: 'City (CH)',
			manufacturer: 'Manufacturer',
			system: 'System',
			warning: 'Warning',
			wikiLink: 'Learn more →'
		},

		// Per-page strings
		heizkurveUi: {
			formulaNote:
				'Formulas are approximations of the respective manufacturer algorithms — exact values may vary by firmware. For underfloor heating n ≈ 1.1, radiators n ≈ 1.3. Sources: SIA 384/2, manufacturer documentation.',
			manufacturerSystem: 'Manufacturer / System',
			heatEmitter: 'Heat emitter',
			radiator: 'Radiator (n ≈ 1.3)',
			floor: 'Underfloor (n ≈ 1.1)',
			liveQuery: 'Live reading',
			currentOutdoor: 'Current outdoor temperature',
			flowSetpoint: '→ Flow setpoint',
			honeywellSection: 'Honeywell — 2-point',
			sauterSection: 'Sauter — Parameters',
			footpoint: 'Foot point',
			footpointHint: 'Flow temp at heat limit',
			curveSteepness: 'Steepness',
			curveParams: 'Curve parameters',
			slope: 'Slope',
			level: 'Level',
			levelHint: 'Parallel shift ± K',
			siteAndPlant: 'Location + system',
			normOutdoor: 'Design outdoor',
			roomSetpoint: 'Room setpoint',
			heatLimit: 'Heat limit',
			heatLimitHint: 'No heating above this',
			minFlow: 'Min. flow',
			maxFlow: 'Max. flow',
			designFlow: 'Design flow at {t} °C',
			maxFlowWarning:
				'⚠ Design temperature {tv} °C limited by max. flow {max} °C. Higher slope or level is ineffective. Heating surface possibly undersized.',
			curve: 'Curve',
			normOutdoorLegend: 'Design outdoor',
			currentLegend: 'current',
			outdoorTempAxis: 'Outdoor temperature [°C]',
			slopeRangeHint: 'Range {min}–{max}',
			honeywellPoint1OutdoorTemp: 'Point 1: Outdoor temp TA₁',
			honeywellPoint1Flow: 'Point 1: Flow TV₁',
			honeywellPoint2OutdoorTemp: 'Point 2: Outdoor temp TA₂',
			honeywellPoint2Flow: 'Point 2: Flow TV₂'
		},

		ausdehnungsgefaessUi: {
			warnPrePressureDetail:
				'Pre-charge p₀ = {p0} bar is below the recommended minimum ({min} bar). At static height {h} m, p₀ must be ≥ {min} bar to avoid negative pressure zones.',
			warnSpreadDetail:
				'Spread pₑ − p₀ = {spread} bar too small. Typical ≥ 0.8 bar — otherwise the expansion vessel becomes very large.',
			formulaNote:
				'Formula: V_N = (V_e + V_wv) × (pₑ + 1) / (pₑ − p₀) · Water cushion V_wv = max(0.5 % × V_A, 3 l). Standard expansion vessel sizes per SWKI 91-1.',
			plant: 'System',
			plantContent: 'System volume',
			plantContentHint: 'Water volume in the system',
			maxFlowTemp: 'Max. flow temperature',
			staticHeight: 'Static height',
			staticHeightHint: 'Height difference boiler ↔ highest point',
			pressures: 'Pressures',
			prePressure: 'Pre-charge p₀',
			prePressureHint: 'Recommended min. {p} bar (static + 0.3)',
			finalPressure: 'Final pressure pₑ',
			finalPressureHint: 'Safety valve − 0.5 bar',
			recommendedMAG: 'Recommended MAV (standard size)',
			nominalVolume: 'Calculated nominal volume V_N',
			expansionVolume: 'Expansion volume V_e',
			waterReserve: 'Water cushion V_wv',
			expansionCoeff: 'Expansion coefficient e',
			pressureFactor: 'Pressure factor',
			warnPrePressure: 'Pre-charge p₀ is below the recommended minimum.',
			warnSpread: 'Spread pₑ − p₀ too small.'
		},

		luftbedarfUi: {
			formulaNote:
				'Calculation per SN EN 16798-1: the larger of the two values applies (person + area requirement vs. CO₂ mass balance). Outdoor CO₂ = 400 ppm assumed.',
			room: 'Room',
			floorArea: 'Floor area',
			roomHeight: 'Room height',
			occupants: 'Number of occupants',
			requirement: 'Requirement',
			category: 'Quality category EN 16798-1',
			activityLevel: 'Activity level',
			cat1: 'I — high (sensitive areas)',
			cat2: 'II — normal (standard)',
			cat3: 'III — moderate',
			cat4: 'IV — minimal',
			cat1desc: 'Hospitals, nurseries',
			cat2desc: 'Offices, apartments, schools',
			cat3desc: 'Existing buildings',
			cat4desc: 'Temporary use',
			actRest: 'Rest (sleeping, sitting)',
			actOffice: 'Office / light activity',
			actPhysical: 'Physical work',
			recommendedFlow: 'Recommended outside air flow',
			perEN: '… per EN 16798',
			perCO2: '… CO₂-based (target {ppm} ppm)',
			airChange: 'Air change rate',
			roomVolume: 'Room volume'
		},

		waermeleistungUi: {
			calcMode: 'Calculate',
			calcQfromVT: 'Power Q from V̇ + ΔT',
			calcVfromQT: 'Flow rate from Q + ΔT',
			calcTfromQV: 'ΔT from Q + V̇',
			water: 'Water',
			waterNote: 'cp = 4.182 kJ/(kg·K), ρ = 1000 kg/m³',
			brine30: 'Brine 30% glycol',
			brine30Note: 'Ethylene glycol 30%, average',
			brine40: 'Brine 40% glycol',
			brine40Note: 'Ethylene glycol 40%, average',
			air: 'Air',
			airNote: 'at 20 °C, 1 bar',
			volumeFlow: 'Volume flow V̇',
			tempDiff: 'Temperature difference ΔT',
			power: 'Thermal power Q',
			massFlow: 'Mass flow ṁ'
		},

		taupunktUi: {
			formulaNote:
				'Calculated using Magnus formula (constants a = 17.62, b = 243.12 °C). Valid in range −45 … +60 °C over water.',
			airTemp: 'Air temperature',
			relHumidity: 'Relative humidity',
			dewpoint: 'Dew point',
			absHumidity: 'Absolute humidity',
			tempSpread: 'Spread T − dew point',
			warnCondensation:
				'Condensation risk: surface temperature below approx. {t} °C may cause condensation.'
		},

		ventilautoritaetUi: {
			formulaNote:
				'Kv = Q / √(ΔpV) with ΔpV in bar, Q in m³/h — per EN 60534. Select Kvs ≥ Kv × 1.3 (control range + reserve).',
			tabAuthority: 'Valve authority α',
			tabKvs: 'Kvs selection',
			pressures: 'Pressure distribution',
			dpValve100: 'Δp valve at 100% stroke (ΔpV,100)',
			dpValve100Hint: 'Pressure loss fully open valve',
			dpSystem: 'Δp remaining circuit (ΔpSystem)',
			dpSystemHint: 'Heat exchanger + pipework without valve',
			authority: 'Valve authority α',
			rating: 'Rating',
			ratingVG: 'Very good (α ≥ 0.5)',
			ratingG: 'Good (α 0.3–0.5)',
			ratingA: 'Acceptable (α 0.2–0.3)',
			ratingS: 'Poor (α < 0.2)',
			totalDp: 'Total pressure drop circuit',
			effectiveCurve: 'Effective characteristic',
			designData: 'Design data',
			designFlow: 'Design flow rate',
			dpAtDesign: 'Δp valve at design flow',
			dpAtDesignHint: 'Set differential pressure at valve',
			calcKv: 'Calculated Kv',
			recommendedKvs: 'Recommended Kvs (× 1.3 safety)',
			kvsOverKv: 'Kvs / Kv',
			kvsStandard: 'Standard Kvs series',
			curveNote: 'Grey = ideal line (α = 1). The smaller α, the more the effective curve deviates.',
			authorityFormulaNote:
				'α = ΔpV,100 / (ΔpV,100 + ΔpSystem) — Recommendation: α ≥ 0.5 (min. 0.3). Low α → valve loses control influence → disproportionate flow increase at small lifts.'
		},

		uWertUi: {
			surfaceType: 'Component type (surface resistances)',
			outerWall: 'External wall',
			innerWall: 'Internal wall',
			roofOutside: 'Roof (external)',
			floorGround: 'Floor against ground',
			floorOutside: 'Floor against outside air',
			custom: 'Custom',
			rsiLabel: 'Rsi (inside)',
			rseLabel: 'Rse (outside)',
			layers: 'Layer construction (inside to outside)',
			layerName: 'Description',
			addLayer: '+ Add layer',
			uValue: 'U-value',
			totalR: 'Total resistance R_T',
			wallBuild: 'Wall construction (without plaster)',
			comparison: 'Comparison limit values (SIA 380/1 · Minergie)',
			presetPlaceholder: 'Preset…',
			removeLayer: 'Remove layer',
			matConcrete: 'Dense concrete',
			matBrick: 'Solid brick',
			matLightConcrete: 'Lightweight concrete',
			matCalcSandstone: 'Calcium silicate block',
			matAeratedConcrete: 'Aerated concrete (0.4)',
			matMineralWool: 'Mineral wool',
			matEPS: 'EPS (polystyrene foam)',
			matXPS: 'XPS (extruded polystyrene)',
			matTimber: 'Timber (spruce)',
			matFibreBoard: 'Wood fibre board',
			matGypsum: 'Plasterboard',
			matScreed: 'Screed / cement',
			matParquet: 'Parquet / hardwood floor',
			matCeramic: 'Ceramic / tiles',
			matGlassWool: 'Glass wool',
			matPUR: 'PUR foam',
			matAirGap: 'Air gap (still)',
			formulaNoteWarnBridges:
				'U = 1 / (Rsi + Σ(d/λ) + Rse) per SIA 180 / EN ISO 6946. Thermal bridges and fixings not included.'
		},

		waermerueckgewinnungUi: {
			annualSavingNote:
				'Annual cost saving: assumes 2000 heating hours, electricity/heat price 0.12 CHF/kWh.',
			wrgType: 'HRV type',
			enthalpyExchanger: 'Cross-counterflow (enthalpy exchanger)',
			rotarySorption: 'Rotary sorption HRV',
			plateHeatEx: 'Plate heat exchanger (heat only)',
			recirculationSystem: 'Recirculation system / thermal wheel',
			typicalEta: 'Typical η_T:',
			noMoistureTransfer: 'No moisture transfer',
			operatingConditions: 'Operating conditions',
			volumeFlow: 'Volume flow',
			exhaustAirTemp: 'Exhaust air temperature (inside)',
			outsideAirTemp: 'Outside air temperature',
			exhaustAirHumidity: 'Exhaust air relative humidity',
			efficiencies: 'Efficiencies',
			tempEfficiency: 'Temperature recovery efficiency η_T',
			humidityEfficiency: 'Moisture recovery efficiency η_F',
			supplyAirTemp: 'Supply air temperature after HRV',
			recoveredPower: 'Recovered heating power',
			energySaving: 'Energy saving vs. without HRV',
			supplyHumidity: 'Supply air moisture after HRV',
			annualSaving: 'Annual energy saving (2000h, 0.12 CHF/kWh)',
			typicalEtaHint: 'Typical {min}–{max}% for {type}',
			noteEnthalpyExchanger:
				'Moisture transfer possible (membrane). Very high efficiency, no leakage issues.',
			noteRotarySorption: 'High moisture recovery. Note: slight leakage exhaust→supply (1–5%).',
			notePlateHeatEx:
				'No moisture transfer. Simple, robust, no leakage risk. Frost protection required.',
			noteRecirculation: 'Heat only, moderate efficiency. Used with separate supply/exhaust ducts.'
		},

		druckverlustUi: {
			flow: 'Flow',
			volumeFlow: 'Volume flow V̇',
			pipework: 'Pipework',
			nominalSize: 'Nominal size',
			pipeLength: 'Total pipe length',
			pipeLengthHint: 'Flow + return, approximate total',
			localLosses: 'Σζ local resistances',
			localLossesHint: 'Bends, tees, valves (typical 10–25)',
			totalDp: 'Total pressure drop Δp',
			frictionDp: '… friction Δp_L',
			localDp: '… local losses Δp_Z',
			velocity: 'Flow velocity v',
			pressureGradient: 'Pressure gradient R',
			reynolds: 'Reynolds number Re',
			warnHighVelocity: 'Velocity {v} m/s above recommendation.',
			warnLowVelocity: 'Flow velocity very low.',
			mediumWater: 'Water 20 °C',
			mediumBrine: 'Brine 30 % @ 20 °C',
			formulaNote:
				'Pressure drop formula: Δp = (λ × L/d + Σζ) × ρ × v² / 2. Friction factor λ: laminar (Re < 2300) = 64/Re, turbulent: Swamee-Jain approx. with k = 0.045 mm (steel).'
		},

		psychrometrieUi: {
			warnSaturated:
				'The calculated state is above the saturation line (φ > 100 %). At this temperature the air cannot hold this much moisture — condensation occurs.',
			formulaNote:
				'Calculation via Magnus over water. h = 1.006 × T + x × (2501 + 1.86 × T) [kJ/kg dry air]. Reference pressure p₀ = 101 325 Pa (sea level).',
			stateDef: 'State definition',
			inputVars: 'Input variables',
			tRelHumidity: 'T + rel. humidity',
			tAbsHumidity: 'T + abs. humidity x',
			tDewpoint: 'T + dew point',
			tEnthalpy: 'T + enthalpy h',
			airTemp: 'Air temperature',
			relHumidity: 'Relative humidity',
			absHumidity: 'Absolute humidity',
			dewpoint: 'Dew point',
			enthalpy: 'Enthalpy',
			pressure: 'Air pressure',
			stdPressure: 'Standard 101 325 Pa',
			tempT: 'Temperature T',
			relHumPhi: 'Relative humidity φ',
			absHumX: 'Absolute humidity x',
			specificEnthalpy: 'Specific enthalpy h',
			dewpointTd: 'Dew point T_d',
			wetBulb: 'Wet bulb temperature T_wb',
			satPressure: 'Saturation pressure p_s',
			partialPressure: 'Partial pressure p_w',
			density: 'Air density ρ',
			specVolume: 'Specific volume v'
		},

		pidSimulatorUi: {
			title: 'PID Controller Simulator',
			subtitle: 'PT1 + dead time plant model · anti-windup · HVAC presets',
			controller: 'Controller · PID',
			proportionalBand: 'Proportional band',
			integralTime: 'Integral time',
			derivativeTime: 'Derivative time',
			direction: 'Action direction',
			setpoint: 'Setpoint',
			theory: 'Theory & background',
			hvacPresets: 'HVAC presets',
			simulation: 'Simulation',
			timeScale: 'Time scale',
			viewWindow: 'View window',
			auto: 'AUTO',
			disturbance: 'Disturbance d',
			status: 'Status',
			controllerTerms: 'Controller terms',
			plantModel: 'Plant model',
			deadTime: 'Dead time',
			dOff: 'D-term OFF',
			dOn: 'D-term active',
			modeHeat: 'Heating (inverse)',
			modeCool: 'Cooling (direct)',
			hintHeat: 'PV above SP → Y closes (valve closed)',
			hintCool: 'PV above SP → Y opens (more cooling)',
			statusSettled: 'Settled',
			statusSaturated: 'Output saturated',
			presetRaumHeizung: 'Room-T Heating',
			presetVorlauf: 'Flow-T',
			presetKaelte: 'District Cooling',
			presetDruck: 'Pressure',
			presetFeuchte: 'Humidity',
			presetDemo: 'PID Demo',
			theoryBasics: 'Basics',
			theoryAdvanced: 'Advanced',
			setpointW: 'Setpoint W',
			actualValueX: 'Actual value X',
			dayValue: 'Day value',
			nightValue: 'Night value',
			outputY: 'Output Y',
			gain: 'Gain',
			disturbanceSection: 'Disturbance · Load step',
			autoDisturbance: 'Auto disturbance',
			controlDeviation: 'Control deviation e',
			timeConstant: 'Time constant',
			jumpAmplitude: 'Step amplitude',
			active: 'Active',
			inactive: 'Inactive',
			sine: 'Sine',
			square: 'Square',
			noise: 'Noise',
			amplitude: 'Amplitude',
			period: 'Period',
			filterPT1: 'PT1 filter',
			noFilter: 'no filter',
			bias: 'Bias (Offset)',
			noOffset: 'no offset',
			spAutoSection: 'SP Auto · Day/Night',
			switchPeriod: 'Switch period',
			iTermOff: 'I-term OFF',
			yes: 'YES',
			no: 'NO',
			resetDist: 'Reset (d = {val} {unit})',
			windowMeta: 'Window'
		},

		co2RegelungUi: {
			roomOccupancy: 'Room & occupancy',
			roomVolume: 'Room volume',
			occupants: 'Number of occupants',
			persons: 'pers.',
			activityLevel: 'Activity level',
			co2Outside: 'CO₂ outdoor',
			co2Target: 'CO₂ target',
			orManual: 'Or manual',
			minFlow: 'Minimum flow rate',
			airChange: 'Air change rate',
			timeConstant: 'Time constant τ',
			time90: 'Time to 90% of change (2.3 × τ)',
			target: 'Target',
			outside: 'Outside',
			ventilationUnit: 'Ventilation unit',
			volumeFlow: 'Volume flow',
			steadyStateCO2: 'Steady-state CO₂ (full occupancy)',
			modeAuslegung: 'Design',
			modeRaumverhalten: 'Room behaviour',
			co2RiseTitle: 'CO₂ rise (full occupancy, start = {co2} ppm)',
			infoAuslegung:
				'q = G / (c_target − c_outdoor) × 10⁶ — decisive for DDC design at full occupancy. Time constant τ = V / q indicates room inertia (relevant for PID parameterisation).',
			infoRaumverhalten:
				'c(t) = c_SS − (c_SS − c₀) · e^(−t/τ) — rise at constant occupancy and constant flow. For PID parameterisation: plant has time constant τ and no integrating behaviour (PT1 plant).',
			actRest: 'Rest / sleeping',
			actOffice: 'Office / light activity',
			actPhysical: 'Physical work',
			presetCat1: 'Cat. I — excellent (EN 16798)',
			presetCat2: 'Cat. II — good (EN 16798)',
			presetCat3: 'Cat. III — moderate',
			presetPettenkofer: 'Pettenkofer limit',
			presetCritical: 'Critical (drowsiness)'
		},

		pumpenkennlinieUi: {
			pump: 'Pump',
			preset: 'Preset',
			shutoffHead: 'Maximum head (shutoff head)',
			freeDelivery: 'Maximum flow (free delivery)',
			designPoint: 'Pipework design point',
			designPointHint: 'Total pressure drop incl. valves, HX, fittings',
			operatingQ: 'Operating point Q',
			operatingH: 'Operating point H',
			operatingVsDesign: 'Operating point vs. design',
			hqDiagram: 'H-Q diagram (approximation)',
			shutoffHeadLabel: 'Shutoff head at Q=0 (H₀)',
			freeDeliveryLabel: 'Max. flow rate at H=0 (Q₀)',
			designFlowLabel: 'Design flow rate',
			networkPressureDrop: 'Pipe network pressure drop at design point',
			noIntersection:
				'No intersection in valid range — pump undersized or pipe network incorrectly configured.',
			pumpCurveLabel: 'Pump curve',
			networkLabel: 'Pipe network',
			operatingPointLabel: 'Operating point',
			customPreset: 'Custom',
			formulaNote:
				'Pump curve: H(Q) = H₀ × (1 − (Q/Q₀)²) — parabolic approximation. Pipe network: H(Q) = R × Q² with R = ΔpDesign / Q²Design. Operating point = intersection of both curves.',
			operatingPointTooltip: 'Operating point'
		},

		leitungslaengeUi: {
			calculation: 'Calculation',
			find: 'Find',
			voltDropAtLength: 'Voltage drop at given length',
			maxLength: 'Maximum cable length',
			minCrossSection: 'Minimum cross-section for length',
			parameters: 'Parameters',
			sourceVoltage: 'Source voltage',
			minVoltageDevice: 'Minimum device voltage',
			inputAs: 'Input as',
			currentA: 'Current A',
			powerW: 'Power W',
			powerPerDevice: 'Power per device',
			currentPerDevice: 'Current per device',
			pcs: 'pcs.',
			atEnd: 'At end',
			distributed: 'Distributed',
			lineLength: 'Cable length (one way)',
			crossSection: 'Cross-section',
			voltDrop: 'Voltage drop ΔU',
			devicePreset: 'Device preset',
			presetHint: 'Sets minimum voltage + current',
			deviceCount: 'Number of devices',
			totalCurrentHint: 'Total current: {i} A',
			devicePlacement: 'Device placement',
			placementEndHint: 'All at cable end — conservative',
			placementDistHint: 'Evenly distributed — approx. 50% less ΔU',
			voltageAtDevice: 'Voltage at device',
			voltDropPct: 'Voltage drop',
			cableResistance: 'Cable resistance (fwd + return)',
			warnVoltageLow:
				'Voltage at device too low ({u} V < {umin} V) — increase cross-section or reduce length.',
			warnCurrentHigh: 'Current capacity exceeded: {i} A > {imax} A (permitted for {cs} mm²)',
			infoCalc:
				'ΔU = 2 × L × ρ × I_eff / A · ρCu = {rho} Ω·mm²/m · Total length (fwd + return): {l} m · I_eff = {i} A ({placement})',
			maxCableLength: 'Max. cable length ({cs} mm²)',
			allowedDrop: 'Permitted voltage drop',
			compareAll: 'Compare all cross-sections',
			currentTooHigh: 'Current too high ({imax} A max)',
			infoLength: 'Cable length = one-way length (forward + return accounted for)',
			minCrossSect: 'Minimum cross-section',
			recommendedSection: 'Recommended standard cross-section',
			stdSections: 'Standard cross-sections:',
			placementEndLabel: 'all at end',
			placementDistLabel: 'distributed × 0.5',
			presetKNX: 'KNX bus coupler',
			presetRS485: 'RS-485 device',
			presetDALI: 'DALI controller',
			presetActuator: 'Damper actuator 24V'
		},

		elektroUi: {
			ohmsLaw: "Ohm's law — U = R × I",
			find: 'Find',
			resistance: 'Resistance R (Ω)',
			voltage: 'Voltage U (V)',
			current: 'Current I (A)',
			voltageU: 'Voltage U',
			currentI: 'Current I',
			resistanceR: 'Resistance R',
			powerDC: 'DC power — P = U × I',
			powerP: 'Power P (W)',
			powerLabel: 'Power P',
			powerAC: 'AC Power — Active / Reactive / Apparent',
			powerFactor: 'Power factor cos φ',
			activePower: 'Active power P',
			reactivePower: 'Reactive power Q',
			apparentPower: 'Apparent power S',
			currentFromPower: 'Current from power + protection',
			circuit: 'Circuit',
			recommendedFuse: 'Recommended fuse',
			fuseNote: 'Fuse = next higher standard value (6–32 A) at I × 1.25 (80% rule per NIN/VDE)'
		},

		dipSwitchUi: {
			protocol: 'Protocol',
			custom: 'Custom',
			switchCount: 'Switch count',
			options: 'Options',
			numbering: 'Numbering',
			invertedLogic: 'Inverted logic',
			invertedDesc: 'OFF = 1 / ON = 0',
			protocolInfo: 'Protocol info',
			dipSwitchPositions: 'DIP switch positions',
			bitWeight: 'Bit weight',
			subtitle: 'Addressing for BACnet MSTP, Modbus RTU, KNX and custom protocols',
			range: 'Range',
			bitResolution: 'Bit resolution',
			warnOutOfRange: 'Address outside valid range ({min}–{max})',
			infoBacnetMstp:
				'BACnet MS/TP uses MAC addresses 0–127 (7 bit). Each device on the bus needs a unique address. Addresses 0–127 for devices, 128+ reserved for routers/broadcasts.',
			infoModbusRtu:
				'Modbus RTU uses Slave IDs 1–247 (0 = Broadcast, 248–255 reserved). 8 DIP-Switches cover the full range. Address 0 is reserved for broadcast commands and must not be assigned to any device.',
			infoKnx:
				'KNX DIP-Switches typically encode the line number or device address within a line (0–255, 8 bit). The full physical address (Area.Line.Device) is assigned via ETS.',
			infoCustom: 'Custom configuration. Switch count and address range freely configurable.',
			addressLabelKnx: 'Physical address (line)',
			addressLabelCustom: 'Address'
		},

		heizlastUi: {
			locationNorm: 'Location & design outdoor temperature',
			normOutdoor: 'Design outdoor temperature (Te)',
			normOutdoorIs: 'Design outdoor Te =',
			rooms: 'Rooms',
			designation: 'Description',
			roomSetpoint: 'Room setpoint',
			floorArea: 'Floor area',
			roomHeight: 'Room height',
			uWallLabel: 'U-value wall',
			uRoofLabel: 'U-value roof/ceiling',
			uFloorLabel: 'U-value floor',
			uWindowLabel: 'U-value window',
			windowArea: 'Total window area',
			airChange: 'Air change rate (infiltration)',
			roomHeatload: 'Room heat load:',
			custom: 'Custom',
			removeRoom: 'Remove room',
			addRoom: 'Add room:',
			totalHeatload: 'Total heat load',
			specificHeatload: 'Specific heat load',
			totalArea: 'Total heated area',
			benchmarkTitle: 'Reference specific heat load:',
			benchmarkMinergie: 'Minergie: <30 W/m²',
			benchmarkNew: 'New build: 30–60 W/m²',
			benchmarkOld: 'Old building: 60–100 W/m²',
			benchmarkUninsulated: 'Uninsulated: >100 W/m²',
			calcNote:
				'Simplified calculation per EN 12831 / SIA 384.201. External wall area via geometric approximation (square floor plan). For planning permission and standard calculations, a detailed heat load calculation with thermal bridges and exact component areas is required.',
			roomWohnen: 'Living room',
			roomSchlafen: 'Bedroom',
			roomBad: 'Bathroom',
			roomBuero: 'Office',
			roomTreppenhaus: 'Stairwell',
			roomKeller: 'Basement (unheated → 0)'
		},

		polynomFitUi: {
			dataPoints: 'Measurement points (x, y)',
			addRow: 'Add point',
			degree: 'Polynomial degree',
			degreeHint: '1 = linear, 2 = parabola, 3 = cubic …',
			linear: 'Linear',
			quadratic: 'Quadratic',
			cubic: 'Cubic',
			coefficients: 'Coefficients',
			chart: 'Curve',
			evaluate: 'Evaluate polynomial',
			needMorePoints: 'Please enter at least 2 data points.',
			degreeReduced:
				'Note: degree reduced to {effective} — not enough points for the requested degree.'
		},

		kvWertUi: {
			kvFromQdp: 'Kv from V̇ + Δp',
			dpFromQkv: 'Δp from V̇ + Kv',
			qFromKvdp: 'V̇ from Kv + Δp',
			volumeFlow: 'Volume flow V̇',
			pressureDiff: 'Pressure difference Δp',
			kvValue: 'Kv value',
			recommendedKvs: 'Recommended Kvs (standard size)',
			warnLowAuthority:
				'Low valve authority (a ≈ {a}). For good control α ≥ 0.3 — valve may be oversized.',
			formulaNote: 'Formula: Kv = V̇ × √(1 / Δp), water at 20 °C.',
			stdKvsSeries: 'Standard Kvs per DIN EN 1267:'
		}
	},

	// ── Converter Index ───────────────────────────────────────────────────────
	konverter: {
		title: 'Converters',
		subtitle: 'Unit conversion for building automation',
		copyValue: 'Copy value',
		copy: 'Copy',
		allConverters: 'All Converters',
		resetAll: 'Reset all',
		druck: { name: 'Pressure' },
		durchfluss: { name: 'Flow rate' },
		energie: { name: 'Energy' },
		feuchte: { name: 'Humidity' },
		leistung: { name: 'Power' },
		luftmengen: { name: 'Air flow' },
		temperatur: { name: 'Temperature' },
		signal: { name: 'Analog signal' },
		beleuchtung: { name: 'Lighting' },
		winkel: { name: 'Angle / Valve position' }
	},

	// ── Changelog ─────────────────────────────────────────────────────────────
	changelog: {
		title: 'Changelog',
		subtitle: 'Version history GA Tool'
	},

	// ── Profile ───────────────────────────────────────────────────────────────
	profil: {
		title: 'Profile',
		subtitle: 'Personal data, preferences and overview',
		admin: 'Admin',
		recentlyUsed: 'Recently used',
		clear: 'Clear',
		emptyRecent: 'Nothing opened yet. Converters and calculators appear here after first use.',
		quickSettings: 'Quick settings',
		theme: 'Theme',
		personalData: 'Personal data',
		nameLabel: 'Name',
		emailLabel: 'E-Mail',
		emailHint: 'E-mail is set via login',
		roleLabel: 'Professional role',
		rolePlaceholder: '— select —',
		companyLabel: 'Company',
		disciplines: 'Disciplines',
		disciplinesHint: 'Multiple selection — affects filters in the knowledge base',
		mfrPrefs: 'Preferred manufacturers',
		mfrPrefsHint: 'Used as default in the heating curve calculator',
		defaultCity: 'Default location',
		defaultCityHint:
			'Automatically sets the standard outdoor temperature in the heating curve calculator',
		cityLabel: 'City',
		normTemp: 'Design outdoor temperature',
		noDefault: '— no default —',
		notesLabel: 'Notes',
		notesHint: 'Personal notes, setup info, etc.',
		saved: '✓ Saved',
		saving: 'Saving…',
		save: 'Save',
		changePassword: 'Change password',
		currentPassword: 'Current password',
		newPassword: 'New password',
		confirmPassword: 'Confirm new password',
		passwordChanged: '✓ Password changed',
		changing: 'Changing…',
		typeKonverter: 'Converter',
		typeRechner: 'Calculator',
		typeWissen: 'Article',
		typeReferenz: 'Reference',
		typeCheckliste: 'Checklist',
		errors: {
			notLoggedIn: 'Not logged in',
			nameRequired: 'Name must not be empty',
			fillAll: 'Fill in all fields',
			minPw: 'New password min. 8 characters',
			pwMismatch: 'Passwords do not match',
			wrongPw: 'Current password incorrect'
		}
	},

	// ── Bus Commissioning ─────────────────────────────────────────────────────
	busIbn: {
		title: 'Bus Commissioning Address Configurator',
		subtitle:
			'BACnet MSTP/IP · Modbus RTU · KNX — address management with commissioning document export',
		printTitle: 'Bus Commissioning Address Configuration',

		// Toolbar
		groupBy: 'Group:',
		groupNone: 'None',
		groupArea: 'Area / Floor',
		groupDeviceType: 'Device type',
		groupManufacturer: 'Manufacturer',
		importCsv: 'Import CSV (semicolon or comma separated)',
		importJson: 'Load complete project as JSON',
		exportCsv: 'Export all segments as CSV',
		exportJson: 'Export project as JSON backup',

		// Project fields
		projectName: 'Project name',
		projectNamePlaceholder: 'Project name',
		site: 'Site',
		sitePlaceholder: 'Site / address',
		engineer: 'Engineer',
		engineerPlaceholder: 'Name',
		version: 'Version',
		date: 'Date',

		// Segments
		segmentNamePlaceholder: 'Segment name',
		segmentDescPlaceholder: 'Area / floor',
		exportSegmentCsv: 'Export segment as CSV',
		addFromLibrary: 'Add from library',
		segmentSettings: 'Settings',
		deleteSegment: 'Delete segment',
		addSegment: 'Add segment',
		chooseProtocol: 'Choose bus type:',
		addSegmentBtn: 'Add',
		startAddress: 'Start address',
		startAddressHint: 'Auto-increment starts from this address',
		diOffset: 'DI offset',
		nextFreeHint: 'next free ≥ {addr}',
		modbusSettings: 'Baud: {baud} · Parity: {parity} · Stop bits: {stopBits}',
		knxSettings: 'Topology: {topology} · Medium: {medium}',
		addrHintMstp:
			'MAC 1–127 · Controllers typically 1–31, sensors/actuators 32–127 · MAC 0 reserved for router/gateway',
		addrHintIp: 'Device Instance 0–4,194,302 (unique across project)',
		addrHintModbus: 'Slave ID 1–247 · 0 = Broadcast (reserved) · 248–255 reserved',
		addrHintKnx: 'Line 1–255 (physical address via ETS)',
		bulkPreviewTitle: 'Preview ({count} devices):',
		noFreeAddresses: 'No free addresses from {addr}.',
		deviceSingular: 'device',
		devicePlural: 'devices',
		noValidRows: 'No valid rows.',

		// Address map
		addrMapTitle: 'Address map · MAC 0–127',
		legendGateway: 'Gateway',
		legendConflict: 'Conflict',
		legendFree: 'Free',
		legendUsed: 'Used',

		// Segment settings
		baudrate: 'Baud rate',
		maxMasters: 'Max masters',
		maxInfoFrames: 'Max info frames',
		apduTimeout: 'APDU timeout (ms)',
		apduRetries: 'APDU retries',
		subnet: 'Subnet',
		udpPort: 'UDP port',
		broadcast: 'Broadcast',
		bbmd: 'BBMD',
		bbmdPlaceholder: 'IP (optional)',
		subnetPlaceholder: '192.168.1.0/24',
		parity: 'Parity',
		parityNone: 'N (none)',
		parityEven: 'E (even)',
		parityOdd: 'O (odd)',
		stopBits: 'Stop bits',
		topology: 'Topology',
		medium: 'Medium',
		mediumTP: 'TP (twisted pair)',
		mediumIP: 'IP (KNXnet/IP)',

		// Table headers
		colMac: 'MAC',
		colDi: 'Device Instance',
		colName: 'Name',
		colType: 'Type',
		colManufacturer: 'Manufacturer',
		colModel: 'Model',
		colGroup: 'Group',
		colStatus: 'Status',
		colNotes: 'Notes',
		colActions: 'Actions',

		// Table inputs
		namePlaceholder: 'Name',
		typePlaceholder: 'Type',
		mfrPlaceholder: 'Manufacturer',
		modelPlaceholder: 'Model',
		groupPlaceholder: 'Area',
		notesPlaceholder: 'Notes',

		// Device actions
		duplicateDevice: 'Duplicate',
		deleteDevice: 'Delete',
		fixedAddress: 'Fixed address',
		autoAddress: 'Auto address',
		fixedDI: 'Fixed DI',
		autoDI: 'Auto DI',
		clickToCycle: 'Click to cycle',
		autoComputed: 'Auto: {offset} + {addr} = {di}',
		noDevices: 'No devices — click «Add device»',
		addDevice: 'Add device',

		// Bulk add
		bulkTitle: 'Add multiple devices',
		bulkCount: 'Count',
		bulkPrefix: 'Name prefix',
		bulkPrefixPlaceholder: 'e.g. Room controller',
		bulkStartNum: 'Start number',
		bulkPad: 'Digits',
		bulkType: 'Type',
		bulkTypePlaceholder: 'Type',
		bulkMfr: 'Manufacturer',
		bulkMfrPlaceholder: 'Manufacturer',
		bulkModel: 'Model',
		bulkModelPlaceholder: 'Model',
		bulkDiConflict: 'DI conflict!',
		bulkCancel: 'Cancel',
		bulkConfirm: 'Add',

		// Import modal
		importTitle: 'Import CSV',
		importTargetSegment: 'Target segment',
		importColMac: 'MAC',
		importColName: 'Device name',
		importColType: 'Type',
		importColMfr: 'Manufacturer',
		importColModel: 'Model',
		importColGroup: 'Group',
		importColStatus: 'Status',
		importCancel: 'Cancel',
		importConfirm: 'Import',
		noMacColumn: 'No MAC/address column found.',
		importFileEmpty: 'File empty or missing header.',

		invalidJson: 'Invalid JSON file.',

		// Conflict toast
		conflictDetected: 'Address conflict detected — duplicate addresses are highlighted in red.',

		// Library drawer
		libraryTitle: 'Device Library',
		libraryInsertIn: 'Insert in:',
		librarySearchPlaceholder: 'Manufacturer, model, type…',
		libraryAddDevice: 'Add',
		libraryNoResults: 'No devices found.',

		// Bulk selection bar
		selectionCount: '{n} selected',
		fillDownMfr: 'Fill down manufacturer',
		fillDownModel: 'Fill down model',
		fillDownGroup: 'Fill down group',
		fillDownType: 'Fill down type',
		deleteSelected: 'Delete selected',
		selectAll: 'Select all',
		deselectAll: 'Deselect all',

		// Status labels
		statusPlanned: 'Planned',
		statusConfigured: 'Configured',
		statusOnline: 'Online',
		statusError: 'Error',

		// CSV headers
		csvHeaderAll:
			'Segment;Protocol;MAC;Device name;Type;Manufacturer;Model;Group;Device Instance;Status;Notes',
		csvHeaderSeg: 'MAC;Device name;Type;Manufacturer;Model;Group;Device Instance;Status;Notes',

		// Device library — categories
		libCatBacnetController: 'BACnet Controller',
		libCatRoomController: 'Room Controller',
		libCatSensors: 'Sensors',
		libCatModbusMeter: 'Modbus Meter',
		libCatKnxActuators: 'KNX Actuators',
		libCatBacnetActuator: 'BACnet Actuators',
		libCatModbusActuators: 'Modbus Drives',
		libCatBsk: 'Fire/Smoke Damper',

		// Device library — descriptions
		libDesc24io: '24 IO · BACnet MSTP',
		libDesc48io: '48 IO · BACnet MSTP',
		libDesc12io: '12 IO · BACnet MSTP',
		libDescLiob: 'L-IOB I/O Module',
		libDescModulo5: 'modulo 5 Automation',
		libDescSaiaSps: 'Saia PCD3 PLC',
		libDescRoomAuto4pipe: 'Room automation 4-pipe',
		libDescDesigo: 'Desigo room controller',
		libDescCo2TempRh: 'CO₂ + Temp + rH',
		libDescTempSpStage: 'Temp + SP + Stage',
		libDescPresence: 'Presence detector BACnet',
		libDescAnalyzerEth: 'Power analyzer Ethernet',
		libDescAnalyzerRtu: 'Power analyzer RTU',
		libDescHeatMeter: 'Heat meter',
		libDescEnergyMeter: 'Energy meter',
		libDescSwitchAct: 'Switching actuator 8×16A',
		libDescBlindsAct: 'Blind actuator 8-ch',
		libDescKnxDim: 'Dimming actuator 4×250W KNX',
		libDescKnxHeating: 'Heating actuator 6-ch KNX',
		libDescKnxRoom: 'Room thermostat KNX',
		libDescDamperBacnet72: 'Damper actuator 72Nm BACnet MSTP',
		libDescDamperBacnet35: 'Damper actuator 35Nm BACnet MSTP',
		libDescDamperBacnet: 'Damper actuator BACnet MSTP',
		libDescVfdModbus: 'Frequency inverter Modbus RTU',
		libDescPumpModbus: 'Pump Modbus RTU',
		libDescDamperModbus: 'Damper actuator Modbus RTU',
		libDescCo2Modbus: 'CO₂ + Temp + rH Modbus RTU',
		libDescRoomModbus: 'Room sensor Modbus RTU',
		libDescVavBacnet: 'VAV-Compact BACnet MSTP',
		libDescVavModbus: 'VAV-Compact Modbus RTU',
		libDescNovoconBacnet: 'Hydronic valve actuator BACnet MSTP',
		libDescNovoconModbus: 'Hydronic valve actuator Modbus RTU',
		libDescBskSpring: 'Spring-return 24V · end switch',
		libDescBskThermoFuse: 'Thermal fuse 72°C · spring-return',
		libDescFec: 'Field Equipment Controller BACnet MSTP',
		libDescExcelWeb: 'Excel Web Controller BACnet MSTP',
		libDescEcgfx: 'gfxProgram Controller BACnet MSTP',
		libDescSmartX: 'SmartX AS-P BACnet MSTP',
		libDescIq: 'IQ Controller BACnet MSTP',
		libDescBeckhoff: 'CX Industrial PC BACnet/Modbus',
		libDescFancoil: 'Fan coil controller BACnet MSTP',
		libDescHoneyRoom: 'Room thermostat BACnet MSTP',
		libDescEcBos: 'BACnet router/server',
		libDescSauterRoom: 'Room controller Modbus RTU',
		libDescDuctTemp: 'Duct temperature sensor Modbus RTU',
		libDescDuctTempHum: 'Duct Temp + rH Modbus RTU',
		libDescRoomCo2Modbus: 'Room CO₂ + Temp + rH Modbus RTU',
		libDescMeter3phase: '3-phase analyser Modbus RTU',
		libDescKnxMotion: 'Presence detector 180° KNX',
		libDescKnxThermostat: 'Room thermostat flush-mount KNX',
		libDescKnxDimCh: 'Dimming actuator 8×16A KNX'
	},
	cat: {
		alarme: 'Alarms',
		antriebe: 'Drives',
		dokumentation: 'Documentation',
		elektro: 'Electrical',
		energie: 'Energy',
		filter: 'Filters',
		ga: 'BA',
		gebaeude: 'Building',
		heizung: 'Heating',
		hydraulik: 'Hydraulics',
		ibn: 'Commissioning',
		it: 'IT',
		kaelte: 'Refrigeration',
		kälte: 'Refrigeration',
		klima: 'HVAC',
		komfort: 'Comfort',
		kommunikation: 'Communication',
		lueftung: 'Ventilation',
		material: 'Materials',
		medien: 'Fluids',
		netzwerk: 'Network',
		normen: 'Standards',
		protokoll: 'Protocol',
		protokolle: 'Protocols',
		regelung: 'Control',
		rohre: 'Pipes',
		sanitaer: 'Plumbing',
		sensoren: 'Sensors',
		sicherheit: 'Safety',
		test: 'Testing',
		übergabe: 'Handover'
	}
};
