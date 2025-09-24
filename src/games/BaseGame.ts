import { injectable, inject } from "inversify";
import type NetworkManager from "../framework/networking/NetworkManager";
import { ObservableState } from "@gl/ObservableState";
import Dispatcher, { SystemEvent } from "@gl/events/Dispatcher";
import { ILauncherPayload } from "@gl/interfaces/ILauncherPayload";
import { ClientCommand } from "@gl/networking/Commands";
import { Logger } from "@gl/Logger";
import { IGameConfig } from "@gl/GameConfig";

@injectable()
class BaseGame {
    protected logger = new Logger();
    public gameConfig: IGameConfig | null = null;
    public phaserScene: Phaser.Scene;
    constructor(
        @inject("NetworkManager") public networkManager: NetworkManager,
    ) {
        
    }

    async initSession(gameName: string, payload: ILauncherPayload, gameId: string) {
        this.logger.info("VideoSlot session initialized.");
        console.log(payload)
        if(payload.debug) {
            this.logger.info("Initiating game session");
            const token = await this.networkManager.getToken();
            this.logger.trace(`Token: ${token}`);
            const ticket = await this.networkManager.createSession();
            this.logger.trace(`Ticket: ${ticket}`);
        }
        this.networkManager.sendCommand(ClientCommand.RequestSession, [
            payload.pid.toString(),
            payload.lang,
            gameId,
            this.getUserAgent(),
            gameName,
            payload.device,
        ]);
    }

    private getUserAgent(){
        const userAgent = navigator.userAgent;
        return userAgent;
    }

    setConfig(config: IGameConfig) {
        this.gameConfig = config;
    }

    public tick(time: number, delta: number) {
        Dispatcher.emit(SystemEvent.TICK, time, delta);
    }

    bindScene(scene: Phaser.Scene) {
        this.phaserScene = scene;
        this.logger.trace("BaseGame bindScene");
    }
}

export default BaseGame;