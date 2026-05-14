import { dnRohre } from './data/dn-rohre';
import { cuRohre } from './data/cu-rohre';
import { filterMapping } from './data/filter-mapping';
import { glykolSole } from './data/glykol-sole';
import { ipSchutz } from './data/ip-schutz';
import { motorIE } from './data/motor-ie';
import { kaeltemittel } from './data/kaeltemittel';
import { materialEigenschaften } from './data/material-eigenschaften';
import { normaussentemp } from './data/normaussentemp';
import type { ReferenceTable } from './types';

export const referenceTables: ReferenceTable[] = [
	dnRohre,
	cuRohre,
	filterMapping,
	glykolSole,
	ipSchutz,
	motorIE,
	kaeltemittel,
	materialEigenschaften,
	normaussentemp
].sort((a, b) => a.title.localeCompare(b.title, 'de'));

export const referenceMap: Record<string, ReferenceTable> = Object.fromEntries(
	referenceTables.map((t) => [t.slug, t])
);

export type { ReferenceTable } from './types';
