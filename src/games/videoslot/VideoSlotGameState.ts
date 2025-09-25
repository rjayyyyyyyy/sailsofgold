import { container } from "@gl/di/container";
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

    coins: ObservableState<number> = new ObservableState(0);
    coinBet: ObservableState<number> = new ObservableState(1);
    coinValueList: number[] = [];
    coinValue: ObservableState<number>;
    coinValueCurrency: ObservableState<string> = new ObservableState("USD");
    betValue: ObservableState<number> = new ObservableState(0);

    linesBet: ObservableState<number> = new ObservableState(10);

    isSound: ObservableState<boolean> = new ObservableState(true);
    isAutoBet: ObservableState<boolean> = new ObservableState(false);
    isFastPlay: ObservableState<boolean> = new ObservableState(false)
    isSpaceSpin: ObservableState<boolean> = new ObservableState(false)

    isSpinning: ObservableState<boolean> = new ObservableState(false);
    isAutoPlayRunning: ObservableState<boolean> = new ObservableState(false);
    isShowingScatterInfo: ObservableState<boolean> = new ObservableState(false);
    isScatterInfoShown: ObservableState<boolean> = new ObservableState(false);

    isAutoSpinRunning: ObservableState<boolean> = new ObservableState(false);
    // Game states
    balance: ObservableState<number>;
    betCoins: ObservableState<number>;
    betLines: ObservableState<number>;
    informationText: ObservableState<string>;
    gameWinAmount: ObservableState<number>;
    totalWinAmount: ObservableState<number>;
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
    ifAutoplaySingleWin: ObservableState<number>;
    ifAutoplayBalanceIncrease: ObservableState<number>;
    ifAutoplayBalanceDecrease: ObservableState<number>;

    // Menu state
    isSoundingOn: ObservableState<boolean>;
    isFastplayOn: ObservableState<boolean>;
    isAutoAdjustOn: ObservableState<boolean>;
    isSpacebarSpinOn: ObservableState<boolean>;

    // Gamble state
    winCard: ObservableState<number>;
    playerPick: ObservableState<number>;

    // Scatter state
    isScatterSpinning: ObservableState<boolean>;
    isEndScatter: ObservableState<boolean>;


    isStopAnyWin: ObservableState<boolean>;
    isStopFreeSpins: ObservableState<boolean>;
    isStopJackpot: ObservableState<boolean>;
    isLeftHand: ObservableState<boolean>;
    autoplaySingleWin: ObservableState<number>;
    autoplayBalanceIncreases: ObservableState<number>;
    autoplayBalanceDecreases: ObservableState<number>;
    autoplayBalance: ObservableState<number> = new ObservableState(0);

    winCoins: ObservableState<number>;
    isReward: ObservableState<boolean> = new ObservableState(false);
    constructor(
        @inject("NetworkManager") private networkManager: NetworkManager
    ) {
        // Initialize game states
        this.balance = new ObservableState(1000);
        this.betCoins = new ObservableState(1);
        this.betLines = new ObservableState(1);
        this.informationText = new ObservableState("PRESS SPIN TO START");
        this.gameWinAmount = new ObservableState(0);
        this.totalWinAmount = new ObservableState(0);
        this.coinValueList = [0.1, 0.2, 0.3, 0.4, 0.5, 1.0, 2.0, 5.0]
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
        this.ifAutoplaySingleWin = new ObservableState(0);
        this.ifAutoplayBalanceIncrease = new ObservableState(0);
        this.ifAutoplayBalanceDecrease = new ObservableState(0);

        // Initialize menu states
        this.isSoundingOn = new ObservableState(true);
        this.isFastplayOn = new ObservableState(false);
        this.isAutoAdjustOn = new ObservableState(false);
        this.isSpacebarSpinOn = new ObservableState(false);

        // Initialize gamble states
        this.winCard = new ObservableState(0);
        this.playerPick = new ObservableState(0);

        // Initialize scatter states
        this.isScatterSpinning = new ObservableState(false);
        this.isEndScatter = new ObservableState(false);

        this.isSpinning = new ObservableState(false);

        // Subscribe to network events and update game states
        this.playerPick.subscribe((val) => {
            if (val === 0) return;
            this.networkManager.sendCommand(ClientCommand.Gamble, [val.toString()]);
        });

        this.winCoins = new ObservableState(0);
        this.winCoins.subscribe((val) => {
            Dispatcher.emit(EVENTS.WIN_LINES);
        });
    }

    // startSpin() {
    //     if (this.isSpinning.get()) {
    //         console.warn("Already spinning!");
    //         return;
    //     }
    //     const totalBet = this.betCoins.get() * this.betLines.get() * (this.coinValue.get() * 100);
    //     if (this.balance.get() < totalBet) {
    //         console.warn("Insufficient balance!");
    //         this.informationText.set("INSUFFICIENT BALANCE");
    //         return;
    //     }
    //     this.isSpinning.set(true);
    //     this.informationText.set("GOOD LUCK!");
    //     this.balance.set(this.balance.get() - totalBet);
    //     this.gameWinAmount.set(0);
    //     this.totalWinAmount.set(0);
    //     const network = container.get<NetworkManager>('NetworkManager');
    //     network.sendCommand(ClientCommand.Spin, [
    //         this.betCoins.get().toString(),
    //         this.betLines.get().toString(),
    //         (this.coinValue.get() * 100).toString(),
    //         "1"
    //     ])
    // }
}