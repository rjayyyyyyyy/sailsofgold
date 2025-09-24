import { ObservableState } from "@gl/ObservableState";
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
    isShowingScatterInfo: boolean = false;
    isScatterInfoShown: boolean = false;

    isAutoSpinRunning: boolean = false;

    constructor() {
        this.coinValueList = [0.1, 0.2, 0.3, 0.4, 0.5, 1.0, 2.0, 5.0]
        this.coinValue = new ObservableState(this.coinValueList[0]);

        console.log("GameState initialized");

        setTimeout(() => {
            this.coins.set(100); // Initial coins
        }, 1000);
    }

}