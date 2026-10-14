/* Schaltzeichen nach IEC 60617, senkrecht gezeichnet wie im aufgelösten
 * Stromlaufplan: Strom fliesst von oben nach unten.
 *
 * Jeder Eintrag ist der Inhalt eines <svg viewBox="0 0 48 48">. Gezeichnet
 * wird nur mit `currentColor`, damit die Zeichen im Dunkelmodus mitgehen. Die
 * Anschlüsse liegen immer bei x = 24 oben (y = 0) und unten (y = 48), so dass
 * sich die Zeichen in einer Tabelle wie in einem Schema aneinanderreihen.
 *
 * Kontakte stehen in Ruhestellung: unbetätigt und spannungslos. So zeichnet
 * sie auch jeder Stromlaufplan.
 */

export const SYMBOL_VIEWBOX = '0 0 48 48';

// Bausteine, aus denen sich die Kontakte zusammensetzen.
const oben = '<path d="M24 0V16"/>';
const unten = '<path d="M24 32V48"/>';
const schliesserZunge = '<path d="M24 32L13 14"/>';
const oeffnerZunge = '<path d="M24 32L35 12M24 16H32"/>';
/** Gestrichelte Wirkverbindung von der Zungenmitte nach links. */
const wirklinie = (x1: number) => `<path d="M${x1} 23H6" stroke-dasharray="3 2"/>`;
const tasterAntrieb = '<path d="M9 18H6V28H9"/>';

export const symbole: Record<string, string> = {
	leiter: '<path d="M24 0V48"/>',
	verbindung: '<path d="M24 0V48M24 24H48"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/>',
	kreuzung: '<path d="M24 0V48M0 24H48"/>',
	wirkverbindung: '<path d="M4 24H44" stroke-dasharray="4 3"/>',
	klemme: '<path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/>',

	schliesser: oben + schliesserZunge + unten,
	oeffner: oben + oeffnerZunge + unten,
	wechsler:
		// In Ruhestellung liegt die Zunge am Öffner (rechts) an, nicht am Schliesser.
		'<path d="M14 0V16M34 0V16M34 16H29M24 48V32M24 32L35 12"/>' +
		'<circle cx="24" cy="32" r="1.5" fill="currentColor"/>',
	'taster-schliesser': oben + schliesserZunge + unten + wirklinie(18) + tasterAntrieb,
	'taster-oeffner': oben + oeffnerZunge + unten + wirklinie(29) + tasterAntrieb,
	'not-halt':
		oben +
		oeffnerZunge +
		unten +
		wirklinie(29) +
		// Pilzkopf
		'<path d="M6 16A7 7 0 0 0 6 30Z" fill="currentColor"/>',
	'schuetz-hauptkontakt':
		'<path d="M24 0V10"/>' + schliesserZunge + unten + '<path d="M24 10A3 3 0 0 0 24 16"/>',
	'ls-schalter': oben + schliesserZunge + unten + '<path d="M20 12L28 20M28 12L20 20"/>',

	spule: '<path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/>',
	'spule-anzugverzoegert':
		'<path d="M24 0V14M24 34V48"/><rect x="14" y="14" width="24" height="20"/>' +
		'<rect x="6" y="14" width="8" height="20"/><path d="M6 14L14 34M14 14L6 34"/>',
	'spule-abfallverzoegert':
		'<path d="M24 0V14M24 34V48"/><rect x="14" y="14" width="24" height="20"/>' +
		'<rect x="6" y="14" width="8" height="20" fill="currentColor"/>',
	'ueberlast-ausloeser':
		'<path d="M24 0V12M24 36V48"/><rect x="12" y="12" width="24" height="24"/>' +
		'<path d="M24 12V20H18V28H24V36"/>',

	sicherung: '<path d="M24 0V48"/><rect x="18" y="10" width="12" height="28"/>',
	widerstand: '<path d="M24 0V12M24 36V48"/><rect x="18" y="12" width="12" height="24"/>',
	temperaturfuehler:
		'<path d="M24 0V12M24 36V48"/><rect x="18" y="12" width="12" height="24"/>' +
		'<path d="M10 40L14 40L34 8"/>' +
		'<text x="38" y="30" font-size="11" fill="currentColor" stroke="none">ϑ</text>',
	kondensator: '<path d="M24 0V21M24 27V48M12 21H36M12 27H36"/>',
	diode: '<path d="M24 0V48M14 16H34L24 32Z M14 32H34"/>',

	meldeleuchte:
		'<path d="M24 0V14M24 34V48"/><circle cx="24" cy="24" r="10"/>' +
		'<path d="M17 17L31 31M31 17L17 31"/>',
	motor:
		'<path d="M24 0V10M24 38V48"/><circle cx="24" cy="24" r="14"/>' +
		'<text x="24" y="24" font-size="12" text-anchor="middle" fill="currentColor" stroke="none">M</text>' +
		'<text x="24" y="34" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">3~</text>',
	transformator:
		'<path d="M24 0V8M24 40V48"/><circle cx="24" cy="18" r="10"/><circle cx="24" cy="30" r="10"/>',
	netzteil:
		'<path d="M24 0V10M24 38V48"/><rect x="10" y="10" width="28" height="28"/>' +
		'<path d="M10 38L38 10"/>' +
		'<path d="M14 19Q16.5 15 19 19T24 19"/>' +
		'<path d="M26 29H34M26 32H34"/>',
	erde: '<path d="M24 0V26M12 26H36M16 32H32M20 38H28"/>',
	schutzleiter:
		'<path d="M24 0V20M16 20H32M18.5 24H29.5M21 28H27"/><circle cx="24" cy="24" r="12"/>'
};

export function hatSymbol(key: string): boolean {
	return Object.hasOwn(symbole, key);
}
