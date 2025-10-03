export interface IGameBridge {
  register(): void;   // Register callbacks & event emitters
  dispose(): void;    // Cleanup when game is destroyed
}
