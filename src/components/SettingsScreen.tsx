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
import { GLASS_STYLES, glassStyles } from "@/lib/glass";
import { BACKGROUNDS, getBackgroundById, composeBackground } from "@/lib/backgrounds";
import NoteCard, { type NoteListItem } from "./NoteCard";
import { BadgeIcon as PreviewIcon } from "./BadgeIcon";

function BadgeIconPreview({ name, className }: { name: NoteBadgeIcon; className?: string }) {
  return <PreviewIcon name={name} className={className} />;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, update, reset } = useSettings();
  const previewBg = getBackgroundById(settings.background);
  const [iconsExpanded, setIconsExpanded] = useState(false);
  const [iconsExpanded2, setIconsExpanded2] = useState(false);
  const visibleIcons = iconsExpanded
    ? NOTE_BADGE_ICONS
    : NOTE_BADGE_ICONS.slice(0, 14);
  const visibleIcons2 = iconsExpanded2
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

          {/* Tag 1 */}
          <TagBlock
            title="Метка 1"
            showIcon={settings.showBadgeIcon}
            setShowIcon={(v) => update({ showBadgeIcon: v })}
            showText={settings.showBadgeText}
            setShowText={(v) => update({ showBadgeText: v })}
            position={settings.badgePosition}
            setPosition={(v) => update({ badgePosition: v })}
            icon={settings.badgeIcon}
            setIcon={(v) => update({ badgeIcon: v })}
            label={settings.badgeLabel}
            setLabel={(v) => update({ badgeLabel: v })}
            iconsExpanded={iconsExpanded}
            setIconsExpanded={setIconsExpanded}
            visibleIcons={visibleIcons}
          />

          {/* Tag 2 */}
          <TagBlock
            title="Метка 2"
            showIcon={settings.showTag2Icon}
            setShowIcon={(v) => update({ showTag2Icon: v })}
            showText={settings.showTag2Text}
            setShowText={(v) => update({ showTag2Text: v })}
            position={settings.tag2Position}
            setPosition={(v) => update({ tag2Position: v })}
            icon={settings.tag2Icon}
            setIcon={(v) => update({ tag2Icon: v })}
            label={settings.tag2Label}
            setLabel={(v) => update({ tag2Label: v })}
            iconsExpanded={iconsExpanded2}
            setIconsExpanded={setIconsExpanded2}
            visibleIcons={visibleIcons2}
          />

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
          <Section title="Стиль стекла карточки">
            <div className="grid grid-cols-3 gap-2">
              {GLASS_STYLES.map((opt) => {
                const active = settings.glassStyle === opt.id;
                const sample = glassStyles(opt.id, 18);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => update({ glassStyle: opt.id })}
                    className={`group flex flex-col items-stretch overflow-hidden rounded-2xl border transition-all ${
                      active
                        ? "border-white bg-white/[0.04] shadow-[0_0_0_2px_rgba(255,255,255,0.18)]"
                        : "border-white/15 bg-white/[0.04] hover:border-white/30"
                    }`}
                  >
                    <div className="relative h-16 overflow-hidden">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: sample.article.background,
                          backdropFilter: sample.article.backdropFilter as string,
                          WebkitBackdropFilter:
                            sample.article.WebkitBackdropFilter as string,
                        }}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[inherit]"
                        style={sample.stroke}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px"
                        style={sample.topHairline}
                      />
                    </div>
                    <div className="flex items-center justify-between bg-black/30 px-2.5 py-1.5 backdrop-blur-md">
                      <span className="text-[12px] font-medium text-white">
                        {opt.label}
                      </span>
                      {active && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
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
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

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

function TagBlock({
  title,
  showIcon,
  setShowIcon,
  showText,
  setShowText,
  position,
  setPosition,
  icon,
  setIcon,
  label,
  setLabel,
  iconsExpanded,
  setIconsExpanded,
  visibleIcons,
}: {
  title: string;
  showIcon: boolean;
  setShowIcon: (v: boolean) => void;
  showText: boolean;
  setShowText: (v: boolean) => void;
  position: string;
  setPosition: (v: any) => void;
  icon: NoteBadgeIcon;
  setIcon: (v: NoteBadgeIcon) => void;
  label: string;
  setLabel: (v: string) => void;
  iconsExpanded: boolean;
  setIconsExpanded: (v: boolean) => void;
  visibleIcons: typeof NOTE_BADGE_ICONS;
}) {
  const show = showIcon || showText;
  return (
    <Section title={title}>
      <div className="flex flex-col gap-3">
        <Toggle
          label="Показывать иконку"
          description="Отображать иконку в метке"
          checked={showIcon}
          onChange={setShowIcon}
        />
        <Toggle
          label="Показывать текст"
          description="Отображать слово рядом с иконкой"
          checked={showText}
          onChange={setShowText}
        />
      </div>

      <SubLabel className="mt-5">Позиция метки</SubLabel>
      <Segmented
        options={BADGE_POSITIONS}
        value={position as any}
        onChange={setPosition}
      />

      {show && (
        <>
          <div className="mt-5 mb-2 flex items-center justify-between">
            <SubLabel className="m-0">Иконка</SubLabel>
            <button
              type="button"
              onClick={() => setIconsExpanded(!iconsExpanded)}
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
            >
              {iconsExpanded
                ? "Свернуть"
                : `Показать все (${NOTE_BADGE_ICONS.length})`}
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {visibleIcons.map((opt) => {
              const active = icon === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIcon(opt.id)}
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
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={24}
            placeholder="Заметка"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14.5px] font-medium text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
          />
        </>
      )}
    </Section>
  );
}
