import BaseGame from "@games/BaseGame";
import { injectable, inject } from "inversify";
import {container} from "@gl/di/container";
import type NetworkManager from "../../framework/networking/NetworkManager";
import { VideoSlotGameState } from "./VideoSlotGameState";
import Dispatcher, { EVENTS } from "@gl/events/Dispatcher";
import { CommandEvent } from "@gl/events/eventEnums";
import { Command, ServerCommand } from "@gl/networking/Commands";
import VideoSlotReelsManager from "./VideoSlotReelsManager";
import Reels from "./components/Reels";

@injectable()
class VideoSlot extends BaseGame {
    constructor(
        @inject("NetworkManager") public networkManager: NetworkManager,
        @inject("VideoSlotGameState") public gameState: VideoSlotGameState = container.get<VideoSlotGameState>("VideoSlotGameState"),
        @inject("VideoSlotReelsManager") public reelsManager: VideoSlotReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager")
    )
    {
        super(networkManager);
        console.log("GameState coinValue", this.gameState.coinValue);
        this.setupDispatchers();
    }

    private setupDispatchers() {
        Dispatcher.addListener(CommandEvent.GAME_IN, (command: Command) => {
            switch(command.type){
                case ServerCommand.Setup:
                    this.logger.trace(`Received Setup commandline: ${command.getString(0)}`);
                    const GameState = this.gameState;
                    if(this.gameConfig === null) {
                        this.logger.error("Game config is null!");
                        return;
                    }
                    GameState.betLines.set(this.gameConfig.lines as number);
                    GameState.coinValue.set(parseInt(this.gameConfig.denom as string) * 10);
                    console.log('coin value ' + GameState.coinValue)
                    GameState.betValue.set(GameState.betCoins.get() * GameState.betLines.get() * (GameState.coinValue.get() / 100));

                    GameState.isSoundingOn.set(this.gameConfig.defaultSound as boolean);
                    GameState.isAutoAdjustOn.set(this.gameConfig.defaultAutoAdjustBet as boolean);
                    GameState.isFastplayOn.set(this.gameConfig.defaultFastPlay as boolean);
                    GameState.isSpacebarSpinOn.set(this.gameConfig.defaultSpacebarToSpin as boolean);


                    this.phaserScene.scene.add("Reels", Reels, false);
                    break;
            }
        });

        Dispatcher.addListener(EVENTS.GAME_READY, () => {
            this.phaserScene.scene.launch("Reels");
        });
    }
   
}

export default VideoSlot;