import { FeatureType } from "@gl/networking/FeatureType";

export enum ReelSymbol {
	Ten = 0,
	J = 1,
	Q = 2,
	K = 3,
	A = 4,
	Bird = 5,
	Anubis = 6,
	Pharaoh = 7,
	People = 8,
	Book = 9,
};

export const symbolName = [
	'Ten',
	'J',
	'Q',
	'K',
	'A',
	'Bird',
	'Anubis',
	'Pharaoh',
	'People',
	'Book',
	'Tomb',
];



export type WinLineResult = {
	paylineIndex: number;
	symbol: ReelSymbol;
    totalSymbol: number;
    flags: number;
    coinWon: number;
}

export class FeatureResult {
	featureCommand: number | null = null;
	featureType: FeatureType | null = null;
}