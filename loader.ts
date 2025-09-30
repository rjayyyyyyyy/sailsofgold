/// <reference types="vite/client" />

// read env GAME (must start with VITE_ to be exposed)
import { Logger } from './src/framework/Logger';
import Dispatcher, { CommandEvent, EVENTS, NetworkEvent, SystemEvent } from './src/framework/events/Dispatcher';
import type { ILauncherPayload } from './src/framework/interfaces/ILauncherPayload';
import { type ILauncherConfig, sampleConfig } from './src/framework/interfaces/ILauncherConfig';
import { ClientCommand, Command, ServerCommand } from './src/framework/networking/Commands';
import NetworkManager from './src/framework/networking/NetworkManager';
import { Request } from './src/framework/networking/Request';
import { VideoSlotGameState } from './src/games/videoslot/VideoSlotGameState';
import { container } from './src/framework/di/container';

const game = import.meta.env.VITE_GAME || 'bookofdead';
const gameType = import.meta.env.VITE_GAME_TYPE || 'videoslot';
const env = import.meta.env.VITE_ENV || 'dev';
const logger = new Logger();
logger.info(`Starting game: ${game} of type: ${gameType}`);

const scriptFile = env === 'dev' ? `./src/games/${gameType}/${game}/main.ts` : `./dist/games/${game}/${game}.bundle.js`;

async function getToken() {
  const jsonData = JSON.stringify({
      key: 'BlSGtgIpVfm1QkpPutX2',
      keyType: 0,
      mid: '9284686FCEDD415F46B5C6874E47A257',
      mspecs: 'X-1001GLcma_cny001',
      version: '1.4.2'
  })
  
  const response = await fetch('https://api.lydrst.com/token', {
  // const response = await fetch('https://api.jydlxf.com/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Client-Id': 'carnival'
      },
      body: jsonData
  });

  const data = await response.json();
  return data.access_token;
}

async function createSession(token: string){
    try{
        const response = await fetch('https://api.lydrst.com/api/portal/Users/Sessions', {
        // const response = await fetch('https://api.jydlxf.com/api/portal/Users/Sessions', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
        });
        const data = await response.json();
        return data.ticket;
    } catch(error){
        console.error('Error fetching player data: ', error);
    }
}

function getDebugSessionID(gameId: string, gameName: string) {
  return new Promise<string>(async resolve => {
    const dispatcher = container.get("DispatcherLoader") as Dispatcher;
    const gameState = container.get(VideoSlotGameState) as VideoSlotGameState;
    const networkManager = new NetworkManager(dispatcher, gameState);
    networkManager.setApiEndpoint("https://ff.lydrst.com/");
    // dispatcher.addListener(NetworkEvent.CLIENT_PACKET, (data: string) => {
    //       console.log("CLIENT_PACKET LOADER", data);
    //       const request = new Request(networkManager.getApiEndpoint(), dispatcher);
    //       request.send(data);
    //   });
    const queryParams = new URLSearchParams(window.location.search);
    const payload : ILauncherPayload = {
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

    const token = await getToken();
    const ticket = await createSession(token);
    (networkManager as any)._ticket = ticket;
    console.log("LOADER obtained ticket:", ticket);
    
    networkManager.sendCommand(ClientCommand.RequestSession, [
        payload.pid.toString(),
        payload.lang,
        gameId,
        networkManager.getUserAgent(),
        gameName,
        payload.device,
    ]);
    // dispatcher.emit(EVENTS.LOAD_COMPLETE);
    const delta = 1000 / 60;
    const ticker = setInterval(() => {
      dispatcher.emit(SystemEvent.TICK, Date.now(), delta);
    }, 1000 / 60);
    let hasSession = false;
    const listener = dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
      switch(command.type) {
        case ServerCommand.NewSessionId:
          // this.logger.info("New Session ID received");
          if(!hasSession){ // no session found previously. Proceed to login
              hasSession = true;

              let sessId = command.getString(0);
              dispatcher.emit(NetworkEvent.SESSION_CREATED);

              dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessId);
              logger.trace("No previous session, proceeding to login");
          } else {
              // session found previously. Continue to NewSPGame
              // this.logger.trace("Session found, proceeding to NewSPGame");
              // this.sendCommand(ClientCommand.NewSPGame, [
              //     this.gameId,
              //     "0"
              // ]);
            let sessId = command.getString(0);
            console.log("LOADER Received NewSessionId", sessId);
            
            resolve(sessId);
            clearInterval(ticker);
            dispatcher.removeListener(CommandEvent.GAME_IN, listener);
          }
          // let sessId = command.getString(0);
          // this._dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessId);
          // this.logger.trace(`New Session ID: ${sessId}`);
          
          break;
        }
    });
    dispatcher.addListener(NetworkEvent.SESSION_CREATED, () => {
        setTimeout(() => {
            console.log("LOADER Sending Login command");
            networkManager.sendCommand(ClientCommand.Login, [
                networkManager._ticket,
                "",
                "ipcelectron",
                "",
                ""
            ]);
        }, 100);
    });
    
  });
}

// dynamically import the right game entrypoint
// const entry = import(/* @vite-ignore */ `/src/games/${gameType}/${game}/main.ts`)
const entry = import(/* @vite-ignore */ scriptFile)
  .then(async (module) => {
    logger.info(`Loaded game: ${game}`);

    const queryParams = new URLSearchParams(window.location.search);
    const config: ILauncherConfig = {
      ...sampleConfig,
      gameModules: {
        "pack": {
          script: "",
          resource: `resources/games/${gameType}/${game}/preload-asset-pack.json`
        },
        "game-assets-pack": {
          script: "",
          resource: `resources/games/${gameType}/${game}/asset-pack-hd.json`
        },
        "lang": {
          script: "",
          resource: `resources/lang/en_US/locale.json`
        },
      },
      debug: queryParams.get('debug') === '1' ? true : false,
      deviceType: 'desktop',
      gameId: 310,
      language: 'en_US',
      currency: 'CNY',
      practice: 0,
      pId: queryParams.get('pid') ? parseInt(queryParams.get('pid') as string) : 0,
      channel: queryParams.get('channel') || 'mobile',
      brand: queryParams.get('brand') || 'carnival',
    };

    

    if (env === 'dev') {
      const sessionId = await getDebugSessionID(config.gameId.toString(), game);
      console.log("Debug session initialized with sessionId:", sessionId);
      config.sessionId = sessionId;
      module.start("game-container", config);
    } else {
      window[`${game}_entry`].start("game-container", config);  
    }
  })
  .catch((err) => {
    logger.error(`Failed to load game ${game}: ${err}`);
  });
