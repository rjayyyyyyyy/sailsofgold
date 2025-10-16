import { FeatureAwardType, FeatureType } from "@gl/networking/FeatureType";
import { WinLineResult } from "./interfaces/reels";
import Reels, { SymbolTextureSet } from "./components/Reels";
import { Logger } from "@gl/Logger";
import { inject, injectable } from "inversify";
import NetworkManager from "@gl/networking/NetworkManager";
import Dispatcher, {
  ACTION_EVENTS,
  AUDIO_EVENTS,
  CommandEvent,
  EVENTS,
} from "@gl/events/Dispatcher";
import { ClientCommand, Command, ServerCommand } from "@gl/networking/Commands";
import { log } from "console";
type ScatterInfo = {
  collections: Partial<
    Record<FeatureAwardType, { amount: number; name: string }>
  >;
  isScatterSpin: boolean;
  currentSpin: number;
  claimed: boolean;
};

type SpinQueue = {
  symbols: number[];
  winLines: WinLineResult[];
  topSymbol: number[];
  bottomSymbol: number[];
};

type PendingSpin = {
  coin: number;
  lines: number;
  denom: number;
  symbols: number[];
  winLines: WinLineResult[];
  topSymbol: number[];
  bottomSymbol: number[];
};

@injectable()
class VideoSlotReelsManager {
  private logger = new Logger();
  symbolHeight: number = 150;

  scene: Reels;

  private hasDelayedSpinStarted: boolean = false;

  scatterInfo: ScatterInfo = {
    isScatterSpin: false,
    collections: {},
    currentSpin: 0,
    claimed: false,
  };

  pendingSpin: PendingSpin | null = null;

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
    @inject("VideoSlotGameState")
    public GameState: import("./VideoSlotGameState").VideoSlotGameState,
    @inject("NetworkManager")
    public NetworkManager: import("@gl/networking/NetworkManager").default,
    @inject("DispatcherGame") public dispatcher: Dispatcher
  ) {
    console.log("ReelsManager initialized");

    this.dispatcher.addListener(ACTION_EVENTS.SPIN_START, () => {
      let GameState = this.GameState;
      console.log(GameState.isSpinning.get());
      // if(this.GameState.isSpinning.get()) return;
      if (this.activeAutoplay > 0) {
        // Autoplay Spin
      } else if (this.GameState.isSpinning.get()) return;
      console.log(
        "Spin Start",
        GameState.coinBet.get(),
        GameState.linesBet.get(),
        GameState.coinValue.get()
      );
      if (this.scatterInfo.isScatterSpin) {
        if (this.scatterInfo.claimed) return;
        if (this.scatterInfo.currentSpin !== 0) return;
        NetworkManager.sendCommand(ClientCommand.Feature, ["6"]);
        GameState.isScatterInfoShown.set(false);
        this.dispatcher.emit(EVENTS.HIDE_SCATTER_INFO);
        this.hasDelayedSpinStarted = true;
      } else {
        GameState.balance.set(
          GameState.balance.get() -
            GameState.coinBet.get() *
              GameState.linesBet.get() *
              GameState.coinValue.get()
        );
        this.logger.debug(`Balance after spin: ${GameState.balance.get()}`);
        NetworkManager.sendCommand(ClientCommand.Spin, [
          GameState.coinBet.get().toString(),
          GameState.linesBet.get().toString(),
          GameState.coinValue.get().toString(),
        ]);
        this.hasDelayedSpinStarted = true;
      }
    });
    this.dispatcher.addListener(EVENTS.SPIN_COMPLETE, () => {
      console.log("currentSpin", this.currentSpin);
      if (this.currentSpin) {
        this.dispatcher.emit(AUDIO_EVENTS.REEL_STOP);
        this.renderWinLines(this.currentSpin.winLines);
        if (this.scatterInfo.isScatterSpin) {
          console.log("scatterInfo.currentSpin", this.scatterInfo.currentSpin);
          if (this.scatterInfo.currentSpin === 9) {
            // setTimeout(() => {
            // 	GameState.isSpinning.set(false);
            // }, 1350);
            this.scatterInfo.isScatterSpin = false;
            this.scatterInfo.claimed = false;
            this.scatterInfo.currentSpin = 0;
            this.scatterInfo.collections = {};
            this.spinQueue = [];
            this.currentSpin = null;
            GameState.isScatterInfoShown.set(false);
            GameState.isAutoSpinRunning.set(false);

            this.dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins.get());
            this.dispatcher.emit(ACTION_EVENTS.AUTO_SPIN_STOP);
            this.dispatcher.emit(EVENTS.SHOW_SCATTER_INFO);
            this.dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_NORMAL);
          }
        }
      } else {
        setTimeout(() => {
          GameState.isSpinning.set(false);
          this.GameState.informationText.set(
            this.scene.cache.json.get("language").texts["IDS_PRESSPIN"]
          );
        }, 1350);
      }
    });

    this.dispatcher.addListener(
      ACTION_EVENTS.AUTO_PLAY_START,
      (activeAutoplay) => {
        this.activeAutoplay = activeAutoplay;
        // if(!this.isAutoPlayRunning){
        GameState.isAutoPlayRunning.set(true);
        // }
        // else{
        this.dispatcher.emit(ACTION_EVENTS.SPIN_START);
        // }
      }
    );

    this.dispatcher.addListener(ACTION_EVENTS.ACTION_GAMBLE, (picked) => {
      console.log("Gamble: " + picked);
      NetworkManager.sendCommand(ClientCommand.Gamble, [picked]);
    });

    this.dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
      switch (command.type) {
        case ServerCommand.Feature:
          console.log(`Feature Packet Received `);
          const featureCommand: FeatureType = parseInt(
            command.getString(0)
          ) as FeatureType;
          console.log(`Feature Command: ${FeatureType[featureCommand]}`);
          switch (featureCommand) {
            case FeatureType.Scatter:
              console.log(`Scatter`);
              this.scatterInfo.isScatterSpin = true;
              break;
            case FeatureType.Collection:
              const featureAwardType = parseInt(
                command.getString(1)
              ) as FeatureAwardType;
              this.scatterInfo.collections[featureAwardType] = {
                amount: parseInt(command.getString(2)),
                name: FeatureAwardType[featureAwardType],
              };
              break;
          }
          break;
        // End Feature case
        case ServerCommand.Spin:
          this.logger.info("Spin command received");
          const coin = parseInt(command.getString(0));
          const lines = parseInt(command.getString(1));
          const denom = parseInt(command.getString(2));
          if (GameState.isAutoPlayRunning.get()) {
            GameState.autoplayBalance.set(
              GameState.autoplayBalance.get() - coin * lines * denom
            );
          }
          GameState.coinValue.set(denom);
          // console.log(`Coin: ${coin} Lines: ${lines} Denom: ${denom}`);
          let symbols = [];
          for (let i = 3; i < 18; i++) {
            symbols.push(parseInt(command.getString(i)));
          }

          // console.log("Symbols :", symbols.length);
          // console.log(symbols);
          // const feature = parseInt(command.getString(18));
          const winLine = parseInt(command.getString(19));
          // console.log(`Feature: ${feature} WinLine: ${winLine}`);
          let winLines: WinLineResult[] = [];
          for (let i = 20; i < 20 + winLine * 5; i++) {
            winLines.push({
              paylineIndex: parseInt(command.getString(i)),
              symbol: parseInt(command.getString(i + 1)),
              totalSymbol: parseInt(command.getString(i + 2)),
              flags: parseInt(command.getString(i + 3)),
              coinWon: parseInt(command.getString(i + 4)),
            });
            i += 4;
          }
          GameState.winLines = winLines;
          console.log("Win Lines :", winLines);
          let topSymbol = [];
          for (let i = 20 + winLine * 5; i < 20 + winLine * 5 + 5; i++) {
            topSymbol.push(parseInt(command.getString(i)));
          }
          // console.log("Top Symbol :", topSymbol);
          let bottomSymbol: number[] = [];
          for (let i = 20 + winLine * 5 + 5; i < 20 + winLine * 5 + 10; i++) {
            bottomSymbol.push(parseInt(command.getString(i)));
          }
          // console.log("Bottom Symbol :", bottomSymbol);
          if (!this.scene) {
            this.logger.info("Scene not initialized, queuing spin command");
            this.pendingSpin = {
              coin,
              lines,
              denom,
              symbols,
              winLines,
              topSymbol,
              bottomSymbol,
            };
            return;
          }
          const isFirstLoad = !this.scene.initialized;
          this.logger.info(
            `Processing Spin command, first load: ${isFirstLoad}`
          );
          if (this.scene.initialized) {
            // ReelsManager.doSpin();
          } else {
            this.scene.initialized = true;
          }
          // console.clear();
          // console.log("Spin Length", command.length);

          if (!isFirstLoad) {
            this.enqueueSpin(symbols, winLines, topSymbol, bottomSymbol);
          }

          // Only render win lines on first load
          if (isFirstLoad) {
            // GameState.isSpinning = true
            // GameState.isReward.set(true)
            this.setReelSymbols(symbols, topSymbol, bottomSymbol);
            this.updateReelSymbols();
            setTimeout(() => {
              // GameState.isSpinning = false
              console.log("FirstLoad Scatter Info");
              console.log(this.scatterInfo);
              if (this.scatterInfo.isScatterSpin) {
                this.dispatcher.emit(
                  EVENTS.SHOW_SCATTER_INFO,
                  this.scatterSymbolSprite
                );
                this.GameState.bookSprites = this.scatterSymbolSprite;
              }
              if (!this.scatterInfo.isScatterSpin)
                this.renderWinLines(winLines);
            }, 3000);
          }
          break;
        // END Spin case
        case ServerCommand.SpinEnd:
          const winCoins = parseInt(command.getString(1));
          this.logger.trace(`Win Coins: ${winCoins}`);
          GameState.winCoins.set(winCoins);
          const totalWin = parseInt(command.getString(2));
          this.logger.trace(`Total Win: ${totalWin}`);
          GameState.totalWin.set(totalWin / 100);
          if (GameState.isAutoPlayRunning.get()) {
            GameState.autoplayBalance.set(
              GameState.autoplayBalance.get() + totalWin
            );
          }
          break;
        // End SpinEnd case

        case ServerCommand.Gamble:
          const pickCard = parseInt(command.getString(0));
          this.logger.trace(`Gamble Pick Card: ${pickCard}`);
          const winCode = parseInt(command.getString(1));
          this.logger.trace(`Win Code: ${winCode}`);
          const coinsWon = parseInt(command.getString(2));
          this.logger.trace(`Coins Won: ${coinsWon}`);
          const cardWon = parseInt(command.getString(3));
          this.logger.trace(`Card Won: ${cardWon}`);
          const bonusFinished = parseInt(command.getString(4));
          this.logger.trace(`Bonus Finished: ${bonusFinished}`);

          GameState.winCoins.set(coinsWon);

          const suiteCard = Math.floor(cardWon / 13 + 1);
          this.logger.trace(`Suite Card: ${suiteCard}`);
          GameState.winCard.set(suiteCard);
          break;

        case ServerCommand.Payout:
          this.logger.trace(`Payout Length: ${command.length}`);
          break;

        case ServerCommand.BuyinStatus:
          this.logger.trace(`Buyin Status: ${command.getString(0)}`);
          const balance = parseInt(command.getString(0));
          this.logger.trace(`Balance: ${balance}`);
          if (balance > 0) {
            this.GameState.balance.set(balance);
          }
          break;
      }
    });

    this.GameState.playerPick.subscribe((val) => {
      console.log("playerPick", val);
      if (val === 0) {
        // this.isReward.set(false);
        // this.isSpinning.set(false);
      }
      NetworkManager.sendCommand(ClientCommand.Gamble, [val.toString()]);
    });
  }

  enqueueSpin(
    symbols: number[],
    winLines: WinLineResult[],
    topSymbol: number[],
    bottomSymbol: number[]
  ) {
    this.spinQueue.push({ symbols, winLines, topSymbol, bottomSymbol });
  }

  bindScene(scene: Reels) {
    this.scene = scene;
    this.logger.trace("ReelsManager bindScene");

    const canvas = this.scene.textures.createCanvas(
      "gradientTexture",
      256,
      256
    );
    if (!canvas) {
      throw new Error("Failed to create canvas");
    }
    const context = canvas.getContext();

    // Create vertical gradient (black-blue-black)
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#0A1A2F"); // Bluish black at top
    gradient.addColorStop(0.5, "#4D94FF"); // Lighter blue in middle
    gradient.addColorStop(1, "#0A1A2F"); // Bluish black at bottom

    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);

    canvas.refresh();
    this.symbolTextures = scene.symbolList;
    this.winSymbolTextures = scene.winSymbolList;
    this.freeSymbolTextures = scene.freeSymbolList;

    // Process pending spin if exists
    if (this.pendingSpin) {
      this.logger.info("Processing queued spin command");
      const { coin, lines, denom, symbols, winLines, topSymbol, bottomSymbol } =
        this.pendingSpin;
      this.pendingSpin = null;
      this.scene.initialized = true;
      this.GameState.coinValue.set(denom);
      this.GameState.winLines = winLines;

      this.setReelSymbols(symbols, topSymbol, bottomSymbol);
      this.updateReelSymbols();
      this.GameState.isShowingFeatures.set(false);
      setTimeout(() => {
        console.log("FirstLoad Scatter Info");
        console.log(this.scatterInfo);
        if (this.scatterInfo.isScatterSpin) {
          this.dispatcher.emit(
            EVENTS.SHOW_SCATTER_INFO,
            this.scatterSymbolSprite
          );
          this.GameState.bookSprites = this.scatterSymbolSprite;
        }
        if (!this.scatterInfo.isScatterSpin) this.renderWinLines(winLines);
      }, 3000);
    }
  }

  // This need to be refactored using event based
  public update() {
    const GameState = this.GameState;
    const NetworkManager = this.NetworkManager;
    // this.logger.debug(`DEBUG: Game State isSpinning: ${GameState.isSpinning.get()}`);
    if (GameState.isSpinning.get()) return;

    // this.logger.debug(`DEBUG: Game State hasDelayedSpinStarted: ${this.hasDelayedSpinStarted}`);
    if (!this.hasDelayedSpinStarted) return;

    if (
      !this.scatterInfo.isScatterSpin &&
      !GameState.isAutoPlayRunning.get() &&
      this.spinQueue.length == 1
    ) {
      // Basic Spin
      const spin = this.spinQueue.shift();
      if (spin) {
        this.doSpin();
        this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
        this.updateReelSymbols();
        this.currentSpin = spin;
      }
    }

    if (
      GameState.isAutoPlayRunning.get() &&
      !GameState.isSpinning.get() &&
      this.spinQueue.length == 1 &&
      !this.GameState.isEndScatter.get()
    ) {
      // Dispatcher.emit(ACTION_EVENTS.SPIN_START);
      const spin = this.spinQueue.shift();
      if (spin) {
        this.doSpin();
        this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
        this.updateReelSymbols();
        this.activeAutoplay--;
        this.GameState.activeAutoplay.set(this.activeAutoplay);
        this.currentSpin = spin;
      }
    }

    if (
      this.scatterInfo.isScatterSpin &&
      !GameState.isSpinning.get() &&
      !GameState.isScatterInfoShown.get()
    ) {
      if (this.spinQueue.length > 0) {
        if (this.spinQueue.length === 9) {
          // NetworkManager.sendCommand(ClientCommand.FreeSpin, ["0"]);
        }
        console.log("Scatter Spin");
        console.log(`Spin Left: ${this.spinQueue.length}`);
        const spin = this.spinQueue.shift();
        if (spin) {
          NetworkManager.sendCommand(ClientCommand.FreeSpin, [
            this.scatterInfo.currentSpin.toString(),
          ]);
          console.log(this.scatterInfo.currentSpin);
          this.doSpin();
          this.setReelSymbols(spin.symbols, spin.topSymbol, spin.bottomSymbol);
          this.updateReelSymbols();
          this.currentSpin = spin;
          this.scatterInfo.currentSpin++;

          const winSymbol = this.scatterInfo.collections[
            FeatureAwardType.Feature
          ]?.amount as number;
          const symbol = this.freeSymbolTextures[winSymbol];
          this.dispatcher.emit(
            ACTION_EVENTS.AUTO_SPIN_START,
            symbol,
            this.scatterInfo.currentSpin
          );
          console.log(GameState.isAutoSpinRunning.get());
        }
      }
    } else if (
      !GameState.isSpinning.get() &&
      this.scatterInfo.isScatterSpin &&
      !GameState.isScatterInfoShown.get()
    ) {
      this.dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, this.scatterSymbolSprite);
      this.GameState.bookSprites = this.scatterSymbolSprite;
      GameState.isScatterInfoShown.set(true);
      this.dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
    }
  }
  updateReelSymbols() {
    const GameState = this.GameState;
    if (this.reelSymbols.length == 0) return;
    let column = 0;
    let row = 1;
    this.scatterSymbolColumn = [];
    let prevcolumn = -1;
    this.multiReelSymbols = [];
    this.scatterSymbolSprite = [];
    for (let i = 0; i < 15; i++) {
      const symbol = this.symbolTextures[this.reelSymbols[i]];
      if (!this.multiReelSymbols[column]) {
        this.multiReelSymbols[column] = [];
      }
      this.multiReelSymbols[column].push(this.reelSymbols[i]);
      (
        this.scene.containers[column].list[row] as Phaser.GameObjects.Sprite
      ).setTexture(symbol[0], symbol[1]);

      let btnSprite = this.scene.containers[column].list[
        row
      ] as Phaser.GameObjects.Sprite;
      let x = btnSprite.parentContainer.x;
      let y = btnSprite.parentContainer.y + btnSprite.y;
      // let container = this.scene.add.container(x - 125, y + 25).setVisible(false);

      // this.paytable(container, symbol[1]);
      let container = this.scene.createPaytableContainer(
        x,
        y,
        this.reelSymbols[i]
      );

      btnSprite.removeAllListeners();
      btnSprite.setInteractive();
      btnSprite
        .on("pointerdown", () => {
          container.visible
            ? container.setVisible(false)
            : container.setVisible(true);
          if (GameState.isMobile) container.setVisible(false);
        })
        .on("pointerout", () => {
          if (container.visible) container.setVisible(false);
        });

      if (this.reelSymbols[i] == 9) {
        this.scatterSymbolSprite.push(
          this.scene.containers[column].list[row] as Phaser.GameObjects.Sprite
        );
        console.log(this.scatterSymbolSprite);
      }

      if (
        this.reelSymbols[i] ==
        this.scatterInfo.collections[FeatureAwardType.Feature]?.amount
      ) {
        // if(this.reelSymbols[i] == 0){
        if (prevcolumn !== column) {
          console.log("column :" + column);
          this.scatterSymbolColumn.push(column);
          prevcolumn = column;
        }
      }

      row++;
      if (row == 4) {
        row = 1;
        column++;
      }
    }

    for (let i = 0; i < 5; i++) {
      (
        this.scene.containers[i].list[0] as Phaser.GameObjects.Sprite
      ).setTexture(
        this.symbolTextures[this.topSymbol[i]][0],
        this.symbolTextures[this.topSymbol[i]][1]
      );
      (
        this.scene.containers[i].list[4] as Phaser.GameObjects.Sprite
      ).setTexture(
        this.symbolTextures[this.bottomSymbol[i]][0],
        this.symbolTextures[this.bottomSymbol[i]][1]
      );
    }
  }

  doSpin() {
    let GameState = this.GameState;
    if (GameState.isSpinning.get()) return;
    this.dispatcher.emit(AUDIO_EVENTS.REEL_START);

    this.removePayLineImages();
    GameState.isSpinning.set(true);
    for (let i = 0; i < 5; i++) {
      const container = this.scene.containers![i];
      if (container) {
        this.scene.containerBlur[i] = container.postFX.addBlur(
          1,
          0,
          2,
          10,
          0xffffff,
          5
        );
      }

      for (let j = 0; j < 5; j++) {
        const symbol = this.scene.containers![i]?.list[
          j
        ] as Phaser.GameObjects.Sprite;
        if (symbol) {
          symbol.setTint(0xffffff);
        }
      }
    }

    if (GameState.isFastplayOn.get()) this.duration = 35;
    else this.duration = 75;

    for (let i = 0; i < 5; i++) {
      const container = this.scene.containers![i];
      if (!container) continue;
      this.scene.columnTween[i] = this.scene.tweens.add({
        targets: container,
        y: container.y + this.symbolHeight,
        duration: this.duration,
        repeat: this.repeat[i],
        ease: "Linear",
        onRepeat: (tween) => fnRepeat(tween, this),
        onComplete: (tween) => fnComplete(tween, this, i),
      });

      this.scene.blurTween[i] = this.scene.tweens.add({
        targets: this.scene.containerBlur[i],
        strength: 0,
        duration: this.duration * this.repeat[i],
        onComplete: () => {
          container.postFX.remove(this.scene.containerBlur[i]);
          this.scene.containerBlur[i].destroy();
        },
      });
    }
  }

  setReelSymbols(
    symbols: number[],
    topSymbol: number[],
    bottomSymbol: number[]
  ) {
    this.reelSymbols = symbols;
    this.topSymbol = topSymbol;
    this.bottomSymbol = bottomSymbol;
  }

  removePayLineImages() {
    for (const lineImage of this.payLineImages) {
      lineImage.destroy();
    }
    this.payLineImages = [];
    for (const repeat of this.payLineImagesRepeat) {
      repeat.stop();
    }
    this.payLineImagesRepeat = [];
  }

  renderWinLines(winLines: WinLineResult[]) {
    // setTimeout(() => {
    // 	GameState.isSpinning.set(false);
    // }, 1350);
    const GameState = this.GameState;
    // const selectedSymbol = 0; //
    const selectedSymbol = this.scatterInfo.collections[
      FeatureAwardType.Feature
    ]?.amount as number;
    const symbol = this.symbolTextures[selectedSymbol];
    const groupA = selectedSymbol >= 0 && selectedSymbol <= 4;
    const groupB = selectedSymbol >= 5 && selectedSymbol <= 8;
    const columnThreshold = groupA ? 3 : groupB ? 2 : 0;
    const hasValidScatter = this.scatterSymbolSprite.length >= 3;

    this.removePayLineImages();
    console.log("winlines length: " + winLines.length);
    if (winLines.length === 0) {
      if (hasValidScatter) {
        console.log("Scatter book");
        this.changeTintSymbol(true);
        setTimeout(() => {
          if (GameState.isAutoPlayRunning.get()) {
            if (
              GameState.isAutoplayFreeSpin.get() ||
              GameState.isAutoplayJackpot.get()
            ) {
              GameState.isAutoPlayRunning.set(false);
              this.activeAutoplay = 0;
              GameState.autoplayBalance.set(0);
              this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
            }
          }
          this.scatterSymbolSprite.forEach((sprite) =>
            sprite.setTint(0xffffff)
          );
          this.dispatcher.emit(
            EVENTS.SHOW_SCATTER_INFO,
            this.scatterSymbolSprite
          );
          this.GameState.bookSprites = this.scatterSymbolSprite;
          GameState.isScatterInfoShown.set(true);
          this.dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
        }, 1500);
      } else if (
        columnThreshold > 0 &&
        this.scatterSymbolColumn.length >= columnThreshold
      ) {
        console.log("Symbol render");
        this.animateScatterSymbols(symbol, () => this.renderAllLines());
      } else if (!GameState.isAutoSpinRunning.get()) {
        console.log("c");
        setTimeout(() => {
          GameState.isSpinning.set(false);
          this.GameState.informationText.set(
            this.scene.cache.json.get("language").texts["IDS_PRESSPIN"]
          );
        }, 1350);
        this.loopSingleLine([], winLines);
      } else {
        console.log("d");
        setTimeout(() => {
          GameState.isSpinning.set(false);
          if (GameState.isReward.get()) {
            // GameState.isReward.set(false);
            this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
          }
          this.currentSpin = null;
          console.log(this.activeAutoplay);

          // Check if this is the completion of scatter spins (10th spin)
          if (
            this.scatterInfo.isScatterSpin &&
            this.scatterInfo.currentSpin === 10
          ) {
            // Reset scatter state
            this.scatterInfo.isScatterSpin = false;
            this.scatterInfo.claimed = false;
            this.scatterInfo.currentSpin = 0;
            this.scatterInfo.collections = {};
            this.spinQueue = [];
            GameState.isScatterInfoShown.set(false);
            GameState.isAutoSpinRunning.set(false);

            // Show scatter completion
            this.dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins.get());
            this.dispatcher.emit(EVENTS.SHOW_SCATTER_INFO);

            // Handle autoplay continuation after scatter completion
            if (GameState.isAutoPlayRunning.get() && this.activeAutoplay > 0) {
              // Continue autoplay after scatter info is processed
              setTimeout(() => {
                if (
                  GameState.isAutoPlayRunning.get() &&
                  this.activeAutoplay > 0
                ) {
                  this.dispatcher.emit(ACTION_EVENTS.SPIN_START);
                }
              }, 1350);
            } else {
              this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
            }
          } else if (GameState.isAutoPlayRunning.get()) {
            if (this.activeAutoplay > 0) {
              this.dispatcher.emit(ACTION_EVENTS.SPIN_START);
            } else {
              GameState.isAutoPlayRunning.set(false);
              this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
            }
          }
          if (GameState.isReward.get()) {
            // GameState.isReward.set(false);
            this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
          }
          this.currentSpin = null;
          console.log(this.activeAutoplay);
        }, 1350);
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
        singleLine++;
      }

      this.dispatcher.emit(AUDIO_EVENTS.WIN_LINE_SOUND, line.paylineIndex);
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
          imageGroup.forEach((img) => (img.visible = true));
          this.winSymbol(line);
          console.log(line);

          if (i === 0)
            this.dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins.get());
        },
        onComplete: () => {
          imageGroup.forEach((img) => {
            img.visible = false;
            img.alpha = 0;
          });

          if (i === singleLineImages.length - 1) {
            if (hasValidScatter) {
              this.changeTintSymbol(true);
              setTimeout(() => {
                if (GameState.isAutoPlayRunning.get()) {
                  if (
                    GameState.isAutoplayFreeSpin.get() ||
                    GameState.isAutoplayJackpot.get()
                  ) {
                    GameState.isAutoPlayRunning.set(false);
                    this.activeAutoplay = 0;
                    GameState.autoplayBalance.set(0);
                    this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
                  }
                }
                this.scatterSymbolSprite.forEach((sprite) =>
                  sprite.setTint(0xffffff)
                );
                this.dispatcher.emit(
                  EVENTS.SHOW_SCATTER_INFO,
                  this.scatterSymbolSprite
                );
                this.GameState.bookSprites = this.scatterSymbolSprite;
                GameState.isScatterInfoShown.set(true);
                this.dispatcher.emit(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN);
              }, 1500);
            } else if (
              columnThreshold > 0 &&
              this.scatterSymbolColumn.length >= columnThreshold
            ) {
              GameState.isSpinning.set(true);
              this.animateScatterSymbols(symbol, () => this.renderAllLines());
            } else {
              if (GameState.isAutoPlayRunning.get()) {
                // ✅ If Stop any Win Checked
                if (GameState.isAutoplayAnyWin.get()) {
                  setTimeout(() => {
                    GameState.isSpinning.set(false);
                  }, 1350);
                  this.currentSpin = null;
                  this.activeAutoplay = 0;
                  GameState.autoplayBalance.set(0);
                  GameState.isAutoPlayRunning.set(false);
                  if (GameState.isReward.get()) {
                    // GameState.isReward.set(false);
                    this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
                  }
                  this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
                  return;
                }
              }
              this.loopSingleLine(singleLineImages, winLines);
              setTimeout(() => {
                GameState.isSpinning.set(false);
                if (GameState.isReward.get()) {
                  // GameState.isReward.set(false);
                  this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
                }
                this.currentSpin = null;
              }, 1350);
            }
          }
        },
      });

      this.payLineImagesRepeat.push(tween);
    });
  }

  changeTintSymbol(selected: boolean) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.scene.containers[i]) {
          if (selected) {
            (
              this.scene.containers[i].list[j] as Phaser.GameObjects.Sprite
            ).setTint(0x777777);
          } else {
            (
              this.scene.containers[i].list[j] as Phaser.GameObjects.Sprite
            ).setTint(0xffffff);
          }
        }
      }
    }
  }

  winSymbol(line: WinLineResult) {
    const GameState = this.GameState;
    for (let i = 0; i < line.totalSymbol; i++) {
      const [reelIndex, symbolIndex] =
        this.scene.PayLines[line.paylineIndex][i];
      const symbolContainer = this.scene.containers[reelIndex];
      const symbol = symbolContainer.list[
        symbolIndex + 1
      ] as Phaser.GameObjects.Sprite;

      symbol.setTint(0xffffff);

      const symbolNum = this.multiReelSymbols[reelIndex][symbolIndex];
      const symbolWin = this.winSymbolTextures[symbolNum];
      const posX = symbol.parentContainer.x;
      const posY = symbol.parentContainer.y + symbol.y;

      const symbolWinSprite = this.scene.add
        .sprite(posX, posY, symbolWin[0], symbolWin[1])
        .setScale(GameState.isMobile ? 1 : 0.725);

      let coinWin: Phaser.GameObjects.Text | null = null;
      let coinWinBg: Phaser.GameObjects.Sprite | null = null;

      // Show coinWin only if totalSymbol is 2 and i == 1, or if i is second to last
      const showCoinWin =
        (line.totalSymbol === 2 && i === 1) ||
        (i !== 0 && i === line.totalSymbol - 2);
      const spriteBgCoinWon = this.scene.coinWon;
      if (showCoinWin) {
        coinWinBg = this.scene.add
          .sprite(posX, posY, spriteBgCoinWon[0], spriteBgCoinWon[1])
          // GameState.isMobile ? 'skin_texture1_level2' : 'skin_texture1_level0',
          // 'GG.png')
          .setDepth(2)
          .setScale(GameState.isMobile ? 0.7 : 0.4, 0.8)
          .setAlpha(0.8);

        const coinWon = line.coinWon;
        coinWin = this.scene.add
          .text(posX, posY, coinWon.toString(), {
            font: GameState.isMobile
              ? "500 35px FLANKER_GRIFFO"
              : "500 50px FLANKER_GRIFFO",
            color: "#fcd530",
          })
          .setDepth(2)
          .setOrigin(0.5, 0.5);
      }

      let repeatCounter = 0;
      const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: symbolWinSprite,
        repeat: 4,
        duration: 250,
        hold: 0,
        yoyo: true,
        ease: "Sine.easeInOut",
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
        },
      };

      // Adjust scale or alpha depending on symbolNum
      if (symbolNum > 4) {
        tweenConfig.scale = GameState.isMobile
          ? { from: 1.1, to: 1.2 }
          : { from: 0.725, to: 0.825 };
      } else {
        tweenConfig.alpha = { from: 0, to: 1, start: 0 };
      }

      const tween = this.scene.tweens.add(tweenConfig);
      this.payLineImagesRepeat.push(tween);
    }
  }

  renderSingleLine(payline: number) {
    const GameState = this.GameState;
    const lineStartXOffset = GameState.isMobile ? 30 : 260;
    const lineStartYOffset = GameState.isMobile ? 430 : 175;
    const yGap = GameState.isMobile ? 127 : 160;
    const halfDistance = GameState.isMobile ? 67 : 75;
    const lineEndXOffset = GameState.isMobile
      ? this.scene.scale.width - lineStartXOffset
      : this.scene.scale.width - lineStartXOffset;
    const lineEndYOffset = lineStartYOffset;
    const points = [
      {
        x: lineStartXOffset,
        y: lineStartYOffset + this.scene.PayLines[payline][0][1] * yGap,
      },
    ];
    for (let i = 0; i < 5; i++) {
      let innerXGap = halfDistance;
      if (i > 0) {
        innerXGap *= 2;
      }
      points.push({
        x: lineStartXOffset + halfDistance + innerXGap * i,
        y: lineStartYOffset + this.scene.PayLines[payline][i][1] * yGap,
      });
      // this.scene.add.circle(lineStartXOffset + halfDistance +(innerXGap * i), lineStartYOffset, 10, color, 1);
    }
    points.push({
      x: lineEndXOffset,
      y: lineEndYOffset + this.scene.PayLines[payline][4][1] * yGap,
    });

    // Create graphics object once outside the loop to avoid memory allocation
    const circleMask = this.scene.make.graphics({});

    for (let i = 0; i < points.length; i++) {
      // Create a circular image with the gradient texture
      const circleImg = this.scene.add.image(
        points[i].x,
        points[i].y,
        "gradientTexture"
      );
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

    for (let i = 0; i < points.length - 1; i++) {
      const lineImage = this.drawLine(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y,
        GameState.isMobile ? 13 : 17
      );
      lineImage.setDepth(1);
      this.payLineImages.push(lineImage);
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number) {
    const lineImage = this.scene.add.image(x1, y1, "gradientTexture");
    const width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Calculate actual line length
    lineImage.displayWidth = width;
    lineImage.displayHeight = thickness;
    lineImage.setOrigin(0, 0.5); // Set origin to left-center for proper rotation
    const rotation = Math.atan2(y2 - y1, x2 - x1);
    lineImage.setRotation(rotation);
    this.scene.add.existing(lineImage);
    return lineImage;
  }

  renderAllLines() {
    const GameState = this.GameState;
    let singleLine = 0;
    let singleLineImages: Phaser.GameObjects.Image[][] = [];
    this.removePayLineImages();
    for (let i = 0; i < 10; i++) {
      singleLineImages[i] = [];
      this.renderSingleLine(i);
      for (let j = singleLine; j < this.payLineImages.length; j++) {
        this.payLineImages[j].alpha = 0;
        this.payLineImages[j].visible = false;
        singleLineImages[i].push(this.payLineImages[j]);
        singleLine++;
      }
    }
    for (let i = 0; i < singleLineImages.length; i++) {
      const imageGroup = singleLineImages[i];
      this.scene.tweens.add({
        targets: imageGroup,
        repeat: 0,
        duration: 500,
        // repeatDelay: ((options.lineArray.length - 1) * 2) * 1000,
        delay: i * 2 * 250,
        alpha: 1,
        onStart: () => {
          for (let j = 0; j < imageGroup.length; j++) {
            imageGroup[j].visible = true;
          }

          if (i === 0)
            this.dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins.get());

          // this.dispatcher.emit(EVENTS.SPIN_REWARD, line.coinWon, line.paylineIndex)
        },
        onRepeat: () => {
          // this.dispatcher.emit(EVENTS.SPIN_REWARD, line.coinWon, line.paylineIndex+1)
          // this.changeTintSymbol(true)
        },
        onComplete: () => {
          if (i === singleLineImages.length - 1) {
            setTimeout(() => {
              GameState.isSpinning.set(false);
              if (GameState.isReward.get()) {
                // GameState.isReward.set(false);
                this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
              }
              this.currentSpin = null;
            }, 3000);
          }
        },
      });
    }
  }

  loopSingleLine(
    singleLineImages: Phaser.GameObjects.Image[][],
    winLines: WinLineResult[]
  ) {
    const GameState = this.GameState;
    this.changeTintSymbol(false);
    if (singleLineImages) {
      setTimeout(() => {
        // GameState.isSpinning.set(false);

        const stopAutoplay = () => {
          GameState.isAutoPlayRunning.set(false);
          this.activeAutoplay = 0;
          GameState.autoplayBalance.set(0);
          this.dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
        };

        if (GameState.isAutoPlayRunning.get()) {
          const hasAutoplay = this.activeAutoplay > 0;

          // ✅ If autoplay can continue
          if (hasAutoplay) {
            this.dispatcher.emit(ACTION_EVENTS.SPIN_START);
            return;
          }

          // ✅ If autoplay should stop due to conditions
          const shouldStop =
            !hasAutoplay || // no more autoplay spins
            GameState.totalWin.get() > GameState.ifAutoplaySingleWin.get() || // stop if win exceeds limit
            GameState.autoplayBalance.get() >
              GameState.ifAutoplayBalanceIncrease.get() || // stop if balance too high
            GameState.autoplayBalance.get() <
              GameState.ifAutoplayBalanceDecrease.get(); // stop if balance too low

          if (shouldStop) {
            stopAutoplay();
          } else {
            stopAutoplay(); // default fallback
          }
        }
        if (GameState.isReward.get()) {
          // GameState.isReward.set(false);
          this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
        }
        this.currentSpin = null;
      }, 1350);
    }

    for (let i = 0; i < singleLineImages.length; i++) {
      const imageGroup = singleLineImages[i];
      const line = winLines[i];

      let coinWin: Phaser.GameObjects.Text | null = null;
      let coinWinBg: Phaser.GameObjects.Sprite | null = null;

      const showCoinWin = (j: number) =>
        (line.totalSymbol === 2 && j === 1) ||
        (j !== 0 && j === line.totalSymbol - 2);

      const spriteBgCoinWon = this.scene.coinWon;
      const createCoinWinDisplay = (symbol: Phaser.GameObjects.Sprite) => {
        const x = symbol.parentContainer.x;
        const y = symbol.parentContainer.y + symbol.y;
        const coinWon = line.coinWon;
        coinWinBg = this.scene.add
          .sprite(x, y, spriteBgCoinWon[0], spriteBgCoinWon[1])
          .setDepth(2)
          .setScale(GameState.isMobile ? 0.7 : 0.4, 0.8)
          .setAlpha(0.8);
        coinWin = this.scene.add
          .text(x, y, coinWon.toString(), {
            font: GameState.isMobile
              ? "500 35px FLANKER_GRIFFO"
              : "500 50px FLANKER_GRIFFO",
            color: "#fcd530",
          })
          .setDepth(2)
          .setOrigin(0.5, 0.5);
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

          imageGroup.forEach((img) => img.setVisible(true));

          for (let j = 0; j < line.totalSymbol; j++) {
            const [reel, index] = this.scene.PayLines[line.paylineIndex][j];
            const symbol = this.scene.containers[reel].list[
              index + 1
            ] as Phaser.GameObjects.Sprite;
            symbol.setTint(0xffffff);

            if (showCoinWin(j)) {
              createCoinWinDisplay(symbol);
            }
          }
          const coinWon = line.coinWon;
          console.log("coinWon ", coinWon);
          this.dispatcher.emit(
            EVENTS.SPIN_REWARD,
            coinWon,
            line.paylineIndex + 1
          );
        },

        onRepeat: () => {
          this.changeTintSymbol(true);

          for (let j = 0; j < line.totalSymbol; j++) {
            const [reel, index] = this.scene.PayLines[line.paylineIndex][j];
            const symbol = this.scene.containers[reel].list[
              index + 1
            ] as Phaser.GameObjects.Sprite;
            symbol.setTint(0xffffff);
          }

          if (coinWin && coinWinBg) {
            coinWin.setVisible(true);
            coinWinBg.setVisible(true);
          }

          setTimeout(() => {
            // GameState.isSpinning.set(false);
            if (GameState.isReward.get()) {
              // GameState.isReward.set(false);
              this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
            }
            this.currentSpin = null;
          }, 1350);

          const coinWon = line.coinWon;
          this.dispatcher.emit(
            EVENTS.SPIN_REWARD,
            coinWon,
            line.paylineIndex + 1
          );
        },

        onYoyo: () => {
          if (i === singleLineImages.length - 1) {
            this.changeTintSymbol(false);
            this.dispatcher.emit(EVENTS.SPIN_REWARD, GameState.winCoins.get());
          }

          if (coinWin && coinWinBg) {
            coinWin.setVisible(false);
            coinWinBg.setVisible(false);
          }

          setTimeout(() => {
            // GameState.isSpinning.set(false);
            if (GameState.isReward.get()) {
              // GameState.isReward.set(false);
              this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
            }
            this.currentSpin = null;
          }, 1350);
        },

        onComplete: () => {
          coinWin?.destroy();
          coinWinBg?.destroy();
          this.changeTintSymbol(false);

          setTimeout(() => {
            // GameState.isSpinning.set(false);
            if (GameState.isReward.get()) {
              // GameState.isReward.set(false);
              this.dispatcher.emit(EVENTS.REWARD_COMPLETE);
            }
            this.currentSpin = null;
          }, 1350);
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
        this.changeTintSymbol(true);
        const target = this.scene.containers[this.scatterSymbolColumn[j]].list[
          k + 1
        ] as Phaser.GameObjects.Sprite;

        this.scene.tweens.add({
          targets: target,
          duration: 200,
          repeat: 0,
          delay: j * 300 + k * 100,
          texture: symbol,
          onStart: function () {
            target.setTint(0xffffff);
            const spark = this.targets[0].scene.add
              .image(
                this.targets[0].x + this.targets[0].parentContainer.x,
                this.targets[0].y + this.targets[0].parentContainer.y,
                GameState.isMobile
                  ? "skin_texture4_level2"
                  : "skin_texture4_level0",
                "EG.png"
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
}

function fnRepeat(tween: Phaser.Tweens.Tween, mgr: VideoSlotReelsManager) {
  // Container moves downward during spinning
  tween.updateTo(
    "y",
    (tween.targets[0] as Phaser.GameObjects.Container).y + mgr.symbolHeight,
    true
  );

  const container = tween.targets[0] as Phaser.GameObjects.Container;

  // When container moves down, we need to take the bottom symbol (last in array)
  // and move it to the top position (first in array)
  const bottomSymbol = container.list[
    container.list.length - 1
  ] as Phaser.GameObjects.Sprite;

  // Position it above the current top symbol (which is at index 0)
  // The physical position should be ABOVE the current first symbol
  bottomSymbol.y =
    (container.list[0] as Phaser.GameObjects.Sprite).y - mgr.symbolHeight;

  // Now move this bottom symbol to become the first in the container list (top position)
  container.moveTo(bottomSymbol, 0);
}

function fnComplete(
  tween: Phaser.Tweens.Tween,
  mgr: VideoSlotReelsManager,
  index: number
) {
  // First bounce - move up by one symbol height
  (tween.targets[0] as Phaser.GameObjects.Container).scene.tweens.add({
    targets: tween.targets[0],
    y: (tween.targets[0] as Phaser.GameObjects.Container).y - mgr.symbolHeight,
    duration: 250,
    ease: "Linear",
    onComplete: function () {
      // Emit completion event when the last reel finishes
      if (index === mgr.scene.containers!.length - 1) {
        mgr.dispatcher.emit(EVENTS.SPIN_COMPLETE);
      }
    },
  });
}
export default VideoSlotReelsManager;
