import { ObservableState } from "@gl/ObservableState";
export class VideoSlotGameState {
    public balance: ObservableState<number> = new ObservableState(0);
    public coinBet: ObservableState<number> = new ObservableState(1); 
    public linesBet: ObservableState<number> = new ObservableState(1); 

    public isSpinning: ObservableState<boolean> = new ObservableState(false);
    public isAutoPlayRunning: ObservableState<boolean> = new ObservableState(false);


}