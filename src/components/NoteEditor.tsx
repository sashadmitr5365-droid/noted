"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconCheck,
  IconList,
  IconPlus,
  IconTrash,
} from "./icons";
import {
  type Doc,
  type DocBlock,
  type Pos,
  type TextBlock,
  type InlineSegment,
  emptyDoc,
  plainTextToDoc,
  docToPlainText,
  insertChar,
  backspace,
  toggleFlag,
  applyColor,
  setBlockType,
  setListType,
  insertDivider,
  insertCodeBlock,
  insertLink,
} from "@/lib/editor";
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
  const [doc, setDoc] = useState<Doc>(() => {
    if (!initial.body) return emptyDoc();
    return plainTextToDoc(initial.body);
  });
  const [pos, setPos] = useState<Pos>({ block: 0, offset: 0 });
  const [taskList, setTaskList] = useState<NoteEditorTask[]>(initial.tasks);
  const [newTask, setNewTask] = useState("");
  const [saving, startSave] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const inputRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});

  function focusBlock(blockIdx: number) {
    requestAnimationFrame(() => {
      const el = inputRefs.current[blockIdx];
      el?.focus();
      el?.setSelectionRange(pos.offset, pos.offset);
    });
  }

  function update(next: { doc: Doc; pos: Pos }) {
    setDoc(next.doc);
    setPos(next.pos);
    focusBlock(next.pos.block);
  }

  function applyInput(blockIdx: number, value: string) {
    // User typed into a textarea — recompute the doc by re-syncing the current block
    // and treating the value as the new plain text for this block. We keep formatting
    // of existing segments by replacing text within the leading segment.
    setDoc((prev) => {
      const d = { ...prev, blocks: prev.blocks.map((b) => ({ ...b })) };
      const b = d.blocks[blockIdx];
      if (!b) return prev;
      if (b.type === "code") {
        b.text = value;
        setPos({ block: blockIdx, offset: value.length });
        return d;
      }
      if (b.type === "divider") {
        // Treat typing on a divider as adding a new paragraph after it
        d.blocks.splice(blockIdx + 1, 0, {
          type: "p",
          segments: [{ text: value }],
        });
        setPos({ block: blockIdx + 1, offset: value.length });
        return d;
      }
      // Text block — collapse all segments into one (or keep the first segment's flags)
      const firstSeg = b.segments[0] ?? { text: "" };
      const restFlags = Object.fromEntries(
        Object.entries(firstSeg).filter(([k]) => k !== "text" && k !== "href")
      );
      b.segments = [{ text: value, ...restFlags }];
      setPos({ block: blockIdx, offset: value.length });
      return d;
    });
  }

  function handleKey(blockIdx: number, e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const ta = e.currentTarget;
    const start = ta.selectionStart ?? 0;
    const end = ta.selectionEnd ?? 0;
    setPos({ block: blockIdx, offset: start });

    if (e.key === "Backspace" && start === 0 && end === 0) {
      e.preventDefault();
      update(backspace(doc, { block: blockIdx, offset: 0 }));
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      update(insertChar(doc, { block: blockIdx, offset: start }, "\n"));
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        // Convert to paragraph
        update(setBlockType(doc, { block: blockIdx, offset: start }, "p"));
      } else {
        // Indent / cycle list
        update(
          setListType(doc, { block: blockIdx, offset: start }, "ul")
        );
      }
      return;
    }
  }

  function activeFlags(): {
    bold: boolean;
    italic: boolean;
    strike: boolean;
    underline: boolean;
    highlight: boolean;
    color: string | undefined;
  } {
    const b = doc.blocks[pos.block];
    if (!b || b.type === "code" || b.type === "divider") {
      return { bold: false, italic: false, strike: false, underline: false, highlight: false, color: undefined };
    }
    const segs = b.segments;
    let acc = 0;
    let segIdx = 0;
    for (let i = 0; i < segs.length; i++) {
      if (pos.offset <= acc + segs[i].text.length) {
        segIdx = i;
        break;
      }
      acc += segs[i].text.length;
      segIdx = i;
    }
    const seg = segs[segIdx];
    return {
      bold: !!seg?.bold,
      italic: !!seg?.italic,
      strike: !!seg?.strike,
      underline: !!seg?.underline,
      highlight: !!seg?.highlight,
      color: seg?.color,
    };
  }

  function blockText(b: DocBlock): string {
    if (b.type === "code") return b.text;
    if (b.type === "divider") return "";
    return b.segments.map((s) => s.text).join("");
  }

  function blockClass(b: TextBlock): string {
    switch (b.type) {
      case "h1":
        return "t-h1 text-white";
      case "h2":
        return "t-h2 text-white";
      case "h3":
        return "text-[16px] font-semibold text-white";
      case "quote":
        return "t-body italic text-white/75";
      case "ul":
      case "ol":
      case "task":
        return "t-body text-white/90";
      default:
        return "t-body text-white/90";
    }
  }

  function blockStyle(b: TextBlock): React.CSSProperties {
    const seg = b.segments.find((s) => s.text.length > 0) ?? b.segments[0];
    if (!seg) return {};
    const style: React.CSSProperties = {};
    if (seg.color) style.color = seg.color;
    return style;
  }

  function renderBlock(idx: number, b: DocBlock) {
    const isActive = pos.block === idx;
    if (b.type === "divider") {
      return (
        <div
          key={idx}
          onClick={() => {
            setPos({ block: idx, offset: 0 });
            setDoc((prev) => {
              const d = { ...prev, blocks: prev.blocks.slice() };
              d.blocks.splice(idx + 1, 0, { type: "p", segments: [{ text: "" }] });
              return d;
            });
            setPos({ block: idx + 1, offset: 0 });
            focusBlock(idx + 1);
          }}
          className="my-3 cursor-text"
        >
          <hr className="border-t border-white/15" />
        </div>
      );
    }
    if (b.type === "code") {
      return (
        <textarea
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          defaultValue={b.text}
          onFocus={() => setPos({ block: idx, offset: b.text.length })}
          onClick={(e) =>
            setPos({ block: idx, offset: e.currentTarget.selectionStart ?? 0 })
          }
          onKeyUp={(e) =>
            setPos({ block: idx, offset: e.currentTarget.selectionStart ?? 0 })
          }
          onInput={(e) => applyInput(idx, e.currentTarget.value)}
          onKeyDown={(e) => handleKey(idx, e)}
          placeholder="код"
          spellCheck={false}
          rows={3}
          className="mt-3 block w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-3 font-mono text-[13.5px] text-white/85 placeholder:text-white/30 focus:border-white/25 focus:outline-none"
        />
      );
    }
    const text = blockText(b);
    const prefix =
      b.type === "ul"
        ? "• "
        : b.type === "ol"
        ? "1. "
        : b.type === "task"
        ? b.done
          ? "✓ "
          : "○ "
        : "";

    return (
      <div key={idx} className="relative">
        {isActive && b.type === "task" && (
          <button
            type="button"
            onClick={() => {
              setDoc((prev) => {
                const d = { ...prev, blocks: prev.blocks.slice() };
                const cur = d.blocks[idx];
                if (cur.type === "task") cur.done = !cur.done;
                return d;
              });
            }}
            className="absolute -left-7 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-white/70 hover:border-white/60"
            aria-label="Отметить задачу"
          >
            {b.done ? "✓" : ""}
          </button>
        )}
        <textarea
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          defaultValue={text}
          onFocus={() => setPos({ block: idx, offset: text.length })}
          onClick={(e) =>
            setPos({ block: idx, offset: e.currentTarget.selectionStart ?? 0 })
          }
          onKeyUp={(e) =>
            setPos({ block: idx, offset: e.currentTarget.selectionStart ?? 0 })
          }
          onInput={(e) => applyInput(idx, e.currentTarget.value)}
          onKeyDown={(e) => handleKey(idx, e)}
          rows={1}
          placeholder={
            b.type === "p" && idx === 0
              ? "Начните писать…"
              : b.type === "h1"
              ? "Заголовок"
              : b.type === "h2"
              ? "Подзаголовок"
              : b.type === "h3"
              ? "Под-подзаголовок"
              : b.type === "quote"
              ? "Цитата"
              : b.type === "ul"
              ? "Элемент списка"
              : b.type === "ol"
              ? "Элемент нумерации"
              : b.type === "task"
              ? "Задача"
              : ""
          }
          className={`block w-full resize-none overflow-hidden border-none bg-transparent leading-relaxed placeholder:text-white/30 focus:outline-none ${
            prefix ? "pl-6 " : ""
          } ${blockClass(b)}`}
          style={blockStyle(b)}
        />
        {prefix && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 select-none text-white/40"
          >
            {prefix}
          </span>
        )}
      </div>
    );
  }

  // ===== Toolbar actions =====
  function applyFlag(
    flag: "bold" | "italic" | "strike" | "underline" | "highlight" | "code"
  ) {
    update(toggleFlag(doc, pos, flag));
  }
  function applyBlockType(t: "p" | "h1" | "h2" | "h3" | "quote") {
    update(setBlockType(doc, pos, t));
  }
  function applyList(t: "ul" | "ol" | "task") {
    update(setListType(doc, pos, t));
  }
  function applyColorClick(c: string) {
    update(applyColor(doc, pos, c));
    setShowColorPicker(false);
  }
  function applyLinkClick() {
    const url = prompt("URL:", "https://");
    if (!url) return;
    update(insertLink(doc, pos, url));
  }
  function applyDividerClick() {
    update(insertDivider(doc, pos));
  }
  function applyCodeBlockClick() {
    update(insertCodeBlock(doc, pos));
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
        const bodyString = docToPlainText(doc);
        const payload = {
          title: title.trim(),
          body: bodyString,
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
  const flags = activeFlags();
  const currentBlock = doc.blocks[pos.block];
  const currentBlockType = currentBlock?.type ?? "p";

  return (
    <div className="flex min-h-screen flex-col">
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          rows={1}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = `${t.scrollHeight}px`;
          }}
          className="t-h1 block w-full resize-none overflow-hidden bg-transparent text-white placeholder:text-white/40"
        />

        <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse-dot" />
          <span>{isEdit ? "Редактирование" : "Новая заметка"}</span>
        </div>

        {/* Body — list of block editors */}
        <div className="mt-6 space-y-1">
          {doc.blocks.map((b, i) => renderBlock(i, b))}
        </div>

        {/* Formatting toolbar */}
        <div className="mt-3 overflow-hidden rounded-[20px] border border-white/[0.10] bg-white/[0.04] p-1.5 backdrop-blur-xl">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <ToolButton onClick={() => applyBlockType("h1")} label="H1" active={currentBlockType === "h1"} wide>
              <span className="text-[14px] font-bold leading-none">H1</span>
            </ToolButton>
            <ToolButton onClick={() => applyBlockType("h2")} label="H2" active={currentBlockType === "h2"} wide>
              <span className="text-[13px] font-bold leading-none">H2</span>
            </ToolButton>
            <ToolButton onClick={() => applyBlockType("h3")} label="H3" active={currentBlockType === "h3"} wide>
              <span className="text-[13px] font-bold leading-none">H3</span>
            </ToolButton>
            <Divider />
            <ToolButton onClick={() => applyFlag("bold")} label="Жирный" active={flags.bold}>
              <span className="text-[16px] font-bold leading-none">B</span>
            </ToolButton>
            <ToolButton onClick={() => applyFlag("italic")} label="Курсив" active={flags.italic}>
              <span className="text-[16px] italic leading-none">I</span>
            </ToolButton>
            <ToolButton onClick={() => applyFlag("underline")} label="Подчёркнутый" active={flags.underline}>
              <span className="text-[16px] underline leading-none underline-offset-2">U</span>
            </ToolButton>
            <ToolButton onClick={() => applyFlag("strike")} label="Зачёркнутый" active={flags.strike}>
              <span className="text-[16px] leading-none line-through">S</span>
            </ToolButton>
            <ToolButton onClick={() => applyFlag("highlight")} label="Выделение" active={flags.highlight}>
              <span className="rounded-sm bg-yellow-400/30 px-1 text-[15px] leading-none">A</span>
            </ToolButton>
            <Divider />
            <ToolButton onClick={() => applyList("ul")} label="Список" active={currentBlockType === "ul"}>
              <span className="text-[16px] leading-none">•</span>
            </ToolButton>
            <ToolButton onClick={() => applyList("ol")} label="Нумерация" active={currentBlockType === "ol"}>
              <span className="text-[12px] font-semibold leading-none">1.</span>
            </ToolButton>
            <ToolButton onClick={() => applyList("task")} label="Чек-лист" active={currentBlockType === "task"}>
              <span className="text-[14px] leading-none">○</span>
            </ToolButton>
            <ToolButton onClick={() => applyBlockType("quote")} label="Цитата" active={currentBlockType === "quote"}>
              <span className="text-[15px] leading-none">”</span>
            </ToolButton>
            <ToolButton onClick={applyCodeBlockClick} label="Блок кода" active={currentBlockType === "code"}>
              <span className="font-mono text-[12px] leading-none">{"```"}</span>
            </ToolButton>
            <ToolButton onClick={applyDividerClick} label="Разделитель">
              <span className="text-[16px] leading-none">—</span>
            </ToolButton>
            <ToolButton onClick={applyLinkClick} label="Ссылка">
              <span className="text-[15px] leading-none">🔗</span>
            </ToolButton>
            <Divider />
            <ToolButton
              onClick={() => setShowColorPicker((v) => !v)}
              label="Цвет"
              active={showColorPicker}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-amber-300 to-sky-400" />
            </ToolButton>
          </div>
          {showColorPicker && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] px-2 pt-2">
              {BODY_COLOR_PRESETS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => applyColorClick(c.value)}
                  className="h-6 w-6 rounded-full border border-white/15 transition-transform active:scale-95 hover:scale-110"
                  style={{
                    background: c.value,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}
                  aria-label={c.label}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tasks section */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/85">
              <IconList className="h-4 w-4" />
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em]">
                Задачи
              </h2>
            </div>
            {total > 0 && (
              <span className="text-[11px] text-white/55">
                {completed} из {total} готово
              </span>
            )}
          </div>

          <div className="rounded-[24px] border border-white/[0.10] bg-white/[0.04] p-2 backdrop-blur-xl">
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

function ToolButton({
  onClick,
  label,
  children,
  active,
  wide,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  active?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex shrink-0 items-center justify-center rounded-xl border text-white transition-all active:scale-95 ${
        wide ? "min-w-[44px] px-3" : "h-10 w-10"
      } ${
        active
          ? "border-white/40 bg-white/[0.16] text-white"
          : "border-transparent text-white/70 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px shrink-0 bg-white/[0.08]" />;
}
