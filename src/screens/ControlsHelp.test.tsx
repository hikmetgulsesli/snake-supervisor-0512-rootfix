import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlsHelp } from './ControlsHelp';
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
  mode: 'controls',
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

function renderControlsHelp(actions?: Record<string, () => void>) {
  return render(<ControlsHelp actions={actions as never} />);
}

describe('ControlsHelp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders system directives header', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('System Directives')).toBeInTheDocument();
    expect(screen.getByText('Operator input parameters and operational rules.')).toBeInTheDocument();
  });

  it('renders input mechanisms section', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('INPUT MECHANISMS [WEB]')).toBeInTheDocument();
    expect(screen.getByText('DIRECTIONAL CONTROL')).toBeInTheDocument();
    expect(screen.getByText('ALTERNATE CONTROL')).toBeInTheDocument();
  });

  it('renders mobile input section', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('INPUT MECHANISMS [MOBILE]')).toBeInTheDocument();
    expect(screen.getByText('GESTURE OVERRIDE')).toBeInTheDocument();
  });

  it('renders operational parameters', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('OPERATIONAL PARAMETERS')).toBeInTheDocument();
    expect(screen.getByText('COLLECT PACKETS')).toBeInTheDocument();
    expect(screen.getByText('AVOID COLLISION')).toBeInTheDocument();
    expect(screen.getByText('SPEED ESCALATION')).toBeInTheDocument();
  });

  it('renders pro-tip', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('PRO-TIP')).toBeInTheDocument();
  });

  it('triggers acknowledge action', () => {
    const acknowledgeMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp({ 'acknowledge-4': acknowledgeMock });
    fireEvent.click(screen.getByText('ACKNOWLEDGE'));
    expect(acknowledgeMock).toHaveBeenCalledTimes(1);
  });

  it('triggers reboot session action', () => {
    const rebootMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp({ 'reboot-session-1': rebootMock });
    fireEvent.click(screen.getByText('REBOOT SESSION'));
    expect(rebootMock).toHaveBeenCalledTimes(1);
  });

  it('has aria-labels on icon-only buttons', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByLabelText('Controls help')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Reboot session')).toBeInTheDocument();
  });

  it('marks SYSTEM nav as current page', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    const systemNav = screen.getByText('SYSTEM').closest('a');
    expect(systemNav).toHaveAttribute('aria-current', 'page');
  });

  it('disables TERMINAL and RECORDS nav links', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    const terminalNav = screen.getByText('TERMINAL').closest('a');
    const recordsNav = screen.getByText('RECORDS').closest('a');
    expect(terminalNav).toHaveAttribute('aria-disabled', 'true');
    expect(recordsNav).toHaveAttribute('aria-disabled', 'true');
    expect(terminalNav).toHaveAttribute('tabIndex', '-1');
    expect(recordsNav).toHaveAttribute('tabIndex', '-1');
  });

  it('triggers settings action on mobile header button', () => {
    const settingsMock = vi.fn();
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp({ 'button-3-3': settingsMock });
    fireEvent.click(screen.getByLabelText('Settings'));
    expect(settingsMock).toHaveBeenCalledTimes(1);
  });

  it('renders WASD key grid', () => {
    vi.mocked(useAppContext).mockReturnValue(createMockContext());
    renderControlsHelp();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });
});
