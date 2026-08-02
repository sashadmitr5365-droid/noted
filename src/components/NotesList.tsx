"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoteCard, { type NoteListItem } from "./NoteCard";
import Confirm from "./Confirm";
import { IconPlus, IconSearch, IconSparkle } from "./icons";
import { formatRelative } from "@/lib/notes";
import { useSettings } from "@/lib/settings";
import { getBackgroundById } from "@/lib/backgrounds";

export default function NotesList({ initialNotes }: { initialNotes: NoteListItem[] }) {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteListItem[]>(initialNotes);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<NoteListItem | null>(null);

  // Sync if server data changes
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tasks.some((t) => t.text.toLowerCase().includes(q))
    );
  }, [notes, query]);

  const stats = useMemo(() => {
    const total = notes.length;
    const totalTasks = notes.reduce((acc, n) => acc + n.tasks.length, 0);
    const doneTasks = notes.reduce(
      (acc, n) => acc + n.tasks.filter((t) => t.done).length,
      0
    );
    return { total, totalTasks, doneTasks };
  }, [notes]);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const target = pendingDelete;
    setPendingDelete(null);
    // Optimistic remove
    setNotes((prev) => prev.filter((n) => n.id !== target.id));
    try {
      await fetch(`/api/notes/${target.id}`, { method: "DELETE" });
      router.refresh();
    } catch {
      // restore on failure
      setNotes((prev) => [target, ...prev]);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar — fully transparent, no darkening */}
      <header className="sticky top-0 z-30 -mt-px border-b border-white/[0.04] px-5 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              <IconSparkle className="h-3.5 w-3.5 text-white/80" />
              <span>Noted</span>
            </div>
            <h1 className="mt-2 text-[32px] font-semibold leading-[1.05] tracking-tight text-white">
              Ваши заметки
            </h1>
            <p className="mt-1.5 text-[13px] text-white/65">
              {stats.total === 0
                ? "Здесь пока пусто"
                : `${stats.total} ${
                    stats.total === 1
                      ? "заметка"
                      : stats.total < 5
                      ? "заметки"
                      : "заметок"
                  } · ${stats.doneTasks}/${stats.totalTasks} задач выполнено`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              aria-label="Настройки"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/75 backdrop-blur-xl transition-all active:scale-95 hover:border-white/25 hover:text-white"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              }}
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
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <Link
              href="/new"
              className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink-950 shadow-[0_8px_24px_-8px_rgba(255,255,255,0.3)] transition-all active:scale-95 hover:bg-white/90"
            >
              <IconPlus className="h-4 w-4" />
              Новая
            </Link>
          </div>
        </div>

        {/* Search */}
        {stats.total > 0 && (
          <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 backdrop-blur-xl transition-colors focus-within:border-white/20 focus-within:bg-white/[0.10]">
            <IconSearch className="h-4 w-4 shrink-0 text-white/55" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по заметкам…"
              className="flex-1 bg-transparent text-[14.5px] text-white placeholder:text-white/40"
            />
          </div>
        )}
      </header>

      {/* List */}
      <main className="flex-1 px-5 pt-4 pb-28">
        {stats.total === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="mt-16 text-center text-sm text-white/55">
            По запросу «{query}» ничего не найдено
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {filtered.map((note, i) => (
              <li key={note.id}>
                <NoteCard
                  note={note}
                  index={i}
                  onOpen={() => router.push(`/note/${note.id}`)}
                  onDelete={() => setPendingDelete(note)}
                />
              </li>
            ))}
          </ul>
        )}

        {stats.total > 0 && (
          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.14em] text-white/45">
            Долгое нажатие на карточку — удалить
          </p>
        )}
      </main>

      {/* Floating action button */}
      {stats.total > 0 && (
        <Link
          href="/new"
          aria-label="Создать заметку"
          className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink-950 shadow-[0_18px_40px_-8px_rgba(255,255,255,0.4)] transition-transform active:scale-95 hover:scale-105"
        >
          <IconPlus className="h-6 w-6" />
        </Link>
      )}

      <Confirm
        open={Boolean(pendingDelete)}
        title="Удалить заметку?"
        description={
          pendingDelete
            ? `«${pendingDelete.title || "Без названия"}» будет удалена без возможности восстановления.`
            : undefined
        }
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/[0.10] bg-white/[0.05] backdrop-blur-xl">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-[28px] bg-white/10 blur-2xl"
        />
        <IconSparkle className="h-9 w-9 text-white/80" />
      </div>
      <h2 className="mt-5 text-[20px] font-semibold tracking-tight text-white">
        Создайте первую заметку
      </h2>
      <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-white/65">
        Идеи, списки, планы — всё в одном минималистичном пространстве.
      </p>
      <Link
        href="/new"
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink-950 shadow-[0_10px_28px_-8px_rgba(255,255,255,0.3)] transition-transform active:scale-95 hover:bg-white/90"
      >
        <IconPlus className="h-4 w-4" />
        Создать заметку
      </Link>
    </div>
  );
}
