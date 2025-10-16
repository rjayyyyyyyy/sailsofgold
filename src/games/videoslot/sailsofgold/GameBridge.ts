import "@gl/ExternalCommsProxy";
import { VideoSlotGameBridge } from "@games/videoslot/VideoSlotGameBridge";

export class GameBridge extends VideoSlotGameBridge {
  protected registerCustom(): void {
    // Example: Custom event only for GameA
    this.game.events.on("BONUS_TRIGGERED", () => {
      this.dispatchEvent("BONUS_TRIGGERED");
    });

    // Example: Custom callback only for GameA
    this.addCallback("enableTurboMode", () => {
      console.log("Turbo mode enabled for GameA");
    });
  }
}
