import { injectable, inject } from "inversify";
import type NetworkManager from "../framework/networking/NetworkManager";
import { ObservableState } from "@gl/ObservableState";

@injectable()
class BaseGame {
    constructor(
        @inject("NetworkManager") private networkManager: NetworkManager,
    ) {
        
    }
}

export default BaseGame;