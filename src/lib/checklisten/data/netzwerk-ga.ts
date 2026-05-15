import type { ChecklistTemplate } from '../types';

export const netzwerkGA: ChecklistTemplate = {
	slug: 'netzwerk-ga',
	title: 'Netzwerk GA-System',
	subtitle: 'IP-Infrastruktur, VLANs, Firewall, IT/OT-Segmentierung',
	description: 'Checkliste für das Netzwerk einer GA-Anlage: IP-Schema, VLAN-Konzept, Firewall-Regeln, Remote-Zugriff und Cybersecurity. Vor Inbetriebnahme und als Basis für Abnahme.',
	category: 'Netzwerk',
	icon: 'network',
	color: '#7c3aed',
	areas: ['ga', 'it'],
	norm: ['IEC 62443', 'ISO 27001', 'VDI 3814-4'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'IP-Schema & Adressierung',
			items: [
				{ id: 'n-ip-schema', title: 'IP-Adressschema dokumentiert (Subnetz, Gateway, DNS)', critical: true },
				{ id: 'n-ip-statisch', title: 'GA-Feldgeräte mit statischen IP-Adressen oder DHCP-Reservierungen versehen', critical: true },
				{ id: 'n-ip-konflikte', title: 'IP-Konflikte geprüft (Ping aller Adressen vor Inbetriebnahme)' },
				{ id: 'n-ip-dns', title: 'DNS-Einträge für Server und wichtige Geräte gesetzt (falls interne DNS vorhanden)' },
				{ id: 'n-ip-ntp', title: 'NTP-Zeitserver konfiguriert — alle Geräte synchronisiert', critical: true, hint: 'Falsche Uhrzeiten führen zu falschen Trends, Alarm-Zeitstempeln und Zertifikatsfehlern' }
			]
		},
		{
			title: 'VLAN-Konzept & IT/OT-Segmentierung',
			items: [
				{ id: 'n-vlan-konzept', title: 'VLAN-Konzept dokumentiert (OT-VLAN, Management-VLAN, User-VLAN)', critical: true },
				{ id: 'n-vlan-ot', title: 'GA/OT-Geräte im eigenen VLAN — kein direkte Verbindung zum User-Netz', critical: true, hint: 'Schwachstelle: BACnet/IP Broadcast traversiert keine Router → VLAN OK' },
				{ id: 'n-vlan-switch', title: 'Managed Switches konfiguriert, VLAN-Tagging geprüft' },
				{ id: 'n-vlan-routing', title: 'Inter-VLAN-Routing nur über Firewall/Router mit definierten Regeln' },
				{ id: 'n-vlan-bacnet', title: 'BACnet/IP: BBMD oder DHCP-Option 12 für Subnet-übergreifendes Who-Is konfiguriert (falls nötig)' }
			]
		},
		{
			title: 'Firewall & Zugriffssteuerung',
			items: [
				{ id: 'n-fw-regeln', title: 'Firewall-Regelwerk dokumentiert (Source, Destination, Port, Protokoll, Aktion)', critical: true },
				{ id: 'n-fw-default-deny', title: 'Default-Deny-Policy aktiv — nur explizit erlaubte Verbindungen möglich', critical: true },
				{ id: 'n-fw-ot-internet', title: 'GA/OT-VLAN hat keinen direkten Internet-Zugang', critical: true },
				{ id: 'n-fw-management', title: 'Management-Zugang zu Switches, Routern nur aus Management-VLAN' },
				{ id: 'n-fw-protokolle', title: 'Erlaubte Protokolle: BACnet/IP (Port 47808), Modbus TCP (502), HTTPS (443) — ungenutzte Ports gesperrt' }
			]
		},
		{
			title: 'Remote-Zugriff & VPN',
			items: [
				{ id: 'n-vpn-konzept', title: 'Remote-Zugriffs-Konzept dokumentiert (wer, womit, welche Systeme)', critical: true },
				{ id: 'n-vpn-typ', title: 'VPN-Typ festgelegt: IPSec Site-to-Site oder Client-VPN (OpenVPN, WireGuard)', hint: 'Kein einfacher Port-Forward auf GA-Geräte ins Internet!' },
				{ id: 'n-vpn-auth', title: 'Starke Authentifizierung: MFA oder Zertifikate', critical: true },
				{ id: 'n-vpn-protokoll', title: 'VPN-Verbindung getestet (Erreichbarkeit GA-Systeme via VPN bestätigt)' },
				{ id: 'n-vpn-logging', title: 'VPN-Zugriffsprotokollierung aktiv' }
			]
		},
		{
			title: 'Geräte-Sicherheit',
			items: [
				{ id: 'n-sek-standardpw', title: 'Alle Standard-Passwörter geändert (Switches, Router, GA-Controller, GLT)', critical: true },
				{ id: 'n-sek-firmware', title: 'Aktuelle Firmware auf Switches und Routern eingespielt' },
				{ id: 'n-sek-dienste', title: 'Unnötige Dienste deaktiviert (Telnet, HTTP statt HTTPS, SNMP v1/v2)' },
				{ id: 'n-sek-ssh', title: 'SSH statt Telnet für Management-Zugriff' },
				{ id: 'n-sek-passwortliste', title: 'Passwörter sicher hinterlegt (Passwort-Manager, verschlüsselt)', critical: true }
			]
		},
		{
			title: 'Dokumentation & Abnahme',
			items: [
				{ id: 'n-dok-topologie', title: 'Netzwerk-Topologie-Plan aktuell und übergeben', critical: true },
				{ id: 'n-dok-ipplan', title: 'IP-Plan mit MAC-Adressen der GA-Geräte übergeben' },
				{ id: 'n-dok-firewall', title: 'Firewall-Regelwerk dokumentiert und übergeben' },
				{ id: 'n-dok-vpn', title: 'VPN-Zugangsdaten sicher übergeben (nicht per Mail im Klartext)', critical: true },
				{ id: 'n-dok-verantwortung', title: 'IT-Verantwortlicher im Betrieb benannt (GA-Netz)' }
			]
		}
	]
};
