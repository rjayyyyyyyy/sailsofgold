// read env GAME (must start with VITE_ to be exposed)
import { Logger } from './src/framework/Logger';
import Dispatcher, { CommandEvent, EVENTS, NetworkEvent, SystemEvent } from './src/framework/events/Dispatcher';
import type { ILauncherPayload } from './src/framework/interfaces/ILauncherPayload';
import { ClientCommand, Command, ServerCommand } from './src/framework/networking/Commands';
import NetworkManager from './src/framework/networking/NetworkManager';
import { Request } from './src/framework/networking/Request';
import { container } from './src/framework/di/container';

const game = import.meta.env.VITE_GAME || 'bookofdead';
const gameType = import.meta.env.VITE_GAME_TYPE || 'videoslot';
const env = import.meta.env.VITE_ENV || 'dev';
const logger = new Logger();
logger.info(`Starting game: ${game} of type: ${gameType}`);

const scriptFile = env === 'dev' ? `./src/games/${gameType}/${game}/main.ts` : `./dist/games/${game}/${game}.bundle.js`;

function getDebugSessionID(gameId: string, gameName: string) {
  return new Promise(async resolve => {
    const dispatcher = new Dispatcher();
    const apiEndpoint = "https://ff.lydrst.com/";
    const networkManager = new NetworkManager();
    dispatcher.addListener(NetworkEvent.CLIENT_PACKET, (data: string) => {
          console.log("CLIENT_PACKET", data);
          const request = new Request(apiEndpoint);
          request.send(data);
      });
    const queryParams = new URLSearchParams(window.location.search);
    const payload = {
        pid: parseInt(queryParams.get('pid') || '0'),
        gameid: queryParams.get('gameid') || '',
        lang: queryParams.get('lang') || '',
        currency: queryParams.get('currency') || '',
        practice: parseInt(queryParams.get('practice') || '0'),
        user: queryParams.get('user') || '',
        channel: queryParams.get('channel') || '',
        brand: queryParams.get('brand') || '',
        ctx: queryParams.get('ctx') || '',
        embedmode: queryParams.get('embedmode') || '',
        origin: decodeURIComponent(queryParams.get('origin') || ''),
        debug: queryParams.get('debug') === '1' ? 1 : 0,
        device: queryParams.get('device') === 'mobile' ? 'mobile' : 'desktop',
    };
    
    networkManager.sendCommand(ClientCommand.RequestSession, [
        payload.pid.toString(),
        payload.lang,
        gameId,
        networkManager.getUserAgent(),
        gameName,
        payload.device,
    ]);
    dispatcher.emit(EVENTS.LOAD_COMPLETE);
    const delta = 1000 / 60;
    const ticker = setInterval(() => {
      dispatcher.emit(SystemEvent.TICK, Date.now(), delta);
    }, 1000 / 60);
    const listener = dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
      switch(command.type) {
        case ServerCommand.NewSessionId:
          let sessId = command.getString(0);
          resolve(sessId);
          clearInterval(ticker);
          dispatcher.removeListener(CommandEvent.GAME_IN, listener);
          break;
        }
    });
    setTimeout(() => {
        networkManager.sendCommand(ClientCommand.Login, [
            networkManager._ticket,
            "",
            "ipcelectron",
            "",
            "",
        ]);
    }, 100);
    
  });
}

// dynamically import the right game entrypoint
// const entry = import(/* @vite-ignore */ `/src/games/${gameType}/${game}/main.ts`)
const entry = import(/* @vite-ignore */ scriptFile)
  .then(async (module) => {
    logger.info(`Loaded game: ${game}`);

    const queryParams = new URLSearchParams(window.location.search);
    const config: ILauncherPayload = {
      bundle: {
        "pack": `resources/games/${gameType}/${game}/preload-asset-pack.json`,
        "game-assets-pack": `resources/games/${gameType}/${game}/asset-pack-hd.json`,
        "lang": `resources/lang/en_US/locale.json`,
      },
      debug: 1,
      device: 'desktop',
      gameid: '310',
      lang: 'en_US',
      currency: 'CNY',
      practice: 0,
      pid: queryParams.get('pid') ? parseInt(queryParams.get('pid') as string) : 0,
      channel: queryParams.get('channel') || 'mobile',
      user: queryParams.get('user') || '',
      brand: queryParams.get('brand') || 'carnival',
      ctx: queryParams.get('ctx') || 'ipcelectron',
      embedmode: queryParams.get('embedmode') || 'iframe',
      origin: queryParams.get('origin') ? decodeURIComponent(queryParams.get('origin') as string) : '',
    };

    const ticket = await getDebugSessionID(config.gameid, game);
    console.log("Debug session initialized with ticket:", ticket);

    if (env === 'dev') {
      module.start("game-container", config);
    } else {
      window[`${game}_entry`].start("game-container", config);  
    }
  })
  .catch((err) => {
    logger.error(`Failed to load game ${game}: ${err}`);
  });
