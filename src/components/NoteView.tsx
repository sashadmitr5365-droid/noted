"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconList } from "./icons";
import { BadgeIcon } from "./BadgeIcon";
import AppBackground from "./AppBackground";
import {
  useSettings,
  type BadgePosition,
} from "@/lib/settings";
import { renderDocToHTML, plainTextToDoc } from "@/lib/editor";

function badgePositionClasses(pos: BadgePosition) {
  const vertical = pos.startsWith("top") ? "top-4" : "bottom-4";
  const horizontal = pos.endsWith("right") ? "right-4" : "left-4";
  return `${vertical} ${horizontal}`;
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
  const { settings } = useSettings();
  const [doneMap, setDoneMap] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {};
    initial.tasks.forEach((t) => {
      m[t.id] = t.done;
    });
    return m;
  });
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const m: Record<number, boolean> = {};
    initial.tasks.forEach((t) => {
      m[t.id] = t.done;
    });
    setDoneMap(m);
  }, [initial.tasks]);

  const total = initial.tasks.length;
  const done = initial.tasks.filter((t) => doneMap[t.id]).length;
  const progress = total > 0 ? done / total : 0;
  const hasBody = initial.body.trim().length > 0;
  const showBadge = settings.showBadgeIcon || settings.showBadgeText;

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

  function goBack() {
    router.push("/");
  }

  // Tap outside the card or swipe down to close
  function onBackdropClick(e: React.MouseEvent<HTMLElement>) {
    if (e.target === e.currentTarget) goBack();
  }
  function onTouchStart(e: React.TouchEvent) {
    setDragStart(e.touches[0].clientY);
  }
  function onTouchMove(e: React.TouchEvent) {
    if (dragStart === null) return;
    const diff = e.touches[0].clientY - dragStart;
    if (diff > 0) setDragOffset(diff);
  }
  function onTouchEnd() {
    if (dragOffset > 120) goBack();
    else setDragOffset(0);
    setDragStart(null);
  }

  return (
    <AppBackground>
      {/* Backdrop: tap here or swipe down to close */}
      <main
        className={`relative z-10 flex w-full flex-col px-5 ${
          settings.viewCardPosition === "center"
            ? "min-h-screen items-center justify-center"
            : "min-h-screen justify-start pt-16"
        }`}
        onClick={onBackdropClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform:
            dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
          transition: dragStart === null ? "transform 0.2s" : undefined,
        }}
      >
        <div
          className="relative mx-auto w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Soft refracted glow under the card */}
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 bg-white/[0.03] blur-2xl"
            style={{
              borderRadius: `${Math.max(8, settings.cardRadius + 4)}px`,
            }}
          />

          <article
            className="relative overflow-hidden border border-white/[0.10] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]"
            style={{
              borderRadius: `${settings.cardRadius}px`,
              backdropFilter: "blur(40px) saturate(140%)",
              WebkitBackdropFilter: "blur(40px) saturate(140%)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%)",
            }}
          >
            {/* Top sheen — light catching the glass edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              }}
            />
            {/* Inner hairline border */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: `${settings.cardRadius}px`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            />
            {/* Frosted noise */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                backgroundSize: "180px 180px",
              }}
            />

            {/* Floating badge — does NOT take layout space */}
            {showBadge && (
              <div
                className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md ${badgePositionClasses(
                  settings.badgePosition
                )}`}
                style={{ pointerEvents: "none" }}
              >
                {settings.showBadgeIcon && (
                  <BadgeIcon name={settings.badgeIcon} className="h-3 w-3" />
                )}
                {settings.showBadgeText && (
                  <span>{settings.badgeLabel.trim() || "Заметка"}</span>
                )}
              </div>
            )}

            {/* Card content — full width, never compressed by the badge */}
            <div className="relative p-7">
              <h1 className="t-h1 text-white">
                {initial.title || "Без названия"}
              </h1>

              {hasBody && (
                <div
                  className="doc-render t-body mt-4 break-words"
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
                            className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
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
                              className={`flex-1 break-words text-[14.5px] leading-snug text-white ${
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
            <div className="mt-5 text-center text-[10.5px] uppercase tracking-[0.2em] text-white/40">
              <DateFooter createdAt={initial.createdAt} />
            </div>
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
  return (
    <span>
      {settings.viewDateShowLabel && dateStr && <>Создано · </>}
      {dateStr}
      {!dateStr && settings.viewDateShowLabel && "—"}
    </span>
  );
}
