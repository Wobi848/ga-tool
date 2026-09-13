import { describe, it, expect } from 'vitest';
import type { ChecklistTemplate } from './types';
import meta from './checklisten.generated.json';

/* Konsistenzpruefung der Checklisten-Vorlagen.
 *
 * Der wunde Punkt hier sind die Item-IDs: sie landen im gespeicherten
 * Abhak-Zustand des Benutzers. Wird eine ID doppelt vergeben oder beim
 * Ergaenzen umbenannt, verliert jemand seinen Fortschritt — ohne dass
 * irgendwo ein Fehler auftaucht.
 */

const AREAS = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];

const module = import.meta.glob('./data/*.ts', { eager: true }) as Record<
	string,
	Record<string, unknown>
>;

const templates: Array<{ file: string; t: ChecklistTemplate }> = Object.entries(module).flatMap(
	([path, mod]) =>
		Object.values(mod)
			.filter(
				(e): e is ChecklistTemplate =>
					!!e && typeof e === 'object' && 'slug' in e && 'sections' in e
			)
			.map((t) => ({ file: path.replace('./data/', ''), t }))
);

const alleItems = (t: ChecklistTemplate) => t.sections.flatMap((s) => s.items);

describe('Checklisten — Bestand', () => {
	it('es werden Vorlagen gefunden', () => {
		expect(templates.length).toBeGreaterThan(5);
	});

	it('der generierte Index deckt sich mit den Datendateien', () => {
		const ausDaten = templates.map((x) => x.t.slug).sort();
		const ausIndex = (meta as Array<{ slug: string }>).map((m) => m.slug).sort();
		expect(ausIndex).toEqual(ausDaten);
	});

	it('Slugs sind eindeutig', () => {
		const slugs = templates.map((x) => x.t.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});

describe.each(templates)('Checkliste $file', ({ t }) => {
	it('hat Slug, Titel, Kategorie, Symbol und Farbe', () => {
		expect(t.slug).toMatch(/^[a-z0-9-]+$/);
		expect(t.title.trim().length).toBeGreaterThan(0);
		expect(t.category.trim().length).toBeGreaterThan(0);
		expect(t.icon.trim().length).toBeGreaterThan(0);
		expect(t.color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
	});

	it('ist zweisprachig beschriftet', () => {
		expect(t.title_en?.trim()).toBeTruthy();
		if (t.subtitle) expect(t.subtitle_en?.trim()).toBeTruthy();
		if (t.description) expect(t.description_en?.trim()).toBeTruthy();
	});

	it('nennt nur gueltige Fachbereiche', () => {
		expect(t.areas.length).toBeGreaterThan(0);
		for (const a of t.areas) expect(AREAS).toContain(a);
	});

	it('hat Abschnitte, und jeder hat Punkte', () => {
		expect(t.sections.length).toBeGreaterThan(0);
		t.sections.forEach((s, i) => {
			expect(s.title.trim().length, `Abschnitt ${i}: leerer Titel`).toBeGreaterThan(0);
			expect(s.items.length, `Abschnitt "${s.title}": keine Punkte`).toBeGreaterThan(0);
		});
	});

	it('Abschnittstitel sind uebersetzt', () => {
		for (const s of t.sections) {
			expect(s.title_en?.trim(), `Abschnitt "${s.title}" ohne title_en`).toBeTruthy();
		}
	});

	it('Item-IDs sind innerhalb der Vorlage eindeutig', () => {
		// Die IDs sind der Schluessel zum gespeicherten Abhak-Zustand.
		const ids = alleItems(t).map((i) => i.id);
		const doppelt = ids.filter((id, i) => ids.indexOf(id) !== i);
		expect(doppelt, `doppelte IDs: ${[...new Set(doppelt)].join(', ')}`).toEqual([]);
	});

	it('jeder Punkt hat eine ID und einen Titel', () => {
		for (const item of alleItems(t)) {
			expect(item.id, 'Punkt ohne id').toBeTruthy();
			expect(item.id).toMatch(/^[a-z0-9-]+$/);
			expect(item.title.trim().length, `Punkt ${item.id}: leerer Titel`).toBeGreaterThan(0);
		}
	});

	it('jeder Punkt ist uebersetzt', () => {
		for (const item of alleItems(t)) {
			expect(item.title_en?.trim(), `Punkt ${item.id} ohne title_en`).toBeTruthy();
			if (item.hint) expect(item.hint_en?.trim(), `Punkt ${item.id} ohne hint_en`).toBeTruthy();
		}
	});

	it('das Aenderungsdatum ist plausibel', () => {
		if (!t.updated) return;
		expect(t.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(Number.isNaN(Date.parse(t.updated))).toBe(false);
	});
});

describe('Checklisten — Index stimmt mit den Daten ueberein', () => {
	const nachSlug = Object.fromEntries(templates.map((x) => [x.t.slug, x.t]));

	it('sectionCount, itemCount und criticalCount sind richtig gezaehlt', () => {
		for (const m of meta as Array<{
			slug: string;
			sectionCount: number;
			itemCount: number;
			criticalCount: number;
		}>) {
			const t = nachSlug[m.slug];
			expect(t, `${m.slug} fehlt in den Daten`).toBeTruthy();
			const items = alleItems(t);
			expect(m.sectionCount, `${m.slug}: Abschnitte`).toBe(t.sections.length);
			expect(m.itemCount, `${m.slug}: Punkte`).toBe(items.length);
			expect(m.criticalCount, `${m.slug}: Muss-Kriterien`).toBe(
				items.filter((i) => i.critical).length
			);
		}
	});

	it('jede Vorlage hat mindestens ein Muss-Kriterium', () => {
		// Eine Checkliste ohne kritischen Punkt ist eine Liste, keine Abnahme.
		for (const { t } of templates) {
			const kritisch = alleItems(t).filter((i) => i.critical).length;
			expect(kritisch, `${t.slug} hat keine kritischen Punkte`).toBeGreaterThan(0);
		}
	});
});
