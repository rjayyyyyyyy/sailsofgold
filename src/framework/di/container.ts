import {Container} from "inversify";
import NetworkManager from "@gl/networking/NetworkManager";
import BaseGame from "@games/BaseGame";
import VideoSlot from "@games/videoslot/VideoSlot";
import { Logger } from '../Logger';

const container = new Container();
const logger = new Logger();

// Bind NetworkManager
container.bind<NetworkManager>("NetworkManager").to(NetworkManager).inSingletonScope();

// Bind BaseGame
container.bind<BaseGame>(BaseGame).to(BaseGame);

// Bind VideoSlot (the actual game class being resolved)
container.bind<VideoSlot>(VideoSlot).to(VideoSlot).inSingletonScope();
logger.info("Container bindings set up");

export {container};