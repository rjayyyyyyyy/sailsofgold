import {Container} from "inversify";
import NetworkManager from "@gl/networking/NetworkManager";
import BaseGame from "@games/BaseGame";
import VideoSlot from "@games/videoslot/VideoSlot";
import { Logger } from '../Logger';
import Dispatcher from '../events/Dispatcher';
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";

const container = new Container();
const logger = new Logger();

// Bind Logger
container.bind<Logger>(Logger).toSelf().inSingletonScope();

// Bind Dispatcher with named bindings
container.bind("DispatcherLoader").to(Dispatcher).inTransientScope();

// Bind VideoSlotGameState (used by NetworkManager)
container.bind(VideoSlotGameState).toSelf().inSingletonScope();

// Bind NetworkManager
container.bind(NetworkManager).toSelf().inTransientScope();

// Bind BaseGame
container.bind<BaseGame>(BaseGame).to(BaseGame);

// Bind VideoSlot (the actual game class being resolved)
container.bind<VideoSlot>(VideoSlot).to(VideoSlot).inSingletonScope();
logger.info("Container bindings set up");

export {container};