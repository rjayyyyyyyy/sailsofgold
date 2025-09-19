import BaseGame from "@games/BaseGame";
import { injectable, inject } from "inversify";
import type NetworkManager from "../../framework/networking/NetworkManager";
import { Logger } from "../../framework/Logger";

@injectable()
class VideoSlot extends BaseGame {
    private logger = new Logger();

    constructor(@inject("NetworkManager") networkManager: NetworkManager) {
        super(networkManager);
    }

    public initSession() {
        this.logger.info("VideoSlot session initialized.");
    }
}

export default VideoSlot;