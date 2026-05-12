// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Circle, Settings } from "lucide-react";


export type ControlsHelpActionId = "reboot-session-1" | "button-2-2" | "button-3-3" | "acknowledge-4";

export interface ControlsHelpProps {
  actions?: Partial<Record<ControlsHelpActionId, () => void>>;
}

export function ControlsHelp({ actions }: ControlsHelpProps) {
  return (
    <>
      {/* Desktop Sidebar Navbar (Suppressed on Mobile, Active on Web for Settings/Help) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full flex-col pt-16 docked left-0 w-64 rounded-none border-r border-outline-variant bg-surface-container-low dark:bg-surface-container-low">
      <div className="px-4 mb-8">
      <h1 className="font-headline-md text-headline-md font-black text-primary">SUPERVISOR</h1>
      <p className="font-status-label text-status-label text-on-surface-variant mt-1">OS_V1.0.4_STABLE</p>
      </div>
      <div className="flex-1 flex flex-col gap-2 w-full">
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle  data-icon="terminal" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">TERMINAL</span>
      </a>
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle  data-icon="emoji_events" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">RECORDS</span>
      </a>
      <a className="flex items-center gap-4 bg-primary text-on-primary font-bold px-4 py-3 rounded-none" href="#">
      <Circle  data-icon="memory" aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">SYSTEM</span>
      </a>
      </div>
      <div className="p-4 border-t border-outline-variant w-full">
      <button className="w-full h-target-min border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors font-status-label text-status-label text-primary" type="button" data-action-id="reboot-session-1" onClick={actions?.["reboot-session-1"]}>
                      REBOOT SESSION
                  </button>
      </div>
      </nav>
      {/* Mobile Top App Bar (Visible on Mobile) */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile h-target-min border-b border-outline-variant bg-background dark:bg-background docked full-width top-0 z-50">
      <div className="font-headline-md text-headline-md font-bold tracking-tighter text-primary dark:text-primary">
                  ROOT_FIX // SNAKE
              </div>
      <div className="flex items-center gap-4">
      <button className="text-primary border-b-2 border-primary pb-1 h-target-min flex items-center hover:bg-surface-container transition-colors duration-200" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Circle  data-icon="help" aria-hidden={true} focusable="false" />
      </button>
      <button className="text-on-surface-variant h-target-min flex items-center hover:bg-surface-container transition-colors duration-200" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <Settings  data-icon="settings" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-1 w-full md:pl-64 flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNIDE5IDIwIEwgMjAgMjAgTCAyMCAwIEwgMTkgMCBaIE0gMCAxOSBMIDE5IDE5IEwgMTkgMjAgTCAwIDIwIFoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] min-h-[calc(100vh-44px)] md:min-h-screen">
      {/* Controls Help Modal/Panel */}
      <div className="w-full max-w-3xl bg-surface border border-outline-variant p-6 md:p-8 flex flex-col gap-8 shadow-2xl backdrop-blur-md bg-opacity-90 relative">
      {/* Header */}
      <div className="border-b border-outline-variant pb-4 flex items-center justify-between">
      <div>
      <h2 className="font-headline-lg text-headline-lg text-primary uppercase">System Directives</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Operator input parameters and operational rules.</p>
      </div>
      <Circle  data-icon="gamepad" className="text-primary text-4xl" aria-hidden={true} focusable="false" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Mechanisms */}
      <div className="flex flex-col gap-6">
      <div>
      <h3 className="font-status-label text-status-label text-primary border-b border-primary/30 pb-2 mb-4">INPUT MECHANISMS [WEB]</h3>
      <div className="flex flex-col gap-4">
      {/* WASD */}
      <div className="flex items-start gap-4">
      <div className="grid grid-cols-3 gap-1 shrink-0 bg-surface-container p-2 border border-outline-variant">
      <div className="col-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant font-stat-value text-stat-value text-on-surface">W</div>
      <div className="col-start-1 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant font-stat-value text-stat-value text-on-surface">A</div>
      <div className="col-start-2 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant font-stat-value text-stat-value text-on-surface">S</div>
      <div className="col-start-3 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant font-stat-value text-stat-value text-on-surface">D</div>
      </div>
      <div className="pt-1">
      <p className="font-status-label text-status-label text-on-surface">DIRECTIONAL CONTROL</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Standard WASD configuration for maneuvering the routine.</p>
      </div>
      </div>
      {/* Arrows */}
      <div className="flex items-start gap-4">
      <div className="grid grid-cols-3 gap-1 shrink-0 bg-surface-container p-2 border border-outline-variant">
      <div className="col-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant text-on-surface"><ArrowUp  data-icon="arrow_upward" aria-hidden={true} focusable="false" /></div>
      <div className="col-start-1 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant text-on-surface"><ArrowLeft  data-icon="arrow_back" aria-hidden={true} focusable="false" /></div>
      <div className="col-start-2 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant text-on-surface"><ArrowDown  data-icon="arrow_downward" aria-hidden={true} focusable="false" /></div>
      <div className="col-start-3 row-start-2 w-8 h-8 flex items-center justify-center bg-surface-container-high border border-outline-variant text-on-surface"><ArrowRight  data-icon="arrow_forward" aria-hidden={true} focusable="false" /></div>
      </div>
      <div className="pt-1">
      <p className="font-status-label text-status-label text-on-surface">ALTERNATE CONTROL</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Arrow keys accepted as secondary directional input.</p>
      </div>
      </div>
      </div>
      </div>
      <div>
      <h3 className="font-status-label text-status-label text-primary border-b border-primary/30 pb-2 mb-4">INPUT MECHANISMS [MOBILE]</h3>
      <div className="flex items-start gap-4 bg-surface-container p-4 border border-outline-variant">
      <Circle  data-icon="swipe" className="text-4xl text-on-surface-variant shrink-0" aria-hidden={true} focusable="false" />
      <div>
      <p className="font-status-label text-status-label text-on-surface">GESTURE OVERRIDE</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Swipe anywhere on the active grid area to redirect the routine vector.</p>
      </div>
      </div>
      </div>
      </div>
      {/* Operational Rules */}
      <div>
      <h3 className="font-status-label text-status-label text-primary border-b border-primary/30 pb-2 mb-4">OPERATIONAL PARAMETERS</h3>
      <ul className="flex flex-col gap-4">
      <li className="flex items-start gap-3">
      <div className="w-6 h-6 flex items-center justify-center bg-primary text-on-primary shrink-0 mt-1">
      <span className="font-status-label text-status-label">01</span>
      </div>
      <div>
      <p className="font-status-label text-status-label text-on-surface">COLLECT PACKETS</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Intercept highlighted data packets to increase operational length and score.</p>
      </div>
      </li>
      <li className="flex items-start gap-3">
      <div className="w-6 h-6 flex items-center justify-center bg-error text-on-error shrink-0 mt-1">
      <span className="font-status-label text-status-label">02</span>
      </div>
      <div>
      <p className="font-status-label text-status-label text-error">AVOID COLLISION</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Contact with grid boundaries or the routine's own structure results in immediate session termination.</p>
      </div>
      </li>
      <li className="flex items-start gap-3">
      <div className="w-6 h-6 flex items-center justify-center bg-tertiary text-on-tertiary shrink-0 mt-1">
      <span className="font-status-label text-status-label">03</span>
      </div>
      <div>
      <p className="font-status-label text-status-label text-tertiary">SPEED ESCALATION</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Routine execution speed increases marginally with each packet intercepted. Maintain focus.</p>
      </div>
      </li>
      </ul>
      <div className="mt-8 bg-surface-container-highest border-l-4 border-primary p-4">
      <p className="font-status-label text-status-label text-primary mb-1">PRO-TIP</p>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm">Utilize the screen edges effectively to maximize routing efficiency in constrained spaces.</p>
      </div>
      </div>
      </div>
      {/* Footer Action */}
      <div className="mt-4 pt-4 border-t border-outline-variant flex justify-end">
      <button className="h-target-min px-8 bg-primary text-on-primary font-status-label text-status-label border border-primary hover:bg-surface-tint transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="acknowledge-4" onClick={actions?.["acknowledge-4"]}>
                          ACKNOWLEDGE
                      </button>
      </div>
      </div>
      </main>
    </>
  );
}
