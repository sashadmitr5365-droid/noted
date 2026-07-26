"use client";

import { useEffect } from "react";
import { IconClose, IconTrash } from "./icons";

export default function Confirm({
  open,
  title,
  description,
  confirmLabel = "Удалить",
  cancelLabel = "Отмена",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />
      <div className="relative w-full max-w-sm animate-fade-up overflow-hidden rounded-[28px] border border-white/15 bg-ink-900/85 p-6 shadow-2xl backdrop-blur-2xl">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-200 transition-colors hover:bg-white/5"
          aria-label="Закрыть"
        >
          <IconClose className="h-4 w-4" />
        </button>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <IconTrash className="h-5 w-5" />
        </div>
        <h3 className="text-[19px] font-semibold tracking-tight text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-white/70">
            {description}
          </p>
        )}
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition-colors active:scale-[0.98] hover:bg-white/[0.12]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-red-500/90 px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.6)] transition-colors active:scale-[0.98] hover:bg-red-500"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
