import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PauseOverlay } from './PauseOverlay';
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
  mode: 'paused',
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
  score: 420,
  highScore: 1500,
  speed: 120,
  settings: {
    difficulty: 'medium',
    hapticFeedback: true,
    audioTelemetry: true,
    crtScanlines: false,
  },
  pausedBy: 'user',
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

function renderPauseOverlay(actions?: Record<string, () => void>) {
  return render(<PauseOverlay actions={actions as never} />);
}

describe('PauseOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders score from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ score: 1234 }));
    renderPauseOverlay();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('renders latency from state speed', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ speed: 140 }));
    renderPauseOverlay();
    expect(screen.getByText('140ms')).toBeInTheDocument();
  });

  it('triggers resume action on resume button click', () => {
    const resumeMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay({ 'resume-execution-4': resumeMock });
    fireEvent.click(screen.getByText('RESUME EXECUTION'));
    expect(resumeMock).toHaveBeenCalledTimes(1);
  });

  it('triggers restart action on restart button click', () => {
    const restartMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay({ 'restart-sequence-5': restartMock });
    fireEvent.click(screen.getByText('RESTART SEQUENCE'));
    expect(restartMock).toHaveBeenCalledTimes(1);
  });

  it('triggers terminate action on terminate button click', () => {
    const terminateMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay({ 'terminate-session-6': terminateMock });
    fireEvent.click(screen.getByText('TERMINATE SESSION'));
    expect(terminateMock).toHaveBeenCalledTimes(1);
  });

  it('triggers menu action on reboot session', () => {
    const menuMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay({ 'reboot-session-3': menuMock });
    fireEvent.click(screen.getByText('REBOOT SESSION'));
    expect(menuMock).toHaveBeenCalledTimes(1);
  });

  it('has aria-labels on icon-only buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay();
    expect(screen.getByLabelText('Controls help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('marks terminal nav as current page', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay();
    expect(screen.getByText('TERMINAL').closest('a')).toHaveAttribute('aria-current', 'page');
  });

  it('disables records and system nav items', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderPauseOverlay();
    const records = screen.getByText('RECORDS').closest('a');
    const system = screen.getByText('SYSTEM').closest('a');
    expect(records).toHaveAttribute('aria-disabled', 'true');
    expect(records).toHaveAttribute('tabIndex', '-1');
    expect(system).toHaveAttribute('aria-disabled', 'true');
    expect(system).toHaveAttribute('tabIndex', '-1');
  });
});
