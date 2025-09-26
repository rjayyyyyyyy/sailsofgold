import { container } from "@gl/di/container";
import { IGameConfig } from "@gl/GameConfig";
import Dispatcher from "@gl/events/Dispatcher";
import { EVENTS } from "@gl/events/events";
import { ClientCommand } from "@gl/networking/Commands";
import NetworkManager from "@gl/networking/NetworkManager";
import { ObservableState } from "@gl/ObservableState";
import { inject, injectable } from "inversify";
import { WinLineResult } from "./interfaces/reels";

@injectable()
export class VideoSlotGameState {
    isMobile: boolean = false;
    gameConfig: IGameConfig;

    // coins: ObservableState<number> = new ObservableState(0);
    // coinBet: ObservableState<number> = new ObservableState(1);
    coinValueList: number[] = [];
    coinValue: ObservableState<number>;
    coinValueCurrency: ObservableState<string> = new ObservableState("USD");
    betValue: ObservableState<number> = new ObservableState(0);

    // linesBet: ObservableState<number> = new ObservableState(10);

    // isSound: ObservableState<boolean> = new ObservableState(true);
    // isAutoBet: ObservableState<boolean> = new ObservableState(false);
    // isFastPlay: ObservableState<boolean> = new ObservableState(false)
    // isSpaceSpin: ObservableState<boolean> = new ObservableState(false)

    isSpinning: ObservableState<boolean>;
    isReward: ObservableState<boolean> = new ObservableState(false);
    isAutoPlayRunning: ObservableState<boolean> = new ObservableState(false);
    isIllegalSession: ObservableState<boolean> = new ObservableState(false);

    isAutoSpinRunning: ObservableState<boolean> = new ObservableState(false);
    // Game states
    balance: ObservableState<number>;
    coinBet: ObservableState<number>;
    linesBet: ObservableState<number>;
    informationText: ObservableState<string>;
    totalWin: ObservableState<number> = new ObservableState(0);

    winLines: WinLineResult[];

    // Scene states
    isShowingPaytable: ObservableState<boolean>;
    isShowingMenu: ObservableState<boolean>;
    isShowingAutoplay: ObservableState<boolean>;
    isShowingGamble: ObservableState<boolean>;
    isShowingScatter: ObservableState<boolean>;

    // Autoplay state
    activeAutoplay: ObservableState<number>;
    isAutoplayAnyWin: ObservableState<boolean>;
    isAutoplayJackpot: ObservableState<boolean>;
    isAutoplayFreeSpin: ObservableState<boolean>;
    autoplayBalance: ObservableState<number>;
    ifAutoplaySingleWin: ObservableState<number>;
    ifAutoplayBalanceIncrease: ObservableState<number>;
    ifAutoplayBalanceDecrease: ObservableState<number>;

    // Menu state
    isSoundingOn: ObservableState<boolean>;
    isFastplayOn: ObservableState<boolean>;
    isAutoAdjustOn: ObservableState<boolean>;
    isSpacebarSpinOn: ObservableState<boolean>;
    isLeftHand: ObservableState<boolean>;

    // Gamble state
    winCard: ObservableState<number>;
    playerPick: ObservableState<number>;
    prevWinCard: string[] = [];

    // Scatter state
    bookSprites: Phaser.GameObjects.Sprite[] = [];
    isScatterSpinning: ObservableState<boolean>;
    isScatterInfoShown: ObservableState<boolean> = new ObservableState(false);
    isEndScatter: ObservableState<boolean>;

    winCoins: ObservableState<number>;
    constructor(
        @inject("NetworkManager") private networkManager: NetworkManager
    ) {
        this.gameConfig = networkManager.getGameConfig() as IGameConfig;

        // Initialize game states
        this.balance = new ObservableState(1000);
        this.coinBet = new ObservableState(1);
        this.linesBet = new ObservableState(1);
        this.informationText = new ObservableState("IDS_PRESSPIN");
        this.coinValueList = [10, 20, 30, 40, 50, 100, 200, 500]
        this.coinValue = new ObservableState(this.coinValueList[0]);
        this.coinValueCurrency = new ObservableState("CNY");

        // Initialize scene states
        this.isShowingPaytable = new ObservableState(false);
        this.isShowingMenu = new ObservableState(false);
        this.isShowingAutoplay = new ObservableState(false);
        this.isShowingGamble = new ObservableState(false);
        this.isShowingScatter = new ObservableState(false)

        // Initialize autoplay states
        this.activeAutoplay = new ObservableState(0);
        this.isAutoplayAnyWin = new ObservableState(false);
        this.isAutoplayJackpot = new ObservableState(false);
        this.isAutoplayFreeSpin = new ObservableState(false);
        this.autoplayBalance = new ObservableState(0);
        this.ifAutoplaySingleWin = new ObservableState(0);
        this.ifAutoplayBalanceIncrease = new ObservableState(0);
        this.ifAutoplayBalanceDecrease = new ObservableState(0);

        // Initialize menu states
        this.isSoundingOn = new ObservableState(true);
        this.isFastplayOn = new ObservableState(false);
        this.isAutoAdjustOn = new ObservableState(false);
        this.isSpacebarSpinOn = new ObservableState(false);
        this.isLeftHand = new ObservableState(false);

        // Initialize gamble states
        this.winCard = new ObservableState(0);
        this.playerPick = new ObservableState(0);

        // Initialize scatter states
        this.isScatterSpinning = new ObservableState(false);
        this.isEndScatter = new ObservableState(false);

        this.isSpinning = new ObservableState(false);

        // Subscribe to network events and update game states
        this.playerPick.subscribe((val) => {
            if (val === 0) {
                this.isReward.set(false);
                this.isSpinning.set(false);
            };
            this.networkManager.sendCommand(ClientCommand.Gamble, [val.toString()]);
        });

        this.winCoins = new ObservableState(0);
        this.winCoins.subscribe((val) => {
            Dispatcher.emit(EVENTS.WIN_LINES);
        });
    }
}