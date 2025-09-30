import { IGameDefinition } from '@gl/interfaces/IGameDefinition';
import VideoSlot from '../VideoSlot';
import { Logger } from '../../../framework/Logger';
import Level from './scene/desktop/Level';
import { container } from '@gl/di/container';
import { VideoSlotGameState } from '../VideoSlotGameState';
import VideoSlotReelsManager from '../VideoSlotReelsManager';
import MobileLevel from './scene/mobile/MobileLevel';
import AudioManager from '@gl/AudioManager';
import FeaturesScene from './scene/desktop/FeaturesScene';
import MobileFeaturesScene from './scene/mobile/MobileFeaturesScene';

const gameId = "310";
container.bind<VideoSlotGameState>("VideoSlotGameState").to(VideoSlotGameState).inSingletonScope();
container.bind<VideoSlotReelsManager>("VideoSlotReelsManager").to(VideoSlotReelsManager).inSingletonScope();
container.bind<AudioManager>("AudioManager").to(AudioManager).inSingletonScope();
const BookOfDeadGameDefinition: IGameDefinition = {
  gameClass: VideoSlot,
  id: gameId,
  gameSlug: "bookofdead",
  gameType: "videoslot",
  name: 'Book of Dead',
  apiUrl: 'https://ff.lydrst.com/',
  configUrl: 'https://cw.lydrst.com/Configuration/v2',
  
  devices: {
    desktop: {
      width: 1280,
      height: 720,
    },
    mobile: {
      width: 720,
      height: 1280,
    }
  },
  
  gameInitCb: (game, gameInstance: VideoSlot, payload) => {
    const logger = new Logger();
    logger.info('Initializing Book of Dead game...');
    logger.info(payload);
    
    gameInstance.initSession("Book of Dead", 
      payload.launcher_payload,
      (payload.launcher_payload.device === "desktop" ? gameId : `100${gameId}`));
    if(payload.config === null) {
      logger.error("Game config is null!");
      gameInstance.networkManager.shutdown();
      return;
    }
    gameInstance.networkManager.setGameId(payload.gameId);
    gameInstance.bindScene(game);
    gameInstance.setConfig(payload.config);
    const audiomgr = container.get<AudioManager>("AudioManager");
    audiomgr.bindBootScene(game);
    if(payload.launcher_payload.device === "desktop") {
      
      logger.info("Loading desktop scene...");
      gameInstance.gameState.isMobile = false;
      game.scene.add('MainLevel', Level, true);
      // game.scene.add('FeatureScene', FeaturesScene, true);
    } else {
      // Load Mobile Scene
      logger.info("Loading mobile scene...");
      gameInstance.gameState.isMobile = true;
      game.scene.add('MobileLevel', MobileLevel, true);
      // game.scene.add('MobileFeaturesScene', MobileFeaturesScene, true);
    }
  },

  config: {
    reels: 5,
    rows: 3,
    paylines: 10,
  },

};

export default BookOfDeadGameDefinition;

