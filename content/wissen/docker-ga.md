---
title: Docker in der GA — Container für GLT-Dienste
title_en: Docker in BA — Containers for BMS Services
slug: docker-ga
category: it
subcategory: infrastruktur
tags: [docker, container, docker-compose, image, microservices, influxdb, grafana, mosquitto, node-red, portainer, gitlab, reverse-proxy, traefik, nginx, ga-server, iot, mqtt]
difficulty: fortgeschritten
area: [ga, it]
related: [proxmox, backup-ga, netzwerk-ga, mqtt, cybersecurity-ot, trending-historisierung]
norm: []
updated: 2026-05-15
lang: de
---

# Docker in der GA — Container für GLT-Dienste

Docker-Container ermöglichen das Betreiben von GA-Diensten (Historian, Dashboard, MQTT, etc.) isoliert, portabel und einfach wartbar. Sie sind besonders für den offenen GA-Stack (ohne proprietäre GLT) verbreitet.

## Warum Docker in der GA?

```
Problem ohne Docker:
  "Es lief auf meinem Laptop, aber nicht auf dem Server"
  Abhängigkeiten: Python 3.8 vs. 3.11, Node.js 14 vs. 18
  Updates brechen andere Dienste
  
Mit Docker:
  Jeder Dienst = eigener Container = eigene Abhängigkeiten
  Läuft überall gleich (Laptop, Server, Cloud)
  Updates ohne Risiko für andere Dienste
  Rollback: einfach altes Image starten
```

---

## Typischer GA-Stack mit Docker Compose

```yaml
# docker-compose.yml — GA Monitoring Stack

version: '3.8'

services:
  # MQTT Broker (GA-Geräte → Broker)
  mosquitto:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
      - "8883:8883"  # TLS
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
    restart: unless-stopped

  # IoT-Flow Engine (M-Bus, Modbus → MQTT → InfluxDB)
  node-red:
    image: nodered/node-red:3
    ports:
      - "1880:1880"
    volumes:
      - ./node-red-data:/data
    depends_on:
      - mosquitto
    restart: unless-stopped

  # Zeitreihendatenbank
  influxdb:
    image: influxdb:2
    ports:
      - "8086:8086"
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: ${INFLUX_PASSWORD}
      DOCKER_INFLUXDB_INIT_ORG: ga-firma
      DOCKER_INFLUXDB_INIT_BUCKET: gebaeude
    volumes:
      - influxdb-data:/var/lib/influxdb2
    restart: unless-stopped

  # Dashboard
  grafana:
    image: grafana/grafana:10
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    depends_on:
      - influxdb
    restart: unless-stopped

volumes:
  influxdb-data:
  grafana-data:
```

---

## Typische Dienste für GA

| Dienst          | Image                        | Zweck                            |
|-----------------|------------------------------|----------------------------------|
| MQTT-Broker     | eclipse-mosquitto            | IoT-Geräte, KNX-IoT, Sensoren   |
| IoT-Flow        | nodered/node-red             | Protokoll-Konvertierung          |
| Zeitreihendaten | influxdb:2                   | Historian                         |
| Dashboard       | grafana/grafana               | Visualisierung Trends            |
| Management      | portainer/portainer-ce        | Web-GUI für Docker-Container     |
| Reverse Proxy   | traefik oder nginx            | TLS-Terminierung, Routing        |
| M-Bus Gateway   | rsmb oder iobroker            | M-Bus-Zähler auslesen            |
| BACnet Gateway  | bacnet-stack oder YABE        | BACnet → MQTT/HTTP               |

---

## Node-RED: Flow-Beispiel BACnet → InfluxDB

```
[BACnet-Read-Node] → [Parser] → [InfluxDB-Write-Node]

Konfiguration BACnet-Read-Node:
  Device: 192.168.10.50:47808
  Object: AI 1 (Aussentemperatur)
  Interval: 60s
  
Konfiguration InfluxDB-Write-Node:
  Bucket: gebaeude
  Measurement: temperature
  Tags:
    system: "aussenluft"
    gebaeude: "A"
  Field: value (aus msg.payload)
```

---

## Datenpersistenz und Backup

```
Docker-Volumes sichern:
  1. Methode: bind-mounts (Daten auf Host-Verzeichnis)
     → Backup mit Standard-Backup-Tools (rsync, tar)
     
  2. Methode: Docker Volume Backup
     docker run --rm -v influxdb-data:/data \
       -v $(pwd):/backup alpine \
       tar czf /backup/influxdb-backup.tar.gz /data

Regelmässige Backups:
  # crontab
  0 2 * * * /opt/ga-stack/backup.sh
```

---

## Sicherheits-Grundregeln Docker in GA

```
1. Keine Container als root laufen lassen:
   user: "1000:1000"  in docker-compose.yml
   
2. Geheimnisse nie im Image (env-Variablen oder Secrets):
   Falsch: GRAFANA_PASSWORD: "admin123"
   Richtig: Env-Datei (.env) mit korrekten Berechtigungen
   
3. Netzwerk-Isolation:
   networks:
     ot-net: (nur OT-Dienste)
     it-net: (nur IT-Dienste)
     intern: (interne Kommunikation)
   
4. Images aktuell halten:
   docker pull image:tag → regelmässig (monatlich)
   docker compose up -d (nach Pull)
   
5. Ports einschränken:
   Nur notwendige Ports nach aussen öffnen
   Management-GUIs (Portainer, Grafana) hinter VPN
```

---

## Portainer: Docker-Management per Web

```
Portainer starten:
  docker volume create portainer_data
  docker run -d -p 9443:9443 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest
    
Dann: https://server-ip:9443
→ Web-GUI zum Verwalten aller Container
→ Logs anzeigen, Container neustarten, Images aktualisieren
```

<!-- EN -->

# Docker in BA — Containers for BMS Services

Docker containers allow BMS services (historian, dashboard, MQTT, etc.) to run in isolation, portably and with simple maintenance. They are especially popular in open BA stacks (without proprietary BMS software).

## Why Docker in BA?

```
Problem without Docker:
  "It worked on my laptop, but not on the server"
  Dependencies: Python 3.8 vs. 3.11, Node.js 14 vs. 18
  Updates break other services

With Docker:
  Each service = own container = own dependencies
  Runs identically everywhere (laptop, server, cloud)
  Updates without risk to other services
  Rollback: simply start old image
```

---

## Typical BA Stack with Docker Compose

```yaml
# docker-compose.yml — BA Monitoring Stack

version: '3.8'

services:
  # MQTT Broker (BA devices → broker)
  mosquitto:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
      - "8883:8883"  # TLS
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
    restart: unless-stopped

  # IoT flow engine (M-Bus, Modbus → MQTT → InfluxDB)
  node-red:
    image: nodered/node-red:3
    ports:
      - "1880:1880"
    volumes:
      - ./node-red-data:/data
    depends_on:
      - mosquitto
    restart: unless-stopped

  # Time-series database
  influxdb:
    image: influxdb:2
    ports:
      - "8086:8086"
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: ${INFLUX_PASSWORD}
      DOCKER_INFLUXDB_INIT_ORG: ba-company
      DOCKER_INFLUXDB_INIT_BUCKET: building
    volumes:
      - influxdb-data:/var/lib/influxdb2
    restart: unless-stopped

  # Dashboard
  grafana:
    image: grafana/grafana:10
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    depends_on:
      - influxdb
    restart: unless-stopped

volumes:
  influxdb-data:
  grafana-data:
```

---

## Typical Services for BA

| Service | Image | Purpose |
|---------|-------|---------|
| MQTT broker | eclipse-mosquitto | IoT devices, KNX-IoT, sensors |
| IoT flow | nodered/node-red | Protocol conversion |
| Time-series data | influxdb:2 | Historian |
| Dashboard | grafana/grafana | Trend visualisation |
| Management | portainer/portainer-ce | Web GUI for Docker containers |
| Reverse proxy | traefik or nginx | TLS termination, routing |
| M-Bus gateway | rsmb or ioBroker | Read M-Bus meters |
| BACnet gateway | bacnet-stack or YABE | BACnet → MQTT/HTTP |

---

## Node-RED: Flow Example BACnet → InfluxDB

```
[BACnet-Read-Node] → [Parser] → [InfluxDB-Write-Node]

BACnet-Read-Node configuration:
  Device: 192.168.10.50:47808
  Object: AI 1 (outdoor temperature)
  Interval: 60 s

InfluxDB-Write-Node configuration:
  Bucket: building
  Measurement: temperature
  Tags:
    system: "outdoor-air"
    building: "A"
  Field: value (from msg.payload)
```

---

## Data Persistence and Backup

```
Backing up Docker volumes:
  1. Method: bind-mounts (data on host directory)
     → Backup with standard tools (rsync, tar)

  2. Method: Docker volume backup
     docker run --rm -v influxdb-data:/data \
       -v $(pwd):/backup alpine \
       tar czf /backup/influxdb-backup.tar.gz /data

Regular backups:
  # crontab
  0 2 * * * /opt/ba-stack/backup.sh
```

---

## Docker Security Rules for BA

```
1. Never run containers as root:
   user: "1000:1000"  in docker-compose.yml

2. Never store secrets in the image (use env variables or secrets):
   Wrong:  GRAFANA_PASSWORD: "admin123"
   Right:  .env file with correct permissions

3. Network isolation:
   networks:
     ot-net: (OT services only)
     it-net: (IT services only)
     intern: (internal communication)

4. Keep images up to date:
   docker pull image:tag → regularly (monthly)
   docker compose up -d (after pull)

5. Restrict ports:
   Only expose necessary ports externally
   Management GUIs (Portainer, Grafana) behind VPN
```

---

## Portainer: Docker Management via Web

```
Start Portainer:
  docker volume create portainer_data
  docker run -d -p 9443:9443 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest

Then: https://server-ip:9443
→ Web GUI for managing all containers
→ View logs, restart containers, update images
```
