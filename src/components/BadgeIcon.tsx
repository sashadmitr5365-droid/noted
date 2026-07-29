"use client";

import { type NoteBadgeIcon } from "@/lib/settings";

/**
 * Icon library for the badge. Each icon uses 12×12 viewBox so it works
 * for the small 16-22px pill sizes used in cards and view.
 */
export function BadgeIcon({
  name,
  className,
}: {
  name: NoteBadgeIcon;
  className?: string;
}) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    // ─── ORIGINAL 52 ───────────────────────────────────────────────────
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m5.6 5.6 2.8 2.8" />
          <path d="m15.6 15.6 2.8 2.8" />
          <path d="m5.6 18.4 2.8-2.8" />
          <path d="m15.6 8.4 2.8-2.8" />
        </svg>
      );
    case "note":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M3 6h13" />
          <path d="M3 12h13" />
          <path d="M3 18h13" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          {/* Crescent moon */}
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 0 1 4 13c0-7 9-9 16-9 0 7-2 16-9 16z" />
          <path d="M2 22c1-10 5-13 12-13" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 2c2 4-2 5 0 8 1 1 3 0 3-2 4 3 5 7 5 10a8 8 0 0 1-16 0c0-3 1-5 3-7 0 2 1 3 3 3-1-3 0-5 2-7" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 2 4 8.5 12 22l8-13.5z" />
          <path d="M4 8.5h16" />
          <path d="M9 8.5 12 2l3 6.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 2v8" />
          <path d="M5 10h14l-2 4H7z" />
          <path d="M12 14v8" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...common}>
          <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <path d="M4 22V15" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M12 19l7-7 3 3-7 7H12v-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          {/* Paper plane (airplane) — clean modern style */}
          <path d="M21 3 3 10.5l7 2.5 2.5 7z" />
          <path d="M10 13l4 4" />
        </svg>
      );
    case "ghost":
      return (
        <svg {...common}>
          <path d="M12 2a8 8 0 0 0-8 8v12l3-2 3 2 2-2 2 2 3-2 3 2V10a8 8 0 0 0-8-8z" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="currentColor" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          {/* Two keys crossed */}
          <circle cx="8" cy="14" r="3.5" />
          <path d="m10.5 11.5 8.5-8.5 2 2-1.5 1.5 1 1 1.5-1.5 2 2-1.5 1.5" />
          <circle cx="15" cy="8" r="2.5" />
          <path d="m17 6 3-3 2 2-1 1 1 1-1 1" />
        </svg>
      );
    case "fire":
      return (
        <svg {...common}>
          {/* Flame with a small inner core */}
          <path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5-1 1-1.5 2-1.5 3.5 0 2 1.5 3.5 3.5 3.5-1 0-2-.5-2-1.5 0-2 2-3 2-5 0-1.5-1-3 0-4.5z" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" stroke="none" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1-.23-.27-.38-.62-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-10-10-10z" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      );
    case "umbrella":
      return (
        <svg {...common}>
          <path d="M23 12a11.05 11.05 0 0 0-22 0z" />
          <path d="M12 12v6a2 2 0 0 0 4 0" />
        </svg>
      );
    case "anchor":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <line x1="12" y1="7" x2="12" y2="21" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 2 5 11h3L5 16h3l-3 4h14l-3-4h3l-3-5h3z" />
          <rect x="10.5" y="20" width="3" height="2" rx="0.3" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M2 6c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
          <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
          <path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "unlock":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    case "mic":
      return (
        <svg {...common}>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
        </svg>
      );
    case "film":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      );
    case "headphones":
      return (
        <svg {...common}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "feather":
      return (
        <svg {...common}>
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M2 18h20l-2-11-5 4-3-7-3 7-5-4z" />
        </svg>
      );
    // ─── NEW BATCH 1: Nature / animals / plants ──────────────────────────
    case "flower":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 9V4M12 15v5M9 12H4M15 12h5M6.3 6.3l3.5 3.5M14.2 14.2l3.5 3.5M14.2 9.8l3.5-3.5M9.8 14.2l-3.5 3.5" />
        </svg>
      );
    case "tree2":
      return (
        <svg {...common}>
          <path d="M12 2 6 11h2L4 17h4l-3 4h14l-3-4h4l-4-6h2z" />
          <rect x="10.5" y="20" width="3" height="2" rx="0.3" />
        </svg>
      );
    case "palm":
      return (
        <svg {...common}>
          <path d="M12 2c-2 4-2 8 0 12" />
          <path d="M12 2c2 4 2 8 0 12" />
          <path d="M12 2C8 2 4 5 3 9c4 1 7 3 9 5" />
          <path d="M12 2c4 0 8 3 9 7-4 1-7 3-9 5" />
          <line x1="12" y1="14" x2="12" y2="22" />
        </svg>
      );
    case "cactus":
      return (
        <svg {...common}>
          <rect x="9" y="6" width="6" height="16" rx="3" />
          <path d="M9 10H5a2 2 0 0 1 0-4h4" />
          <path d="M15 12h4a2 2 0 0 0 0-4h-4" />
        </svg>
      );
    case "fish":
      return (
        <svg {...common}>
          <path d="M6 12c0-4 4-6 9-6 4 0 6 2 6 6s-2 6-6 6c-5 0-9-2-9-6z" />
          <path d="M2 12l4-3v6z" />
          <circle cx="17" cy="11" r="0.5" fill="currentColor" />
        </svg>
      );
    case "bird":
      return (
        <svg {...common}>
          <path d="M3 14c0-4 4-7 9-7 2 0 4 .5 6 1.5L22 6v4l-3 1" />
          <path d="M22 10c0 4-4 7-10 7-3 0-5-1-7-3l-2 1v-3z" />
          <circle cx="18" cy="11" r="0.6" fill="currentColor" />
        </svg>
      );
    case "cat":
      return (
        <svg {...common}>
          <path d="M5 5l-1 4c-1 1-2 2-2 4 0 3 2 5 4 5v3h12v-3c2 0 4-2 4-5 0-2-1-3-2-4l-1-4-2 3a8 8 0 0 0-10 0z" />
          <circle cx="9" cy="13" r="0.6" fill="currentColor" />
          <circle cx="15" cy="13" r="0.6" fill="currentColor" />
        </svg>
      );
    case "dog":
      return (
        <svg {...common}>
          <path d="M5 8c0-3 2-5 7-5s7 2 7 5v6c0 4-3 7-7 7s-7-3-7-7z" />
          <path d="M3 9c-1 0-2 1-2 3s1 4 3 4" />
          <path d="M21 9c1 0 2 1 2 3s-1 4-3 4" />
          <circle cx="9" cy="12" r="0.6" fill="currentColor" />
          <circle cx="15" cy="12" r="0.6" fill="currentColor" />
        </svg>
      );
    case "rabbit":
      return (
        <svg {...common}>
          <path d="M5 16c0-3 1-5 2-7l-1-5 3 2c1-2 2-3 3-3s2 1 3 3l3-2-1 5c1 2 2 4 2 7" />
          <circle cx="9" cy="13" r="0.6" fill="currentColor" />
          <circle cx="15" cy="13" r="0.6" fill="currentColor" />
        </svg>
      );
    case "fox":
      return (
        <svg {...common}>
          <path d="M5 4l3 4c1-1 2-1 4-1s3 0 4 1l3-4-2 8a8 8 0 0 1-10 0z" />
          <circle cx="9" cy="11" r="0.6" fill="currentColor" />
          <circle cx="15" cy="11" r="0.6" fill="currentColor" />
        </svg>
      );
    case "butterfly":
      return (
        <svg {...common}>
          <path d="M12 12V4M12 12v8M12 12c-3-2-7-3-9-1-1 3 1 6 4 6 2 0 4-2 5-5zM12 12c3-2 7-3 9-1 1 3-1 6-4 6-2 0-4-2-5-5z" />
        </svg>
      );
    case "bee":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="13" rx="5" ry="6" />
          <path d="M8 11h8M8 14h8" />
          <ellipse cx="9" cy="8" rx="2.5" ry="1.5" transform="rotate(-20 9 8)" fill="currentColor" stroke="none" opacity="0.3" />
          <ellipse cx="15" cy="8" rx="2.5" ry="1.5" transform="rotate(20 15 8)" fill="currentColor" stroke="none" opacity="0.3" />
        </svg>
      );
    case "snail":
      return (
        <svg {...common}>
          {/* Snail — spiral shell + body */}
          <path d="M3 18c2-2 4-2 6 0 1 1 2 1 3 0 2-2 4-2 6 0 1 1 2 1 3 0" />
          <path d="M5 14a7 7 0 1 1 14 0c0 2-1 3-3 3H8c-2 0-3-1-3-3z" />
          <circle cx="14" cy="11" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "feather2":
      return (
        <svg {...common}>
          <path d="M20 4c-4 0-8 4-10 8l-2 8 2-2c4-2 8-6 8-10 0-2-1-3-3-3" />
          <path d="M10 12l-2 8M14 8l-4 4" />
        </svg>
      );
    // ─── NEW BATCH 2: Weather / sky ──────────────────────────────────────
    case "sun2":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
        </svg>
      );
    case "moon2":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      );
    case "cloud2":
      return (
        <svg {...common}>
          <path d="M18 10a6 6 0 0 0-11.5-2A4 4 0 0 0 6 16h12a4 4 0 0 0 0-6z" />
        </svg>
      );
    case "cloudRain":
      return (
        <svg {...common}>
          <path d="M18 10a6 6 0 0 0-11.5-2A4 4 0 0 0 6 16h12a4 4 0 0 0 0-6z" />
          <line x1="8" y1="19" x2="7" y2="22" />
          <line x1="12" y1="19" x2="11" y2="22" />
          <line x1="16" y1="19" x2="15" y2="22" />
        </svg>
      );
    case "cloudSnow":
      return (
        <svg {...common}>
          <path d="M18 10a6 6 0 0 0-11.5-2A4 4 0 0 0 6 16h12a4 4 0 0 0 0-6z" />
          <line x1="9" y1="20" x2="8" y2="22" />
          <line x1="15" y1="20" x2="14" y2="22" />
        </svg>
      );
    case "cloudLightning":
      return (
        <svg {...common}>
          <path d="M18 10a6 6 0 0 0-11.5-2A4 4 0 0 0 6 16h12a4 4 0 0 0 0-6z" />
          <polyline points="13 12 11 16 14 16 12 20" />
        </svg>
      );
    case "rainbow":
      return (
        <svg {...common}>
          <path d="M3 18a9 9 0 0 1 18 0" />
          <path d="M5 18a7 7 0 0 1 14 0" />
          <path d="M7 18a5 5 0 0 1 10 0" />
          <path d="M9 18a3 3 0 0 1 6 0" />
        </svg>
      );
    case "wind":
      return (
        <svg {...common}>
          <path d="M3 8h12a3 3 0 1 0-3-3" />
          <path d="M3 12h16a3 3 0 1 1-3 3" />
          <path d="M3 16h10" />
        </svg>
      );
    case "thermometer":
      return (
        <svg {...common}>
          <path d="M12 2a2 2 0 0 0-2 2v10a4 4 0 1 0 4 0V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="17" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "snowflake":
      return (
        <svg {...common}>
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        </svg>
      );
    case "fire2":
      return (
        <svg {...common}>
          <path d="M12 2c-1 4 2 5 2 8 0 2-2 3-2 3l-1-3c-2 2-3 4-3 6a4 4 0 0 0 8 0c0-3-2-5-2-7 0-3 2-5-2-7z" />
        </svg>
      );
    // ─── NEW BATCH 3: Seasons / time ─────────────────────────────────────
    case "sunrise":
      return (
        <svg {...common}>
          <path d="M3 18h18" />
          <path d="M5 14a7 7 0 0 1 14 0" />
          <path d="M12 2v3" />
          <path d="m5 8 2 2M19 8l-2 2" />
          <circle cx="7.5" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sunset2":
      return (
        <svg {...common}>
          <path d="M3 18h18" />
          <path d="M5 14a7 7 0 0 1 14 0" />
          <path d="M12 9V6" />
          <path d="m5 8 2 2M19 8l-2 2" />
        </svg>
      );
    case "moonStars":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          <path d="m17 5 1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 13l.5 1 1 .5-1 .5L19 16l-.5-1-1-.5 1-.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "calendar2":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "hourglass":
      return (
        <svg {...common}>
          <path d="M6 2h12" />
          <path d="M6 22h12" />
          <path d="M6 2c0 4 4 5 4 10s-4 6-4 10" />
          <path d="M18 2c0 4-4 5-4 10s4 6 4 10" />
        </svg>
      );
    // ─── NEW BATCH 4: Buildings / places ───────────────────────────────
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" />
          <line x1="9" y1="7" x2="9" y2="7.01" />
          <line x1="15" y1="7" x2="15" y2="7.01" />
          <line x1="9" y1="11" x2="9" y2="11.01" />
          <line x1="15" y1="11" x2="15" y2="11.01" />
          <line x1="9" y1="15" x2="9" y2="15.01" />
          <line x1="15" y1="15" x2="15" y2="15.01" />
        </svg>
      );
    case "factory":
      return (
        <svg {...common}>
          <path d="M2 20h20V8l-6 4V8l-6 4V4H2z" />
          <line x1="6" y1="14" x2="6.01" y2="14" />
          <line x1="10" y1="14" x2="10.01" y2="14" />
          <line x1="14" y1="14" x2="14.01" y2="14" />
          <line x1="18" y1="14" x2="18.01" y2="14" />
        </svg>
      );
    case "church":
      return (
        <svg {...common}>
          <path d="M12 2v6M9 5h6" />
          <path d="M4 22V12l8-4 8 4v10z" />
          <rect x="9" y="14" width="6" height="8" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="16" rx="1" />
          <line x1="12" y1="10" x2="12" y2="18" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      );
    case "school":
      return (
        <svg {...common}>
          <path d="m2 9 10-5 10 5-10 5z" />
          <path d="M6 11v6c3 1 6 1 6 1s3 0 6-1v-6" />
        </svg>
      );
    case "bank":
      return (
        <svg {...common}>
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      );
    case "tent":
      return (
        <svg {...common}>
          <path d="M3 20 12 4l9 16z" />
          <path d="M12 4v16M3 20h18" />
        </svg>
      );
    case "lighthouse":
      return (
        <svg {...common}>
          <path d="M12 2v3" />
          <path d="M9 5h6l-1 5h-4z" />
          <path d="M10 10h4v10h-4z" />
          <path d="M7 20h10" />
          <line x1="12" y1="10" x2="12" y2="20" />
        </svg>
      );
    // ─── NEW BATCH 5: Vehicles ─────────────────────────────────────────
    case "car":
      return (
        <svg {...common}>
          <path d="M3 17v-3a4 4 0 0 1 1-2l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5a4 4 0 0 1 1 2v3" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="13" height="10" />
          <path d="M15 10h4l3 4v3h-7z" />
          <circle cx="7" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
        </svg>
      );
    case "bus":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="13" x2="21" y2="13" />
          <circle cx="7" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
        </svg>
      );
    case "bike":
      return (
        <svg {...common}>
          <circle cx="5" cy="17" r="3" />
          <circle cx="19" cy="17" r="3" />
          <path d="M5 17l4-7h6l4 7M12 10V5h-2" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M2 12 22 4l-3 9 3 9-8-4-4 2 1-5z" />
        </svg>
      );
    case "ship":
      return (
        <svg {...common}>
          <path d="M2 18s1 1 3 1h14c2 0 3-1 3-1M12 3v11M3 13l3 5h12l3-5M3 13l9-2 9 2" />
        </svg>
      );
    case "train":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="14" rx="2" />
          <line x1="4" y1="11" x2="20" y2="11" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
          <line x1="7" y1="20" x2="7" y2="22" />
          <line x1="17" y1="20" x2="17" y2="22" />
        </svg>
      );
    case "anchor2":
      return (
        <svg {...common}>
          <path d="M12 2v18" />
          <circle cx="12" cy="6" r="2" />
          <path d="M4 13a8 8 0 0 0 16 0" />
        </svg>
      );
    // ─── NEW BATCH 6: Food / drink ─────────────────────────────────────
    case "apple":
      return (
        <svg {...common}>
          <path d="M12 7c-2-3-7-2-7 3s3 11 7 11 7-6 7-11-5-6-7-3z" />
          <path d="M12 7c0-2 1-3 2-3" />
        </svg>
      );
    case "lemon":
      return (
        <svg {...common}>
          <path d="M5 12a7 7 0 0 1 14 0c0 4-3 7-7 7s-7-3-7-7z" />
          <path d="M9 9c0-1 1-2 2-2" />
        </svg>
      );
    case "cherry2":
      return (
        <svg {...common}>
          <path d="M3 12c0 4 3 8 6 8s4-4 4-4 1 4 4 4 6-4 6-8c0-2-2-4-4-4-3 0-6 2-6 2s-3-2-6-2c-2 0-4 2-4 4z" />
          <path d="M12 6c0-2 1-4 2-4" />
        </svg>
      );
    case "mushroom":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 16 0H4z" />
          <line x1="9" y1="14" x2="9" y2="22" />
          <line x1="15" y1="14" x2="15" y2="22" />
          <circle cx="9" cy="9" r="0.5" fill="currentColor" />
          <circle cx="14" cy="7" r="0.5" fill="currentColor" />
        </svg>
      );
    case "bread":
      return (
        <svg {...common}>
          <path d="M3 14c0-4 2-6 5-6 0-2 2-3 4-3s4 1 4 3c3 0 5 2 5 6v6H3z" />
        </svg>
      );
    case "cheese":
      return (
        <svg {...common}>
          <path d="M2 16c0-5 4-8 10-8s10 3 10 8v4H2z" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="14" cy="12" r="0.6" fill="currentColor" />
        </svg>
      );
    case "coffee2":
      return (
        <svg {...common}>
          <path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
          <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
          <path d="M7 2v3M11 2v3M15 2v3" />
        </svg>
      );
    case "tea":
      return (
        <svg {...common}>
          <path d="M3 8h12v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
          <path d="M15 9h2a2 2 0 0 1 0 4h-2" />
          <path d="M7 2c0 1 1 1 1 2s-1 1-1 2M11 2c0 1 1 1 1 2s-1 1-1 2" />
        </svg>
      );
    case "wine":
      return (
        <svg {...common}>
          <path d="M6 3h12l-2 7a4 4 0 0 1-8 0z" />
          <line x1="12" y1="10" x2="12" y2="21" />
          <line x1="8" y1="21" x2="16" y2="21" />
        </svg>
      );
    case "cake":
      return (
        <svg {...common}>
          <path d="M3 19h18v-7H3z" />
          <path d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 2 2" />
          <path d="M12 5v2" />
          <path d="M11 3h2l-1 2z" />
        </svg>
      );
    case "pizza":
      return (
        <svg {...common}>
          <path d="M12 2 2 20h20z" />
          <circle cx="9" cy="14" r="0.6" fill="currentColor" />
          <circle cx="13" cy="12" r="0.6" fill="currentColor" />
          <circle cx="15" cy="16" r="0.6" fill="currentColor" />
        </svg>
      );
    case "icecream":
      return (
        <svg {...common}>
          <path d="M6 11h12l-6 11z" />
          <circle cx="9" cy="8" r="2" />
          <circle cx="14" cy="6" r="2.5" />
          <circle cx="11" cy="4" r="1.5" />
        </svg>
      );
    case "egg":
      return (
        <svg {...common}>
          <path d="M12 3c4 0 7 5 7 11s-3 8-7 8-7-2-7-8 3-11 7-11z" />
        </svg>
      );
    // ─── NEW BATCH 7: Sports / activity ────────────────────────────────
    case "ball":
      return (
        <svg {...common}>
          {/* Soccer / sports ball */}
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3l3 4-1.5 4h-3L9 7z" />
          <path d="M3 12l4-1L9 14l-2 4" />
          <path d="M21 12l-4-1-2 3 2 4" />
        </svg>
      );
    case "trophy2":
      return (
        <svg {...common}>
          <path d="M6 4h12v6a6 6 0 0 1-12 0z" />
          <path d="M6 6H3a3 3 0 0 0 3 3M18 6h3a3 3 0 0 1-3 3" />
          <path d="M10 16h4v4h-4zM8 22h8" />
        </svg>
      );
    case "medal":
      return (
        <svg {...common}>
          <circle cx="12" cy="15" r="6" />
          <path d="m8 3 4 6 4-6M12 9v3" />
        </svg>
      );
    case "flag2":
      return (
        <svg {...common}>
          <path d="M5 21V4h11l-2 4 2 4H5" />
        </svg>
      );
    case "target2":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...common}>
          <line x1="6" y1="12" x2="18" y2="12" />
          <rect x="3" y="9" width="3" height="6" rx="0.5" />
          <rect x="18" y="9" width="3" height="6" rx="0.5" />
          <rect x="1" y="10" width="2" height="4" rx="0.3" />
          <rect x="21" y="10" width="2" height="4" rx="0.3" />
        </svg>
      );
    // ─── NEW BATCH 8: Tools / objects ──────────────────────────────────
    case "hammer":
      return (
        <svg {...common}>
          {/* Hammer — mallet style */}
          <path d="m15 12-6.5 6.5a1.5 1.5 0 0 1-2.12 0l-1.88-1.88a1.5 1.5 0 0 1 0-2.12L11 8" />
          <path d="m17 5 2 2" />
          <path d="M18 4l1 1 2-2-1-1z" />
          <rect x="11" y="6" width="6" height="3" rx="0.5" transform="rotate(45 11 6)" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14 6a4 4 0 0 0-5 5l-6 6 2 2 6-6a4 4 0 0 0 5-5l-3 3-2-2z" />
        </svg>
      );
    case "scissors":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="9" y1="8" x2="21" y2="18" />
          <line x1="9" y1="16" x2="21" y2="6" />
        </svg>
      );
    case "knife":
      return (
        <svg {...common}>
          {/* Chef's knife */}
          <path d="M3 18 14 7l3 3L6 21z" />
          <path d="M14 7l3-3 3 3-3 3" />
        </svg>
      );
    case "key2":
      return (
        <svg {...common}>
          <circle cx="8" cy="14" r="4" />
          <path d="M12 10h10M18 10v3M22 10v2" />
        </svg>
      );
    case "lock2":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 13c1 1 1 2 1 3h6c0-1 0-2 1-3a7 7 0 0 0-4-13z" />
        </svg>
      );
    case "magnet":
      return (
        <svg {...common}>
          <path d="M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0z" />
          <line x1="5" y1="8" x2="9" y2="8" />
          <line x1="15" y1="8" x2="19" y2="8" />
        </svg>
      );
    case "compass2":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16 8 13 13 8 16 11 11 16 8" fill="currentColor" stroke="currentColor" />
        </svg>
      );
    // ─── NEW BATCH 9: Emotions / symbols ───────────────────────────────
    case "smile":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
          <path d="M8 14a4 4 0 0 0 8 0" />
        </svg>
      );
    case "frown":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
          <path d="M16 17a4 4 0 0 0-8 0" />
        </svg>
      );
    case "laugh":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14a4 4 0 0 0 8 0" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
        </svg>
      );
    case "angry":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 3 2M15 9l-3 2" />
          <path d="M16 17a4 4 0 0 0-8 0" />
        </svg>
      );
    case "cry":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
          <path d="M8 15a4 4 0 0 0 8 0" />
          <line x1="9" y1="11" x2="7" y2="18" />
          <line x1="15" y1="11" x2="17" y2="18" />
        </svg>
      );
    case "wink":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
          <path d="M7 10h4" />
          <path d="M8 14a4 4 0 0 0 8 0" />
        </svg>
      );
    case "kiss":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" />
          <circle cx="15" cy="10" r="0.6" fill="currentColor" />
          <path d="M12 15c-1 0-2 1-2 2s1 2 2 2 2-1 2-2" />
        </svg>
      );
    case "sleep":
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 1 1-9-9c2 0 4 1 5.5 2.5-2-1-4.5 1.5-3.5 3.5s4 1 6 0" />
        </svg>
      );
    case "party":
      return (
        <svg {...common}>
          <path d="m4 4 16 16M4 20 20 4" />
          <line x1="4" y1="4" x2="6" y2="2" />
          <line x1="20" y1="20" x2="22" y2="22" />
          <circle cx="4" cy="12" r="0.6" fill="currentColor" />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" />
          <circle cx="20" cy="12" r="0.6" fill="currentColor" />
        </svg>
      );
    case "fire3":
      return (
        <svg {...common}>
          <path d="M12 2c1 3-1 5 1 7 0-2 2-3 2-5 2 1 3 4 3 7a6 6 0 0 1-12 0c0-3 1-5 3-7 0 1 1 1 1 2z" />
        </svg>
      );
    case "crown2":
      return (
        <svg {...common}>
          <path d="M3 6l4 4 5-7 5 7 4-4-2 12H5z" />
        </svg>
      );
    case "gem":
      return (
        <svg {...common}>
          <path d="M6 3h12l3 6-9 13L3 9z" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="3" x2="6" y2="9" />
          <line x1="15" y1="3" x2="18" y2="9" />
        </svg>
      );
    case "diamond2":
      return (
        <svg {...common}>
          <path d="M6 2h12l4 6-10 14L2 8z" />
          <line x1="2" y1="8" x2="22" y2="8" />
          <line x1="6" y1="2" x2="9" y2="8" />
          <line x1="18" y1="2" x2="15" y2="8" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      );
    case "star2":
      return (
        <svg {...common}>
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" />
        </svg>
      );
    case "moonFace":
      return (
        <svg {...common}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          <circle cx="9" cy="10" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="14" cy="10" r="0.7" fill="currentColor" stroke="none" />
          <path d="M9 14c1 1 4 1 5 0" />
        </svg>
      );
    // ─── NEW BATCH 10: Abstract / geometric ────────────────────────────
    case "circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "square":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <polygon points="12 3 22 21 2 21" />
        </svg>
      );
    case "hexagon":
      return (
        <svg {...common}>
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
        </svg>
      );
    case "spiral":
      return (
        <svg {...common}>
          <path d="M12 12a4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4" />
        </svg>
      );
    case "wave2":
      return (
        <svg {...common}>
          <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" />
        </svg>
      );
    case "dot":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "line":
      return (
        <svg {...common}>
          <line x1="4" y1="20" x2="20" y2="4" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      );
    case "minus":
      return (
        <svg {...common}>
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...common}>
          <path d="M18.6 12c0-2 1.4-4 3.4-4s2.4 2 0 4l-9 5c-2 1-2 4 0 4s3.4-2 3.4-4-1.4-4-3.4-4-2 0-2 2 0 4" />
        </svg>
      );
    case "yin":
      return (
        <svg {...common}>
          {/* Yin-yang */}
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9 9 9 0 0 0 9-18z" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.5" r="1.2" fill="#050810" stroke="none" />
          <circle cx="12" cy="16.5" r="1.2" fill="#fff" stroke="none" />
        </svg>
      );
    case "shield2":
      return (
        <svg {...common}>
          <path d="M12 2 4 5v7c0 4 4 8 8 10 4-2 8-6 8-10V5z" />
        </svg>
      );
  }
}
