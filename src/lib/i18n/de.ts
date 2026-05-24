export const de = {
	app: {
		name: 'GA Tool',
		tagline: 'Die GA-Referenz'
	},
	nav: {
		home: 'Home',
		converter: 'Konverter',
		calculator: 'Rechner',
		knowledge: 'Wissensbasis',
		checklists: 'Checklisten',
		reference: 'Referenz',
		abbreviations: 'Abkürzungen',
		settings: 'Einstellungen',
		account: 'Account',
		profile: 'Profil',
		search: 'Suchen',
		searchOpen: 'Suche öffnen',
		close: 'Schliessen',
		changelog: 'Changelog',
		updateNew: 'Neu in v{version}:',
		updateText:
			'Abkürzungen: Sprach-Filter funktioniert wieder korrekt (DE/EN abwählen zeigt jetzt nur INT)'
	},
	auth: {
		login: 'Anmelden',
		logout: 'Abmelden',
		email: 'E-Mail',
		password: 'Passwort',
		name: 'Name',
		loginButton: 'Anmelden',
		loginError: 'Anmeldung fehlgeschlagen',
		invalidCredentials: 'E-Mail oder Passwort falsch'
	},
	dashboard: {
		title: 'Dashboard',
		welcome: 'Willkommen im GA Tool',
		tagline: 'Die GA-Referenz für den Alltag',
		quickAccess: 'Schnellzugriff',
		favorites: 'Favoriten',
		recentlyUsed: 'Meist aufgerufen',
		removeFavorite: 'Aus Favoriten entfernen',
		modules: {
			konverter: {
				name: 'Konverter',
				desc: 'Einheiten-Konverter — Druck, Temperatur, Durchfluss, Feuchte'
			},
			rechner: { name: 'Rechner', desc: 'Heizkurve, Kv-Wert, Taupunkt, Psychrometrie' },
			wissen: { name: 'Wissensbasis', desc: 'Artikel zu HLK, GA, Protokollen' },
			checklisten: {
				name: 'Checklisten',
				desc: 'Interaktive IBN-/Übergabe-Checklisten mit CSV-Export'
			},
			referenz: { name: 'Referenz', desc: 'Tabellen — DN, Filter, Glykol, Kältemittel' },
			abkuerzungen: { name: 'Abkürzungen', desc: 'Kürzel — bilingual DE ↔ EN' }
		}
	},
	settings: {
		title: 'Einstellungen',
		theme: 'Theme',
		themeAuto: 'Auto (System)',
		themeLight: 'Hell',
		themeDark: 'Dunkel',
		themeOled: 'OLED',
		language: 'Sprache',
		langAuto: 'Auto (Browser)',
		langDe: 'Deutsch',
		langEn: 'Englisch',
		defaultUnits: 'Standard-Einheiten',
		normOutsideTemp: 'Normaussentemperatur (Ort)'
	},
	common: {
		loading: 'Laden…',
		error: 'Fehler',
		save: 'Speichern',
		cancel: 'Abbrechen',
		search: 'Suchen…',
		back: 'Zurück',
		comingSoon: 'Demnächst verfügbar',
		add: 'Hinzufügen',
		delete: 'Löschen',
		duplicate: 'Duplizieren',
		edit: 'Bearbeiten',
		copy: 'Kopieren',
		copied: 'Kopiert',
		reset: 'Zurücksetzen',
		close: 'Schliessen',
		confirm: 'Bestätigen',
		allCalculators: 'Alle Rechner',
		allConverters: 'Alle Konverter',
		noResults: 'Keine Treffer.',
		rows: 'Zeilen',
		results: 'Ergebnis',
		resultsPlural: 'Ergebnisse',
		type: {
			artikel: 'Artikel',
			rechner: 'Rechner',
			konverter: 'Konverter',
			referenz: 'Referenz',
			checkliste: 'Checkliste'
		},
		addToFavorites: 'Zu Favoriten hinzufügen',
		removeFromFavorites: 'Aus Favoriten entfernen',
		actions: 'Aktionen'
	},

	search: {
		placeholder: 'Suchen — Artikel, Rechner, Konverter…',
		noResults: 'Keine Treffer für „{query}"',
		navigate: 'Navigation',
		openItem: 'Öffnen',
		ariaOverlay: 'Suche schliessen',
		ariaModal: 'Globale Suche'
	},

	pwa: {
		offline: 'Offline — gecachte Daten werden verwendet',
		offlineReady: 'Offline-Nutzung bereit',
		install: 'GA Tool installieren',
		installBtn: 'Installieren'
	},

	// ── Areas & Difficulty ───────────────────────────────────────────────────
	area: {
		hlk: 'HLK',
		sanitaer: 'Sanitär',
		elektro: 'Elektro',
		ga: 'GA',
		it: 'IT',
		normen: 'Normen'
	},

	difficulty: {
		grundlagen: 'Grundlagen',
		fortgeschritten: 'Fortgeschritten',
		experte: 'Experte'
	},

	// ── Wissen ────────────────────────────────────────────────────────────────
	wissen: {
		title: 'Wissensbasis',
		subtitle: 'Artikel zu Regelung, Heizung, Lüftung, Protokollen und mehr.',
		searchPlaceholder: 'Titel, Tags, Kategorie…',
		resetFilter: 'Filter zurücksetzen',
		fachbereich: 'Fachbereich',
		schwierigkeit: 'Schwierigkeit',
		profileHint: 'Fachbereiche aus deinem Profil vorausgewählt — in Profil anpassen.',
		noArticles: 'Keine Artikel gefunden.',
		clearFilters: 'Alle Filter entfernen',
		backLink: 'Wissensbasis',
		updatedAt: 'Aktualisiert:',
		relatedTools: 'Rechner & Tools',
		relatedArticles: 'Verwandte Artikel',
		onlyGerman:
			'Dieser Artikel ist noch nicht auf Englisch verfügbar — deutsche Version wird angezeigt.',
		deOnly: 'Nur DE'
	},

	// ── Checklisten ───────────────────────────────────────────────────────────
	checklisten: {
		title: 'Checklisten',
		subtitle: 'Interaktive Checklisten — Fortschritt wird automatisch gespeichert.',
		searchPlaceholder: 'Titel, Kategorie…',
		allCategories: 'Alle Kategorien',
		noChecklists: 'Keine Checklisten gefunden.',
		points: 'Punkte',
		critical: 'kritisch',
		sections: 'Sektionen',
		backLink: 'Alle Checklisten',
		confirmReset: 'Alle Häkchen und Notizen für diese Checkliste zurücksetzen?',
		done: 'erledigt',
		showHint: 'Hinweis anzeigen',
		noteBtn: 'Notiz',
		notePlaceholder: 'Notiz zu diesem Punkt…',
		allDoneTitle: 'Alle Punkte erledigt!',
		allDoneText: 'Du kannst die Checkliste jetzt als CSV exportieren und ablegen.',
		resetBtn: 'Zurücksetzen',
		exportCSV: 'Als CSV exportieren',
		infoText:
			'Häkchen + Notizen werden automatisch im Browser gespeichert (pro Checkliste). CSV-Export für Berichte.',
		mustCriteria: 'Muss-Kriterium',
		savedFlash: '✓ gespeichert',
		anlage: 'Anlage',
		ort: 'Ort',
		techniker: 'Techniker',
		datum: 'Datum',
		anlagePlaceholder: 'z.B. EFH Müller, BJ 2024',
		ortPlaceholder: 'z.B. Zug',
		technicianPlaceholder: 'Name',
		csvProgress: 'Fortschritt',
		csvHeaders: 'Sektion;Punkt;Erledigt;Kritisch;Norm;Notiz',
		csvYes: 'JA',
		csvNo: 'NEIN'
	},

	// ── Referenz ──────────────────────────────────────────────────────────────
	referenz: {
		title: 'Referenz',
		subtitle: 'Tabellen — Stoffwerte, Normen, Filterklassen.',
		searchPlaceholder: 'Tabellen-Titel, Kategorie, Beschreibung…',
		allCategories: 'Alle Kategorien',
		noTables: 'Keine Tabellen gefunden.',
		rows: 'Zeilen',
		backLink: 'Alle Tabellen',
		searchInTable: 'In Tabelle suchen…',
		clickToCopy: 'Klicken zum Kopieren',
		copyRow: 'Ganze Zeile kopieren (TSV)',
		noRowsMatch: 'Keine Zeile passt zur Suche.',
		noteLabel: 'Hinweis',
		infoText:
			'Klick auf eine Zelle kopiert den Wert. Klick auf das Symbol rechts kopiert die Zeile als TSV. Klick auf eine Spalten-Überschrift sortiert auf-/absteigend.'
	},

	// ── Abkürzungen ───────────────────────────────────────────────────────────
	abkuerzungen: {
		title: 'Abkürzungen',
		subtitle: 'Kürzel aus Gebäudeautomation, HLK, IT und Normen.',
		searchPlaceholder: 'Kürzel, Langform oder Beschreibung…',
		reset: 'Zurücksetzen',
		noResults: 'Keine Treffer.',
		results: 'Treffer',
		also: 'Auch:',
		related: 'verwandt:',
		wissensartikel: '→ Wissensartikel',
		hasArticle: 'Hat einen Wissensartikel',
		navAZ: 'Schnellnavigation A-Z',
		langAuto: 'Auto (Browser)',
		langDe: 'Deutsch',
		langEn: 'Englisch',
		langIntl: 'International'
	},

	// ── Rechner Index ─────────────────────────────────────────────────────────
	rechner: {
		title: 'Rechner',
		subtitle: 'Ingenieurstechnische Berechnungen für die Gebäudeautomation',

		// Calculator names & descriptions
		heizkurve: {
			name: 'Heizkurve',
			short: 'Vorlauftemperatur aus Aussentemperatur — herstellerspezifisch'
		},
		kvWert: {
			name: 'Kv-Wert',
			short: 'Ventil-Auslegung: Kv aus Δp + Durchfluss'
		},
		ausdehnungsgefaess: {
			name: 'Ausdehnungsgefäss',
			short: 'MAG-Volumen aus Anlageninhalt + Drücken'
		},
		druckverlust: {
			name: 'Druckverlust',
			short: 'Rohrnetz: R × L + Σζ → Δp gesamt'
		},
		luftbedarf: {
			name: 'Luftbedarf',
			short: 'Mindest-Aussenluftvolumen nach EN 16798'
		},
		taupunkt: {
			name: 'Taupunkt',
			short: 'Aus Lufttemperatur + rel. Feuchte → Taupunkt'
		},
		waermeleistung: {
			name: 'Wärmeleistung',
			short: 'Q = ṁ × cp × ΔT (Heizung/Kühlung/WMZ)'
		},
		psychrometrie: {
			name: 'Psychrometrie',
			short: 'h-x Diagramm: alle Zustandsgrössen feuchte Luft'
		},
		pidSimulator: {
			name: 'PID-Simulator',
			short: 'PT1 + Totzeit · Anti-Windup · HVAC-Presets · Echtzeit-Simulation'
		},
		leitungslaenge: {
			name: 'Leitungslänge & Spannungsfall',
			short: 'ΔU = 2×L×ρ×I/A — Max. Länge, Querschnitt, 24V Geräte-Presets'
		},
		elektro: {
			name: 'Elektro-Grundrechner',
			short: 'Ohm · P=U×I · AC Wirk-/Blind-/Scheinleistung · Strom aus Leistung'
		},
		dipSwitch: {
			name: 'DIP-Switch Adressrechner',
			short: 'BACnet MSTP · Modbus RTU · KNX — Adresse ↔ DIP-Switch-Stellung'
		},
		gewichteterMittelwert: {
			name: 'Gewichteter Mittelwert',
			short: 'Beliebig viele Messwerte mit individueller Gewichtung'
		},
		co2Regelung: {
			name: 'CO₂-Regelung',
			short: 'Volumenstrom-Auslegung + Raumzeitkonstante für DDC-Parametrierung'
		},
		uWert: {
			name: 'U-Wert',
			short: 'Wärmedurchgangskoeffizient aus Schichtaufbau — SIA 380/1 · Minergie'
		},
		ventilautoritaet: {
			name: 'Ventilautorität',
			short: 'α = ΔpV / (ΔpV + ΔpSystem) + Kvs-Auswahl nach EN 60534'
		},
		waermerueckgewinnung: {
			name: 'Wärmerückgewinnung',
			short: 'WRG-Wirkungsgrad, Zulufttemperatur, Energieersparnis nach EN 308'
		},
		pumpenkennlinie: {
			name: 'Pumpenkennlinie',
			short: 'H-Q Diagramm, Betriebspunkt, spezifische Drehzahl — Grundfos/Wilo Presets'
		},
		heizlast: {
			name: 'Heizlast',
			short: 'Raum- und Gebäudeheizlast nach SIA 384.201 — Transmission + Lüftung'
		},
		busIbn: {
			name: 'Bus-IBN Adresskonfigurator',
			short: 'BACnet MSTP/IP · Modbus RTU · KNX — Adressverwaltung mit IBN-Dokument-Export'
		},
		polynomFit: {
			name: 'Polynom-Fit',
			short: 'Sensor-Linearisierung: Kennlinie aus Messpunkten als Polynom',
			intro:
				'Fitte ein Polynom (Grad 1–5) durch deine Messpunkte mit der Methode der kleinsten Quadrate. Anwendung: Sensor-Kennlinien linearisieren, Datenblatt-Tabellen in DDC/SPS-taugliche Polynome umrechnen.'
		},

		// Shared UI strings across calculators
		ui: {
			mode: 'Modus',
			calculate: 'Berechnen',
			input: 'Eingabe',
			result: 'Ergebnis',
			results: 'Ergebnisse',
			medium: 'Medium',
			water: 'Wasser',
			location: 'Standort',
			city: 'Ort (CH)',
			manufacturer: 'Hersteller',
			system: 'System',
			warning: 'Warnung',
			wikiLink: 'Mehr erfahren →'
		},

		// Per-page strings
		heizkurveUi: {
			formulaNote:
				'Die Formeln sind Annäherungen an die jeweiligen Hersteller-Algorithmen — exakte Werte können je nach Firmware abweichen. Bei Fussbodenheizung n ≈ 1.1, Radiatoren n ≈ 1.3. Quellen: SIA 384/2, Herstellerunterlagen.',
			manufacturerSystem: 'Hersteller / System',
			heatEmitter: 'Wärmeübergabe',
			radiator: 'Radiator (n ≈ 1.3)',
			floor: 'Fussboden (n ≈ 1.1)',
			liveQuery: 'Live-Abfrage',
			currentOutdoor: 'Aktuelle Aussentemperatur',
			flowSetpoint: '→ Vorlauf-Sollwert',
			honeywellSection: 'Honeywell — 2-Punkte',
			sauterSection: 'Sauter — Parameter',
			footpoint: 'Fusspunkt',
			footpointHint: 'TV bei Heizgrenze',
			curveSteepness: 'Steilheit',
			curveParams: 'Kurven-Parameter',
			slope: 'Neigung',
			level: 'Niveau',
			levelHint: 'Parallelverschiebung ± K',
			siteAndPlant: 'Standort + Anlage',
			normOutdoor: 'Normaussentemp',
			roomSetpoint: 'Soll-Raumtemperatur',
			heatLimit: 'Heizgrenze',
			heatLimitHint: 'Oberhalb keine Heizung',
			minFlow: 'Min. Vorlauf',
			maxFlow: 'Max. Vorlauf',
			designFlow: 'Auslegungs-Vorlauf bei {t} °C',
			maxFlowWarning:
				'⚠ Auslegungstemperatur {tv} °C wird durch max. Vorlauf {max} °C begrenzt. Höhere Neigung oder Niveau ist wirkungslos. Heizfläche evtl. zu klein.',
			curve: 'Kennlinie',
			normOutdoorLegend: 'Norm-Aussentemp',
			currentLegend: 'aktuell',
			outdoorTempAxis: 'Aussentemperatur [°C]',
			slopeRangeHint: 'Bereich {min}–{max}',
			honeywellPoint1OutdoorTemp: 'Punkt 1: Aussentemp TA₁',
			honeywellPoint1Flow: 'Punkt 1: Vorlauf TV₁',
			honeywellPoint2OutdoorTemp: 'Punkt 2: Aussentemp TA₂',
			honeywellPoint2Flow: 'Punkt 2: Vorlauf TV₂'
		},

		ausdehnungsgefaessUi: {
			warnPrePressureDetail:
				'Vordruck p₀ = {p0} bar liegt unter dem empfohlenen Mindestwert ({min} bar). Bei statischer Höhe von {h} m muss p₀ ≥ {min} bar sein, damit keine Unterdruckzonen entstehen.',
			warnSpreadDetail:
				'Spreizung pₑ − p₀ = {spread} bar zu klein. Üblich ≥ 0.8 bar — sonst wird das MAG sehr gross.',
			formulaNote:
				'Formel: V_N = (V_e + V_wv) × (pₑ + 1) / (pₑ − p₀) · Wasservorlage V_wv = max(0.5 % × V_A, 3 l). Standard-MAG-Grössen nach SWKI 91-1.',
			plant: 'Anlage',
			plantContent: 'Anlageninhalt',
			plantContentHint: 'Wassermenge in der Anlage',
			maxFlowTemp: 'Max. Vorlauftemperatur',
			staticHeight: 'Statische Höhe',
			staticHeightHint: 'Höhendifferenz Kessel ↔ höchster Punkt',
			pressures: 'Drücke',
			prePressure: 'Vordruck p₀',
			prePressureHint: 'Empfohlen min. {p} bar (statisch + 0.3)',
			finalPressure: 'Enddruck pₑ',
			finalPressureHint: 'Sicherheitsventil − 0.5 bar',
			recommendedMAG: 'Empfohlenes MAG (Standardgrösse)',
			nominalVolume: 'Rechnerisches Nennvolumen V_N',
			expansionVolume: 'Ausdehnungsvolumen V_e',
			waterReserve: 'Wasservorlage V_wv',
			expansionCoeff: 'Ausdehnungs-Koeffizient e',
			pressureFactor: 'Druckfaktor',
			warnPrePressure: 'Vordruck p₀ liegt unter dem empfohlenen Mindestwert.',
			warnSpread: 'Spreizung pₑ − p₀ zu klein.'
		},

		luftbedarfUi: {
			formulaNote:
				'Berechnung nach SN EN 16798-1: massgebend ist der grössere der beiden Werte (Personen- + Flächenbedarf vs. CO₂-Massenbilanz). Aussenluft-CO₂ = 400 ppm angenommen.',
			room: 'Raum',
			floorArea: 'Bodenfläche',
			roomHeight: 'Raumhöhe',
			occupants: 'Personenanzahl',
			requirement: 'Anforderung',
			category: 'Qualitätskategorie EN 16798-1',
			activityLevel: 'Aktivitätsniveau',
			cat1: 'I — hoch (sensible Bereiche)',
			cat2: 'II — normal (Standard)',
			cat3: 'III — moderat',
			cat4: 'IV — minimal',
			cat1desc: 'Krankenhäuser, Kindergärten',
			cat2desc: 'Büros, Wohnungen, Schulen',
			cat3desc: 'Bestehende Gebäude',
			cat4desc: 'Temporäre Nutzung',
			actRest: 'Ruhe (Schlafen, Sitzen)',
			actOffice: 'Büro / leichte Tätigkeit',
			actPhysical: 'Körperliche Arbeit',
			recommendedFlow: 'Empfohlener Aussenluftstrom',
			perEN: '… davon nach EN 16798',
			perCO2: '… davon CO₂-basiert (Ziel {ppm} ppm)',
			airChange: 'Luftwechselrate',
			roomVolume: 'Raumvolumen'
		},

		waermeleistungUi: {
			calcMode: 'Berechnen',
			calcQfromVT: 'Leistung Q aus V̇ + ΔT',
			calcVfromQT: 'Volumenstrom aus Q + ΔT',
			calcTfromQV: 'ΔT aus Q + V̇',
			water: 'Wasser',
			waterNote: 'cp = 4.182 kJ/(kg·K), ρ = 1000 kg/m³',
			brine30: 'Sole 30 % Glykol',
			brine30Note: 'Ethylenglykol 30 %, Mittelwert',
			brine40: 'Sole 40 % Glykol',
			brine40Note: 'Ethylenglykol 40 %, Mittelwert',
			air: 'Luft',
			airNote: 'bei 20 °C, 1 bar',
			volumeFlow: 'Volumenstrom V̇',
			tempDiff: 'Temperaturdifferenz ΔT',
			power: 'Wärmeleistung Q',
			massFlow: 'Massenstrom ṁ'
		},

		taupunktUi: {
			formulaNote:
				'Berechnet nach Magnus-Formel (Konstanten a = 17.62, b = 243.12 °C). Gültig im Bereich −45 … +60 °C über Wasser.',
			airTemp: 'Lufttemperatur',
			relHumidity: 'Relative Feuchte',
			dewpoint: 'Taupunkt',
			absHumidity: 'Absolute Feuchte',
			tempSpread: 'Spreizung T − Taupunkt',
			warnCondensation:
				'Kondensationsgefahr: Oberflächentemperatur unter ca. {t} °C kann zu Tauwasser führen.'
		},

		ventilautoritaetUi: {
			formulaNote:
				'Kv = Q / √(ΔpV) bei ΔpV in bar, Q in m³/h — nach EN 60534. Kvs nächste Normgrösse ≥ Kv × 1.3 wählen (Regelbereich + Reserve).',
			tabAuthority: 'Ventilautorität α',
			tabKvs: 'Kvs-Auswahl',
			pressures: 'Druckverhältnisse',
			dpValve100: 'Δp Ventil bei 100% Hub (ΔpV,100)',
			dpValve100Hint: 'Druckverlust vollgeöffnetes Ventil',
			dpSystem: 'Δp restlicher Kreis (ΔpSystem)',
			dpSystemHint: 'Wärmetauscher + Rohrnetz ohne Ventil',
			authority: 'Ventilautorität α',
			rating: 'Bewertung',
			ratingVG: 'Sehr gut (α ≥ 0.5)',
			ratingG: 'Gut (α 0.3–0.5)',
			ratingA: 'Akzeptabel (α 0.2–0.3)',
			ratingS: 'Schlecht (α < 0.2)',
			totalDp: 'Gesamtdruckverlust Kreis',
			effectiveCurve: 'Effektive Kennlinie',
			designData: 'Auslegungsdaten',
			designFlow: 'Auslegungsdurchfluss',
			dpAtDesign: 'Δp Ventil bei Auslegungsdurchfluss',
			dpAtDesignHint: 'Eingestellter Differenzdruck am Ventil',
			calcKv: 'Berechneter Kv',
			recommendedKvs: 'Empfohlenes Kvs (× 1.3 Sicherheit)',
			kvsOverKv: 'Kvs / Kv',
			kvsStandard: 'Standardreihe Kvs',
			curveNote:
				'Grau = Ideallinie (α = 1). Je kleiner α, desto mehr weicht die effektive Kurve ab.',
			authorityFormulaNote:
				'α = ΔpV,100 / (ΔpV,100 + ΔpSystem) — Empfehlung: α ≥ 0.5 (min. 0.3). Tiefes α → Ventil verliert Regeleinfluss → überproportionaler Durchflussanstieg bei kleinen Hüben.'
		},

		uWertUi: {
			surfaceType: 'Bauteiltyp (Wärmeübergangswiderstände)',
			outerWall: 'Aussenwand',
			innerWall: 'Innenwand',
			roofOutside: 'Dach (aussen)',
			floorGround: 'Boden gg. Erdreich',
			floorOutside: 'Boden gg. Aussenluft',
			custom: 'Benutzerdefiniert',
			rsiLabel: 'Rsi (innen)',
			rseLabel: 'Rse (aussen)',
			layers: 'Schichtaufbau (von innen nach aussen)',
			layerName: 'Bezeichnung',
			addLayer: '+ Schicht hinzufügen',
			uValue: 'U-Wert',
			totalR: 'Gesamtwiderstand R_T',
			wallBuild: 'Wandaufbau (ohne Putz)',
			comparison: 'Vergleich Grenzwerte (SIA 380/1 · Minergie)',
			presetPlaceholder: 'Preset…',
			removeLayer: 'Schicht entfernen',
			matConcrete: 'Beton (dicht)',
			matBrick: 'Vollziegel',
			matLightConcrete: 'Leichtbeton',
			matCalcSandstone: 'Kalksandstein',
			matAeratedConcrete: 'Porenbeton (0.4)',
			matMineralWool: 'Mineralwolle',
			matEPS: 'EPS (Styropor)',
			matXPS: 'XPS (Styrodur)',
			matTimber: 'Holz (Fichte)',
			matFibreBoard: 'Holzfaserplatte',
			matGypsum: 'Gipskarton',
			matScreed: 'Estrich / Zement',
			matParquet: 'Parkett / Holzboden',
			matCeramic: 'Keramik / Fliesen',
			matGlassWool: 'Glaswolle',
			matPUR: 'PUR-Schaum',
			matAirGap: 'Luftspalt (ruhend)',
			formulaNoteWarnBridges:
				'U = 1 / (Rsi + Σ(d/λ) + Rse) nach SIA 180 / EN ISO 6946. Wärmebrücken und Befestigungen sind nicht berücksichtigt.'
		},

		waermerueckgewinnungUi: {
			annualSavingNote:
				'Jahreskostenersparnis: Annahme 2000 Heizstunden, Strom-/Wärmepreis 0.12 CHF/kWh.',
			wrgType: 'WRG-Typ',
			enthalpyExchanger: 'Kreuzgegenstrom (Enthalpie-Tauscher)',
			rotarySorption: 'Rotationssorptions-WRG',
			plateHeatEx: 'Plattenwärmetauscher (nur Wärme)',
			recirculationSystem: 'Umluftsystem / Wärmelaufrad',
			typicalEta: 'Typischer η_T:',
			noMoistureTransfer: 'Keine Feuchteübertragung',
			operatingConditions: 'Betriebsbedingungen',
			volumeFlow: 'Volumenstrom',
			exhaustAirTemp: 'Abluft-Temperatur (innen)',
			outsideAirTemp: 'Aussenluft-Temperatur',
			exhaustAirHumidity: 'Abluft rel. Feuchte',
			efficiencies: 'Wirkungsgrade',
			tempEfficiency: 'Temperaturrückgewinnungsgrad η_T',
			humidityEfficiency: 'Feuchterückgewinnungsgrad η_F',
			supplyAirTemp: 'Zulufttemperatur nach WRG',
			recoveredPower: 'Rückgewonnene Heizleistung',
			energySaving: 'Energieeinsparung vs. ohne WRG',
			supplyHumidity: 'Feuchtegehalt Zuluft nach WRG',
			annualSaving: 'Energieersparnis/Jahr (2000h, 0.12 CHF/kWh)',
			typicalEtaHint: 'Typisch {min}–{max}% für {type}',
			noteEnthalpyExchanger:
				'Feuchteübertragung möglich (Membran). Sehr hohe Effizienz, kein Leckage-Problem.',
			noteRotarySorption:
				'Hohe Feuchterückgewinnung. Achtung: geringe Überströmung Abluft→Zuluft (1–5%).',
			notePlateHeatEx:
				'Keine Feuchteübertragung. Einfach, robust, kein Leckage-Risiko. Vereisungsschutz nötig.',
			noteRecirculation:
				'Nur Wärme, mittlere Effizienz. Einsatz bei getrennten Zu/Abluft-Leitungen.'
		},

		druckverlustUi: {
			flow: 'Strömung',
			volumeFlow: 'Volumenstrom V̇',
			pipework: 'Rohrnetz',
			nominalSize: 'Nennweite',
			pipeLength: 'Rohrlänge gesamt',
			pipeLengthHint: 'Vor- + Rücklauf, ungefähre Summe',
			localLosses: 'Σζ Einzelwiderstände',
			localLossesHint: 'Bögen, T-Stücke, Ventile (typisch 10–25)',
			totalDp: 'Gesamtdruckverlust Δp',
			frictionDp: '… davon Reibung Δp_L',
			localDp: '… davon Einzelwid. Δp_Z',
			velocity: 'Strömungsgeschwindigkeit v',
			pressureGradient: 'Druckgefälle R',
			reynolds: 'Reynolds-Zahl Re',
			warnHighVelocity: 'Geschwindigkeit {v} m/s über Empfehlung.',
			warnLowVelocity: 'Strömung sehr langsam.',
			mediumWater: 'Wasser 20 °C',
			mediumBrine: 'Sole 30 % @ 20 °C',
			formulaNote:
				'Druckverlust-Formel: Δp = (λ × L/d + Σζ) × ρ × v² / 2. Reibungsbeiwert λ: laminar (Re < 2300) = 64/Re, turbulent: Swamee-Jain-Approx. mit k = 0.045 mm (Stahl).'
		},

		psychrometrieUi: {
			warnSaturated:
				'Der berechnete Zustand liegt über der Sättigungslinie (φ > 100 %). Bei dieser Temperatur kann die Luft nicht so viel Wasserdampf aufnehmen — Tauwasser fällt aus.',
			formulaNote:
				'Berechnung nach Magnus über Wasser. h = 1.006 × T + x × (2501 + 1.86 × T) [kJ/kg trockene Luft]. Bezugsdruck p₀ = 101 325 Pa (Meereshöhe).',
			stateDef: 'Zustandsdefinition',
			inputVars: 'Eingabegrössen',
			tRelHumidity: 'T + rel. Feuchte',
			tAbsHumidity: 'T + abs. Feuchte x',
			tDewpoint: 'T + Taupunkt',
			tEnthalpy: 'T + Enthalpie h',
			airTemp: 'Lufttemperatur',
			relHumidity: 'Relative Feuchte',
			absHumidity: 'Absolute Feuchte',
			dewpoint: 'Taupunkt',
			enthalpy: 'Enthalpie',
			pressure: 'Luftdruck',
			stdPressure: 'Standard 101 325 Pa',
			tempT: 'Temperatur T',
			relHumPhi: 'Relative Feuchte φ',
			absHumX: 'Absolute Feuchte x',
			specificEnthalpy: 'Spezifische Enthalpie h',
			dewpointTd: 'Taupunkt T_d',
			wetBulb: 'Feuchtkugeltemperatur T_wb',
			satPressure: 'Wasserdampf-Sättigungsdruck p_s',
			partialPressure: 'Wasserdampf-Partialdruck p_w',
			density: 'Luftdichte ρ',
			specVolume: 'Spez. Volumen v'
		},

		pidSimulatorUi: {
			title: 'PID-Regler Simulator',
			subtitle: 'PT1 + Totzeit Streckenmodell · Anti-Windup · HVAC-Presets',
			controller: 'Regler · PID',
			proportionalBand: 'Proportionalbereich',
			integralTime: 'Nachstellzeit',
			derivativeTime: 'Vorhaltzeit',
			direction: 'Wirkrichtung',
			setpoint: 'Sollwert',
			theory: 'Theorie & Hintergrund',
			hvacPresets: 'HVAC-Presets',
			simulation: 'Simulation',
			timeScale: 'Zeitraffer',
			viewWindow: 'Sichtfenster',
			auto: 'AUTO',
			disturbance: 'Störgrösse d',
			status: 'Status',
			controllerTerms: 'Reglerterme',
			plantModel: 'Streckenmodell',
			deadTime: 'Totzeit',
			dOff: 'D-Anteil AUS',
			dOn: 'D-Anteil aktiv',
			modeHeat: 'Heizen (invers)',
			modeCool: 'Kühlen (direkt)',
			hintHeat: 'PV über SP → Y schliesst (Ventil zu)',
			hintCool: 'PV über SP → Y öffnet (mehr Kälte)',
			statusSettled: 'Ausgeregelt',
			statusSaturated: 'Stellgrösse begrenzt',
			presetRaumHeizung: 'Raum-T Heizung',
			presetVorlauf: 'Vorlauf-T',
			presetKaelte: 'Fernkälte',
			presetDruck: 'Druck',
			presetFeuchte: 'Feuchte',
			presetDemo: 'PID-Demo',
			theoryBasics: 'Grundlagen',
			theoryAdvanced: 'Fortgeschritten',
			setpointW: 'Sollwert W',
			actualValueX: 'Istwert X',
			dayValue: 'Tagwert',
			nightValue: 'Nachtwert',
			outputY: 'Stellgrösse Y',
			gain: 'Verstärkung',
			disturbanceSection: 'Störung · Lastsprung',
			autoDisturbance: 'Auto-Störgrösse',
			controlDeviation: 'Regelabweichung e',
			timeConstant: 'Zeitkonstante',
			jumpAmplitude: 'Sprungamplitude',
			active: 'Aktiv',
			inactive: 'Inaktiv',
			sine: 'Sinus',
			square: 'Rechteck',
			noise: 'Rauschen',
			amplitude: 'Amplitude',
			period: 'Periode',
			filterPT1: 'Filter PT1',
			noFilter: 'kein Filter',
			bias: 'Bias (Offset)',
			noOffset: 'kein Offset',
			spAutoSection: 'SP-Automatik · Tag/Nacht',
			switchPeriod: 'Wechselperiode',
			iTermOff: 'I-Anteil AUS',
			yes: 'JA',
			no: 'NEIN',
			resetDist: 'Zurücksetzen (d = {val} {unit})',
			windowMeta: 'Fenster'
		},

		co2RegelungUi: {
			roomOccupancy: 'Raum & Belegung',
			roomVolume: 'Raumvolumen',
			occupants: 'Personenanzahl',
			persons: 'Pers.',
			activityLevel: 'Aktivitätsniveau',
			co2Outside: 'CO₂ Aussenluft',
			co2Target: 'CO₂-Zielwert',
			orManual: 'Oder manuell',
			minFlow: 'Mindest-Volumenstrom',
			airChange: 'Luftwechsel',
			timeConstant: 'Zeitkonstante τ',
			time90: 'Zeit bis 90 % der Änderung (2.3 × τ)',
			target: 'Ziel',
			outside: 'Aussen',
			ventilationUnit: 'Lüftungsanlage',
			volumeFlow: 'Volumenstrom',
			steadyStateCO2: 'Steady-State CO₂ (Vollbelegung)',
			modeAuslegung: 'Auslegung',
			modeRaumverhalten: 'Raumverhalten',
			co2RiseTitle: 'CO₂-Verlauf (Anstieg bei Vollbelegung, Start = {co2} ppm)',
			infoAuslegung:
				'q = G / (c<sub>Ziel</sub> − c<sub>Aussen</sub>) · 10⁶ — massgebend für DDC-Auslegung bei Vollbelegung. Zeitkonstante τ = V / q gibt die Trägheit des Raumes an (relevant für PID-Parametrierung).',
			infoRaumverhalten:
				'c(t) = c<sub>SS</sub> − (c<sub>SS</sub> − c<sub>0</sub>) · e<sup>−t/τ</sup> — Anstieg bei konstanter Belegung und konstantem Volumenstrom. Für die PID-Parametrierung: Regelstrecke hat Zeitkonstante τ und kein integrierendes Verhalten (PT1-Strecke).',
			actRest: 'Ruhend / Schlafen',
			actOffice: 'Büro / leichte Tätigkeit',
			actPhysical: 'Körperliche Arbeit',
			presetCat1: 'Kat. I — sehr gut (EN 16798)',
			presetCat2: 'Kat. II — gut (EN 16798)',
			presetCat3: 'Kat. III — moderat',
			presetPettenkofer: 'Pettenkofer-Grenzwert',
			presetCritical: 'Kritisch (Schläfrigkeit)'
		},

		pumpenkennlinieUi: {
			pump: 'Pumpe',
			preset: 'Preset',
			shutoffHead: 'Maximale Förderhöhe (Shutoff head)',
			freeDelivery: 'Maximaler Durchfluss (Free delivery)',
			designPoint: 'Rohrnetz-Auslegungspunkt',
			designPointHint: 'Gesamtdruckverlust inkl. Ventile, WT, Fittings',
			operatingQ: 'Betriebspunkt Q',
			operatingH: 'Betriebspunkt H',
			operatingVsDesign: 'Betriebspunkt vs. Auslegung',
			hqDiagram: 'H-Q Diagramm (Näherung)',
			shutoffHeadLabel: 'Förderhöhe bei Q=0 (H₀)',
			freeDeliveryLabel: 'Volumenstrom bei H=0 (Q₀)',
			designFlowLabel: 'Auslegungs-Volumenstrom',
			networkPressureDrop: 'Druckverlust Rohrnetz bei Auslegung',
			noIntersection:
				'Kein Schnittpunkt im gültigen Bereich — Pumpe unterdimensioniert oder Rohrnetz falsch eingestellt.',
			pumpCurveLabel: 'Pumpenkennlinie',
			networkLabel: 'Rohrnetz',
			operatingPointLabel: 'Betriebspunkt',
			customPreset: 'Benutzerdefiniert',
			formulaNote:
				'Pumpenkennlinie: H(Q) = H₀ × (1 − (Q/Q₀)²) — parabolische Näherung. Rohrnetz: H(Q) = R × Q² mit R = ΔpAuslegung / Q²Auslegung. Betriebspunkt = Schnittpunkt beider Kurven.',
			operatingPointTooltip: 'Betriebspunkt'
		},

		leitungslaengeUi: {
			calculation: 'Berechnung',
			find: 'Gesucht',
			voltDropAtLength: 'Spannungsfall bei gegebener Länge',
			maxLength: 'Maximale Leitungslänge',
			minCrossSection: 'Mindest-Querschnitt für Länge',
			parameters: 'Parameter',
			sourceVoltage: 'Quellspannung',
			minVoltageDevice: 'Mindestspannung Gerät',
			inputAs: 'Eingabe als',
			currentA: 'Strom A',
			powerW: 'Leistung W',
			powerPerDevice: 'Leistung pro Gerät',
			currentPerDevice: 'Strom pro Gerät',
			pcs: 'Stk.',
			atEnd: 'Am Ende',
			distributed: 'Verteilt',
			lineLength: 'Leitungslänge (einfach)',
			crossSection: 'Leiterquerschnitt',
			voltDrop: 'Spannungsfall ΔU',
			devicePreset: 'Geräte-Preset',
			presetHint: 'Setzt Mindestspannung + Strom',
			deviceCount: 'Anzahl Geräte',
			totalCurrentHint: 'Gesamtstrom: {i} A',
			devicePlacement: 'Geräteplatzierung',
			placementEndHint: 'Alle am Leitungsende — konservativ',
			placementDistHint: 'Gleichmässig verteilt — ca. 50% weniger ΔU',
			voltageAtDevice: 'Spannung am Gerät',
			voltDropPct: 'Spannungsfall',
			cableResistance: 'Leitungswiderstand (Hin+Rück)',
			warnVoltageLow:
				'Spannung am Gerät zu niedrig ({u} V < {umin} V) — Querschnitt erhöhen oder Länge reduzieren.',
			warnCurrentHigh: 'Strombelastbarkeit überschritten: {i} A > {imax} A (zulässig für {cs} mm²)',
			infoCalc:
				'ΔU = 2 × L × ρ × I_eff / A · ρCu = {rho} Ω·mm²/m · Gesamtlänge (Hin+Rück): {l} m · I_eff = {i} A ({placement})',
			maxCableLength: 'Max. Leitungslänge ({cs} mm²)',
			allowedDrop: 'Erlaubter Spannungsfall',
			compareAll: 'Vergleich alle Querschnitte',
			currentTooHigh: 'Strom zu hoch ({imax} A max)',
			infoLength: 'Leitungslänge = einfache Länge (Hin + Rück wird berücksichtigt)',
			minCrossSect: 'Mindest-Querschnitt',
			recommendedSection: 'Empfohlener Normquerschnitt',
			stdSections: 'Normquerschnitte:',
			placementEndLabel: 'alle am Ende',
			placementDistLabel: 'verteilt × 0.5',
			presetKNX: 'KNX Busankoppler',
			presetRS485: 'RS-485 Gerät',
			presetDALI: 'DALI Steuergerät',
			presetActuator: 'Klappenantrieb 24V'
		},

		elektroUi: {
			ohmsLaw: "Ohm'sches Gesetz — U = R × I",
			find: 'Gesucht',
			resistance: 'Widerstand R (Ω)',
			voltage: 'Spannung U (V)',
			current: 'Strom I (A)',
			voltageU: 'Spannung U',
			currentI: 'Strom I',
			resistanceR: 'Widerstand R',
			powerDC: 'Leistung DC — P = U × I',
			powerP: 'Leistung P (W)',
			powerLabel: 'Leistung P',
			powerAC: 'Leistung AC — Wirk / Blind / Schein',
			powerFactor: 'Leistungsfaktor cos φ',
			activePower: 'Wirkleistung P',
			reactivePower: 'Blindleistung Q',
			apparentPower: 'Scheinleistung S',
			currentFromPower: 'Strom aus Leistung + Absicherung',
			circuit: 'Schaltung',
			recommendedFuse: 'Empfohlene Absicherung',
			fuseNote:
				'Absicherung = nächst höherer Normwert (6–32 A) bei I × 1.25 (80%-Regel nach NIN/VDE)'
		},

		dipSwitchUi: {
			protocol: 'Protokoll',
			custom: 'Benutzerdefiniert',
			switchCount: 'Switch-Anzahl',
			options: 'Optionen',
			numbering: 'Nummerierung',
			invertedLogic: 'Invertierte Logik',
			invertedDesc: 'OFF = 1 / ON = 0',
			protocolInfo: 'Protokoll-Info',
			dipSwitchPositions: 'DIP Switch Positionen',
			bitWeight: 'Bit-Gewichtung',
			subtitle: 'Adressierung für BACnet MSTP, Modbus RTU, KNX und benutzerdefinierte Protokolle',
			range: 'Bereich',
			bitResolution: 'Bit-Auflösung',
			warnOutOfRange: 'Adresse ausserhalb des gültigen Bereichs ({min}–{max})',
			infoBacnetMstp:
				'BACnet MS/TP verwendet MAC-Adressen von 0–127 (7 Bit). Jedes Gerät am Bus braucht eine eindeutige Adresse. Adressen 0–127 für Geräte, 128+ reserviert für Router/Broadcasts.',
			infoModbusRtu:
				'Modbus RTU verwendet Slave-IDs von 1–247 (0 = Broadcast, 248–255 reserviert). 8 DIP-Switches decken den gesamten Bereich ab. Adresse 0 ist für Broadcast-Befehle reserviert und darf keinem Gerät zugewiesen werden.',
			infoKnx:
				'KNX DIP-Switches kodieren typischerweise die Linienzahl oder Geräteadresse innerhalb einer Linie (0–255, 8 Bit). Die vollständige physikalische Adresse (Bereich.Linie.Gerät) wird via ETS vergeben.',
			infoCustom: 'Benutzerdefinierte Konfiguration. Switch-Anzahl und Adressbereich frei wählbar.',
			addressLabelKnx: 'Physikalische Adresse (Linie)',
			addressLabelCustom: 'Adresse'
		},

		heizlastUi: {
			locationNorm: 'Standort & Normaussentemperatur',
			normOutdoor: 'Normaussentemperatur (Te)',
			normOutdoorIs: 'Normaussentemperatur Te =',
			rooms: 'Räume',
			designation: 'Bezeichnung',
			roomSetpoint: 'Raumsolltemperatur',
			floorArea: 'Grundfläche',
			roomHeight: 'Raumhöhe',
			uWallLabel: 'U-Wert Wand',
			uRoofLabel: 'U-Wert Dach/Decke',
			uFloorLabel: 'U-Wert Boden',
			uWindowLabel: 'U-Wert Fenster',
			windowArea: 'Fensterfläche gesamt',
			airChange: 'Luftwechsel (Infiltration)',
			roomHeatload: 'Heizlast dieser Raum:',
			custom: 'Benutzerdefiniert',
			removeRoom: 'Raum entfernen',
			addRoom: 'Raum hinzufügen:',
			totalHeatload: 'Gesamtheizlast',
			specificHeatload: 'Spezifische Heizlast',
			totalArea: 'Beheizte Fläche total',
			benchmarkTitle: 'Richtwerte spez. Heizlast:',
			benchmarkMinergie: 'Minergie: <30 W/m²',
			benchmarkNew: 'Neubau: 30–60 W/m²',
			benchmarkOld: 'Altbau: 60–100 W/m²',
			benchmarkUninsulated: 'Unsaniert: >100 W/m²',
			calcNote:
				'Vereinfachte Berechnung nach EN 12831 / SIA 384.201. Aussenflächenermittlung über geometrische Näherung (quadratischer Grundriss). Für Baugenehmigung und Normberechnung ist eine detaillierte Heizlastberechnung mit Wärmebrücken und genauen Bauteilflächen nötig.',
			roomWohnen: 'Wohnzimmer',
			roomSchlafen: 'Schlafzimmer',
			roomBad: 'Badezimmer',
			roomBuero: 'Büro',
			roomTreppenhaus: 'Treppenhaus',
			roomKeller: 'Keller (unbeheizt → 0)'
		},

		polynomFitUi: {
			dataPoints: 'Messpunkte (x, y)',
			addRow: 'Punkt hinzufügen',
			degree: 'Polynom-Grad',
			degreeHint: '1 = linear, 2 = Parabel, 3 = kubisch …',
			linear: 'Linear',
			quadratic: 'Quadratisch',
			cubic: 'Kubisch',
			coefficients: 'Koeffizienten',
			chart: 'Verlauf',
			evaluate: 'Polynom auswerten',
			needMorePoints: 'Bitte mindestens 2 Datenpunkte eingeben.',
			degreeReduced:
				'Hinweis: Grad auf {effective} reduziert — nicht genug Punkte für gewünschten Grad.',
			notation: 'Koeffizienten-Notation',
			notationHint: 'Standard oder Block-Notation A·x² + B·x + C',
			notationStandard: 'Standard (a₀, a₁, a₂ …)',
			notationF001: 'A·x² + B·x + C',
			f001LinearHint: 'bei Grad 1 nicht gebraucht',
			f001DegreeWarning:
				'Schema A·x² + B·x + C unterstützt nur Grad ≤ 2. Bei höherem Grad zusätzliche Koeffizienten als Stützstellen-Tabelle umsetzen.'
		},

		kvWertUi: {
			kvFromQdp: 'Kv aus V̇ + Δp',
			dpFromQkv: 'Δp aus V̇ + Kv',
			qFromKvdp: 'V̇ aus Kv + Δp',
			volumeFlow: 'Volumenstrom V̇',
			pressureDiff: 'Druckdifferenz Δp',
			kvValue: 'Kv-Wert',
			recommendedKvs: 'Empfohlene Kvs (nächste Norm)',
			warnLowAuthority:
				'Geringe Ventilautorität (a ≈ {a}). Für saubere Regelung α ≥ 0.3 — Ventil evtl. zu gross.',
			formulaNote: 'Formel: Kv = V̇ × √(1 / Δp), Wasser bei 20 °C.',
			stdKvsSeries: 'Standard-Kvs nach DIN EN 1267:'
		}
	},

	// ── Konverter Index ───────────────────────────────────────────────────────
	konverter: {
		title: 'Konverter',
		subtitle: 'Einheitenumrechnung für die Gebäudeautomation',
		copyValue: 'Wert kopieren',
		copy: 'Kopieren',
		allConverters: 'Alle Konverter',
		resetAll: 'Alle zurücksetzen',
		druck: { name: 'Druck' },
		durchfluss: { name: 'Durchfluss' },
		energie: { name: 'Energie' },
		feuchte: { name: 'Feuchte' },
		leistung: { name: 'Leistung' },
		luftmengen: { name: 'Luftmengen' },
		temperatur: { name: 'Temperatur' },
		signal: { name: 'Analogsignal' },
		beleuchtung: { name: 'Beleuchtung' },
		winkel: { name: 'Winkel / Ventilstellung' }
	},

	// ── Changelog ─────────────────────────────────────────────────────────────
	changelog: {
		title: 'Changelog',
		subtitle: 'Versionshistorie GA Tool'
	},

	// ── Profil ────────────────────────────────────────────────────────────────
	profil: {
		title: 'Profil',
		subtitle: 'Persönliche Daten, Präferenzen und Übersicht',
		admin: 'Admin',
		recentlyUsed: 'Zuletzt verwendet',
		clear: 'Leeren',
		emptyRecent:
			'Noch nichts geöffnet. Konverter und Rechner erscheinen hier nach dem ersten Aufruf.',
		quickSettings: 'Schnelleinstellungen',
		theme: 'Theme',
		personalData: 'Persönliche Daten',
		nameLabel: 'Name',
		emailLabel: 'E-Mail',
		emailHint: 'E-Mail ist via Anmeldung gesetzt',
		roleLabel: 'Berufliche Rolle',
		rolePlaceholder: '— wählen —',
		companyLabel: 'Firma',
		disciplines: 'Fachbereiche',
		disciplinesHint: 'Mehrfachauswahl — beeinflusst Filter in der Wissensbasis',
		mfrPrefs: 'Bevorzugte Hersteller',
		mfrPrefsHint: 'Wird als Default im Heizkurven-Rechner verwendet',
		defaultCity: 'Standard-Standort',
		defaultCityHint: 'Setzt automatisch die Normaussentemperatur im Heizkurven-Rechner',
		cityLabel: 'Ort',
		normTemp: 'Normaussentemperatur',
		noDefault: '— kein Default —',
		notesLabel: 'Notizen',
		notesHint: 'Eigene Notizen, Setup-Infos, etc.',
		saved: '✓ Gespeichert',
		saving: 'Speichern…',
		save: 'Speichern',
		changePassword: 'Passwort ändern',
		currentPassword: 'Aktuelles Passwort',
		newPassword: 'Neues Passwort',
		confirmPassword: 'Neues Passwort bestätigen',
		passwordChanged: '✓ Passwort geändert',
		changing: 'Ändern…',
		typeKonverter: 'Konverter',
		typeRechner: 'Rechner',
		typeWissen: 'Artikel',
		typeReferenz: 'Referenz',
		typeCheckliste: 'Checkliste',
		errors: {
			notLoggedIn: 'Nicht angemeldet',
			nameRequired: 'Name darf nicht leer sein',
			fillAll: 'Alle Felder ausfüllen',
			minPw: 'Neues Passwort min. 8 Zeichen',
			pwMismatch: 'Passwörter stimmen nicht überein',
			wrongPw: 'Aktuelles Passwort falsch'
		}
	},

	// ── Bus-IBN ───────────────────────────────────────────────────────────────
	busIbn: {
		title: 'Bus-IBN Adresskonfigurator',
		subtitle: 'BACnet MSTP/IP · Modbus RTU · KNX — Adressverwaltung mit IBN-Dokument-Export',
		printTitle: 'Bus-IBN Adresskonfiguration',

		// Toolbar
		groupBy: 'Gruppe:',
		groupNone: 'Keine',
		groupArea: 'Bereich / Etage',
		groupDeviceType: 'Gerätetyp',
		groupManufacturer: 'Hersteller',
		importCsv: 'CSV importieren (Semikolon- oder kommagetrennt)',
		importJson: 'Vollständiges Projekt als JSON laden',
		exportCsv: 'Alle Segmente als CSV exportieren',
		exportJson: 'Projekt als JSON-Backup exportieren',

		// Project fields
		projectName: 'Projektname',
		projectNamePlaceholder: 'Projektname',
		site: 'Liegenschaft',
		sitePlaceholder: 'Liegenschaft / Adresse',
		engineer: 'Ingenieur',
		engineerPlaceholder: 'Name',
		version: 'Version',
		date: 'Datum',

		// Segments
		segmentNamePlaceholder: 'Segmentname',
		segmentDescPlaceholder: 'Bereich / Etage',
		exportSegmentCsv: 'Segment als CSV exportieren',
		addFromLibrary: 'Aus Bibliothek hinzufügen',
		segmentSettings: 'Einstellungen',
		deleteSegment: 'Segment löschen',
		addSegment: 'Segment hinzufügen',
		chooseProtocol: 'Bustyp wählen:',
		addSegmentBtn: 'Hinzufügen',
		startAddress: 'Startadresse',
		startAddressHint: 'Auto-Increment startet ab dieser Adresse',
		diOffset: 'DI-Offset',
		nextFreeHint: 'nächste freie ≥ {addr}',
		modbusSettings: 'Baud: {baud} · Parität: {parity} · Stoppbits: {stopBits}',
		knxSettings: 'Topologie: {topology} · Medium: {medium}',
		addrHintMstp:
			'MAC 1–127 · Regler typisch 1–31, Sensoren/Aktoren 32–127 · MAC 0 reserviert für Router/Gateway',
		addrHintIp: 'Device Instance 0–4.194.302 (projektübergreifend eindeutig)',
		addrHintModbus: 'Slave ID 1–247 · 0 = Broadcast (reserviert) · 248–255 reserviert',
		addrHintKnx: 'Linie 1–255 (physikalische Adresse via ETS)',
		bulkPreviewTitle: 'Vorschau ({count} Geräte):',
		noFreeAddresses: 'Keine freien Adressen ab {addr}.',
		deviceSingular: 'Gerät',
		devicePlural: 'Geräte',
		noValidRows: 'Keine gültigen Zeilen.',

		// Address map
		addrMapTitle: 'Adress-Belegung · MAC 0–127',
		legendGateway: 'Gateway',
		legendConflict: 'Konflikt',
		legendFree: 'Frei',
		legendUsed: 'Belegt',

		// Segment settings
		baudrate: 'Baudrate',
		maxMasters: 'Max Masters',
		maxInfoFrames: 'Max Info Frames',
		apduTimeout: 'APDU Timeout (ms)',
		apduRetries: 'APDU Retries',
		subnet: 'Subnet',
		udpPort: 'UDP Port',
		broadcast: 'Broadcast',
		bbmd: 'BBMD',
		bbmdPlaceholder: 'IP (optional)',
		subnetPlaceholder: '192.168.1.0/24',
		parity: 'Parität',
		parityNone: 'N (keine)',
		parityEven: 'E (gerade)',
		parityOdd: 'O (ungerade)',
		stopBits: 'Stoppbits',
		topology: 'Topologie',
		medium: 'Medium',
		mediumTP: 'TP (Twisted Pair)',
		mediumIP: 'IP (KNXnet/IP)',

		// Table headers
		colMac: 'MAC',
		colDi: 'Device Instance',
		colName: 'Name',
		colType: 'Typ',
		colManufacturer: 'Hersteller',
		colModel: 'Modell',
		colGroup: 'Gruppe',
		colStatus: 'Status',
		colNotes: 'Notizen',
		colActions: 'Aktionen',

		// Table inputs
		namePlaceholder: 'Name',
		typePlaceholder: 'Typ',
		mfrPlaceholder: 'Hersteller',
		modelPlaceholder: 'Modell',
		groupPlaceholder: 'Bereich',
		notesPlaceholder: 'Notizen',

		// Device actions
		duplicateDevice: 'Duplizieren',
		deleteDevice: 'Löschen',
		fixedAddress: 'Fixe Adresse',
		autoAddress: 'Auto-Adresse',
		fixedDI: 'Fixe DI',
		autoDI: 'Auto-DI',
		clickToCycle: 'Klick zum Wechseln',
		autoComputed: 'Auto: {offset} + {addr} = {di}',
		noDevices: 'Keine Geräte — «Gerät hinzufügen» klicken',
		addDevice: 'Gerät hinzufügen',

		// Bulk add
		bulkTitle: 'Mehrere Geräte hinzufügen',
		bulkCount: 'Anzahl',
		bulkPrefix: 'Name-Prefix',
		bulkPrefixPlaceholder: 'z.B. Raumregler',
		bulkStartNum: 'Startnummer',
		bulkPad: 'Stellen',
		bulkType: 'Typ',
		bulkTypePlaceholder: 'Typ',
		bulkMfr: 'Hersteller',
		bulkMfrPlaceholder: 'Hersteller',
		bulkModel: 'Modell',
		bulkModelPlaceholder: 'Modell',
		bulkDiConflict: 'DI-Konflikt!',
		bulkCancel: 'Abbrechen',
		bulkConfirm: 'Hinzufügen',

		// Import modal
		importTitle: 'CSV importieren',
		importTargetSegment: 'Ziel-Segment',
		importColMac: 'MAC',
		importColName: 'Gerätename',
		importColType: 'Typ',
		importColMfr: 'Hersteller',
		importColModel: 'Modell',
		importColGroup: 'Gruppe',
		importColStatus: 'Status',
		importCancel: 'Abbrechen',
		importConfirm: 'Importieren',
		noMacColumn: 'Keine MAC/Adresse-Spalte gefunden.',
		importFileEmpty: 'Datei leer oder kein Header.',

		invalidJson: 'Ungültige JSON-Datei.',

		// Conflict toast
		conflictDetected: 'Adresskonflikt erkannt — doppelte Adressen sind rot markiert.',

		// Library drawer
		libraryTitle: 'Geräte-Bibliothek',
		libraryInsertIn: 'Einfügen in:',
		librarySearchPlaceholder: 'Hersteller, Modell, Typ…',
		libraryAddDevice: 'Hinzufügen',
		libraryNoResults: 'Keine Geräte gefunden.',

		// Bulk selection bar
		selectionCount: '{n} ausgewählt',
		fillDownMfr: 'Hersteller auffüllen',
		fillDownModel: 'Modell auffüllen',
		fillDownGroup: 'Gruppe auffüllen',
		fillDownType: 'Typ auffüllen',
		deleteSelected: 'Ausgewählte löschen',
		selectAll: 'Alle auswählen',
		deselectAll: 'Auswahl aufheben',

		// Status labels
		statusPlanned: 'Geplant',
		statusConfigured: 'Konfiguriert',
		statusOnline: 'Online',
		statusError: 'Fehler',

		// CSV headers
		csvHeaderAll:
			'Segment;Protokoll;MAC;Gerätename;Typ;Hersteller;Modell;Gruppe;Device Instance;Status;Notizen',
		csvHeaderSeg: 'MAC;Gerätename;Typ;Hersteller;Modell;Gruppe;Device Instance;Status;Notizen',

		// Device library — categories
		libCatBacnetController: 'BACnet Regler',
		libCatRoomController: 'Raumregler',
		libCatSensors: 'Sensoren',
		libCatModbusMeter: 'Modbus Zähler',
		libCatKnxActuators: 'KNX Aktoren',
		libCatBacnetActuator: 'BACnet Antriebe',
		libCatModbusActuators: 'Modbus Antriebe',
		libCatBsk: 'Brandschutz-Klappe',

		// Device library — descriptions
		libDesc24io: '24 IO · BACnet MSTP',
		libDesc48io: '48 IO · BACnet MSTP',
		libDesc12io: '12 IO · BACnet MSTP',
		libDescLiob: 'L-IOB I/O Modul',
		libDescModulo5: 'modulo 5 Automation',
		libDescSaiaSps: 'Saia PCD3 SPS',
		libDescRoomAuto4pipe: 'Raumautomation 4-Pipe',
		libDescDesigo: 'Desigo Raumcontroller',
		libDescCo2TempRh: 'CO₂ + Temp + rH',
		libDescTempSpStage: 'Temp + Soll + Stufe',
		libDescPresence: 'Präsenzmelder BACnet',
		libDescAnalyzerEth: 'Netzanalysator Ethernet',
		libDescAnalyzerRtu: 'Netzanalysator RTU',
		libDescHeatMeter: 'Wärmemengenzähler',
		libDescEnergyMeter: 'Energierechner',
		libDescSwitchAct: 'Schaltaktor 8x16A',
		libDescBlindsAct: 'Jalousie 8-fach',
		libDescKnxDim: 'Dimmaktor 4×250W KNX',
		libDescKnxHeating: 'Heizungsaktor 6-fach KNX',
		libDescKnxRoom: 'Raumthermostat KNX',
		libDescDamperBacnet72: 'Klappantrieb 72Nm BACnet MSTP',
		libDescDamperBacnet35: 'Klappantrieb 35Nm BACnet MSTP',
		libDescDamperBacnet: 'Klappantrieb BACnet MSTP',
		libDescVfdModbus: 'Frequenzumrichter Modbus RTU',
		libDescPumpModbus: 'Pumpe Modbus RTU',
		libDescDamperModbus: 'Klappantrieb Modbus RTU',
		libDescCo2Modbus: 'CO₂ + Temp + rH Modbus RTU',
		libDescRoomModbus: 'Raumfühler Modbus RTU',
		libDescVavBacnet: 'VAV-Compact BACnet MSTP',
		libDescVavModbus: 'VAV-Compact Modbus RTU',
		libDescNovoconBacnet: 'Hydronik-Aktor BACnet MSTP',
		libDescNovoconModbus: 'Hydronik-Aktor Modbus RTU',
		libDescBskSpring: 'Federkehrend 24V · Endschalter',
		libDescBskThermoFuse: 'Thermosicherung 72°C · Federkehrend',
		libDescFec: 'Field Equipment Controller BACnet MSTP',
		libDescExcelWeb: 'Excel Web Controller BACnet MSTP',
		libDescEcgfx: 'gfxProgram Controller BACnet MSTP',
		libDescSmartX: 'SmartX AS-P BACnet MSTP',
		libDescIq: 'IQ Controller BACnet MSTP',
		libDescBeckhoff: 'CX Industrie-PC BACnet/Modbus',
		libDescFancoil: 'Fan-Coil-Regler BACnet MSTP',
		libDescHoneyRoom: 'Raumthermostat BACnet MSTP',
		libDescEcBos: 'BACnet Router/Server',
		libDescSauterRoom: 'Raumregler Modbus RTU',
		libDescDuctTemp: 'Kanaltemperaturfühler Modbus RTU',
		libDescDuctTempHum: 'Kanal Temp + rH Modbus RTU',
		libDescRoomCo2Modbus: 'Raum CO₂ + Temp + rH Modbus RTU',
		libDescMeter3phase: '3-Phasen Analysator Modbus RTU',
		libDescKnxMotion: 'Präsenzmelder 180° KNX',
		libDescKnxThermostat: 'Raumthermostat Unterputz KNX',
		libDescKnxDimCh: 'Dimmaktor 8×16A KNX'
	},
	cat: {
		alarme: 'Alarme',
		antriebe: 'Antriebe',
		dokumentation: 'Dokumentation',
		elektro: 'Elektro',
		energie: 'Energie',
		filter: 'Filter',
		ga: 'GA',
		gebaeude: 'Gebäude',
		heizung: 'Heizung',
		hydraulik: 'Hydraulik',
		ibn: 'IBN',
		it: 'IT',
		kaelte: 'Kälte',
		kälte: 'Kälte',
		klima: 'Klima',
		komfort: 'Komfort',
		kommunikation: 'Kommunikation',
		lueftung: 'Lüftung',
		material: 'Material',
		medien: 'Medien',
		netzwerk: 'Netzwerk',
		normen: 'Normen',
		protokoll: 'Protokoll',
		protokolle: 'Protokolle',
		regelung: 'Regelung',
		rohre: 'Rohre',
		sanitaer: 'Sanitär',
		sensoren: 'Sensoren',
		sicherheit: 'Sicherheit',
		test: 'Test',
		übergabe: 'Übergabe'
	}
};
