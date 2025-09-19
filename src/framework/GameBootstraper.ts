import { Preload } from "@shared/scenes/Preload";
import { IGameConfig } from "./GameConfig";
import { IGameDefinition } from "./interfaces/IGameDefinition";
import { ILauncherPayload } from "./interfaces/ILauncherPayload";
import Phaser from "phaser";
import VideoSlot from "@games/videoslot/VideoSlot";
import { container } from "./di/container";
import { Logger } from "./Logger";

export class GameBootstrapper {
    private queryParams: URLSearchParams = new URLSearchParams(window.location.search);
    private payload: ILauncherPayload;
    private gameConfig: IGameConfig | null = null;
    private logger = new Logger();
    constructor(private gameDefinition: IGameDefinition) {
        if (!gameDefinition) {
            throw new Error("Game definition is required");
        }
        this.gameDefinition = gameDefinition;
        this.payload = this.readAllQueryParams();

    }

    async loadGameConfig(): Promise<void> {
        this.logger.debug(`Debug mode: ${this.payload.debug}`);
        if(!this.payload.debug) {
            const configUrl = `${this.gameDefinition.configUrl}?${this.queryParams.toString()}`;
            const response = await fetch(configUrl);
            if (!response.ok) {
                throw new Error(`Failed to load game config from ${configUrl}`);
            }
            const configJson = await response.json();
            this.gameConfig = configJson as IGameConfig;
        }
    }

    private readAllQueryParams(): ILauncherPayload {
        return {
            pid: parseInt(this.queryParams.get('pid') || '0'),
            gid: this.queryParams.get('gid') || '',
            lang: this.queryParams.get('lang') || '',
            currency: this.queryParams.get('currency') || '',
            practice: parseInt(this.queryParams.get('practice') || '0'),
            user: this.queryParams.get('user') || '',
            channel: this.queryParams.get('channel') || '',
            brand: this.queryParams.get('brand') || '',
            ctx: this.queryParams.get('ctx') || '',
            embedmode: this.queryParams.get('embedmode') || '',
            origin: decodeURIComponent(this.queryParams.get('origin') || ''),
            debug: this.queryParams.get('debug') === '1' ? 1 : 0,
            device: this.queryParams.get('device') === 'mobile' ? 'mobile' : 'desktop',
        };
    }

    launch() {
        this.logger.info(`Launching game: ${this.gameDefinition.name}`);
        this.logger.debug(`Query Params: ${JSON.stringify(this.readAllQueryParams())}`);
        this.loadGameConfig();

        const payload = this.payload; // Capture the payload for use in the nested class
        const gameDefinition = this.gameDefinition; // Capture gameDefinition for use in the nested class

        class PhaserBootstraper extends Phaser.Scene {
            private glGame: VideoSlot | null = null;
            private logger = new Logger();
            constructor() {
                super({ key: 'PhaserBootstraper' });
            }
            preload() {
                this.logger.info("Starting preload...");

                this.load.pack("pack", `assets/${payload.gid}/preload-asset-pack.json`);
                const assetLevel = payload.device === "desktop" ? "hd" : "sd";
                this.load.pack(`game-assets-pack`, `assets/${payload.gid}/asset-pack-${assetLevel}.json`);
                this.scene.add('Preload', Preload, false);
                this.logger.info("Preload setup complete");
            }

            private createGameInstance() {
                this.logger.info("🎮 Creating game instance...");
                try {
                    this.glGame = container.get(gameDefinition.gameClass) as VideoSlot;
                    this.logger.info(`Game instance created successfully: ${this.glGame}`);
                    return true;
                } catch (error) {
                    this.logger.error(`Failed to create game instance: ${error}`);
                    return false;
                }
            }
            create() {
                this.logger.info("🎮 Phaser create() method called!");
                if(this.createGameInstance()) {
                    this.scene.launch('Preload');
                    gameDefinition.gameInitCb?.(this, this.glGame!);
                }
            }
        }

        const gameConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: this.gameDefinition.devices[this.payload.device]?.width || 800,
            height: this.gameDefinition.devices[this.payload.device]?.height || 600,
            scene: [PhaserBootstraper],
            parent: 'game-container',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };
        new Phaser.Game(gameConfig);
    }
}