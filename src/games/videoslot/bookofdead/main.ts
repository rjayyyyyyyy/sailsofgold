import { GameBootstrapper } from "@gl/GameBootstraper";
import BookOfDeadGameDefinition from "./GameDefinition";
import { ILauncherConfig } from "@gl/interfaces/ILauncherConfig";


export const start = (element: string, config: ILauncherConfig) => {
    new GameBootstrapper(BookOfDeadGameDefinition).launch(element, config);
}