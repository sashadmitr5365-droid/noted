"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconArrowLeft, IconCheck } from "./icons";
import {
  useSettings,
  NOTE_BADGE_ICONS,
  BADGE_POSITIONS,
  BODY_COLOR_PRESETS,
  type NoteBadgeIcon,
} from "@/lib/settings";
import { BACKGROUNDS, getBackgroundById, composeBackground } from "@/lib/backgrounds";
import NoteCard, { type NoteListItem } from "./NoteCard";

function BadgeIconPreview({
  name,
  className,
}: {
  name: NoteBadgeIcon;
  className?: string;
}) {
  const common = {
    width: 16,
    height: 16,
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
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
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
  }
}

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, update, reset } = useSettings();
  const previewBg = getBackgroundById(settings.background);
  const [iconsExpanded, setIconsExpanded] = useState(false);
  const visibleIcons = iconsExpanded
    ? NOTE_BADGE_ICONS
    : NOTE_BADGE_ICONS.slice(0, 14);

  // Sample note for live preview of card
  const sampleNote: NoteListItem = {
    id: 0,
    title: "Идея на вечер",
    body:
      "Записать мысли, поставить задачи, выдохнуть и не забыть про важное.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
    tasks: [
      { id: 1, text: "Закончить проект", done: true },
      { id: 2, text: "Позвонить маме", done: false },
      { id: 3, text: "Прочитать главу книги", done: false },
    ],
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden transition-[background] duration-700"
      style={{ background: composeBackground(previewBg) }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <header className="sticky top-0 z-30 flex items-center justify-between px-5 pt-7 pb-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/75 backdrop-blur-xl transition-all active:scale-95 hover:border-white/20 hover:text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
          aria-label="Назад"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>

        <div
          className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          Настройки
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Сбросить все настройки?")) reset();
          }}
          className="flex h-10 items-center justify-center rounded-full border border-white/10 px-3 text-[12px] font-medium text-white/65 backdrop-blur-xl transition-all active:scale-95 hover:border-white/20 hover:text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          Сброс
        </button>
      </header>

      <main className="relative z-10 px-5 pb-12 pt-2">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-white">
            Настройки
          </h1>
          <p className="mt-1.5 text-[13.5px] text-white/65">
            Персонализируйте приложение под себя.
          </p>

          {/* Live card preview */}
          <section className="mt-7">
            <div className="mb-2 flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">
              <span>Предпросмотр карточки</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="rounded-[20px] border border-white/[0.10] bg-white/[0.04] p-3 backdrop-blur-xl">
              <NoteCard
                note={sampleNote}
                index={0}
                onOpen={() => {}}
                onDelete={() => {}}
              />
            </div>
          </section>

          {/* Card radius */}
          <Section title="Скругление карточек">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={4}
                max={40}
                step={1}
                value={settings.cardRadius}
                onChange={(e) =>
                  update({ cardRadius: Number(e.target.value) })
                }
                className="flex-1 accent-white"
              />
              <span className="w-12 text-right text-[12px] font-medium tabular-nums text-white/75">
                {settings.cardRadius}px
              </span>
            </div>
            <div className="mt-2 flex justify-between text-[10.5px] uppercase tracking-[0.14em] text-white/40">
              <span>Острее</span>
              <span>Мягче</span>
            </div>
          </Section>

          {/* Badge settings */}
          <Section title="Метка на карточке">
            <div className="flex flex-col gap-3">
              <Toggle
                label="Показывать иконку"
                description="Отображать иконку в метке"
                checked={settings.showBadgeIcon}
                onChange={(v) => update({ showBadgeIcon: v })}
              />
              <Toggle
                label="Показывать текст"
                description="Отображать слово рядом с иконкой"
                checked={settings.showBadgeText}
                onChange={(v) => update({ showBadgeText: v })}
              />
            </div>

            <SubLabel className="mt-5">Позиция метки</SubLabel>
            <Segmented
              options={BADGE_POSITIONS}
              value={settings.badgePosition}
              onChange={(v) => update({ badgePosition: v })}
            />

            {(settings.showBadgeIcon || settings.showBadgeText) && (
              <>
                <div className="mt-5 mb-2 flex items-center justify-between">
                  <SubLabel className="m-0">Иконка</SubLabel>
                  <button
                    type="button"
                    onClick={() => setIconsExpanded((v) => !v)}
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    {iconsExpanded
                      ? "Свернуть"
                      : `Показать все (${NOTE_BADGE_ICONS.length})`}
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {visibleIcons.map((opt) => {
                    const active = settings.badgeIcon === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => update({ badgeIcon: opt.id })}
                        className={`relative flex aspect-square items-center justify-center rounded-xl border transition-all ${
                          active
                            ? "border-white bg-white/20 text-white shadow-[0_0_0_2px_rgba(255,255,255,0.18)]"
                            : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/30 hover:text-white"
                        }`}
                        aria-label={opt.label}
                        title={opt.label}
                      >
                        <BadgeIconPreview name={opt.id} />
                        {active && (
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
                            <svg
                              width={9}
                              height={9}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0b0b0f"
                              strokeWidth={3.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <SubLabel className="mt-4">Текст метки</SubLabel>
                <input
                  type="text"
                  value={settings.badgeLabel}
                  onChange={(e) => update({ badgeLabel: e.target.value })}
                  maxLength={24}
                  placeholder="Заметка"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14.5px] font-medium text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
                />
              </>
            )}
          </Section>

          {/* Date footer (list card) */}
          <Section title="Дата создания (список)">
            <Toggle
              label="Показывать внизу карточки"
              description="Под карточкой — когда была создана"
              checked={settings.showCreatedDate}
              onChange={(v) => update({ showCreatedDate: v })}
            />
          </Section>

          {/* View screen options */}
          <Section title="Полноэкранный просмотр">
            <SubLabel>Расположение карточки</SubLabel>
            <Segmented
              options={[
                { id: "top", label: "Сверху" },
                { id: "center", label: "По центру" },
              ]}
              value={settings.viewCardPosition}
              onChange={(v) => update({ viewCardPosition: v })}
            />

            <SubLabel className="mt-5">Дата внизу карточки</SubLabel>
            <div className="flex flex-col gap-3">
              <Toggle
                label="Показывать дату"
                description="Строка с датой внизу стеклянной карточки"
                checked={settings.viewDateEnabled}
                onChange={(v) => update({ viewDateEnabled: v })}
              />
              <Toggle
                label="Слово «Создано»"
                description="Подпись перед датой"
                checked={settings.viewDateShowLabel}
                onChange={(v) => update({ viewDateShowLabel: v })}
                disabled={!settings.viewDateEnabled}
              />
              <Toggle
                label="Число"
                description="Например «15»"
                checked={settings.viewDateShowDay}
                onChange={(v) => update({ viewDateShowDay: v })}
                disabled={!settings.viewDateEnabled}
              />
              <Toggle
                label="Месяц"
                description="Например «марта»"
                checked={settings.viewDateShowMonth}
                onChange={(v) => update({ viewDateShowMonth: v })}
                disabled={!settings.viewDateEnabled}
              />
              <Toggle
                label="Год"
                description="Например «2025»"
                checked={settings.viewDateShowYear}
                onChange={(v) => update({ viewDateShowYear: v })}
                disabled={!settings.viewDateEnabled}
              />
            </div>
          </Section>

          {/* Typography */}
          <Section title="Размер шрифта">
            <Segmented
              cols={3}
              options={[
                { id: "small", label: "Мелкий" },
                { id: "medium", label: "Средний" },
                { id: "large", label: "Крупный" },
              ]}
              value={settings.fontSize}
              onChange={(v) => update({ fontSize: v })}
            />
          </Section>

          {/* Body text color */}
          <Section title="Цвет текста описания">
            <div className="grid grid-cols-5 gap-2.5">
              {BODY_COLOR_PRESETS.map((c) => {
                const active =
                  settings.bodyColor.toLowerCase() === c.value.toLowerCase();
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => update({ bodyColor: c.value })}
                    className="group flex flex-col items-center gap-1.5"
                    aria-label={c.label}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                        active
                          ? "border-white scale-110"
                          : "border-white/15 group-hover:border-white/40"
                      }`}
                      style={{
                        background: c.value,
                        boxShadow: active
                          ? `0 0 12px ${c.value}80, 0 2px 6px rgba(0,0,0,0.4)`
                          : "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {active && (
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0b0b0f"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[10.5px] font-medium text-white/70">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <SubLabel className="mt-5">Выравнивание текста</SubLabel>
            <Segmented
              cols={3}
              options={[
                { id: "left", label: "По левому краю" },
                { id: "center", label: "По центру" },
                { id: "right", label: "По правому краю" },
              ]}
              value={settings.bodyAlign}
              onChange={(v) => update({ bodyAlign: v })}
            />
          </Section>

          {/* Background picker */}
          <Section title="Фон приложения">
            <ul className="grid grid-cols-2 gap-3">
              {BACKGROUNDS.map((bg) => {
                const isActive = settings.background === bg.id;
                return (
                  <li key={bg.id}>
                    <button
                      type="button"
                      onClick={() => update({ background: bg.id })}
                      className={`group relative w-full overflow-hidden rounded-[16px] border text-left transition-all ${
                        isActive
                          ? "border-white/70 ring-1 ring-white/40"
                          : "border-white/10 hover:border-white/30"
                      }`}
                      style={{ boxShadow: "0 10px 30px -12px rgba(0,0,0,0.4)" }}
                    >
                      <div
                        className="relative h-20 w-full"
                        style={{ background: composeBackground(bg) }}
                      >
                        {isActive && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-ink-950 shadow">
                            <IconCheck className="h-3 w-3" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="border-t border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
                        <div className="truncate text-[12px] font-medium text-white">
                          {bg.name}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
        <span>{title}</span>
        <span className="h-px flex-1 bg-white/15" />
      </div>
      <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        {children}
      </div>
    </section>
  );
}

function SubLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/75 ${className}`}
    >
      {children}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-3 ${
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-semibold text-white">{label}</div>
        {description && (
          <div className="mt-0.5 text-[12px] text-white/55">{description}</div>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-all duration-200 ${
          checked
            ? "border-white/40 bg-white"
            : "border-white/20 bg-black/50"
        } ${disabled ? "opacity-50" : ""}`}
        style={
          checked
            ? {
                background:
                  "linear-gradient(180deg, #ffffff 0%, #e8e8ee 100%)",
              }
            : {
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%)",
              }
        }
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all duration-200 ${
            checked ? "left-[22px] bg-ink-950" : "left-[3px] bg-white"
          }`}
          style={
            checked
              ? { boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }
              : { boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }
          }
        />
      </button>
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  cols = 2,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-2 ${
        cols === 3 ? "grid-cols-3" : "grid-cols-2"
      }`}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={active}
            className={`relative flex h-10 items-center justify-center rounded-xl border text-[13px] font-medium transition-all ${
              active
                ? "border-white bg-white text-ink-950 shadow-[0_4px_14px_-4px_rgba(255,255,255,0.35)]"
                : "border-white/15 bg-white/[0.04] text-white/75 hover:border-white/35 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {opt.label}
            {active && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                <svg
                  width={11}
                  height={11}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0b0b0f"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
