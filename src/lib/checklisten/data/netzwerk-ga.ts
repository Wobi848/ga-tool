import type { ChecklistTemplate } from '../types';

export const netzwerkGA: ChecklistTemplate = {
	slug: 'netzwerk-ga',
	title: 'Netzwerk GA-System',
	title_en: 'BA Network System',
	subtitle: 'IP-Infrastruktur, VLANs, Firewall, IT/OT-Segmentierung',
	subtitle_en: 'IP infrastructure, VLANs, firewall, IT/OT segmentation',
	description: 'Checkliste für das Netzwerk einer GA-Anlage: IP-Schema, VLAN-Konzept, Firewall-Regeln, Remote-Zugriff und Cybersecurity. Vor Inbetriebnahme und als Basis für Abnahme.',
	description_en: 'Checklist for the network of a BA system: IP schema, VLAN concept, firewall rules, remote access, and cybersecurity. For use before commissioning and as a basis for acceptance.',
	category: 'Netzwerk',
	icon: 'network',
	color: '#7c3aed',
	areas: ['ga', 'it'],
	norm: ['IEC 62443', 'ISO 27001', 'VDI 3814-4'],
	updated: '2026-05-15',
	sections: [
		{
			title: 'IP-Schema & Adressierung',
			title_en: 'IP Schema & Addressing',
			items: [
				{ id: 'n-ip-schema', title: 'IP-Adressschema dokumentiert (Subnetz, Gateway, DNS)', title_en: 'IP address schema documented (subnet, gateway, DNS)', critical: true },
				{ id: 'n-ip-statisch', title: 'GA-Feldgeräte mit statischen IP-Adressen oder DHCP-Reservierungen versehen', title_en: 'BA field devices assigned static IP addresses or DHCP reservations', critical: true },
				{ id: 'n-ip-konflikte', title: 'IP-Konflikte geprüft (Ping aller Adressen vor Inbetriebnahme)', title_en: 'IP conflicts checked (ping all addresses before commissioning)' },
				{ id: 'n-ip-dns', title: 'DNS-Einträge für Server und wichtige Geräte gesetzt (falls interne DNS vorhanden)', title_en: 'DNS entries set for servers and key devices (if internal DNS present)' },
				{ id: 'n-ip-ntp', title: 'NTP-Zeitserver konfiguriert — alle Geräte synchronisiert', title_en: 'NTP time server configured — all devices synchronised', critical: true, hint: 'Falsche Uhrzeiten führen zu falschen Trends, Alarm-Zeitstempeln und Zertifikatsfehlern', hint_en: 'Wrong system time causes incorrect trends, alarm timestamps, and certificate errors' }
			]
		},
		{
			title: 'VLAN-Konzept & IT/OT-Segmentierung',
			title_en: 'VLAN Concept & IT/OT Segmentation',
			items: [
				{ id: 'n-vlan-konzept', title: 'VLAN-Konzept dokumentiert (OT-VLAN, Management-VLAN, User-VLAN)', title_en: 'VLAN concept documented (OT VLAN, management VLAN, user VLAN)', critical: true },
				{ id: 'n-vlan-ot', title: 'GA/OT-Geräte im eigenen VLAN — kein direkte Verbindung zum User-Netz', title_en: 'BA/OT devices in dedicated VLAN — no direct connection to user network', critical: true, hint: 'Schwachstelle: BACnet/IP Broadcast traversiert keine Router → VLAN OK', hint_en: 'Note: BACnet/IP broadcast does not cross routers → VLAN is fine' },
				{ id: 'n-vlan-switch', title: 'Managed Switches konfiguriert, VLAN-Tagging geprüft', title_en: 'Managed switches configured, VLAN tagging verified' },
				{ id: 'n-vlan-routing', title: 'Inter-VLAN-Routing nur über Firewall/Router mit definierten Regeln', title_en: 'Inter-VLAN routing only via firewall/router with defined rules' },
				{ id: 'n-vlan-bacnet', title: 'BACnet/IP: BBMD oder DHCP-Option 12 für Subnet-übergreifendes Who-Is konfiguriert (falls nötig)', title_en: 'BACnet/IP: BBMD or DHCP option 12 configured for cross-subnet Who-Is (if required)' }
			]
		},
		{
			title: 'Firewall & Zugriffssteuerung',
			title_en: 'Firewall & Access Control',
			items: [
				{ id: 'n-fw-regeln', title: 'Firewall-Regelwerk dokumentiert (Source, Destination, Port, Protokoll, Aktion)', title_en: 'Firewall ruleset documented (source, destination, port, protocol, action)', critical: true },
				{ id: 'n-fw-default-deny', title: 'Default-Deny-Policy aktiv — nur explizit erlaubte Verbindungen möglich', title_en: 'Default-deny policy active — only explicitly permitted connections allowed', critical: true },
				{ id: 'n-fw-ot-internet', title: 'GA/OT-VLAN hat keinen direkten Internet-Zugang', title_en: 'BA/OT VLAN has no direct internet access', critical: true },
				{ id: 'n-fw-management', title: 'Management-Zugang zu Switches, Routern nur aus Management-VLAN', title_en: 'Management access to switches and routers only from management VLAN' },
				{ id: 'n-fw-protokolle', title: 'Erlaubte Protokolle: BACnet/IP (Port 47808), Modbus TCP (502), HTTPS (443) — ungenutzte Ports gesperrt', title_en: 'Permitted protocols: BACnet/IP (port 47808), Modbus TCP (502), HTTPS (443) — unused ports blocked' }
			]
		},
		{
			title: 'Remote-Zugriff & VPN',
			title_en: 'Remote Access & VPN',
			items: [
				{ id: 'n-vpn-konzept', title: 'Remote-Zugriffs-Konzept dokumentiert (wer, womit, welche Systeme)', title_en: 'Remote access concept documented (who, with what, which systems)', critical: true },
				{ id: 'n-vpn-typ', title: 'VPN-Typ festgelegt: IPSec Site-to-Site oder Client-VPN (OpenVPN, WireGuard)', title_en: 'VPN type defined: IPSec site-to-site or client VPN (OpenVPN, WireGuard)', hint: 'Kein einfacher Port-Forward auf GA-Geräte ins Internet!', hint_en: 'No simple port forwarding of BA devices to the internet!' },
				{ id: 'n-vpn-auth', title: 'Starke Authentifizierung: MFA oder Zertifikate', title_en: 'Strong authentication: MFA or certificates', critical: true },
				{ id: 'n-vpn-protokoll', title: 'VPN-Verbindung getestet (Erreichbarkeit GA-Systeme via VPN bestätigt)', title_en: 'VPN connection tested (BA systems reachable via VPN confirmed)' },
				{ id: 'n-vpn-logging', title: 'VPN-Zugriffsprotokollierung aktiv', title_en: 'VPN access logging active' }
			]
		},
		{
			title: 'Geräte-Sicherheit',
			title_en: 'Device Security',
			items: [
				{ id: 'n-sek-standardpw', title: 'Alle Standard-Passwörter geändert (Switches, Router, GA-Controller, GLT)', title_en: 'All default passwords changed (switches, routers, BA controllers, BMS)', critical: true },
				{ id: 'n-sek-firmware', title: 'Aktuelle Firmware auf Switches und Routern eingespielt', title_en: 'Current firmware installed on switches and routers' },
				{ id: 'n-sek-dienste', title: 'Unnötige Dienste deaktiviert (Telnet, HTTP statt HTTPS, SNMP v1/v2)', title_en: 'Unnecessary services disabled (Telnet, HTTP instead of HTTPS, SNMP v1/v2)' },
				{ id: 'n-sek-ssh', title: 'SSH statt Telnet für Management-Zugriff', title_en: 'SSH instead of Telnet for management access' },
				{ id: 'n-sek-passwortliste', title: 'Passwörter sicher hinterlegt (Passwort-Manager, verschlüsselt)', title_en: 'Passwords stored securely (password manager, encrypted)', critical: true }
			]
		},
		{
			title: 'Dokumentation & Abnahme',
			title_en: 'Documentation & Acceptance',
			items: [
				{ id: 'n-dok-topologie', title: 'Netzwerk-Topologie-Plan aktuell und übergeben', title_en: 'Network topology plan current and handed over', critical: true },
				{ id: 'n-dok-ipplan', title: 'IP-Plan mit MAC-Adressen der GA-Geräte übergeben', title_en: 'IP plan with MAC addresses of BA devices handed over' },
				{ id: 'n-dok-firewall', title: 'Firewall-Regelwerk dokumentiert und übergeben', title_en: 'Firewall ruleset documented and handed over' },
				{ id: 'n-dok-vpn', title: 'VPN-Zugangsdaten sicher übergeben (nicht per Mail im Klartext)', title_en: 'VPN credentials handed over securely (not in plain-text email)', critical: true },
				{ id: 'n-dok-verantwortung', title: 'IT-Verantwortlicher im Betrieb benannt (GA-Netz)', title_en: 'IT responsible person named in the organisation (BA network)' }
			]
		}
	]
};
