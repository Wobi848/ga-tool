export interface Unit {
	id: string;
	label: string;
	labelEn?: string;
	symbol: string;
	note?: string;
	noteEn?: string;
}

export interface ContextInput {
	id: string;
	label: string;
	labelEn?: string;
	unit: string;
	default: number;
	min?: number;
	max?: number;
}

export interface ConverterMeta {
	slug: string;
	name: string;
	name_en?: string;
	icon: string;
	color: string;
	units: Unit[];
	contextInput?: ContextInput; // e.g. temperature for humidity
	toBase: (value: number, fromUnit: string, context?: number) => number;
	fromBase: (value: number, toUnit: string, context?: number) => number;
}
