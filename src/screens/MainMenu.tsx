// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play, Settings } from "lucide-react";


export type MainMenuActionId = "initialize-sequence-1" | "resume-previous-state-2" | "configure-parameters-3" | "access-documentation-4";

export interface MainMenuProps {
  actions?: Partial<Record<MainMenuActionId, () => void>>;
}

export function MainMenu({ actions }: MainMenuProps) {
  return (
    <>
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none"></div>
      {/* Main Content Canvas */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-margin-mobile">
      {/* Header / Logo Area */}
      <header className="mb-12 text-center flex flex-col items-center">
      <Circle  data-icon="terminal" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} className="text-[64px] text-primary mb-4" aria-hidden={true} focusable="false" />
      <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase">ROOT_FIX // SNAKE</h1>
      <p className="font-status-label text-status-label text-on-surface-variant mt-2 border border-outline-variant px-3 py-1 bg-surface-container-low">SYSTEM_READY // AWAITING_INPUT</p>
      </header>
      {/* High Score Panel */}
      <div className="w-full bg-surface-container border border-outline-variant p-6 mb-8 flex flex-col items-center justify-center">
      <h2 className="font-status-label text-status-label text-on-surface-variant mb-2">TOP_PERFORMANCE_METRIC</h2>
      <div className="flex items-center gap-4">
      <Circle  data-icon="emoji_events" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} className="text-tertiary text-3xl" aria-hidden={true} focusable="false" />
      <span className="font-stat-value text-[48px] leading-[48px] text-on-surface font-bold">14,092</span>
      </div>
      </div>
      {/* Navigation / Action Menu */}
      <nav className="w-full flex flex-col gap-4">
      {/* Start New Game (Primary Action) */}
      <button className="w-full h-target-min flex items-center justify-center gap-3 bg-primary text-on-primary border border-primary hover:bg-primary-container transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="initialize-sequence-1" onClick={actions?.["initialize-sequence-1"]}>
      <Play  data-icon="play_arrow" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label uppercase font-bold">INITIALIZE_SEQUENCE</span>
      </button>
      {/* Resume (Secondary Action) */}
      <button className="w-full h-target-min flex items-center justify-center gap-3 bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="resume-previous-state-2" onClick={actions?.["resume-previous-state-2"]}>
      <Circle  data-icon="restore" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label uppercase">RESUME_PREVIOUS_STATE</span>
      </button>
      {/* Options */}
      <button className="w-full h-target-min flex items-center justify-center gap-3 bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="configure-parameters-3" onClick={actions?.["configure-parameters-3"]}>
      <Settings  data-icon="settings" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label uppercase">CONFIGURE_PARAMETERS</span>
      </button>
      {/* Help */}
      <button className="w-full h-target-min flex items-center justify-center gap-3 bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="access-documentation-4" onClick={actions?.["access-documentation-4"]}>
      <Circle  data-icon="help" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label uppercase">ACCESS_DOCUMENTATION</span>
      </button>
      </nav>
      {/* Footer Info */}
      <footer className="mt-12 text-center">
      <p className="font-status-label text-status-label text-on-surface-variant opacity-50">V_1.0.4_STABLE // BUILD_883</p>
      </footer>
      </main>
    </>
  );
}
