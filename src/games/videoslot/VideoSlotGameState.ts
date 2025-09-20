import { ObservableState } from "@gl/ObservableState";
export class VideoSlotGameState {
    coins: ObservableState<number> = new ObservableState(0);
    coinValueList: number[] = [];
    coinValue: ObservableState<number>;
    coinValueCurrency: ObservableState<string> = new ObservableState("USD");

    constructor() {
        this.coinValueList = [0.1, 0.2, 0.3, 0.4, 0.5, 1.0, 2.0, 5.0]
        this.coinValue = new ObservableState(this.coinValueList[0]);
    }

}