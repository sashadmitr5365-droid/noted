"use client";

import type { ReactNode } from "react";
import { useSettings } from "@/lib/settings";
import { getBackgroundById, composeBackground } from "@/lib/backgrounds";

/**
 * AppBackground — full-screen premium backdrop.
 * Layers:
 *  1. solid base color
 *  2. multi-stop soft radial gradients
 *  3. extremely subtle film grain noise (data URI)
 *  4. gentle vignette to focus center
 *
 * The element is fixed so it spans the viewport even when content scrolls.
 */
export default function AppBackground({
  children,
  showFrame = true,
}: {
  children: ReactNode;
  showFrame?: boolean;
}) {
  const { settings } = useSettings();
  const bg = getBackgroundById(settings.background);

  return (
    <div data-font={settings.fontSize} className="relative min-h-screen w-full overflow-hidden">
      {/* Layer 1+2: base + gradient layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: composeBackground(bg) }}
      />

      {/* Layer 3: subtle film grain — SVG turbulence as data URI */}
      {bg.noise && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "220px 220px",
          }}
        />
      )}

      {/* Layer 4: vignette */}
      {bg.vignette && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}

      {/* Content container, centered to a phone-width on desktop */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col">
        {showFrame ? (
          <div className="flex min-h-screen flex-col">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
