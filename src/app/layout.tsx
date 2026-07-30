import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SettingsProvider } from "@/lib/settings";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noted — Минималистичные заметки",
  description:
    "Современное приложение для заметок и задач с темным минималистичным дизайном.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#070709",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        {/* Global SVG noise filter for the glass card. Referenced by
            filter: url(#glass-noise) inside .glass-noise-overlay. */}
        <svg
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
        >
          <filter id="glass-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={3}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
      </head>
      <body className="min-h-screen bg-ink-950 text-ink-50 antialiased font-sans">
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
