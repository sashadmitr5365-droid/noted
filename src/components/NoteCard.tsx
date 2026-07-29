"use client";

import { formatRelative } from "@/lib/notes";
import { useSettings, type BadgePosition } from "@/lib/settings";
import { BadgeIcon } from "./BadgeIcon";
import { badgeGlass } from "@/lib/glass";

export type NoteTag = {
  icon: string;
  label: string;
  position: string;
};

export type NoteListItem = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tasks: { id: number; text: string; done: boolean }[];
  tag1?: NoteTag | null;
  tag2?: NoteTag | null;
};

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function parsePos(pos?: string | null): Corner {
  if (
    pos === "top-left" ||
    pos === "top-right" ||
    pos === "bottom-left" ||
    pos === "bottom-right"
  ) {
    return pos;
  }
  return "top-right";
}

function cornerClasses(corner: Corner) {
  const v = corner.startsWith("top") ? "top-2" : "bottom-2";
  const h = corner.endsWith("right") ? "right-2" : "left-2";
  return `${v} ${h}`;
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

  const tags: NoteTag[] = [];
  if (note.tag1 && note.tag1.label && note.tag1.label.trim()) tags.push(note.tag1);
  if (note.tag2 && note.tag2.label && note.tag2.label.trim()) tags.push(note.tag2);

  // Reserve right/left/top/bottom space only when a tag is on that edge.
  const tag1Corner = parsePos(tags[0]?.position);
  const tag2Corner = tags[1] ? parsePos(tags[1].position) : null;
  const sameCorner = tag2Corner && tag2Corner === tag1Corner;

  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete();
      }}
      style={{ borderRadius: `${radius}px` }}
      className="group relative w-full overflow-hidden border border-white/[0.07] bg-white/[0.035] text-left shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_18px_30px_-22px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-200 active:scale-[0.985] hover:border-white/[0.13] hover:bg-white/[0.06] animate-fade-up"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-white/[0.03]"
        style={{ borderRadius: `${radius}px` }}
      />

      {/* Tags — up to 2, positioned independently or stacked in the same corner */}
      {tags[0] && !sameCorner && (
        <TagPill tag={tags[0]} corner={tag1Corner} glassStyle={settings.glassStyle} />
      )}
      {tags[1] && !sameCorner && tag2Corner && (
        <TagPill tag={tags[1]} corner={tag2Corner} glassStyle={settings.glassStyle} />
      )}
      {tags[0] && tags[1] && sameCorner && (
        <>
          <TagPill tag={tags[0]} corner={tag1Corner} glassStyle={settings.glassStyle} layout="primary" />
          <TagPill tag={tags[1]} corner={tag1Corner} glassStyle={settings.glassStyle} layout="secondary" />
        </>
      )}

      <div
        className="relative px-3.5 py-3.5"
      >
        <h3
          className="truncate text-white"
          style={{
            fontSize: "15.5px",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            fontWeight: 600,
          }}
        >
          {note.title || "Без названия"}
        </h3>

        {hasBody && (
          <p
            className="mt-1 line-clamp-2"
            style={{
              fontSize: "12.5px",
              lineHeight: 1.5,
              letterSpacing: "-0.003em",
              color: settings.bodyColor,
            }}
          >
            {preview}
          </p>
        )}

        {!hasBody && hasTasks && (
          <p
            className="mt-1"
            style={{
              fontSize: "12.5px",
              lineHeight: 1.5,
              color: settings.bodyColor,
            }}
          >
            {doneTasks} из {totalTasks} выполнено
          </p>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-white/40">
          <span>{formatRelative(note.updatedAt)}</span>
          {hasTasks && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>
                {doneTasks}/{totalTasks}
              </span>
            </>
          )}
        </div>

        {hasTasks && (
          <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-white/80 transition-all duration-500"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
        )}
      </div>

      {settings.showCreatedDate && !tag1Corner.startsWith("bottom") && !tag2Corner?.startsWith("bottom") && (
        <div className="border-t border-white/[0.05] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/35">
          Создано {formatRelative(note.createdAt)}
        </div>
      )}
    </button>
  );
}

function TagPill({
  tag,
  corner,
  glassStyle,
  layout = "solo",
}: {
  tag: NoteTag;
  corner: Corner;
  glassStyle: "frosted" | "clear" | "smoke";
  layout?: "solo" | "primary" | "secondary";
}) {
  const baseClasses = `flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/90 ${cornerClasses(corner)}`;
  const position =
    layout === "primary"
      ? cornerClasses(corner)
      : layout === "secondary"
      ? // 16px to the left or right of the primary tag
        corner.endsWith("right")
        ? `${corner.startsWith("top") ? "top-2" : "bottom-2"} right-[6.5rem]`
        : `${corner.startsWith("top") ? "top-2" : "bottom-2"} left-[6.5rem]`
      : "";
  return (
    <div
      className={`absolute z-10 ${baseClasses} ${position}`}
      style={badgeGlass(glassStyle)}
    >
      <BadgeIcon name={tag.icon as any} className="h-3 w-3" />
      <span>{tag.label}</span>
    </div>
  );
}
