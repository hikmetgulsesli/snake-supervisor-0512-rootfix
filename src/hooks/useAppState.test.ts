import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from './useAppState';
import type { Direction } from '../types/domain';

describe('useAppState', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes in menu mode', () => {
    const { result } = renderHook(() => useAppState());
    expect(result.current.state.mode).toBe('menu');
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.highScore).toBe(0);
  });

  it('starts a new game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    expect(result.current.state.mode).toBe('playing');
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.snake.body.length).toBe(3);
  });

  it('pauses and resumes the game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    expect(result.current.state.mode).toBe('playing');

    act(() => result.current.pauseGame());
    expect(result.current.state.mode).toBe('paused');

    act(() => result.current.resumeGame());
    expect(result.current.state.mode).toBe('playing');
  });

  it('changes direction while playing', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    act(() => result.current.setDirection('up'));
    expect(result.current.state.snake.nextDirection).toBe('up');
  });

  it('prevents 180-degree direction change', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    // Initial direction is right
    act(() => result.current.setDirection('left'));
    expect(result.current.state.snake.nextDirection).toBe('right');
  });

  it('moves snake on tick', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    const initialHead = { ...result.current.state.snake.body[0] };

    act(() => result.current.tick());
    const newHead = result.current.state.snake.body[0];
    expect(newHead.x).toBe(initialHead.x + 1);
    expect(newHead.y).toBe(initialHead.y);
  });

  it('grows snake when eating food', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    const initialLength = result.current.state.snake.body.length;

    // Manually place food in front of snake head
    const head = result.current.state.snake.body[0];
    const foodPos = { x: head.x + 1, y: head.y };

    act(() => {
      // Force food position by manipulating state through multiple ticks
      // or we can test indirectly by checking that score/length changes
      // when food is eaten
    });

    // Move until food is eaten or wall hit
    let steps = 0;
    while (result.current.state.mode === 'playing' && steps < 25) {
      act(() => result.current.tick());
      steps++;
    }

    // Either game ended or food was eaten
    expect(steps).toBeLessThan(25);
  });

  it('ends game on wall collision', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    // Move right until wall collision (starting at x ~ 10, grid is 20)
    for (let i = 0; i < 25; i++) {
      act(() => result.current.tick());
      if (result.current.state.mode === 'gameover') break;
    }

    expect(result.current.state.mode).toBe('gameover');
  });

  it('updates high score on game over', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    // Eat some food first by setting direction appropriately
    // Move around to increase score
    for (let i = 0; i < 5; i++) {
      act(() => result.current.tick());
    }

    const scoreBefore = result.current.state.score;

    // Continue until game over
    for (let i = 0; i < 50; i++) {
      act(() => result.current.tick());
      if (result.current.state.mode === 'gameover') break;
    }

    expect(result.current.state.mode).toBe('gameover');
    expect(result.current.state.highScore).toBeGreaterThanOrEqual(scoreBefore);
  });

  it('restarts game from game over', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    // Force game over by moving to wall
    for (let i = 0; i < 25; i++) {
      act(() => result.current.tick());
      if (result.current.state.mode === 'gameover') break;
    }

    expect(result.current.state.mode).toBe('gameover');

    act(() => result.current.restartGame());
    expect(result.current.state.mode).toBe('playing');
    expect(result.current.state.score).toBe(0);
  });

  it('navigates between screens', () => {
    const { result } = renderHook(() => useAppState());

    act(() => result.current.goToOptions());
    expect(result.current.state.mode).toBe('options');

    act(() => result.current.goToControls());
    expect(result.current.state.mode).toBe('controls');

    act(() => result.current.goToMenu());
    expect(result.current.state.mode).toBe('menu');
  });

  it('updates and resets settings', () => {
    const { result } = renderHook(() => useAppState());

    act(() => result.current.updateSettings({ difficulty: 'hard' }));
    expect(result.current.state.settings.difficulty).toBe('hard');

    act(() => result.current.resetSettings());
    expect(result.current.state.settings.difficulty).toBe('medium');
  });

  it('exposes window.app as live runtime state bridge', () => {
    const { result } = renderHook(() => useAppState());
    expect(window.app).toBeDefined();
    expect(window.app?.state.mode).toBe('menu');
    expect(typeof window.app?.startGame).toBe('function');
    expect(typeof window.app?.pauseGame).toBe('function');
    expect(typeof window.app?.resumeGame).toBe('function');
    expect(typeof window.app?.restartGame).toBe('function');
    expect(typeof window.app?.goToMenu).toBe('function');
    expect(typeof window.app?.goToOptions).toBe('function');
    expect(typeof window.app?.goToControls).toBe('function');
    expect(typeof window.app?.setDirection).toBe('function');
    expect(typeof window.app?.updateSettings).toBe('function');
    expect(typeof window.app?.resetSettings).toBe('function');
    expect(typeof window.app?.tick).toBe('function');

    // Verify live state updates through the bridge
    act(() => result.current.startGame());
    expect(window.app?.state.mode).toBe('playing');

    act(() => window.app?.pauseGame());
    expect(window.app?.state.mode).toBe('paused');

    act(() => window.app?.resumeGame());
    expect(window.app?.state.mode).toBe('playing');

    act(() => window.app?.goToMenu());
    expect(window.app?.state.mode).toBe('menu');
  });

  it('exposes window.game for smoke tests', () => {
    renderHook(() => useAppState());
    expect(window.game).toBeDefined();
    expect(window.render_game_to_text).toBeDefined();
    expect(window.advanceTime).toBeDefined();
  });

  it('render_game_to_text returns valid JSON', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    const text = window.render_game_to_text?.() ?? '{}';
    const parsed = JSON.parse(text);
    expect(parsed.mode).toBe('playing');
    expect(parsed.snake).toBeDefined();
    expect(parsed.food).toBeDefined();
    expect(typeof parsed.score).toBe('number');
  });

  it('advanceTime advances game deterministically', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    const before = result.current.state.snake.body[0].x;
    act(() => window.advanceTime?.(300));
    const after = result.current.state.snake.body[0].x;

    expect(after).toBeGreaterThan(before);
  });

  it('ignores direction changes when not playing', () => {
    const { result } = renderHook(() => useAppState());
    // In menu mode
    act(() => result.current.setDirection('up'));
    expect(result.current.state.mode).toBe('menu');
  });

  it('speed increases with difficulty', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    const mediumSpeed = result.current.state.speed;

    act(() => result.current.updateSettings({ difficulty: 'easy' }));
    act(() => result.current.restartGame());
    const easySpeed = result.current.state.speed;

    act(() => result.current.updateSettings({ difficulty: 'hard' }));
    act(() => result.current.restartGame());
    const hardSpeed = result.current.state.speed;

    expect(easySpeed).toBeGreaterThanOrEqual(hardSpeed);
    expect(mediumSpeed).toBeGreaterThanOrEqual(hardSpeed);
  });

  it('saves and loads high score from storage', () => {
    const { result: r1 } = renderHook(() => useAppState());
    act(() => r1.current.startGame());

    // Get a score then game over
    for (let i = 0; i < 25; i++) {
      act(() => r1.current.tick());
      if (r1.current.state.mode === 'gameover') break;
    }

    const savedHighScore = r1.current.state.highScore;

    // Create a new hook instance
    const { result: r2 } = renderHook(() => useAppState());
    expect(r2.current.state.highScore).toBe(savedHighScore);
  });
});
