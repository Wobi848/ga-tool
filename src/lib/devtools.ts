// Browser-Console Devtools: window.gaTool — Inspect + ad-hoc Befehle
// fuer den Power-User. Nur im Browser. Wird in +layout.svelte beim Mount
// einmalig installiert.

import { get } from 'svelte/store';
import { articles } from './wissen/articles';
import { rechner } from './rechner';
import { converters } from './converters';
import { referenceTables } from './referenz';
import { checklists } from './checklisten';
import { abbreviations } from './abkuerzungen/data';
import { search as globalSearch } from './search';
import { favorites } from './stores/favorites';
import { theme, type Theme } from './stores/theme';
import { getRecent, clearRecent } from './stores/recent';
import { setLang, getSavedLang, type Lang } from './i18n';
import { APP_VERSION } from './version';

const VERSION = APP_VERSION;

interface Stats {
	wissen: number;
	rechner: number;
	konverter: number;
	checklisten: number;
	referenz: number;
	abkuerzungen: number;
	favorites: number;
	recents: number;
}

function stats(): Stats {
	return {
		wissen: articles.length,
		rechner: rechner.length,
		konverter: converters.length,
		checklisten: checklists.length,
		referenz: referenceTables.length,
		abkuerzungen: abbreviations.length,
		favorites: get(favorites).length,
		recents: getRecent().length
	};
}

function dump() {
	return {
		version: VERSION,
		theme: get(theme),
		locale: getSavedLang(),
		stats: stats(),
		favorites: get(favorites),
		recents: getRecent(),
		localStorage: Object.fromEntries(
			Object.entries(localStorage).filter(([k]) => k.startsWith('ga-'))
		)
	};
}

function help() {
	const sections: Array<{ title: string; cmds: Array<[string, string]> }> = [
		{
			title: 'Allgemein',
			cmds: [
				['help()', 'Diese Hilfe'],
				['version', 'App-Version'],
				['stats()', 'Counts (Wissen, Rechner, Favs, ...)'],
				['dump()', 'Vollständiger Client-State-Snapshot']
			]
		},
		{
			title: 'Inhalte',
			cmds: [
				['search(query, limit?)', 'Globale Suche über alle Inhalte'],
				['articles', 'Liste aller Wissens-Artikel'],
				['rechner', 'Liste aller Rechner'],
				['converters', 'Liste aller Konverter'],
				['abbreviations', 'Liste aller Abkürzungen']
			]
		},
		{
			title: 'Favoriten',
			cmds: [
				['favorites.list()', 'Aktuelle Favoriten'],
				['favorites.export()', 'Als JSON-String exportieren'],
				['favorites.import(json)', 'Aus JSON importieren (überschreibt)'],
				['favorites.clear()', 'Alle Favoriten löschen']
			]
		},
		{
			title: 'UI-State',
			cmds: [
				['theme.get()', 'Aktuelles Theme (auto/light/dark/oled)'],
				['theme.set("oled")', 'Theme setzen'],
				['locale.get()', 'Aktuelle Sprache'],
				['locale.set("en")', 'Sprache setzen (de/en/auto)'],
				['recents.list()', 'Zuletzt geöffnete Items'],
				['recents.clear()', 'Recent-History löschen']
			]
		}
	];

	// Eine einzige console-Group statt vieler Einzel-Logs — keine
	// "<empty string>"-Zeilen mehr und ausklappbar im Devtools-Panel.
	const styleTitle = 'font-weight:700;font-size:1.05em;color:#0d9488;padding:2px 0';
	const styleSection = 'font-weight:600;color:#7c3aed;padding-top:6px';
	const styleCmd = 'font-family:ui-monospace,monospace;color:#0d9488';
	const styleDesc = 'color:#888';

	console.group('%cGA-Tool Devtools — v' + VERSION, styleTitle);
	console.log(
		'Alle Befehle starten mit %cgaTool.%c — Beispiel: %cgaTool.stats()',
		'font-family:ui-monospace,monospace;color:#7c3aed',
		'',
		'font-family:ui-monospace,monospace;color:#0d9488'
	);

	for (const section of sections) {
		console.group('%c' + section.title, styleSection);
		// Max-Laenge der Befehle fuer Spalten-Alignment
		const maxLen = Math.max(...section.cmds.map(([c]) => c.length));
		for (const [cmd, desc] of section.cmds) {
			const padded = `gaTool.${cmd}`.padEnd(maxLen + 8, ' ');
			console.log(`%c${padded}%c${desc}`, styleCmd, styleDesc);
		}
		console.groupEnd();
	}
	console.groupEnd();
	return undefined;
}

function setTheme(value: Theme) {
	theme.set(value);
	return value;
}

function setLocale(lang: Lang) {
	setLang(lang);
	return lang;
}

function exportFavs(): string {
	return JSON.stringify(get(favorites), null, 2);
}

function importFavs(json: string): number {
	const list = JSON.parse(json);
	if (!Array.isArray(list)) throw new Error('Expected JSON array');
	const current = get(favorites);
	// Erst alle existierenden entfernen
	for (const f of [...current]) {
		favorites.toggle({ type: f.type, slug: f.slug, title: f.title });
	}
	// Dann neue hinzufügen
	for (const f of list) {
		favorites.toggle({ type: f.type, slug: f.slug, title: f.title });
	}
	return get(favorites).length;
}

function clearFavs(): number {
	const current = get(favorites);
	for (const f of [...current]) {
		favorites.toggle({ type: f.type, slug: f.slug, title: f.title });
	}
	return 0;
}

export const gaTool = {
	version: VERSION,
	help,
	stats,
	dump,
	search: globalSearch,
	articles,
	rechner,
	converters,
	abbreviations,
	favorites: {
		list: () => get(favorites),
		export: exportFavs,
		import: importFavs,
		clear: clearFavs
	},
	theme: {
		get: () => get(theme),
		set: setTheme
	},
	locale: {
		get: getSavedLang,
		set: setLocale
	},
	recents: {
		list: getRecent,
		clear: clearRecent
	}
};

export function installDevtools(): void {
	if (typeof window === 'undefined') return;
	// gaTool wird still installiert — kein Banner. Power-User finden es per
	// Tab-Completion oder gaTool.help() wenn sie wissen, dass es existiert.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window as any).gaTool = gaTool;
}
