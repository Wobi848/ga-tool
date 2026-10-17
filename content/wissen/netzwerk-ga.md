---
title: Netzwerk-Grundlagen für die GA — VLANs, OT/IT
title_en: Network Fundamentals for BA — VLANs, OT/IT
slug: netzwerk-ga
category: it
subcategory: netzwerk
tags:
  [
    netzwerk,
    vlan,
    ot,
    it,
    ot-netzwerk,
    firewall,
    segmentierung,
    bacnet-ip,
    modbus-tcp,
    switch,
    router,
    ip-adresse,
    subnet,
    dmz,
    managed-switch,
    trunk,
    access-port
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [bacnet, opc-ua, mqtt, cybersecurity-ot, remote-zugriff, kbob]
norm: [IEC 62443, NIST SP 800-82, VDI/VDE 2182, EN 50173-1, KBOB UKV]
updated: 2026-10-17
lang: de
---

# Netzwerk-Grundlagen für die GA — VLANs, OT/IT

GA-Systeme laufen heute fast ausnahmslos auf IP-Netzwerken. Wer BACnet/IP oder Modbus TCP installiert, muss Netzwerkgrundlagen verstehen — sonst funktioniert die Anlage nicht und ist offen für Angriffe.

## OT vs. IT — Zwei Welten

| Kriterium         | IT-Netzwerk                 | OT-Netzwerk (GA/ICS)             |
| ----------------- | --------------------------- | -------------------------------- |
| Priorität         | Vertraulichkeit, Integrität | Verfügbarkeit, Echtzeit          |
| Update-Zyklen     | Regelmässig, automatisch    | Selten, getestet (System läuft!) |
| Betriebszeit      | Wartungsfenster möglich     | 24/7, kein Ausfall möglich       |
| Lebenszeit Geräte | 3–5 Jahre                   | 10–25 Jahre                      |
| Protokolle        | TCP/IP, HTTP, TLS           | BACnet, Modbus TCP, KNX/IP       |
| Sicherheitsdenken | CIA-Modell                  | Verfügbarkeit zuerst             |

**Wichtig:** OT und IT **müssen getrennt** sein — unterschiedliche Anforderungen, unterschiedliche Risiken.

---

## IP-Adressierung in der GA

### Typisches IP-Schema für ein Gebäude

| Netz             | Subnet       | Geräte                     |
| ---------------- | ------------ | -------------------------- |
| GLT / Management | 10.10.1.0/24 | GLT-Server, Workstations   |
| Automationsebene | 10.10.2.0/24 | DDC-Controller (BACnet/IP) |
| Feldebene (IP)   | 10.10.3.0/24 | IP-Gateways, Raumregler    |
| IoT / MQTT       | 10.10.4.0/24 | Sensoren, MQTT-Broker      |

**Subnetzgrössen:** /24 = 254 Geräte; /16 = 65534 Geräte. Für GA meist /24 ausreichend.

### Statische vs. DHCP-Adressen

**Empfehlung:** GA-Geräte immer **statische IP** vergeben oder DHCP-Reservierung (MAC → IP).

Warum? Bei Neustart des DHCP-Servers könnte sich IP ändern → BACnet-Geräte nicht mehr gefunden → Anlage läuft weiter aber GLT verliert Verbindung.

---

## VLANs — Virtuelle Netzwerke

**VLAN** (Virtual LAN) teilt ein physisches Netzwerk in logisch getrennte Teile auf. Geräte im selben VLAN können kommunizieren; VLAN-übergreifend nur via Router/Firewall.

### Warum VLANs in der GA?

| Ohne VLAN                                        | Mit VLAN                                         |
| ------------------------------------------------ | ------------------------------------------------ |
| BACnet-Broadcasts erreichen das ganze Netz       | BACnet-Verkehr bleibt im OT-VLAN                 |
| ein kompromittiertes Gerät erreicht alle anderen | die GLT erreicht die DDC nur über erlaubte Ports |
|                                                  | IT-Geräte sehen das OT-Netz nicht                |

### VLAN-Konfiguration (Grundprinzip)

**Access Port:** Gerät gehört zu einem VLAN

Beispiel: Der Switch-Port einer DDC ist Access-Port im VLAN 10, dem OT-Netz.

**Trunk Port:** Mehrere VLANs auf einem Port (Switch → Router)

Beispiel: Der Uplink vom Switch zum Router oder zur Firewall ist ein Trunk und trägt VLAN 10, 20 und 30, jedes mit seinem Tag.

---

## BACnet/IP — Besonderheiten im Netzwerk

### Broadcasts und BBMDs

BACnet/IP nutzt UDP-Broadcasts für Geräteerkennung (Who-Is / I-Am). Broadcasts werden von Routern **nicht** weitergeleitet → Geräte in verschiedenen Subnetzen finden sich nicht.

**BBMD** (BACnet Broadcast Management Device): Gerät das Broadcasts zwischen Subnetzen weiterleitet. Meist in GLT oder DDC integriert.

BBMD A, etwa der GLT-Server im Netz 10.10.2.0/24, und BBMD B, etwa ein IP-Gateway im Netz 10.10.3.0/24, kennen sich über ihre Broadcast Distribution Table und leiten Broadcasts gegenseitig weiter.

### BACnet-UDP-Port

- Standard: **47808 (0xBAC0)** — muss auf Firewall freigegeben sein
- Eingehend und ausgehend (bidirektional)

---

## Modbus TCP — Netzwerkanforderungen

- Port **502/TCP**
- Keine Broadcast-Probleme (TCP, unicast)
- Master fragt immer → Slave antwortet
- Timeout: 1–5 Sekunden (danach Verbindungsfehler im DDC)
- Firewall: Port 502 von DDC zu Modbus-Gerät freigeben

---

## Managed Switch — das Rückgrat

Für GA-Netzwerke immer **Managed Switches** verwenden:

| Funktion                  | Unmanaged | Managed       |
| ------------------------- | --------- | ------------- |
| VLAN                      | ❌        | ✅            |
| Port-Statistiken          | ❌        | ✅            |
| SNMP-Monitoring           | ❌        | ✅            |
| Port-Mirroring            | ❌        | ✅            |
| Loop-Schutz (STP)         | Nein      | ✅ (wichtig!) |
| PoE (Power over Ethernet) | Nein      | ✅ Optional   |

**Empfohlene Hersteller:** Cisco, HP/Aruba, Hirschmann (Industrie), Siemens SCALANCE, Moxa.

---

## Netzwerk-Segmentierungskonzept GA

| Zone                  | Inhalt                                                     |
| --------------------- | ---------------------------------------------------------- |
| Internet              | nur über die Firewall                                      |
| IT-Netz, eigenes VLAN | Büro, PCs, Server                                          |
| OT-Netz, eigenes VLAN | GLT, DDC, Gateways; nur explizit erlaubte Verbindungen     |
| Fernzugang            | nur über VPN mit starker Authentisierung, nie direkt offen |

Das Default-VLAN 1 wird nicht für Nutzdaten verwendet. Ein GLT-Webinterface gehört nicht offen ins Internet, auch nicht in eine DMZ; der Zugriff von aussen läuft über VPN.

**Firewall-Regeln (Beispiel):**

- GLT → DDC: Erlaube UDP 47808 (BACnet)
- DDC → GLT: Erlaube UDP 47808 (BACnet-Antworten)
- IT → OT: BLOCKIERT (ausser Wartungsrechner via VPN)
- OT → Internet: BLOCKIERT

---

## Typische GA-Netzwerk-Fehler

| Fehler                     | Symptom                              | Lösung                                |
| -------------------------- | ------------------------------------ | ------------------------------------- |
| Kein BBMD konfiguriert     | DDC in anderem Subnet nicht gefunden | BBMD in GLT und DDC einrichten        |
| Falsche Subnetzmaske       | Keine Kommunikation                  | Maske nach IP-Plan einheitlich setzen |
| Broadcast-Storm (Loop)     | Netzwerk hängt                       | STP aktivieren auf Switches           |
| IP-Konflikt                | Gerät erreichbar aber falsch         | Statische IPs oder DHCP-Reservierung  |
| OT-Port direkt am Internet | Sicherheitsrisiko                    | Firewall, VPN, nie direkt!            |

## Verkabelung nach KBOB (UKV)

Die KBOB-Empfehlung «Universelle Kommunikationsverkabelung» (Ausgabe 3, 2012) regelt die strukturierte Verkabelung öffentlicher Bauten. Für die GA wichtig:

- **Die UKV ist nur für IP-Netze und Sprache da.** Die Verdrahtung der MSRL-Feldebene (Feldbusse), Storensteuerungen und konventionelles TV gehören nicht dazu und bekommen eigene Installationssysteme. Das IP-Netz der Leitebene und der Automationsstationen darf dagegen die UKV nutzen; im Mengengerüst sind die technischen IT-Anwendungen wie das Leitsystem ausdrücklich mitzuzählen.
- **Aufbau:** Stern nach EN 50173-1. Backbone mit Glasfaser, Singlemode OS2 und Multimode mindestens OM3; Etagenverkabelung S/FTP Kategorie 7 mit geschirmten RJ45-Buchsen Kategorie 6A, Permanent Link Klasse EA. Die Kombination Kat. 7 / Kat. 6A gibt eine Systemreserve.
- **Kommunikationsräume** getrennt und abschliessbar, nicht gemischt mit Haustechnik- oder EDV-Räumen. Nur die Leitungen, die der Raum selbst braucht.
- **Raumklima:** 10–26 °C, 20–60 % relative Feuchte ohne Kondensation. Als Abwärme rechnet die KBOB mit 1–3 W pro Gigabit-Port mit PoE, also 100–300 W pro 100 Ports. **Ab 500 W Lüftung oder Kühlung prüfen.** Diese Kühlung und ihre Störmeldung gehören dann in die GA.
- **Steigzonen** auf 300 % dimensionieren, also mit 200 % Reserve.

Die Werte stammen von 2012. Mit PoE++ für Leuchten oder Kameras kann die Abwärme im Verteiler deutlich höher sein; nachrechnen.

## Normen

- **IEC 62443** — Industrie-Cybersecurity (OT/ICS)
- **NIST SP 800-82** — Guide to ICS Security
- **VDI/VDE 2182** — IT-Sicherheit in der Fabrikautomation (übertragbar auf GA)

<!-- EN -->

BA systems today run almost exclusively on IP networks. Anyone installing BACnet/IP or Modbus TCP must understand network fundamentals — otherwise the installation won't work and will be open to attack.

## OT vs. IT — Two Worlds

| Criterion         | IT network                   | OT network (BA/ICS)               |
| ----------------- | ---------------------------- | --------------------------------- |
| Priority          | Confidentiality, integrity   | Availability, real-time           |
| Update cycles     | Regular, automatic           | Rare, tested (system is running!) |
| Operating time    | Maintenance windows possible | 24/7, no failure tolerated        |
| Device lifetime   | 3–5 years                    | 10–25 years                       |
| Protocols         | TCP/IP, HTTP, TLS            | BACnet, Modbus TCP, KNX/IP        |
| Security thinking | CIA model                    | Availability first                |

**Important:** OT and IT **must be separated** — different requirements, different risks.

---

## IP Addressing in BA

### Typical IP Schema for a Building

| Network          | Subnet       | Devices                       |
| ---------------- | ------------ | ----------------------------- |
| BMS / management | 10.10.1.0/24 | BMS server, workstations      |
| Automation level | 10.10.2.0/24 | DDC controllers (BACnet/IP)   |
| Field level (IP) | 10.10.3.0/24 | IP gateways, room controllers |
| IoT / MQTT       | 10.10.4.0/24 | Sensors, MQTT broker          |

**Subnet sizes:** /24 = 254 devices; /16 = 65,534 devices. For BA, /24 is usually sufficient.

### Static vs. DHCP Addresses

**Recommendation:** Always assign **static IPs** to BA devices or use DHCP reservation (MAC → IP).

Why? If the DHCP server restarts, the IP might change → BACnet devices no longer found → installation keeps running but BMS loses connection.

---

## VLANs — Virtual Networks

**VLAN** (Virtual LAN) divides a physical network into logically separate segments. Devices in the same VLAN can communicate; cross-VLAN communication only via router/firewall.

### Why VLANs in BA?

| Without VLAN                              | With VLAN                                      |
| ----------------------------------------- | ---------------------------------------------- |
| BACnet broadcasts reach the whole network | BACnet traffic stays in the OT VLAN            |
| a compromised device reaches all others   | the BMS reaches the DDC only via allowed ports |
|                                           | IT devices do not see the OT network           |

### VLAN Configuration (Basic Principle)

**Access port:** Device belongs to one VLAN

Example: the switch port of a DDC is an access port in VLAN 10, the OT network.

**Trunk port:** Multiple VLANs on one port (switch → router)

Example: the uplink from switch to router or firewall is a trunk and carries VLANs 10, 20 and 30, each with its tag.

---

## BACnet/IP — Network Specifics

### Broadcasts and BBMDs

BACnet/IP uses UDP broadcasts for device discovery (Who-Is / I-Am). Broadcasts are **not** forwarded by routers → devices on different subnets cannot find each other.

**BBMD** (BACnet Broadcast Management Device): device that forwards broadcasts between subnets. Usually integrated in the BMS or DDC.

BBMD A, for example the BMS server in 10.10.2.0/24, and BBMD B, for example an IP gateway in 10.10.3.0/24, know each other through their broadcast distribution table and forward broadcasts to each other.

### BACnet UDP Port

- Standard: **47808 (0xBAC0)** — must be permitted on firewall
- Inbound and outbound (bidirectional)

---

## Modbus TCP — Network Requirements

- Port **502/TCP**
- No broadcast issues (TCP, unicast)
- Master always requests → slave responds
- Timeout: 1–5 seconds (then connection error in DDC)
- Firewall: permit port 502 from DDC to Modbus device

---

## Managed Switch — the Backbone

Always use **managed switches** for BA networks:

| Function                  | Unmanaged | Managed         |
| ------------------------- | --------- | --------------- |
| VLAN                      | ❌        | ✅              |
| Port statistics           | ❌        | ✅              |
| SNMP monitoring           | ❌        | ✅              |
| Port mirroring            | ❌        | ✅              |
| Loop protection (STP)     | No        | ✅ (important!) |
| PoE (Power over Ethernet) | No        | ✅ optional     |

**Recommended manufacturers:** Cisco, HP/Aruba, Hirschmann (industrial), Siemens SCALANCE, Moxa.

---

## Network Segmentation Concept for BA

| Zone                 | Content                                                      |
| -------------------- | ------------------------------------------------------------ |
| Internet             | only via the firewall                                        |
| IT network, own VLAN | offices, PCs, servers                                        |
| OT network, own VLAN | BMS, DDC, gateways; only explicitly allowed connections      |
| Remote access        | only via VPN with strong authentication, never directly open |

The default VLAN 1 is not used for payload traffic. A BMS web interface does not belong openly on the internet, not even in a DMZ; access from outside goes via VPN.

**Firewall rules (example):**

- BMS → DDC: permit UDP 47808 (BACnet)
- DDC → BMS: permit UDP 47808 (BACnet responses)
- IT → OT: BLOCKED (except maintenance PC via VPN)
- OT → Internet: BLOCKED

---

## Typical BA Network Errors

| Error                        | Symptom                       | Solution                              |
| ---------------------------- | ----------------------------- | ------------------------------------- |
| No BBMD configured           | DDC on other subnet not found | Set up BBMD in BMS and DDC            |
| Wrong subnet mask            | No communication              | Set the mask consistently per IP plan |
| Broadcast storm (loop)       | Network hangs                 | Enable STP on switches                |
| IP conflict                  | Device reachable but wrong    | Static IPs or DHCP reservation        |
| OT port directly on internet | Security risk                 | Firewall, VPN, never direct!          |

## Cabling per KBOB (Universal Communication Cabling)

The KBOB recommendation "Universal communication cabling" (edition 3, 2012) governs structured cabling in public buildings. Important for BA:

- **Universal cabling is only for IP networks and voice.** Field-level BA wiring (field buses), blind controls and conventional TV are not part of it and get their own installation systems. The IP network of the management level and automation stations may use it; the quantity survey explicitly includes technical IT applications such as the management system.
- **Structure:** star per EN 50173-1. Backbone in optical fibre, singlemode OS2 and multimode at least OM3; floor cabling S/FTP category 7 with shielded RJ45 outlets category 6A, permanent link class EA. The combination cat. 7 / cat. 6A provides a system reserve.
- **Communication rooms** separate and lockable, not shared with building services or IT rooms. Only the lines the room itself needs.
- **Room climate:** 10–26 °C, 20–60 % relative humidity without condensation. KBOB assumes 1–3 W of waste heat per gigabit port with PoE, i.e. 100–300 W per 100 ports. **From 500 W check ventilation or cooling.** This cooling and its fault alarm then belong in BA.
- **Risers** sized to 300 %, i.e. with 200 % reserve.

The values date from 2012. With PoE++ for luminaires or cameras the waste heat in the distributor can be much higher; recalculate.

## Standards

- **IEC 62443** — Industrial cybersecurity (OT/ICS)
- **NIST SP 800-82** — Guide to ICS security
- **VDI/VDE 2182** — IT security in factory automation (applicable to BA)
