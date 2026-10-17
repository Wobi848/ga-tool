import type { ChecklistTemplate } from '../types';

export const kbobIktSicherheit: ChecklistTemplate = {
	slug: 'kbob-ikt-sicherheit',
	title: 'IKT-Sicherheit GA (KBOB)',
	title_en: 'ICT Security BA (KBOB)',
	subtitle: 'OT-Sicherheit von Inventar bis Notfallplan prüfen',
	subtitle_en: 'Check OT security from inventory to emergency plan',
	description:
		'Nach KBOB-Empfehlung IKT-Sicherheit in der Gebäudeautomation, V1.0, Juli 2025: Prüfliste Tab. 4, Asset- und Lifecycle-Checkliste, Tab. 2 und Tab. 6, zusammengeführt. Für Audits beim Bauherrn, für die Abnahme und als Grundlage der bauherrenspezifischen Vorgaben.',
	description_en:
		'Based on KBOB recommendation ICT security in building automation, V1.0, July 2025: checklist table 4, asset and lifecycle checklist, tables 2 and 6, merged. For owner audits, for acceptance and as a basis for owner-specific requirements.',
	category: 'Netzwerk',
	icon: 'shield',
	color: '#7c3aed',
	areas: ['ga', 'it'],
	norm: ['KBOB IKT-Sicherheit 2025', 'ISA/IEC 62443', 'ISO 27001'],
	updated: '2026-10-17',
	sections: [
		{
			title: 'Inventar und Risiko',
			title_en: 'Inventory and Risk',
			items: [
				{
					id: 'ikt-inventar',
					title:
						'Alle OT-Assets inventarisiert: Steuerungen, Feldgeräte, Switches, Router, Firewalls, VPN-Zugänge, IoT',
					title_en:
						'All OT assets inventoried: controllers, field devices, switches, routers, firewalls, VPN access, IoT',
					hint: 'Je Gerät: Typ, Zweck, Verbindungsart, IP, MAC, Ports, VLAN, Standort, Firmware, Zertifikate.',
					hint_en:
						'Per device: type, purpose, connection type, IP, MAC, ports, VLAN, location, firmware, certificates.',
					norm: 'KBOB IKT Kap. 3.1.1',
					critical: true
				},
				{
					id: 'ikt-inventar-aktuell',
					title: 'Inventar wird regelmässig nachgeführt',
					title_en: 'Inventory is updated regularly',
					norm: 'KBOB IKT Tab. 4'
				},
				{
					id: 'ikt-schutzbedarf',
					title: 'Kritikalität bewertet, Zonen mit Schutzbedarf normal oder erhöht festgelegt',
					title_en: 'Criticality assessed, zones with normal or elevated protection level defined',
					hint: 'Erhöht, sobald eine der sieben Anforderungen nach IEC 62443-3-3 mehr verlangt, z.B. RWA, Kälte Rechenzentrum, Notbeleuchtung.',
					hint_en:
						'Elevated as soon as one of the seven requirements per IEC 62443-3-3 demands more, e.g. smoke extraction, data centre cooling, emergency lighting.',
					norm: 'KBOB IKT Kap. 5.1',
					critical: true
				},
				{
					id: 'ikt-risiko-review',
					title:
						'Risikobewertung wird bei Änderungen, neuen Bedrohungen und nach Vorfällen überarbeitet',
					title_en: 'Risk assessment is revised after changes, new threats and incidents',
					norm: 'KBOB IKT Kap. 3.1.2'
				}
			]
		},
		{
			title: 'Organisation',
			title_en: 'Organisation',
			items: [
				{
					id: 'ikt-rollen',
					title:
						'Rollen und Verantwortungen schriftlich festgelegt (GA-Administrator, Betrieb, Führung, Lieferant, Sicherheitsbeauftragte)',
					title_en:
						'Roles and responsibilities defined in writing (BA administrator, operations, management, vendor, security officer)',
					norm: 'KBOB IKT Kap. 4.5',
					critical: true
				},
				{
					id: 'ikt-richtlinien',
					title:
						'Sicherheitsrichtlinien und Verfahren für die GA vorhanden, verantwortliche Person benannt',
					title_en: 'Security policies and procedures for BA in place, responsible person named',
					norm: 'KBOB IKT Kap. 4.4'
				},
				{
					id: 'ikt-reifegrad',
					title: 'Ziel-Reifegrad festgelegt (meist CMMI-Stufe 3) und Ist-Zustand bekannt',
					title_en: 'Target maturity defined (usually CMMI level 3) and current state known',
					norm: 'KBOB IKT Kap. 4.3'
				},
				{
					id: 'ikt-schulung',
					title:
						'Regelmässige Schulung aller, die mit OT-Systemen arbeiten; Awareness zu neuen Bedrohungen',
					title_en:
						'Regular training for everyone working with OT systems; awareness of new threats',
					norm: 'KBOB IKT Kap. 4.6'
				},
				{
					id: 'ikt-uebergabe',
					title:
						'Formelle Übergabe vom Lieferanten an den Betrieb mit Protokoll, danach Schulung und Sicherheitsaudit',
					title_en:
						'Formal handover from vendor to operations with report, followed by training and security audit',
					norm: 'KBOB IKT Kap. 4.5.3'
				}
			]
		},
		{
			title: 'Netz und Zugriff',
			title_en: 'Network and Access',
			items: [
				{
					id: 'ikt-zonen',
					title:
						'Zonen getrennt: Unternehmens-IT, DMZ, GA-Zone, sicherheitskritische Zone; Firewalls dazwischen',
					title_en:
						'Zones separated: enterprise IT, DMZ, BA zone, safety-critical zone; firewalls in between',
					norm: 'KBOB IKT Kap. 5.5',
					critical: true
				},
				{
					id: 'ikt-vlan',
					title: 'In der GA-Zone eigene VLANs und Subnetze für HLK, Zutritt und Video',
					title_en: 'Separate VLANs and subnets for HVAC, access control and video in the BA zone',
					norm: 'KBOB IKT Kap. 5.5.1.3'
				},
				{
					id: 'ikt-fernzugriff',
					title: 'Fernzugriff nur über VPN in die DMZ, mit Mehrfaktor-Authentifizierung',
					title_en: 'Remote access only via VPN into the DMZ, with multi-factor authentication',
					norm: 'KBOB IKT Kap. 5.5, 5.3.3',
					critical: true
				},
				{
					id: 'ikt-least-privilege',
					title:
						'Rollenbasierte Zugriffe nach Least Privilege, regelmässig und bei Personalwechsel überprüft',
					title_en:
						'Role-based access per least privilege, reviewed regularly and when staff changes',
					norm: 'KBOB IKT Kap. 4.4.3'
				},
				{
					id: 'ikt-iam-leitebene',
					title:
						'Benutzerverwaltung auf der Leitebene, weil BACnet/IP keine Benutzer kennt; Zugang zum GA-Netz über NAC oder VPN kontrolliert',
					title_en:
						'User management at management level, because BACnet/IP has no users; access to the BA network controlled via NAC or VPN',
					norm: 'KBOB IKT Kap. 5.2'
				},
				{
					id: 'ikt-ports',
					title:
						'Unbenutzte Netz-, Serien- und USB-Ports deaktiviert oder blockiert; Schaltschränke und Netzknoten physisch geschützt',
					title_en:
						'Unused network, serial and USB ports disabled or blocked; panels and network nodes physically protected',
					norm: 'KBOB IKT Tab. 6'
				}
			]
		},
		{
			title: 'Änderungen und Patches',
			title_en: 'Changes and Patches',
			items: [
				{
					id: 'ikt-change',
					title:
						'Change Management: Änderungen geprüft, genehmigt, dokumentiert, mit Risikobewertung und Rollback-Plan',
					title_en:
						'Change management: changes reviewed, approved, documented, with risk assessment and rollback plan',
					norm: 'KBOB IKT Tab. 4',
					critical: true
				},
				{
					id: 'ikt-auditlog',
					title:
						'Änderungen an Konfigurationen werden protokolliert, Log auf unveränderlichem Speicher',
					title_en: 'Configuration changes are logged, log on immutable storage',
					norm: 'KBOB IKT Kap. 5.2'
				},
				{
					id: 'ikt-patch-vertrag',
					title:
						'Sicherheitsupdates im Wartungsvertrag; Lieferant meldet Major-Patches mindestens zweimal jährlich',
					title_en:
						'Security updates in the maintenance contract; vendor reports major patches at least twice a year',
					norm: 'KBOB IKT Kap. 4.10.1',
					critical: true
				},
				{
					id: 'ikt-patch-test',
					title:
						'Patches zuerst in Testumgebung, mit Einverständnis des Herstellers, danach Funktionstest und Protokoll',
					title_en:
						"Patches first in a test environment, with the vendor's consent, followed by functional test and report",
					norm: 'KBOB IKT Kap. 4.10.2'
				},
				{
					id: 'ikt-eol',
					title:
						'End-of-Life überwacht, Ersatz geplant; Altgeräte gehärtet (Allowlisting, strengere Firewall)',
					title_en:
						'End of life monitored, replacement planned; legacy devices hardened (allowlisting, stricter firewall)',
					norm: 'KBOB IKT Kap. 4.8, 4.10.1'
				},
				{
					id: 'ikt-entsorgung',
					title: 'Daten bei Ausserbetriebnahme sicher gelöscht (z.B. NIST 800-88)',
					title_en: 'Data securely erased at decommissioning (e.g. NIST 800-88)',
					norm: 'KBOB IKT Kap. 5.4'
				}
			]
		},
		{
			title: 'Überwachung und Vorfälle',
			title_en: 'Monitoring and Incidents',
			items: [
				{
					id: 'ikt-monitoring',
					title:
						'Verkehr an den Übergängen nach aussen und Änderungen an kritischen Konfigurationen werden überwacht',
					title_en:
						'Traffic at external boundaries and changes to critical configurations are monitored',
					hint: 'Die beiden wirksamsten Punkte nach KBOB Tab. 8. In der GA passives IDS statt IPS, damit keine Anlage automatisch abgeschaltet wird.',
					hint_en:
						'The two most effective points per KBOB table 8. In BA use passive IDS instead of IPS, so that no plant is switched off automatically.',
					norm: 'KBOB IKT Kap. 5.6',
					critical: true
				},
				{
					id: 'ikt-irp',
					title:
						'Incident-Response-Plan: erkennen, reagieren, eindämmen, berichten, wiederherstellen, beheben, lernen',
					title_en:
						'Incident response plan: detect, respond, contain, report, recover, remediate, learn',
					norm: 'KBOB IKT Tab. 3',
					critical: true
				},
				{
					id: 'ikt-notfallplaene',
					title:
						'Disaster-Recovery- und Business-Continuity-Plan vorhanden, mit Dienstleistern abgestimmt und geübt',
					title_en:
						'Disaster recovery and business continuity plan in place, coordinated with service providers and exercised',
					norm: 'KBOB IKT Tab. 2'
				},
				{
					id: 'ikt-hand',
					title: 'Kritische Anlagen lassen sich im Notfall von Hand betreiben',
					title_en: 'Critical plants can be operated manually in an emergency',
					norm: 'KBOB IKT Tab. 2'
				},
				{
					id: 'ikt-backup',
					title: 'Konfigurations-Backups, mindestens eines offline; Wiederherstellung getestet',
					title_en: 'Configuration backups, at least one offline; restore tested',
					norm: 'KBOB IKT Kap. 5.7',
					critical: true
				},
				{
					id: 'ikt-ausgaenge',
					title: 'Vorbestimmte sichere Zustände der Ausgänge bei Störung oder Angriff festgelegt',
					title_en: 'Predefined safe output states on fault or attack defined',
					norm: 'KBOB IKT Tab. 6'
				},
				{
					id: 'ikt-meldepflicht',
					title:
						'Meldepflicht nach Informationssicherheitsgesetz (ISG) geklärt, Meldeweg festgelegt',
					title_en:
						'Reporting duty under the Information Security Act (ISG) clarified, reporting channel defined',
					norm: 'KBOB IKT Kap. 4.9.1'
				},
				{
					id: 'ikt-audit',
					title: 'Regelmässige Audits durch eine von den Administratoren unabhängige Stelle',
					title_en: 'Regular audits by a unit independent of the administrators',
					norm: 'KBOB IKT Kap. 4.5.2, 4.11'
				}
			]
		}
	]
};
