import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders main menu on startup', () => {
    render(<App />);
    expect(screen.getByText(/ROOT_FIX \/\/ SNAKE/i)).toBeInTheDocument();
    expect(screen.getByText(/INITIALIZE_SEQUENCE/i)).toBeInTheDocument();
  });

  it('starts game when initialize sequence is clicked', () => {
    render(<App />);
    const startBtn = screen.getByText(/INITIALIZE_SEQUENCE/i);
    fireEvent.click(startBtn);
    // GameBoard should render
    expect(screen.getByText(/SUPERVISOR/i)).toBeInTheDocument();
  });

  it('navigates to options screen', () => {
    render(<App />);
    const optionsBtn = screen.getByText(/CONFIGURE_PARAMETERS/i);
    fireEvent.click(optionsBtn);
    expect(screen.getByText(/SYSTEM CONFIGURATION/i)).toBeInTheDocument();
  });

  it('navigates to controls screen', () => {
    render(<App />);
    const controlsBtn = screen.getByText(/ACCESS_DOCUMENTATION/i);
    fireEvent.click(controlsBtn);
    expect(screen.getByText(/System Directives/i)).toBeInTheDocument();
  });

  it('can start game and pause with keyboard', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/INITIALIZE_SEQUENCE/i));

    // Should be in playing mode - GameBoard renders
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
    expect(window.app?.state.mode).toBe('menu');

    act(() => window.app?.startGame());
    expect(window.app?.state.mode).toBe('playing');
  });
});
