import { FeatureAwardType } from "@gl/networking/FeatureType";
import { WinLineResult } from "./interfaces/reels";
import Reels, { SymbolTextureSet } from "./components/Reels";
import { Logger } from "@gl/Logger";
import { inject, injectable } from "inversify";
import NetworkManager from "@gl/networking/NetworkManager";
import Dispatcher, { ACTION_EVENTS, AUDIO_EVENTS, EVENTS } from "@gl/events/Dispatcher";
import { ClientCommand } from "@gl/networking/Commands";
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

@injectable()
class VideoSlotReelsManager {
	private logger = new Logger();
	symbolHeight: number = 200;

	scene: Reels;

	private hasDelayedSpinStarted: boolean = false;

	scatterInfo: ScatterInfo = {
		isScatterSpin: false,
		collections: {},
		currentSpin: 0,
		claimed: false,
	};

	spinQueue: SpinQueue[] = [];
	scatterSymbolSprite: Phaser.GameObjects.Sprite[];


	private freeSymbolTextures: SymbolTextureSet[] = [];

	currentSpin: SpinQueue | null = null;
	activeAutoplay: number = 0;

    constructor(
		@inject("VideoSlotGameState") public GameState: import("./VideoSlotGameState").VideoSlotGameState,
		@inject("NetworkManager") public NetworkManager: import("@gl/networking/NetworkManager").default,
	) {
        console.log("ReelsManager initialized");
    }

	bindScene(scene: Reels) {
		this.scene = scene;
		this.logger.trace("ReelsManager bindScene");
	}

	public update() {
		const GameState = this.GameState;
		const NetworkManager = this.NetworkManager;
		if(GameState.isSpinning) return;
		
		if(!this.hasDelayedSpinStarted) return;
		
		if(!this.scatterInfo.isScatterSpin && !GameState.isAutoPlayRunning && this.spinQueue.length == 1) { // Basic Spin
			const spin = this.spinQueue.shift();
			if(spin) {
				this.doSpin();
				this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
				this.updateReelSymbols();
				this.currentSpin = spin;
			}
		}

		if(GameState.isAutoPlayRunning && !GameState.isSpinning && this.spinQueue.length == 1){
			// Dispatcher.emit(ACTION_EVENTS.SPIN_START);
			const spin = this.spinQueue.shift();
			if(spin) {
				this.doSpin();
				this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
				this.updateReelSymbols();
				this.activeAutoplay--
				this.currentSpin = spin;
			}
		}
		
		if(this.scatterInfo.isScatterSpin && !GameState.isSpinning && !GameState.isShowingScatterInfo) {
			if(this.spinQueue.length > 0) {
				if(this.spinQueue.length === 9) {
					// NetworkManager.sendCommand(ClientCommand.FreeSpin, ["0"]);
				}
				console.log("Scatter Spin");
				console.log(`Spin Left: ${this.spinQueue.length}`);
				const spin = this.spinQueue.shift();
				if(spin) {
					NetworkManager.sendCommand(ClientCommand.FreeSpin, [this.scatterInfo.currentSpin.toString()]);
					console.log(this.scatterInfo.currentSpin)
					this.doSpin();
					this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
					this.updateReelSymbols();
					this.currentSpin = spin;
					this.scatterInfo.currentSpin++;

					const winSymbol = (this.scatterInfo.collections[FeatureAwardType.Feature]?.amount as number)
					const symbol = this.freeSymbolTextures[winSymbol]
					Dispatcher.emit(ACTION_EVENTS.AUTO_SPIN_START, symbol , this.scatterInfo.currentSpin)
					console.log(GameState.isAutoSpinRunning)
				}
			}
		} 
		else if(!GameState.isSpinning && this.scatterInfo.isScatterSpin && !GameState.isShowingScatterInfo && !GameState.isScatterInfoShown) {
			Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
			GameState.isScatterInfoShown = true;
			Dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
		}

	}
	updateReelSymbols() {
		throw new Error("Method not implemented.");
	}

	doSpin() {
		// TODO: Add spin logic
	}

	setReelSymbols(symbols: number[], topSymbol: number[], bottomSymbol: number[]) {
		// TODO: Set symbols to reels
	}
}
export default VideoSlotReelsManager;