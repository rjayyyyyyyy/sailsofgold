import { injectable, inject } from "inversify";
import type NetworkManager from "../framework/networking/NetworkManager";
import { ObservableState } from "@gl/ObservableState";
import Dispatcher, { SystemEvent } from "@gl/events/Dispatcher";
import { ILauncherPayload } from "@gl/interfaces/ILauncherPayload";
import { ClientCommand } from "@gl/networking/Commands";
import { Logger } from "@gl/Logger";

@injectable()
class BaseGame {
    private logger = new Logger();
    constructor(
        @inject("NetworkManager") public networkManager: NetworkManager,
    ) {
        
    }

    async initSession(gameName: string, payload: ILauncherPayload, gameId: string) {
        this.logger.info("VideoSlot session initialized.");
        console.log(payload)
        if(payload.debug) {
            console.log("Initiating game session");
            const token = await this.networkManager.getToken();
            console.log("Token", token);
            const ticket = await this.networkManager.createSession();
            console.log("Ticket", ticket);
        }
        this.networkManager.sendCommand(ClientCommand.RequestSession, [
            payload.pid.toString(),
            payload.lang,
            gameId,
            this.getUserAgent(),
            gameName,
            payload.device,
        ]);
        setTimeout(() => {
            this.networkManager.sendCommand(ClientCommand.Login, [
                this.networkManager._ticket,
                "",
                "ipcelectron",
                "",
                "",
            ]);
        }, 100);
    }

    private getUserAgent(){
        const userAgent = navigator.userAgent;
        return userAgent;
    }

    public tick(time: number, delta: number) {
        Dispatcher.emit(SystemEvent.TICK, time, delta);
    }
}

export default BaseGame;