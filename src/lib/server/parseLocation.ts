export function parseLocation(raw: string | null | undefined): {
	city: string;
	temp: number | null;
} {
	if (!raw) return { city: '', temp: null };
	const [city, tempStr] = raw.split('|');
	const temp = tempStr !== undefined ? parseFloat(tempStr) : null;
	return { city: city ?? '', temp: isNaN(temp as number) ? null : temp };
}

export function encodeLocation(city: string, temp: string | number | null): string | null {
	const c = city.trim();
	if (!c) return null;
	const t = temp !== null && temp !== '' ? String(temp).trim() : null;
	return t ? `${c}|${t}` : c;
}
