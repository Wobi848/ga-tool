import { describe, it, expect } from 'vitest';
import type { ReferenceTable } from './types';
import meta from './referenz.generated.json';

/* Konsistenzpruefung der Referenztabellen.
 *
 * Das sind reine Datenbestaende — 17 Tabellen, die von Hand ergaenzt werden.
 * Genau dort gehen Dinge still kaputt: eine Spalte umbenannt und die Zeilen
 * nicht mitgezogen, ein Slug doppelt vergeben, das englische Label vergessen.
 * Nichts davon wirft einen Fehler, es fehlt dann einfach etwas in der Anzeige.
 */

const AREAS = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];

const module = import.meta.glob('./data/*.ts', { eager: true }) as Record<
	string,
	Record<string, unknown>
>;

/** Alle Tabellen samt Dateiname, damit Fehlermeldungen die Quelle nennen. */
const tables: Array<{ file: string; t: ReferenceTable }> = Object.entries(module).flatMap(
	([path, mod]) =>
		Object.values(mod)
			.filter(
				(e): e is ReferenceTable => !!e && typeof e === 'object' && 'slug' in e && 'rows' in e
			)
			.map((t) => ({ file: path.replace('./data/', ''), t }))
);

describe('Referenztabellen — Bestand', () => {
	it('es werden ueberhaupt Tabellen gefunden', () => {
		expect(tables.length).toBeGreaterThan(10);
	});

	it('jede Datendatei liefert genau eine Tabelle', () => {
		const dateien = Object.keys(module).length;
		expect(tables).toHaveLength(dateien);
	});

	it('der generierte Index deckt sich mit den Datendateien', () => {
		const ausDaten = tables.map((x) => x.t.slug).sort();
		const ausIndex = (meta as Array<{ slug: string }>).map((m) => m.slug).sort();
		expect(ausIndex).toEqual(ausDaten);
	});
});

describe.each(tables)('Referenztabelle $file', ({ t }) => {
	it('hat Slug, Titel und Kategorie', () => {
		expect(t.slug).toMatch(/^[a-z0-9-]+$/);
		expect(t.title.trim().length).toBeGreaterThan(0);
		expect(t.category.trim().length).toBeGreaterThan(0);
	});

	it('ist zweisprachig beschriftet', () => {
		expect(t.title_en?.trim()).toBeTruthy();
		// Wo es eine deutsche Beschreibung gibt, muss auch eine englische stehen.
		if (t.subtitle) expect(t.subtitle_en?.trim()).toBeTruthy();
		if (t.description) expect(t.description_en?.trim()).toBeTruthy();
		if (t.notes) expect(t.notes_en?.trim()).toBeTruthy();
	});

	it('nennt nur gueltige Fachbereiche', () => {
		expect(t.areas.length).toBeGreaterThan(0);
		for (const a of t.areas) expect(AREAS).toContain(a);
	});

	it('hat Spalten mit eindeutigen Schluesseln', () => {
		expect(t.columns.length).toBeGreaterThan(0);
		const keys = t.columns.map((c) => c.key);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it('Spaltenbeschriftungen sind gesetzt und nicht leer', () => {
		// Uebersetzungen sind hier bewusst NICHT eingefordert: viele
		// Beschriftungen sind sprachneutral (DN, GWP, FC, DPT) oder ohnehin
		// englisch ("Function Code (hex)"). Eine Pflicht dazu wuerde nur
		// Platzhalter erzeugen. Geprueft wird, dass nichts leer stehen bleibt.
		for (const c of t.columns) {
			expect(c.label.trim().length, `Spalte ${c.key}: leeres label`).toBeGreaterThan(0);
			for (const feld of ['label_en', 'hint', 'hint_en'] as const) {
				const v = c[feld];
				if (v !== undefined) {
					expect(v.trim().length, `Spalte ${c.key}: leeres ${feld}`).toBeGreaterThan(0);
				}
			}
		}
	});

	it('hat Zeilen', () => {
		expect(t.rows.length).toBeGreaterThan(0);
	});

	it('jede Zeile fuellt jede Spalte', () => {
		const keys = t.columns.map((c) => c.key);
		t.rows.forEach((row, i) => {
			for (const k of keys) {
				expect(row, `Zeile ${i}: Spalte "${k}" fehlt`).toHaveProperty(k);
			}
		});
	});

	it('keine Zeile traegt unbekannte Spalten', () => {
		// Zellinhalte duerfen uebersetzt sein: zu Spalte "einsatz" gehoert
		// optional "einsatz_en" in derselben Zeile. Alles andere waere ein
		// Tippfehler im Schluessel — und der faellt sonst nirgends auf.
		const keys = new Set(t.columns.map((c) => c.key));
		t.rows.forEach((row, i) => {
			for (const k of Object.keys(row)) {
				const basis = k.endsWith('_en') ? k.slice(0, -3) : k;
				expect(keys.has(basis), `Zeile ${i}: "${k}" steht in keiner Spalte`).toBe(true);
			}
		});
	});

	it('uebersetzte Zellen sind nicht leer', () => {
		// Auch hier keine Vollstaendigkeitspflicht: eine Zelle mit "≤ 500 m"
		// oder "—" braucht keine englische Fassung, eine mit deutschem Fliess-
		// text schon. Das zuverlaessig zu unterscheiden ginge nur mit Raten.
		// Geprueft wird, dass ein vorhandenes _en auch etwas enthaelt.
		t.rows.forEach((row, i) => {
			for (const [k, v] of Object.entries(row)) {
				if (!k.endsWith('_en')) continue;
				expect(String(v).trim().length, `Zeile ${i}: "${k}" ist leer`).toBeGreaterThan(0);
			}
		});
	});

	it('Zahlenspalten enthalten keine unbrauchbaren Werte', () => {
		const zahl = t.columns.filter((c) => c.type === 'number').map((c) => c.key);
		t.rows.forEach((row, i) => {
			for (const k of zahl) {
				const v = row[k];
				if (v === '' || v === '—' || v == null) continue; // bewusst leer ist erlaubt
				expect(Number.isNaN(Number(v)), `Zeile ${i}, Spalte "${k}": "${v}"`).toBe(false);
			}
		});
	});

	it('das Aenderungsdatum ist plausibel', () => {
		if (!t.updated) return;
		expect(t.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(Number.isNaN(Date.parse(t.updated))).toBe(false);
	});
});

describe('Referenztabellen — uebergreifend', () => {
	it('Slugs sind eindeutig', () => {
		const slugs = tables.map((x) => x.t.slug);
		const doppelt = slugs.filter((s, i) => slugs.indexOf(s) !== i);
		expect(doppelt).toEqual([]);
	});

	it('der generierte Index verweist auf die richtige Datei', () => {
		// Dateiname und Slug duerfen abweichen (motor-ie.ts -> motor-ie-klassen);
		// entscheidend ist, dass der Index korrekt darauf zeigt.
		const dateiNachSlug = Object.fromEntries(tables.map((x) => [x.t.slug, x.file]));
		for (const m of meta as Array<{ slug: string; file?: string }>) {
			if (!m.file) continue;
			expect(m.file, `Index fuer ${m.slug}`).toBe(dateiNachSlug[m.slug]);
		}
	});

	it('rowCount im Index stimmt mit den tatsaechlichen Zeilen ueberein', () => {
		const nachSlug = Object.fromEntries(tables.map((x) => [x.t.slug, x.t.rows.length]));
		for (const m of meta as Array<{ slug: string; rowCount: number }>) {
			expect(m.rowCount, `${m.slug}: Index sagt ${m.rowCount}`).toBe(nachSlug[m.slug]);
		}
	});
});
