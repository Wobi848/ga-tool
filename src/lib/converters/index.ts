import { druck } from './druck';
import { durchfluss } from './durchfluss';
import { energie } from './energie';
import { feuchte } from './feuchte';
import { leistung } from './leistung';
import { luftmengen } from './luftmengen';
import { temperatur } from './temperatur';
import { signal } from './signal';
import { beleuchtung } from './beleuchtung';
import { winkel } from './winkel';
import type { ConverterMeta } from './types';

export const converters: ConverterMeta[] = [
	druck,
	durchfluss,
	energie,
	feuchte,
	leistung,
	luftmengen,
	temperatur,
	signal,
	beleuchtung,
	winkel
];

export const converterMap = Object.fromEntries(converters.map((c) => [c.slug, c]));

export type { ConverterMeta };
export type { Unit } from './types';
