import { GameBootstrapper } from "@gl/GameBootstraper";
import BookOfDeadGameDefinition from "./GameDefinition";
import { ILauncherConfig } from "@gl/interfaces/ILauncherConfig";
import { GameBridge } from "./GameBridge";

export const start = async (element: string, config: ILauncherConfig) => {
    var game = await new GameBootstrapper(BookOfDeadGameDefinition).launch(element, config);
    new GameBridge(game).register();
}