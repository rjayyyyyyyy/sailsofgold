import { injectable } from "inversify";
import { PacketHandler } from "./PacketHandler";
import { Logger } from "../Logger";

@injectable()
class NetworkManager {
    private packetHandler = new PacketHandler();
    private logger = new Logger();

    constructor() {
        this.logger.info("NetworkManager initialized");
    }

}
export default NetworkManager;