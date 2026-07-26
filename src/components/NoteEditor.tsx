"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconCheck,
  IconList,
  IconPlus,
  IconTrash,
} from "./icons";
import { BODY_COLOR_PRESETS } from "@/lib/settings";

export type NoteEditorTask = {
  id?: number;
  text: string;
  done: boolean;
};

export type NoteEditorInitial = {
  id?: number;
  title: string;
  body: string;
  tasks: NoteEditorTask[];
};

export default function NoteEditor({
  initial,
}: {
  initial: NoteEditorInitial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);
  const [taskList, setTaskList] = useState<NoteEditorTask[]>(initial.tasks);
  const [newTask, setNewTask] = useState("");
  const [saving, startSave] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  // ===== Auto-grow for textareas =====
  function autoGrow(el: HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  // ===== Tasks =====
  function addTask() {
    const text = newTask.trim();
    if (!text) return;
    setTaskList((prev) => [...prev, { text, done: false }]);
    setNewTask("");
  }
  function toggleTask(idx: number) {
    setTaskList((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t))
    );
  }
  function updateTaskText(idx: number, text: string) {
    setTaskList((prev) => prev.map((t, i) => (i === idx ? { ...t, text } : t)));
  }
  function removeTask(idx: number) {
    setTaskList((prev) => prev.filter((_, i) => i !== idx));
  }

  // ===== Save =====
  function handleSave() {
    if (!title.trim()) return;
    setError(null);
    startSave(async () => {
      try {
        const payload = {
          title: title.trim(),
          body: body.trim(),
          tasks: taskList
            .filter((t) => t.text.trim().length > 0)
            .map((t, i) => ({ ...t, position: i })),
        };
        const url = initial.id ? `/api/notes/${initial.id}` : "/api/notes";
        const method = initial.id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("save_failed");
        router.push("/");
        router.refresh();
      } catch {
        setError("Не удалось сохранить заметку");
      }
    });
  }

  const canSave = title.trim().length > 0 && !saving;
  const isEdit = Boolean(initial.id);
  const canPreview = isEdit && title.trim().length > 0;
  const completed = taskList.filter((t) => t.done).length;
  const total = taskList.length;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top app bar */}
      <header className="sticky top-0 z-30 -mt-px flex items-center justify-between border-b border-white/[0.04] px-4 py-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors active:scale-95 hover:bg-white/10"
          aria-label="Назад"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {canPreview && (
            <Link
              href={`/note/${initial.id}/view`}
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white transition-colors active:scale-95 hover:bg-white/[0.08]"
            >
              Посмотреть
            </Link>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink-950 shadow-[0_8px_20px_-6px_rgba(255,255,255,0.25)] transition-all active:scale-95 disabled:opacity-40"
          >
            <IconCheck className="h-4 w-4" />
            {saving ? "Сохранение…" : "Сохранить"}
          </button>
        </div>
      </header>

      <div className="flex-1 px-5 pt-6 pb-32">
        {/* Title */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            autoGrow(e.target);
          }}
          placeholder="Заголовок"
          rows={1}
          onInput={(e) => autoGrow(e.currentTarget)}
          className="t-h1 block w-full resize-none overflow-hidden border-none bg-transparent text-white placeholder:text-white/30 focus:outline-none"
          style={{ fieldSizing: "content" as React.CSSProperties["fieldSizing"] }}
        />

        <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{isEdit ? "Редактирование" : "Новая заметка"}</span>
        </div>

        {/* Body — single large textarea, full width, no toolbar */}
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            autoGrow(e.target);
          }}
          onInput={(e) => autoGrow(e.currentTarget)}
          placeholder="Начните писать..."
          rows={10}
          className="t-body mt-6 block w-full resize-none border-none bg-transparent leading-relaxed text-white placeholder:text-white/30 focus:outline-none"
          style={{
            minHeight: "240px",
            fieldSizing: "content" as React.CSSProperties["fieldSizing"],
          }}
        />

        {/* Tasks section */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/85">
              <IconList className="h-4 w-4" />
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em]">
                Задачи
              </h2>
            </div>
            {total > 0 && (
              <span className="text-[11px] text-white/55">
                {completed} из {total} готово
              </span>
            )}
          </div>

          <div className="rounded-[20px] border border-white/[0.10] bg-white/[0.04] p-2 backdrop-blur-xl">
            {taskList.length === 0 && (
              <p className="px-3 py-3 text-sm text-white/50">
                Список пуст. Добавьте первую задачу ниже.
              </p>
            )}
            <ul className="flex flex-col">
              {taskList.map((task, idx) => (
                <li
                  key={idx}
                  className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(idx)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      task.done
                        ? "border-white bg-white text-ink-950"
                        : "border-white/35 bg-transparent text-transparent hover:border-white/60"
                    }`}
                    aria-label={task.done ? "Отметить невыполненной" : "Отметить выполненной"}
                  >
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => updateTaskText(idx, e.target.value)}
                    placeholder="Текст задачи"
                    className={`flex-1 bg-transparent text-[15px] leading-snug text-white placeholder:text-white/30 ${
                      task.done ? "text-white/50 line-through" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTask(idx)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 group-hover:opacity-100"
                    aria-label="Удалить задачу"
                  >
                    <IconTrash className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-1 flex items-center gap-2 rounded-2xl border border-dashed border-white/15 px-3 py-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/60">
                <IconPlus className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTask();
                  }
                }}
                placeholder="Новая задача…"
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/30"
              />
              {newTask.trim() && (
                <button
                  type="button"
                  onClick={addTask}
                  className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white transition-colors hover:bg-white/15"
                >
                  Добавить
                </button>
              )}
            </div>
          </div>
        </section>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
