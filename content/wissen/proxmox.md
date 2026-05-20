---
title: Proxmox — Virtualisierung für GA-Server
title_en: Proxmox — Virtualisation for BA Servers
slug: proxmox
category: it
subcategory: infrastruktur
tags: [proxmox, virtualisierung, vm, lxc, container, hypervisor, kvm, ha, hochverfügbarkeit, snapshot, backup, ga-server, glt-server, iot, linux, debian]
difficulty: fortgeschritten
area: [ga, it]
related: [docker-ga, backup-ga, netzwerk-ga, remote-zugriff, cybersecurity-ot, glt-grundlagen]
norm: []
updated: 2026-05-15
lang: de
---

# Proxmox — Virtualisierung für GA-Server

Proxmox VE (Virtual Environment) ist eine Open-Source-Virtualisierungsplattform für GA-Server. Es erlaubt das Betreiben mehrerer virtueller Maschinen (VMs) und Container (LXC) auf einer Hardware.

## Warum Proxmox in der GA?

```
Traditionell:
  GLT-Server    → dedizierte Hardware
  OPC-UA-Server → dedizierte Hardware
  Historian      → dedizierte Hardware
  MQTT-Broker    → dedizierte Hardware
  = 4 physische Server, 4 × Strom, Wartung, Ausfallrisiken

Mit Proxmox:
  1 physischer Server → 4 VMs / Container
  → Weniger Hardware, günstigere Wartung
  → Snapshots und Backups einfach
  → Testumgebungen ohne separate Hardware
```

---

## Architektur

```
Proxmox Host (Bare Metal)
  ├── VM 1: GLT-Server (Windows Server 2022 / Desigo CC)
  ├── VM 2: Historian (Linux / InfluxDB + Grafana)
  ├── LXC 3: MQTT-Broker (Mosquitto)
  ├── LXC 4: Node-RED (IoT-Flows)
  └── LXC 5: WireGuard VPN (Fernzugriff)
```

### VMs vs. LXC Container

| Merkmal          | VM (KVM)                    | LXC Container            |
|------------------|-----------------------------|--------------------------|
| Betriebssystem   | Vollständig (Windows/Linux) | Nur Linux                |
| Isolation        | Sehr stark                  | Mittel                   |
| Performance      | Overhead ~5–10 %            | Minimal (fast nativ)     |
| Ressourcen       | Mehr RAM/CPU nötig          | Wenig Overhead           |
| Einsatz          | Windows-Anwendungen         | Linux-Dienste            |

---

## Wichtige Proxmox-Funktionen für GA

### Snapshots

```
Vor Systemupdates / Softwareänderungen:
  1. Snapshot erstellen (30 Sekunden)
  2. Update durchführen
  3. Bei Fehler: Snapshot zurückspielen (5 Minuten)
  
CLI:
  qm snapshot <VMID> <snapname> --description "vor Update 2026-05"
  qm rollback <VMID> <snapname>
```

### Backups (PBS = Proxmox Backup Server)

```
Backup-Strategie (3-2-1 Regel):
  Täglich: Inkrementelles Backup aller VMs → PBS (lokal)
  Wöchentlich: PBS → Offsite (NAS, Cloud)
  
  Backup-Kommando (CLI):
  vzdump <VMID> --storage PBS --compress zstd --mode snapshot
  
  Retention:
    Täglich: 7 Kopien
    Wöchentlich: 4 Kopien
    Monatlich: 6 Kopien
```

### Hochverfügbarkeit (HA-Cluster)

Für kritische GLT-Server (Spitäler, Rechenzentren):

```
Proxmox-Cluster (3 Nodes):
  Node 1: VM läuft hier
  Node 2: Warm-Standby
  Node 3: Quorum (Tie-Breaker)
  
  Bei Ausfall Node 1:
    → VM wird automatisch auf Node 2 gestartet
    → Downtime: 30–120 Sekunden
```

---

## Hardware-Empfehlung GA-Server

```
Kleine Anlage (< 5000 Datenpunkte):
  CPU: Intel i5/i7 oder AMD Ryzen (6–8 Kerne)
  RAM: 32 GB ECC
  SSD: 500 GB NVMe (System + VMs)
  HDD: 2 TB SATA RAID1 (Daten / Backups)
  
Mittlere Anlage (5.000–50.000 Datenpunkte):
  CPU: Xeon E-2300 oder AMD EPYC
  RAM: 64–128 GB ECC
  SSD: 2 × 1 TB NVMe (RAID1 für VMs)
  HDD: 4 × 4 TB RAID5 (Historian-Daten)
  
Betriebsumgebung:
  Lüftung: mind. 20 dB(A) ruhig (Serverraum)
  USV (UPS): mindestens 30 min Laufzeit
  Temperatur: 15–25 °C, keine Kondenswasser
```

---

## Netzwerk-Konfiguration

```
Proxmox Netzwerk-Setup GA:

  eth0 (Bond mit eth1):  Management-Netz (IT, Admin)
  Bond0:                 VM-Bridge

  vmbr0: VLAN 10 (IT-Netz, GLT-Web-Interface)
  vmbr1: VLAN 20 (OT-Netz, DDC-Kommunikation BACnet)
  vmbr2: VLAN 30 (Management, Proxmox-GUI)
  
  Firewall Proxmox:
    VM GLT darf nur VLAN 20 (OT) und VLAN 10 (IT mit Restriktionen)
    Kein direkter Internet-Zugang aus VLAN 20 (OT)
```

---

## Typische GA-Dienste auf Proxmox

| Container / VM     | Software                    | Ressourcen      |
|--------------------|----------------------------|-----------------|
| GLT-Server         | Desigo CC / Niagara / EBI  | 4 vCPU, 16 GB  |
| Historian          | InfluxDB 2.x               | 2 vCPU, 8 GB   |
| Dashboard          | Grafana                    | 1 vCPU, 2 GB   |
| MQTT-Broker        | Mosquitto                  | 1 vCPU, 512 MB |
| IoT-Gateway        | Node-RED                   | 1 vCPU, 1 GB   |
| VPN                | WireGuard                  | 1 vCPU, 256 MB |
| DNS / DHCP         | Pi-hole + dnsmasq          | 1 vCPU, 512 MB |

<!-- EN -->

Proxmox VE (Virtual Environment) is an open-source virtualisation platform for BA servers. It allows multiple virtual machines (VMs) and containers (LXC) to run on a single piece of hardware.

## Why Proxmox in BA?

```
Traditional approach:
  BMS server     → dedicated hardware
  OPC UA server  → dedicated hardware
  Historian      → dedicated hardware
  MQTT broker    → dedicated hardware
  = 4 physical servers, 4× power, maintenance, failure risks

With Proxmox:
  1 physical server → 4 VMs / containers
  → Less hardware, lower maintenance cost
  → Snapshots and backups are straightforward
  → Test environments without separate hardware
```

---

## Architecture

```
Proxmox host (bare metal)
  ├── VM 1: BMS server (Windows Server 2022 / Desigo CC)
  ├── VM 2: Historian (Linux / InfluxDB + Grafana)
  ├── LXC 3: MQTT broker (Mosquitto)
  ├── LXC 4: Node-RED (IoT flows)
  └── LXC 5: WireGuard VPN (remote access)
```

### VMs vs. LXC Containers

| Feature | VM (KVM) | LXC container |
|---------|---------|--------------|
| Operating system | Full (Windows/Linux) | Linux only |
| Isolation | Very strong | Medium |
| Performance | ~5–10 % overhead | Minimal (near-native) |
| Resources | More RAM/CPU needed | Low overhead |
| Application | Windows applications | Linux services |

---

## Key Proxmox Features for BA

### Snapshots

```
Before system updates / software changes:
  1. Create snapshot (30 seconds)
  2. Perform update
  3. On failure: roll back snapshot (5 minutes)
  
CLI:
  qm snapshot <VMID> <snapname> --description "before update 2026-05"
  qm rollback <VMID> <snapname>
```

### Backups (PBS = Proxmox Backup Server)

```
Backup strategy (3-2-1 rule):
  Daily: incremental backup of all VMs → PBS (local)
  Weekly: PBS → offsite (NAS, cloud)
  
  Backup command (CLI):
  vzdump <VMID> --storage PBS --compress zstd --mode snapshot
  
  Retention:
    Daily: 7 copies
    Weekly: 4 copies
    Monthly: 6 copies
```

### High Availability (HA Cluster)

For critical BMS servers (hospitals, data centres):

```
Proxmox cluster (3 nodes):
  Node 1: VM running here
  Node 2: warm standby
  Node 3: quorum (tie-breaker)
  
  On Node 1 failure:
    → VM is automatically started on Node 2
    → Downtime: 30–120 seconds
```

---

## Hardware Recommendations — BA Server

```
Small installation (< 5,000 data points):
  CPU: Intel i5/i7 or AMD Ryzen (6–8 cores)
  RAM: 32 GB ECC
  SSD: 500 GB NVMe (system + VMs)
  HDD: 2 TB SATA RAID1 (data / backups)
  
Medium installation (5,000–50,000 data points):
  CPU: Xeon E-2300 or AMD EPYC
  RAM: 64–128 GB ECC
  SSD: 2 × 1 TB NVMe (RAID1 for VMs)
  HDD: 4 × 4 TB RAID5 (historian data)
  
Operating environment:
  Ventilation: min. 20 dB(A) quiet (server room)
  UPS: at least 30 min runtime
  Temperature: 15–25 °C, no condensation
```

---

## Network Configuration

```
Proxmox network setup — BA:

  eth0 (bonded with eth1): management network (IT, admin)
  Bond0:                   VM bridge

  vmbr0: VLAN 10 (IT network, BMS web interface)
  vmbr1: VLAN 20 (OT network, DDC communication BACnet)
  vmbr2: VLAN 30 (management, Proxmox GUI)
  
  Proxmox firewall:
    BMS VM may only access VLAN 20 (OT) and VLAN 10 (IT with restrictions)
    No direct internet access from VLAN 20 (OT)
```

---

## Typical BA Services on Proxmox

| Container / VM | Software | Resources |
|--------------|---------|---------|
| BMS server | Desigo CC / Niagara / EBI | 4 vCPU, 16 GB |
| Historian | InfluxDB 2.x | 2 vCPU, 8 GB |
| Dashboard | Grafana | 1 vCPU, 2 GB |
| MQTT broker | Mosquitto | 1 vCPU, 512 MB |
| IoT gateway | Node-RED | 1 vCPU, 1 GB |
| VPN | WireGuard | 1 vCPU, 256 MB |
| DNS / DHCP | Pi-hole + dnsmasq | 1 vCPU, 512 MB |
