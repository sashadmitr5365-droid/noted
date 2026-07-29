"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconList } from "./icons";
import { BadgeIcon } from "./BadgeIcon";
import AppBackground from "./AppBackground";
import { useSettings } from "@/lib/settings";
import { renderDocToHTML, plainTextToDoc } from "@/lib/editor";
import { glassStyles, badgeGlass } from "@/lib/glass";

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

  // Two tags, configured in app settings. Each is rendered outside the
  // glass card, above or below it depending on its position.
  const tags = [
    {
      show: settings.showBadgeIcon,
      showText: settings.showBadgeText,
      icon: settings.badgeIcon,
      label: settings.badgeLabel,
      position: settings.badgePosition,
      layout: "primary" as const,
    },
    {
      show: settings.showTag2Icon,
      showText: settings.showTag2Text,
      icon: settings.tag2Icon,
      label: settings.tag2Label,
      position: settings.tag2Position,
      layout: "secondary" as const,
    },
  ].filter((t) => t.show || t.showText);

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
          className="relative mx-auto flex w-full max-w-md flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top tags — above the card, with proper spacing */}
          {(() => {
            const topTags = tags.filter((t) => t.position.startsWith("top"));
            if (topTags.length === 0) return null;
            return (
              <>
                {renderTagsRow(tags, "top")}
                <div className="mb-4" />
              </>
            );
          })()}

          <div className="relative">
          {/* Soft refracted glow under the card */}
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 bg-black/30 blur-xl"
            style={{
              borderRadius: `${Math.max(8, settings.cardRadius + 4)}px`,
            }}
          />

          <GlassCard radius={settings.cardRadius} style={settings.glassStyle}>

            {/* Card content — tight padding, text breathes from the edge */}
            <div className="relative px-3.5 py-4">
              <h1
                className="text-white"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.020em",
                  fontWeight: 600,
                }}
              >
                {initial.title || "Без названия"}
              </h1>

              {hasBody && (
                <div
                  className="doc-render mt-1 break-words"
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.55,
                    letterSpacing: "-0.002em",
                    fontWeight: 400,
                    color: settings.bodyColor,
                    textAlign: settings.bodyAlign,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: renderDocToHTML(plainTextToDoc(initial.body)),
                  }}
                />
              )}

              {total > 0 && (
                <section className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      <IconList className="h-3.5 w-3.5" />
                      <span>Задачи</span>
                    </div>
                    <span className="text-[12px] text-white/55">
                      {done} из {total}
                    </span>
                  </div>

                  <div className="mb-2 h-px w-full overflow-hidden bg-white/10">
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
                            className="group flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
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
                              className={`flex-1 break-words text-[14px] leading-snug text-white ${
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
          </GlassCard>

          {/* Bottom tags — below the card, with proper spacing */}
          {(() => {
            const bottomTags = tags.filter((t) => t.position.startsWith("bottom"));
            if (bottomTags.length === 0) return null;
            return (
              <>
                <div className="mt-4" />
                {renderTagsRow(tags, "bottom")}
              </>
            );
          })()}

          {settings.viewDateEnabled && (
            <div className="mt-2 text-center text-[10.5px] uppercase tracking-[0.2em] text-white/40">
              <DateFooter createdAt={initial.createdAt} />
            </div>
          )}
          </div>
        </div>
      </main>
    </AppBackground>
  );
}

type TagInfo = {
  show: boolean;
  showText: boolean;
  icon: any;
  label: string;
  position: string;
  layout: "primary" | "secondary";
};

function renderTagsRow(tags: TagInfo[], side: "top" | "bottom") {
  const filtered = tags.filter(
    (t) => t.position.startsWith(side) && (t.show || t.showText)
  );
  if (filtered.length === 0) return null;

  // Group tags by side (left/right). Each side's pill is its own flex
  // container — no stretching (no flex-1), so the pill only takes the
  // space it needs. Two tags on the same side flow horizontally.
  const leftTags = filtered.filter((t) => t.position.endsWith("left"));
  const rightTags = filtered.filter((t) => t.position.endsWith("right"));

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      {/* Left side */}
      {leftTags.length > 0 && (
        <div className="flex flex-nowrap items-center gap-2 justify-start">
          {leftTags.map((t) => (
            <TagPill key={t.layout} tag={t} />
          ))}
        </div>
      )}
      {/* Right side */}
      {rightTags.length > 0 && (
        <div className="flex flex-nowrap items-center gap-2 justify-end">
          {rightTags.map((t) => (
            <TagPill key={t.layout} tag={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function TagPill({ tag }: { tag: TagInfo }) {
  return (
    <div
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/90 whitespace-nowrap"
      style={badgeGlass(useSettings().settings.glassStyle)}
    >
      {tag.show && <BadgeIcon name={tag.icon} className="h-3 w-3" />}
      {tag.showText && <span className="whitespace-nowrap">{tag.label.trim() || "Заметка"}</span>}
    </div>
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

function GlassCard({
  radius,
  style,
  children,
}: {
  radius: number;
  style: "frosted" | "clear" | "smoke";
  children: React.ReactNode;
}) {
  // Spec-style: full layered glass card. Used for "clear" (the crystal /
  // premium variant) only. Other styles use the simpler glassStyles().
  if (style === "clear") {
    return (
      <article
        className="glass-card"
        style={{ borderRadius: `${radius}px` }}
      >
        {/* 1. Noise grain overlay — SVG feTurbulence at 0.03 opacity */}
        <div
          aria-hidden
          className="glass-noise-overlay"
          style={{ borderRadius: `${radius}px` }}
        />
        {/* 2. Specular highlight — top band fades to transparent */}
        <div
          aria-hidden
          className="glass-specular"
          style={{ borderRadius: `${radius}px ${radius}px 0 0` }}
        />
        {/* 3. Chromatic edge — vertical prismatic strip on the left */}
        <div aria-hidden className="glass-chromatic-edge" />
        {/* 4. Content */}
        <div className="relative px-3.5 py-4">{children}</div>
      </article>
    );
  }

  const g = glassStyles(style, radius);
  return (
    <article className="relative overflow-hidden" style={g.article}>
      {/* Hairline stroke (inset 1px) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={g.stroke}
      />
      {/* Top hairline — catches the light from above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={g.topHairline}
      />
      {/* Content */}
      <div className="relative px-3.5 py-4">{children}</div>
    </article>
  );
}
