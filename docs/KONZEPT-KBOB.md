# Konzept: KBOB-Inhalte und Generatoren

Quelle: alle Dokumente von kbob.admin.ch/de/gebaeudetechnik-und-gebaeudeautomation,
lokal in `docs/kbob/` (nicht versioniert). Inhalte werden sinngemäss mit
Quellenangabe übernommen, Strukturen und Prüfpunkte als Daten.

## Was die KBOB-Dokumente hergeben

| Dokument                        | Stand   | Für uns wichtig                                                                                                           |
| ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| Empfehlung BACnet 2021 V2.0     | 2021    | Objekttypen, Properties, Meldeklassen NC1–NC225, Prioritätsliste, Trends und COV-Schwellen, Kalender, GA-Funktionen, BBMD |
| Leitfaden BACnet 2021           | 2021    | Object_Name nach AKS, Device-ID-Struktur, Watchdog, Alarmkonzept, B-PAT                                                   |
| Beilagen T1, T2, C1, C2, E1, V1 | 2021    | Zustandstexte, Meldetexte, Prüf- und Testchecklisten, Entscheidungsmatrix                                                 |
| Empfehlung MSRL-Technik         | 2000    | Kennzeichnungssystem (AKS): ORT, BTA, APPARAT, FUNKTION; Notbedienung, Sicherheitsschalter, Schaltgerätekombination       |
| Empfehlung IKT-Sicherheit GA    | 2025    | Sicherheitsanforderungen an GA-Systeme                                                                                    |
| Empfehlung Gebäudetechnik       | 07/2026 | Anforderungen über alle Phasen, Kennzeichnung, Datenpunkte, Übergabe                                                      |
| Empfehlung Energie-Messkonzept  | älter   | Messstellen Q/R, Nummernbereiche nach Medium                                                                              |
| Elektrokabel, Funktionserhalt   | 2014    | Funktionserhalt und Brandverhalten von Kabeln                                                                             |
| UKV / GCC                       | 2012    | strukturierte Verkabelung                                                                                                 |
| Laborbauten                     | älter   | nur GA-relevante Teile                                                                                                    |

## Plan

### Phase 1 — BACnet nach KBOB

1. **Artikel «KBOB-Empfehlungen»** (Normen/Schweiz): wer die KBOB ist, welche Empfehlung wofür, Verbindlichkeit über Ausschreibung.
2. **Artikel «KBOB BACnet-Vorgaben»**: Objekttypen, Properties, Object_Name, Meldeklassen, Prioritäten, Trends, Kalender, GA-Funktionen, Netzwerk, Watchdog, Device-ID, EDE und B-PAT. BACnet-Artikel dagegen prüfen.
3. **Referenztabellen**:
   - KBOB-Meldeklassen (Kategorie, NC, Bedeutung, Beispiele, Quittierung)
   - Zustandstexte (T1) und Ereignismeldetexte (T2)
   - COV-Schwellen für Trends
   - Prioritätsliste der BACnet-Prioritätssteuerung nach KBOB
4. **Checklisten**: «BACnet-Vorgaben kontrollieren (KBOB C1)» und «BACnet-Funktionstest (KBOB C2)».

### Phase 2 — Generatoren (neuer Bereich «Generatoren»)

5. **AKS-Generator** nach KBOB/BBL: ORT (Wirtschaftseinheit, Objekt, Ebene), BTA (Art, Nummer), APPARAT (Art, Nummer), FUNKTION (Art, Nummer). Ausgabe als Kennzeichen `+NNNNAAX=ANN-ANNN:AN` und als BACnet-Object_Name `NNNN_AAX_ANN_ANNN_AN`. Mit Prüfung jeder Stelle und **Rückwärts-Zerleger**: Kennzeichen eingeben, Bedeutung jeder Stelle sehen.
6. **BACnet-Datenpunktlisten-Generator**: Anlage wählen, GA-Funktionen hinzufügen (Anlageschalter, Antrieb einstufig/stetig, Stellorgan, Messwert, Meldung …). Der Generator erzeugt je Funktion die BACnet-Objekte nach KBOB Kap. 7.2: Typ, Instanz, Object_Name aus dem AKS, Einheit, Meldeklasse, Zustandstexte, Trend mit COV-Schwelle, Priorität. Export als CSV und als **EDE-Datei**, Speichern im Objekt.
7. **Alarmliste** als Sicht des Generators: alle Objekte mit Meldeklasse, Texten und Quittierungspflicht, exportierbar.
8. **Device-ID-Planer** nach den Strukturbeispielen des Leitfadens, mit Prüfung auf Überschneidungen.

### Phase 3 — Weitere KBOB-Inhalte

9. **IKT-Sicherheit** in den Artikel Cybersecurity OT, dazu Checkliste «IKT-Sicherheit GA (KBOB)».
10. **Gebäudetechnik 2026** gegen unsere Planungs-, IBN- und Übergabe-Artikel abgleichen.
11. **Artikel «Anlagenkennzeichnung (AKS)»** aus MSRL-Technik; Notbedienung und Sicherheitsschalter mit Hand-0-Auto und Schützsteuerungen abgleichen.
12. **Energie-Messkonzept** in Energiemessung (Messstellen, Nummernkreise).
13. **Funktionserhalt von Kabeln** in Brandschutz und Entrauchung.
14. **UKV** in Netzwerk GA; **Laborbauten** nur, wo GA-relevant.

### Ideen darüber hinaus

- **EDE-Prüfer**: Eine EDE-Datei eines Unternehmers im Browser laden und gegen die KBOB-Regeln prüfen: Namen eindeutig und nach AKS, Längen, Einheiten, Meldeklassen gesetzt, Zustandstexte vorhanden. Bleibt lokal, nichts geht an den Server.
- **Bauherrenvorgaben-Assistent** nach Entscheidungsmatrix E1: Fragen durchgehen, am Ende eine Zusammenfassung der projektspezifischen BACnet-Vorgaben.
- Generatoren an **Objekte** anbinden, damit Listen pro Gebäude gespeichert und abgeglichen werden.

## Stand

- [x] Phase 1 (v0.20.0)
- [x] Phase 2 (AKS-Generator v0.21.0, Datenpunktliste mit Alarmliste und EDE v0.22.0, Device-ID-Prüfung im Bus-IBN-Konfigurator v0.23.0)
- [ ] Phase 3 (IKT-Sicherheit, AKS-Artikel, Hand-0-Auto v0.23.0)
