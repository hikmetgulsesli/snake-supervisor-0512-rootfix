// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play, RefreshCw, Settings } from "lucide-react";


export type PauseOverlayActionId = "button-1-1" | "button-2-2" | "reboot-session-3" | "resume-execution-4" | "restart-sequence-5" | "terminate-session-6";

export interface PauseOverlayProps {
  actions?: Partial<Record<PauseOverlayActionId, () => void>>;
}

export function PauseOverlay({ actions }: PauseOverlayProps) {
  return (
    <>
      {/* Top Navigation AppBar (Shared Component, Hidden on Mobile context if SideNav present, but present here for full layout context) */}
      <header className="bg-background dark:bg-background border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop h-target-min fixed top-0 z-10 w-full hidden md:flex">
      <div className="flex items-center gap-4">
      <span className="font-headline-md text-headline-md font-bold tracking-tighter text-primary dark:text-primary">ROOT_FIX // SNAKE</span>
      </div>
      <div className="flex items-center gap-4 hidden"> {/* search_bar hidden */}
      </div>
      <div className="flex items-center gap-2">
      <button className="w-target-min h-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-surface-container transition-colors duration-200 rounded" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <Circle  data-icon="help" aria-hidden={true} focusable="false" />
      </button>
      <button className="w-target-min h-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-surface-container transition-colors duration-200 rounded" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Settings  data-icon="settings" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      <div className="flex flex-1 pt-0 md:pt-target-min">
      {/* Side Navigation (Shared Component) */}
      <nav className="bg-surface-container-low dark:bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full flex flex-col pt-16 w-64 rounded-none hidden md:flex z-0">
      <div className="p-4 border-b border-outline-variant mb-4">
      <div className="font-headline-md text-headline-md font-black text-primary mb-1">SUPERVISOR</div>
      <div className="font-status-label text-status-label text-on-surface-variant">OS_V1.0.4_STABLE</div>
      </div>
      <div className="flex-1 flex flex-col gap-1">
      <a className="flex items-center gap-4 bg-primary text-on-primary font-bold px-4 py-3 rounded-none border-l-4 border-primary" href="#">
      <Circle  data-icon="terminal" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">TERMINAL</span>
      </a>
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle  data-icon="emoji_events" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">RECORDS</span>
      </a>
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle  data-icon="memory" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">SYSTEM</span>
      </a>
      </div>
      <div className="p-4 mt-auto border-t border-outline-variant">
      <button className="w-full h-target-min bg-surface border border-outline-variant text-on-surface hover:bg-primary hover:text-on-primary font-status-label text-status-label transition-colors" type="button" data-action-id="reboot-session-3" onClick={actions?.["reboot-session-3"]}>
                          REBOOT SESSION
                      </button>
      </div>
      </nav>
      {/* Main Content Area - Simulating the Game Board underneath the modal */}
      <main className="flex-1 ml-0 md:ml-64 relative min-h-screen bg-background overflow-hidden">
      {/* Simulated Game Board Grid (Underneath Modal) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0"></div>
      {/* Simulated Game Elements (Snake & Food) */}
      <div className="absolute top-[40%] left-[30%] w-10 h-10 bg-primary z-0"></div>
      <div className="absolute top-[40%] left-[calc(30%-40px)] w-10 h-10 bg-primary z-0"></div>
      <div className="absolute top-[40%] left-[calc(30%-80px)] w-10 h-10 bg-primary z-0"></div>
      <div className="absolute top-[60%] left-[60%] w-10 h-10 bg-error z-0 rounded-none border-2 border-background"></div>
      {/* Pause Overlay Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile md:p-margin-desktop backdrop-blur-md bg-background/80 md:ml-64 mt-0 md:mt-target-min">
      <div className="w-full max-w-md bg-surface border border-outline-variant p-8 flex flex-col gap-8 shadow-2xl">
      {/* Modal Header */}
      <div className="text-center">
      <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-widest uppercase mb-2">System Paused</h2>
      <p className="font-status-label text-status-label text-on-surface-variant uppercase">Execution halted by supervisor</p>
      </div>
      {/* Current Status Chips */}
      <div className="flex justify-center gap-4 mb-4">
      <div className="bg-surface-container px-4 py-2 border-t-2 border-primary border-x border-b border-x-outline-variant border-b-outline-variant">
      <span className="font-status-label text-status-label text-on-surface-variant block mb-1">SCORE</span>
      <span className="font-stat-value text-stat-value text-on-surface">0420</span>
      </div>
      <div className="bg-surface-container px-4 py-2 border-t-2 border-tertiary border-x border-b border-x-outline-variant border-b-outline-variant">
      <span className="font-status-label text-status-label text-on-surface-variant block mb-1">LATENCY</span>
      <span className="font-stat-value text-stat-value text-tertiary">24ms</span>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
      <button className="w-full h-target-min bg-primary text-on-primary font-status-label text-status-label border border-primary hover:bg-primary-container hover:border-primary-container transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="resume-execution-4" onClick={actions?.["resume-execution-4"]}>
      <Play  data-icon="play_arrow" aria-hidden={true} focusable="false" />
                                  RESUME EXECUTION
                              </button>
      <button className="w-full h-target-min bg-surface text-on-surface font-status-label text-status-label border border-outline-variant hover:bg-surface-container transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="restart-sequence-5" onClick={actions?.["restart-sequence-5"]}>
      <RefreshCw  data-icon="refresh" aria-hidden={true} focusable="false" />
                                  RESTART SEQUENCE
                              </button>
      <button className="w-full h-target-min bg-surface text-error font-status-label text-status-label border border-error/50 hover:bg-error/10 hover:border-error transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-background mt-4" type="button" data-action-id="terminate-session-6" onClick={actions?.["terminate-session-6"]}>
      <Circle  data-icon="logout" aria-hidden={true} focusable="false" />
                                  TERMINATE SESSION
                              </button>
      </div>
      </div>
      </div>
      </main>
      </div>
    </>
  );
}
