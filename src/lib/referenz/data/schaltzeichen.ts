import type { ReferenceTable } from '../types';

export const schaltzeichen: ReferenceTable = {
	slug: 'schaltzeichen',
	title: 'Schaltzeichen',
	title_en: 'Circuit Symbols',
	subtitle: 'Die häufigsten Zeichen im Stromlaufplan nach IEC 60617',
	subtitle_en: 'The most common symbols in circuit diagrams per IEC 60617',
	category: 'Elektro',
	icon: 'zap',
	color: '#dc2626',
	areas: ['elektro', 'ga'],
	norm: ['IEC 60617', 'IEC 81346-2', 'EN 60947-5-1', 'EN 50005'],
	updated: '2026-10-14',
	description:
		'Kontakte sind immer in Ruhestellung gezeichnet: unbetätigt und spannungslos. Kennbuchstabe nach IEC 81346-2, in Klammern die alte Bezeichnung nach DIN 40719, die auf vielen Schemas noch steht.',
	description_en:
		'Contacts are always drawn in their rest position: not actuated and de-energised. Class letter per IEC 81346-2, in brackets the old designation per DIN 40719 that is still found on many diagrams.',
	notes:
		'Planer weichen bei den Kennbuchstaben voneinander ab. Massgebend ist die Legende im jeweiligen Schema.',
	notes_en:
		'Designers differ in their choice of class letters. The legend of the respective diagram is authoritative.',
	columns: [
		{ key: 'symbol', label: 'Zeichen', label_en: 'Symbol', type: 'symbol' },
		{ key: 'name', label: 'Bedeutung', label_en: 'Meaning', highlight: true },
		{
			key: 'bmk',
			label: 'Kennbuchstabe',
			label_en: 'Class letter',
			mono: true,
			hint: 'IEC 81346-2, in Klammern DIN 40719',
			hint_en: 'IEC 81346-2, old DIN 40719 in brackets'
		},
		{ key: 'anschluss', label: 'Anschlüsse', label_en: 'Terminals', mono: true },
		{ key: 'hinweis', label: 'Worauf achten', label_en: 'What to look for' }
	],
	rows: [
		{
			symbol: 'verbindung',
			name: 'Leiterverbindung',
			name_en: 'Conductor junction',
			bmk: '—',
			anschluss: '—',
			hinweis: 'Nur mit Punkt sind die Leiter verbunden.',
			hinweis_en: 'Conductors are joined only where there is a dot.'
		},
		{
			symbol: 'kreuzung',
			name: 'Leiterkreuzung ohne Verbindung',
			name_en: 'Crossing without junction',
			bmk: '—',
			anschluss: '—',
			hinweis: 'Kein Punkt, keine Verbindung. Häufigster Lesefehler.',
			hinweis_en: 'No dot, no junction. The most common reading error.'
		},
		{
			symbol: 'wirkverbindung',
			name: 'Mechanische Wirkverbindung',
			name_en: 'Mechanical linkage',
			bmk: '—',
			anschluss: '—',
			hinweis: 'Gestrichelt: diese Teile werden gemeinsam betätigt.',
			hinweis_en: 'Dashed: these parts are operated together.'
		},
		{
			symbol: 'klemme',
			name: 'Klemme',
			name_en: 'Terminal',
			bmk: 'X',
			anschluss: 'X1:5',
			hinweis: 'Leiste X1, Klemme 5. Hier wird gemessen und aufgetrennt.',
			hinweis_en: 'Strip X1, terminal 5. This is where you measure and disconnect.'
		},
		{
			symbol: 'schliesser',
			name: 'Schliesser (Arbeitskontakt)',
			name_en: 'Normally open (NO) contact',
			bmk: 'K',
			anschluss: '13-14, 23-24',
			hinweis: 'Offen in Ruhe, schliesst bei Betätigung. Endziffern 3-4.',
			hinweis_en: 'Open at rest, closes when operated. Function digits 3-4.'
		},
		{
			symbol: 'oeffner',
			name: 'Öffner (Ruhekontakt)',
			name_en: 'Normally closed (NC) contact',
			bmk: 'K',
			anschluss: '11-12, 21-22',
			hinweis: 'Geschlossen in Ruhe, öffnet bei Betätigung. Endziffern 1-2.',
			hinweis_en: 'Closed at rest, opens when operated. Function digits 1-2.'
		},
		{
			symbol: 'wechsler',
			name: 'Wechsler',
			name_en: 'Changeover contact',
			bmk: 'K',
			anschluss: '11-12-14',
			hinweis: '11 ist der gemeinsame Anschluss. In Ruhe 11-12, betätigt 11-14.',
			hinweis_en: '11 is the common terminal. At rest 11-12, operated 11-14.'
		},
		{
			symbol: 'taster-schliesser',
			name: 'Taster, Schliesser',
			name_en: 'Push button, NO',
			bmk: 'S',
			anschluss: '13-14',
			hinweis: 'Typisch Start/Ein. Federt nach dem Loslassen zurück.',
			hinweis_en: 'Typically start/on. Springs back when released.'
		},
		{
			symbol: 'taster-oeffner',
			name: 'Taster, Öffner',
			name_en: 'Push button, NC',
			bmk: 'S',
			anschluss: '11-12',
			hinweis: 'Typisch Stopp/Aus. Drahtbruch wirkt wie Stopp: sicher.',
			hinweis_en: 'Typically stop/off. A broken wire acts like stop: fail-safe.'
		},
		{
			symbol: 'not-halt',
			name: 'Not-Halt (Pilztaster)',
			name_en: 'Emergency stop (mushroom head)',
			bmk: 'S',
			anschluss: '11-12, 21-22',
			hinweis: 'Immer Öffner, rastet ein. Erst entriegeln, dann neu starten.',
			hinweis_en: 'Always NC, latches. Unlock first, then restart.'
		},
		{
			symbol: 'spule',
			name: 'Spule von Schütz oder Relais',
			name_en: 'Contactor or relay coil',
			bmk: 'Q (K)',
			anschluss: 'A1-A2',
			hinweis:
				'Unter der Spule steht der Kontaktspiegel: wo die Kontakte dieses Schützes im Schema liegen.',
			hinweis_en:
				'Below the coil is the contact table: where the contacts of this contactor are in the diagram.'
		},
		{
			symbol: 'spule-anzugverzoegert',
			name: 'Spule, anzugverzögert',
			name_en: 'Coil, on-delay',
			bmk: 'K',
			anschluss: 'A1-A2',
			hinweis: 'Kästchen mit Kreuz. Kontakte schalten erst nach Ablauf der Zeit.',
			hinweis_en: 'Box with cross. Contacts switch only after the delay has elapsed.'
		},
		{
			symbol: 'spule-abfallverzoegert',
			name: 'Spule, abfallverzögert',
			name_en: 'Coil, off-delay',
			bmk: 'K',
			anschluss: 'A1-A2',
			hinweis: 'Gefülltes Kästchen. Kontakte bleiben nach dem Abschalten noch die Zeit lang.',
			hinweis_en: 'Filled box. Contacts stay for the set time after switch-off.'
		},
		{
			symbol: 'schuetz-hauptkontakt',
			name: 'Hauptkontakt eines Schützes',
			name_en: 'Contactor main contact',
			bmk: 'Q (K)',
			anschluss: '1-2, 3-4, 5-6',
			hinweis: 'Schaltet den Laststrom, meist dreipolig. Im Hauptstromkreis, nicht im Steuerkreis.',
			hinweis_en:
				'Switches the load current, usually three-pole. In the main circuit, not the control circuit.'
		},
		{
			symbol: 'ls-schalter',
			name: 'Leitungsschutzschalter',
			name_en: 'Miniature circuit breaker',
			bmk: 'F',
			anschluss: '1-2',
			hinweis: 'Kreuz am Kontakt: schaltet bei Kurzschluss oder Überlast selbst ab.',
			hinweis_en: 'Cross on the contact: trips by itself on short circuit or overload.'
		},
		{
			symbol: 'sicherung',
			name: 'Sicherung',
			name_en: 'Fuse',
			bmk: 'F',
			anschluss: '1-2',
			hinweis: 'Im 24-V-Kreis oft Feinsicherung. Wert steht daneben.',
			hinweis_en: 'In the 24 V circuit often a miniature fuse. The rating is written next to it.'
		},
		{
			symbol: 'ueberlast-ausloeser',
			name: 'Thermischer Überlastauslöser',
			name_en: 'Thermal overload release',
			bmk: 'F',
			anschluss: '95-96, 97-98',
			hinweis: 'Motorschutz. Sein Öffner 95-96 liegt im Steuerkreis vor der Schützspule.',
			hinweis_en: 'Motor protection. Its NC 95-96 sits in the control circuit before the coil.'
		},
		{
			symbol: 'widerstand',
			name: 'Widerstand',
			name_en: 'Resistor',
			bmk: 'R',
			anschluss: '—',
			hinweis: 'Rechteck nach IEC. Die Zickzack-Linie ist die amerikanische Darstellung.',
			hinweis_en: 'Rectangle per IEC. The zigzag line is the American style.'
		},
		{
			symbol: 'temperaturfuehler',
			name: 'Temperaturabhängiger Widerstand (Fühler)',
			name_en: 'Temperature-dependent resistor (sensor)',
			bmk: 'B',
			anschluss: '—',
			hinweis: 'Pt1000, NTC usw. Der Typ steht daneben.',
			hinweis_en: 'Pt1000, NTC etc. The type is written next to it.'
		},
		{
			symbol: 'kondensator',
			name: 'Kondensator',
			name_en: 'Capacitor',
			bmk: 'C',
			anschluss: '—',
			hinweis: 'In der GA vor allem bei Einphasenmotoren und Entstörgliedern.',
			hinweis_en: 'In BA mainly on single-phase motors and suppressors.'
		},
		{
			symbol: 'diode',
			name: 'Diode',
			name_en: 'Diode',
			bmk: 'R (V)',
			anschluss: '—',
			hinweis: 'Freilaufdiode parallel zu DC-Spulen. Durchlass in Pfeilrichtung.',
			hinweis_en: 'Flyback diode across DC coils. Conducts in arrow direction.'
		},
		{
			symbol: 'meldeleuchte',
			name: 'Meldeleuchte',
			name_en: 'Indicator lamp',
			bmk: 'P (H)',
			anschluss: 'X1-X2',
			hinweis: 'Betrieb, Störung, Hand. Farbe steht daneben (RD, GN, YE, WH).',
			hinweis_en: 'Running, fault, manual. Colour is written next to it (RD, GN, YE, WH).'
		},
		{
			symbol: 'motor',
			name: 'Drehstrommotor',
			name_en: 'Three-phase motor',
			bmk: 'M',
			anschluss: 'U-V-W',
			hinweis: 'Ventilator, Pumpe. Drehrichtung prüfen, wenn zwei Phasen getauscht wurden.',
			hinweis_en: 'Fan, pump. Check direction of rotation if two phases were swapped.'
		},
		{
			symbol: 'transformator',
			name: 'Transformator',
			name_en: 'Transformer',
			bmk: 'T',
			anschluss: '—',
			hinweis: 'Steuertrafo 230/24 VAC für Stellantriebe und Feldgeräte.',
			hinweis_en: 'Control transformer 230/24 VAC for actuators and field devices.'
		},
		{
			symbol: 'netzteil',
			name: 'Netzteil (AC/DC)',
			name_en: 'Power supply (AC/DC)',
			bmk: 'T (G)',
			anschluss: 'L-N / +-−',
			hinweis: 'Wechselspannung rein, Gleichspannung raus. Typisch 24 VDC für DDC und Bus.',
			hinweis_en: 'AC in, DC out. Typically 24 VDC for DDC and bus.'
		},
		{
			symbol: 'erde',
			name: 'Erde',
			name_en: 'Earth',
			bmk: '—',
			anschluss: '—',
			hinweis: 'Allgemeines Erdzeichen. Funktionserde für Schirme.',
			hinweis_en: 'General earth symbol. Functional earth for shields.'
		},
		{
			symbol: 'schutzleiter',
			name: 'Schutzleiter (PE)',
			name_en: 'Protective earth (PE)',
			bmk: '—',
			anschluss: 'PE',
			hinweis: 'Mit Kreis: Schutzerde. Grün-gelb, nie für etwas anderes verwenden.',
			hinweis_en: 'With circle: protective earth. Green-yellow, never used for anything else.'
		}
	]
};
