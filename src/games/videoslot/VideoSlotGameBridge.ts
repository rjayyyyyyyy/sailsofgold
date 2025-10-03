import { injectable, inject } from "inversify";
import {container} from "@gl/di/container";
import { BaseGameBridge } from "@shared/extcom/BaseGameBridge";
import { VideoSlotGameState } from "./VideoSlotGameState";
import { CB_CALL } from "@shared/extcom/CallbackConst";
import Dispatcher, { ACTION_EVENTS, EVENTS } from "@gl/events/Dispatcher";

@injectable()
export abstract class VideoSlotGameBridge extends BaseGameBridge<VideoSlotGameState> {
  protected game: Phaser.Game;
  protected gameState: VideoSlotGameState;
  private dispatcher: Dispatcher;

  constructor(
    game: Phaser.Game,
    @inject("VideoSlotGameState") protected _gameState: VideoSlotGameState = container.get<VideoSlotGameState>("VideoSlotGameState"),
    @inject("DispatcherGame") public _dispatcher: Dispatcher = container.get<Dispatcher>("DispatcherGame"),
  ) {
    super(_gameState);
    this.game = game;
    this.gameState = _gameState;
    this.dispatcher = _dispatcher;
  }

  // Common external callbacks for all video slot games
  register(): void {
    // register base game callbacks/events
    super.register();

    // Trigger spin event in the game
    this.addCallback(CB_CALL.SPIN, () => {
      this.dispatcher.emit(ACTION_EVENTS.SPIN_START);
    });

    // Trigger autospin event in the game
    this.addCallback(CB_CALL.GAMBLE, () => {
      // TODO: implement external communication for gamble 
      console.log("GAMBLE action triggered. External communication not yet implemented.");
    });

    // Trigger collect event in the game
    this.addCallback(CB_CALL.COLLECT, () => {
      // TODO: implement external communication for collect
      console.log("COLLECT action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.STOP_AUTOPLAY, () => {
      // TODO: implement external communication for stopping autospin
      console.log("STOP_AUTOSPIN action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.START_AUTOPLAY, (val: number) => {
      // TODO: implement external communication for starting autospin
      console.log("START_AUTOSPIN action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.GET_BET, () => {
      // TODO: implement external communication for getting bet
      console.log("GET_BET action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.GET_AVAILABLE_COINS, () => {
      // TODO: implement external communication for getting available coins
      console.log("GET_AVAILABLE_COINS action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.SET_COINS, (val: number) => {
      // TODO: implement external communication for setting coins
      console.log("SET_COINS action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.DEC_COINS, () => {
      // TODO: implement external communication for decreasing coins
      console.log("DEC_COINS action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.INC_COINS, () => {
      // TODO: implement external communication for increasing coins
      console.log("INC_COINS action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.SET_COIN_VALUE, (val: number) => {
      // TODO: implement external communication for setting coin value
      console.log("SET_COIN_VALUE action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.DEC_COIN_VALUE, () => {
      // TODO: implement external communication for decreasing coin value
      console.log("DEC_COIN_VALUE action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.INC_COIN_VALUE, () => {
      // TODO: implement external communication for increasing coin value
      console.log("INC_COIN_VALUE action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.GET_AVAILABLE_LINES, () => {
      // TODO: implement external communication for getting available lines
      console.log("GET_AVAILABLE_LINES action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.SET_LINES, (val: number) => {
      // TODO: implement external communication for setting lines
      console.log("SET_LINES action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.DEC_LINES, () => {
      // TODO: implement external communication for decreasing lines
      console.log("DEC_LINES action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.INC_LINES, () => {
      // TODO: implement external communication for increasing lines
      console.log("INC_LINES action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.GET_FASTPLAY, () => {
      // TODO: implement external communication for getting fastplay
      console.log("GET_FASTPLAY action triggered. External communication not yet implemented.");
    });

    // Update the game state to reflect the fastplay setting
    this.addCallback(CB_CALL.SET_FASTPLAY, (val: number) => {
      this.gameState.isFastplayOn.set(val === 1);
    });

    this.addCallback(CB_CALL.GET_LEFTHAND_MODE, () => {
      // TODO: implement external communication for getting left-hand mode
      console.log("GET_LEFTHAND_MODE action triggered. External communication not yet implemented.");
    });

    // Update the game state to reflect the left-hand mode setting
    this.addCallback(CB_CALL.SET_LEFTHAND_MODE, (val: number) => {
      this.gameState.isLeftHand.set(val === 1);
    });

    this.addCallback(CB_CALL.TOGGLE_PAYTABLE, () => {
      // TODO: implement external communication for toggling paytable
      console.log("TOGGLE_PAYTABLE action triggered. External communication not yet implemented.");
    });

    // Trigger start game event in the game
    this.addCallback(CB_CALL.START_GAME, (val: number) => {
      // TODO: implement external communication for start game
      console.log("START_GAME action triggered with value:", val, ". External communication not yet implemented.");
    });
    
    // Trigger end game event in the game
    this.addCallback(CB_CALL.PAUSE, () => {
      this.game.loop.sleep();
    });

    // Trigger resume game event in the game
    this.addCallback("resumeGame", () => {
      this.game.loop.wake();
    });

    // Clean up and destroy the game instance
    this.addCallback(CB_CALL.DESTROY, () => {
      this.game.destroy(true);
      this.dispose();
    });

    // Let game-specific bridges extend this
    this.registerCustom();
  }

  // Each game will extend this for extra events/callbacks
  protected abstract registerCustom(): void;
}
