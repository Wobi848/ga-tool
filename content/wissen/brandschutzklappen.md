---
title: Brandschutzklappen (BSK) — Ansteuerung und Protokollierung
slug: brandschutzklappen
category: sicherheit
subcategory: brandschutz
tags: [bsk, brandschutzklappe, feuerschutzklappe, brandschutz, feuerwiderstand, rauchabzug, rwa, auslösung, thermoelement, rückmeldung, protokoll, inbetriebnahme, schmelzeinsatz, en15650, en1366]
difficulty: fortgeschritten
area: [ga, elektro, hlk]
related: [rlt-anlage, alarmmanagement, glt-grundlagen, ddc-programmierung]
norm: [EN 15650, EN 1366-2, EN 13501-3, VdS 2226]
updated: 2026-05-14
lang: de
---

# Brandschutzklappen (BSK) — Ansteuerung und Protokollierung

**Brandschutzklappen** trennen im Brandfall Lüftungskanäle und verhindern damit die Ausbreitung von Feuer und Rauch über das Lüftungssystem. In der GA sind Ansteuerung, Rückmeldung und Protokollierung sicherheitsrelevante Funktionen.

## Funktion und Arten

### Brandschutzklappe (BSK) / Feuerschutzklappe

- Schliesst bei **Temperatur** (Schmelzeinsatz) oder **elektrisch** auf Befehl
- Verhindert Feuerübertragung durch Lüftungskanal
- Klassifizierung: E90 = 90 Minuten Feuerwiderstand

### Rauchschutzklappe (RSK)

- Schliesst bei **Rauchmeldesignal**
- Verhindert Rauchausbreitung (kein Feuerwiderstand nötig)
- Geringere thermische Anforderung als BSK

### Kombiklappe (BSK + RSK)

- Schliesst bei Rauch **und** bei Feuer (Temperatur)
- In der Praxis am häufigsten eingebaut

---

## Auslöse-Mechanismen

| Auslöser           | Beschreibung                                     | GA-Relevanz          |
|--------------------|--------------------------------------------------|----------------------|
| **Schmelzeinsatz** | Mechanisch, bei ca. 72 °C → Feder schliesst Klappe | Ausfallsicher, kein Strom nötig |
| **Elektrischer Auslöser** | 24 V Signal → Klappe schliesst      | Steuerbar, rückmeldbar |
| **Thermoelement**  | Temperaturmessung, löst bei Grenzwert aus       | Kombinierbar         |
| **Rauchmelder**    | Optischer oder ionischer Melder im Kanal        | Für Rauchschutz-Funktion |

**Kombiniert:** Schmelzeinsatz (Sicherheit) + elektrischer Auslöser (Steuerung aus GLT/BMA).

---

## Ansteuerung aus der GA

### Normalzustand: Klappe offen

```
BSK normal: 24 V = Klappe offen (spannungshaltend)
Auslösung:  24 V = 0 V → Feder schliesst Klappe (fail-safe!)
```

**Fail-Safe:** Bei Stromausfall schliessen alle BSK! Das ist gewollt — im Brandfall oft kein Strom vorhanden.

### Elektrische Schaltung (typisch)

```
DDC-Ausgang → Relais → 24 V Haltestrom BSK
                        ├── Rückmeldung AUF (DI)
                        └── Rückmeldung ZU (DI)
```

**WICHTIG:** BSK dürfen **nicht direkt** von DDC-Transistorausgängen gespeist werden — Relais oder getrennter Stromkreis nötig.

---

## Rückmeldung und Überwachung

Jede BSK meldet ihren Status zurück:

| Signal               | Typ | Bedeutung                               |
|----------------------|-----|-----------------------------------------|
| Klappe AUF           | DI  | Betriebszustand, Lüftung aktiv          |
| Klappe ZU            | DI  | Ausgelöst (Brandfall oder Test)         |
| Störung (Sammelstörung) | DI | Klappe reagiert nicht / Endfehler     |

**Endlagen-Überwachung:** Nach Auslösung (Zu-Befehl) muss Klappe innerhalb definierter Zeit die ZU-Meldung liefern. Timeout = Alarm.

### GLT-Alarmierung

| Alarm                         | Priorität | Massnahme                    |
|-------------------------------|-----------|------------------------------|
| BSK ausgelöst (nicht Test)    | Kritisch  | Sofort Feuerwehr + Betreiber |
| BSK Rückmeldung fehlt (Störung) | Hoch    | Inspektion erforderlich      |
| BSK kann nicht zurückgestellt werden | Mittel | Wartung                  |

---

## Rückstellung nach Auslösung

Nach Brandfall oder Test muss BSK manuell zurückgestellt werden:

```
1. Auslöseursache beseitigen (Feuer gelöscht, Kanaltemperatur < 72 °C)
2. Manuelle Rückstellung am Gerät (Schlüssel / Werkzeug)
3. Sichtkontrolle: keine Beschädigungen
4. Strom einschalten → Haltestrom aktiviert → Klappe öffnet
5. Rückmeldung AUF = bestätigt
6. Protokollierung: Datum, Uhrzeit, Person
```

> ⚠️ BSK dürfen **nicht ferngeöffnet** werden ohne Freigabe durch autorisiertes Personal. Sicherheitsverantwortung liegt beim Betreiber.

---

## Inbetriebnahme (IBN) BSK

### Pflichtprüfungen bei IBN

1. **Fabrikatprüfung:** BSK-Zertifikat vorhanden? Korrekte Einbaulage?
2. **Einbaulage:** Horizontal / vertikal korrekt montiert (herstellerspezifisch!)
3. **Auslösetest:** Klappe auf Auslösung prüfen (Signal abschalten)
4. **Endlagentest:** AUF und ZU Rückmeldung prüfen
5. **Schmelzeinsatz:** Temperatur und Typ korrekt?
6. **Rückstellung:** Manuelle Rückstellung funktioniert?
7. **Protokoll:** Alle Punkte dokumentieren

### IBN-Protokoll (Pflichtinhalt)

```
BSK-Liste (pro Klappe):
  - Bezeichnung / ID
  - Einbauort / Gebäudebereich
  - Hersteller, Typ, Zertifikat-Nr.
  - Feuerwiderstandsklasse
  - Auslösetemperatur (Schmelzeinsatz)
  - IBN-Datum
  - Testergebnis: AUF ✓ / ZU ✓ / Rückmeldung ✓
  - Unterschrift Inbetriebnehmer
```

---

## Wiederkehrende Prüfungen

BSK müssen **regelmässig geprüft** werden (Betreiberverantwortung):

| Prüfung               | Intervall   | Beschreibung                       |
|-----------------------|-------------|------------------------------------|
| Sichtprüfung          | Jährlich    | Korrosion, Beschädigung, Freiheit  |
| Funktionsprüfung      | Jährlich    | Auslösung und Rückstellung testen  |
| Vollprüfung           | 5–10 Jahre  | Komplette Prüfung inkl. Dokumentation |

**GA-Unterstützung:** Automatische Erinnerung wenn Prüfintervall abläuft. Testergebnisse in GLT archivieren.

---

## Normen

- **EN 15650** — Lüftung von Gebäuden, Brandschutzklappen
- **EN 1366-2** — Feuerwiderstandsprüfungen für Installationen, Feuerschutzklappen
- **EN 13501-3** — Klassifizierung Feuerwiderstand, Klappen
- **VdS 2226** (DE) — Richtlinien für Brandschutzklappen-Anlagen
- **SIA 181** (CH) — Schallschutz im Hochbau (Klappenanforderungen)
