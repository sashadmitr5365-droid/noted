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
  // lightning removed (duplicate of bolt)
  // new batch 1–10 follow
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
  | "crown"
  // === Nature / animals / plants ===
  | "flower"
  | "tree2"
  | "palm"
  | "cactus"
  | "mountain"
  | "wave"
  | "fish"
  | "bird"
  | "cat"
  | "dog"
  | "rabbit"
  | "fox"
  | "butterfly"
  | "bee"
  | "snail"
  | "feather2"
  // === Weather / sky ===
  | "sun2"
  | "moon2"
  | "cloud2"
  | "cloudRain"
  | "cloudSnow"
  | "cloudLightning"
  | "rainbow"
  | "wind"
  | "thermometer"
  | "snowflake"
  | "fire2"
  // === Seasons / time ===
  | "sunrise"
  | "sunset2"
  | "moonStars"
  | "calendar2"
  | "hourglass"
  // === Buildings / places ===
  | "home"
  | "building"
  | "factory"
  | "church"
  | "hospital"
  | "school"
  | "bank"
  | "tent"
  | "lighthouse"
  // === Vehicles ===
  | "car"
  | "truck"
  | "bus"
  | "bike"
  | "plane"
  | "ship"
  | "train"
  | "anchor2"
  // === Food / drink ===
  | "apple"
  | "lemon"
  | "cherry2"
  | "mushroom"
  | "bread"
  | "cheese"
  | "coffee2"
  | "tea"
  | "wine"
  | "cake"
  | "pizza"
  | "icecream"
  | "egg"
  // === Sports / activity ===
  | "ball"
  | "trophy2"
  | "medal"
  | "flag2"
  | "target2"
  | "dumbbell"
  // === Tools / objects ===
  | "hammer"
  | "wrench"
  | "scissors"
  | "knife"
  | "key2"
  | "lock2"
  | "bulb"
  | "magnet"
  | "compass2"
  // === Emotions / symbols ===
  | "smile"
  | "frown"
  | "laugh"
  | "angry"
  | "cry"
  | "wink"
  | "kiss"
  | "sleep"
  | "party"
  | "fire3"
  | "crown2"
  | "gem"
  | "diamond2"
  | "star2"
  | "moonFace"
  // === Abstract ===
  | "circle"
  | "square"
  | "triangle"
  | "hexagon"
  | "spiral"
  | "wave2"
  | "dot"
  | "line"
  | "cross"
  | "plus"
  | "minus"
  | "infinity"
  | "yin"
  | "shield2";

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
  // lightning removed — duplicate of bolt
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
  // ── Nature / animals / plants ──
  { id: "flower", label: "Цветок" },
  { id: "tree2", label: "Дерево 2" },
  { id: "palm", label: "Пальма" },
  { id: "cactus", label: "Кактус" },
  { id: "fish", label: "Рыба" },
  { id: "bird", label: "Птица" },
  { id: "cat", label: "Кот" },
  { id: "dog", label: "Собака" },
  { id: "rabbit", label: "Кролик" },
  { id: "fox", label: "Лиса" },
  { id: "butterfly", label: "Бабочка" },
  { id: "bee", label: "Пчела" },
  { id: "snail", label: "Улитка" },
  { id: "feather2", label: "Перо 2" },
  // ── Weather / sky ──
  { id: "sun2", label: "Солнце залив." },
  { id: "moon2", label: "Луна контур" },
  { id: "cloud2", label: "Облако 2" },
  { id: "cloudRain", label: "Дождь" },
  { id: "cloudSnow", label: "Снег" },
  { id: "cloudLightning", label: "Гроза" },
  { id: "rainbow", label: "Радуга" },
  { id: "wind", label: "Ветер" },
  { id: "thermometer", label: "Температура" },
  { id: "snowflake", label: "Снежинка" },
  { id: "fire2", label: "Огонёк" },
  // ── Seasons / time ──
  { id: "sunrise", label: "Восход" },
  { id: "sunset2", label: "Закат" },
  { id: "moonStars", label: "Луна и звёзды" },
  { id: "calendar2", label: "Календарь 2" },
  { id: "hourglass", label: "Песочные часы" },
  // ── Buildings / places ──
  { id: "home", label: "Дом" },
  { id: "building", label: "Здание" },
  { id: "factory", label: "Завод" },
  { id: "church", label: "Церковь" },
  { id: "hospital", label: "Больница" },
  { id: "school", label: "Школа" },
  { id: "bank", label: "Банк" },
  { id: "tent", label: "Палатка" },
  { id: "lighthouse", label: "Маяк" },
  // ── Vehicles ──
  { id: "car", label: "Машина" },
  { id: "truck", label: "Грузовик" },
  { id: "bus", label: "Автобус" },
  { id: "bike", label: "Велосипед" },
  { id: "plane", label: "Самолёт" },
  { id: "ship", label: "Корабль" },
  { id: "train", label: "Поезд" },
  { id: "anchor2", label: "Якорь 2" },
  // ── Food / drink ──
  { id: "apple", label: "Яблоко" },
  { id: "lemon", label: "Лимон" },
  { id: "cherry2", label: "Вишня 2" },
  { id: "mushroom", label: "Гриб" },
  { id: "bread", label: "Хлеб" },
  { id: "cheese", label: "Сыр" },
  { id: "coffee2", label: "Кофе 2" },
  { id: "tea", label: "Чай" },
  { id: "wine", label: "Вино" },
  { id: "cake", label: "Торт" },
  { id: "pizza", label: "Пицца" },
  { id: "icecream", label: "Мороженое" },
  { id: "egg", label: "Яйцо" },
  // ── Sports / activity ──
  { id: "ball", label: "Мяч" },
  { id: "trophy2", label: "Кубок 2" },
  { id: "medal", label: "Медаль" },
  { id: "flag2", label: "Флаг 2" },
  { id: "target2", label: "Мишень 2" },
  { id: "dumbbell", label: "Гантель" },
  // ── Tools / objects ──
  { id: "hammer", label: "Молоток" },
  { id: "wrench", label: "Ключ гаечный" },
  { id: "scissors", label: "Ножницы" },
  { id: "knife", label: "Нож" },
  { id: "key2", label: "Ключ 2" },
  { id: "lock2", label: "Замок 2" },
  { id: "bulb", label: "Лампочка" },
  { id: "magnet", label: "Магнит" },
  { id: "compass2", label: "Компас 2" },
  // ── Emotions / symbols ──
  { id: "smile", label: "Улыбка" },
  { id: "frown", label: "Грусть" },
  { id: "laugh", label: "Смех" },
  { id: "angry", label: "Злость" },
  { id: "cry", label: "Плач" },
  { id: "wink", label: "Подмигивание" },
  { id: "kiss", label: "Поцелуй" },
  { id: "sleep", label: "Сон" },
  { id: "party", label: "Праздник" },
  { id: "fire3", label: "Огонь 2" },
  { id: "crown2", label: "Корона 2" },
  { id: "gem", label: "Камень" },
  { id: "diamond2", label: "Бриллиант 2" },
  { id: "star2", label: "Звезда 2" },
  { id: "moonFace", label: "Луна-лицо" },
  // ── Abstract ──
  { id: "circle", label: "Круг" },
  { id: "square", label: "Квадрат" },
  { id: "triangle", label: "Треугольник" },
  { id: "hexagon", label: "Шестиугольник" },
  { id: "spiral", label: "Спираль" },
  { id: "wave2", label: "Волна 2" },
  { id: "dot", label: "Точка" },
  { id: "line", label: "Линия" },
  { id: "cross", label: "Крест" },
  { id: "plus", label: "Плюс" },
  { id: "minus", label: "Минус" },
  { id: "infinity", label: "Бесконечность" },
  { id: "yin", label: "Инь-Ян" },
  { id: "shield2", label: "Щит 2" },
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
