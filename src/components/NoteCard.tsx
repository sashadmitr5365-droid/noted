"use client";

import { formatRelative } from "@/lib/notes";
import { useSettings, type NoteBadgeIcon, type BadgePosition } from "@/lib/settings";

export type NoteListItem = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tasks: { id: number; text: string; done: boolean }[];
};

function BadgeIcon({
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
          <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
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
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
          <circle cx="8" cy="15" r="4" />
          <path d="m10.85 12.15 8.15-8.15" />
          <path d="m18 5 3 3" />
          <path d="m15 8 3 3" />
        </svg>
      );
    case "fire":
      return (
        <svg {...common}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 2.5-1 2.5-2.5 0-2-2-3-2-5 0-2 1.5-4 1.5-4s5 3 5 9a7 7 0 0 1-14 0c0-2 1-4 3-5.5 0 0 0 1.5 1.5 2.5 0-1 0-3 1-4 0 0 0 2 1 3 0-2 1-4 3-5 0 0 0 3-3 5.5 0 1.5-1 2-1 2z" />
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
          <path d="M6 1v3" />
          <path d="M10 1v3" />
          <path d="M14 1v3" />
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
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
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
          <circle cx="12" cy="5" r="3" />
          <line x1="12" y1="22" x2="12" y2="8" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 22V12" />
          <path d="M12 2 7 8h3l-4 5h3l-3 4h10l-3-4h3l-4-5h3z" />
        </svg>
      );
    case "lightning":
      return (
        <svg {...common}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "film":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
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
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M2 18h20l-2-11-5 4-3-7-3 7-5-4z" />
        </svg>
      );
  }
}

function badgePositionClasses(pos: BadgePosition) {
  const vertical = pos.startsWith("top") ? "top-3" : "bottom-3";
  const horizontal = pos.endsWith("right") ? "right-3" : "left-3";
  return `${vertical} ${horizontal}`;
}

export default function NoteCard({
  note,
  onOpen,
  onDelete,
  index = 0,
}: {
  note: NoteListItem;
  onOpen: () => void;
  onDelete: () => void;
  index?: number;
}) {
  const { settings } = useSettings();
  const totalTasks = note.tasks.length;
  const doneTasks = note.tasks.filter((t) => t.done).length;
  const hasTasks = totalTasks > 0;
  const hasBody = note.body.trim().length > 0;
  const preview = note.body.trim();
  const progress = totalTasks > 0 ? doneTasks / totalTasks : 0;
  const radius = Math.max(4, Math.min(40, settings.cardRadius));

  const showIcon = settings.showBadgeIcon;
  const showText = settings.showBadgeText;
  const showBadge = showIcon || showText;
  const badgeLabel =
    settings.badgeLabel.trim().length > 0 ? settings.badgeLabel : "Заметка";

  // If badge is in the bottom, the created-date footer is suppressed
  // to avoid visual collision.
  const badgeAtBottom = settings.badgePosition.startsWith("bottom");

  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete();
      }}
      style={{ borderRadius: `${radius}px` }}
      className="group relative w-full overflow-hidden border border-white/[0.10] bg-white/[0.05] p-5 text-left shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_24px_40px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 active:scale-[0.985] hover:border-white/[0.18] hover:bg-white/[0.08] animate-fade-up"
    >
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.04] blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
      />
      {/* Inner hairline highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-white/[0.03]"
        style={{ borderRadius: `${radius}px` }}
      />

      {/* Badge — absolutely positioned, default top-right */}
      {showBadge && (
        <div
          className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-black/30 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-md ${badgePositionClasses(
            settings.badgePosition
          )}`}
        >
          {showIcon && <BadgeIcon name={settings.badgeIcon} className="h-3 w-3" />}
          {showText && <span>{badgeLabel}</span>}
        </div>
      )}

      <div
        className={`relative flex items-start gap-3 ${
          showBadge && settings.badgePosition.startsWith("top")
            ? "pr-24"
            : showBadge && settings.badgePosition.endsWith("right")
            ? "pr-24"
            : showBadge && settings.badgePosition.endsWith("left")
            ? "pl-24"
            : ""
        } ${showBadge && settings.badgePosition.startsWith("bottom") ? "pb-9" : ""}`}
      >
        <div className="min-w-0 flex-1">
          <h3 className="t-h2 truncate text-white">
            {note.title || "Без названия"}
          </h3>

          {hasBody && (
            <p
              className="t-body mt-1 line-clamp-2"
              style={{ color: settings.bodyColor }}
            >
              {preview}
            </p>
          )}

          {!hasBody && hasTasks && (
            <p
              className="t-body mt-1"
              style={{ color: settings.bodyColor }}
            >
              {doneTasks} из {totalTasks} выполнено
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-white/45">
            <span>{formatRelative(note.updatedAt)}</span>
            {hasTasks && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>
                  {doneTasks}/{totalTasks}
                </span>
              </>
            )}
          </div>

          {hasTasks && (
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-white/80 transition-all duration-500"
                style={{ width: `${Math.max(8, progress * 100)}%` }}
              />
            </div>
          )}
        </div>

      </div>

      {/* Created date footer */}
      {settings.showCreatedDate && !badgeAtBottom && (
        <div className="t-meta relative mt-3 border-t border-white/[0.06] pt-2.5 text-white/40">
          Создано {formatRelative(note.createdAt)}
        </div>
      )}
    </button>
  );
}
