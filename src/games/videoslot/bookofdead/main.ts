import { GameBootstrapper } from "@gl/GameBootstraper";
import BookOfDeadGameDefinition from "./GameDefinition";
import { ILauncherPayload } from "@gl/interfaces/ILauncherPayload";


export const start = (element: string, config: ILauncherPayload) => {
    new GameBootstrapper(BookOfDeadGameDefinition).launch(element, config);
}