import { BaseGameState } from "@shared/BaseGameState";
import { GameBridge } from "./GameBridge";
import { CB_CALL } from "./CallbackConst";

export class BaseGameBridge<T extends BaseGameState> extends GameBridge {

  protected gameState: T;

  constructor(gameState: T) {
    super();
    this.gameState = gameState;
  }

  register(): void {
    // Trigger enable screen event in the game
    this.addCallback(CB_CALL.ENABLE_SCREEN, (val: number) => {
      // TODO: implement external communication for enabling the screen
      console.log("ENABLE_SCREEN action triggered with value:", val, ". External communication not yet implemented.");
    });

    // Trigger disable screen event in the game
    this.addCallback(CB_CALL.DISABLE_SCREEN, (val: number) => {
      // TODO: implement external communication for disabling the screen
      console.log("DISABLE_SCREEN action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.SIZE_UPDATED, () => {
      // TODO: implement external communication for size updated
      console.log("SIZE_UPDATED action triggered. External communication not yet implemented.");
    });

    // Update the game state to reflect the sound setting
    this.addCallback(CB_CALL.SET_SOUND, (val: number) => {
      this.gameState.isSoundingOn.set(val === 1);
    });

    this.addCallback(CB_CALL.VOLUME_CHANGED, (val: number) => {
      // TODO: implement external communication for volume change
      console.log("VOLUME_CHANGED action triggered with value:", val, ". External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.EXTERNAL_MESSAGE, (message: string) => {
      // TODO: implement external communication for displaying a message
      console.log("EXTERNAL_MESSAGE action triggered with message:", message, ". External communication not yet implemented.");
    });
    this.addCallback(CB_CALL.EXTERNAL_MESSAGE_CLOSE, () => {
      // TODO: implement external communication for closing a message
      console.log("EXTERNAL_MESSAGE_CLOSE action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog exit action
    this.addCallback(CB_CALL.EX_MESSAGE_EXIT, () => {
      // TODO: implement external communication for exiting a message
      console.log("EX_MESSAGE_EXIT action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog action button
    this.addCallback(CB_CALL.EX_MESSAGE_ACTION, () => {
      // TODO: implement external communication for action button
      console.log("EX_MESSAGE_ACTION action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog ok button
    this.addCallback(CB_CALL.EX_MESSAGE_OK, () => {
      // TODO: implement external communication for OK button
      console.log("EX_MESSAGE_OK action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog ok actions
    this.addCallback(CB_CALL.MODAL_OK, () => {
      // TODO: implement external communication for modal OK action
      console.log("MODAL_OK action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog cancel actions
    this.addCallback(CB_CALL.MODAL_CANCEL, () => {
      // TODO: implement external communication for modal cancel action
      console.log("MODAL_CANCEL action triggered. External communication not yet implemented.");
    });

    // Handle modal dialog exit action
    this.addCallback(CB_CALL.MODAL_EXIT, () => {
      // TODO: implement external communication for modal exit action
      console.log("MODAL_EXIT action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.OPEN_GAMEHELP, () => {
      // TODO: implement external communication for opening game help
      console.log("OPEN_GAMEHELP action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.OPEN_SETTINGS, () => {
      // TODO: implement external communication for opening settings
      console.log("OPEN_SETTINGS action triggered. External communication not yet implemented.");
    });

    this.addCallback(CB_CALL.LOGOUT, () => {
      // TODO: implement external communication for logout action
      console.log("LOGOUT action triggered. External communication not yet implemented.");
    });
  }

  dispose(): void {
    // Override if needed
  }
}
