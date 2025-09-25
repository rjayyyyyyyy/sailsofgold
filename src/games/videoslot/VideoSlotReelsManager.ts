import { FeatureAwardType, FeatureType } from "@gl/networking/FeatureType";
import { WinLineResult } from "./interfaces/reels";
import Reels, { SymbolTextureSet } from "./components/Reels";
import { Logger } from "@gl/Logger";
import { inject, injectable } from "inversify";
import NetworkManager from "@gl/networking/NetworkManager";
import Dispatcher, { ACTION_EVENTS, AUDIO_EVENTS, CommandEvent, EVENTS } from "@gl/events/Dispatcher";
import { ClientCommand, Command, ServerCommand } from "@gl/networking/Commands";
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
	symbolHeight: number = 150;

	scene: Reels;
	PayLines: number[][][] = [
		[[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], //line 1
		[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], //line 2
		[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]], //line 3
		[[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]], //line 4
		[[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], //line 5
		[[0, 1], [1, 0], [2, 0], [3, 0], [4, 1]], //line 6
		[[0, 1], [1, 2], [2, 2], [3, 2], [4, 1]], //line 7
		[[0, 0], [1, 0], [2, 1], [3, 2], [4, 2]], //line 8
		[[0, 2], [1, 2], [2, 1], [3, 0], [4, 0]], //line 9
		[[0, 1], [1, 2], [2, 1], [3, 0], [4, 1]], //line 10
		[[0, 1], [1, 0], [2, 1], [3, 2], [4, 1]], //line 11
		[[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]], //line 12
		[[0, 2], [1, 1], [2, 1], [3, 1], [4, 2]], //line 13
		[[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]], //line 14
		[[0, 2], [1, 1], [2, 2], [3, 1], [4, 2]], //line 15
		[[0, 1], [1, 1], [2, 0], [3, 1], [4, 1]], //line 16
		[[0, 1], [1, 1], [2, 2], [3, 1], [4, 1]], //line 17
		[[0, 0], [1, 0], [2, 2], [3, 0], [4, 0]], //line 18
		[[0, 2], [1, 2], [2, 0], [3, 2], [4, 2]], //line 19
		[[0, 0], [1, 2], [2, 2], [3, 2], [4, 0]] //line 20
	]

    PayValues: number[][] = [
		[0, 5, 25, 100], // 10
		[0, 5, 25, 100], // J
		[5, 25, 100], // Q
		[5, 40, 150], // K
		[5, 40, 150], // A
		[5, 30, 100, 750], // Bird
		[5, 30, 100, 750], // Anubis
		[5, 40, 400, 2000], // Pharaoh
		[10, 100, 1000, 5000], // People
		[0, 2, 20, 200], // Book
	]

	private hasDelayedSpinStarted: boolean = false;

	scatterInfo: ScatterInfo = {
		isScatterSpin: false,
		collections: {},
		currentSpin: 0,
		claimed: false,
	};

	spinQueue: SpinQueue[] = [];
	scatterSymbolSprite: Phaser.GameObjects.Sprite[];
	scatterSymbolColumn: number[];


	reelSymbols: number[] = [];
	multiReelSymbols: number[][] = [];

	private symbolTextures: SymbolTextureSet[] = [];
	private winSymbolTextures: SymbolTextureSet[] = [];
	private freeSymbolTextures: SymbolTextureSet[] = [];


	payLineImages: Phaser.GameObjects.Image[] = [];
	payLineImagesRepeat: Phaser.Tweens.Tween[] = [];

	topSymbol: number[];
	bottomSymbol: number[];
	currentSpin: SpinQueue | null = null;
	activeAutoplay: number = 0;

	duration: number = 75;
	repeat: number[] = [5, 10, 15, 20, 25];

    constructor(
		@inject("VideoSlotGameState") public GameState: import("./VideoSlotGameState").VideoSlotGameState,
		@inject("NetworkManager") public NetworkManager: import("@gl/networking/NetworkManager").default,
	) {
        console.log("ReelsManager initialized");

        Dispatcher.addListener(ACTION_EVENTS.SPIN_START, () => {
			let GameState = this.GameState;
            console.log(GameState.isSpinning.get())
            if(this.GameState.isSpinning.get()) return;
            console.log("Spin Start", GameState.coinBet.get(), GameState.linesBet.get(), GameState.coinValue.get());
            if(this.scatterInfo.isScatterSpin) {
                if(this.scatterInfo.claimed) return;
                GameState.isScatterInfoShown.set(false);
                NetworkManager.sendCommand(ClientCommand.Feature, ["6"]);
                Dispatcher.emit(EVENTS.HIDE_SCATTER_INFO);
                this.hasDelayedSpinStarted = true;
            }
            else{
                GameState.balance.set(GameState.balance.get() - GameState.coinBet.get() * GameState.linesBet.get() * GameState.coinValue.get());
				this.logger.debug(`Balance after spin: ${GameState.balance.get()}`);
                NetworkManager.sendCommand(ClientCommand.Spin, [
                    GameState.coinBet.get().toString(),
                    GameState.linesBet.get().toString(),
                    GameState.coinValue.get().toString()
                ]);
                this.hasDelayedSpinStarted = true;
            }
        });        Dispatcher.addListener(EVENTS.SPIN_COMPLETE, () => {
            
            if(this.currentSpin) {
                Dispatcher.emit(AUDIO_EVENTS.REEL_STOP);
                this.renderWinLines(this.currentSpin.winLines);
                if(this.scatterInfo.isScatterSpin) {
                    if(this.scatterInfo.currentSpin === 10) {
                        GameState.isSpinning.set(false);
                        this.scatterInfo.isScatterSpin = false;
                        this.scatterInfo.claimed = false;
                        this.scatterInfo.currentSpin = 0;
                        this.scatterInfo.collections = {};
                        this.spinQueue = [];
                        this.currentSpin = null;
                        GameState.isScatterInfoShown.set(false);
                        GameState.isAutoSpinRunning.set(false);
                        Dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins)
                        Dispatcher.emit(ACTION_EVENTS.AUTO_SPIN_STOP)  
                        Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO)
                        Dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_NORMAL);
                    }
                }
            } 
            
        });

        Dispatcher.addListener(ACTION_EVENTS.AUTO_PLAY_START, (activeAutoplay) => {
            this.activeAutoplay = activeAutoplay
            // if(!this.isAutoPlayRunning){
                GameState.isAutoPlayRunning.set(true);
            // }
            // else{
                Dispatcher.emit(ACTION_EVENTS.SPIN_START);
            // }
        })

        Dispatcher.addListener(ACTION_EVENTS.ACTION_GAMBLE, (picked) => {
            console.log("Gamble: " + picked)
            NetworkManager.sendCommand(ClientCommand.Gamble, [
                picked
            ])
        })

		Dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
			switch(command.type) {
				case ServerCommand.Feature:
                    console.log(`Feature Packet Received `);
                    const featureCommand : FeatureType = parseInt(command.getString(0)) as FeatureType;
                    console.log(`Feature Command: ${FeatureType[featureCommand]}`);
                    switch(featureCommand){ 
                        case FeatureType.Scatter:
                            console.log(`Scatter`);
                            this.scatterInfo.isScatterSpin = true;
                            break;
                        case FeatureType.Collection:
                            const featureAwardType = parseInt(command.getString(1)) as FeatureAwardType;
                            this.scatterInfo.collections[featureAwardType] = {
                                amount: parseInt(command.getString(2)),
                                name: FeatureAwardType[featureAwardType]
                            };
                            break;
                    }
                    break;
				// End Feature case
				case ServerCommand.Spin:
					this.logger.info("Spin command received");
                    const isFirstLoad = !this.scene.initialized;
                    if(this.scene.initialized){
                        // ReelsManager.doSpin();
                    } else {
                        this.scene.initialized = true;
                    }
                    // console.clear();
                    // console.log("Spin Length", command.length);
                    
                    const coin = parseInt(command.getString(0));
                    const lines = parseInt(command.getString(1));
                    const denom = parseInt(command.getString(2));
                    if(GameState.isAutoPlayRunning){
                        GameState.autoplayBalance.set(GameState.autoplayBalance.get() - coin * lines * denom);
                    }
                    GameState.coinValue.set(denom);
                    // console.log(`Coin: ${coin} Lines: ${lines} Denom: ${denom}`);
                    let symbols = [];
                    for(let i = 3; i < 18; i++){
                        symbols.push(parseInt(command.getString(i)));
                    }

                    // console.log("Symbols :", symbols.length);
                    // console.log(symbols);
                    // const feature = parseInt(command.getString(18));
                    const winLine = parseInt(command.getString(19));
                    // console.log(`Feature: ${feature} WinLine: ${winLine}`);
                    let winLines: WinLineResult[] = [];
                    for(let i = 20; i < 20 + winLine*5; i++){
                        winLines.push({
                            paylineIndex: parseInt(command.getString(i)),
                            symbol: parseInt(command.getString(i+1)),
                            totalSymbol: parseInt(command.getString(i+2)),
                            flags: parseInt(command.getString(i+3)),
                            coinWon: parseInt(command.getString(i+4)),
                        });
                        i += 4;
                    }
                    GameState.winLines = winLines
                    console.log("Win Lines :", winLines);
                    let topSymbol = [];
                    for(let i = 20 + winLine*5; i < 20 + winLine*5 + 5; i++){
                        topSymbol.push(parseInt(command.getString(i)));
                    }
                    // console.log("Top Symbol :", topSymbol);
                    let bottomSymbol: number[] = [];
                    for(let i = 20 + winLine*5 + 5; i < 20 + winLine*5 + 10; i++){
                        bottomSymbol.push(parseInt(command.getString(i)));
                    }
                    // console.log("Bottom Symbol :", bottomSymbol);
                    if(!isFirstLoad){
                        this.enqueueSpin(symbols, winLines, topSymbol, bottomSymbol);
                    }
                    
                    // Only render win lines on first load
                    if(isFirstLoad) {
                        // GameState.isSpinning = true
                        GameState.isReward.set(true)
                        this.setReelSymbols(symbols, topSymbol, bottomSymbol);
                        this.updateReelSymbols();
                        setTimeout(() => {
                            // GameState.isSpinning = false
                            console.log("FirstLoad Scatter Info");
                            console.log(this.scatterInfo);
                            if(this.scatterInfo.isScatterSpin) {
                                Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
                            }
                            if(!this.scatterInfo.isScatterSpin) this.renderWinLines(winLines);
                        }, 3000);
                    }
                    break;
				// END Spin case
				case ServerCommand.SpinEnd:
                    const winCoins = parseInt(command.getString(1));
                    console.log('Win Coins :' + winCoins)
                    GameState.winCoins.set(winCoins)

                    const totalWin = parseInt(command.getString(2));
                    console.log('Total Win :' + totalWin)
                    GameState.totalWin.set(totalWin);

                    if(GameState.isAutoPlayRunning){
                        GameState.autoplayBalance.set(GameState.autoplayBalance.get() + totalWin);
                    }
                    break;
				// End SpinEnd case
			}
		});	
    }

	enqueueSpin(symbols: number[], winLines: WinLineResult[], topSymbol: number[], bottomSymbol: number[]) {
		this.spinQueue.push({symbols, winLines, topSymbol, bottomSymbol});
	}

	bindScene(scene: Reels) {
		this.scene = scene;
		this.logger.trace("ReelsManager bindScene");

		const canvas = this.scene.textures.createCanvas('gradientTexture', 256, 256);
		if(!canvas) {
			throw new Error('Failed to create canvas');
		}
		const context = canvas.getContext();
		
		// Create vertical gradient (black-blue-black)
		const gradient = context.createLinearGradient(0, 0, 0, 256);
		gradient.addColorStop(0, '#0A1A2F');    // Bluish black at top
		gradient.addColorStop(0.5, '#4D94FF');  // Lighter blue in middle  
		gradient.addColorStop(1, '#0A1A2F');    // Bluish black at bottom
		
		context.fillStyle = gradient;
		context.fillRect(0, 0, 256, 256);
		
		canvas.refresh();
		this.symbolTextures = scene.symbolList;
		this.winSymbolTextures = scene.winSymbolList;
		this.freeSymbolTextures = scene.freeSymbolList;
	}

	// This need to be refactored using event based
	public update() {
		const GameState = this.GameState;
		const NetworkManager = this.NetworkManager;
		// this.logger.debug(`DEBUG: Game State isSpinning: ${GameState.isSpinning.get()}`);
		if(GameState.isSpinning.get()) return;
	

		// this.logger.debug(`DEBUG: Game State hasDelayedSpinStarted: ${this.hasDelayedSpinStarted}`);
		if(!this.hasDelayedSpinStarted) return;

		this.logger.debug("DEBUG: Update Reels Manager");
		
		if(!this.scatterInfo.isScatterSpin && !GameState.isAutoPlayRunning.get() && this.spinQueue.length == 1) { // Basic Spin
			const spin = this.spinQueue.shift();
			if(spin) {
				this.doSpin();
				this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
				this.updateReelSymbols();
				this.currentSpin = spin;
			}
		}

		if(GameState.isAutoPlayRunning.get() && !GameState.isSpinning.get() && this.spinQueue.length == 1){
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

		if(this.scatterInfo.isScatterSpin && !GameState.isSpinning.get() && !GameState.isShowingScatterInfo.get()) {
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
		else if(!GameState.isSpinning.get() && this.scatterInfo.isScatterSpin && !GameState.isShowingScatterInfo.get() && !GameState.isScatterInfoShown.get()) {
			Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
			GameState.isScatterInfoShown.set(true);
			Dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
		}

	}
	updateReelSymbols() {
		const GameState = this.GameState;
		if(this.reelSymbols.length == 0) return;
		let column = 0;
		let row = 1;
		this.scatterSymbolColumn = [];
		let prevcolumn = -1
		this.multiReelSymbols = []
		this.scatterSymbolSprite = []
		for(let i = 0; i < 15;i++) {
			const symbol = this.symbolTextures[this.reelSymbols[i]];
			if (!this.multiReelSymbols[column]) {
				this.multiReelSymbols[column] = [];
			}
			this.multiReelSymbols[column].push(this.reelSymbols[i]);
			(this.scene.containers[column].list[row] as Phaser.GameObjects.Sprite).setTexture(symbol[0], symbol[1]);
			
			let btnSprite = (this.scene.containers[column].list[row] as Phaser.GameObjects.Sprite);
			let x = btnSprite.parentContainer.x;
			let y = btnSprite.parentContainer.y + btnSprite.y;
			let container = this.scene.add.container(x - 125, y + 25).setVisible(false);
			this.paytable(container, symbol[1]);
			btnSprite.removeAllListeners();
			btnSprite.setInteractive();
			btnSprite.on('pointerdown', () => {
				container.visible ? container.setVisible(false) : container.setVisible(true);
				if(GameState.isMobile) container.setVisible(false)
			})
			.on('pointerout', () => {
				if(container.visible) container.setVisible(false)
			});
			
			if(this.reelSymbols[i] == 9){
				this.scatterSymbolSprite.push(this.scene.containers[column].list[row] as Phaser.GameObjects.Sprite)
				console.log(this.scatterSymbolSprite);
			}

			if(this.reelSymbols[i] == this.scatterInfo.collections[FeatureAwardType.Feature]?.amount){
			// if(this.reelSymbols[i] == 0){
				if(prevcolumn !== column){	
					console.log('column :' + column)
					this.scatterSymbolColumn.push(column)
					prevcolumn = column
				}
			}

			row++;
			if(row == 4) {
				row = 1;
				column++;
			}
			
			
		}

		for(let i = 0; i < 5; i++) {
			(this.scene.containers[i].list[0] as Phaser.GameObjects.Sprite).setTexture(this.symbolTextures[this.topSymbol[i]][0], this.symbolTextures[this.topSymbol[i]][1]);
			(this.scene.containers[i].list[4] as Phaser.GameObjects.Sprite).setTexture(this.symbolTextures[this.bottomSymbol[i]][0], this.symbolTextures[this.bottomSymbol[i]][1]);
		}

	}

	doSpin() {
		let GameState = this.GameState;
		if(GameState.isSpinning.get()) return;
		Dispatcher.emit(AUDIO_EVENTS.REEL_START);

		this.removePayLineImages();
		GameState.isSpinning.set(true);
		for(let i = 0; i < 5; i++) {
			const container = this.scene.containers![i];
			if(container) {
				this.scene.containerBlur[i] = container.postFX.addBlur(1, 0, 2, 10, 0xffffff, 5);
			}
			
			for(let j = 0; j < 5; j++) {
				const symbol = this.scene.containers![i]?.list[j] as Phaser.GameObjects.Sprite;
				if(symbol) {
					symbol.setTint(0xFFFFFF);	
				}
			}
		}

		if(GameState.isFastPlay) 
			this.duration = 35;
		else
			this.duration = 75;

		for(let i = 0; i < 5; i++) {
			const container = this.scene.containers![i];
			if(!container) continue;
			this.scene.columnTween[i] = this.scene.tweens.add({
				targets: container,
				y: container.y + this.symbolHeight,
				duration: this.duration,
				repeat: this.repeat[i],
				ease: 'Linear',
				onRepeat: (tween) => fnRepeat(tween, this),
				onComplete: (tween) => fnComplete(tween, this, i)
			});

			this.scene.blurTween[i] = this.scene.tweens.add({
				targets: this.scene.containerBlur[i],
				strength: 0,
				duration: this.duration * this.repeat[i],
				onComplete: () => {
					container.postFX.remove(this.scene.containerBlur[i]);
					this.scene.containerBlur[i].destroy();
				}
			});
		}
	}

	setReelSymbols(symbols: number[], topSymbol: number[], bottomSymbol: number[]) {
		this.reelSymbols = symbols;
		this.topSymbol = topSymbol;
		this.bottomSymbol = bottomSymbol;
	}

	removePayLineImages() {
		for(const lineImage of this.payLineImages) {
			lineImage.destroy();
		}
		this.payLineImages = [];
		for(const repeat of this.payLineImagesRepeat){
			repeat.stop()
		}
		this.payLineImagesRepeat = [];
	}

	renderWinLines(winLines: WinLineResult[]) {
		const GameState = this.GameState;
		// const selectedSymbol = 0; // 
		const selectedSymbol = (this.scatterInfo.collections[FeatureAwardType.Feature]?.amount as number);
		const symbol = this.symbolTextures[selectedSymbol];
		const groupA = selectedSymbol >= 0 && selectedSymbol <= 4;
		const groupB = selectedSymbol >= 5 && selectedSymbol <= 8;
		const columnThreshold = groupA ? 3 : groupB ? 2 : 0;
		const hasValidScatter = this.scatterSymbolSprite.length >= 3;

  		this.removePayLineImages();
		console.log('winlines length: ' + winLines.length)
		if (winLines.length === 0) {
			if (hasValidScatter) {
				console.log('Scatter book');
				this.changeTintSymbol(true);
				setTimeout(() => {
					if(GameState.isAutoPlayRunning){
						if(GameState.isStopFreeSpins.get() || GameState.isStopJackpot.get()){
							GameState.isAutoPlayRunning.set(false);
							this.activeAutoplay = 0;
							GameState.autoplayBalance.set(0);
							Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
						}
					}
					this.scatterSymbolSprite.forEach(sprite => sprite.setTint(0xffffff));
					Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
					GameState.isScatterInfoShown.set(true);
					Dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
				}, 1500);
			} 
			else if (columnThreshold > 0 && this.scatterSymbolColumn.length >= columnThreshold) {
				console.log('Symbol render');
				this.animateScatterSymbols(symbol, () => this.renderAllLines());
			} 
			else if (!GameState.isAutoSpinRunning) {
				console.log('c');
				this.loopSingleLine([], winLines);
			} 
			else {
				console.log('d');
				setTimeout(() => {
					GameState.isSpinning.set(false);
					if(GameState.isReward){
						GameState.isReward.set(false);
						Dispatcher.emit(EVENTS.REWARD_COMPLETE)
					}
					this.currentSpin = null;
					console.log(this.activeAutoplay)
					
					// Check if this is the completion of scatter spins (10th spin)
					if(this.scatterInfo.isScatterSpin && this.scatterInfo.currentSpin === 10) {
						// Reset scatter state
						this.scatterInfo.isScatterSpin = false;
						this.scatterInfo.claimed = false;
						this.scatterInfo.currentSpin = 0;
						this.scatterInfo.collections = {};
						this.spinQueue = [];
						GameState.isScatterInfoShown.set(false);
						GameState.isAutoSpinRunning.set(false);
						
						// Show scatter completion
						Dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins);
						Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO);
						
						// Handle autoplay continuation after scatter completion
						if(GameState.isAutoPlayRunning && this.activeAutoplay > 0) {
							// Continue autoplay after scatter info is processed
							setTimeout(() => {
								if(GameState.isAutoPlayRunning && this.activeAutoplay > 0) {
									Dispatcher.emit(ACTION_EVENTS.SPIN_START);
								}
							}, 1000);
						} else {
							Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
						}
					}
					else if(GameState.isAutoPlayRunning){
						if(this.activeAutoplay > 0) {
							Dispatcher.emit(ACTION_EVENTS.SPIN_START)
						}
						else {
							GameState.isAutoPlayRunning.set(false);
							Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
						}
					}
					if(GameState.isReward){
						GameState.isReward.set(false);
						Dispatcher.emit(EVENTS.REWARD_COMPLETE)
					}
					this.currentSpin = null;
					console.log(this.activeAutoplay)
				}, 1000);
			}
			
			return;
		}

		const winLoop: number[] = [];
		let singleLine = 0;
		const singleLineImages: Phaser.GameObjects.Image[][] = [];

		winLines.forEach((line, i) => {
			winLoop.push(line.paylineIndex);
			this.renderSingleLine(line.paylineIndex);
			singleLineImages[i] = [];

			for (let j = singleLine; j < this.payLineImages.length; j++) {
			const img = this.payLineImages[j];
			img.alpha = 0;
			img.visible = false;
			singleLineImages[i].push(img);
			singleLine ++;
			}

			Dispatcher.emit(AUDIO_EVENTS.WIN_LINE_SOUND, line.paylineIndex);
		});

		singleLineImages.forEach((imageGroup, i) => {
			const line = winLines[i];
			const tween = this.scene.tweens.add({
				targets: imageGroup,
				repeat: 0,
				duration: 0,
				hold: 1000,
				delay: i * 1000,
				alpha: 1,
				onStart: () => {
					this.changeTintSymbol(true);
					imageGroup.forEach(img => (img.visible = true));
					this.winSymbol(line);
					console.log(line)
					if(i === 0) Dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins);
				},
				onComplete: () => {
					imageGroup.forEach(img => {
					img.visible = false;
					img.alpha = 0;
					});

					if (i === singleLineImages.length - 1) {
						if (hasValidScatter) {
							this.changeTintSymbol(true);
							setTimeout(() => {
								if(GameState.isAutoPlayRunning.get()){
									if(GameState.isStopFreeSpins.get() || GameState.isStopJackpot.get()){
										GameState.isAutoPlayRunning.set(false);
										this.activeAutoplay = 0;
										GameState.autoplayBalance.set(0);
										Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
									}
								}
								this.scatterSymbolSprite.forEach(sprite => sprite.setTint(0xffffff));
								Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
								GameState.isScatterInfoShown.set(true);
								Dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
							}, 1500);
						} else if (columnThreshold > 0 && this.scatterSymbolColumn.length >= columnThreshold) {
							GameState.isSpinning.set(true);
							this.animateScatterSymbols(symbol, () => this.renderAllLines());
						} else {
							if (GameState.isAutoPlayRunning.get()) {
								// ✅ If Stop any Win Checked
								if (GameState.isStopAnyWin.get()) {
									GameState.isSpinning.set(false);
									this.currentSpin = null;
									this.activeAutoplay = 0;
									GameState.autoplayBalance.set(0);
									GameState.isAutoPlayRunning.set(false);
									if(GameState.isReward.get()){
										GameState.isReward.set(false);
										Dispatcher.emit(EVENTS.REWARD_COMPLETE);
									}
									Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
									return;
								}
							}
							this.loopSingleLine(singleLineImages, winLines);
							setTimeout(() => {
								GameState.isSpinning.set(false);
								if(GameState.isReward.get()){
									GameState.isReward.set(false);
									Dispatcher.emit(EVENTS.REWARD_COMPLETE)
								}
								this.currentSpin = null;
							}, 1000);
						}
					}
				},
			});

		this.payLineImagesRepeat.push(tween);
		});
	}

	changeTintSymbol(selected: boolean) {
		for(let i = 0; i < 5; i++) {
			for(let j = 0; j < 5; j++) {
				if(this.scene.containers[i]) {
					if(selected){
						(this.scene.containers[i].list[j] as Phaser.GameObjects.Sprite).setTint(0x777777);	
					}
					else{
						(this.scene.containers[i].list[j] as Phaser.GameObjects.Sprite).setTint(0xFFFFFF);	
					}
				}
			}
		}
	}

	winSymbol(line: WinLineResult) {
		const GameState = this.GameState;
		for (let i = 0; i < line.totalSymbol; i++) {
			const [reelIndex, symbolIndex] = this.PayLines[line.paylineIndex][i];
			const symbolContainer = this.scene.containers[reelIndex];
			const symbol = symbolContainer.list[symbolIndex + 1] as Phaser.GameObjects.Sprite;

			symbol.setTint(0xFFFFFF);

			const symbolNum = this.multiReelSymbols[reelIndex][symbolIndex];
			const symbolWin = this.winSymbolTextures[symbolNum];
			const posX = symbol.parentContainer.x;
			const posY = symbol.parentContainer.y + symbol.y;

			const symbolWinSprite = this.scene.add.sprite(posX, posY, symbolWin[0], symbolWin[1])
				.setScale(1);

			let coinWin: Phaser.GameObjects.Text | null = null;
			let coinWinBg: Phaser.GameObjects.Sprite | null = null;

			// Show coinWin only if totalSymbol is 2 and i == 1, or if i is second to last
			const showCoinWin = (line.totalSymbol === 2 && i === 1) || (i !== 0 && i === line.totalSymbol - 2);
			if (showCoinWin) {
				coinWinBg = this.scene.add.sprite(
					posX, 
					posY, 
					GameState.isMobile ? 'skin_texture1_level2' : 'skin_texture1_level0', 
					'GG.png')
					.setDepth(2)
					.setScale(GameState.isMobile ? 0.4 : 0.6, 1)
					.setAlpha(0.8);
				
				const coinWon = line.coinWon
				coinWin = this.scene.add.text(posX, posY, coinWon.toString(), {
					font: '500 60px flanker',
					color: '#fcd530',
				})
					.setDepth(2)
					.setOrigin(0.5, 0.5)
					.setScale(GameState.isMobile ? 0.75 : 1);
			}

			let repeatCounter = 0;
			const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
				targets: symbolWinSprite,
				repeat: 4,
				duration: 250,
				hold: 0,
				yoyo: true,
				ease: 'Sine.easeInOut',
				onRepeat: () => {
					repeatCounter++;
					if (repeatCounter === 2 && coinWin && coinWinBg) {
						coinWin.destroy();
						coinWinBg.destroy();
					}
				},
				onComplete: () => {
					symbolWinSprite.destroy();
				},
				onStop: () => {
					symbolWinSprite.destroy();
					if (coinWin && coinWinBg) {
						coinWin.destroy();
						coinWinBg.destroy();
					}
				}
			};

			// Adjust scale or alpha depending on symbolNum
			if (symbolNum > 4) {
				tweenConfig.scale = GameState.isMobile ? { from: .8, to: .9 } : { from: 1, to: 1.2 };
			} else {
				tweenConfig.alpha = { from: 0, to: 1, start: 0 };
			}

			const tween = this.scene.tweens.add(tweenConfig);
			this.payLineImagesRepeat.push(tween);
		}
	}
	
	renderSingleLine(payline: number) {
		const GameState = this.GameState;
		const lineStartXOffset = GameState.isMobile ? 15 : 275;
		const lineStartYOffset = GameState.isMobile ? 300 : 235;
		const yGap = GameState.isMobile ? 100 : 190;
		const halfDistance = GameState.isMobile ? 50 : 105;
		const lineEndXOffset = GameState.isMobile ? 540 - lineStartXOffset : 1600 - lineStartXOffset;
		const lineEndYOffset = lineStartYOffset;
		const points = [
			{x: lineStartXOffset, y: lineStartYOffset + (this.PayLines[payline][0][1] * yGap)},
		]
		for(let i =0; i<5;i++) {
			let innerXGap = halfDistance;
			if(i > 0) {
				innerXGap *= 2;
			}
			points.push({x: lineStartXOffset + halfDistance +(innerXGap * i), y: lineStartYOffset + (this.PayLines[payline][i][1] * yGap)});
			// this.scene.add.circle(lineStartXOffset + halfDistance +(innerXGap * i), lineStartYOffset, 10, color, 1);
		}
		points.push({x: lineEndXOffset, y: lineEndYOffset + (this.PayLines[payline][4][1] * yGap)});

		// Create graphics object once outside the loop to avoid memory allocation
		const circleMask = this.scene.make.graphics({});

		for(let i=0;i<points.length;i++) {
			// Create a circular image with the gradient texture
			const circleImg = this.scene.add.image(points[i].x, points[i].y, 'gradientTexture');
			circleImg.setScale(0.1);
			circleImg.setOrigin(0.5, 0.5); // Center the origin
			
			// Clear and redraw for each point instead of creating new objects
			circleMask.clear();
			circleMask.fillCircle(points[i].x, points[i].y, 12);
			const mask = circleMask.createGeometryMask();
			circleImg.setMask(mask);
			this.payLineImages.push(circleImg);
		}

		// Clean up the graphics object
		circleMask.destroy();

		for(let i = 0; i < points.length-1; i++) {
			const lineImage = this.drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y, GameState.isMobile ? 10 : 20);
			lineImage.setDepth(1)
			this.payLineImages.push(lineImage);
		}

		
	}

	drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number) {
		const lineImage = this.scene.add.image(x1, y1, 'gradientTexture');
		const width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Calculate actual line length
		lineImage.displayWidth = width;
		lineImage.displayHeight = thickness;
		lineImage.setOrigin(0, 0.5); // Set origin to left-center for proper rotation
		const rotation = Math.atan2(y2 - y1, x2 - x1);
		lineImage.setRotation(rotation);
		this.scene.add.existing(lineImage);
		return lineImage;
	}

	renderAllLines(){
		const GameState = this.GameState;
		let singleLine = 0
		let singleLineImages : Phaser.GameObjects.Image[][] = [];
		this.removePayLineImages()
		for(let i=0; i<10; i++) {
			singleLineImages[i] = [];
			this.renderSingleLine(i)
			for(let j = singleLine; j < this.payLineImages.length; j++){
				this.payLineImages[j].alpha = 0
				this.payLineImages[j].visible = false
				singleLineImages[i].push(this.payLineImages[j])
				singleLine++
			}
		}
		for(let i=0; i<singleLineImages.length; i++) {
			const imageGroup = singleLineImages[i];
			this.scene.tweens.add({
				targets: imageGroup,
				repeat: 0,
				duration: 500,
				// repeatDelay: ((options.lineArray.length - 1) * 2) * 1000,
				delay: (i * 2) * 250,
				alpha: 1,
				onStart: () => {
					for(let j = 0; j < imageGroup.length; j++){
						imageGroup[j].visible = true;
					}
					
					if(i === 0) Dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins)
					// Dispatcher.emit(EVENTS.SPIN_REWARD, line.coinWon, line.paylineIndex)
				},
				onRepeat: () => {
					// Dispatcher.emit(EVENTS.SPIN_REWARD, line.coinWon, line.paylineIndex+1)
					// this.changeTintSymbol(true)
				},
				onComplete: () => {
					
					if(i === singleLineImages.length - 1){
						setTimeout(() => {
							GameState.isSpinning.set(false);
							if(GameState.isReward.get()){
								GameState.isReward.set(false);
								Dispatcher.emit(EVENTS.REWARD_COMPLETE)
							}
							this.currentSpin = null;
						},3000);
					}
				},
			})
		}
	}

	loopSingleLine(singleLineImages: Phaser.GameObjects.Image[][], winLines: WinLineResult[]) {
		const GameState = this.GameState;
		this.changeTintSymbol(false);
		if(singleLineImages){
			setTimeout(() => {
				GameState.isSpinning.set(false);

				const stopAutoplay = () => {
					GameState.isAutoPlayRunning.set(false);
					this.activeAutoplay = 0;
					GameState.autoplayBalance.set(0);
					Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
				};

				if (GameState.isAutoPlayRunning) {
					const hasAutoplay = this.activeAutoplay > 0;

					// ✅ If autoplay can continue
					if (hasAutoplay) {
						Dispatcher.emit(ACTION_EVENTS.SPIN_START);
						return;
					}

					// ✅ If autoplay should stop due to conditions
					const shouldStop =
						!hasAutoplay || // no more autoplay spins
						GameState.totalWin.get() > GameState.autoplaySingleWin.get() || // stop if win exceeds limit
						GameState.autoplayBalance.get() > GameState.autoplayBalanceIncreases.get() || // stop if balance too high
						GameState.autoplayBalance.get() < GameState.autoplayBalanceDecreases.get(); // stop if balance too low

					if (shouldStop) {
						stopAutoplay();
					} else {
						stopAutoplay(); // default fallback
					}
				}
				if(GameState.isReward){
					GameState.isReward.set(false);
					Dispatcher.emit(EVENTS.REWARD_COMPLETE)
				}
				this.currentSpin = null;

			}, 1000);
		}

		for (let i = 0; i < singleLineImages.length; i++) {
			const imageGroup = singleLineImages[i];
			const line = winLines[i];

			let coinWin: Phaser.GameObjects.Text | null = null;
			let coinWinBg: Phaser.GameObjects.Sprite | null = null;

			const showCoinWin = (j: number) =>
				(line.totalSymbol === 2 && j === 1) || (j !== 0 && j === line.totalSymbol - 2);

			const createCoinWinDisplay = (symbol: Phaser.GameObjects.Sprite) => {
				const x = symbol.parentContainer.x;
				const y = symbol.parentContainer.y + symbol.y;
				const coinWon = line.coinWon
				coinWinBg = this.scene.add.sprite(
					x,
					y, 
					GameState.isMobile ? 'skin_texture1_level2' : 'skin_texture1_level0', 
					'GG.png')
					.setDepth(2)
					.setScale(GameState.isMobile ? 0.4 : 0.6, 1)
					.setAlpha(0.8);
				coinWin = this.scene.add.text(x, y, coinWon.toString(), {
					font: GameState.isMobile ? '500 45px flanker' : '500 60px flanker',
					color: '#fcd530',
				}).setDepth(2).setOrigin(0.5, 0.5);
			};

			const lineRepeat = this.scene.tweens.add({
				targets: imageGroup,
				repeat: -1,
				duration: 0,
				hold: 2000,
				repeatDelay: singleLineImages.length * 2000,
				delay: (i + 1) * 2000,
				alpha: 1,
				yoyo: true,

				onStart: () => {
					this.changeTintSymbol(true);

					imageGroup.forEach(img => img.setVisible(true));

					for (let j = 0; j < line.totalSymbol; j++) {
						const [reel, index] = this.PayLines[line.paylineIndex][j];
						const symbol = this.scene.containers[reel].list[index + 1] as Phaser.GameObjects.Sprite;
						symbol.setTint(0xFFFFFF);

						if (showCoinWin(j)) {
							createCoinWinDisplay(symbol);
						}
					}
					const coinWon = line.coinWon
					Dispatcher.emit(EVENTS.SPIN_REWARD, coinWon, line.paylineIndex + 1);
				},

				onRepeat: () => {
					this.changeTintSymbol(true);

					for (let j = 0; j < line.totalSymbol; j++) {
						const [reel, index] = this.PayLines[line.paylineIndex][j];
						const symbol = this.scene.containers[reel].list[index + 1] as Phaser.GameObjects.Sprite;
						symbol.setTint(0xFFFFFF);
					}

					if (coinWin && coinWinBg) {
						coinWin.setVisible(true);
						coinWinBg.setVisible(true);
					}
					
					setTimeout(() => {
						GameState.isSpinning.set(false);
						if(GameState.isReward){
							GameState.isReward.set(false);
							Dispatcher.emit(EVENTS.REWARD_COMPLETE)
						}
						this.currentSpin = null;
					}, 1000);

					const coinWon = line.coinWon
					Dispatcher.emit(EVENTS.SPIN_REWARD, coinWon, line.paylineIndex + 1);
				},

				onYoyo: () => {
					if (i === singleLineImages.length - 1) {
						this.changeTintSymbol(false);
						Dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins);
					}

					if (coinWin && coinWinBg) {
						coinWin.setVisible(false);
						coinWinBg.setVisible(false);
					}
					
					setTimeout(() => {
						GameState.isSpinning.set(false);
						if(GameState.isReward){
							GameState.isReward.set(false);
							Dispatcher.emit(EVENTS.REWARD_COMPLETE);
						}
						this.currentSpin = null;
					}, 1000);
				},

				onComplete: () => {
					coinWin?.destroy();
					coinWinBg?.destroy();
					this.changeTintSymbol(false);
					
					setTimeout(() => {
						GameState.isSpinning.set(false);
						if(GameState.isReward){
							GameState.isReward.set(false);
							Dispatcher.emit(EVENTS.REWARD_COMPLETE)
						}
						this.currentSpin = null;
					}, 1000);
				},

				onStop: () => {
					coinWin?.destroy();
					coinWinBg?.destroy();
					this.changeTintSymbol(false);
					
				},
			});

			this.payLineImagesRepeat.push(lineRepeat);
		}
	}

	animateScatterSymbols(symbol: string[], onComplete: () => void) {
		const GameState = this.GameState;
		let completed = 0;
		const total = this.scatterSymbolColumn.length * 3;

		for (let j = 0; j < this.scatterSymbolColumn.length; j++) {
			for (let k = 0; k < 3; k++) {
				this.changeTintSymbol(true)
				const target = this.scene.containers[this.scatterSymbolColumn[j]].list[k + 1] as Phaser.GameObjects.Sprite;

				this.scene.tweens.add({
					targets: target,
					duration: 200,
					repeat: 0,
					delay: j * 300 + k * 100,
					texture: symbol,
					onStart: function () {
						target.setTint(0xFFFFFF)
						const spark = this.targets[0].scene.add
						.image(
						this.targets[0].x + this.targets[0].parentContainer.x,
						this.targets[0].y + this.targets[0].parentContainer.y,
						GameState.isMobile ? 'skin_texture2_level2' : 'skin_texture4_level0',
						'EG.png'
						)
						.setScale(6)
						.setDepth(2);

						this.targets[0].scene.tweens.add({
							targets: spark,
							duration: 200,
							repeat: 0,
							alpha: { from: 0, to: 1, start: 0 },
							yoyo: 1,
						});
					},
					onComplete: () => {
						completed++;
						if (completed === total) {
							onComplete();
						}
					},
				});
			}
		}
	}

	paytable(container: Phaser.GameObjects.Container, frame: string){
		const GameState = this.GameState;
        let bgSymbol = this.scene.add.sprite(0, 0, GameState.isMobile ? 'skin_texture2_level2' : 'skin_texture2_level0', 'ZH.png')
        let txtPaytable1 = this.scene.add.text(-100, -10, 'x5\nx4\nx3\nx2', {
            // fontSize : '50px',
            color : '#5c2c17',
            // fontFamily : 'flanker',
            font: '100 30px britannicBold',
            align: 'center',
            stroke: '#FFDD40',
            strokeThickness: 3,
        }).setOrigin(0, .5)
        let txtPaytable2 = this.scene.add.text(-50, -10, '5000\n1000\n100\n10', {
            // fontSize : '50px',
            color : '#FFDD40',
            // fontFamily : 'flanker',
            font: '100 30px britannicBold',
            align: 'left',
            stroke: '#5c2c17',
            strokeThickness: 3,
        }).setOrigin(0, .5)
        
        switch(frame){
            case 'WE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('5000\n1000\n100\n10')
                break;

            case 'VE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('2000\n400\n40\n5')
                break;

            case 'SE.png':
            case 'TE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('750\n100\n30\n5')
                break;

            case 'DF.png':
            case 'JF.png':
            case 'CF.png':
            case 'IF.png':
                txtPaytable1.setText('x5\nx4\nx3')
                txtPaytable2.setText('150\n40\n5')
                break;

            case 'LF.png':
            case 'NF.png':
            case 'PF.png':
            case 'KF.png':
            case 'MF.png':
            case 'OF.png':
                txtPaytable1.setText('x5\nx4\nx3')
                txtPaytable2.setText('100\n25\n5')
                break;

            default:
                txtPaytable1.setText('Three symbols\nactivate the FREE\nSPIN feature.')
                txtPaytable1.setStroke('', 0)
                txtPaytable1.setFont('500 22px OSWALD-REGULAR')
                txtPaytable2.setVisible(false)
        }
        
        container.add([bgSymbol, txtPaytable1, txtPaytable2])
    }

}

function fnRepeat(tween: Phaser.Tweens.Tween, mgr: VideoSlotReelsManager) {
    // Container moves downward during spinning
    tween.updateTo('y', (tween.targets[0] as Phaser.GameObjects.Container).y + mgr.symbolHeight, true);
    
    const container = tween.targets[0] as Phaser.GameObjects.Container;
    
    // When container moves down, we need to take the bottom symbol (last in array)
    // and move it to the top position (first in array)
    const bottomSymbol = container.list[container.list.length - 1] as Phaser.GameObjects.Sprite;
    
    // Position it above the current top symbol (which is at index 0)
    // The physical position should be ABOVE the current first symbol
    bottomSymbol.y = (container.list[0] as Phaser.GameObjects.Sprite).y - mgr.symbolHeight;
    
    // Now move this bottom symbol to become the first in the container list (top position)
    container.moveTo(bottomSymbol, 0);
}

function fnComplete(tween: Phaser.Tweens.Tween, mgr: VideoSlotReelsManager, index: number) {
    // First bounce - move up by one symbol height
    (tween.targets[0] as Phaser.GameObjects.Container).scene.tweens.add({
        targets: tween.targets[0],
        y: (tween.targets[0] as Phaser.GameObjects.Container).y - mgr.symbolHeight,
        duration: 250,
        ease: 'Linear',
        onComplete: function() {
            // Emit completion event when the last reel finishes
            if (index === mgr.scene.containers!.length - 1) {
                Dispatcher.emit(EVENTS.SPIN_COMPLETE);
            }
        }
    });
}
export default VideoSlotReelsManager;