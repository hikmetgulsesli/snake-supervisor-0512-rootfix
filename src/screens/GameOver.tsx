// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, HelpCircle, Play, Settings, TriangleAlert } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";


export type GameOverActionId = "button-1-1" | "button-2-2" | "reboot-session-3" | "reboot-sequence-play-again-4" | "disconnect-main-menu-5";

export interface GameOverProps {
  actions?: Partial<Record<GameOverActionId, () => void>>;
}

export function GameOver({ actions }: GameOverProps) {
  const { state, goToMenu } = useAppContext();
  const scoreDisplay = state.score.toLocaleString();
  const lengthDisplay = `${state.snake.body.length} UNITS`;
  const highScoreDisplay = state.highScore.toLocaleString();
  const isNewRecord = state.score >= state.highScore;
  const deltaDisplay = isNewRecord ? "NEW RECORD" : `${(state.score - state.highScore).toLocaleString()} DELTA`;

  return (
    <>
      {/* TopAppBar */}
      <header className="bg-background dark:bg-background flex justify-between items-center w-full px-margin-desktop h-target-min border-b border-outline-variant flat no shadows docked full-width top-0 z-50">
      <div className="font-headline-md text-headline-md font-bold tracking-tighter text-primary dark:text-primary">ROOT_FIX // SNAKE</div>
      <div className="flex gap-4">
      <button className="h-target-min w-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors duration-200" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]} aria-label="Controls help">
      <HelpCircle aria-hidden={true} focusable="false" />
      </button>
      <button className="h-target-min w-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors duration-200" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]} aria-label="Settings">
      <Settings aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      <div className="flex flex-1 relative overflow-hidden">
      {/* SideNavBar (Desktop only, for context, visually inactive/dimmed) */}
      <nav className="hidden md:flex flex-col bg-surface-container-low dark:bg-surface-container-low border-r border-outline-variant docked h-full left-0 w-64 rounded-none pt-16 z-40 opacity-50">
      <button className="px-6 mb-8 text-left w-full" type="button" onClick={goToMenu}>
      <span className="font-headline-md text-headline-md font-black text-primary block">SUPERVISOR</span>
      <span className="font-status-label text-status-label text-on-surface-variant mt-2 block">OS_V1.0.4_STABLE</span>
      </button>
      <ul className="flex flex-col flex-1">
      <li className="flex items-center gap-4 text-on-surface-variant px-4 py-3">
      <Circle aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">TERMINAL</span>
      </li>
      <li className="flex items-center gap-4 text-on-surface-variant px-4 py-3">
      <Circle aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">RECORDS</span>
      </li>
      <li className="flex items-center gap-4 text-on-surface-variant px-4 py-3">
      <Circle aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">SYSTEM</span>
      </li>
      </ul>
      <div className="p-4 mt-auto border-t border-outline-variant">
      <button className="w-full border border-outline-variant bg-surface text-on-surface h-target-min font-status-label text-status-label flex items-center justify-center gap-2" type="button" data-action-id="reboot-session-3" onClick={actions?.["reboot-session-3"]}>
      <Circle aria-hidden={true} focusable="false" />
                           REBOOT SESSION
                       </button>
      </div>
      </nav>
      {/* Main Content Area with Grid and Blur Overlay */}
      <main className="flex-1 relative flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface-lowest">
      {/* Simulated background game state */}
      <div className="absolute inset-0 grid-overlay opacity-30"></div>
      {/* Game Over Modal overlay */}
      <div className="absolute inset-0 backdrop-blur-[12px] bg-background/80 flex items-center justify-center z-10 p-4">
      {/* Terminal-style Results Panel */}
      <div className="w-full max-w-lg bg-surface border border-outline-variant p-8 md:p-12 relative flex flex-col gap-8 shadow-2xl">
      {/* Decorative Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>
      {/* Header */}
      <div className="text-center border-b border-outline-variant pb-6">
      <h1 className="font-headline-lg text-headline-lg text-error uppercase tracking-widest flex items-center justify-center gap-3">
      <TriangleAlert  style={{fontVariationSettings: "'FILL' 1"}} className="text-4xl" aria-hidden={true} focusable="false" />
                                  SYSTEM FAILURE
                              </h1>
      <p className="font-status-label text-status-label text-on-surface-variant mt-2">FATAL COLLISION DETECTED</p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
      {/* Score Chip */}
      <div className="bg-surface-container-high border-t-2 border-primary p-4 flex flex-col gap-1">
      <span className="font-status-label text-status-label text-on-surface-variant">FINAL SCORE</span>
      <span className="font-stat-value text-stat-value text-primary">{scoreDisplay}</span>
      </div>
      {/* Length Chip */}
      <div className="bg-surface-container-high border-t-2 border-tertiary p-4 flex flex-col gap-1">
      <span className="font-status-label text-status-label text-on-surface-variant">LENGTH</span>
      <span className="font-stat-value text-stat-value text-tertiary">{lengthDisplay}</span>
      </div>
      {/* High Score Indicator (Full Width) */}
      <div className="col-span-2 bg-surface-container-low border border-outline-variant p-4 flex justify-between items-center">
      <div className="flex flex-col">
      <span className="font-status-label text-status-label text-on-surface-variant">PERSONAL BEST</span>
      <span className="font-stat-value text-stat-value text-on-surface">{highScoreDisplay}</span>
      </div>
      <div className="text-right">
      <span className={`font-status-label text-status-label ${isNewRecord ? "text-primary" : "text-error"}`}>{deltaDisplay}</span>
      </div>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-4">
      <button className="h-target-min w-full bg-primary text-on-primary font-status-label text-status-label flex items-center justify-center gap-2 border border-primary hover:bg-surface-tint transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="reboot-sequence-play-again-4" onClick={actions?.["reboot-sequence-play-again-4"]}>
      <Play  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
                                  REBOOT SEQUENCE (PLAY AGAIN)
                              </button>
      <button className="h-target-min w-full bg-transparent text-on-surface font-status-label text-status-label flex items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="disconnect-main-menu-5" onClick={actions?.["disconnect-main-menu-5"]}>
      <Circle aria-hidden={true} focusable="false" />
                                  DISCONNECT (MAIN MENU)
                              </button>
      </div>
      </div>
      </div>
      </main>
      </div>
    </>
  );
}
