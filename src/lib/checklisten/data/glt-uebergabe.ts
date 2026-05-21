import type { ChecklistTemplate } from '../types';

export const gltUebergabe: ChecklistTemplate = {
	slug: 'glt-uebergabe',
	title: 'GLT-Übergabe an Betreiber',
	title_en: 'BMS Handover to Operator',
	subtitle: 'Datenpunkte, Visualisierung, Alarme, Dokumentation',
	subtitle_en: 'Data points, visualisation, alarms, documentation',
	description:
		'Strukturierte Übergabe einer Gebäudeleittechnik. Reihenfolge: Funktion → Bedienung → Doku → Schulung.',
	description_en:
		'Structured handover of a building management system. Order: function → operation → documentation → training.',
	category: 'Übergabe',
	icon: 'monitor',
	color: '#2563eb',
	areas: ['ga'],
	norm: ['VDI 3814', 'EN ISO 16484'],
	updated: '2026-05-14',
	sections: [
		{
			title: 'Datenpunkte & Funktion',
			title_en: 'Data Points & Function',
			items: [
				{
					id: 'dp-liste',
					title: 'Datenpunktliste vollständig und korrekt',
					title_en: 'Data point list complete and correct',
					critical: true,
					hint: 'IST vs. Plan abgleichen',
					hint_en: 'Compare actual vs. plan'
				},
				{
					id: 'dp-naming',
					title: 'Bezeichnungen entsprechen Hersteller-/Kundenkonvention',
					title_en: 'Names comply with manufacturer / client convention',
					norm: 'VDI 3814'
				},
				{
					id: 'dp-test',
					title: 'Stichprobenartig: Hand- und Auto-Befehle wirken auf Anlage',
					title_en: 'Spot check: manual and automatic commands act on the plant'
				},
				{
					id: 'dp-feedback',
					title: 'Rückmeldungen aller Aktoren funktionieren (Plausibilität)',
					title_en: 'Feedback from all actuators functional (plausibility check)'
				},
				{
					id: 'dp-grenzwerte',
					title: 'Sensor-Grenzwerte konfiguriert (Min/Max, Drahtbruch)',
					title_en: 'Sensor limits configured (min/max, wire break)'
				}
			]
		},
		{
			title: 'Visualisierung',
			title_en: 'Visualisation',
			items: [
				{
					id: 'vis-bilder',
					title: 'Anlagenbilder vollständig (Schemata, Geräte, Räume)',
					title_en: 'System graphics complete (diagrams, equipment, rooms)',
					critical: true
				},
				{
					id: 'vis-zugriff',
					title: 'Benutzerrollen + Passwörter dokumentiert',
					title_en: 'User roles and passwords documented'
				},
				{
					id: 'vis-darstellung',
					title: 'Werte mit korrekter Einheit und Skalierung dargestellt',
					title_en: 'Values displayed with correct unit and scaling'
				},
				{
					id: 'vis-trend',
					title: 'Trends für relevante Datenpunkte konfiguriert (mind. 1 Jahr)',
					title_en: 'Trends configured for relevant data points (min. 1 year)'
				},
				{
					id: 'vis-export',
					title: 'Export-Funktion (CSV, PDF) getestet',
					title_en: 'Export function (CSV, PDF) tested'
				}
			]
		},
		{
			title: 'Alarmmanagement',
			title_en: 'Alarm Management',
			items: [
				{
					id: 'al-kategorien',
					title: 'Alarme nach Kategorie (kritisch / Wartung / Info) priorisiert',
					title_en: 'Alarms prioritised by category (critical / maintenance / info)',
					critical: true
				},
				{
					id: 'al-quittierung',
					title: 'Quittierungslogik geklärt (Einzeln, Gruppen)',
					title_en: 'Acknowledgement logic clarified (individual, groups)'
				},
				{
					id: 'al-weiterleitung',
					title: 'Eskalationsstufen + Weiterleitung (E-Mail, SMS, Pikett)',
					title_en: 'Escalation levels and forwarding (email, SMS, on-call)'
				},
				{
					id: 'al-historie',
					title: 'Alarmhistorie wird gespeichert (mind. 1 Jahr)',
					title_en: 'Alarm history stored (min. 1 year)'
				},
				{
					id: 'al-flood',
					title: 'Anti-Alarm-Flood: Verzögerungen, Entprellungen gesetzt',
					title_en: 'Anti-alarm-flood: delays and debouncing configured'
				}
			]
		},
		{
			title: 'IT / Security',
			title_en: 'IT / Security',
			items: [
				{
					id: 'it-netz',
					title: 'GA-Netz in eigenem VLAN, Firewall-Regeln dokumentiert',
					title_en: 'BA network in dedicated VLAN, firewall rules documented',
					critical: true
				},
				{
					id: 'it-passwort',
					title: 'Default-Passwörter geändert',
					title_en: 'Default passwords changed',
					critical: true
				},
				{
					id: 'it-backup',
					title: 'Backup-Konzept eingerichtet und getestet',
					title_en: 'Backup concept set up and tested'
				},
				{
					id: 'it-update',
					title: 'Update-Prozess geklärt (wer, wann, wie)',
					title_en: 'Update process clarified (who, when, how)'
				},
				{
					id: 'it-fernwartung',
					title: 'Fernwartungs-Zugang mit VPN gesichert',
					title_en: 'Remote maintenance access secured with VPN'
				}
			]
		},
		{
			title: 'Schulung & Dokumentation',
			title_en: 'Training & Documentation',
			items: [
				{
					id: 'do-handbuch',
					title: 'Betreiber-Handbuch übergeben',
					title_en: 'Operator manual handed over',
					critical: true
				},
				{
					id: 'do-revisionsplan',
					title: 'Revisionspläne aktualisiert (Schemata, Verteiler, Verlegepläne)',
					title_en: 'As-built drawings updated (diagrams, distribution boards, routing plans)'
				},
				{
					id: 'do-stammdaten',
					title: 'Stammdaten + Inventar exportiert',
					title_en: 'Master data and inventory exported'
				},
				{
					id: 'sch-bedienung',
					title: 'Bedienung mit Betreiber durchgegangen',
					title_en: 'Operation reviewed with operator'
				},
				{
					id: 'sch-stoerung',
					title: 'Störungsbearbeitung anhand Beispiel demonstriert',
					title_en: 'Fault handling demonstrated using an example'
				},
				{
					id: 'sch-protokoll',
					title: 'Schulungsprotokoll unterschrieben',
					title_en: 'Training record signed'
				}
			]
		}
	]
};
