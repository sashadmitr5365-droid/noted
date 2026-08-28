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

export type NoteBadgeIconCategory =
  | "nature"
  | "food"
  | "action"
  | "work"
  | "comm"
  | "vibes";

export const NOTE_BADGE_ICON_CATEGORIES: {
  id: NoteBadgeIconCategory;
  label: string;
}[] = [
  { id: "nature", label: "Природа" },
  { id: "food", label: "Еда и напитки" },
  { id: "action", label: "Движение и спорт" },
  { id: "work", label: "Дело и деньги" },
  { id: "comm", label: "Люди и связь" },
  { id: "vibes", label: "Настроение" },
];

export type NoteBadgeIcon =
  // classic set
  | "sparkle"
  | "note"
  | "list"
  | "star"
  | "bolt"
  | "moon"
  | "sun"
  | "leaf"
  | "flame"
  | "heart"
  | "bookmark"
  | "tag"
  | "flag"
  | "book"
  | "ghost"
  | "music"
  | "compass"
  | "globe"
  | "camera"
  | "wave"
  | "palette"
  | "code"
  | "target"
  | "shield"
  | "gift"
  | "bell"
  | "clock"
  | "calendar"
  | "map"
  | "search"
  | "send"
  | "mic"
  // nature
  | "cloud"
  | "rain"
  | "snowflake"
  | "wind"
  | "rainbow"
  | "droplet"
  | "umbrella"
  | "pine"
  | "flower"
  | "bug"
  | "feather"
  // food & drinks
  | "coffee"
  | "pizza"
  | "apple"
  | "cake"
  | "beer"
  | "wine"
  | "fish"
  // action & sport
  | "rocket"
  | "bike"
  | "car"
  | "plane"
  | "anchor"
  | "gamepad"
  | "dice"
  | "trophy"
  | "medal"
  | "dumbbell"
  // work & money
  | "briefcase"
  | "wallet"
  | "banknote"
  | "percent"
  | "chart"
  | "lightbulb"
  | "key"
  | "lock"
  | "link"
  | "paperclip"
  // people & comms
  | "phone"
  | "mail"
  | "chat"
  | "eye"
  | "film"
  | "headphones"
  // vibes
  | "crown"
  | "gem"
  | "smile"
  | "party"
  | "sparkles"
  | "infinity";

export const NOTE_BADGE_ICONS: {
  id: NoteBadgeIcon;
  label: string;
  category: NoteBadgeIconCategory;
}[] = [
  { id: "sparkle", label: "Искра", category: "vibes" },
  { id: "note", label: "Заметка", category: "work" },
  { id: "list", label: "Список", category: "work" },
  { id: "star", label: "Звезда", category: "nature" },
  { id: "bolt", label: "Молния", category: "action" },
  { id: "moon", label: "Луна", category: "nature" },
  { id: "sun", label: "Солнце", category: "nature" },
  { id: "leaf", label: "Лист", category: "nature" },
  { id: "flame", label: "Пламя", category: "nature" },
  { id: "heart", label: "Сердце", category: "vibes" },
  { id: "bookmark", label: "Закладка", category: "vibes" },
  { id: "tag", label: "Тег", category: "vibes" },
  { id: "flag", label: "Флаг", category: "action" },
  { id: "book", label: "Книга", category: "work" },
  { id: "ghost", label: "Дух", category: "vibes" },
  { id: "music", label: "Музыка", category: "comm" },
  { id: "compass", label: "Компас", category: "action" },
  { id: "globe", label: "Глобус", category: "action" },
  { id: "camera", label: "Камера", category: "comm" },
  { id: "wave", label: "Волна", category: "action" },
  { id: "palette", label: "Палитра", category: "vibes" },
  { id: "code", label: "Код", category: "work" },
  { id: "target", label: "Цель", category: "action" },
  { id: "shield", label: "Щит", category: "vibes" },
  { id: "gift", label: "Подарок", category: "vibes" },
  { id: "bell", label: "Колокол", category: "comm" },
  { id: "clock", label: "Часы", category: "work" },
  { id: "calendar", label: "Календарь", category: "work" },
  { id: "map", label: "Карта", category: "action" },
  { id: "search", label: "Поиск", category: "comm" },
  { id: "send", label: "Отправить", category: "comm" },
  { id: "mic", label: "Микрофон", category: "comm" },
  // nature
  { id: "cloud", label: "Облако", category: "nature" },
  { id: "rain", label: "Дождь", category: "nature" },
  { id: "snowflake", label: "Снежинка", category: "nature" },
  { id: "wind", label: "Ветер", category: "nature" },
  { id: "rainbow", label: "Радуга", category: "nature" },
  { id: "droplet", label: "Капля", category: "nature" },
  { id: "umbrella", label: "Зонт", category: "nature" },
  { id: "pine", label: "Ёлка", category: "nature" },
  { id: "flower", label: "Цветок", category: "nature" },
  { id: "bug", label: "Жук", category: "nature" },
  { id: "feather", label: "Перо", category: "nature" },
  // food & drinks
  { id: "coffee", label: "Кофе", category: "food" },
  { id: "pizza", label: "Пицца", category: "food" },
  { id: "apple", label: "Яблоко", category: "food" },
  { id: "cake", label: "Торт", category: "food" },
  { id: "beer", label: "Пиво", category: "food" },
  { id: "wine", label: "Вино", category: "food" },
  { id: "fish", label: "Рыба", category: "food" },
  // action & sport
  { id: "rocket", label: "Ракета", category: "action" },
  { id: "bike", label: "Велосипед", category: "action" },
  { id: "car", label: "Машина", category: "action" },
  { id: "plane", label: "Самолёт", category: "action" },
  { id: "anchor", label: "Якорь", category: "action" },
  { id: "gamepad", label: "Игра", category: "action" },
  { id: "dice", label: "Кости", category: "action" },
  { id: "trophy", label: "Кубок", category: "action" },
  { id: "medal", label: "Медаль", category: "action" },
  { id: "dumbbell", label: "Спорт", category: "action" },
  // work & money
  { id: "briefcase", label: "Дело", category: "work" },
  { id: "wallet", label: "Кошелёк", category: "work" },
  { id: "banknote", label: "Деньги", category: "work" },
  { id: "percent", label: "Скидка", category: "work" },
  { id: "chart", label: "График", category: "work" },
  { id: "lightbulb", label: "Идея", category: "work" },
  { id: "key", label: "Ключ", category: "work" },
  { id: "lock", label: "Замок", category: "work" },
  { id: "link", label: "Ссылка", category: "work" },
  { id: "paperclip", label: "Скрепка", category: "work" },
  // people & comms
  { id: "phone", label: "Телефон", category: "comm" },
  { id: "mail", label: "Письмо", category: "comm" },
  { id: "chat", label: "Чат", category: "comm" },
  { id: "eye", label: "Глаз", category: "comm" },
  { id: "film", label: "Фильм", category: "comm" },
  { id: "headphones", label: "Наушники", category: "comm" },
  // vibes
  { id: "crown", label: "Корона", category: "vibes" },
  { id: "gem", label: "Кристалл", category: "vibes" },
  { id: "smile", label: "Смайлик", category: "vibes" },
  { id: "party", label: "Вечеринка", category: "vibes" },
  { id: "sparkles", label: "Искры", category: "vibes" },
  { id: "infinity", label: "Бесконечность", category: "vibes" },
];
export type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export const BADGE_POSITIONS: { id: BadgePosition; label: string }[] = [
  { id: "top-left", label: "Сверху слева" },
  { id: "top-right", label: "Сверху справа" },
  { id: "bottom-left", label: "Снизу слева" },
  { id: "bottom-right", label: "Снизу справа" },
];

export type Settings = {
  background: BackgroundId;
  // Card appearance
  cardRadius: number; // 0..40 px
  // Badge — on the list card. Each part can be shown/hidden separately.
  // First tag (the primary one)
  showBadgeIcon: boolean;
  showBadgeText: boolean;
  badgeIcon: NoteBadgeIcon;
  badgeLabel: string; // user-defined text
  badgePosition: BadgePosition;
  // Second tag
  showTag2Icon: boolean;
  showTag2Text: boolean;
  tag2Icon: NoteBadgeIcon;
  tag2Label: string;
  tag2Position: BadgePosition;
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
  // Glass card visual style
  glassStyle: "frosted" | "clear" | "smoke";
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
  showTag2Icon: true,
  showTag2Text: true,
  tag2Icon: "star",
  tag2Label: "Важно",
  tag2Position: "bottom-right",
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
  glassStyle: "frosted",
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
