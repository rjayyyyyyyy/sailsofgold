import { GameBootstrapper } from "@gl/GameBootstraper";
import BookOfDeadGameDefinition from "./GameDefinition";


export const start = (config: any) => {
    new GameBootstrapper(BookOfDeadGameDefinition).launch(config);
}