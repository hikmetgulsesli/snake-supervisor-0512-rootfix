import { useCallback, useEffect, useRef, useState } from 'react';
import type { Direction, GameEngine, GameMode, GameSettings, GameState, Position, TestGameState } from '../types/domain';
import { DEFAULT_SETTINGS, DIFFICULTY_CONFIG, GRID_SIZE } from '../types/domain';
import { loadHighScore, loadSettings, saveHighScore, saveSettings } from '../utils/storage';

function createInitialSnake(): Position[] {
  const cx = Math.floor(GRID_SIZE / 2);
  const cy = Math.floor(GRID_SIZE / 2);
  return [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
}

function getEmptyCells(snake: Position[]): Position[] {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  const empty: Position[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!occupied.has(`${x},${y}`)) {
        empty.push({ x, y });
      }
    }
  }
  return empty;
}

function spawnFood(snake: Position[], score: number): Position {
  const empty = getEmptyCells(snake);
  if (empty.length === 0) return { x: 0, y: 0 };
  const index = (score * 7 + snake.length * 13) % empty.length;
  return empty[index];
}

function getInitialSpeed(settings: GameSettings): number {
  return DIFFICULTY_CONFIG[settings.difficulty].baseSpeed;
}

function calculateSpeed(settings: GameSettings, foodEaten: number): number {
  const config = DIFFICULTY_CONFIG[settings.difficulty];
  return Math.max(config.minSpeed, config.baseSpeed - foodEaten * config.speedDecrement);
}

function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'up' && b === 'down') ||
    (a === 'down' && b === 'up') ||
    (a === 'left' && b === 'right') ||
    (a === 'right' && b === 'left')
  );
}

function createInitialState(): GameState {
  let lastError: string | null = null;
  const onError = (msg: string) => {
    lastError = msg;
  };

  const settings = loadSettings(onError);
  const highScore = loadHighScore(onError);
  const snake = createInitialSnake();

  return {
    mode: 'playing',
    snake: { body: snake, direction: 'right', nextDirection: 'right' },
    food: spawnFood(snake, 0),
    score: 0,
    highScore,
    speed: getInitialSpeed(settings),
    settings,
    pausedBy: null,
    storageStatus: lastError ? 'corrupted' : 'ok',
    lastError,
  };
}

function moveSnake(state: GameState): GameState {
  const { snake, food, score, speed, settings } = state;
  const direction = snake.nextDirection;
  const head = snake.body[0];
  const newHead: Position = { ...head };

  switch (direction) {
    case 'up':
      newHead.y -= 1;
      break;
    case 'down':
      newHead.y += 1;
      break;
    case 'left':
      newHead.x -= 1;
      break;
    case 'right':
      newHead.x += 1;
      break;
  }

  // Wall collision
  if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
    const newHighScore = Math.max(state.highScore, score);
    return { ...state, mode: 'gameover', highScore: newHighScore };
  }

  // Self collision
  const selfCollision = snake.body.some((segment, i) => i > 0 && segment.x === newHead.x && segment.y === newHead.y);
  if (selfCollision) {
    const newHighScore = Math.max(state.highScore, score);
    return { ...state, mode: 'gameover', highScore: newHighScore };
  }

  const newBody = [newHead, ...snake.body];
  let newScore = score;
  let newFood = food;
  let newSpeed = speed;

  if (newHead.x === food.x && newHead.y === food.y) {
    newScore += 10;
    const foodEaten = newBody.length - 3;
    newSpeed = calculateSpeed(settings, foodEaten);
    newFood = spawnFood(newBody, newScore);
  } else {
    newBody.pop();
  }

  return {
    ...state,
    snake: { body: newBody, direction, nextDirection: direction },
    food: newFood,
    score: newScore,
    speed: newSpeed,
  };
}

declare global {
  interface Window {
    app?: GameEngine;
    game?: Record<string, unknown>;
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
  }
}

export function useAppState() {
  const [state, setState] = useState<GameState>(createInitialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const rafRef = useRef<number>(0);

  const startGame = useCallback(() => {
    const settings = stateRef.current.settings;
    const snake = createInitialSnake();
    setState({
      ...stateRef.current,
      mode: 'playing',
      snake: { body: snake, direction: 'right', nextDirection: 'right' },
      food: spawnFood(snake, 0),
      score: 0,
      speed: getInitialSpeed(settings),
      pausedBy: null,
    });
  }, []);

  const pauseGame = useCallback(() => {
    setState((prev) => (prev.mode === 'playing' ? { ...prev, mode: 'paused', pausedBy: 'user' } : prev));
  }, []);

  const resumeGame = useCallback(() => {
    setState((prev) => (prev.mode === 'paused' ? { ...prev, mode: 'playing', pausedBy: null } : prev));
  }, []);

  const restartGame = useCallback(() => {
    const settings = stateRef.current.settings;
    const snake = createInitialSnake();
    setState({
      ...stateRef.current,
      mode: 'playing',
      snake: { body: snake, direction: 'right', nextDirection: 'right' },
      food: spawnFood(snake, 0),
      score: 0,
      speed: getInitialSpeed(settings),
      pausedBy: null,
    });
  }, []);

  const goToMenu = useCallback(() => {
    setState((prev) => ({ ...prev, mode: 'menu', pausedBy: null }));
  }, []);

  const goToOptions = useCallback(() => {
    setState((prev) => ({ ...prev, mode: 'options', pausedBy: null }));
  }, []);

  const goToControls = useCallback(() => {
    setState((prev) => ({ ...prev, mode: 'controls', pausedBy: null }));
  }, []);

  const setDirection = useCallback((direction: Direction) => {
    setState((prev) => {
      if (prev.mode !== 'playing') return prev;
      if (isOpposite(prev.snake.direction, direction)) return prev;
      return {
        ...prev,
        snake: { ...prev.snake, nextDirection: direction },
      };
    });
  }, []);

  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    setState((prev) => {
      const newSettings = { ...prev.settings, ...partial };
      return { ...prev, settings: newSettings };
    });
  }, []);

  const resetSettings = useCallback(() => {
    setState((prev) => ({ ...prev, settings: DEFAULT_SETTINGS }));
  }, []);

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.mode !== 'playing') return prev;
      return moveSnake(prev);
    });
  }, []);

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        setDirection('up');
      } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        setDirection('down');
      } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        setDirection('left');
      } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        setDirection('right');
      } else if (key === ' ' || key === 'escape') {
        e.preventDefault();
        const currentMode = stateRef.current.mode;
        if (currentMode === 'playing') {
          pauseGame();
        } else if (currentMode === 'paused') {
          resumeGame();
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [setDirection, pauseGame, resumeGame]);

  // Persist high score when it changes
  useEffect(() => {
    saveHighScore(state.highScore, (msg) => {
      setState((prev) => ({ ...prev, lastError: msg, storageStatus: 'unavailable' }));
    });
  }, [state.highScore]);

  // Persist settings when they change
  useEffect(() => {
    saveSettings(state.settings, (msg) => {
      setState((prev) => ({ ...prev, lastError: msg, storageStatus: 'unavailable' }));
    });
  }, [state.settings]);

  // Game loop
  useEffect(() => {
    if (state.mode !== 'playing') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = performance.now();
    let accumulator = 0;

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      accumulator += dt * 1000;

      const currentSpeed = stateRef.current.speed;
      while (accumulator >= currentSpeed) {
        accumulator -= currentSpeed;
        setState((prev) => {
          if (prev.mode !== 'playing') return prev;
          return moveSnake(prev);
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.mode, state.speed]);

  // Test bridge — stable references only; state is read through stateRef
  useEffect(() => {
    window.app = {
      get state() {
        return stateRef.current;
      },
      startGame,
      pauseGame,
      resumeGame,
      restartGame,
      goToMenu,
      goToOptions,
      goToControls,
      setDirection,
      updateSettings,
      resetSettings,
      tick,
    };

    window.game = {
      get mode() { return stateRef.current.mode; },
      get player() { return stateRef.current.snake.body[0]; },
      get snakeLength() { return stateRef.current.snake.body.length; },
      get direction() { return stateRef.current.snake.direction; },
      get food() { return stateRef.current.food; },
      get score() { return stateRef.current.score; },
      get highScore() { return stateRef.current.highScore; },
      get speed() { return stateRef.current.speed; },
      get settings() { return stateRef.current.settings; },
      get storageStatus() { return stateRef.current.storageStatus; },
      get lastError() { return stateRef.current.lastError; },
    };

    window.render_game_to_text = (): string => {
      const s = stateRef.current;
      const testState: TestGameState = {
        mode: s.mode,
        snake: {
          head: s.snake.body[0] ?? { x: 0, y: 0 },
          body: s.snake.body,
          length: s.snake.body.length,
          direction: s.snake.direction,
        },
        food: s.food,
        score: s.score,
        highScore: s.highScore,
        speed: s.speed,
      };
      return JSON.stringify(testState);
    };

    window.advanceTime = (ms: number): void => {
      const steps = Math.max(1, Math.round(ms / stateRef.current.speed));
      setState((prev) => {
        let next = prev;
        for (let i = 0; i < steps; i++) {
          if (next.mode !== 'playing') break;
          next = moveSnake(next);
        }
        return next;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    goToMenu,
    goToOptions,
    goToControls,
    setDirection,
    updateSettings,
    resetSettings,
    tick,
  };
}
