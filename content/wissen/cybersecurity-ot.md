---
title: Cybersecurity OT — Sicherheit in der Gebäudeautomation
slug: cybersecurity-ot
category: it
subcategory: sicherheit
tags: [cybersecurity, ot-security, ics, iec62443, angriffsvektoren, schutzkonzept, patch, vlan, vpn, firewall, authentifizierung, schwachstelle, bacnet, modbus, remote-access, incident-response]
difficulty: fortgeschritten
area: [ga, it]
related: [netzwerk-ga, remote-zugriff, bacnet, opc-ua, glt-grundlagen]
norm: [IEC 62443, NIST SP 800-82, BSI IT-Grundschutz]
updated: 2026-05-14
lang: de
---

# Cybersecurity OT — Sicherheit in der Gebäudeautomation

OT-Sicherheit (Operational Technology) ist kein Luxus mehr — GA-Systeme sind reale Angriffsziele. Kompromittierte Heizungen, Lüftungen oder Zutrittssysteme verursachen Betriebsunterbrechungen, Personenschäden und enorme Kosten.

## Bedrohungslandschaft

### Warum GA-Systeme angegriffen werden

- **Ransomware:** Gebäude-Betrieb lahmlegen → Lösegeld erpressen (Hotels, Krankenhäuser)
- **Sabotage:** Heizung im Winter abschalten, Zugangskontrolle sperren
- **Spionage:** Belegungsdaten, Personenströme
- **Pivot-Angriff:** OT als Sprungbrett ins IT-Netz (umgekehrt: IT ins OT)
- **Physischer Schaden:** Überhitzung von Geräten, Frostschäden

### Reale Vorfälle (anonymisiert)

- Krankenhaus: GLT kompromittiert → Heizung ausgefallen → Notaufnahme musste verlegt werden
- Hotel: Zutrittssystem gehackt → alle Zimmerkarten ungültig
- Rechenzentrum: Klimaanlage manipuliert → Übertemperatur → Server-Ausfall
- Wasserwerk (USA, Oldsmar): SCADA-System direkt per Fernzugriff manipuliert

---

## Angriffsvektoren in der GA

| Angriffsvektor              | Beispiel                                   | Häufigkeit |
|-----------------------------|--------------------------------------------|------------|
| **Fernzugriff ohne MFA**    | VPN ohne 2FA, Teamviewer mit schwachem PW  | Sehr hoch  |
| **Default-Passwörter**      | DDC Werk-PW "admin/admin", nie geändert    | Sehr hoch  |
| **Fehlende Segmentierung**  | OT direkt im gleichen Netz wie IT          | Hoch       |
| **Ungepatchte Software**    | Windows XP GLT-Server mit EternalBlue-Vuln | Hoch       |
| **USB-Sticks**              | Techniker bringt infiziertes USB mit        | Mittel     |
| **Lieferkette**             | Kompromittierte Firmware vom Hersteller    | Niedrig    |
| **Social Engineering**      | Techniker wird manipuliert                 | Mittel     |

---

## Schutzkonzept nach IEC 62443 (Zonen und Konduits)

**IEC 62443** definiert Sicherheitszonen (Zones) und deren Verbindungen (Conduits):

```
Zone 1: Enterprise IT (VLAN 1)
    │ Konduit: Firewall + IDS
Zone 2: GLT / Managementebene (VLAN 10)
    │ Konduit: Firewall strenge Regeln
Zone 3: Automationsebene DDC (VLAN 20)
    │ Konduit: nur dedizierter Wartungsrechner
Zone 4: Feldebene (physisch) — kein IP
```

Regel: **Jede Zonengrenzen braucht explizit erlaubte Verbindungen.** Was nicht erlaubt ist, ist verboten.

---

## Technische Schutzmassnahmen

### 1. Passwörter und Authentifizierung

- **Default-Passwörter sofort ändern** — bei jedem Gerät, jedem System
- Starke Passwörter: min. 12 Zeichen, Sonderzeichen
- **Verschiedene Passwörter** pro Gerät (kein universelles GA-Passwort)
- **Multi-Faktor-Authentifizierung (MFA)** für alle Fernzugriffe
- Passwort-Manager verwenden und Passwörter dokumentieren (sicher!)

### 2. Netzwerksegmentierung

- OT-Netz vom IT-Netz trennen (VLAN + Firewall)
- Least Privilege: Jede Verbindung nur genau so weit wie nötig
- Firewall-Regeln dokumentieren und regelmässig prüfen

### 3. Fernzugriff

- Nur via **VPN** (IPsec oder WireGuard), nie direkt
- VPN mit MFA (Authenticator App)
- Sitzungen protokollieren (wer war wann drin)
- Inaktive Sitzungen nach 15 min trennen
- **No Split Tunneling** — alle Sitzung über VPN, kein direkter Internet-Bypass

### 4. Patches und Updates

| Situation               | Vorgehen                                    |
|-------------------------|---------------------------------------------|
| IT-Systeme (GLT-Server) | Regelmässige Windows/Linux-Updates          |
| DDC-Firmware            | Hersteller-Updates nach Testphase einspielen |
| Legacy-Geräte (Ende of Life) | Kompensation: Netzwerksegmentierung    |
| Testen vor Produktiv    | Updates immer erst in Testumgebung          |

> ⚠️ Viele GLT-Server laufen noch auf Windows Server 2008/2012 — end of life, keine Sicherheitsupdates mehr. Sofortmassnahme: Segmentierung verstärken, Migration planen.

### 5. Monitoring und Logging

- Netzwerktraffic überwachen (anomale Datenmengen → Alarm)
- Login-Versuche protokollieren
- Änderungen an DDC-Konfigurationen protokollieren
- SIEM (Security Information and Event Management) für grössere Anlagen

### 6. Physische Sicherheit

- Schaltschränke abschliessen
- Netzwerk-Switches in gesichertem Serverraum
- USB-Ports deaktivieren (BIOS-Ebene oder Kleber/Deckel)
- Keine unkontrollierten Serviceanschlüsse (Laptop anstecken = Zugang)

---

## Incident Response — Was tun bei Angriff?

```
1. ERKENNEN: Anomalie (ungewöhnliche Verbindungen, Alarme, Ausfall)
2. ISOLIEREN: Betroffenes System sofort vom Netz trennen
3. INFORMIEREN: IT-Security + Management + je nach Schwere: Behörden
4. ANALYSIEREN: Was ist passiert? Wie weit verbreitet?
5. WIEDERHERSTELLEN: Aus sauberem Backup, nicht infiziertes System
6. NACHJUSTIEREN: Wie wurde eingegangen? Lücke schliessen.
```

**Backup-Wichtigkeit:** Offline-Backups von DDC-Konfigurationen und GLT-Datenbank. Ransomware verschlüsselt auch verbundene Netzlaufwerke!

---

## Schwachstellen-Übersicht in typischer GA

| Schwachstelle               | Priorität | Aufwand Behebung |
|-----------------------------|-----------|------------------|
| Default-Passwörter          | KRITISCH  | Sehr gering (sofort ändern!) |
| Kein VPN/MFA für Fernzugriff | KRITISCH | Mittel           |
| OT=IT im selben Netz        | HOCH      | Mittel (VLAN)    |
| Ungepatchter Windows-Server | HOCH      | Mittel           |
| Keine Logs / Monitoring     | MITTEL    | Mittel           |
| Physischer Zugang unkontrolliert | MITTEL | Gering          |

## Normen

- **IEC 62443** — Industrial Automation and Control Systems Security (Serien-Norm)
- **NIST SP 800-82** — Guide to Industrial Control Systems Security
- **BSI IT-Grundschutz** (DE) — OT-Spezifisches Grundschutz-Kompendium
- **VDI/VDE 2182** — IT-Sicherheit für Fertigungs- und Prozessanlagen
