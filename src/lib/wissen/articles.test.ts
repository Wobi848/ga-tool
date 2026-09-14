import { describe, it, expect } from 'vitest';
import { articles, articleMap, loadArticleBody, loadFullArticle, listMeta } from './articles';

/* Pruefung der Wissensbasis.
 *
 * 122 Artikel, deren Metadaten beim Build aus dem Frontmatter erzeugt werden.
 * Was hier still kaputtgeht: ein `related` oder `rechner` im Frontmatter, das
 * ins Leere zeigt — im Portal wird daraus ein toter Link, und niemand merkt es,
 * bis jemand draufklickt.
 */

const AREAS = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];
const DIFFICULTIES = ['grundlagen', 'fortgeschritten', 'experte'];
const slugs = new Set(articles.map((a) => a.slug));

describe('Bestand', () => {
	it('es gibt Artikel', () => {
		expect(articles.length).toBeGreaterThan(100);
	});

	it('listMeta liefert dieselbe Liste', () => {
		expect(listMeta()).toBe(articles);
	});

	it('articleMap deckt jeden Artikel ab', () => {
		expect(Object.keys(articleMap)).toHaveLength(articles.length);
		for (const a of articles) expect(articleMap[a.slug]).toBe(a);
	});

	it('Slugs sind eindeutig', () => {
		const alle = articles.map((a) => a.slug);
		const doppelt = [...new Set(alle.filter((s, i) => alle.indexOf(s) !== i))];
		expect(doppelt, `doppelte Slugs: ${doppelt.join(', ')}`).toEqual([]);
	});
});

describe('Metadaten jedes Artikels', () => {
	it('Slug ist kleingeschrieben und URL-tauglich', () => {
		for (const a of articles) {
			expect(a.slug, `"${a.slug}"`).toMatch(/^[a-z0-9-]+$/);
		}
	});

	it('Titel ist gesetzt, und der englische auch', () => {
		for (const a of articles) {
			expect(a.title.trim().length, `${a.slug}: leerer Titel`).toBeGreaterThan(0);
			expect(a.title_en?.trim(), `${a.slug}: ohne title_en`).toBeTruthy();
		}
	});

	it('hat Kategorie und mindestens einen Tag', () => {
		for (const a of articles) {
			expect(a.category.trim().length, `${a.slug}: keine Kategorie`).toBeGreaterThan(0);
			expect(a.tags.length, `${a.slug}: keine Tags`).toBeGreaterThan(0);
		}
	});

	it('Schwierigkeitsgrad ist einer der drei bekannten', () => {
		for (const a of articles) {
			expect(DIFFICULTIES, `${a.slug}: "${a.difficulty}"`).toContain(a.difficulty);
		}
	});

	it('nennt nur gueltige Fachbereiche', () => {
		for (const a of articles) {
			expect(a.area.length, `${a.slug}: kein Fachbereich`).toBeGreaterThan(0);
			for (const bereich of a.area) {
				expect(AREAS, `${a.slug}: unbekannter Bereich "${bereich}"`).toContain(bereich);
			}
		}
	});

	it('das Aenderungsdatum ist ein gueltiges Datum', () => {
		for (const a of articles) {
			expect(a.updated, `${a.slug}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(Number.isNaN(Date.parse(a.updated)), `${a.slug}: "${a.updated}"`).toBe(false);
		}
	});

	it('Tags enthalten keine Dubletten und keine Randleerzeichen', () => {
		for (const a of articles) {
			expect(new Set(a.tags).size, `${a.slug}: doppelte Tags`).toBe(a.tags.length);
			for (const t of a.tags) expect(t, `${a.slug}: Tag "${t}"`).toBe(t.trim());
		}
	});
});

describe('Querverweise', () => {
	it('jedes related zeigt auf einen vorhandenen Artikel', () => {
		const tot: string[] = [];
		for (const a of articles) {
			for (const r of a.related) if (!slugs.has(r)) tot.push(`${a.slug} → ${r}`);
		}
		expect(tot, `tote Verweise: ${tot.join(', ')}`).toEqual([]);
	});

	it('auf jeden Artikel verweist mindestens ein anderer', () => {
		// Bisher wurde nur geprueft, ob ein `related` ins Leere zeigt. Die
		// andere Richtung fehlte: am 14.09.2026 hatten 17 Artikel keinen
		// einzigen Eingang — darunter `hand-0-auto`, `selv-pelv` und
		// `sps-grundlagen`. Wer sich durchklickt, stoesst nie darauf; nur die
		// Suche findet sie.
		const eingehend = new Map<string, number>();
		for (const a of articles) {
			for (const r of a.related) eingehend.set(r, (eingehend.get(r) ?? 0) + 1);
		}
		const ohne = articles.filter((a) => !eingehend.get(a.slug)).map((a) => a.slug);
		expect(ohne, `niemand verweist auf: ${ohne.join(', ')}`).toEqual([]);
	});

	it('kein Artikel verweist auf sich selbst', () => {
		for (const a of articles) {
			expect(a.related, `${a.slug} verweist auf sich selbst`).not.toContain(a.slug);
		}
	});

	it('jeder genannte Rechner existiert', async () => {
		const { rechner } = await import('$lib/rechner');
		const vorhanden = new Set(rechner.map((r: { slug: string }) => r.slug));
		const tot: string[] = [];
		for (const a of articles) {
			for (const r of a.rechner) if (!vorhanden.has(r)) tot.push(`${a.slug} → ${r}`);
		}
		expect(tot, `tote Rechner-Verweise: ${tot.join(', ')}`).toEqual([]);
	});
});

describe('Zweisprachigkeit', () => {
	it('alle Artikel haben einen englischen Text', () => {
		const ohne = articles.filter((a) => !a.hasEnBody).map((a) => a.slug);
		expect(ohne, `ohne englischen Teil: ${ohne.join(', ')}`).toEqual([]);
	});
});

describe('loadArticleBody', () => {
	it('liefert deutschen und englischen Teil', async () => {
		const b = await loadArticleBody('pid-regler');
		expect(b).not.toBeNull();
		expect(b!.bodyDe.length).toBeGreaterThan(200);
		expect(b!.bodyEn?.length).toBeGreaterThan(200);
	});

	it('schneidet das Frontmatter weg', async () => {
		const b = await loadArticleBody('pid-regler');
		expect(b!.body.startsWith('---')).toBe(false);
		expect(b!.bodyDe).not.toContain('title_en:');
	});

	it('der EN-Marker steht in keinem der beiden Teile', async () => {
		const b = await loadArticleBody('pid-regler');
		expect(b!.bodyDe).not.toContain('<!-- EN -->');
		expect(b!.bodyEn).not.toContain('<!-- EN -->');
	});

	it('der deutsche Teil beginnt mit der Ueberschrift', async () => {
		// Nur der deutsche Teil: 86 der 122 englischen Fassungen steigen direkt
		// mit Fliesstext ein, weil die Ueberschrift dort aus title_en kommt.
		// Das ist Hausstil, kein Mangel.
		const b = await loadArticleBody('pid-regler');
		expect(b!.bodyDe.startsWith('#')).toBe(true);
		expect(b!.bodyEn!.length).toBeGreaterThan(200);
	});

	it('unbekannter Slug liefert null statt zu werfen', async () => {
		await expect(loadArticleBody('gibt-es-nicht')).resolves.toBeNull();
		await expect(loadArticleBody('')).resolves.toBeNull();
	});

	// 30 Sekunden statt der voreingestellten 5: der Test laedt alle 122
	// Markdown-Dateien einzeln. Allein braucht er gut eine Sekunde, unter Last
	// neben den uebrigen Dateien reichte die Vorgabe am 14.09.2026 nicht — und
	// ein Test, der gelegentlich grundlos rot wird, wird irgendwann ignoriert.
	it('jeder Artikel laesst sich laden', { timeout: 30_000 }, async () => {
		// Faengt den Fall ab, dass der Index eine Datei nennt, die es nicht gibt.
		const fehler: string[] = [];
		for (const a of articles) {
			const b = await loadArticleBody(a.slug);
			if (!b || b.bodyDe.length < 50) fehler.push(a.slug);
		}
		expect(fehler, `nicht ladbar oder zu kurz: ${fehler.join(', ')}`).toEqual([]);
	});

	it('hasEnBody stimmt mit dem tatsaechlichen Inhalt ueberein', { timeout: 30_000 }, async () => {
		const falsch: string[] = [];
		for (const a of articles) {
			const b = await loadArticleBody(a.slug);
			if (a.hasEnBody !== Boolean(b?.bodyEn)) falsch.push(a.slug);
		}
		expect(falsch, `Index und Inhalt weichen ab: ${falsch.join(', ')}`).toEqual([]);
	});
});

describe('loadFullArticle', () => {
	it('verbindet Metadaten und Text', async () => {
		const a = await loadFullArticle('pid-regler');
		expect(a).not.toBeNull();
		expect(a!.slug).toBe('pid-regler');
		expect(a!.title).toBeTruthy();
		expect(a!.bodyDe.length).toBeGreaterThan(200);
	});

	it('unbekannter Slug liefert null', async () => {
		await expect(loadFullArticle('gibt-es-nicht')).resolves.toBeNull();
	});
});
