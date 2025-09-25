import { injectable } from "inversify";
import { PacketHandler } from "./PacketHandler";
import { Logger } from "../Logger";
import Dispatcher, { CommandEvent, EVENTS, NetworkEvent, SystemEvent } from "@gl/events/Dispatcher";
import { ClientCommand, Command, ServerCommand } from "./Commands";
import { Request } from "./Request";
import { FeatureType, FeatureAwardType } from "./FeatureType";
import { IGameConfig } from "@gl/GameConfig";

@injectable()
class NetworkManager {
    private packetHandler = new PacketHandler();
    private logger = new Logger();

    private _hasSession: boolean = false;
    private gameId: string = "";

    private apiEndpoint: string = "";
    private gameHistory: string = "";

    public gameConfig: IGameConfig | null = null;

    // DEBUG Properties
    public _token: string = "";
    public _ticket: string = "";
    // END DEBUG Properties

    public setApiEndpoint(endpoint: string) {
        this.apiEndpoint = endpoint;
    }

    public setGameHistory(history: string) {
        this.gameHistory = history;
    }

    public getUserAgent(){
        const userAgent = navigator.userAgent;
        return userAgent;
    }

    public setGameId(id: string) {
        this.gameId = id;
    }

    public setGameConfig(config: IGameConfig | null) {
        this.gameConfig = config;
    }

    public getGameConfig(): IGameConfig | null {
        return this.gameConfig;
    }

    constructor() {
        this.logger.info("NetworkManager initialized");

        Dispatcher.addListener(NetworkEvent.REQUEST_DATA, (data: string) => {
            console.log("REQUEST_DATA", data);
        });

        Dispatcher.addListener(NetworkEvent.REQUEST_ERROR, (error: string) => {
            console.log("REQUEST_ERROR", error);
        });

        Dispatcher.addListener(NetworkEvent.CLIENT_PACKET, (data: string) => {
            console.log("CLIENT_PACKET", data);
            const request = new Request(this.apiEndpoint);
            request.send(data);
        });

        Dispatcher.addListener(NetworkEvent.GAME_HISTORY, (data: string) => {
            console.log("GAME_HISTORY", data);
            const request = new Request(this.gameHistory);
            request.send(data);
        });

        Dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
            this.logger.trace(`GAME_IN: ${command.type}`);
            switch(command.type){
                case ServerCommand.NewSessionId:
                    this.logger.info("New Session ID received");
                    if(!this._hasSession){ // no session found previously. Proceed to login
                        this._hasSession = true;
                        Dispatcher.emit(NetworkEvent.SESSION_CREATED);

                        this.logger.trace("No previous session, proceeding to login");
                    } else {
                        // session found previously. Continue to NewSPGame
                        this.logger.trace("Session found, proceeding to NewSPGame");
                        this.sendCommand(ClientCommand.NewSPGame, [
                            this.gameId,
                            "0"
                        ]);
                    }
                    let sessId = command.getString(0);
                    Dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessId);
                    this.logger.trace(`New Session ID: ${sessId}`);
                    break;
                case ServerCommand.LoginAnswer:
                    this.logger.trace("Login Answer");
                    // GameState.coinValueCurrency = command.getString(1);
                    break;

                case ServerCommand.NewSPGameStarted:
                    this.logger.trace(`New SP Game Started: ${command.getString(0)}`);
                    Dispatcher.emit(EVENTS.GAME_READY);
                    this.logger.trace(`New SP Game Started with Game ID: ${command.getString(0)}`);
                    break;

                case ServerCommand.CriticalError:
                    console.log("Critical Error", command.getString(0));
                    // this.packetHandler.disable();
                    break;

                case ServerCommand.IllegalSessionId:
                    console.log("Illegal Session Id", command.getString(0));
                    Dispatcher.emit(EVENTS.ILLEGAL_SESSION_ID);
                    break;
            }
        });

        Dispatcher.addListener(NetworkEvent.SESSION_CREATED, () => {
            setTimeout(() => {
                this.sendCommand(ClientCommand.Login, [
                    this._ticket,
                    "",
                    "ipcelectron",
                    "",
                    ""
                ]);
            }, 100);
        });
    }

    public sendCommand(command: number, data: string[]) {
        Dispatcher.emit(CommandEvent.GAME_OUT, new Command(command, data));
    }

    

    // DEBUG UTILS
    public async getToken() {
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
        this._token = data.access_token;
        return data.access_token;
    }

    public async createSession(){
        try{
            const response = await fetch('https://api.lydrst.com/api/portal/Users/Sessions', {
            // const response = await fetch('https://api.jydlxf.com/api/portal/Users/Sessions', {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + this._token,
                },
            });
            const data = await response.json();
            this._ticket = data.ticket
            return data.ticket;
        } catch(error){
            console.error('Error fetching player data: ', error);
        }
    }

    public shutdown() {
        this.logger.info("NetworkManager shutdown");
        this._hasSession = false;
        this.gameId = "";
        this._token = "";
        this._ticket = "";
        this.packetHandler.disable();
    }
}
export default NetworkManager;