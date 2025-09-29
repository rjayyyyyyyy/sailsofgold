import { Preload } from "@shared/scenes/Preload";
import { IGameDefinition } from "./interfaces/IGameDefinition";
import { ILauncherPayload } from "./interfaces/ILauncherPayload";
import Phaser from "phaser";
import VideoSlot from "@games/videoslot/VideoSlot";
import { container } from "./di/container";
import { Logger } from "./Logger";
import { SystemEvent } from "./events/Dispatcher";
import NetworkManager from "./networking/NetworkManager";
import { ILauncherConfig } from "./interfaces/ILauncherConfig";

export class GameBootstrapper {
    private payload: ILauncherPayload;
    private logger = new Logger();
    // TODO: Query params should be handled in loader and passed here
    constructor(private gameDefinition: IGameDefinition) {
        if (!gameDefinition) {
            throw new Error("Game definition is required");
        }
        this.gameDefinition = gameDefinition;
        // this.payload = this.readAllQueryParams();

        // Set apiEndpoint on NetworkManager
        const networkManager = container.get<NetworkManager>("NetworkManager");
        networkManager.setApiEndpoint(this.gameDefinition.apiUrl);
    }

    // loadGameConfig(): Promise<void> {
    //     return new Promise(async resolve => {
    //         this.logger.debug(`Debug mode: ${this.payload.debug}`);
    //         const networkManager = container.get<NetworkManager>("NetworkManager");
    //         networkManager.setGameId(this.gameDefinition.id);
    //         networkManager.setGameConfig(this.gameConfig);
    //         if(!this.payload.debug) {
    //             // resolve();
    //         }
    //         const configUrl = `${this.gameDefinition.configUrl}?${this.queryParams.toString()}`;
    //         const response = await fetch(configUrl);
    //         if (!response.ok) {
    //             throw new Error(`Failed to load game config from ${configUrl}`);
    //         }
    //         const configJson = await response.json();
    //         this.gameConfig = configJson as IGameConfig;

    //         // Set gameHistory on NetworkManager
    //         const historyUrl = this.payload.device === 'mobile' ? this.gameConfig.mobileGameHistoryUrl : this.gameConfig.desktopGameHistoryUrl;
    //         networkManager.setGameHistory(historyUrl);
    //         resolve();
    //     })
    // }

    // private readAllQueryParams(): ILauncherPayload {
    //     return {
    //         pid: parseInt(this.queryParams.get('pid') || '0'),
    //         gameid: this.queryParams.get('gameid') || '',
    //         lang: this.queryParams.get('lang') || '',
    //         currency: this.queryParams.get('currency') || '',
    //         practice: parseInt(this.queryParams.get('practice') || '0'),
    //         user: this.queryParams.get('user') || '',
    //         channel: this.queryParams.get('channel') || '',
    //         brand: this.queryParams.get('brand') || '',
    //         ctx: this.queryParams.get('ctx') || '',
    //         embedmode: this.queryParams.get('embedmode') || '',
    //         origin: decodeURIComponent(this.queryParams.get('origin') || ''),
    //         debug: this.queryParams.get('debug') === '1' ? 1 : 0,
    //         device: this.queryParams.get('device') === 'mobile' ? 'mobile' : 'desktop',
    //     };
    // }

    async launch(element: string, launcher_config: ILauncherConfig) {
        this.logger.info(`Launching game: ${this.gameDefinition.name}`);
        // this.logger.debug(`Query Params: ${JSON.stringify(this.readAllQueryParams())}`);
        // await this.loadGameConfig();

        // TODO: Handle SessionConfig

        // const payload = this.payload; // Capture the payload for use in the nested class
        const gameDefinition = this.gameDefinition; // Capture gameDefinition for use in the nested class
        // const gameConfig = this.gameConfig; // Capture gameConfig for use in the nested class
        class PhaserBootstraper extends Phaser.Scene {
            private glGame: VideoSlot | null = null;
            private logger = new Logger();
            constructor() {
                super({ key: 'PhaserBootstraper' });
            }
            preload() {
                this.logger.info("Starting preload...");
                const assetLevel = launcher_config.deviceType === "desktop" ? "hd" : "sd";
                console.log("Config bundle:", launcher_config.gameModules);
                for(const key in launcher_config.gameModules) {
                    if(key === 'lang') {
                        this.load.json("language", launcher_config.gameModules[key].resource);
                        continue;
                    }
                    this.load.pack(key, launcher_config.gameModules[key].resource);
                }
                // this.load.pack("pack", `resources/games/${gameDefinition.gameType}/${gameDefinition.gameSlug}/preload-asset-pack.json`);
                // this.load.pack(`game-assets-pack`, `resources/games/${gameDefinition.gameType}/${gameDefinition.gameSlug}/asset-pack-${assetLevel}.json`);
                // this.load.json('language', `resources/lang/${payload.lang || 'en_US'}/locale.json`);
                
                this.scene.add('Preload', Preload, false);
                this.logger.info("Preload setup complete");
            }

            private createGameInstance() {
                this.logger.info("Creating game instance...");
                try {
                    this.glGame = container.get(gameDefinition.gameClass) as VideoSlot;
                    this.glGame.setGameConfig(launcher_config);
                    this.logger.info(`Game instance created successfully`);
                    return true;
                } catch (error) {
                    console.log("Failed to create game instance:");
                    console.log(error);
                    this.logger.error(`Failed to create game instance: ${error}`);
                    return false;
                }
            }
            create() {
                this.logger.info("Phaser create() method called!");
                if(this.createGameInstance()) {
                    this.scene.launch('Preload');
                    gameDefinition.gameInitCb?.(this, this.glGame!, {
                        gameId: launcher_config.gameId.toString(),
                        config: launcher_config,
                        session_id: launcher_config.sessionId || '',
                    });
                }
            }

            update(time: number, delta: number): void {
                this.glGame?.tick(time, delta);
            }
        }

        const phaserConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: this.gameDefinition.devices[launcher_config.deviceType as keyof typeof this.gameDefinition.devices]?.width || 800,
            height: this.gameDefinition.devices[launcher_config.deviceType as keyof typeof this.gameDefinition.devices]?.height || 600,
            scene: [PhaserBootstraper],
            parent: element,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };
        new Phaser.Game(phaserConfig);
    }
}