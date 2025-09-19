import BaseGame from "@games/BaseGame";
import { injectable, inject } from "inversify";
import type NetworkManager from "../../framework/networking/NetworkManager";
@injectable()
class VideoSlot extends BaseGame {
    constructor(@inject("NetworkManager") public networkManager: NetworkManager) {
        super(networkManager);

    }   
    
}

export default VideoSlot;