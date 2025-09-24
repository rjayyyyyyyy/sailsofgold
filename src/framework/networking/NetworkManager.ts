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
            console.log("GAME_IN", command);
            switch(command.type){
                case ServerCommand.NewSessionId:
                    if(!this._hasSession){ // no session found previously. Proceed to login
                        this._hasSession = true;
                        Dispatcher.emit(NetworkEvent.SESSION_CREATED);
                    } else {
                        // session found previously. Continue to NewSPGame
                        this.sendCommand(ClientCommand.NewSPGame, [
                            this.gameId,
                            "0"
                        ]);
                    }
                    let sessId = command.getString(0);
                    Dispatcher.emit(NetworkEvent.CHANGE_SESSION_ID, sessId);
                    console.log("Session ID", sessId);
                    break;
                case ServerCommand.LoginAnswer:
                    console.log("Login Answer");
                    // GameState.coinValueCurrency = command.getString(1);
                    break;

                case ServerCommand.NewSPGameStarted:
                    console.log("New SP Game Started", command.getString(0));
                    Dispatcher.emit(EVENTS.GAME_READY);
                    break;

                // case ServerCommand.Setup:
                //     GameState.linesBet = GameSettings.lines as number;
                //     GameState.coinValue = parseInt(GameSettings.denom as string) * 10
                //     console.log('coin value ' + GameState.coinValue)
                //     GameState.betValue = (GameState.coinBet * GameState.linesBet * (GameState.coinValue / 100))

                //     GameState.isSound = GameSettings.defaultSound as boolean
                //     GameState.isAutoBet = GameSettings.defaultAutoAdjustBet as boolean
                //     GameState.isFastPlay = GameSettings.defaultFastPlay as boolean
                //     GameState.isSpaceSpin = GameSettings.defaultSpacebarToSpin as boolean
                //     break;

                // case ServerCommand.CustomData:
                //     setTimeout(() => {
                //         ReelsManager.scene.initialize();
                //     }, 500);
                //     break;

                // case ServerCommand.BuyinStatus:
                //     console.log("Buyin Status", command.getString(0));
                //     const balance = parseInt(command.getString(0));
                //     console.log("Balance", balance);
                //     if(balance > 0){
                //         GameState.balance = balance;
                //     }
                //     break;

                // case ServerCommand.Denominations:
                //     console.log("Denominations length", command.length);
                //     let denoms = [];
                //     for(let i = 1; i < command.length - 1; i++){
                //         denoms.push(parseInt(command.getString(i)));
                //     }
                //     GameState.coinValueList = denoms;
                //     const coinValueIndex = denoms.indexOf(parseInt(GameSettings.denom as string) * 10)
                //     console.log(GameState.coinValueList)
                //     GameState.coinValue = denoms[coinValueIndex];
                //     break;

                // case ServerCommand.Feature:
                //     console.log(`Feature Packet Received `);
                //     const featureCommand : FeatureType = parseInt(command.getString(0)) as FeatureType;
                //     console.log(`Feature Command: ${FeatureType[featureCommand]}`);
                //     switch(featureCommand){ 
                //         case FeatureType.Scatter:
                //             console.log(`Scatter`);
                //             ReelsManager.scatterInfo.isScatterSpin = true;
                //             break;
                //         case FeatureType.Collection:
                //             const featureAwardType = parseInt(command.getString(1)) as FeatureAwardType;
                //             ReelsManager.scatterInfo.collections[featureAwardType] = {
                //                 amount: parseInt(command.getString(2)),
                //                 name: FeatureAwardType[featureAwardType]
                //             };
                //             break;
                //     }
                //     break;

                // case ServerCommand.Spin:
                //     const isFirstLoad = !ReelsManager.scene.initialized;
                //     if(ReelsManager.scene.initialized){
                //         // ReelsManager.doSpin();
                //     } else {
                //         ReelsManager.scene.initialized = true;
                //     }
                //     // console.clear();
                //     // console.log("Spin Length", command.length);
                    
                //     const coin = parseInt(command.getString(0));
                //     const lines = parseInt(command.getString(1));
                //     const denom = parseInt(command.getString(2));
                //     if(GameState.isAutoPlayRunning){
                //         GameState.autoplayBalance -= coin * lines * denom
                //     }
                //     GameState.coinValue = denom
                //     // console.log(`Coin: ${coin} Lines: ${lines} Denom: ${denom}`);
                //     let symbols = [];
                //     for(let i = 3; i < 18; i++){
                //         symbols.push(parseInt(command.getString(i)));
                //     }

                //     // console.log("Symbols :", symbols.length);
                //     // console.log(symbols);
                //     // const feature = parseInt(command.getString(18));
                //     const winLine = parseInt(command.getString(19));
                //     // console.log(`Feature: ${feature} WinLine: ${winLine}`);
                //     let winLines: WinLineResult[] = [];
                //     for(let i = 20; i < 20 + winLine*5; i++){
                //         winLines.push({
                //             paylineIndex: parseInt(command.getString(i)),
                //             symbol: parseInt(command.getString(i+1)),
                //             totalSymbol: parseInt(command.getString(i+2)),
                //             flags: parseInt(command.getString(i+3)),
                //             coinWon: parseInt(command.getString(i+4)),
                //         });
                //         i += 4;
                //     }
                //     GameState.winLines = winLines
                //     // console.log("Win Lines :", winLines);
                //     let topSymbol = [];
                //     for(let i = 20 + winLine*5; i < 20 + winLine*5 + 5; i++){
                //         topSymbol.push(parseInt(command.getString(i)));
                //     }
                //     // console.log("Top Symbol :", topSymbol);
                //     let bottomSymbol: number[] = [];
                //     for(let i = 20 + winLine*5 + 5; i < 20 + winLine*5 + 10; i++){
                //         bottomSymbol.push(parseInt(command.getString(i)));
                //     }
                //     // console.log("Bottom Symbol :", bottomSymbol);
                //     if(!isFirstLoad){
                //         ReelsManager.enqueueSpin(symbols, winLines, topSymbol, bottomSymbol);
                //     }
                    
                //     // Only render win lines on first load
                //     if(isFirstLoad) {
                //         // GameState.isSpinning = true
                //         GameState.isReward = true
                //         ReelsManager.setReelSymbols(symbols, topSymbol, bottomSymbol);
                //         ReelsManager.updateReelSymbols();
                //         setTimeout(() => {
                //             // GameState.isSpinning = false
                //             console.log("FirstLoad Scatter Info");
                //             console.log(ReelsManager.scatterInfo);
                //             if(ReelsManager.scatterInfo.isScatterSpin) {
                //                 Dispatcher.emit(EVENTS.SHOW_SCATTER_INFO, ReelsManager.scatterSymbolSprite);
                //             }
                //             if(!ReelsManager.scatterInfo.isScatterSpin) ReelsManager.renderWinLines(winLines);
                //         }, 3000);
                //     }
                //     break;

                // case ServerCommand.SpinEnd:
                //     const winCoins = parseInt(command.getString(1));
                //     console.log('Win Coins :' + winCoins)
                //     GameState.winCoins = winCoins

                //     const totalWin = parseInt(command.getString(2));
                //     console.log('Total Win :' + totalWin)
                //     GameState.totalWin = totalWin

                //     if(GameState.isAutoPlayRunning){
                //         GameState.autoplayBalance += totalWin
                //     }
                //     break;

                // case ServerCommand.Gamble:
                //     const pickCard = parseInt(command.getString(0))
                //     console.log('Picked card: ' + pickCard)
                //     const winCode = parseInt(command.getString(1))
                //     console.log('Win Code: ' + winCode)
                //     const coinsWon = parseInt(command.getString(2))
                //     console.log('Coins Won: ' + coinsWon)
                //     const cardWon = parseInt(command.getString(3))
                //     console.log('Card Won: ' + cardWon)
                //     const bonusFinished = parseInt(command.getString(4))
                //     console.log('Bonus Finished: ' + bonusFinished)

                //     GameState.winCoins = coinsWon

                //     const suiteCard = Math.floor(cardWon / 13 + 1)
                //     console.log('Suite Card: ' + suiteCard)
                //     GameState.winCard = suiteCard
                //     break;
                
                // case ServerCommand.Payout:
                //     console.log("Payout Length", command.length);
                //     break;

                case ServerCommand.CriticalError:
                    console.log("Critical Error", command.getString(0));
                    break;

                // case ServerCommand.IllegalSessionId:
                //     console.log("Illegal Session Id", command.getString(0));
                //     Dispatcher.emit(EVENTS.ILLEGAL_SESSION_ID);
                //     break;
            }
        });

        Dispatcher.addListener(NetworkEvent.SESSION_CREATED, () => {
            // setTimeout(() => {
            //     this.sendCommand(ClientCommand.Login, [
            //         this._ticket,
            //         "",
            //         "ipcelectron",
            //         "",
            //         ""
            //     ]);
            // }, 100);
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
}
export default NetworkManager;