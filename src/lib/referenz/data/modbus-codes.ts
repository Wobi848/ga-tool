import type { ReferenceTable } from '../types';

export const modbusCodes: ReferenceTable = {
	slug: 'modbus-codes',
	title: 'Modbus Funktionscodes',
	title_en: 'Modbus Function Codes',
	subtitle: 'FC 01–06, 15, 16, 23 — Lesen/Schreiben Coils und Register',
	subtitle_en: 'FC 01–06, 15, 16, 23 — reading/writing coils and registers',
	category: 'Protokoll',
	icon: 'code',
	color: '#b45309',
	areas: ['ga', 'it'],
	norm: ['Modbus Application Protocol V1.1b3', 'IEC 61158-6-15'],
	updated: '2026-05-15',
	description: 'Modbus-Funktionscodes im Überblick. FC 01–04 lesen, FC 05/06/15/16 schreiben. Registeradressierung beginnt bei 0 (Protokoll) vs. 1 (Dokumentation) — immer verifizieren!',
	description_en: 'Overview of Modbus function codes. FC 01–04 read, FC 05/06/15/16 write. Register addressing starts at 0 (protocol) vs. 1 (documentation) — always verify!',
	columns: [
		{ key: 'fc', label: 'FC', mono: true, highlight: true, hint: 'Function Code (hex)' },
		{ key: 'name', label: 'Name' },
		{ key: 'typ', label: 'Datentyp', label_en: 'Data Type' },
		{ key: 'rw', label: 'R/W', mono: true },
		{ key: 'bits', label: 'Bits' },
		{ key: 'max', label: 'Max. pro Anfrage', label_en: 'Max. per Request', type: 'number' },
		{ key: 'beschreibung', label: 'Beschreibung', label_en: 'Description' }
	],
	rows: [
		{ fc: '01 (0x01)', name: 'Read Coils',               typ: 'Coil',             rw: 'R',   bits: '1-bit',  max: 2000, beschreibung: 'Lesen digitale Ausgänge (0=AUS, 1=EIN)',                      beschreibung_en: 'Read digital outputs (0=OFF, 1=ON)' },
		{ fc: '02 (0x02)', name: 'Read Discrete Inputs',     typ: 'Discrete Input',   rw: 'R',   bits: '1-bit',  max: 2000, beschreibung: 'Lesen digitale Eingänge (read-only)',                          beschreibung_en: 'Read digital inputs (read-only)' },
		{ fc: '03 (0x03)', name: 'Read Holding Registers',   typ: 'Holding Register', rw: 'R',   bits: '16-bit', max: 125,  beschreibung: 'Lesen Ausgangs-/Konfigurationsregister (häufigster FC)',       beschreibung_en: 'Read output/configuration registers (most common FC)' },
		{ fc: '04 (0x04)', name: 'Read Input Registers',     typ: 'Input Register',   rw: 'R',   bits: '16-bit', max: 125,  beschreibung: 'Lesen Messwerteregister (read-only)',                          beschreibung_en: 'Read measurement registers (read-only)' },
		{ fc: '05 (0x05)', name: 'Write Single Coil',        typ: 'Coil',             rw: 'W',   bits: '1-bit',  max: 1,    beschreibung: 'Schreiben eines digitalen Ausgangs (0x0000=AUS, 0xFF00=EIN)', beschreibung_en: 'Write single digital output (0x0000=OFF, 0xFF00=ON)' },
		{ fc: '06 (0x06)', name: 'Write Single Register',    typ: 'Holding Register', rw: 'W',   bits: '16-bit', max: 1,    beschreibung: 'Schreiben eines einzelnen Registers',                          beschreibung_en: 'Write single register' },
		{ fc: '15 (0x0F)', name: 'Write Multiple Coils',     typ: 'Coil',             rw: 'W',   bits: '1-bit',  max: 1968, beschreibung: 'Schreiben mehrerer Coils in einem Befehl',                    beschreibung_en: 'Write multiple coils in one command' },
		{ fc: '16 (0x10)', name: 'Write Multiple Registers', typ: 'Holding Register', rw: 'W',   bits: '16-bit', max: 123,  beschreibung: 'Schreiben mehrerer Register (häufig für Sollwerte)',           beschreibung_en: 'Write multiple registers (often used for setpoints)' },
		{ fc: '23 (0x17)', name: 'Read/Write Multiple Regs', typ: 'Holding Register', rw: 'R/W', bits: '16-bit', max: 121,  beschreibung: 'Lesen und Schreiben in einer Transaktion',                    beschreibung_en: 'Read and write in a single transaction' }
	],
	notes: 'Registeradressen: Im Protokoll 0-basiert (0–65535). In Geräte-Dokumentationen meist 1-basiert (40001 = HR 0). Immer im Gerätedatenblatt prüfen!\n\nDatentypen: 16-bit Werte können als Integer, Uint, Float32 (2 Register), Float64 (4 Register) interpretiert werden — Byte-Order (Big/Little Endian) beachten.',
	notes_en: 'Register addresses: protocol is 0-based (0–65535). Device documentation is usually 1-based (40001 = HR 0). Always verify in the device datasheet!\n\nData types: 16-bit values can be interpreted as Integer, Uint, Float32 (2 registers), Float64 (4 registers) — observe byte order (big/little endian).'
};
