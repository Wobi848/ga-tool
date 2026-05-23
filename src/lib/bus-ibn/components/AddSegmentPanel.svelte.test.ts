import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import AddSegmentPanel from './AddSegmentPanel.svelte';

describe('AddSegmentPanel', () => {
	it('zeigt initial den Add-Button (show=false)', () => {
		render(AddSegmentPanel, {
			props: { show: false, segType: 'bacnet-mstp', onAdd: () => {} }
		});
		expect(screen.getByRole('button', { name: /hinzu/i })).toBeInTheDocument();
	});

	it('show=true rendert alle 4 Bus-Typ-Optionen', () => {
		render(AddSegmentPanel, {
			props: { show: true, segType: 'bacnet-mstp', onAdd: () => {} }
		});
		expect(screen.getByRole('button', { name: 'BACnet MSTP' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'BACnet IP' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Modbus RTU' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'KNX' })).toBeInTheDocument();
	});

	it('show=true rendert NICHT den Open-Button', () => {
		render(AddSegmentPanel, {
			props: { show: true, segType: 'bacnet-mstp', onAdd: () => {} }
		});
		// Wenn das Panel offen ist, fehlt der initiale "Segment hinzufuegen" Button
		const buttons = screen.getAllByRole('button');
		const openBtn = buttons.find((b) => b.classList.contains('btn-add-seg'));
		expect(openBtn).toBeUndefined();
	});

	it('onAdd wird beim Klick auf Confirm-Button aufgerufen', async () => {
		const onAdd = vi.fn();
		render(AddSegmentPanel, {
			props: { show: true, segType: 'bacnet-mstp', onAdd }
		});
		const buttons = screen.getAllByRole('button');
		const confirm = buttons.find((b) => b.classList.contains('btn-confirm'));
		expect(confirm).toBeTruthy();
		await fireEvent.click(confirm!);
		expect(onAdd).toHaveBeenCalledTimes(1);
	});

	it('aktiver segType bekommt die "--active"-Klasse', () => {
		render(AddSegmentPanel, {
			props: { show: true, segType: 'modbus-rtu', onAdd: () => {} }
		});
		const modbusBtn = screen.getByRole('button', { name: 'Modbus RTU' });
		expect(modbusBtn).toHaveClass('btn-bus-type--active');
		const knxBtn = screen.getByRole('button', { name: 'KNX' });
		expect(knxBtn).not.toHaveClass('btn-bus-type--active');
	});
});
