import type { ReferenceTable } from '../types';

export const kbobPrioritaeten: ReferenceTable = {
	slug: 'kbob-prioritaeten',
	title: 'BACnet-Prioritätsliste nach KBOB',
	title_en: 'BACnet Priority List per KBOB',
	subtitle: 'Belegung der 16 Stufen des Priority_Array',
	subtitle_en: 'Use of the 16 levels of the Priority_Array',
	category: 'Protokoll',
	icon: 'layers',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'ISO 16484-5'],
	updated: '2026-10-17',
	description:
		'Welche Anwendung auf welche Stufe des Priority_Array schreibt. Die niedrigste belegte Nummer gewinnt. Freie Stufen sind nur nach Absprache mit dem Bauherrn zu verwenden.',
	description_en:
		'Which application writes to which level of the Priority_Array. The lowest occupied number wins. Free levels may only be used by agreement with the owner.',
	notes:
		'Quelle: KBOB-Empfehlung BACnet Anwendung 2021, Tab. 10. Bei physischen Ausgängen (BO, MO, AO) mit sicherheitsrelevanter Funktion wie Frostschutz ist das Priority_Array Pflicht, und die Priorität der Sicherheitsfunktion wird an alle Aggregate vererbt. Für Sollwerte empfiehlt die KBOB kein Priority_Array. Ein Befehl wird zurückgenommen, indem NULL auf seine Stufe geschrieben wird, nicht 0.',
	notes_en:
		'Source: KBOB recommendation BACnet application 2021, table 10. For physical outputs (BO, MO, AO) with a safety function such as frost protection the Priority_Array is mandatory, and the priority of the safety function is passed on to all aggregates. For setpoints KBOB recommends no Priority_Array. A command is withdrawn by writing NULL to its level, not 0.',
	columns: [
		{ key: 'stufe', label: 'Stufe', label_en: 'Level', mono: true, highlight: true },
		{ key: 'norm', label: 'Norm (ISO 16484-5)', label_en: 'Standard (ISO 16484-5)' },
		{ key: 'kbob', label: 'KBOB-Belegung', label_en: 'KBOB Use' },
		{ key: 'beispiel', label: 'Beispiel / Hinweis', label_en: 'Example / Note' }
	],
	rows: [
		{
			stufe: '1',
			norm: 'Manual Life Safety',
			kbob: 'Manual Life Safety',
			beispiel: 'Schlüsselschalter der Feuerwehr',
			beispiel_en: 'Fire brigade key switch'
		},
		{
			stufe: '2',
			norm: 'Automatic Life Safety',
			kbob: 'Automatic Life Safety',
			beispiel: 'Brandfallsteuerung, Übersteuerung durch Brandnotsteuerung',
			beispiel_en: 'Fire control, override by emergency fire control'
		},
		{ stufe: '3', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{ stufe: '4', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{
			stufe: '5',
			norm: 'Critical Equipment Control',
			kbob: 'Critical Equipment Control',
			beispiel:
				'Lastabwurf. Nur wenn der verhinderte Gesamtschaden grösser ist als der mögliche Geräteschaden, weil minimale Ein-/Ausschaltzeiten übersteuert werden',
			beispiel_en:
				'Load shedding. Only if the damage avoided exceeds the possible equipment damage, because minimum on/off times are overridden'
		},
		{
			stufe: '6',
			norm: 'Minimum On/Off',
			kbob: 'Minimum On/Off, extern nicht beschreibbar',
			kbob_en: 'Minimum on/off, not writable externally',
			beispiel: 'Mindestlauf- und Mindeststillstandszeiten, z.B. Kältemaschine, Wärmepumpe',
			beispiel_en: 'Minimum run and off times, e.g. chiller, heat pump'
		},
		{
			stufe: '7',
			norm: 'Available',
			kbob: 'Manuell ab Anlage',
			kbob_en: 'Manual at plant',
			beispiel: 'Lokale Bedienung der Gesamtanlage, z.B. Anlageschalter am Schaltschrank',
			beispiel_en: 'Local operation of the whole plant, e.g. plant switch on the panel'
		},
		{
			stufe: '8',
			norm: 'Manual Operator',
			kbob: 'Manuell ab MBE',
			kbob_en: 'Manual from management station',
			beispiel: 'Handeingriff eines Benutzers am Leitsystem',
			beispiel_en: 'Manual override by a user at the management station'
		},
		{ stufe: '9', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{ stufe: '10', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{ stufe: '11', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{
			stufe: '12',
			norm: 'Available',
			kbob: 'Zentrale Funktionen',
			kbob_en: 'Central functions',
			beispiel: 'Putzbeleuchtung',
			beispiel_en: 'Cleaning lighting'
		},
		{ stufe: '13', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{
			stufe: '14',
			norm: 'Available',
			kbob: 'Zeitschaltungen, zentrale Ansteuerungen',
			kbob_en: 'Time schedules, central commands',
			beispiel: 'Schedule-Objekte, zentrale Zeitprogramme',
			beispiel_en: 'Schedule objects, central time programmes'
		},
		{ stufe: '15', norm: 'Available', kbob: 'frei', kbob_en: 'free', beispiel: '—' },
		{
			stufe: '16',
			norm: 'Available',
			kbob: 'Ansteuerung Automatikbetrieb',
			kbob_en: 'Automatic operation',
			beispiel: 'Regel- und Steuerprogramm der AS',
			beispiel_en: 'Control programme of the automation station'
		},
		{
			stufe: '—',
			norm: 'Relinquish_Default',
			kbob: 'Relinquish_Default',
			beispiel: 'Gilt, wenn alle Stufen NULL sind. Wird bei der Projektierung fest hinterlegt',
			beispiel_en: 'Applies when all levels are NULL. Fixed during engineering'
		}
	]
};
