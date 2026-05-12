export type GameMode = 'menu' | 'playing' | 'paused' | 'gameover' | 'options' | 'controls';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Position {
  x: number;
  y: number;
}

export interface SnakeState {
  body: Position[];
  direction: Direction;
  nextDirection: Direction;
}

export interface GameSettings {
  difficulty: Difficulty;
  hapticFeedback: boolean;
  audioTelemetry: boolean;
  crtScanlines: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  difficulty: 'medium',
  hapticFeedback: true,
  audioTelemetry: true,
  crtScanlines: false,
};

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

export const DIFFICULTY_CONFIG = {
  easy: { baseSpeed: 180, speedDecrement: 2, minSpeed: 90 },
  medium: { baseSpeed: 140, speedDecrement: 3, minSpeed: 70 },
  hard: { baseSpeed: 100, speedDecrement: 5, minSpeed: 50 },
} as const;

export interface GameState {
  mode: GameMode;
  snake: SnakeState;
  food: Position;
  score: number;
  highScore: number;
  speed: number;
  settings: GameSettings;
  pausedBy: 'user' | 'system' | null;
}

export interface GameEngine {
  state: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  goToMenu: () => void;
  goToOptions: () => void;
  goToControls: () => void;
  setDirection: (direction: Direction) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetSettings: () => void;
  tick: () => void;
}

export interface TestGameState {
  mode: GameMode;
  snake: {
    head: Position;
    body: Position[];
    length: number;
    direction: Direction;
  };
  food: Position;
  score: number;
  highScore: number;
  speed: number;
}
