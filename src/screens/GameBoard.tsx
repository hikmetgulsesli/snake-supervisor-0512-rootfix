// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Circle, HelpCircle, Menu, Pause, Settings } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { GRID_SIZE } from "../types/domain";

export type GameBoardActionId = "reboot-session-1" | "button-2-2" | "button-3-3" | "button-4-4" | "resume-execution-5" | "button-6-6" | "button-7-7" | "button-8-8" | "button-9-9" | "pause-10";

export interface GameBoardProps {
  actions?: Partial<Record<GameBoardActionId, () => void>>;
}

export function GameBoard({ actions }: GameBoardProps) {
  const { state } = useAppContext();
  const isPaused = state.mode === "paused";

  const scoreDisplay = state.score.toString().padStart(5, "0");
  const lengthDisplay = state.snake.body.length.toString().padStart(3, "0");
  const latencyDisplay = `${state.speed}ms`;

  return (
    <>
      {/* SideNavBar (WEB) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full flex-col pt-16 bg-surface-container-low border-r border-outline-variant w-64 rounded-none z-50">
        <div className="px-margin-desktop mb-8">
          <h1 className="font-headline-md text-headline-md font-black text-primary">SUPERVISOR</h1>
          <p className="font-status-label text-status-label text-on-surface-variant mt-2">OS_V1.0.4_STABLE</p>
        </div>
        <div className="flex-1 flex flex-col mt-4">
          {/* Active Tab: TERMINAL (Assuming Game Board is part of terminal operations) */}
          <a
            className="flex items-center gap-4 bg-primary text-on-primary font-status-label text-status-label font-bold px-4 py-3 rounded-none border-l-4 border-primary"
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
            tabIndex={-1}
          >
            <Circle className="fill-current" aria-hidden={true} focusable="false" />
            TERMINAL
          </a>
          <a
            className="flex items-center gap-4 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors font-status-label text-status-label px-4 py-3"
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
            tabIndex={-1}
          >
            <Circle aria-hidden={true} focusable="false" />
            RECORDS
          </a>
          <a
            className="flex items-center gap-4 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors font-status-label text-status-label px-4 py-3"
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
            tabIndex={-1}
          >
            <Circle aria-hidden={true} focusable="false" />
            SYSTEM
          </a>
        </div>
        <div className="p-4 mt-auto">
          <button
            className="w-full h-target-min border border-outline hover:border-primary text-on-surface hover:text-primary transition-colors font-status-label text-status-label flex items-center justify-center gap-2"
            type="button"
            data-action-id="reboot-session-1"
            onClick={actions?.["reboot-session-1"]}
          >
            <Circle aria-hidden={true} focusable="false" />
            REBOOT SESSION
          </button>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-64 relative h-full w-full">
        {/* TopAppBar (MOBILE & WEB) */}
        <header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-target-min bg-background border-b border-outline-variant z-40 shrink-0 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Icon */}
            <button
              className="md:hidden text-on-surface-variant p-2 -ml-2"
              type="button"
              data-action-id="button-2-2"
              onClick={actions?.["button-2-2"]}
              aria-label="Open menu"
            >
              <Menu aria-hidden={true} focusable="false" />
            </button>
            <span className="font-headline-md text-headline-md font-bold tracking-tighter text-primary">ROOT_FIX // SNAKE</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <button
              className="p-2 hover:bg-surface-container transition-colors duration-200 rounded-DEFAULT"
              type="button"
              data-action-id="button-3-3"
              onClick={actions?.["button-3-3"]}
              aria-label="Controls help"
            >
              <HelpCircle aria-hidden={true} focusable="false" />
            </button>
            <button
              className="p-2 hover:bg-surface-container transition-colors duration-200 rounded-DEFAULT"
              type="button"
              data-action-id="button-4-4"
              onClick={actions?.["button-4-4"]}
              aria-label="Settings"
            >
              <Settings aria-hidden={true} focusable="false" />
            </button>
          </div>
        </header>
        {/* Play Area Wrapper */}
        <div className="flex-1 flex flex-col lg:flex-row p-margin-mobile md:p-margin-desktop gap-gutter overflow-hidden bg-background">
          {/* Left Data Panel (HUD) */}
          <aside className="w-full lg:w-64 flex flex-row lg:flex-col gap-4 shrink-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {/* Status Chip: Score */}
            <div className="bg-surface border border-outline-variant p-4 flex-1 lg:flex-none min-w-[140px] border-t-2 border-t-primary">
              <p className="font-status-label text-status-label text-on-surface-variant mb-1">SCORE</p>
              <p className="font-stat-value text-stat-value text-primary">{scoreDisplay}</p>
            </div>
            {/* Status Chip: Length */}
            <div className="bg-surface border border-outline-variant p-4 flex-1 lg:flex-none min-w-[140px] border-t-2 border-t-secondary">
              <p className="font-status-label text-status-label text-on-surface-variant mb-1">LENGTH</p>
              <p className="font-stat-value text-stat-value text-secondary">{lengthDisplay}</p>
            </div>
            {/* Status Chip: Latency */}
            <div className="bg-surface border border-outline-variant p-4 flex-1 lg:flex-none min-w-[140px] border-t-2 border-t-error">
              <p className="font-status-label text-status-label text-on-surface-variant mb-1">LATENCY</p>
              <p className="font-stat-value text-stat-value text-error">{latencyDisplay}</p>
            </div>
            {/* Spacer */}
            <div className="hidden lg:block flex-1"></div>
            {/* Controls Info (Web) */}
            <div className="hidden lg:flex flex-col gap-2 mt-auto">
              <p className="font-status-label text-status-label text-on-surface-variant mb-2 border-b border-outline-variant pb-2">INPUT_MAPPING</p>
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-status-label text-status-label">MOVE</span>
                <div className="flex gap-1">
                  <kbd className="bg-surface-container border border-outline-variant px-2 py-1 text-xs font-stat-value text-stat-value">W</kbd>
                  <kbd className="bg-surface-container border border-outline-variant px-2 py-1 text-xs font-stat-value text-stat-value">A</kbd>
                  <kbd className="bg-surface-container border border-outline-variant px-2 py-1 text-xs font-stat-value text-stat-value">S</kbd>
                  <kbd className="bg-surface-container border border-outline-variant px-2 py-1 text-xs font-stat-value text-stat-value">D</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between text-on-surface mt-2">
                <span className="font-status-label text-status-label">PAUSE</span>
                <kbd className="bg-surface-container border border-outline-variant px-3 py-1 text-xs font-stat-value text-stat-value">SPACE</kbd>
              </div>
            </div>
          </aside>
          {/* Game Board Area */}
          <section className="flex-1 flex flex-col relative min-h-[400px]">
            {/* The Grid (Game Board) */}
            <div className="flex-1 bg-surface border border-outline-variant relative overflow-hidden grid-overlay rounded-sm flex items-center justify-center">
              {/* Snake segments rendered from state */}
              {state.snake.body.map((seg, i) => (
                <div
                  key={`snake-${i}`}
                  className={`absolute rounded-sm ${
                    i === 0
                      ? "bg-primary shadow-[0_0_10px_rgba(75,226,119,0.5)]"
                      : "bg-primary-fixed-dim"
                  }`}
                  style={{
                    left: `${(seg.x * 100) / GRID_SIZE}%`,
                    top: `${(seg.y * 100) / GRID_SIZE}%`,
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                    opacity: i === 0 ? 1 : Math.max(0.35, 1 - i * 0.1),
                  }}
                />
              ))}
              {/* Food/Target rendered from state */}
              <div
                className="absolute bg-error rounded-sm shadow-[0_0_15px_rgba(255,180,171,0.8)] animate-pulse"
                style={{
                  left: `${(state.food.x * 100) / GRID_SIZE}%`,
                  top: `${(state.food.y * 100) / GRID_SIZE}%`,
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                }}
              />
              {/* Game Overlay (Paused/Status - Currently Hidden for active play, but available for structure) */}
              <div className={`${isPaused ? "flex" : "hidden"} absolute inset-0 bg-background/80 backdrop-blur-md flex-col items-center justify-center z-10`}>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-widest mb-4">SYSTEM_PAUSED</h2>
                <button
                  className="bg-primary text-on-primary border border-primary hover:bg-surface-tint font-status-label text-status-label px-8 h-target-min transition-colors shadow-[0_0_15px_rgba(75,226,119,0.3)]"
                  type="button"
                  data-action-id="resume-execution-5"
                  onClick={actions?.["resume-execution-5"]}
                >
                  RESUME_EXECUTION
                </button>
              </div>
            </div>
            {/* Mobile Controls (Hidden on Web) */}
            <div className="lg:hidden flex flex-col gap-4 mt-4 shrink-0">
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                <div className="col-start-2">
                  <button
                    className="w-full h-target-min bg-surface border border-outline-variant hover:border-primary active:bg-primary active:text-on-primary flex items-center justify-center transition-colors rounded-sm"
                    type="button"
                    data-action-id="button-6-6"
                    onClick={actions?.["button-6-6"]}
                    aria-label="Move up"
                  >
                    <ChevronUp aria-hidden={true} focusable="false" />
                  </button>
                </div>
                <div className="col-start-1 row-start-2">
                  <button
                    className="w-full h-target-min bg-surface border border-outline-variant hover:border-primary active:bg-primary active:text-on-primary flex items-center justify-center transition-colors rounded-sm"
                    type="button"
                    data-action-id="button-7-7"
                    onClick={actions?.["button-7-7"]}
                    aria-label="Move left"
                  >
                    <ChevronLeft aria-hidden={true} focusable="false" />
                  </button>
                </div>
                <div className="col-start-2 row-start-2">
                  <button
                    className="w-full h-target-min bg-surface border border-outline-variant hover:border-primary active:bg-primary active:text-on-primary flex items-center justify-center transition-colors rounded-sm"
                    type="button"
                    data-action-id="button-8-8"
                    onClick={actions?.["button-8-8"]}
                    aria-label="Move down"
                  >
                    <ChevronDown aria-hidden={true} focusable="false" />
                  </button>
                </div>
                <div className="col-start-3 row-start-2">
                  <button
                    className="w-full h-target-min bg-surface border border-outline-variant hover:border-primary active:bg-primary active:text-on-primary flex items-center justify-center transition-colors rounded-sm"
                    type="button"
                    data-action-id="button-9-9"
                    onClick={actions?.["button-9-9"]}
                    aria-label="Move right"
                  >
                    <ChevronRight aria-hidden={true} focusable="false" />
                  </button>
                </div>
              </div>
            </div>
            {/* Action Bar */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="font-status-label text-status-label text-on-surface-variant">LINK_ACTIVE</span>
              </div>
              <button
                className="h-target-min px-6 border border-outline-variant bg-surface hover:border-primary text-on-surface hover:text-primary transition-colors font-status-label text-status-label flex items-center gap-2 rounded-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent"
                type="button"
                data-action-id="pause-10"
                onClick={actions?.["pause-10"]}
              >
                <Pause className="text-sm" aria-hidden={true} focusable="false" />
                PAUSE
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
