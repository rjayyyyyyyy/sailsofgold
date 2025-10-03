import { injectable, inject } from "inversify";
import { PacketHandler } from "./PacketHandler";
import { Logger } from "../Logger";
import Dispatcher, { CommandEvent, EVENTS, NetworkEvent, SystemEvent } from "@gl/events/Dispatcher";
import { ClientCommand, Command, ServerCommand } from "./Commands";
import { Request } from "./Request";
import { FeatureType, FeatureAwardType } from "./FeatureType";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { ILauncherConfig } from "@gl/interfaces/ILauncherConfig";

@injectable()
class NetworkManager {
    private _dispatcher: Dispatcher;
    private packetHandler: PacketHandler;
    private logger = new Logger();

    private _hasSession: boolean = false;
    private gameId: string = "";

    private apiEndpoint: string = "";
    private gameHistory: string = "";

    public gameConfig: ILauncherConfig | null = null;
    private GameState: VideoSlotGameState;

    // DEBUG Properties
    public _token: string = "";
    public _ticket: string = "";
    // END DEBUG Properties

    public setApiEndpoint(endpoint: string) {
        this.apiEndpoint = endpoint;
    }

    public getApiEndpoint() {
        return this.apiEndpoint;
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

    public setGameConfig(config: ILauncherConfig | null) {
        this.gameConfig = config;
    }

    public getGameConfig(): ILauncherConfig | null {
        return this.gameConfig;
    }

    public setSessionID(sessionId: string) {
        this.logger.info(`Session ID set to: ${sessionId}`);
        this._hasSession = true;
        this._dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessionId);
        this.sendCommand(ClientCommand.NewSPGame, [
            this.gameId,
            "0"
        ]);
    }

    constructor(@inject("DispatcherGame") dispatcher: Dispatcher, @inject(VideoSlotGameState) gameState: VideoSlotGameState) {
        this._dispatcher = dispatcher;
        this.GameState = gameState;
        this.GameState.setNetworkManager(this);
        this.packetHandler = new PacketHandler(this._dispatcher);
        this.packetHandler.enable();

        this.logger.info("NetworkManager initialized");

        this._dispatcher.addListener(NetworkEvent.REQUEST_DATA, (data: string) => {
            console.log("REQUEST_DATA", data);
        });

        this._dispatcher.addListener(NetworkEvent.REQUEST_ERROR, (error: string) => {
            console.log("REQUEST_ERROR", error);
        });

        this._dispatcher.addListener(NetworkEvent.CLIENT_PACKET, (data: string) => {
            console.log("CLIENT_PACKET", data);
            const request = new Request(this.apiEndpoint, this._dispatcher);
            request.send(data);
        });

        this._dispatcher.addListener(NetworkEvent.GAME_HISTORY, (data: string) => {
            console.log("GAME_HISTORY", data);
            const request = new Request(this.gameHistory, this._dispatcher);
            request.send(data);
        });

        this._dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
            this.logger.trace(`GAME_IN: ${command.type}`);
            switch(command.type){
                case ServerCommand.NewSessionId:
                    // this.logger.info("New Session ID received");
                    // if(!this._hasSession){ // no session found previously. Proceed to login
                    //     this._hasSession = true;
                    //     this._dispatcher.emit(NetworkEvent.SESSION_CREATED);

                    //     this.logger.trace("No previous session, proceeding to login");
                    // } else {
                        // session found previously. Continue to NewSPGame
                        // this.logger.trace("Session found, proceeding to NewSPGame");
                        // this.sendCommand(ClientCommand.NewSPGame, [
                        //     this.gameId,
                        //     "0"
                        // ]);
                    // }
                    // let sessId = command.getString(0);
                    // this._dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessId);
                    // this.logger.trace(`New Session ID: ${sessId}`);
                    break;
                case ServerCommand.LoginAnswer:
                    this.logger.trace("Login Answer");
                    // GameState.coinValueCurrency = command.getString(1);
                    break;

                case ServerCommand.NewSPGameStarted:
                    this.logger.trace(`New SP Game Started: ${command.getString(0)}`);
                    this._dispatcher.emit(EVENTS.GAME_READY);
                    this.logger.trace(`New SP Game Started with Game ID: ${command.getString(0)}`);
                    break;

                case ServerCommand.CriticalError:
                    console.log("Critical Error", command.getString(0));
                    // this.packetHandler.disable();
                    break;

                case ServerCommand.IllegalSessionId:
                    console.log("Illegal Session Id", command.getString(0));
                    this.GameState.isIllegalSession.set(true);
                    this._dispatcher.emit(EVENTS.ILLEGAL_SESSION_ID);
                    break;

                case ServerCommand.BuyinStatus:
                    console.log("BuyinStatus", command.getString(0));
                    this.GameState.balance.set(parseInt(command.getString(0)));
                    console.log(this.GameState.balance.get())
                    break

                case ServerCommand.Denominations:
                    console.log("Denominations length", command.length);
                    let denoms = [];
                    for(let i = 1; i < command.length - 1; i++){
                        denoms.push(parseInt(command.getString(i)));
                    }
                    this.GameState.coinValueList = denoms;
                    console.log(this.GameState.coinValueList)
                    break;
            }
        });

        // this._dispatcher.addListener(NetworkEvent.SESSION_CREATED, () => {
        //     setTimeout(() => {
        //         this.sendCommand(ClientCommand.Login, [
        //             this._ticket,
        //             "",
        //             "ipcelectron",
        //             "",
        //             ""
        //         ]);
        //     }, 100);
        // });
    }

    public sendCommand(command: number, data: string[]) {
        this._dispatcher.emit(CommandEvent.GAME_OUT, new Command(command, data));
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