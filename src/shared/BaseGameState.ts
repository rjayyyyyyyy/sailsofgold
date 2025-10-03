import { inject, injectable } from "inversify";
import { ObservableState } from "@gl/ObservableState";
import { ILauncherConfig } from "@gl/interfaces/ILauncherConfig";
import NetworkManager from "@gl/networking/NetworkManager";

@injectable()
export abstract class BaseGameState {
  isMobile: boolean = false;
  gameConfig: ILauncherConfig;
  coinValueCurrency: ObservableState<string> = new ObservableState("USD");

  isIllegalSession: ObservableState<boolean> = new ObservableState(false);

  // Menu state
  isSoundingOn: ObservableState<boolean>;

  private networkManager: NetworkManager;

  constructor(
  ) {
    this.coinValueCurrency = new ObservableState("CNY");

    // Initialize menu states
    this.isSoundingOn = new ObservableState(true);
  }

  setNetworkManager(networkManager: NetworkManager) {
    this.networkManager = networkManager;
    this.gameConfig = networkManager.getGameConfig() as ILauncherConfig;
  }
}
