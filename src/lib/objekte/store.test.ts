import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/* Pruefung der Objektverwaltung.
 *
 * Hier liegt ab jetzt die Arbeit, die auf der Baustelle entsteht. Drei Dinge
 * duerfen nicht schiefgehen: mehrere Durchlaeufe derselben Vorlage duerfen sich
 * nicht in die Quere kommen, geloeschte Objekte duerfen keine Waisen
 * hinterlassen, und die Uebernahme der alten Staende darf nichts verschlucken.
 */

vi.mock('$app/environment', () => ({ browser: true }));

function speicherAttrappe() {
	let daten: Record<string, string> = {};
	return {
		getItem: (k: string) => (k in daten ? daten[k] : null),
		setItem: (k: string, v: string) => {
			daten[k] = String(v);
		},
		removeItem: (k: string) => {
			delete daten[k];
		},
		clear: () => {
			daten = {};
		},
		get length() {
			return Object.keys(daten).length;
		},
		key: (i: number) => Object.keys(daten)[i] ?? null,
		get _daten() {
			return daten;
		}
	};
}

let speicher: ReturnType<typeof speicherAttrappe>;

beforeEach(() => {
	speicher = speicherAttrappe();
	vi.stubGlobal('localStorage', speicher);
	vi.stubGlobal('crypto', { randomUUID: () => `id-${Math.random().toString(36).slice(2, 10)}` });
	vi.resetModules();
});

afterEach(() => vi.unstubAllGlobals());

const laden = () => import('./store');

describe('Objekte', () => {
	it('anlegen, wiederfinden, auflisten', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: '  Seefeld Baufeld B  ', adresse: 'Seestrasse 1' });
		expect(o.name).toBe('Seefeld Baufeld B'); // Randleerzeichen weg
		expect(s.objekt(o.id)?.adresse).toBe('Seestrasse 1');
		expect(s.objekte().map((x) => x.id)).toEqual([o.id]);
	});

	it('das zuletzt angefasste steht vorn', async () => {
		// Mit echter Uhr haetten zwei Anlagevorgaenge denselben
		// Millisekunden-Stempel, und die Reihenfolge waere nicht bestimmt. Der
		// Test soll die Sortierung pruefen, nicht die Aufloesung der Uhr.
		vi.useFakeTimers();
		try {
			const s = await laden();
			const a = s.objektAnlegen({ name: 'A' });
			vi.advanceTimersByTime(1000);
			const b = s.objektAnlegen({ name: 'B' });
			expect(s.objekte()[0].id).toBe(b.id);
			vi.advanceTimersByTime(1000);
			s.objektAendern(a.id, { notiz: 'angefasst' });
			expect(s.objekte()[0].id).toBe(a.id);
		} finally {
			vi.useRealTimers();
		}
	});

	it('archivierte verschwinden aus der Liste, bleiben aber erhalten', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'Fertig' });
		s.objektArchivieren(o.id);
		expect(s.objekte()).toHaveLength(0);
		expect(s.objekte(false)).toHaveLength(1);
		expect(s.objekt(o.id)).not.toBeNull();
		s.objektArchivieren(o.id, false);
		expect(s.objekte()).toHaveLength(1);
	});

	it('id und Anlagedatum lassen sich nicht ueberschreiben', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		s.objektAendern(o.id, { id: 'gekapert', erstelltAm: 0 } as never);
		expect(s.objekt(o.id)?.erstelltAm).toBe(o.erstelltAm);
		expect(s.objekt('gekapert')).toBeNull();
	});

	it('Loeschen nimmt Anlagen und Durchlaeufe mit', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const a = s.anlageAnlegen(o.id, 'Lüftung');
		s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn', titel: 'IBN', anlageId: a.id });
		const anderes = s.objektAnlegen({ name: 'B' });
		s.durchlaufAnlegen({ objektId: anderes.id, vorlage: 'ibn', titel: 'IBN' });

		expect(s.objektLoeschen(o.id)).toBe(true);
		// Sonst zaehlen Waisen in jeder Uebersicht weiter mit.
		expect(s.anlagen(o.id)).toHaveLength(0);
		expect(s.durchlaeufe(o.id)).toHaveLength(0);
		// Das andere Objekt bleibt unangetastet.
		expect(s.durchlaeufe(anderes.id)).toHaveLength(1);
	});
});

describe('Anlagen', () => {
	it('behalten ihre Reihenfolge', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		s.anlageAnlegen(o.id, 'Erste');
		s.anlageAnlegen(o.id, 'Zweite');
		s.anlageAnlegen(o.id, 'Dritte');
		expect(s.anlagen(o.id).map((a) => a.name)).toEqual(['Erste', 'Zweite', 'Dritte']);
	});

	it('gehoeren nur zu ihrem Objekt', async () => {
		const s = await laden();
		const a = s.objektAnlegen({ name: 'A' });
		const b = s.objektAnlegen({ name: 'B' });
		s.anlageAnlegen(a.id, 'nur bei A');
		expect(s.anlagen(b.id)).toHaveLength(0);
	});

	it('Loeschen laesst die Durchlaeufe stehen', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const a = s.anlageAnlegen(o.id, 'Lüftung');
		const d = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn', titel: 'IBN', anlageId: a.id });
		s.anlageLoeschen(a.id);
		// Die Anlage war eine Schublade, der Durchlauf ist Arbeit.
		expect(s.durchlauf(d.id)).not.toBeNull();
		expect(s.durchlauf(d.id)?.anlageId).toBeUndefined();
	});
});

describe('Durchlaeufe', () => {
	it('mehrere derselben Vorlage kommen sich nicht in die Quere', async () => {
		// Das ist der ganze Grund fuer diese Stufe.
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const eins = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn-lueftung', titel: 'MZ1' });
		const zwei = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn-lueftung', titel: 'MZ2' });

		s.durchlaufSpeichern(eins.id, { status: { a: true, b: true } });
		s.durchlaufSpeichern(zwei.id, { status: { a: true } });

		expect(s.durchlauf(eins.id)?.erledigt).toBe(2);
		expect(s.durchlauf(zwei.id)?.erledigt).toBe(1);
		expect(s.durchlaeufe(o.id)).toHaveLength(2);
	});

	it('leitet den Fortschritt aus dem Zustand ab, statt ihn zu glauben', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const d = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn', titel: 'IBN', gesamt: 4 });
		// Aufrufer behauptet 99 erledigt — der Zustand sagt 2.
		s.durchlaufSpeichern(d.id, { status: { a: true, b: true, c: false }, erledigt: 99 });
		expect(s.durchlauf(d.id)?.erledigt).toBe(2);
		expect(s.fortschritt(s.durchlauf(d.id)!)).toBe(50);
	});

	it('Fortschritt ohne bekannte Gesamtzahl ist 0, nicht NaN', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const d = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn', titel: 'IBN' });
		expect(s.fortschritt(s.durchlauf(d.id)!)).toBe(0);
	});

	it('abschliessen und wieder oeffnen', async () => {
		const s = await laden();
		const o = s.objektAnlegen({ name: 'A' });
		const d = s.durchlaufAnlegen({ objektId: o.id, vorlage: 'ibn', titel: 'IBN' });
		s.durchlaufAbschliessen(d.id);
		expect(s.durchlauf(d.id)?.abgeschlossenAm).toBeGreaterThan(0);
		s.durchlaufAbschliessen(d.id, false);
		expect(s.durchlauf(d.id)?.abgeschlossenAm).toBeUndefined();
	});

	it('unbekannte Kennung liefert null statt zu werfen', async () => {
		const s = await laden();
		expect(s.durchlauf('gibt-es-nicht')).toBeNull();
		expect(s.durchlaufSpeichern('gibt-es-nicht', { titel: 'x' })).toBeNull();
		expect(s.durchlaufLoeschen('gibt-es-nicht')).toBe(false);
	});
});

describe('Speicher', () => {
	it('kaputter Inhalt fuehrt nicht zum Absturz', async () => {
		speicher.setItem('ga-objekte', '{kein gueltiges JSON');
		const s = await laden();
		expect(s.objekte()).toEqual([]);
		expect(() => s.objektAnlegen({ name: 'Neu' })).not.toThrow();
	});

	it('fehlende Felder im Bestand werden aufgefuellt', async () => {
		speicher.setItem('ga-objekte', JSON.stringify({ objekte: [{ id: 'x', name: 'Alt' }] }));
		const s = await laden();
		expect(s.objekte(false)).toHaveLength(1);
		expect(s.durchlaeufe()).toEqual([]);
	});
});

describe('Uebernahme der alten Staende', () => {
	const alterStand = (status: Record<string, boolean>, notes = {}) =>
		JSON.stringify({ status, notes, context: { Anlage: 'MZ1' }, updatedAt: 1_700_000_000_000 });

	it('holt ausgefuellte Checklisten in ein Sammelobjekt', async () => {
		speicher.setItem('ga-cl-ibn-lueftung', alterStand({ a: true, b: false }));
		speicher.setItem('ga-cl-uebergabe', alterStand({ x: true }));
		const s = await laden();

		expect(s.uebernehmeAlteStaende((v) => `Vorlage ${v}`)).toBe(2);
		const objekte = s.objekte();
		expect(objekte).toHaveLength(1);
		expect(objekte[0].name).toBe('Übernommen');

		const d = s.durchlaeufe(objekte[0].id);
		expect(d).toHaveLength(2);
		expect(d.map((x) => x.vorlage).sort()).toEqual(['ibn-lueftung', 'uebergabe']);
		expect(d.find((x) => x.vorlage === 'ibn-lueftung')?.erledigt).toBe(1);
		expect(d[0].titel.startsWith('Vorlage ')).toBe(true);
	});

	it('uebernimmt Notizen und Kontext aus den alten Feldnamen', async () => {
		speicher.setItem('ga-cl-ibn', alterStand({ a: true }, { a: 'Ventil klemmt' }));
		const s = await laden();
		s.uebernehmeAlteStaende();
		const d = s.durchlaeufe()[0];
		expect(d.notizen.a).toBe('Ventil klemmt');
		expect(d.kontext.Anlage).toBe('MZ1');
	});

	it('uebergeht leere Staende', async () => {
		// Sonst entstehen Durchlaeufe fuer Checklisten, die jemand nur aufgemacht hat.
		speicher.setItem('ga-cl-nur-angeschaut', alterStand({ a: false, b: false }));
		const s = await laden();
		expect(s.uebernehmeAlteStaende()).toBe(0);
		expect(s.objekte()).toHaveLength(0);
	});

	it('laeuft genau einmal', async () => {
		speicher.setItem('ga-cl-ibn', alterStand({ a: true }));
		const s = await laden();
		expect(s.uebernehmeAlteStaende()).toBe(1);
		expect(s.uebernehmeAlteStaende()).toBe(0);
		expect(s.objekte()).toHaveLength(1);
	});

	it('laesst die alten Schluessel liegen', async () => {
		// Geht bei der Uebernahme etwas schief, ist der Stand noch da.
		speicher.setItem('ga-cl-ibn', alterStand({ a: true }));
		const s = await laden();
		s.uebernehmeAlteStaende();
		expect(speicher.getItem('ga-cl-ibn')).not.toBeNull();
	});

	it('ein kaputter Stand verhindert die uebrigen nicht', async () => {
		speicher.setItem('ga-cl-kaputt', 'kein JSON');
		speicher.setItem('ga-cl-heil', alterStand({ a: true }));
		const s = await laden();
		expect(s.uebernehmeAlteStaende()).toBe(1);
	});

	it('ohne alte Staende passiert nichts, aber nur einmal', async () => {
		const s = await laden();
		expect(s.uebernehmeAlteStaende()).toBe(0);
		expect(s.objekte()).toHaveLength(0);
	});
});
