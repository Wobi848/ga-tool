/** Datenmodell der Objektverwaltung — siehe docs/KONZEPT-OBJEKTE.md.
 *
 * Begriffe aus der Praxis, nicht aus der Informatik: ein **Objekt** ist das
 * Gebaeude, eine **Anlage** die Lueftung oder Heizung darin, ein **Durchlauf**
 * eine ausgefuellte Checkliste dazu.
 *
 * «Projekt» kommt hier bewusst nicht vor: der Begriff ist im
 * Bus-IBN-Konfigurator schon belegt und meint dort eine Bus-Topologie.
 */

export const ANLAGEN_ARTEN = [
	'lueftung',
	'heizung',
	'kaelte',
	'sanitaer',
	'elektro',
	'ga',
	'sonstige'
] as const;

export type AnlagenArt = (typeof ANLAGEN_ARTEN)[number];

export interface Objekt {
	id: string;
	name: string;
	adresse: string;
	auftraggeber: string;
	notiz: string;
	erstelltAm: number;
	geaendertAm: number;
	/** Gesetzt heisst: aus der Liste verschwunden, aber nicht geloescht. */
	archiviertAm?: number;
	/** Grabstein. Siehe Anmerkung bei `Anlage`. */
	geloeschtAm?: number;
}

/* Geloescht wird mit einem Grabstein (`geloeschtAm`) statt durch Entfernen.
 * Ohne ihn taucht eine auf dem Telefon geloeschte Anlage beim naechsten
 * Abgleich vom Laptop wieder auf: der Laptop kennt sie noch und haelt sie fuer
 * neu. Aus allen Listen sind sie gefiltert, sichtbar ist der Unterschied
 * also nicht. */
export interface Anlage {
	id: string;
	objektId: string;
	name: string;
	art: AnlagenArt;
	reihenfolge: number;
	erstelltAm: number;
	geaendertAm: number;
	geloeschtAm?: number;
}

export interface Durchlauf {
	id: string;
	objektId: string;
	/** Optional: wer nur ein kleines Objekt hat, soll keine Anlage anlegen muessen. */
	anlageId?: string;
	/** Slug der Checklisten-Vorlage. */
	vorlage: string;
	titel: string;
	status: Record<string, boolean>;
	notizen: Record<string, string>;
	kontext: Record<string, string>;
	/** Liegen neben dem Zustand, damit die Uebersicht nicht jeden Durchlauf
	 *  auspacken muss, um einen Fortschritt anzuzeigen. */
	erledigt: number;
	gesamt: number;
	erstelltAm: number;
	geaendertAm: number;
	abgeschlossenAm?: number;
	geloeschtAm?: number;
}

/** Alles, was im Browser liegt. Versioniert, damit spaetere Umbauten eine
 *  Migration schreiben koennen, statt still falsch zu lesen. */
export interface Bestand {
	version: number;
	objekte: Objekt[];
	anlagen: Anlage[];
	durchlaeufe: Durchlauf[];
	/** Einmalige Uebernahme der alten `ga-cl-*`-Staende ist gelaufen. */
	uebernommen?: boolean;
	/** Wann zuletzt mit dem Server abgeglichen wurde. */
	abgeglichenAm?: number;
}

export const BESTAND_VERSION = 1;

export function leererBestand(): Bestand {
	return { version: BESTAND_VERSION, objekte: [], anlagen: [], durchlaeufe: [] };
}
