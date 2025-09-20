import BaseGame from "@games/BaseGame";
import { injectable, inject } from "inversify";
import {container} from "@gl/di/container";
import type NetworkManager from "../../framework/networking/NetworkManager";
import { VideoSlotGameState } from "./VideoSlotGameState";

@injectable()
class VideoSlot extends BaseGame {
    public gameState = new VideoSlotGameState();
    constructor(
        @inject("NetworkManager") public networkManager: NetworkManager,
    )
    {
        super(networkManager);

    }   
    
}

export default VideoSlot;