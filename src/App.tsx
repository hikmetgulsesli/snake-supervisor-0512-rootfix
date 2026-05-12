import { useEffect, useRef } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import type { GameState } from './types/domain';
import { GRID_SIZE } from './types/domain';
import { MainMenu } from './screens/MainMenu';
import { GameBoard } from './screens/GameBoard';
import { PauseOverlay } from './screens/PauseOverlay';
import { GameOver } from './screens/GameOver';
import { GameOptions } from './screens/GameOptions';
import { ControlsHelp } from './screens/ControlsHelp';
import './App.css';

function SnakeCanvas({ state }: { state: GameState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const grid = document.querySelector('.grid-overlay');
    if (!grid) return;

    const updateSize = () => {
      const rect = grid.getBoundingClientRect();
      canvas.style.position = 'fixed';
      canvas.style.left = `${rect.left}px`;
      canvas.style.top = `${rect.top}px`;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let raf = 0;
    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const s = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cellW = w / GRID_SIZE;
      const cellH = h / GRID_SIZE;

      // Background - surface color from design tokens
      ctx.fillStyle = '#101415';
      ctx.fillRect(0, 0, w, h);

      // Grid lines - outline-variant color
      ctx.strokeStyle = '#3d4a3d';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellW, 0);
        ctx.lineTo(i * cellW, h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellH);
        ctx.lineTo(w, i * cellH);
        ctx.stroke();
      }

      // Snake body
      s.snake.body.forEach((seg, i) => {
        const alpha = i === 0 ? 1 : Math.max(0.35, 1 - i * 0.06);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = i === 0 ? '#4be277' : '#4ae176';
        const pad = 1;
        ctx.fillRect(seg.x * cellW + pad, seg.y * cellH + pad, cellW - pad * 2, cellH - pad * 2);
      });
      ctx.globalAlpha = 1;

      // Food
      ctx.fillStyle = '#ffb4ab';
      const pulse = 0.7 + 0.3 * Math.sin(Date.now() / 200);
      ctx.globalAlpha = pulse;
      ctx.beginPath();
      ctx.arc(
        (s.food.x + 0.5) * cellW,
        (s.food.y + 0.5) * cellH,
        Math.min(cellW, cellH) * 0.35,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="snake-game-canvas" aria-label="Snake game board" />;
}

function AppContent() {
  const {
    state,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    goToMenu,
    goToOptions,
    goToControls,
    setDirection,
    resetSettings,
    updateSettings,
  } = useAppContext();

  const mainMenuActions = {
    'initialize-sequence-1': startGame,
    'resume-previous-state-2': startGame,
    'configure-parameters-3': goToOptions,
    'access-documentation-4': goToControls,
  };

  const gameBoardActions = {
    'reboot-session-1': goToMenu,
    'button-2-2': goToMenu,
    'button-3-3': goToControls,
    'button-4-4': goToOptions,
    'resume-execution-5': resumeGame,
    'button-6-6': () => setDirection('up'),
    'button-7-7': () => setDirection('left'),
    'button-8-8': () => setDirection('down'),
    'button-9-9': () => setDirection('right'),
    'pause-10': pauseGame,
  };

  const pauseOverlayActions = {
    'button-1-1': goToControls,
    'button-2-2': goToOptions,
    'reboot-session-3': goToMenu,
    'resume-execution-4': resumeGame,
    'restart-sequence-5': restartGame,
    'terminate-session-6': goToMenu,
  };

  const gameOverActions = {
    'button-1-1': goToMenu,
    'button-2-2': goToOptions,
    'reboot-session-3': goToMenu,
    'reboot-sequence-play-again-4': restartGame,
    'disconnect-main-menu-5': goToMenu,
  };

  const gameOptionsActions = {
    'reboot-session-1': goToMenu,
    'button-2-2': goToControls,
    'button-3-3': () => {},
    'reset-defaults-4': resetSettings,
    'apply-configuration-5': goToMenu,
  };

  const controlsHelpActions = {
    'reboot-session-1': goToMenu,
    'button-2-2': () => {},
    'button-3-3': goToOptions,
    'acknowledge-4': goToMenu,
  };

  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden">
      {state.mode === 'menu' && <MainMenu actions={mainMenuActions} />}

      {(state.mode === 'playing' || state.mode === 'paused') && (
        <>
          <GameBoard actions={gameBoardActions} />
          <SnakeCanvas state={state} />
        </>
      )}

      {state.mode === 'paused' && <PauseOverlay actions={pauseOverlayActions} />}

      {state.mode === 'gameover' && <GameOver actions={gameOverActions} />}

      {state.mode === 'options' && (
        <GameOptions
          actions={gameOptionsActions}
        />
      )}

      {state.mode === 'controls' && <ControlsHelp actions={controlsHelpActions} />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
