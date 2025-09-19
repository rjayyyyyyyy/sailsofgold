import BaseGame from '@games/BaseGame';
import Phaser from 'phaser';

export interface IGameDefinition {
  gameClass: typeof BaseGame;
  id: string;
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
  gameInitCb?(scene: Phaser.Scene, game: BaseGame): void;
}