// read env GAME (must start with VITE_ to be exposed)
import { Logger } from './src/framework/Logger';

const game = import.meta.env.VITE_GAME || 'bookofdead';
const gameType = import.meta.env.VITE_GAME_TYPE || 'videoslot';
const logger = new Logger();
logger.info(`Starting game: ${game} of type: ${gameType}`);

// dynamically import the right game entrypoint
const entry = import(/* @vite-ignore */ `/src/games/${gameType}/${game}/main.ts`)
  .then((module) => {
    logger.info(`Loaded game: ${game}`);
    const config = {};
    module.start(config);
  })
  .catch((err) => {
    logger.error(`Failed to load game ${game}: ${err}`);
  });
