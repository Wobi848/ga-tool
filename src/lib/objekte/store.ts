/** Ablage der Objektverwaltung im Browser.
 *
 * Alles in **einem** Schluessel: die Datensaetze haengen zusammen (ein
 * Durchlauf ohne sein Objekt ist wertlos), und ein Schluessel laesst sich nicht
 * halb schreiben. Bei dieser Datenmenge — ein Techniker, ein paar Dutzend
 * Durchlaeufe — kostet das nichts.
 *
 * Der Server kommt in Stufe 2 als Spiegel dazu, nicht als Ersatz: im
 * Technikraum ist selten Empfang, und abhaken muss dort trotzdem gehen.
 */

import { browser } from '$app/environment';
import { randomUUID } from '$lib/uuid';
import {
	BESTAND_VERSION,
	leererBestand,
	type Anlage,
	type AnlagenArt,
	type Bestand,
	type Durchlauf,
	type Objekt
} from './types';

export const SCHLUESSEL = 'ga-objekte';
/** Praefix der alten, vorlagengebundenen Checklisten-Staende. */
export const ALT_PRAEFIX = 'ga-cl-';

function jetzt() {
	return Date.now();
}

/** Alles ohne Grabstein. */
function lebende<T extends { geloeschtAm?: number }>(xs: T[]): T[] {
	return xs.filter((x) => !x.geloeschtAm);
}

export function ladeBestand(): Bestand {
	if (!browser) return leererBestand();
	try {
		const roh = localStorage.getItem(SCHLUESSEL);
		if (!roh) return leererBestand();
		const b = JSON.parse(roh);
		// Fehlende Felder auffuellen statt zu vertrauen: der Inhalt kommt aus
		// einem Speicher, den auch aeltere Fassungen beschrieben haben.
		return {
			version: typeof b?.version === 'number' ? b.version : BESTAND_VERSION,
			objekte: Array.isArray(b?.objekte) ? b.objekte : [],
			anlagen: Array.isArray(b?.anlagen) ? b.anlagen : [],
			durchlaeufe: Array.isArray(b?.durchlaeufe) ? b.durchlaeufe : [],
			uebernommen: b?.uebernommen === true,
			// Muss mit durch: sonst meldet die Oberflaeche nach jedem Neuladen
			// «noch nie abgeglichen», obwohl es gerade lief.
			abgeglichenAm: typeof b?.abgeglichenAm === 'number' ? b.abgeglichenAm : undefined
		};
	} catch {
		// Kaputter Inhalt darf die Seite nicht mitreissen.
		return leererBestand();
	}
}

export function speichereBestand(b: Bestand): void {
	if (!browser) return;
	try {
		localStorage.setItem(SCHLUESSEL, JSON.stringify({ ...b, version: BESTAND_VERSION }));
	} catch {
		// Privates Fenster, blockierte Seitendaten, Speicher voll.
	}
}

/** Liest, aendert, schreibt — und gibt zurueck, was die Aenderung ergeben hat. */
function aendere<T>(fn: (b: Bestand) => T): T {
	const b = ladeBestand();
	const ergebnis = fn(b);
	speichereBestand(b);
	return ergebnis;
}

/* ── Objekte ─────────────────────────────────────────────────────────────── */

export function objekte(nurAktive = true): Objekt[] {
	const alle = lebende(ladeBestand().objekte);
	const gefiltert = nurAktive ? alle.filter((o) => !o.archiviertAm) : alle;
	// Zuletzt angefasstes zuerst — danach sucht man auf der Baustelle.
	return [...gefiltert].sort((a, b) => b.geaendertAm - a.geaendertAm);
}

export function objekt(id: string): Objekt | null {
	return lebende(ladeBestand().objekte).find((o) => o.id === id) ?? null;
}

export function objektAnlegen(felder: Partial<Objekt> & { name: string }): Objekt {
	return aendere((b) => {
		const o: Objekt = {
			id: randomUUID(),
			name: felder.name.trim(),
			adresse: felder.adresse?.trim() ?? '',
			auftraggeber: felder.auftraggeber?.trim() ?? '',
			notiz: felder.notiz?.trim() ?? '',
			erstelltAm: jetzt(),
			geaendertAm: jetzt()
		};
		b.objekte.push(o);
		return o;
	});
}

export function objektAendern(id: string, felder: Partial<Objekt>): Objekt | null {
	return aendere((b) => {
		const o = b.objekte.find((x) => x.id === id);
		if (!o) return null;
		// id und erstelltAm sind nicht verhandelbar.
		const { id: _id, erstelltAm: _e, ...rest } = felder;
		Object.assign(o, rest, { geaendertAm: jetzt() });
		return o;
	});
}

export function objektArchivieren(id: string, archivieren = true): Objekt | null {
	return objektAendern(id, { archiviertAm: archivieren ? jetzt() : undefined });
}

/** Loescht das Objekt mitsamt seinen Anlagen und Durchlaeufen.
 *
 * Setzt Grabsteine, statt die Datensaetze zu entfernen — siehe Anmerkung bei
 * `Anlage` in types.ts. Aus allen Listen sind sie gefiltert, sichtbar ist der
 * Unterschied also nicht.
 */
export function objektLoeschen(id: string): boolean {
	return aendere((b) => {
		const o = b.objekte.find((x) => x.id === id && !x.geloeschtAm);
		if (!o) return false;
		const t = jetzt();
		o.geloeschtAm = t;
		o.geaendertAm = t;
		// Ohne das blieben Anlagen und Durchlaeufe als Waisen liegen und
		// zaehlten in jeder Uebersicht weiter mit.
		for (const a of b.anlagen) {
			if (a.objektId === id && !a.geloeschtAm) {
				a.geloeschtAm = t;
				a.geaendertAm = t;
			}
		}
		for (const d of b.durchlaeufe) {
			if (d.objektId === id && !d.geloeschtAm) {
				d.geloeschtAm = t;
				d.geaendertAm = t;
			}
		}
		return true;
	});
}

/* ── Anlagen ─────────────────────────────────────────────────────────────── */

export function anlagen(objektId: string): Anlage[] {
	return lebende(ladeBestand().anlagen)
		.filter((a) => a.objektId === objektId)
		.sort((a, b) => a.reihenfolge - b.reihenfolge);
}

export function anlageAnlegen(
	objektId: string,
	name: string,
	art: AnlagenArt = 'sonstige'
): Anlage {
	return aendere((b) => {
		const vorhanden = b.anlagen.filter((a) => a.objektId === objektId);
		const a: Anlage = {
			id: randomUUID(),
			objektId,
			name: name.trim(),
			art,
			reihenfolge: vorhanden.length,
			erstelltAm: jetzt(),
			geaendertAm: jetzt()
		};
		b.anlagen.push(a);
		return a;
	});
}

export function anlageAendern(id: string, felder: Partial<Anlage>): Anlage | null {
	return aendere((b) => {
		const a = b.anlagen.find((x) => x.id === id);
		if (!a) return null;
		const { id: _id, objektId: _o, erstelltAm: _e, ...rest } = felder;
		Object.assign(a, rest, { geaendertAm: jetzt() });
		return a;
	});
}

/** Loescht die Anlage; ihre Durchlaeufe bleiben und haengen danach direkt am
 *  Objekt. Sie sind Arbeit, die Anlage war nur eine Schublade. */
export function anlageLoeschen(id: string): boolean {
	return aendere((b) => {
		const a = b.anlagen.find((x) => x.id === id && !x.geloeschtAm);
		if (!a) return false;
		const t = jetzt();
		a.geloeschtAm = t;
		a.geaendertAm = t;
		for (const d of b.durchlaeufe) {
			if (d.anlageId === id) {
				delete d.anlageId;
				d.geaendertAm = t;
			}
		}
		return true;
	});
}

/* ── Durchlaeufe ─────────────────────────────────────────────────────────── */

export function durchlaeufe(objektId?: string): Durchlauf[] {
	const alle = lebende(ladeBestand().durchlaeufe);
	const gefiltert = objektId ? alle.filter((d) => d.objektId === objektId) : alle;
	return [...gefiltert].sort((a, b) => b.geaendertAm - a.geaendertAm);
}

export function durchlauf(id: string): Durchlauf | null {
	return lebende(ladeBestand().durchlaeufe).find((d) => d.id === id) ?? null;
}

export function durchlaufAnlegen(felder: {
	objektId: string;
	vorlage: string;
	titel: string;
	anlageId?: string;
	gesamt?: number;
}): Durchlauf {
	return aendere((b) => {
		const d: Durchlauf = {
			id: randomUUID(),
			objektId: felder.objektId,
			anlageId: felder.anlageId,
			vorlage: felder.vorlage,
			titel: felder.titel.trim(),
			status: {},
			notizen: {},
			kontext: {},
			erledigt: 0,
			gesamt: felder.gesamt ?? 0,
			erstelltAm: jetzt(),
			geaendertAm: jetzt()
		};
		b.durchlaeufe.push(d);
		return d;
	});
}

export function durchlaufSpeichern(id: string, teil: Partial<Durchlauf>): Durchlauf | null {
	return aendere((b) => {
		const d = b.durchlaeufe.find((x) => x.id === id);
		if (!d) return null;
		const { id: _id, objektId: _o, erstelltAm: _e, ...rest } = teil;
		Object.assign(d, rest, { geaendertAm: jetzt() });
		// erledigt immer aus dem Zustand ableiten, nie vom Aufrufer glauben —
		// sonst zeigt die Uebersicht irgendwann etwas anderes als die Seite.
		d.erledigt = Object.values(d.status).filter(Boolean).length;
		return d;
	});
}

export function durchlaufAbschliessen(id: string, abgeschlossen = true): Durchlauf | null {
	return durchlaufSpeichern(id, { abgeschlossenAm: abgeschlossen ? jetzt() : undefined });
}

export function durchlaufLoeschen(id: string): boolean {
	return aendere((b) => {
		const d = b.durchlaeufe.find((x) => x.id === id && !x.geloeschtAm);
		if (!d) return false;
		d.geloeschtAm = jetzt();
		d.geaendertAm = d.geloeschtAm;
		return true;
	});
}

/** Fortschritt in Prozent, auf ganze Zahlen. */
export function fortschritt(d: Durchlauf): number {
	if (!d.gesamt) return 0;
	return Math.round((d.erledigt / d.gesamt) * 100);
}

/* ── Übernahme der alten Stände ──────────────────────────────────────────── */

/** Holt die vorlagengebundenen `ga-cl-*`-Staende in die Objektverwaltung.
 *
 * Vor dieser Stufe gab es je Vorlage genau einen Stand, ohne Bezug zu einem
 * Gebaeude. Diese Arbeit darf nicht verschwinden, nur weil das Modell jetzt
 * anders aussieht — also bekommt sie ein Sammelobjekt.
 *
 * Laeuft genau einmal (Merker im Bestand). Die alten Schluessel bleiben
 * absichtlich liegen: geht bei der Uebernahme etwas schief, ist der Stand noch
 * da. Aufgeraeumt wird spaeter, wenn sich das Modell bewaehrt hat.
 *
 * @returns Anzahl uebernommener Durchlaeufe.
 */
export function uebernehmeAlteStaende(
	titelVon: (vorlage: string) => string = (v) => v,
	gesamtVon: (vorlage: string) => number = () => 0
): number {
	if (!browser) return 0;

	const bestand = ladeBestand();
	if (bestand.uebernommen) return 0;

	const alte: Array<{ vorlage: string; stand: Record<string, unknown> }> = [];
	try {
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (!k?.startsWith(ALT_PRAEFIX)) continue;
			const roh = localStorage.getItem(k);
			if (!roh) continue;
			try {
				const stand = JSON.parse(roh);
				// Leere Staende uebergehen: sonst entstehen Durchlaeufe fuer
				// Checklisten, die jemand nur einmal aufgemacht hat.
				const hatInhalt =
					Object.values(stand?.status ?? {}).some(Boolean) ||
					Object.values(stand?.notizen ?? stand?.notes ?? {}).some((x) => String(x ?? '').trim());
				if (hatInhalt) alte.push({ vorlage: k.slice(ALT_PRAEFIX.length), stand });
			} catch {
				// Einzelner kaputter Stand darf die uebrigen nicht verhindern.
			}
		}
	} catch {
		return 0;
	}

	if (!alte.length) {
		bestand.uebernommen = true;
		speichereBestand(bestand);
		return 0;
	}

	const o: Objekt = {
		id: randomUUID(),
		name: 'Übernommen',
		adresse: '',
		auftraggeber: '',
		notiz:
			'Automatisch angelegt: hier liegen die Checklisten, die vor der ' +
			'Objektverwaltung ausgefüllt wurden. Verschieben oder umbenennen ist gefahrlos.',
		erstelltAm: jetzt(),
		geaendertAm: jetzt()
	};
	bestand.objekte.push(o);

	for (const { vorlage, stand } of alte) {
		const status = (stand.status ?? {}) as Record<string, boolean>;
		bestand.durchlaeufe.push({
			id: randomUUID(),
			objektId: o.id,
			vorlage,
			titel: titelVon(vorlage),
			status,
			// Das alte Modell hiess `notes`, das neue `notizen`.
			notizen: (stand.notizen ?? stand.notes ?? {}) as Record<string, string>,
			kontext: (stand.kontext ?? stand.context ?? {}) as Record<string, string>,
			erledigt: Object.values(status).filter(Boolean).length,
			gesamt: gesamtVon(vorlage),
			erstelltAm: (stand.updatedAt as number) ?? jetzt(),
			geaendertAm: (stand.updatedAt as number) ?? jetzt()
		});
	}

	bestand.uebernommen = true;
	speichereBestand(bestand);
	return alte.length;
}
