import { describe, it, expect, beforeEach } from 'vitest';
import { loadHighScore, saveHighScore, loadSettings, saveSettings } from './storage';
import { DEFAULT_SETTINGS } from '../types/domain';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns 0 for missing high score', () => {
    expect(loadHighScore()).toBe(0);
  });

  it('saves and loads high score', () => {
    saveHighScore(12345);
    expect(loadHighScore()).toBe(12345);
  });

  it('clamps negative high score to 0', () => {
    saveHighScore(-10);
    expect(loadHighScore()).toBe(0);
  });

  it('returns default settings when none saved', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('saves and loads settings', () => {
    const custom = { ...DEFAULT_SETTINGS, difficulty: 'hard' as const, crtScanlines: true };
    saveSettings(custom);
    expect(loadSettings()).toEqual(custom);
  });

  it('ignores invalid difficulty and falls back to default', () => {
    localStorage.setItem('snake-supervisor-settings', JSON.stringify({ difficulty: 'impossible' }));
    const loaded = loadSettings();
    expect(loaded.difficulty).toBe(DEFAULT_SETTINGS.difficulty);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('snake-supervisor-high-score', 'not-a-number');
    expect(loadHighScore()).toBe(0);

    localStorage.setItem('snake-supervisor-settings', '{invalid json');
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });
});
