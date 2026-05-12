import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainMenu } from './MainMenu';
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
  mode: 'menu',
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
  score: 0,
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

function renderMainMenu(actions?: Record<string, () => void>) {
  return render(<MainMenu actions={actions as never} />);
}

describe('MainMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders high score from state', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ highScore: 25000 }));
    renderMainMenu();
    expect(screen.getByText('25,000')).toBeInTheDocument();
  });

  it('renders zero high score correctly', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext({ highScore: 0 }));
    renderMainMenu();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('triggers start game on initialize sequence', () => {
    const startMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu({ 'initialize-sequence-1': startMock });
    fireEvent.click(screen.getByText('INITIALIZE_SEQUENCE'));
    expect(startMock).toHaveBeenCalledTimes(1);
  });

  it('triggers resume on resume previous state', () => {
    const resumeMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu({ 'resume-previous-state-2': resumeMock });
    fireEvent.click(screen.getByText('RESUME_PREVIOUS_STATE'));
    expect(resumeMock).toHaveBeenCalledTimes(1);
  });

  it('triggers options on configure parameters', () => {
    const optionsMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu({ 'configure-parameters-3': optionsMock });
    fireEvent.click(screen.getByText('CONFIGURE_PARAMETERS'));
    expect(optionsMock).toHaveBeenCalledTimes(1);
  });

  it('triggers controls on access documentation', () => {
    const controlsMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu({ 'access-documentation-4': controlsMock });
    fireEvent.click(screen.getByText('ACCESS_DOCUMENTATION'));
    expect(controlsMock).toHaveBeenCalledTimes(1);
  });

  it('renders all menu buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu();
    expect(screen.getByText('INITIALIZE_SEQUENCE')).toBeInTheDocument();
    expect(screen.getByText('RESUME_PREVIOUS_STATE')).toBeInTheDocument();
    expect(screen.getByText('CONFIGURE_PARAMETERS')).toBeInTheDocument();
    expect(screen.getByText('ACCESS_DOCUMENTATION')).toBeInTheDocument();
  });

  it('renders title and system status', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderMainMenu();
    expect(screen.getByText('ROOT_FIX // SNAKE')).toBeInTheDocument();
    expect(screen.getByText('SYSTEM_READY // AWAITING_INPUT')).toBeInTheDocument();
  });
});
