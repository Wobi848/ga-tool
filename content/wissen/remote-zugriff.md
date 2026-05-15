---
title: Remote-Zugriff — VPN und sichere Fernwartung in der GA
slug: remote-zugriff
category: it
subcategory: fernwartung
tags: [remote-zugriff, vpn, fernwartung, wireguard, openvpn, ipsec, teamviewer, anydesk, rdp, mfa, sicherheit, ga, ot, glt, ddc, jump-server]
difficulty: fortgeschritten
area: [ga, it]
related: [cybersecurity-ot, netzwerk-ga, glt-grundlagen]
norm: [IEC 62443, NIST SP 800-82]
updated: 2026-05-14
lang: de
---

# Remote-Zugriff — VPN und sichere Fernwartung in der GA

Fernzugriff auf GA-Systeme ist heute Standard — Störungsbehebung von unterwegs, Parametrierung ohne Anfahrt, Monitoring aus dem Homeoffice. Gleichzeitig ist unsicherer Fernzugriff das häufigste Einfallstor für Angreifer.

## Risiken des Fernzugriffs

| Risiko                        | Häufigkeit | Schaden                        |
|-------------------------------|------------|--------------------------------|
| Schwaches/Default-Passwort    | Sehr hoch  | Vollzugriff auf Anlage         |
| Direkt erreichbare Ports (RDP, BACnet) | Hoch | Scan → Exploit            |
| Kein MFA                      | Sehr hoch  | Brute-Force-Angriff möglich    |
| Unverschlüsselte Verbindung   | Mittel     | Man-in-the-Middle              |
| Shared Credentials            | Hoch       | Nicht nachvollziehbar wer eingeloggt |

**Realität:** Viele GA-Systeme haben Teamviewer oder RDP direkt ans Internet — mit dem Werk-Passwort. Diese werden regelmässig missbraucht.

---

## Grundprinzip sichere Fernwartung

```
Techniker (Home/Büro)
    ↓ VPN-Client
Internet
    ↓ VPN-Tunnel (verschlüsselt, authentifiziert)
Firewall / VPN-Gateway am Standort
    ↓ Freigabe auf definierte IP/Ports
Jump-Server (optional)
    ↓ RDP / SSH
GLT-Server / DDC
```

**Keine direkte Verbindung vom Internet auf OT-Geräte!** Immer über VPN + Jump-Server.

---

## VPN-Protokolle im Vergleich

### WireGuard (empfohlen für neue Projekte)

- Modern, sehr performant, einfache Konfiguration
- Kleiner Code-Base (4000 Zeilen) → weniger Angriffsfläche
- Kernel-Integration in Linux (seit 5.6)
- **Keine dynamischen IPs für Clients** — jeder Peer hat festen Public Key + IP

```
Server (Standort):
  [Interface]
  Address = 10.100.0.1/24
  PrivateKey = <server-key>
  
  [Peer] # Techniker 1
  PublicKey = <tech1-pubkey>
  AllowedIPs = 10.100.0.2/32

Client (Techniker):
  [Interface]
  Address = 10.100.0.2/24
  PrivateKey = <tech1-privkey>
  
  [Peer] # Server
  PublicKey = <server-pubkey>
  Endpoint = meinstandort.dyndns.org:51820
  AllowedIPs = 10.10.0.0/24 (OT-Netz)
```

### OpenVPN

- Sehr verbreitet, grosse Community
- Basiert auf TLS/SSL (gut verstanden, gut getestet)
- Langsamer als WireGuard, komplexer zu konfigurieren
- PKI-Infrastruktur nötig (Zertifikate)

### IPsec / IKEv2

- Standard in Unternehmensumgebungen
- Hardware-VPN-Geräte (Cisco, Fortinet, Palo Alto) nutzen IPsec
- Komplexer, aber sehr robust

---

## Multi-Faktor-Authentifizierung (MFA)

**MFA ist Pflicht für jeden Fernzugriff!** Passwort allein ist nicht ausreichend.

### TOTP (Time-based One-Time Password)

- Authenticator App (Google Authenticator, Authy, etc.)
- Generiert alle 30 Sekunden neuen 6-stelligen Code
- Einfach zu implementieren, kein Hardware-Token nötig

### Implementierung in WireGuard

WireGuard hat kein eingebautes MFA — Umweg:

```
Option 1: VPN-Portal davor (z.B. Pritunl, Netbird) mit MFA-Unterstützung
Option 2: MFA beim Jump-Server (SSH + MFA, Remote Desktop + MFA)
Option 3: Client-Zertifikate als zweiter Faktor
```

---

## Jump-Server (Bastion Host)

Ein **Jump-Server** ist ein dedizierter Server der als einziger Zugangspunkt ins OT-Netz dient:

```
VPN → Jump-Server → OT-Geräte (nur von Jump-Server erreichbar)
```

**Vorteile:**
- Alles läuft durch einen Punkt → vollständiges Logging
- OT-Geräte haben keinen Internetzugang
- Kompromittierter Techniker-Laptop = noch kein direkter OT-Zugriff

**Variante mit RDP-Gateway** (Windows Server):
- Techniker verbindet RDP auf Gateway
- Gateway erlaubt nur definierte Weiterverbindungen
- Alle Sessions protokolliert

---

## Fernwartungs-Tools — Risikobewertung

| Tool             | Sicherheit      | Empfehlung                        |
|------------------|-----------------|-----------------------------------|
| **WireGuard VPN**| Sehr hoch       | ✅ Empfohlen                       |
| **OpenVPN**      | Hoch            | ✅ Gut                             |
| **Cisco AnyConnect** | Hoch        | ✅ Für Enterprise                  |
| **Teamviewer**   | Mittel          | ⚠️ Nur mit MFA, eigene Passwörter  |
| **AnyDesk**      | Mittel          | ⚠️ Wie Teamviewer                  |
| **RDP direkt**   | Niedrig         | ❌ Niemals direkt ans Internet      |
| **VNC direkt**   | Sehr niedrig    | ❌ Niemals ohne VPN                 |
| **Telnet / HTTP** | Keine          | ❌ Absolutes Nein                  |

---

## Protokollierung und Nachvollziehbarkeit

**Jeder Fernzugriff muss protokolliert werden:**

```
Log-Eintrag:
  Datum/Zeit: 2026-05-14 14:32
  Benutzer: max.meier@firma.ch
  Von IP: 85.12.x.x (anonymisiert im Log)
  Verbunden zu: GLT-Server 10.10.1.50
  Sitzungsdauer: 45 min
  Aktivitäten: Parametrierung Heizkreis 3, Alarm bestätigt
  Abmeldung: 15:17
```

**Aufbewahrung:** Min. 3 Monate, empfohlen 1 Jahr (für Incident Response).

---

## Checkliste sichere Fernwartung

- [ ] VPN mit MFA als einziger Zugangsweg
- [ ] Keine direkt am Internet erreichbaren GA-Ports
- [ ] Individuelle Zugangsdaten pro Person (keine geteilten Passwörter)
- [ ] Zugriffsrechte minimal (nur was nötig)
- [ ] Sitzungen zeitlich begrenzt (automatischer Logout)
- [ ] Vollständige Protokollierung aller Sitzungen
- [ ] Regelmässige Überprüfung aktiver Zugänge (Personen die ausgeschieden sind!)
- [ ] Notfall-Abschaltprozedur (wenn Fernzugang kompromittiert)

## Normen

- **IEC 62443-2-4** — Sicherheitsanforderungen für IACS-Dienstleister
- **NIST SP 800-46** — Guide to Enterprise Telework, Remote Access and BYOD
- **BSI TR-02102** — Cryptographic Mechanisms (VPN-Algorithmen)
