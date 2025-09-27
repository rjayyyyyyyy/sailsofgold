// read env GAME (must start with VITE_ to be exposed)
import { Logger } from './src/framework/Logger';

const game = import.meta.env.VITE_GAME || 'bookofdead';
const gameType = import.meta.env.VITE_GAME_TYPE || 'videoslot';
const env = import.meta.env.VITE_ENV || 'dev';
const logger = new Logger();
logger.info(`Starting game: ${game} of type: ${gameType}`);

const scriptFile = env === 'dev' ? `./src/games/${gameType}/${game}/main.ts` : `./dist/games/${game}/${game}.bundle.js`;

// dynamically import the right game entrypoint
// const entry = import(/* @vite-ignore */ `/src/games/${gameType}/${game}/main.ts`)
const entry = import(/* @vite-ignore */ scriptFile)
  .then((module) => {
    logger.info(`Loaded game: ${game}`);

    const config = {
      bundle: {
        "pack": `resources/games/${gameType}/${game}/preload-asset-pack.json`,
        "game-assets-pack": `resources/games/${gameType}/${game}/asset-pack-hd.json`,
        "lang": `resources/lang/en_US/locale.json`,
      },
      debug: true,
      device: 'desktop',
      gameid: '310',
    };

    if (env === 'dev') {
      module.start(config);
    } else {
      window[`${game}_entry`].start(config);  
    }
  })
  .catch((err) => {
    logger.error(`Failed to load game ${game}: ${err}`);
  });
