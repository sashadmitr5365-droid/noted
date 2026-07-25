export type BackgroundId =
  | "obsidian"
  | "twilight"
  | "abyss"
  | "ember"
  | "vapor"
  | "ink"
  | "monochrome"
  | "dusk"
  | "amethyst"
  | "graphite"
  | "noir"
  | "cobalt"
  | "moss"
  | "carbon"
  | "plum"
  | "burgundy"
  | "sahara"
  | "arctic"
  | "lagoon"
  | "neon"
  | "velvet"
  | "sand"
  | "smoke"
  | "iris"
  | "basalt"
  | "olive"
  | "cherry"
  | "storm"
  | "copper"
  | "ivory";

export type BackgroundDef = {
  id: BackgroundId;
  name: string;
  description?: string;
  // Base color of the deep backdrop
  base: string;
  // Multi-layered radial gradients applied on top of base
  layers: string;
  // Subtle noise overlay (data URI SVG with feTurbulence)
  noise?: boolean;
  // Subtle vignette to focus attention center
  vignette?: boolean;
};

export const BACKGROUNDS: BackgroundDef[] = [
  {
    id: "obsidian",
    name: "Обсидиан",
    base: "#08080b",
    layers:
      "radial-gradient(60% 50% at 22% 18%, rgba(99,102,241,0.18) 0%, rgba(0,0,0,0) 70%), radial-gradient(50% 45% at 82% 72%, rgba(168,85,247,0.14) 0%, rgba(0,0,0,0) 70%), radial-gradient(80% 60% at 50% 100%, rgba(56,189,248,0.06) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "twilight",
    name: "Сумерки",
    base: "#0a0a14",
    layers:
      "radial-gradient(70% 55% at 50% 0%, rgba(124,58,237,0.28) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 45% at 12% 85%, rgba(236,72,153,0.16) 0%, rgba(0,0,0,0) 65%), radial-gradient(55% 50% at 88% 90%, rgba(14,165,233,0.14) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "abyss",
    name: "Бездна",
    base: "#05060a",
    layers:
      "radial-gradient(55% 50% at 30% 25%, rgba(45,212,191,0.14) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 50% at 75% 70%, rgba(99,102,241,0.16) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(168,85,247,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "ember",
    name: "Угли",
    base: "#0c0708",
    layers:
      "radial-gradient(60% 55% at 25% 30%, rgba(244,63,94,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 75%, rgba(251,146,60,0.14) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 35% at 60% 50%, rgba(217,70,239,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "vapor",
    name: "Пар",
    base: "#0a0814",
    layers:
      "radial-gradient(60% 50% at 20% 20%, rgba(34,211,238,0.16) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 30%, rgba(168,85,247,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(55% 50% at 50% 90%, rgba(236,72,153,0.14) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "ink",
    name: "Чернила",
    base: "#06070a",
    layers:
      "radial-gradient(80% 60% at 50% 0%, rgba(82,82,91,0.20) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 50% at 50% 100%, rgba(24,24,27,0.6) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "monochrome",
    name: "Монохром",
    base: "#0a0a0c",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 50% at 75% 80%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "dusk",
    name: "Закат",
    base: "#0b0710",
    layers:
      "radial-gradient(65% 50% at 18% 20%, rgba(217,70,239,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(55% 50% at 82% 35%, rgba(244,114,182,0.16) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 50% 100%, rgba(251,113,133,0.14) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "amethyst",
    name: "Аметист",
    base: "#0a0612",
    layers:
      "radial-gradient(60% 55% at 25% 20%, rgba(139,92,246,0.26) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 50% at 80% 80%, rgba(99,102,241,0.16) 0%, rgba(0,0,0,0) 65%), radial-gradient(45% 40% at 60% 50%, rgba(192,132,252,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "graphite",
    name: "Графит",
    base: "#0a0b0d",
    layers:
      "radial-gradient(70% 60% at 50% 0%, rgba(63,63,70,0.45) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 50% at 50% 100%, rgba(9,9,11,0.7) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "noir",
    name: "Нуар",
    description: "Кинематографичный чёрный",
    base: "#040405",
    layers:
      "radial-gradient(60% 50% at 50% 30%, rgba(40,40,48,0.45) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 50% 100%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "cobalt",
    name: "Кобальт",
    description: "Глубокий синий металлик",
    base: "#040a18",
    layers:
      "radial-gradient(60% 55% at 25% 25%, rgba(37,99,235,0.28) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 80%, rgba(56,189,248,0.20) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 60% 50%, rgba(99,102,241,0.12) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "moss",
    name: "Мох",
    description: "Приглушённый зелёный",
    base: "#060c08",
    layers:
      "radial-gradient(60% 55% at 30% 20%, rgba(34,197,94,0.22) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 75%, rgba(132,204,22,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(20,184,166,0.10) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "carbon",
    name: "Карбон",
    description: "Антрацит с лёгким теплом",
    base: "#0a0807",
    layers:
      "radial-gradient(70% 60% at 50% 0%, rgba(82,82,91,0.32) 0%, rgba(0,0,0,0) 60%), radial-gradient(55% 50% at 50% 100%, rgba(15,12,10,0.7) 0%, rgba(0,0,0,0) 70%), radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,0.04) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "plum",
    name: "Слива",
    description: "Благородный сливовый",
    base: "#0a0612",
    layers:
      "radial-gradient(60% 55% at 25% 20%, rgba(217,70,239,0.22) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 80%, rgba(139,92,246,0.20) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 60% 50%, rgba(244,114,182,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "burgundy",
    name: "Бургунди",
    description: "Глубокое вино",
    base: "#0c0608",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(190,18,60,0.25) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 75%, rgba(244,63,94,0.18) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "sahara",
    name: "Сахара",
    description: "Тёплые пески пустыни",
    base: "#0e0a06",
    layers:
      "radial-gradient(60% 55% at 30% 30%, rgba(251,191,36,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 80%, rgba(245,158,11,0.14) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(217,119,6,0.10) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "arctic",
    name: "Арктика",
    description: "Ледяная свежесть",
    base: "#040a14",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(125,211,252,0.22) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(186,230,253,0.15) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(56,189,248,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "lagoon",
    name: "Лагуна",
    description: "Бирюзовая гладь",
    base: "#03120e",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(20,184,166,0.26) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 80%, rgba(45,212,191,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(94,234,212,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "neon",
    name: "Неон",
    description: "Яркий токийский свет",
    base: "#0a0414",
    layers:
      "radial-gradient(45% 45% at 20% 25%, rgba(236,72,153,0.32) 0%, rgba(0,0,0,0) 65%), radial-gradient(45% 45% at 80% 30%, rgba(34,211,238,0.30) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 50% 80%, rgba(168,85,247,0.22) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "velvet",
    name: "Бархат",
    description: "Мягкий тёмно-синий",
    base: "#06081a",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(30,58,138,0.30) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(67,56,202,0.20) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "sand",
    name: "Песок",
    description: "Бежевый нейтральный",
    base: "#0c0a08",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(214,191,165,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(180,160,130,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "smoke",
    name: "Дым",
    description: "Серый туман",
    base: "#08090b",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(120,120,130,0.18) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(80,80,90,0.16) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "iris",
    name: "Ирис",
    description: "Переливы фиолетового",
    base: "#0a0418",
    layers:
      "radial-gradient(50% 45% at 25% 20%, rgba(139,92,246,0.30) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 80% 35%, rgba(99,102,241,0.24) 0%, rgba(0,0,0,0) 65%), radial-gradient(45% 40% at 50% 85%, rgba(192,132,252,0.18) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "basalt",
    name: "Базальт",
    description: "Тёмный камень",
    base: "#08090b",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(60,64,72,0.40) 0%, rgba(0,0,0,0) 60%), radial-gradient(55% 50% at 70% 80%, rgba(35,38,45,0.55) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "olive",
    name: "Олива",
    description: "Тусклый зелёно-золотой",
    base: "#0a0c06",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(132,204,22,0.20) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(163,163,18,0.14) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "cherry",
    name: "Вишня",
    description: "Насыщенный красно-розовый",
    base: "#0e0408",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(220,38,38,0.24) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(244,114,182,0.18) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "storm",
    name: "Шторм",
    description: "Грозовое небо",
    base: "#04060c",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(71,85,105,0.32) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(100,116,139,0.20) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 40% at 50% 50%, rgba(148,163,184,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "copper",
    name: "Медь",
    description: "Металлический тёплый",
    base: "#0c0604",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(234,88,12,0.24) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(217,119,6,0.18) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "ivory",
    name: "Айвори",
    description: "Тёплый молочный",
    base: "#0a0908",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(255,247,237,0.12) 0%, rgba(0,0,0,0) 65%), radial-gradient(50% 45% at 75% 80%, rgba(254,215,170,0.08) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
];

export const DEFAULT_BACKGROUND: BackgroundId = "obsidian";

export function getBackgroundById(id: string | null | undefined): BackgroundDef {
  return (
    BACKGROUNDS.find((b) => b.id === id) ??
    BACKGROUNDS.find((b) => b.id === DEFAULT_BACKGROUND)!
  );
}

/**
 * CSS background string for a backdrop. Composed of:
 *  - solid base color
 *  - layered radial gradients (soft, blurred-feeling)
 *  - optional noise + vignette
 */
export function composeBackground(bg: BackgroundDef): string {
  return `${bg.layers}, ${bg.base}`;
}
