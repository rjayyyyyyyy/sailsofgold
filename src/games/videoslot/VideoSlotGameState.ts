import { container } from "@gl/di/container";
import { IGameConfig } from "@gl/GameConfig";
import { ClientCommand } from "@gl/networking/Commands";
import NetworkManager from "@gl/networking/NetworkManager";
import { ObservableState } from "@gl/ObservableState";
import { inject, injectable } from "inversify";

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
    isShowingScatterInfo: boolean = false;
    isScatterInfoShown: boolean = false;
    isIllegalSession: ObservableState<boolean> = new ObservableState(false);

    isAutoSpinRunning: boolean = false;
    // Game states
    balance: ObservableState<number>;
    betCoins: ObservableState<number>;
    betLines: ObservableState<number>;
    informationText: ObservableState<string>;
    gameWinAmount: ObservableState<number>;
    totalWinAmount: ObservableState<number>;
   

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
    isLeftHand: ObservableState<boolean>;

    // Gamble state
    winCard: ObservableState<number>;
    playerPick: ObservableState<number>;

    // Scatter state
    isScatterSpinning: ObservableState<boolean>;
    isEndScatter: ObservableState<boolean>;


    constructor(
        @inject("NetworkManager") private networkManager: NetworkManager
    ) {
        this.gameConfig = networkManager.getGameConfig() as IGameConfig;

        // Initialize game states
        this.balance = new ObservableState(1000);
        this.betCoins = new ObservableState(1);
        this.betLines = new ObservableState(1);
        this.informationText = new ObservableState("PRESS SPIN TO START");
        this.gameWinAmount = new ObservableState(0);
        this.totalWinAmount = new ObservableState(0);
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
            // if (val === 0) return;
            this.networkManager.sendCommand(ClientCommand.Gamble, [val.toString()]);
        });
    }

    startSpin() {
        if (this.isSpinning.get()) {
            console.warn("Already spinning!");
            return;
        }
        const totalBet = this.betCoins.get() * this.betLines.get() * (this.coinValue.get() * 100);
        if (this.balance.get() < totalBet) {
            console.warn("Insufficient balance!");
            this.informationText.set("INSUFFICIENT BALANCE");
            return;
        }
        this.isSpinning.set(true);
        this.informationText.set("GOOD LUCK!");
        this.balance.set(this.balance.get() - totalBet);
        this.gameWinAmount.set(0);
        this.totalWinAmount.set(0);
        this.networkManager.sendCommand(ClientCommand.Spin, [
            this.betCoins.get().toString(),
            this.betLines.get().toString(),
            (this.coinValue.get()).toString(),
            "1"
        ])
    }
}