---
title: Backup-Strategien für GA-Systeme — 3-2-1 Regel
slug: backup-ga
category: it
subcategory: betrieb
tags: [backup, datensicherung, 3-2-1-regel, glt-backup, ddc-backup, disaster-recovery, rto, rpo, offsite, verschlüsselung, rotation, wiederherstellung, rsync, proxmox-backup-server, nas]
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

| Typ          | Beschreibung                           | Speicherplatz | Wiederherstellung |
|--------------|----------------------------------------|---------------|-------------------|
| Vollbackup   | Alles komplett                         | Hoch          | Einfach           |
| Inkrementell | Nur Änderungen seit letztem Backup     | Gering        | Aufwendiger       |
| Differenziell | Änderungen seit letztem Vollbackup   | Mittel        | Mittel            |
| Snapshot     | Zustand eingefroren (VM, Container)    | Hoch          | Sehr schnell      |

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
