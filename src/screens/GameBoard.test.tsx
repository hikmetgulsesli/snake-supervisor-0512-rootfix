import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from './GameBoard';
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
  mode: 'playing',
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
  score: 2450,
  highScore: 14092,
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

function renderGameBoard(actions?: Record<string, () => void>) {
  return render(<GameBoard actions={actions as never} />);
}

describe('GameBoard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders score from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ score: 1234 }));
    renderGameBoard();
    expect(screen.getByText('01234')).toBeInTheDocument();
  });

  it('renders snake length from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameBoard();
    expect(screen.getByText('003')).toBeInTheDocument();
  });

  it('renders latency from state speed', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ speed: 120 }));
    renderGameBoard();
    expect(screen.getByText('120ms')).toBeInTheDocument();
  });

  it('shows pause overlay when paused', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ mode: 'paused' }));
    renderGameBoard();
    expect(screen.getByText('SYSTEM_PAUSED')).toBeInTheDocument();
    expect(screen.getByText('RESUME_EXECUTION')).toBeInTheDocument();
  });

  it('hides pause overlay when playing', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ mode: 'playing' }));
    renderGameBoard();
    const pausedText = screen.getByText('SYSTEM_PAUSED');
    expect(pausedText.parentElement).toHaveClass('hidden');
  });

  it('triggers pause action on pause button click', () => {
    const pauseMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameBoard({ 'pause-10': pauseMock });
    fireEvent.click(screen.getByRole('button', { name: /PAUSE/i }));
    expect(pauseMock).toHaveBeenCalledTimes(1);
  });

  it('triggers resume action on resume button click', () => {
    const resumeMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ mode: 'paused' }));
    renderGameBoard({ 'resume-execution-5': resumeMock });
    fireEvent.click(screen.getByText('RESUME_EXECUTION'));
    expect(resumeMock).toHaveBeenCalledTimes(1);
  });

  it('triggers menu action on reboot session', () => {
    const menuMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameBoard({ 'reboot-session-1': menuMock });
    fireEvent.click(screen.getByText('REBOOT SESSION'));
    expect(menuMock).toHaveBeenCalledTimes(1);
  });

  it('has aria-labels on icon-only buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameBoard();
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Controls help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Move up')).toBeInTheDocument();
    expect(screen.getByLabelText('Move left')).toBeInTheDocument();
    expect(screen.getByLabelText('Move down')).toBeInTheDocument();
    expect(screen.getByLabelText('Move right')).toBeInTheDocument();
  });
});
