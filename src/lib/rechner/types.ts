export interface RechnerMeta {
	slug: string;
	name: string;
	name_en?: string;
	short: string;
	short_en?: string;
	icon: string;
	color: string;
	/** ISO-Datum (YYYY-MM-DD) wann der Rechner hinzugefügt/zuletzt überarbeitet wurde */
	updated?: string;
}
