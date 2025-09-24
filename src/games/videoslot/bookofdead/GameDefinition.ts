import { IGameDefinition } from '@gl/interfaces/IGameDefinition';
import VideoSlot from '../VideoSlot';
import { Logger } from '../../../framework/Logger';
import Level from './scene/desktop/Level';
import { container } from '@gl/di/container';
import { VideoSlotGameState } from '../VideoSlotGameState';

const gameId = "310";
container.bind<VideoSlotGameState>("VideoSlotGameState").to(VideoSlotGameState).inSingletonScope();
const BookOfDeadGameDefinition: IGameDefinition = {
  gameClass: VideoSlot,
  id: gameId,
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

    if(payload.launcher_payload.device === "desktop") {
      game.scene.add('MainLevel', Level, true);
    } else {
      // Load Mobile Scene
    }
  },

  config: {
    reels: 5,
    rows: 3,
    paylines: 10,
  },

};

export default BookOfDeadGameDefinition;

