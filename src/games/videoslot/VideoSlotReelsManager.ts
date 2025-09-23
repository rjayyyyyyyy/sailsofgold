import { FeatureAwardType } from "@gl/networking/FeatureType";
import { WinLineResult } from "./interfaces/reels";
type ScatterInfo = {
	collections: Partial<Record<FeatureAwardType, {amount: number, name: string}>>;
	isScatterSpin: boolean;	
	currentSpin: number;
	claimed: boolean;
}

type SpinQueue = {
	symbols: number[];
	winLines: WinLineResult[];
	topSymbol: number[];
	bottomSymbol: number[];
}

class VideoSlotReelsManager {
	symbolHeight: number = 200;

    constructor() {
        console.log("ReelsManager initialized");
    }
}

export default VideoSlotReelsManager;