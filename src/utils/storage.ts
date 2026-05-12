import type { GameSettings } from '../types/domain';
import { DEFAULT_SETTINGS } from '../types/domain';

const HIGH_SCORE_KEY = 'snake-supervisor-high-score';
const SETTINGS_KEY = 'snake-supervisor-settings';

export function loadHighScore(): number {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (raw === null) return 0;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'number' && Number.isFinite(parsed) && parsed >= 0) {
      return Math.floor(parsed);
    }
  } catch {
    // ignore parse errors
  }
  return 0;
}

export function saveHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(Math.max(0, Math.floor(score))));
  } catch {
    // ignore storage errors
  }
}

export function loadSettings(): GameSettings {
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
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}
