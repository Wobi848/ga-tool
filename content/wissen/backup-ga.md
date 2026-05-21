---
title: Backup-Strategien für GA-Systeme — 3-2-1 Regel
title_en: Backup Strategies for BA Systems — 3-2-1 Rule
slug: backup-ga
category: it
subcategory: betrieb
tags:
  [
    backup,
    datensicherung,
    3-2-1-regel,
    glt-backup,
    ddc-backup,
    disaster-recovery,
    rto,
    rpo,
    offsite,
    verschlüsselung,
    rotation,
    wiederherstellung,
    rsync,
    proxmox-backup-server,
    nas
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [proxmox, docker-ga, cybersecurity-ot, remote-zugriff, netzwerk-ga, glt-uebergabe]
norm: [ISO 27001, IEC 62443]
updated: 2026-05-15
lang: de
---

# Backup-Strategien für GA-Systeme — 3-2-1 Regel

Ein GA-System-Ausfall ohne Backup bedeutet: Tage Ausfall, verlorene Konfiguration, aufwendige Neuprogrammierung. Backups sind in der GA oft vernachlässigt — bis es zu spät ist.

## Die 3-2-1 Regel

```
3 Kopien der Daten (1 Original + 2 Backups)
2 verschiedene Speichermedien (z.B. SSD + NAS)
1 Kopie ausserhalb des Gebäudes (Offsite / Cloud)

Warum:
  1 Kopie: Datei gelöscht → verloren
  2 Kopien gleich: Brand/Diebstahl → beide weg
  3-2-1: selbst bei Katastrophe eine Kopie sicher
```

---

## Was in der GA gesichert werden muss

### Kritisch (täglich sichern)

```
1. DDC-Programme:
   - Quellcode-Backup je Controller
   - Parameterlisten (Sollwerte, Zeitprogramme)
   - Konfigurationsdateien

2. GLT-Datenbank:
   - Systemkonfiguration (Datenpunkte, Alarme, Visualisierung)
   - Benutzerverwaltung
   - Trends / Historik (komprimiert, ältere Daten seltener)

3. Netzwerk-Konfiguration:
   - Switch-Configs (exportiert)
   - Firewall-Regeln
   - IP-Pläne

4. Passwörter (verschlüsselt!):
   KeePass-Datenbank oder ähnliches
```

### Wichtig (wöchentlich / bei Änderungen)

```
5. As-Built Dokumentation (DPL, Schemen)
6. Server-Konfigurationen (OS-Level, Docker Compose)
7. Zertifikate (TLS, VPN)
```

---

## Backup-Typen

| Typ           | Beschreibung                        | Speicherplatz | Wiederherstellung |
| ------------- | ----------------------------------- | ------------- | ----------------- |
| Vollbackup    | Alles komplett                      | Hoch          | Einfach           |
| Inkrementell  | Nur Änderungen seit letztem Backup  | Gering        | Aufwendiger       |
| Differenziell | Änderungen seit letztem Vollbackup  | Mittel        | Mittel            |
| Snapshot      | Zustand eingefroren (VM, Container) | Hoch          | Sehr schnell      |

**Empfehlung GA:**

```
Täglich: Inkrementelles Backup (schnell, wenig Platz)
Wöchentlich: Vollbackup (Basis für Inkrementelle)
Monatlich: Vollbackup → Offsite
```

---

## Backup-Tools und Lösungen

### Proxmox Backup Server (PBS)

```
Für Proxmox-basierte GA-Server:
  - Deduplizierung (gleiche Blöcke nur einmal speichern)
  - Verschlüsselung (Ende-zu-Ende)
  - Inkrementelle Backups nach erster Vollsicherung
  - Retention-Policy (behalte 7 täglich, 4 wöchentlich, 6 monatlich)

Einrichtung:
  1. PBS auf separater Hardware/VM
  2. Proxmox-Host → PBS als Backup-Storage
  3. Automatischer Backup-Plan (z.B. täglich 02:00)
```

### Rsync (Linux, einfach)

```bash
# Tägliches Backup DDC-Programme → NAS
rsync -avz --delete \
  /opt/ga-configs/ \
  user@nas.local:/backup/ga-configs/

# Mit Datum-Stempel
rsync -avz \
  /opt/glt-data/ \
  /mnt/backup/glt-$(date +%Y%m%d)/
```

### Borg Backup (Linux, komprimiert)

```bash
# Repository initialisieren
borg init --encryption=repokey /mnt/backup/ga-repo

# Backup erstellen
borg create \
  --compression lz4 \
  /mnt/backup/ga-repo::ga-{now:%Y-%m-%d} \
  /opt/glt /opt/ddc-backups /etc/network

# Retention
borg prune \
  --keep-daily=7 \
  --keep-weekly=4 \
  --keep-monthly=6 \
  /mnt/backup/ga-repo
```

---

## Disaster Recovery Plan (DRP)

```
Dokumentiert vor dem Ernstfall:

RTO (Recovery Time Objective):
  Wie lange darf der Ausfall maximal dauern?
  GA-Anlage: typisch 4–24 Stunden (je nach Kritikalität)

RPO (Recovery Point Objective):
  Wie viele Datenverluste sind akzeptabel?
  GA-Config: 0–24 Stunden (tägliches Backup akzeptabel)
  Historik: bis 7 Tage (wöchentlich akzeptabel)

Wiederherstellungs-Prozedur (dokumentiert!):
  1. Hardware-Ausfall? → Ersatz-Hardware beschaffen / VM neu starten
  2. Proxmox-VM aus Backup wiederherstellen (30–60 min)
  3. Netzwerk-Konfiguration prüfen
  4. DDC-Kommunikation testen
  5. Alarmierung wieder aktiv?
  6. Betreiber informieren
```

---

## Regelmässige Backup-Tests

```
Backup ist nutzlos wenn Wiederherstellung nicht funktioniert!

Quartärlich:
  - Testwiederherstellung in Sandbox-Umgebung
  - Kann GLT aus Backup gestartet werden?
  - Sind alle DDC-Programme vollständig?

Jährlich:
  - Vollständiger DR-Test (alles aus Backup wiederherstellen)
  - Dauer messen → im DRP dokumentieren

Protokoll:
  Datum, Tester, Ergebnis, Abweichungen → Ablage in Dokumentation
```

---

## Backup-Checkliste

- [ ] Was wird gesichert? (Vollständige Liste)
- [ ] Wie oft? (Täglich / wöchentlich je Datenkategorie)
- [ ] Wo gespeichert? (Lokal + Offsite)
- [ ] Verschlüsselt? (Backup-Medien können gestohlen werden)
- [ ] Retention-Policy definiert?
- [ ] Automatisiert und überwacht? (Backup-Fehler → Alarm!)
- [ ] Wiederherstellung getestet?
- [ ] DR-Plan dokumentiert?
- [ ] Zugangsdaten zum Backup gesichert?

---

## Normen

- **ISO 27001** — Informationssicherheits-Managementsystem (ISMS), Backup-Anforderungen
- **IEC 62443** — OT-Cybersecurity, Datensicherung als Schutzmaßnahme

<!-- EN -->

# Backup Strategies for BA Systems — 3-2-1 Rule

A BA system failure without a backup means: days of downtime, lost configuration, costly reprogramming. Backups are often neglected in BA — until it is too late.

## The 3-2-1 Rule

```
3 copies of the data (1 original + 2 backups)
2 different storage media (e.g. SSD + NAS)
1 copy off-site (remote / cloud)

Why:
  1 copy: file deleted → gone
  2 copies on same medium: fire/theft → both lost
  3-2-1: even in a disaster, one copy is safe
```

---

## What Must Be Backed Up in BA

### Critical (back up daily)

```
1. DDC programmes:
   - Source code backup per controller
   - Parameter lists (setpoints, time programs)
   - Configuration files

2. BMS database:
   - System configuration (data points, alarms, visualisation)
   - User management
   - Trends / history (compressed, older data less frequent)

3. Network configuration:
   - Switch configs (exported)
   - Firewall rules
   - IP plans

4. Passwords (encrypted!):
   KeePass database or equivalent
```

### Important (weekly / on change)

```
5. As-built documentation (DPL, drawings)
6. Server configurations (OS level, Docker Compose)
7. Certificates (TLS, VPN)
```

---

## Backup Types

| Type         | Description                    | Storage | Recovery     |
| ------------ | ------------------------------ | ------- | ------------ |
| Full backup  | Everything complete            | High    | Simple       |
| Incremental  | Changes since last backup      | Low     | More complex |
| Differential | Changes since last full backup | Medium  | Medium       |
| Snapshot     | State frozen (VM, container)   | High    | Very fast    |

**Recommendation for BA:**

```
Daily:   Incremental backup (fast, little space)
Weekly:  Full backup (basis for incrementals)
Monthly: Full backup → off-site
```

---

## Backup Tools and Solutions

### Proxmox Backup Server (PBS)

```
For Proxmox-based BA servers:
  - Deduplication (identical blocks stored only once)
  - Encryption (end-to-end)
  - Incremental backups after first full backup
  - Retention policy (keep 7 daily, 4 weekly, 6 monthly)

Setup:
  1. PBS on separate hardware/VM
  2. Proxmox host → PBS as backup storage
  3. Automated backup schedule (e.g. daily at 02:00)
```

### Rsync (Linux, simple)

```bash
# Daily backup of DDC programmes → NAS
rsync -avz --delete \
  /opt/ga-configs/ \
  user@nas.local:/backup/ga-configs/

# With date stamp
rsync -avz \
  /opt/glt-data/ \
  /mnt/backup/glt-$(date +%Y%m%d)/
```

### Borg Backup (Linux, compressed)

```bash
# Initialise repository
borg init --encryption=repokey /mnt/backup/ga-repo

# Create backup
borg create \
  --compression lz4 \
  /mnt/backup/ga-repo::ga-{now:%Y-%m-%d} \
  /opt/glt /opt/ddc-backups /etc/network

# Retention
borg prune \
  --keep-daily=7 \
  --keep-weekly=4 \
  --keep-monthly=6 \
  /mnt/backup/ga-repo
```

---

## Disaster Recovery Plan (DRP)

```
Document before an incident occurs:

RTO (Recovery Time Objective):
  Maximum acceptable downtime?
  BA system: typically 4–24 hours (depending on criticality)

RPO (Recovery Point Objective):
  Acceptable data loss?
  BA config: 0–24 hours (daily backup acceptable)
  History: up to 7 days (weekly acceptable)

Recovery procedure (documented!):
  1. Hardware failure? → source replacement hardware / restart VM
  2. Restore Proxmox VM from backup (30–60 min)
  3. Verify network configuration
  4. Test DDC communication
  5. Alarms active again?
  6. Notify operator
```

---

## Regular Backup Tests

```
A backup is worthless if restore does not work!

Quarterly:
  - Test restore in sandbox environment
  - Can BMS be started from backup?
  - Are all DDC programmes complete?

Annually:
  - Full DR test (restore everything from backup)
  - Measure duration → document in DRP

Record:
  Date, tester, result, deviations → stored in documentation
```

---

## Backup Checklist

- [ ] What is being backed up? (complete list)
- [ ] How often? (daily / weekly per data category)
- [ ] Where stored? (local + off-site)
- [ ] Encrypted? (backup media can be stolen)
- [ ] Retention policy defined?
- [ ] Automated and monitored? (backup failure → alarm!)
- [ ] Restore tested?
- [ ] DR plan documented?
- [ ] Backup access credentials secured?

---

## Standards

- **ISO 27001** — Information Security Management System (ISMS), backup requirements
- **IEC 62443** — OT cybersecurity, data backup as a protective measure
