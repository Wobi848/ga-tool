import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ProjectHeader from './ProjectHeader.svelte';
import type { BusProject } from '../types';

function makeProject(overrides: Partial<BusProject> = {}): BusProject {
	return {
		id: 'p1',
		name: 'Mein Projekt',
		site: 'Zürich',
		engineer: 'A. Tester',
		version: '1.0',
		createdAt: new Date('2026-05-23').getTime(),
		segments: [],
		...overrides
	};
}

const formatDate = (ts: number) =>
	new Date(ts).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });

describe('ProjectHeader', () => {
	it('rendert alle Projektfelder mit Werten', () => {
		const project = makeProject();
		render(ProjectHeader, { props: { project, formatDate } });

		expect(screen.getByDisplayValue('Mein Projekt')).toBeInTheDocument();
		expect(screen.getByDisplayValue('Zürich')).toBeInTheDocument();
		expect(screen.getByDisplayValue('A. Tester')).toBeInTheDocument();
		expect(screen.getByDisplayValue('1.0')).toBeInTheDocument();
	});

	it('zeigt formatiertes Datum (read-only)', () => {
		const project = makeProject();
		render(ProjectHeader, { props: { project, formatDate } });

		// Datum erscheint als span (nicht input)
		expect(screen.getByText(formatDate(project.createdAt))).toBeInTheDocument();
	});

	it('Tippen aendert das project-Objekt direkt (Two-Way-Binding)', async () => {
		const project = $state<BusProject>(makeProject());
		render(ProjectHeader, { props: { project, formatDate } });

		const nameInput = screen.getByDisplayValue('Mein Projekt') as HTMLInputElement;
		await fireEvent.input(nameInput, { target: { value: 'Neuer Name' } });

		expect(project.name).toBe('Neuer Name');
	});

	it('Placeholder fuer leere Felder', () => {
		const project = makeProject({ name: '', site: '', engineer: '' });
		render(ProjectHeader, { props: { project, formatDate } });

		const inputs = screen.getAllByRole('textbox');
		const placeholders = inputs.map((i) => i.getAttribute('placeholder'));
		expect(placeholders.filter(Boolean).length).toBeGreaterThan(0);
	});
});
