import { IGameDefinition } from "@gl/interfaces/IGameDefinition";
import VideoSlot from "../VideoSlot";
import { Logger } from "../../../framework/Logger";
import Level from "./scene/desktop/Level";
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "../VideoSlotGameState";
import VideoSlotReelsManager from "../VideoSlotReelsManager";
import MobileLevel from "./scene/mobile/MobileLevel";
import AudioManager from "@gl/AudioManager";
import NetworkManager from "@gl/networking/NetworkManager";
import Dispatcher from "@gl/events/Dispatcher";

const gameId = "sailsofgold";
// Bind NetworkManager
container
  .bind<NetworkManager>("NetworkManager")
  .to(NetworkManager)
  .inSingletonScope();
container
  .bind<VideoSlotGameState>("VideoSlotGameState")
  .to(VideoSlotGameState)
  .inSingletonScope();
container
  .bind<VideoSlotReelsManager>("VideoSlotReelsManager")
  .to(VideoSlotReelsManager)
  .inSingletonScope();
container
  .bind<AudioManager>("AudioManager")
  .to(AudioManager)
  .inSingletonScope();
container.bind<Dispatcher>("DispatcherGame").toConstantValue(new Dispatcher());
const BookOfDeadGameDefinition: IGameDefinition = {
  gameClass: VideoSlot,
  id: gameId,
  gameSlug: "bookofdead",
  gameType: "videoslot",
  name: "Book of Dead",
  apiUrl: "https://ff.lydrst.com/",
  configUrl: "https://cw.lydrst.com/Configuration/v2",

  devices: {
    desktop: {
      width: 1280,
      height: 720,
    },
    mobile: {
      width: 720,
      height: 1280,
    },
  },

  gameInitCb: (game, gameInstance: VideoSlot, payload) => {
    const logger = new Logger();
    logger.info("Initializing Book of Dead game...");
    logger.info(payload);

    // gameInstance.initSession("Book of Dead",
    //   payload.launcher_payload,
    //   (payload.launcher_payload.device === "desktop" ? gameId : `100${gameId}`));
    if (payload.config === null) {
      logger.error("Game config is null!");
      gameInstance.networkManager.shutdown();
      return;
    }
    gameInstance.networkManager.setGameId(payload.gameId);
    gameInstance.networkManager.setSessionID(payload.config.sessionId);
    gameInstance.bindScene(game);
    gameInstance.setConfig(payload.config);
    const audiomgr = container.get<AudioManager>("AudioManager");
    audiomgr.bindBootScene(game);
    if (payload.config.deviceType === "desktop") {
      logger.info("Loading desktop scene...");
      gameInstance.gameState.isMobile = false;
      game.scene.add("MainLevel", Level, true);
    } else {
      // Load Mobile Scene
      logger.info("Loading mobile scene...");
      gameInstance.gameState.isMobile = true;
      game.scene.add("MobileLevel", MobileLevel, true);
    }
  },

  config: {
    reels: 5,
    rows: 3,
    paylines: 10,
  },
};

export default BookOfDeadGameDefinition;
