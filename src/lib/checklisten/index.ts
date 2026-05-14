import { ibnHeizung } from './data/ibn-heizung';
import { ibnRLT } from './data/ibn-rlt';
import { gltUebergabe } from './data/glt-uebergabe';
import { knxIbn } from './data/knx-ibn';
import type { ChecklistTemplate } from './types';

export const checklists: ChecklistTemplate[] = [
	ibnHeizung,
	ibnRLT,
	knxIbn,
	gltUebergabe
].sort((a, b) => a.title.localeCompare(b.title, 'de'));

export const checklistMap: Record<string, ChecklistTemplate> = Object.fromEntries(
	checklists.map((c) => [c.slug, c])
);

export type { ChecklistTemplate } from './types';

export function countItems(t: ChecklistTemplate): number {
	return t.sections.reduce((sum, s) => sum + s.items.length, 0);
}

export function countCritical(t: ChecklistTemplate): number {
	return t.sections.reduce(
		(sum, s) => sum + s.items.filter((i) => i.critical).length,
		0
	);
}
