// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Options
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Settings } from "lucide-react";


export type GameOptionsActionId = "reboot-session-1" | "button-2-2" | "button-3-3" | "reset-defaults-4" | "apply-configuration-5";

export interface GameOptionsProps {
  actions?: Partial<Record<GameOptionsActionId, () => void>>;
}

export function GameOptions({ actions }: GameOptionsProps) {
  return (
    <>
      {/* Side Navigation (Desktop) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full flex-col pt-16 bg-surface-container-low border-r border-outline-variant w-64 rounded-none z-40">
      <div className="px-gutter mb-8">
      <h1 className="font-headline-md text-headline-md font-black text-primary">SUPERVISOR</h1>
      <p className="font-status-label text-status-label text-on-surface-variant mt-1">OS_V1.0.4_STABLE</p>
      </div>
      <div className="flex-1 flex flex-col gap-2 w-full">
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">TERMINAL</span>
      </a>
      <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-3 hover:bg-surface-container-high transition-colors" href="#">
      <Circle aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">RECORDS</span>
      </a>
      <a className="flex items-center gap-4 bg-primary text-on-primary font-bold px-4 py-3 rounded-none border-l-4 border-primary" href="#">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-status-label text-status-label">SYSTEM</span>
      </a>
      </div>
      <div className="p-gutter">
      <button className="w-full h-target-min border border-outline-variant bg-surface text-on-surface font-status-label text-status-label hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2" type="button" data-action-id="reboot-session-1" onClick={actions?.["reboot-session-1"]}>
      <Circle aria-hidden={true} focusable="false" />
                      REBOOT SESSION
                  </button>
      </div>
      </nav>
      {/* Top Navigation (Mobile) */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile h-target-min bg-background text-primary border-b border-outline-variant z-40 sticky top-0">
      <span className="font-headline-md text-headline-md font-bold tracking-tighter text-primary">ROOT_FIX // SNAKE</span>
      <div className="flex gap-4">
      <button className="text-primary hover:bg-surface-container transition-colors duration-200 h-10 w-10 flex items-center justify-center rounded-full" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      <button className="text-primary hover:bg-surface-container transition-colors duration-200 h-10 w-10 flex items-center justify-center rounded-full" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <Settings  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
      {/* Header */}
      <header className="border-b border-outline-variant pb-4">
      <h2 className="font-headline-lg text-headline-lg text-on-background">SYSTEM CONFIGURATION</h2>
      <p className="text-on-surface-variant font-status-label text-status-label mt-2">ADJUST ENVIRONMENT PARAMETERS</p>
      </header>
      <form className="flex flex-col gap-8">
      {/* Difficulty Grid */}
      <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
      <Circle className="text-primary" aria-hidden={true} focusable="false" />
      <h3 className="font-headline-md text-headline-md text-on-surface">OPERATIONAL DIFFICULTY</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label className="cursor-pointer relative">
      <input className="peer sr-only" name="difficulty" type="radio" value="easy" />
      <div className="p-4 border border-outline-variant bg-surface hover:border-primary transition-colors h-full flex flex-col gap-2 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 peer-checked:ring-offset-background">
      <span className="font-status-label text-status-label text-on-surface">PROTOCOL: BASIC</span>
      <p className="text-on-surface-variant text-sm">Slower progression, larger target zones.</p>
      </div>
      </label>
      <label className="cursor-pointer relative">
      <input checked={true} className="peer sr-only" name="difficulty" type="radio" value="medium" />
      <div className="p-4 border border-outline-variant bg-surface hover:border-primary transition-colors h-full flex flex-col gap-2 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 peer-checked:ring-offset-background">
      <span className="font-status-label text-status-label text-primary">PROTOCOL: STANDARD</span>
      <p className="text-on-surface-variant text-sm">Linear acceleration curve.</p>
      </div>
      </label>
      <label className="cursor-pointer relative">
      <input className="peer sr-only" name="difficulty" type="radio" value="hard" />
      <div className="p-4 border border-outline-variant bg-surface hover:border-error transition-colors h-full flex flex-col gap-2 peer-checked:border-error peer-checked:ring-2 peer-checked:ring-error peer-checked:ring-offset-2 peer-checked:ring-offset-background">
      <span className="font-status-label text-status-label text-error">PROTOCOL: BRUTAL</span>
      <p className="text-on-surface-variant text-sm">Exponential speed increase, minimal leeway.</p>
      </div>
      </label>
      </div>
      </section>
      {/* Toggles */}
      <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
      <Circle className="text-primary" aria-hidden={true} focusable="false" />
      <h3 className="font-headline-md text-headline-md text-on-surface">ENVIRONMENT TOGGLES</h3>
      </div>
      <div className="flex flex-col gap-4 border border-outline-variant bg-surface p-4">
      <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
      <div>
      <h4 className="font-status-label text-status-label text-on-surface">HAPTIC FEEDBACK</h4>
      <p className="text-on-surface-variant text-sm mt-1">Enable vibration on collision and acquisition.</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={true} className="sr-only peer" type="checkbox" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-outline-variant after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      <div className="flex items-center justify-between py-4 border-b border-outline-variant">
      <div>
      <h4 className="font-status-label text-status-label text-on-surface">AUDIO TELEMETRY</h4>
      <p className="text-on-surface-variant text-sm mt-1">System sounds and synth wave background tracks.</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={true} className="sr-only peer" type="checkbox" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-outline-variant after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      <div className="flex items-center justify-between pt-4">
      <div>
      <h4 className="font-status-label text-status-label text-on-surface">CRT SCANLINES</h4>
      <p className="text-on-surface-variant text-sm mt-1">Visual overlay to simulate legacy terminal hardware.</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input className="sr-only peer" type="checkbox" />
      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-outline-variant after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      </section>
      {/* Action Bar */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-outline-variant mt-4">
      <button className="h-target-min px-6 border border-outline-variant bg-surface text-on-surface font-status-label text-status-label hover:border-on-surface transition-colors" type="button" data-action-id="reset-defaults-4" onClick={actions?.["reset-defaults-4"]}>
                              RESET DEFAULTS
                          </button>
      <button className="h-target-min px-8 bg-primary text-on-primary font-status-label text-status-label hover:bg-surface-tint transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" type="button" data-action-id="apply-configuration-5" onClick={actions?.["apply-configuration-5"]}>
                              APPLY CONFIGURATION
                          </button>
      </div>
      </form>
      </div>
      </main>
    </>
  );
}
