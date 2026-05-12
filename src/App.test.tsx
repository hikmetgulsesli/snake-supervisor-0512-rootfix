import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders game board on startup', () => {
    const { container } = render(<App />);
    const html = container.innerHTML;
    expect(html).toContain('PAUSE');
    expect(html).toContain('SCORE');
    expect(html).toContain('LINK_ACTIVE');
  });

  it('game is already playing on startup', () => {
    render(<App />);
    // GameBoard should render immediately without clicking start
    expect(screen.getByText(/SUPERVISOR/i)).toBeInTheDocument();
    expect(window.app?.state.mode).toBe('playing');
  });

  it('navigates to options screen', () => {
    render(<App />);
    // Go to menu first, then options
    act(() => window.app?.goToMenu());
    const optionsBtn = screen.getByText(/CONFIGURE_PARAMETERS/i);
    fireEvent.click(optionsBtn);
    expect(screen.getByText(/SYSTEM CONFIGURATION/i)).toBeInTheDocument();
  });

  it('navigates to controls screen', () => {
    render(<App />);
    // Go to menu first, then controls
    act(() => window.app?.goToMenu());
    const controlsBtn = screen.getByText(/ACCESS_DOCUMENTATION/i);
    fireEvent.click(controlsBtn);
    expect(screen.getByText(/System Directives/i)).toBeInTheDocument();
  });

  it('can pause with keyboard', () => {
    render(<App />);

    // Should already be in playing mode - GameBoard renders
    expect(screen.getAllByText(/PAUSE/i).length).toBeGreaterThan(0);

    // Press space to pause
    fireEvent.keyDown(window, { key: ' ' });
    // PauseOverlay should render
    expect(screen.getByText(/System Paused/i)).toBeInTheDocument();
  });

  it('exposes test bridge globals', () => {
    render(<App />);
    expect(window.game).toBeDefined();
    expect(typeof window.render_game_to_text).toBe('function');
    expect(typeof window.advanceTime).toBe('function');
  });

  it('exposes window.app live runtime state bridge', () => {
    render(<App />);
    expect(window.app).toBeDefined();
    expect(window.app?.state).toBeDefined();
    expect(typeof window.app?.startGame).toBe('function');
    expect(window.app?.state.mode).toBe('playing');

    act(() => window.app?.goToMenu());
    expect(window.app?.state.mode).toBe('menu');

    act(() => window.app?.startGame());
    expect(window.app?.state.mode).toBe('playing');
  });
});
