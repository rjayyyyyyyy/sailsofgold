import BaseGame from "@games/BaseGame";
import { injectable, inject } from "inversify";
import {container} from "@gl/di/container";
import type NetworkManager from "../../framework/networking/NetworkManager";
import { VideoSlotGameState } from "./VideoSlotGameState";

@injectable()
class VideoSlot extends BaseGame {
    public gameState: VideoSlotGameState;
    constructor(
        @inject("NetworkManager") public networkManager: NetworkManager,
        @inject("VideoSlotGameState") public videoSlotGameState: VideoSlotGameState = container.get<VideoSlotGameState>("VideoSlotGameState")
    )
    {
        super(networkManager);
        this.gameState = new VideoSlotGameState(networkManager);
        console.log("GameState coinValue", this.videoSlotGameState.coinValue);
    }   
    
}

export default VideoSlot;