import { IGameDefinition } from '@gl/interfaces/IGameDefinition';
import VideoSlot from '../VideoSlot';
import { Logger } from '../../../framework/Logger';

const BookOfDeadGameDefinition: IGameDefinition = {
  gameClass: VideoSlot,
  id: '100300',
  name: 'Book of Dead',
  apiUrl: 'https://ff.lydrst.com/',
  configUrl: 'https://cw.lydrst.com/Configuration/v2',
  
  devices: {
    desktop: {
      width: 1600,
      height: 900,
    },
    mobile: {
      width: 600,
      height: 1300,
    }
  },
  
  gameInitCb: (scene, game: VideoSlot) => {
    const logger = new Logger();
    logger.info('Initializing Book of Dead game...');
    game.initSession(); 
  },

  config: {
    reels: 5,
    rows: 3,
    paylines: 10,
  },

};

export default BookOfDeadGameDefinition;

