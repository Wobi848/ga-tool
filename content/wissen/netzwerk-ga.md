---
title: Netzwerk-Grundlagen für die GA — VLANs, OT/IT
title_en: Network Fundamentals for BA — VLANs, OT/IT
slug: netzwerk-ga
category: it
subcategory: netzwerk
tags: [netzwerk, vlan, ot, it, ot-netzwerk, firewall, segmentierung, bacnet-ip, modbus-tcp, switch, router, ip-adresse, subnet, dmz, managed-switch, trunk, access-port]
difficulty: fortgeschritten
area: [ga, it]
related: [bacnet, opc-ua, mqtt, cybersecurity-ot, remote-zugriff]
norm: [IEC 62443, NIST SP 800-82, VDI/VDE 2182]
updated: 2026-05-14
lang: de
---

# Netzwerk-Grundlagen für die GA — VLANs, OT/IT

GA-Systeme laufen heute fast ausnahmslos auf IP-Netzwerken. Wer BACnet/IP oder Modbus TCP installiert, muss Netzwerkgrundlagen verstehen — sonst funktioniert die Anlage nicht und ist offen für Angriffe.

## OT vs. IT — Zwei Welten

| Kriterium          | IT-Netzwerk                    | OT-Netzwerk (GA/ICS)            |
|--------------------|-------------------------------|----------------------------------|
| Priorität          | Vertraulichkeit, Integrität   | Verfügbarkeit, Echtzeit         |
| Update-Zyklen      | Regelmässig, automatisch      | Selten, getestet (System läuft!) |
| Betriebszeit       | Wartungsfenster möglich       | 24/7, kein Ausfall möglich       |
| Lebenszeit Geräte  | 3–5 Jahre                     | 10–25 Jahre                     |
| Protokolle         | TCP/IP, HTTP, TLS              | BACnet, Modbus TCP, KNX/IP       |
| Sicherheitsdenken  | CIA-Modell                    | Verfügbarkeit zuerst             |

**Wichtig:** OT und IT **müssen getrennt** sein — unterschiedliche Anforderungen, unterschiedliche Risiken.

---

## IP-Adressierung in der GA

### Typisches IP-Schema für ein Gebäude

| Netz               | Subnet           | Geräte                          |
|--------------------|------------------|---------------------------------|
| GLT / Management   | 10.10.1.0/24     | GLT-Server, Workstations        |
| Automationsebene   | 10.10.2.0/24     | DDC-Controller (BACnet/IP)      |
| Feldebene (IP)     | 10.10.3.0/24     | IP-Gateways, Raumregler          |
| IoT / MQTT         | 10.10.4.0/24     | Sensoren, MQTT-Broker           |

**Subnetzgrössen:** /24 = 254 Geräte; /16 = 65534 Geräte. Für GA meist /24 ausreichend.

### Statische vs. DHCP-Adressen

**Empfehlung:** GA-Geräte immer **statische IP** vergeben oder DHCP-Reservierung (MAC → IP).

Warum? Bei Neustart des DHCP-Servers könnte sich IP ändern → BACnet-Geräte nicht mehr gefunden → Anlage läuft weiter aber GLT verliert Verbindung.

---

## VLANs — Virtuelle Netzwerke

**VLAN** (Virtual LAN) teilt ein physisches Netzwerk in logisch getrennte Teile auf. Geräte im selben VLAN können kommunizieren; VLAN-übergreifend nur via Router/Firewall.

### Warum VLANs in der GA?

```
Ohne VLAN:
  BACnet-Broadcast fliesst durch ganzes Netz → überlastet andere Geräte
  Ein kompromittiertes Gerät kann alle anderen erreichen

Mit VLAN:
  BACnet-Traffic bleibt im OT-VLAN
  GLT kann DDCs erreichen (Router, erlaubte Ports)
  IT-Geräte sehen OT-Netz nicht
```

### VLAN-Konfiguration (Grundprinzip)

**Access Port:** Gerät gehört zu einem VLAN

```
Switch-Port → DDC-Controller → Access VLAN 10 (OT-Netz)
```

**Trunk Port:** Mehrere VLANs auf einem Port (Switch → Router)

```
Switch-Uplink → Router (Trunk): VLAN 10, VLAN 20, VLAN 30 → alle tragen ihr Tag
```

---

## BACnet/IP — Besonderheiten im Netzwerk

### Broadcasts und BBMDs

BACnet/IP nutzt UDP-Broadcasts für Geräteerkennung (Who-Is / I-Am). Broadcasts werden von Routern **nicht** weitergeleitet → Geräte in verschiedenen Subnetzen finden sich nicht.

**BBMD** (BACnet Broadcast Management Device): Gerät das Broadcasts zwischen Subnetzen weiterleitet. Meist in GLT oder DDC integriert.

```
Subnetz 10.10.2.x:  BBMD-A (z.B. GLT-Server)
Subnetz 10.10.3.x:  BBMD-B (z.B. IP-Gateway)

BBMD-A und BBMD-B kennen sich (Peer-Liste) → leiten Broadcasts weiter
```

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

| Funktion        | Unmanaged    | Managed        |
|-----------------|--------------|----------------|
| VLAN            | ❌           | ✅             |
| Port-Statistiken | ❌          | ✅             |
| SNMP-Monitoring | ❌           | ✅             |
| Port-Mirroring  | ❌           | ✅             |
| Loop-Schutz (STP) | Nein       | ✅ (wichtig!)  |
| PoE (Power over Ethernet) | Nein | ✅ Optional |

**Empfohlene Hersteller:** Cisco, HP/Aruba, Hirschmann (Industrie), Siemens SCALANCE, Moxa.

---

## Netzwerk-Segmentierungskonzept GA

```
Internet
    ↓
[Firewall]
    ├── IT-Netz (VLAN 1): Büro, PCs, Server
    │       └── [DMZ]: GLT-Webinterface (von aussen erreichbar)
    └── OT-Netz (VLAN 10): DDC-Controller, Feldbusgeräte
            └── Kommunikation GLT↔DDC nur über explizit erlaubte Ports
```

**Firewall-Regeln (Beispiel):**
- GLT → DDC: Erlaube UDP 47808 (BACnet)
- DDC → GLT: Erlaube UDP 47808 (BACnet-Antworten)
- IT → OT: BLOCKIERT (ausser Wartungsrechner via VPN)
- OT → Internet: BLOCKIERT

---

## Typische GA-Netzwerk-Fehler

| Fehler                         | Symptom                         | Lösung                          |
|--------------------------------|----------------------------------|---------------------------------|
| Kein BBMD konfiguriert         | DDC in anderem Subnet nicht gefunden | BBMD in GLT und DDC einrichten |
| Falscher Subnet-Mask           | Keine Kommunikation             | /24 auf allen Geräten                |
| Broadcast-Storm (Loop)         | Netzwerk hängt                  | STP aktivieren auf Switches     |
| IP-Konflikt                    | Gerät erreichbar aber falsch    | Statische IPs oder DHCP-Reservierung |
| OT-Port direkt am Internet     | Sicherheitsrisiko               | Firewall, VPN, nie direkt!      |

## Normen

- **IEC 62443** — Industrie-Cybersecurity (OT/ICS)
- **NIST SP 800-82** — Guide to ICS Security
- **VDI/VDE 2182** — IT-Sicherheit in der Fabrikautomation (übertragbar auf GA)

<!-- EN -->

BA systems today run almost exclusively on IP networks. Anyone installing BACnet/IP or Modbus TCP must understand network fundamentals — otherwise the installation won't work and will be open to attack.

## OT vs. IT — Two Worlds

| Criterion | IT network | OT network (BA/ICS) |
|----------|-----------|-------------------|
| Priority | Confidentiality, integrity | Availability, real-time |
| Update cycles | Regular, automatic | Rare, tested (system is running!) |
| Operating time | Maintenance windows possible | 24/7, no failure tolerated |
| Device lifetime | 3–5 years | 10–25 years |
| Protocols | TCP/IP, HTTP, TLS | BACnet, Modbus TCP, KNX/IP |
| Security thinking | CIA model | Availability first |

**Important:** OT and IT **must be separated** — different requirements, different risks.

---

## IP Addressing in BA

### Typical IP Schema for a Building

| Network | Subnet | Devices |
|---------|--------|--------|
| BMS / management | 10.10.1.0/24 | BMS server, workstations |
| Automation level | 10.10.2.0/24 | DDC controllers (BACnet/IP) |
| Field level (IP) | 10.10.3.0/24 | IP gateways, room controllers |
| IoT / MQTT | 10.10.4.0/24 | Sensors, MQTT broker |

**Subnet sizes:** /24 = 254 devices; /16 = 65,534 devices. For BA, /24 is usually sufficient.

### Static vs. DHCP Addresses

**Recommendation:** Always assign **static IPs** to BA devices or use DHCP reservation (MAC → IP).

Why? If the DHCP server restarts, the IP might change → BACnet devices no longer found → installation keeps running but BMS loses connection.

---

## VLANs — Virtual Networks

**VLAN** (Virtual LAN) divides a physical network into logically separate segments. Devices in the same VLAN can communicate; cross-VLAN communication only via router/firewall.

### Why VLANs in BA?

```
Without VLAN:
  BACnet broadcast flows through the entire network → overloads other devices
  A compromised device can reach all others

With VLAN:
  BACnet traffic stays in the OT VLAN
  BMS can reach DDCs (router, permitted ports)
  IT devices cannot see the OT network
```

### VLAN Configuration (Basic Principle)

**Access port:** Device belongs to one VLAN

```
Switch port → DDC controller → Access VLAN 10 (OT network)
```

**Trunk port:** Multiple VLANs on one port (switch → router)

```
Switch uplink → router (trunk): VLAN 10, VLAN 20, VLAN 30 → all carry their tag
```

---

## BACnet/IP — Network Specifics

### Broadcasts and BBMDs

BACnet/IP uses UDP broadcasts for device discovery (Who-Is / I-Am). Broadcasts are **not** forwarded by routers → devices on different subnets cannot find each other.

**BBMD** (BACnet Broadcast Management Device): device that forwards broadcasts between subnets. Usually integrated in the BMS or DDC.

```
Subnet 10.10.2.x:  BBMD-A (e.g. BMS server)
Subnet 10.10.3.x:  BBMD-B (e.g. IP gateway)

BBMD-A and BBMD-B know each other (peer list) → forward broadcasts
```

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

| Function | Unmanaged | Managed |
|---------|---------|--------|
| VLAN | ❌ | ✅ |
| Port statistics | ❌ | ✅ |
| SNMP monitoring | ❌ | ✅ |
| Port mirroring | ❌ | ✅ |
| Loop protection (STP) | No | ✅ (important!) |
| PoE (Power over Ethernet) | No | ✅ optional |

**Recommended manufacturers:** Cisco, HP/Aruba, Hirschmann (industrial), Siemens SCALANCE, Moxa.

---

## Network Segmentation Concept for BA

```
Internet
    ↓
[Firewall]
    ├── IT network (VLAN 1): offices, PCs, servers
    │       └── [DMZ]: BMS web interface (accessible from outside)
    └── OT network (VLAN 10): DDC controllers, fieldbus devices
            └── BMS↔DDC communication only via explicitly permitted ports
```

**Firewall rules (example):**
- BMS → DDC: permit UDP 47808 (BACnet)
- DDC → BMS: permit UDP 47808 (BACnet responses)
- IT → OT: BLOCKED (except maintenance PC via VPN)
- OT → Internet: BLOCKED

---

## Typical BA Network Errors

| Error | Symptom | Solution |
|-------|---------|---------|
| No BBMD configured | DDC on other subnet not found | Set up BBMD in BMS and DDC |
| Wrong subnet mask | No communication | /24 on all devices |
| Broadcast storm (loop) | Network hangs | Enable STP on switches |
| IP conflict | Device reachable but wrong | Static IPs or DHCP reservation |
| OT port directly on internet | Security risk | Firewall, VPN, never direct! |

## Standards

- **IEC 62443** — Industrial cybersecurity (OT/ICS)
- **NIST SP 800-82** — Guide to ICS security
- **VDI/VDE 2182** — IT security in factory automation (applicable to BA)
