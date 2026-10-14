---
title: Cybersecurity OT — Sicherheit in der Gebäudeautomation
title_en: OT Cybersecurity — Security in Building Automation
slug: cybersecurity-ot
category: it
subcategory: sicherheit
tags:
  [
    cybersecurity,
    ot-security,
    ics,
    iec62443,
    angriffsvektoren,
    schutzkonzept,
    patch,
    vlan,
    vpn,
    firewall,
    authentifizierung,
    schwachstelle,
    bacnet,
    modbus,
    remote-access,
    incident-response
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [netzwerk-ga, remote-zugriff, bacnet, opc-ua, glt-grundlagen]
norm: [IEC 62443, NIST SP 800-82, BSI IT-Grundschutz]
updated: 2026-10-14
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

### Dokumentierte Vorfälle

- **Target, USA, 2013:** Angreifer gelangten mit gestohlenen Zugangsdaten eines HLK-Dienstleisters ins Netz der Handelskette und von dort an Kreditkartendaten. Der Fernzugang für die Gebäudetechnik war nicht vom übrigen Netz getrennt.
- **Lappeenranta, Finnland, 2016:** Ein DDoS-Angriff legte die Heizungssteuerung von Wohngebäuden lahm; die Steuerungen starteten immer wieder neu.

---

## Angriffsvektoren in der GA

| Angriffsvektor             | Beispiel                                   | Häufigkeit |
| -------------------------- | ------------------------------------------ | ---------- |
| **Fernzugriff ohne MFA**   | VPN ohne 2FA, Teamviewer mit schwachem PW  | Sehr hoch  |
| **Default-Passwörter**     | DDC Werk-PW "admin/admin", nie geändert    | Sehr hoch  |
| **Fehlende Segmentierung** | OT direkt im gleichen Netz wie IT          | Hoch       |
| **Ungepatchte Software**   | Windows XP GLT-Server mit EternalBlue-Vuln | Hoch       |
| **USB-Sticks**             | Techniker bringt infiziertes USB mit       | Mittel     |
| **Lieferkette**            | Kompromittierte Firmware vom Hersteller    | Niedrig    |
| **Social Engineering**     | Techniker wird manipuliert                 | Mittel     |

---

## Schutzkonzept nach IEC 62443 (Zonen und Konduits)

**IEC 62443** definiert Sicherheitszonen (Zones) und deren Verbindungen (Conduits):

| Zone                     | Verbindung zur nächsten Zone                   |
| ------------------------ | ---------------------------------------------- |
| 1: Unternehmens-IT       | Firewall mit Überwachung                       |
| 2: GLT, Managementebene  | Firewall mit strengen Regeln                   |
| 3: Automationsebene, DDC | nur über definierte Dienste und Wartungszugang |
| 4: Feldebene             | Feldbusse ohne IP                              |

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

| Situation                    | Vorgehen                                     |
| ---------------------------- | -------------------------------------------- |
| IT-Systeme (GLT-Server)      | Regelmässige Windows/Linux-Updates           |
| DDC-Firmware                 | Hersteller-Updates nach Testphase einspielen |
| Legacy-Geräte (Ende of Life) | Kompensation: Netzwerksegmentierung          |
| Testen vor Produktiv         | Updates immer erst in Testumgebung           |

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

1. **Erkennen:** Auffälligkeiten wie ungewöhnliche Verbindungen, Alarme, Ausfälle
2. **Isolieren:** betroffenes System vom Netz trennen, die Anlage wenn nötig von Hand weiterbetreiben
3. **Informieren:** IT-Sicherheit, Leitung, je nach Fall Behörden
4. **Analysieren:** Was ist passiert, wie weit hat es sich ausgebreitet?
5. **Wiederherstellen:** aus einem sauberen Backup
6. **Nacharbeiten:** Lücke schliessen, Massnahmen anpassen

**Backup-Wichtigkeit:** Offline-Backups von DDC-Konfigurationen und GLT-Datenbank. Ransomware verschlüsselt auch verbundene Netzlaufwerke!

---

## Schwachstellen-Übersicht in typischer GA

| Schwachstelle                    | Priorität | Aufwand Behebung             |
| -------------------------------- | --------- | ---------------------------- |
| Default-Passwörter               | KRITISCH  | Sehr gering (sofort ändern!) |
| Kein VPN/MFA für Fernzugriff     | KRITISCH  | Mittel                       |
| OT=IT im selben Netz             | HOCH      | Mittel (VLAN)                |
| Ungepatchter Windows-Server      | HOCH      | Mittel                       |
| Keine Logs / Monitoring          | MITTEL    | Mittel                       |
| Physischer Zugang unkontrolliert | MITTEL    | Gering                       |

## Normen

- **IEC 62443** — Industrial Automation and Control Systems Security (Serien-Norm)
- **NIST SP 800-82** — Guide to Industrial Control Systems Security
- **BSI IT-Grundschutz** (DE) — Kompendium mit Bausteinen für Gebäudeautomation
- **BACS** (CH) — Bundesamt für Cybersicherheit. Seit April 2025 müssen Betreiber kritischer Infrastrukturen Cyberangriffe innert 24 Stunden melden.
- **VDI/VDE 2182** — IT-Sicherheit für Fertigungs- und Prozessanlagen

<!-- EN -->

OT security (Operational Technology) is no longer optional — BA systems are real attack targets. Compromised heating, ventilation, or access systems cause operational disruptions, personal injury, and enormous costs.

## Threat Landscape

### Why BA Systems Are Attacked

- **Ransomware:** Disrupt building operations → extort ransom (hotels, hospitals)
- **Sabotage:** Shut down heating in winter, lock out access control
- **Espionage:** Occupancy data, people flow
- **Pivot attack:** OT as a stepping stone into the IT network (and vice versa)
- **Physical damage:** Equipment overheating, frost damage

### Documented Incidents

- **Target, USA, 2013:** attackers entered the retailer's network using stolen credentials of an HVAC contractor and reached credit card data from there. Remote access for building services was not separated from the rest of the network.
- **Lappeenranta, Finland, 2016:** a DDoS attack disabled the heating control of residential buildings; the controllers kept rebooting.

---

## Attack Vectors in BA

| Attack vector                 | Example                                              | Frequency |
| ----------------------------- | ---------------------------------------------------- | --------- |
| **Remote access without MFA** | VPN without 2FA, TeamViewer with weak password       | Very high |
| **Default passwords**         | DDC factory password "admin/admin", never changed    | Very high |
| **Lack of segmentation**      | OT directly on the same network as IT                | High      |
| **Unpatched software**        | Windows XP BMS server with EternalBlue vulnerability | High      |
| **USB sticks**                | Technician brings infected USB                       | Medium    |
| **Supply chain**              | Compromised firmware from manufacturer               | Low       |
| **Social engineering**        | Technician is manipulated                            | Medium    |

---

## Protection Concept per IEC 62443 (Zones and Conduits)

**IEC 62443** defines security zones and their connections (conduits):

| Zone                     | Link to the next zone                            |
| ------------------------ | ------------------------------------------------ |
| 1: Enterprise IT         | firewall with monitoring                         |
| 2: BMS, management level | firewall with strict rules                       |
| 3: Automation level, DDC | only via defined services and maintenance access |
| 4: Field level           | fieldbuses without IP                            |

Rule: **Every zone boundary requires explicitly permitted connections.** What is not permitted is forbidden.

---

## Technical Protection Measures

### 1. Passwords and Authentication

- **Change default passwords immediately** — for every device, every system
- Strong passwords: min. 12 characters, special characters
- **Different passwords** per device (no universal BA password)
- **Multi-factor authentication (MFA)** for all remote access
- Use a password manager and document passwords (securely!)

### 2. Network Segmentation

- Separate OT network from IT network (VLAN + firewall)
- Least privilege: every connection only as far as necessary
- Document and regularly review firewall rules

### 3. Remote Access

- Only via **VPN** (IPsec or WireGuard), never direct
- VPN with MFA (authenticator app)
- Log sessions (who was connected when)
- Disconnect inactive sessions after 15 min
- **No split tunnelling** — all traffic via VPN, no direct internet bypass

### 4. Patches and Updates

| Situation                    | Procedure                                      |
| ---------------------------- | ---------------------------------------------- |
| IT systems (BMS server)      | Regular Windows/Linux updates                  |
| DDC firmware                 | Apply manufacturer updates after test phase    |
| Legacy devices (end of life) | Compensate: strengthen segmentation            |
| Test before production       | Always apply updates to test environment first |

> ⚠️ Many BMS servers still run on Windows Server 2008/2012 — end of life, no more security updates. Immediate action: strengthen segmentation, plan migration.

### 5. Monitoring and Logging

- Monitor network traffic (anomalous data volumes → alarm)
- Log login attempts
- Log changes to DDC configurations
- SIEM (Security Information and Event Management) for larger installations

### 6. Physical Security

- Lock control panels
- Network switches in secured server room
- Disable USB ports (BIOS level or physical covers)
- No uncontrolled service connections (plugging in a laptop = access)

---

## Incident Response — What to Do in an Attack

1. **Detect:** anomalies such as unusual connections, alarms, failures
2. **Isolate:** disconnect the affected system, run the plant manually if needed
3. **Inform:** IT security, management, authorities depending on the case
4. **Analyse:** what happened, how far has it spread?
5. **Restore:** from a clean backup
6. **Follow up:** close the gap, adjust measures

**Backup importance:** Offline backups of DDC configurations and BMS database. Ransomware also encrypts connected network drives!

---

## Vulnerability Overview in Typical BA

| Vulnerability                | Priority | Remediation effort             |
| ---------------------------- | -------- | ------------------------------ |
| Default passwords            | CRITICAL | Very low (change immediately!) |
| No VPN/MFA for remote access | CRITICAL | Medium                         |
| OT = IT on same network      | HIGH     | Medium (VLAN)                  |
| Unpatched Windows server     | HIGH     | Medium                         |
| No logs / monitoring         | MEDIUM   | Medium                         |
| Physical access uncontrolled | MEDIUM   | Low                            |

## Standards

- **IEC 62443** — Industrial Automation and Control Systems Security (series standard)
- **NIST SP 800-82** — Guide to Industrial Control Systems Security
- **BSI IT-Grundschutz** (DE) — compendium with modules for building automation
- **BACS** (CH) — Federal Office for Cybersecurity. Since April 2025 operators of critical infrastructure must report cyberattacks within 24 hours.
- **VDI/VDE 2182** — IT security for manufacturing and process plants
