import type { ChecklistTemplate } from '../types';

export const gltUebergabe: ChecklistTemplate = {
	slug: 'glt-uebergabe',
	title: 'GLT-Übergabe an Betreiber',
	subtitle: 'Datenpunkte, Visualisierung, Alarme, Dokumentation',
	description: 'Strukturierte Übergabe einer Gebäudeleittechnik. Reihenfolge: Funktion → Bedienung → Doku → Schulung.',
	category: 'Übergabe',
	icon: 'monitor',
	color: '#2563eb',
	areas: ['ga'],
	norm: ['VDI 3814', 'EN ISO 16484'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Datenpunkte & Funktion',
			items: [
				{ id: 'dp-liste', title: 'Datenpunktliste vollständig und korrekt', critical: true, hint: 'IST vs. Plan abgleichen' },
				{ id: 'dp-naming', title: 'Bezeichnungen entsprechen Hersteller-/Kundenkonvention', norm: 'VDI 3814' },
				{ id: 'dp-test', title: 'Stichprobenartig: Hand- und Auto-Befehle wirken auf Anlage' },
				{ id: 'dp-feedback', title: 'Rückmeldungen aller Aktoren funktionieren (Plausibilität)' },
				{ id: 'dp-grenzwerte', title: 'Sensor-Grenzwerte konfiguriert (Min/Max, Drahtbruch)' }
			]
		},
		{
			title: 'Visualisierung',
			items: [
				{ id: 'vis-bilder', title: 'Anlagenbilder vollständig (Schemata, Geräte, Räume)', critical: true },
				{ id: 'vis-zugriff', title: 'Benutzerrollen + Passwörter dokumentiert' },
				{ id: 'vis-darstellung', title: 'Werte mit korrekter Einheit und Skalierung dargestellt' },
				{ id: 'vis-trend', title: 'Trends für relevante Datenpunkte konfiguriert (mind. 1 Jahr)' },
				{ id: 'vis-export', title: 'Export-Funktion (CSV, PDF) getestet' }
			]
		},
		{
			title: 'Alarmmanagement',
			items: [
				{ id: 'al-kategorien', title: 'Alarme nach Kategorie (kritisch / Wartung / Info) priorisiert', critical: true },
				{ id: 'al-quittierung', title: 'Quittierungslogik geklärt (Einzeln, Gruppen)' },
				{ id: 'al-weiterleitung', title: 'Eskalationsstufen + Weiterleitung (E-Mail, SMS, Pikett)' },
				{ id: 'al-historie', title: 'Alarmhistorie wird gespeichert (mind. 1 Jahr)' },
				{ id: 'al-flood', title: 'Anti-Alarm-Flood: Verzögerungen, Entprellungen gesetzt' }
			]
		},
		{
			title: 'IT / Security',
			items: [
				{ id: 'it-netz', title: 'GA-Netz in eigenem VLAN, Firewall-Regeln dokumentiert', critical: true },
				{ id: 'it-passwort', title: 'Default-Passwörter geändert', critical: true },
				{ id: 'it-backup', title: 'Backup-Konzept eingerichtet und getestet' },
				{ id: 'it-update', title: 'Update-Prozess geklärt (wer, wann, wie)' },
				{ id: 'it-fernwartung', title: 'Fernwartungs-Zugang mit VPN gesichert' }
			]
		},
		{
			title: 'Schulung & Dokumentation',
			items: [
				{ id: 'do-handbuch', title: 'Betreiber-Handbuch übergeben', critical: true },
				{ id: 'do-revisionsplan', title: 'Revisionspläne aktualisiert (Schemata, Verteiler, Verlegepläne)' },
				{ id: 'do-stammdaten', title: 'Stammdaten + Inventar exportiert' },
				{ id: 'sch-bedienung', title: 'Bedienung mit Betreiber durchgegangen' },
				{ id: 'sch-stoerung', title: 'Störungsbearbeitung anhand Beispiel demonstriert' },
				{ id: 'sch-protokoll', title: 'Schulungsprotokoll unterschrieben' }
			]
		}
	]
};
