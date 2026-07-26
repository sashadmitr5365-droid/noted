"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconList } from "./icons";
import AppBackground from "./AppBackground";
import { useSettings, type NoteBadgeIcon, type BadgePosition } from "@/lib/settings";
import { renderDocToHTML, plainTextToDoc } from "@/lib/editor";

function badgePositionClasses(pos: BadgePosition) {
  const vertical = pos.startsWith("top") ? "top-4" : "bottom-4";
  const horizontal = pos.endsWith("right") ? "right-4" : "left-4";
  return `${vertical} ${horizontal}`;
}

function BadgeIcon({
  name,
  className,
}: {
  name: NoteBadgeIcon;
  className?: string;
}) {
  const common = {
    width: 14,
    height: 14,
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
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 2.5-1 2.5-2.5 0-2-2-3-2-5 0-2 1.5-4 1.5-4s5 3 5 9a7 7 0 0 1-14 0c0-2 1-4 3-5.5 0 0 0 1.5 1.5 2.5 0-1 0-3 1-4 0 0 0 2 1 3 0-2 1-4 3-5 0 0 0 3-3 5.5 0 1.5-1 2-1 2z" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
          <path d="m12 22 7.59-12.59" />
          <path d="M12 22 4.41 9.41" />
        </svg>
      );
  }
}

export type NoteViewInitial = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tasks: { id: number; text: string; done: boolean }[];
};

export default function NoteView({ initial }: { initial: NoteViewInitial }) {
  const router = useRouter();
  const [doneMap, setDoneMap] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {};
    initial.tasks.forEach((t) => {
      m[t.id] = t.done;
    });
    return m;
  });

  useEffect(() => {
    const m: Record<number, boolean> = {};
    initial.tasks.forEach((t) => {
      m[t.id] = t.done;
    });
    setDoneMap(m);
  }, [initial.tasks]);

  const { settings } = useSettings();
  const total = initial.tasks.length;
  const done = initial.tasks.filter((t) => doneMap[t.id]).length;
  const progress = total > 0 ? done / total : 0;
  const hasBody = initial.body.trim().length > 0;

  async function toggle(taskId: number) {
    const newDone = !doneMap[taskId];
    setDoneMap((prev) => ({ ...prev, [taskId]: newDone }));
    try {
      await fetch(`/api/notes/${initial.id}/task`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, done: newDone }),
      });
    } catch {
      setDoneMap((prev) => ({ ...prev, [taskId]: !newDone }));
    }
  }

  return (
    <AppBackground>
      {/* Top bar */}
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
          Просмотр
        </div>

        <button
          type="button"
          onClick={() => router.push(`/note/${initial.id}`)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/75 backdrop-blur-xl transition-all active:scale-95 hover:border-white/20 hover:text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
          aria-label="Редактировать"
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        </button>
      </header>

      {/* Glass card */}
      <main
        className={`relative z-10 flex flex-col px-5 pb-12 pt-2 ${
          settings.viewCardPosition === "center"
            ? "min-h-[calc(100vh-80px)] items-center justify-center"
            : "min-h-[calc(100vh-80px)] justify-start"
        }`}
      >
        <div className="relative mx-auto w-full max-w-md">
          {/* Faint refracted glow under the card — simulates light bending through glass */}
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 bg-white/[0.03] blur-2xl"
            style={{ borderRadius: `${Math.max(8, settings.cardRadius + 4)}px` }}
          />

          <article
            className="relative overflow-hidden border border-white/[0.10] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]"
            style={{
              borderRadius: `${settings.cardRadius}px`,
              // The glass itself: heavy blur + low opacity + saturation boost
              backdropFilter: "blur(40px) saturate(140%)",
              WebkitBackdropFilter: "blur(40px) saturate(140%)",
              // A very subtle vertical gradient — the "tint" of real glass
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.035) 100%)",
            }}
          >
            {/* Specular highlight — thin top sheen, like a real glass edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
              }}
            />
            {/* Inner edge — extremely faint, doubles the border for "thickness" */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: `${settings.cardRadius}px`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />
            {/* Internal frosted noise — gives the glass a real surface texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                backgroundSize: "180px 180px",
              }}
            />
            {/* Bottom inner shadow — gives glass volume */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.15)",
              }}
            />

            <div
              className={`relative p-7 ${
                (settings.showBadgeIcon || settings.showBadgeText) &&
                settings.badgePosition.endsWith("right")
                  ? "pr-28"
                  : (settings.showBadgeIcon || settings.showBadgeText) &&
                    settings.badgePosition.endsWith("left")
                  ? "pl-28"
                  : ""
              } ${
                (settings.showBadgeIcon || settings.showBadgeText) &&
                settings.badgePosition.startsWith("bottom")
                  ? "pb-20"
                  : ""
              }`}
            >
              {(settings.showBadgeIcon || settings.showBadgeText) && (
                <div
                  className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md ${badgePositionClasses(
                    settings.badgePosition
                  )}`}
                >
                  {settings.showBadgeIcon && (
                    <BadgeIcon name={settings.badgeIcon} className="h-3 w-3" />
                  )}
                  {settings.showBadgeText && (
                    <span>{settings.badgeLabel.trim() || "Заметка"}</span>
                  )}
                </div>
              )}

              <h1 className="t-h1 text-white">
                {initial.title || "Без названия"}
              </h1>

              {hasBody && (
                <div
                  className="doc-render t-body mt-3"
                  style={{
                    color: settings.bodyColor,
                    textAlign: settings.bodyAlign,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: renderDocToHTML(plainTextToDoc(initial.body)),
                  }}
                />
              )}

              {total > 0 && (
                <section className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      <IconList className="h-3.5 w-3.5" />
                      <span>Задачи</span>
                    </div>
                    <span className="text-[12px] text-white/55">
                      {done} из {total}
                    </span>
                  </div>

                  <div className="mb-4 h-px w-full overflow-hidden bg-white/10">
                    <div
                      className="h-full bg-white/70 transition-all duration-500"
                      style={{ width: `${Math.max(6, progress * 100)}%` }}
                    />
                  </div>

                  <ul className="flex flex-col">
                    {initial.tasks.map((task) => {
                      const isDone = doneMap[task.id];
                      return (
                        <li key={task.id}>
                          <button
                            type="button"
                            onClick={() => toggle(task.id)}
                            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                isDone
                                  ? "border-white/70 bg-white/80 text-ink-950"
                                  : "border-white/25 bg-transparent text-transparent group-hover:border-white/45"
                              }`}
                            >
                              <svg
                                width={11}
                                height={11}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </span>
                            <span
                              className={`flex-1 text-[14.5px] leading-snug text-white ${
                                isDone ? "text-white/45 line-through" : ""
                              }`}
                            >
                              {task.text}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>
          </article>

          {settings.viewDateEnabled && (
            <DateFooter createdAt={initial.createdAt} />
          )}
        </div>
      </main>
    </AppBackground>
  );
}

function DateFooter({ createdAt }: { createdAt: string }) {
  const { settings } = useSettings();
  const date = new Date(createdAt);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  const parts: string[] = [];
  if (settings.viewDateShowDay) parts.push(String(date.getDate()));
  if (settings.viewDateShowMonth) parts.push(months[date.getMonth()]);
  if (settings.viewDateShowYear) parts.push(String(date.getFullYear()));
  const dateStr = parts.join(" ");
  if (!dateStr && !settings.viewDateShowLabel) return null;
  return (
    <div className="relative mt-5 flex items-center justify-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/40">
      {settings.viewDateShowLabel && dateStr && <span>Создано</span>}
      {settings.viewDateShowLabel && dateStr && (
        <span className="h-1 w-1 rounded-full bg-white/25" />
      )}
      {dateStr && <span>{dateStr}</span>}
      {!dateStr && settings.viewDateShowLabel && <span>—</span>}
    </div>
  );
}
