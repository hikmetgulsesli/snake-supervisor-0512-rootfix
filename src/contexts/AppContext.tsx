import React, { createContext, useContext } from 'react';
import type { Direction, GameSettings, GameState } from '../types/domain';
import { useAppState } from '../hooks/useAppState';

export interface AppContextValue {
  state: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  goToMenu: () => void;
  goToOptions: () => void;
  goToControls: () => void;
  setDirection: (direction: Direction) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetSettings: () => void;
  tick: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const appState = useAppState();
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
