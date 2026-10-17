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
related: [netzwerk-ga, remote-zugriff, bacnet, opc-ua, glt-grundlagen, kbob]
norm: [IEC 62443, NIST SP 800-82, BSI IT-Grundschutz, KBOB IKT-Sicherheit 2025]
updated: 2026-10-17
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

## Schweiz: KBOB-Empfehlung IKT-Sicherheit in der GA (2025)

Die KBOB hat im Juli 2025 eine Empfehlung zur IKT-Sicherheit in der Gebäudeautomation herausgegeben, mitgetragen unter anderem von BBL, armasuisse, ETH Zürich, SBB, Post Immobilien, Universitätsspital Zürich und der BIG-EU. Sie ergänzt die [KBOB BACnet-Vorgaben](/wissen/kbob-bacnet) und ist bewusst technologieoffen. Die wichtigsten Aussagen:

**Ein sicheres Protokoll allein genügt nicht.** BACnet/SC oder KNX Secure lösen nur einen Teil. Ohne Segmentierung, Rollen, Monitoring, Patch-Management und physischen Schutz bleibt die Anlage angreifbar.

**BACnet/IP kennt keine Benutzer.** Es kann weder Personen identifizieren noch Rechte pro Benutzer vergeben. Zugriffs- und Nutzungskontrolle müssen deshalb auf der Leitebene und an der Grenze des GA-Netzes stattfinden: VPN, Network Access Control (NAC). Als Ausgleich dienen Segmentierung und ein sauberes Change Management mit Audit-Log auf unveränderlichem Speicher. Eine unterschätzte Gefahr nennt die Empfehlung ausdrücklich: andere Inbetriebnehmer im selben Netz, die Regelparameter ändern, mit DeviceCommunicationControl die Kommunikation abschalten oder eine falsche Zeit verteilen. Deshalb erlaubt die BACnet-Empfehlung DCC und Zeitsynchronisation nur vom Leitsystem aus.

**Erst inventarisieren, dann bewerten.** Das Inventar erfasst Gerätetyp, Zweck, Verbindungsart, IP- und MAC-Adresse, Ports, VLAN, Standort, Firmware- und Softwarestand und Zertifikate, auch für Switches, Router, Firewalls, VPN-Zugänge und IoT-Geräte. Danach werden Schwachstellen, Kritikalität und Auswirkungen bewertet und jedes System einem Schutzbedarf zugeordnet.

**Schutzbedarf pro Zone: normal oder erhöht.** Die KBOB vereinfacht IEC 62443-3-3 auf zwei Stufen. Eine Zone gilt als «erhöht», sobald sie bei einer der sieben Anforderungen mehr braucht als üblich:

| Anforderung nach IEC 62443-3-3   | Bürolüftung                           | RWA im Fluchtweg                          |
| -------------------------------- | ------------------------------------- | ----------------------------------------- |
| Identifikation, Authentifikation | normal: interne Mitarbeitende         | erhöht: nur definiertes Fachpersonal      |
| Nutzungskontrolle                | normal: Nutzer und FM dürfen ändern   | erhöht: nur Fachpersonal                  |
| Systemintegrität                 | normal: Fehler stören den Komfort     | erhöht: Manipulation kann Leben gefährden |
| Datenvertraulichkeit             | normal                                | normal                                    |
| Eingeschränkter Datenfluss       | normal                                | erhöht: getrennt von übrigen Datenflüssen |
| Zeitnahe Reaktion                | normal: Instandsetzung nach Priorität | erhöht: sofort erkennen, 24/7 alarmieren  |
| Verfügbarkeit                    | normal                                | erhöht: höchste Anforderung               |

Massnahmen richten sich dann nur auf die erhöhten Punkte. Oft reicht eine einfache Lösung: Eine Notbeleuchtung lässt sich nur physisch abschalten, ihr Ausfall löst einen Alarm aus.

**Zonen nach dem Purdue-Modell.** Unternehmens-IT, darunter eine DMZ für Fernzugriff, Datenanalyse und Log-Speicher, darunter die GA-Zone, ganz unten eine sicherheitskritische Zone für Notabschaltungen, isoliert oder nur über stark gesicherte Übergänge erreichbar. In der GA-Zone je ein VLAN und Subnetz für HLK, Zutritt und Video. Zwischen den Zonen Firewalls, Fernzugriff über VPN in die DMZ. Wo möglich eigene Switches pro Zone.

**IDS statt IPS.** In der GA sind passive Systeme zur Angriffserkennung den aktiven vorzuziehen. Ein IPS könnte etwa die Kühlung eines Rechenzentrums automatisch vom Netz trennen und damit selbst den Ausfall verursachen. Das IDS alarmiert, entscheiden tun Fachleute.

**Was überwachen, in dieser Reihenfolge:**

1. Ein- und ausgehender Verkehr an den Übergängen nach aussen; bei nicht patchbaren Altgeräten oft die einzige praktikable Methode
2. Zugriffe auf und Änderungen an kritischen Konfigurationen: selten und deshalb sehr verdächtig, wenig Aufwand, hoher Nutzen
3. Protokolle von Sicherheitswerkzeugen (Firewall, Virenschutz, IDS)
4. Zugriffsprotokolle
5. System- und Anwendungslogs (Syslog), mit hoher Fehlalarmquote

**Patch-Management vertraglich regeln.** Sicherheitsupdates sind Voraussetzung im Wartungsvertrag. Der Lieferant informiert mindestens zweimal jährlich über Major-Patches, der Integrator den Betreiber über Major- und Minor-Patches. Patches erst in einer Testumgebung prüfen, über Change Management einspielen, danach testen und protokollieren. Nur mit Einverständnis des Herstellers patchen, sonst droht der Verlust der Garantie. Für nicht mehr unterstützte Geräte: Härtung mit Allowlisting, strengerer Zugriff, restriktivere Firewall.

**Verfügbarkeit sichern:** Redundanz nur dort, wo die Verfügbarkeit es verlangt; Konfigurations-Backups, davon mindestens eines offline gegen Ransomware; Ersatzteile. Ein befallenes Gerät wird besser ersetzt als gesäubert. Alles regelmässig testen.

**Organisation:**

- Sicherheitsmanagement nach ISA/IEC 62443-2-1; wer schon ein ISMS nach ISO 27001 hat, erweitert es auf die OT.
- Reifegrad nach CMMI von 1 (ad hoc) bis 5 (laufend verbessert). Ziel ist meist Stufe 3, der Ist-Zustand liegt oft bei 1 oder 2.
- Rollen festlegen, z.B. GA-Administrator, GA-Betrieb, GA-Führung, GA-Lieferant, Sicherheitsbeauftragte, Auditor. Den Auditor stellt eine andere Stelle als die Administratoren.
- Schulung und Übungen, zum Beispiel ein Planspiel («Tabletop Exercise») mit einem fiktiven Vorfall.
- Notfallpläne: Disaster Recovery, Business Continuity, Incident Response und Kommunikation; Handbetrieb kritischer Anlagen vorsehen.
- Meldepflicht: Das Informationssicherheitsgesetz (ISG) verlangt von Betreibern kritischer Infrastrukturen die Meldung von Cyberangriffen. Ob sie gilt, muss jede Organisation selbst klären.

Zur Prüfung: [Checkliste IKT-Sicherheit GA (KBOB)](/checklisten/kbob-ikt-sicherheit).

## Normen

- **IEC 62443** — Industrial Automation and Control Systems Security (Serien-Norm)
- **KBOB-Empfehlung IKT-Sicherheit in der Gebäudeautomation**, V1.0, Juli 2025
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

## Switzerland: KBOB Recommendation ICT Security in BA (2025)

In July 2025 KBOB published a recommendation on ICT security in building automation, supported among others by BBL, armasuisse, ETH Zurich, SBB, Post Real Estate, University Hospital Zurich and BIG-EU. It complements the [KBOB BACnet requirements](/wissen/kbob-bacnet) and is deliberately technology-neutral. The key points:

**A secure protocol alone is not enough.** BACnet/SC or KNX Secure solve only part of the problem. Without segmentation, roles, monitoring, patch management and physical protection the plant stays vulnerable.

**BACnet/IP has no users.** It can neither identify people nor assign rights per user. Access and use control must therefore happen at the management level and at the boundary of the BA network: VPN, network access control (NAC). Segmentation and clean change management with an audit log on immutable storage compensate. The recommendation explicitly names an underestimated risk: other commissioning engineers on the same network who change control parameters, switch off communication with DeviceCommunicationControl or distribute a wrong time. That is why the BACnet recommendation allows DCC and time synchronisation only from the management system.

**Inventory first, then assess.** The inventory records device type, purpose, connection type, IP and MAC address, ports, VLAN, location, firmware and software version and certificates, also for switches, routers, firewalls, VPN access and IoT devices. Then vulnerabilities, criticality and impact are assessed and every system is given a protection level.

**Protection level per zone: normal or elevated.** KBOB simplifies IEC 62443-3-3 to two levels. A zone counts as "elevated" as soon as it needs more than usual in one of the seven requirements:

| Requirement per IEC 62443-3-3  | Office ventilation              | Smoke extraction in escape route         |
| ------------------------------ | ------------------------------- | ---------------------------------------- |
| Identification, authentication | normal: internal staff          | elevated: defined specialists only       |
| Use control                    | normal: users and FM may change | elevated: specialists only               |
| System integrity               | normal: faults affect comfort   | elevated: tampering can endanger lives   |
| Data confidentiality           | normal                          | normal                                   |
| Restricted data flow           | normal                          | elevated: separate from other data flows |
| Timely response                | normal: repair by priority      | elevated: detect at once, 24/7 alarm     |
| Resource availability          | normal                          | elevated: highest requirement            |

Measures then target only the elevated points. Often a simple solution is enough: emergency lighting can only be switched off physically, and its failure raises an alarm.

**Zones per the Purdue model.** Enterprise IT, below it a DMZ for remote access, data analysis and log storage, below that the BA zone, and at the bottom a safety-critical zone for emergency shutdowns, isolated or reachable only through highly secured conduits. In the BA zone one VLAN and subnet each for HVAC, access control and video. Firewalls between zones, remote access via VPN into the DMZ. Separate switches per zone where possible.

**IDS rather than IPS.** In BA, passive intrusion detection is preferable to active prevention. An IPS could automatically cut a data centre's cooling from the network and cause the outage itself. The IDS raises the alarm; specialists decide.

**What to monitor, in this order:**

1. Incoming and outgoing traffic at the external boundaries; for legacy devices that cannot be patched often the only practical method
2. Access to and changes of critical configurations: rare and therefore highly suspicious, little effort, high benefit
3. Logs of security tools (firewall, antivirus, IDS)
4. Access logs
5. System and application logs (syslog), with a high false alarm rate

**Agree patch management in the contract.** Security updates are a precondition in the maintenance contract. The vendor reports major patches at least twice a year, the integrator informs the operator about major and minor patches. Test patches in a test environment first, deploy them through change management, then test and document. Patch only with the vendor's consent, otherwise the warranty may be lost. For unsupported devices: hardening with allowlisting, stricter access, more restrictive firewall rules.

**Secure availability:** redundancy only where availability requires it; configuration backups, at least one of them offline against ransomware; spare parts. An infected device is better replaced than cleaned. Test everything regularly.

**Organisation:**

- Security management per ISA/IEC 62443-2-1; anyone who already runs an ISMS per ISO 27001 extends it to OT.
- Maturity per CMMI from 1 (ad hoc) to 5 (continuously improved). The target is usually level 3; the current state is often 1 or 2.
- Define roles, e.g. BA administrator, BA operations, BA management, BA vendor, security officer, auditor. The auditor comes from a different unit than the administrators.
- Training and exercises, for example a tabletop exercise with a fictitious incident.
- Emergency plans: disaster recovery, business continuity, incident response and communication; provide manual operation of critical plants.
- Reporting duty: the Swiss Information Security Act (ISG) requires operators of critical infrastructure to report cyberattacks. Each organisation must check whether it applies.

For checking: [Checklist ICT security BA (KBOB)](/checklisten/kbob-ikt-sicherheit).

## Standards

- **IEC 62443** — Industrial Automation and Control Systems Security (series standard)
- **KBOB recommendation ICT security in building automation**, V1.0, July 2025
- **NIST SP 800-82** — Guide to Industrial Control Systems Security
- **BSI IT-Grundschutz** (DE) — compendium with modules for building automation
- **BACS** (CH) — Federal Office for Cybersecurity. Since April 2025 operators of critical infrastructure must report cyberattacks within 24 hours.
- **VDI/VDE 2182** — IT security for manufacturing and process plants
