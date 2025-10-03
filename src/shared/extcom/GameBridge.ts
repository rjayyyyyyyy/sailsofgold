import { ExternalComms } from "@gl/ExternalComms";
import { IGameBridge } from "./IGameBridge";

type CallbackFn = (...args: any[]) => void;

export abstract class GameBridge implements IGameBridge {
  abstract register(): void;

  dispose(): void {
    // Override if needed
  }

  // Helper methods to interact with ExternalComms
  protected addCallback(name: string, fn: CallbackFn) {
    ExternalComms.getInstance().addCallback(name, fn);
  }

  // Helper method to dispatch events to the launcher
  protected dispatchEvent(event: string, ...args: any[]) {
    ExternalComms.getInstance().dispatchEvent(event, ...args);
  }
}
