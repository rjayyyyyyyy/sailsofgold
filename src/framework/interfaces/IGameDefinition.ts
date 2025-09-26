import BaseGame from '@games/BaseGame';
import Phaser from 'phaser';
import { ILauncherPayload } from './ILauncherPayload';
import { IGameConfig } from '@gl/GameConfig';

export interface IGameDefinition {
  gameClass: typeof BaseGame;
  id: string;
  gameSlug: string;
  name: string;
  apiUrl: string;
  configUrl: string;
  devices: {
    desktop?: {
      width: number;
      height: number;
    };
    mobile?: {
      width: number;
      height: number;
    };
  };

  config?: Record<string, any>;
  gameInitCb?(scene: Phaser.Scene, game: BaseGame, payload: {
    gameId: string;
    config: IGameConfig | null;
    launcher_payload: ILauncherPayload;
  }): void;
}