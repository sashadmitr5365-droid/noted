"use client";

import { formatRelative } from "@/lib/notes";
import { useSettings, type BadgePosition } from "@/lib/settings";
import { BadgeIcon } from "./BadgeIcon";

export type NoteListItem = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tasks: { id: number; text: string; done: boolean }[];
};


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
