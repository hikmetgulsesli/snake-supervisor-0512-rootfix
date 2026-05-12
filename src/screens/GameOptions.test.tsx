import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameOptions } from './GameOptions';
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
  mode: 'options',
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

function renderGameOptions(actions?: Record<string, () => void>) {
  return render(<GameOptions actions={actions as never} />);
}

describe('GameOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders system configuration header', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    expect(screen.getByText('SYSTEM CONFIGURATION')).toBeInTheDocument();
    expect(screen.getByText('ADJUST ENVIRONMENT PARAMETERS')).toBeInTheDocument();
  });

  it('renders difficulty options', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    expect(screen.getByText('PROTOCOL: BASIC')).toBeInTheDocument();
    expect(screen.getByText('PROTOCOL: STANDARD')).toBeInTheDocument();
    expect(screen.getByText('PROTOCOL: BRUTAL')).toBeInTheDocument();
  });

  it('checks medium difficulty by default', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it('updates difficulty when radio is clicked', () => {
    const mockUpdate = vi.fn();
    vi.mocked(useAppContext).mockReturnValue({
      ...createMockContext(),
      updateSettings: mockUpdate,
    });
    renderGameOptions();
    const easyRadio = screen.getAllByRole('radio')[0];
    fireEvent.click(easyRadio);
    expect(mockUpdate).toHaveBeenCalledWith({ difficulty: 'easy' });
  });

  it('updates difficulty to hard when hard radio is clicked', () => {
    const mockUpdate = vi.fn();
    vi.mocked(useAppContext).mockReturnValue({
      ...createMockContext(),
      updateSettings: mockUpdate,
    });
    renderGameOptions();
    const hardRadio = screen.getAllByRole('radio')[2];
    fireEvent.click(hardRadio);
    expect(mockUpdate).toHaveBeenCalledWith({ difficulty: 'hard' });
  });

  it('reflects custom settings from context', () => {
    vi.mocked(useAppContext).mockReturnValue(
      createMockContext({
        settings: {
          difficulty: 'hard',
          hapticFeedback: false,
          audioTelemetry: false,
          crtScanlines: true,
        },
      })
    );
    renderGameOptions();
    const radios = screen.getAllByRole('radio');
    expect(radios[2]).toBeChecked();
  });

  it('renders toggle switches', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    expect(screen.getByText('HAPTIC FEEDBACK')).toBeInTheDocument();
    expect(screen.getByText('AUDIO TELEMETRY')).toBeInTheDocument();
    expect(screen.getByText('CRT SCANLINES')).toBeInTheDocument();
  });

  it('toggles haptic feedback when clicked', () => {
    const mockUpdate = vi.fn();
    vi.mocked(useAppContext).mockReturnValue({
      ...createMockContext(),
      updateSettings: mockUpdate,
    });
    renderGameOptions();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(mockUpdate).toHaveBeenCalledWith({ hapticFeedback: false });
  });

  it('toggles audio telemetry when clicked', () => {
    const mockUpdate = vi.fn();
    vi.mocked(useAppContext).mockReturnValue({
      ...createMockContext(),
      updateSettings: mockUpdate,
    });
    renderGameOptions();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(mockUpdate).toHaveBeenCalledWith({ audioTelemetry: false });
  });

  it('toggles crt scanlines when clicked', () => {
    const mockUpdate = vi.fn();
    vi.mocked(useAppContext).mockReturnValue({
      ...createMockContext(),
      updateSettings: mockUpdate,
    });
    renderGameOptions();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[2]);
    expect(mockUpdate).toHaveBeenCalledWith({ crtScanlines: true });
  });

  it('triggers reset defaults action', () => {
    const resetMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions({ 'reset-defaults-4': resetMock });
    fireEvent.click(screen.getByText('RESET DEFAULTS'));
    expect(resetMock).toHaveBeenCalledTimes(1);
  });

  it('triggers apply configuration action', () => {
    const applyMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions({ 'apply-configuration-5': applyMock });
    fireEvent.click(screen.getByText('APPLY CONFIGURATION'));
    expect(applyMock).toHaveBeenCalledTimes(1);
  });

  it('triggers reboot session action', () => {
    const rebootMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions({ 'reboot-session-1': rebootMock });
    fireEvent.click(screen.getByText('REBOOT SESSION'));
    expect(rebootMock).toHaveBeenCalledTimes(1);
  });

  it('has aria-labels on icon-only buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    expect(screen.getByLabelText('Controls help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Reboot session')).toBeInTheDocument();
  });

  it('marks SYSTEM nav as current page', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    const systemNav = screen.getByText('SYSTEM').closest('a');
    expect(systemNav).toHaveAttribute('aria-current', 'page');
  });

  it('disables TERMINAL and RECORDS nav links', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions();
    const terminalNav = screen.getByText('TERMINAL').closest('a');
    const recordsNav = screen.getByText('RECORDS').closest('a');
    expect(terminalNav).toHaveAttribute('aria-disabled', 'true');
    expect(recordsNav).toHaveAttribute('aria-disabled', 'true');
    expect(terminalNav).toHaveAttribute('tabIndex', '-1');
    expect(recordsNav).toHaveAttribute('tabIndex', '-1');
  });

  it('triggers controls help action on mobile header button', () => {
    const controlsMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderGameOptions({ 'button-2-2': controlsMock });
    fireEvent.click(screen.getByLabelText('Controls help'));
    expect(controlsMock).toHaveBeenCalledTimes(1);
  });
});
