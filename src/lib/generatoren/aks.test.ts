import { describe, it, expect } from 'vitest';
import {
	kennzeichen,
	objektname,
	zerlegen,
	pruefen,
	erklaeren,
	ebeneText,
	apparatNrText,
	messanlageText,
	type AksTeile
} from './aks';

// Beispiel aus KBOB MSRL-Technik, Kap. E 4.5: Schaltbefehl Zuluftventilator
const ZULUFT: AksTeile = {
	anlage: '3022',
	objekt: 'HZ',
	ebene: '1',
	btaArt: 'L',
	btaNr: '13',
	apparatArt: 'M',
	apparatNr: '100',
	funktionArt: 'S',
	funktionNr: '0'
};

describe('AKS formatieren', () => {
	it('Kennzeichen nach MSRL-Technik', () => {
		expect(kennzeichen(ZULUFT)).toBe('+3022HZ1=L13-M100:S0');
		expect(kennzeichen(ZULUFT, true)).toBe('+3022 HZ1 =L13 -M100 :S0');
	});

	it('Objektname nach BACnet-Leitfaden', () => {
		expect(objektname(ZULUFT)).toBe('3022_HZ1_L13_M100_S0');
	});

	it('lässt fehlende Blöcke weg, wie auf Schildern', () => {
		// Apparateschild Schaltschrank: =BTA-APPARAT (MSRL Kap. E 4.1.2)
		expect(kennzeichen({ btaArt: 'L', btaNr: '13', apparatArt: 'Q', apparatNr: '100' })).toBe(
			'=L13-Q100'
		);
		// Anlageschild: +ORT2=BTA
		expect(kennzeichen({ objekt: 'HZ', ebene: '1', btaArt: 'L', btaNr: '13' })).toBe('+HZ1=L13');
	});

	it('normalisiert Kleinbuchstaben und Leerzeichen', () => {
		expect(objektname({ ...ZULUFT, objekt: 'hz', btaArt: ' l ' })).toBe('3022_HZ1_L13_M100_S0');
	});
});

describe('AKS zerlegen', () => {
	it('Kennzeichen mit und ohne Leerzeichen', () => {
		for (const s of [
			'+3022HZ1=L13-M100:S0',
			'+ 3022 HZ1 = L13 - M100 : S0',
			'+3022hz1=l13-m100:s0'
		]) {
			const r = zerlegen(s);
			expect(r.teile, s).toEqual(ZULUFT);
			expect(r.rest).toEqual([]);
			expect(r.fehler).toEqual([]);
		}
	});

	it('Objektname', () => {
		expect(zerlegen('3022_HZ1_L13_M100_S0').teile).toEqual(ZULUFT);
	});

	it('Rundlauf: zerlegen(objektname(x)) = x', () => {
		expect(zerlegen(objektname(ZULUFT)).teile).toEqual(ZULUFT);
		expect(zerlegen(kennzeichen(ZULUFT, true)).teile).toEqual(ZULUFT);
	});

	it('Teilkennzeichen', () => {
		expect(zerlegen('=L13-Q100').teile).toEqual({
			btaArt: 'L',
			btaNr: '13',
			apparatArt: 'Q',
			apparatNr: '100'
		});
		expect(zerlegen('Einspeisung +HZ1=T03'.replace('Einspeisung ', '')).teile).toEqual({
			objekt: 'HZ',
			ebene: '1',
			btaArt: 'T',
			btaNr: '03'
		});
	});

	it('meldet Unbekanntes als Rest', () => {
		const r = zerlegen('+3022HZ1=L1-M100');
		expect(r.rest).toEqual(['=L1']);
	});
});

describe('AKS prüfen', () => {
	it('gültiges Kennzeichen ohne Fehler', () => {
		expect(pruefen(ZULUFT)).toEqual([]);
	});

	it('Stellenzahl', () => {
		const f = pruefen({ ...ZULUFT, anlage: '302', apparatNr: '10' });
		expect(f.map((x) => x.feld).sort()).toEqual(['anlage', 'apparatNr']);
	});

	it('Art ohne Nummer', () => {
		expect(pruefen({ btaArt: 'L' }).map((x) => x.feld)).toEqual(['btaNr']);
	});

	it('I ist keine BTA-Art', () => {
		expect(pruefen({ btaArt: 'I', btaNr: '01' }).map((x) => x.feld)).toEqual(['btaArt']);
	});

	it('Messanlagen beginnen bei 01', () => {
		expect(pruefen({ btaArt: 'Q', btaNr: '00' }).map((x) => x.feld)).toEqual(['btaNr']);
	});
});

describe('AKS erklären', () => {
	it('Ebenen', () => {
		expect(ebeneText('0')).toBe('Erdgeschoss');
		expect(ebeneText('2')).toBe('2. Untergeschoss');
		expect(ebeneText('B')).toBe('2. Obergeschoss');
		expect(ebeneText('a', 'en')).toBe('Floor 1');
	});

	it('Apparate-Nummern Lüftung nach Anhang B.2', () => {
		expect(apparatNrText('L', 100)).toBe('Ventilator Zuluft');
		expect(apparatNrText('L', 803)).toBe('Temperatur Zuluft');
		expect(apparatNrText('L', 905)).toBe('Frostschutz');
		expect(apparatNrText('L', 845)).toBeNull(); // 840–849 nicht belegt
	});

	it('Apparate-Nummern Heizung nach Anhang B.1', () => {
		expect(apparatNrText('H', 135)).toBe('Erzeugung: Heizkessel/Brenner, BHKW');
		expect(apparatNrText('H', 415)).toBe('Verteilung und Transport: Pumpe 2');
		expect(apparatNrText('H', 565)).toBe('Verbrauch: Wärmetauscher');
		expect(apparatNrText('H', 812)).toBe('Temperatur Sekundärkreis Vorlauf');
	});

	it('Messanlagen nach Medium', () => {
		expect(messanlageText(5)).toBe('Elektro');
		expect(messanlageText(45)).toBe('Kälte');
		expect(messanlageText(85)).toBe('Brennstoffe (Öl, Gas)');
	});

	it('vollständige Erklärung', () => {
		const e = erklaeren(ZULUFT);
		expect(e).toHaveLength(9);
		expect(e.find((x) => x.wert === 'L')?.bedeutung).toBe('Lüftung/Klima');
		expect(e.find((x) => x.wert === '100')?.bedeutung).toBe('Apparat Nr. 100 · Ventilator Zuluft');
		expect(e.find((x) => x.wert === 'S')?.bedeutung).toBe('Schaltbefehl');
	});

	it('kennzeichnet die BACnet-Erweiterung', () => {
		const e = erklaeren({ funktionArt: 'T', funktionNr: '1' });
		expect(e[0].bedeutung).toBe('Trend Log (BACnet-Erweiterung)');
	});
});
