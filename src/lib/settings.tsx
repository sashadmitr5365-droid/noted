"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BACKGROUNDS,
  DEFAULT_BACKGROUND,
  type BackgroundId,
} from "./backgrounds";

export type NoteBadgeIcon =
  | "sparkle"
  | "note"
  | "list"
  | "star"
  | "bolt"
  | "moon"
  | "sun"
  | "leaf"
  | "flame"
  | "diamond"
  | "heart"
  | "pin"
  | "bookmark"
  | "tag"
  | "flag"
  | "book"
  | "pen"
  | "rocket"
  | "ghost"
  | "music"
  | "compass"
  | "key"
  | "fire"
  | "cloud"
  | "code"
  | "palette"
  | "coffee"
  | "target"
  | "shield"
  | "globe"
  | "camera"
  | "gift"
  | "trophy"
  | "umbrella"
  | "anchor"
  | "tree"
  | "lightning"
  | "drop"
  | "mountain"
  | "wave"
  | "bell"
  | "clock"
  | "calendar"
  | "map"
  | "lock"
  | "unlock"
  | "search"
  | "send"
  | "mic"
  | "film"
  | "headphones"
  | "zap"
  | "feather"
  | "crown";

export const NOTE_BADGE_ICONS: { id: NoteBadgeIcon; label: string }[] = [
  { id: "sparkle", label: "Искра" },
  { id: "note", label: "Заметка" },
  { id: "list", label: "Список" },
  { id: "star", label: "Звезда" },
  { id: "bolt", label: "Молния" },
  { id: "moon", label: "Луна" },
  { id: "sun", label: "Солнце" },
  { id: "leaf", label: "Лист" },
  { id: "flame", label: "Пламя" },
  { id: "diamond", label: "Кристалл" },
  { id: "heart", label: "Сердце" },
  { id: "pin", label: "Закреп" },
  { id: "bookmark", label: "Закладка" },
  { id: "tag", label: "Тег" },
  { id: "flag", label: "Флаг" },
  { id: "book", label: "Книга" },
  { id: "pen", label: "Перо" },
  { id: "rocket", label: "Ракета" },
  { id: "ghost", label: "Дух" },
  { id: "music", label: "Музыка" },
  { id: "compass", label: "Компас" },
  { id: "key", label: "Ключ" },
  { id: "fire", label: "Огонь" },
  { id: "cloud", label: "Облако" },
  { id: "code", label: "Код" },
  { id: "palette", label: "Палитра" },
  { id: "coffee", label: "Кофе" },
  { id: "target", label: "Цель" },
  { id: "shield", label: "Щит" },
  { id: "globe", label: "Глобус" },
  { id: "camera", label: "Камера" },
  { id: "gift", label: "Подарок" },
  { id: "trophy", label: "Кубок" },
  { id: "umbrella", label: "Зонт" },
  { id: "anchor", label: "Якорь" },
  { id: "tree", label: "Дерево" },
  { id: "lightning", label: "Разряд" },
  { id: "drop", label: "Капля" },
  { id: "mountain", label: "Гора" },
  { id: "wave", label: "Волна" },
  { id: "bell", label: "Колокол" },
  { id: "clock", label: "Часы" },
  { id: "calendar", label: "Календарь" },
  { id: "map", label: "Карта" },
  { id: "lock", label: "Замок" },
  { id: "unlock", label: "Открыто" },
  { id: "search", label: "Поиск" },
  { id: "send", label: "Отправить" },
  { id: "mic", label: "Микрофон" },
  { id: "film", label: "Плёнка" },
  { id: "headphones", label: "Наушники" },
  { id: "zap", label: "Энергия" },
  { id: "feather", label: "Перо" },
  { id: "crown", label: "Корона" },
];

export type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export const BADGE_POSITIONS: { id: BadgePosition; label: string }[] = [
  { id: "top-right", label: "Сверху справа" },
  { id: "top-left", label: "Сверху слева" },
  { id: "bottom-right", label: "Снизу справа" },
  { id: "bottom-left", label: "Снизу слева" },
];

export type Settings = {
  background: BackgroundId;
  // Card appearance
  cardRadius: number; // 0..40 px
  // Badge — on the list card. Each part can be shown/hidden separately.
  showBadgeIcon: boolean;
  showBadgeText: boolean;
  badgeIcon: NoteBadgeIcon;
  badgeLabel: string; // user-defined text
  badgePosition: BadgePosition;
  // Card footer (list card)
  showCreatedDate: boolean;
  // View screen (full-screen glass card)
  viewCardPosition: "top" | "center";
  // Date format on the view screen — composed from "Создано + day + month + year"
  viewDateEnabled: boolean; // show the date row at all
  viewDateShowLabel: boolean; // show the word "Создано"
  viewDateShowDay: boolean; // show day number (e.g. "15")
  viewDateShowMonth: boolean; // show month name (e.g. "марта")
  viewDateShowYear: boolean; // show year (e.g. "2025")
  // Typography
  fontSize: "small" | "medium" | "large";
  // Body / description text color
  bodyColor: string; // hex or rgba
  // Body text alignment
  bodyAlign: "left" | "center" | "right";
};

const STORAGE_KEY = "noted:settings:v2";

export const DEFAULT_SETTINGS: Settings = {
  background: DEFAULT_BACKGROUND,
  cardRadius: 22,
  showBadgeIcon: true,
  showBadgeText: true,
  badgeIcon: "sparkle",
  badgeLabel: "Заметка",
  badgePosition: "top-right",
  showCreatedDate: true,
  viewCardPosition: "center",
  viewDateEnabled: true,
  viewDateShowLabel: true,
  viewDateShowDay: true,
  viewDateShowMonth: true,
  viewDateShowYear: true,
  fontSize: "medium",
  bodyColor: "#d4d4dc",
  bodyAlign: "left",
};

export const BODY_COLOR_PRESETS: { id: string; label: string; value: string }[] = [
  { id: "white", label: "Белый", value: "#ececf3" },
  { id: "soft", label: "Мягкий", value: "#d4d4dc" },
  { id: "warm", label: "Тёплый", value: "#e8d9b8" },
  { id: "rose", label: "Розовый", value: "#f4c2c2" },
  { id: "mint", label: "Мятный", value: "#b8e0d2" },
  { id: "sky", label: "Лазурный", value: "#b8d8e8" },
  { id: "lavender", label: "Лавандовый", value: "#d4c2e8" },
  { id: "peach", label: "Персик", value: "#f4d4b8" },
  { id: "gold", label: "Золото", value: "#e8d482" },
  { id: "muted", label: "Приглушённый", value: "#9ca3af" },
];

function readFromStorage(): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      background: BACKGROUNDS.some((b) => b.id === parsed.background)
        ? (parsed.background as BackgroundId)
        : DEFAULT_SETTINGS.background,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

type SettingsContextValue = {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(readFromStorage());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({ settings, update, reset }), [
    settings,
    update,
    reset,
  ]);

  return (
    <SettingsContext.Provider value={value}>
      <div data-hydrated={hydrated ? "true" : "false"} className="contents">
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
