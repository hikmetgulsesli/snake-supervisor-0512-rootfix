import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameOver } from './GameOver';
import { useAppContext } from '../contexts/AppContext';
import type { AppContextValue } from '../contexts/AppContext';
import type { GameState } from '../types/domain';

vi.mock('../contexts/AppContext', async () => {
  const actual = await vi.importActual<typeof import('../contexts/AppContext')>('../contexts/AppContext');
  return {
    ...actual,
    useAppContext: vi.fn(),
  };
});

const baseState: GameState = {
  mode: 'gameover',
  snake: {
    body: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ],
    direction: 'right',
    nextDirection: 'right',
  },
  food: { x: 5, y: 5 },
  score: 14250,
  highScore: 15000,
  speed: 140,
  settings: {
    difficulty: 'medium',
    hapticFeedback: true,
    audioTelemetry: true,
    crtScanlines: false,
  },
  pausedBy: null,
  storageStatus: 'ok',
  lastError: null,
};

function createMockContext(overrides: Partial<GameState> = {}): AppContextValue {
  const state = { ...baseState, ...overrides };
  return {
    state,
    startGame: vi.fn(),
    pauseGame: vi.fn(),
    resumeGame: vi.fn(),
    restartGame: vi.fn(),
    goToMenu: vi.fn(),
    goToOptions: vi.fn(),
    goToControls: vi.fn(),
    setDirection: vi.fn(),
    updateSettings: vi.fn(),
    resetSettings: vi.fn(),
    tick: vi.fn(),
  };
}

function renderGameOver(actions?: Record<string, () => void>) {
  return render(<GameOver actions={actions as never} />);
}

describe('GameOver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders final score from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ score: 9999 }));
    renderGameOver();
    expect(screen.getByText('9,999')).toBeInTheDocument();
  });

  it('renders snake length from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOver();
    expect(screen.getByText('3 UNITS')).toBeInTheDocument();
  });

  it('renders high score from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ highScore: 25000 }));
    renderGameOver();
    expect(screen.getByText('25,000')).toBeInTheDocument();
  });

  it('shows negative delta when score is below high score', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ score: 12000, highScore: 15000 }));
    renderGameOver();
    expect(screen.getByText('-3,000 DELTA')).toBeInTheDocument();
  });

  it('shows new record when score equals or exceeds high score', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ score: 16000, highScore: 16000 }));
    renderGameOver();
    expect(screen.getByText('NEW RECORD')).toBeInTheDocument();
  });

  it('triggers play again action on reboot sequence button click', () => {
    const restartMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOver({ 'reboot-sequence-play-again-4': restartMock });
    fireEvent.click(screen.getByText('REBOOT SEQUENCE (PLAY AGAIN)'));
    expect(restartMock).toHaveBeenCalledTimes(1);
  });

  it('triggers menu action on disconnect button click', () => {
    const menuMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOver({ 'disconnect-main-menu-5': menuMock });
    fireEvent.click(screen.getByText('DISCONNECT (MAIN MENU)'));
    expect(menuMock).toHaveBeenCalledTimes(1);
  });

  it('triggers menu action on reboot session', () => {
    const menuMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOver({ 'reboot-session-3': menuMock });
    fireEvent.click(screen.getByText('REBOOT SESSION'));
    expect(menuMock).toHaveBeenCalledTimes(1);
  });

  it('has aria-labels on icon-only buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOver();
    expect(screen.getByLabelText('Controls help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });
});
