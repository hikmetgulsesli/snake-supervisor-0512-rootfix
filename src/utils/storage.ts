import type { GameSettings } from '../types/domain';
import { DEFAULT_SETTINGS } from '../types/domain';

const HIGH_SCORE_KEY = 'snake-supervisor-high-score';
const SETTINGS_KEY = 'snake-supervisor-settings';

export function loadHighScore(onError?: (msg: string) => void): number {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (raw === null) return 0;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'number' && Number.isFinite(parsed) && parsed >= 0) {
      return Math.floor(parsed);
    }
    onError?.('Invalid high score format in storage');
  } catch (e) {
    onError?.(e instanceof Error ? e.message : 'High score storage read error');
  }
  return 0;
}

export function saveHighScore(score: number, onError?: (msg: string) => void): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(Math.max(0, Math.floor(score))));
  } catch (e) {
    onError?.(e instanceof Error ? e.message : 'High score storage write error');
  }
}

export function loadSettings(onError?: (msg: string) => void): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw === null) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<GameSettings>;
    return {
      difficulty: ['easy', 'medium', 'hard'].includes(parsed.difficulty as string)
        ? (parsed.difficulty as GameSettings['difficulty'])
        : DEFAULT_SETTINGS.difficulty,
      hapticFeedback: typeof parsed.hapticFeedback === 'boolean' ? parsed.hapticFeedback : DEFAULT_SETTINGS.hapticFeedback,
      audioTelemetry: typeof parsed.audioTelemetry === 'boolean' ? parsed.audioTelemetry : DEFAULT_SETTINGS.audioTelemetry,
      crtScanlines: typeof parsed.crtScanlines === 'boolean' ? parsed.crtScanlines : DEFAULT_SETTINGS.crtScanlines,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : 'Settings storage read error');
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings, onError?: (msg: string) => void): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    onError?.(e instanceof Error ? e.message : 'Settings storage write error');
  }
}
