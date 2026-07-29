// Premium background library.
//
// Each background is composed of MULTIPLE distinct layers — usually:
//   1. base solid color
//   2. 3-6 radial gradients with varied positions, sizes, and intensities
//   3. 1-2 conic or linear gradient sweeps for atmospheric depth
//   4. optional grain / noise texture
//   5. vignette
//
// The compositions are intentionally irregular and layered to feel
// hand-crafted rather than templated. Some use cool/warm color tension,
// some use soft monochromatic depth, some use prismatic multi-hue
// gradients like a soap film.

export type BackgroundId =
  // ==== Mono / tonal ====
  | "noir"
  | "graphite"
  | "carbon"
  | "void"
  | "smoke"
  | "ink"
  | "basalt"
  | "charcoal"
  | "monochrome"
  | "pearl"
  // ==== Cool (blue / teal / cyan) ====
  | "obsidian"
  | "cobalt"
  | "arctic"
  | "lagoon"
  | "azure"
  | "midnight"
  | "boreal"
  | "velvet"
  | "storm"
  | "cobaltPrism"
  // ==== Warm (orange / red / copper) ====
  | "ember"
  | "sahara"
  | "copper"
  | "horizon"
  | "sunset"
  | "crimson"
  | "amber"
  | "magma"
  // ==== Purple / magenta ====
  | "amethyst"
  | "plum"
  | "iris"
  | "roseQuartz"
  | "burgundy"
  | "neon"
  | "ultraviolet"
  // ==== Green / natural ====
  | "moss"
  | "meadow"
  | "forest"
  | "verdant"
  | "aurora"
  | "mintDeep"
  // ==== Special / abstract ====
  | "twilight"
  | "abyss"
  | "dusk"
  | "sand"
  | "obsidianSoft"
  | "lagoonDeep"
  | "olive"
  | "cherry";

export type BackgroundDef = {
  id: BackgroundId;
  name: string;
  description?: string;
  base: string;
  /** Multi-layer CSS background. Composed of 4-7 distinct layers. */
  layers: string;
  noise?: boolean;
  vignette?: boolean;
};

export const BACKGROUNDS: BackgroundDef[] = [
  // ════════════════════════════════════════════════════════════════════
  // MONO / TONAL — single-hue depth, used by premium products
  // ════════════════════════════════════════════════════════════════════
  {
    id: "noir",
    name: "Нуар",
    description: "Кинотеатральная чернота с дыханием",
    base: "#040404",
    layers:
      // 4 stops: deep center, off-center warm/cool hints, edge fade
      "radial-gradient(80% 70% at 50% 50%, rgba(28,28,32,0.65) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(35% 40% at 30% 35%, rgba(40,38,46,0.4) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 35% at 70% 70%, rgba(22,20,26,0.5) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)",
    vignette: true,
  },
  {
    id: "graphite",
    name: "Графит",
    description: "Промышленный антрацит",
    base: "#0a0b0d",
    layers:
      "radial-gradient(70% 60% at 50% 0%, rgba(82,82,91,0.45) 0%, rgba(0,0,0,0) 55%), " +
      "radial-gradient(60% 50% at 50% 100%, rgba(15,12,10,0.7) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 25% 70%, rgba(60,60,70,0.18) 0%, rgba(0,0,0,0) 65%), " +
      "conic-gradient(from 220deg at 80% 20%, rgba(120,120,130,0.10), transparent 35%)",
    noise: true,
    vignette: true,
  },
  {
    id: "carbon",
    name: "Карбон",
    description: "Антрацит с тёплой искрой",
    base: "#0a0807",
    layers:
      "radial-gradient(70% 60% at 50% 0%, rgba(82,82,91,0.32) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(55% 50% at 50% 100%, rgba(15,12,10,0.7) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 30% at 75% 30%, rgba(251,191,36,0.06) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 35% at 20% 80%, rgba(80,80,90,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "void",
    name: "Пустота",
    description: "Абсолютная тьма с дыханием",
    base: "#000000",
    layers:
      "radial-gradient(80% 60% at 50% 50%, rgba(20,20,28,0.5) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(40,40,55,0.3) 0%, rgba(0,0,0,0) 70%)",
    vignette: true,
  },
  {
    id: "smoke",
    name: "Дым",
    description: "Многослойный серый туман",
    base: "#08090b",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(140,140,150,0.18) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(60,60,72,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(100,100,110,0.08) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(135deg, rgba(40,40,48,0.10) 0%, transparent 50%, rgba(20,20,28,0.10) 100%)",
    noise: true,
    vignette: true,
  },
  {
    id: "ink",
    name: "Чернила",
    description: "Синевато-серая бездна",
    base: "#0a0a0c",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(60,64,72,0.40) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(55% 50% at 70% 80%, rgba(24,24,40,0.55) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(40% 35% at 50% 50%, rgba(40,44,60,0.18) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "basalt",
    name: "Базальт",
    description: "Тяжёлый тёмный камень",
    base: "#08090b",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(50,54,62,0.55) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(55% 50% at 70% 80%, rgba(28,32,40,0.65) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(35% 30% at 50% 50%, rgba(20,22,30,0.30) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(20% 20% at 80% 25%, rgba(80,84,92,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "charcoal",
    name: "Уголь",
    description: "Матовый тёмный графит",
    base: "#0a0a0c",
    layers:
      "radial-gradient(80% 60% at 50% 50%, rgba(20,22,28,0.5) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(45% 40% at 20% 30%, rgba(50,52,60,0.15) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 80% 75%, rgba(40,42,48,0.18) 0%, rgba(0,0,0,0) 65%)",
    vignette: true,
  },
  {
    id: "monochrome",
    name: "Монохром",
    description: "Чистый чёрно-белый",
    base: "#0a0a0c",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
    vignette: true,
  },
  {
    id: "pearl",
    name: "Жемчуг",
    description: "Холодный перламутр",
    base: "#0a0a0e",
    layers:
      "radial-gradient(50% 45% at 30% 30%, rgba(226,232,240,0.22) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(45% 40% at 70% 70%, rgba(203,213,225,0.18) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 35% at 50% 50%, rgba(241,245,249,0.10) 0%, rgba(0,0,0,0) 70%), " +
      "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(220,225,235,0.08) 90deg, transparent 200deg)",
    vignette: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // COOL — blue / teal / cyan
  // ════════════════════════════════════════════════════════════════════
  {
    id: "obsidian",
    name: "Обсидиан",
    description: "Индиго с фиолетовыми бликами",
    base: "#08080b",
    layers:
      "radial-gradient(60% 50% at 22% 18%, rgba(99,102,241,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 82% 72%, rgba(168,85,247,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(56,189,248,0.06) 0%, rgba(0,0,0,0) 70%), " +
      "conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(99,102,241,0.04) 120deg, transparent 240deg)",
    noise: true,
    vignette: true,
  },
  {
    id: "cobalt",
    name: "Кобальт",
    description: "Глубокий синий с бирюзовыми бликами",
    base: "#040a18",
    layers:
      "radial-gradient(60% 55% at 25% 25%, rgba(37,99,235,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(56,189,248,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 60% 50%, rgba(99,102,241,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 75% 25%, rgba(14,165,233,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "arctic",
    name: "Арктика",
    description: "Ледяная свежесть",
    base: "#040a14",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(125,211,252,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(186,230,253,0.20) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(56,189,248,0.10) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(224,242,254,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "lagoon",
    name: "Лагуна",
    description: "Бирюзовая гладь",
    base: "#03120e",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(20,184,166,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(45,212,191,0.26) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(94,234,212,0.10) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(180deg, rgba(20,184,166,0.05) 0%, transparent 40%, transparent 60%, rgba(6,95,70,0.20) 100%)",
    noise: true,
    vignette: true,
  },
  {
    id: "azure",
    name: "Лазурь",
    description: "Глубокий ярко-синий",
    base: "#02081a",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(37,99,235,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(14,165,233,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(96,165,250,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 70%, rgba(125,211,252,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "midnight",
    name: "Полуночник",
    description: "Синий вечер",
    base: "#04081a",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(30,58,138,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(67,56,202,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 80% 30%, rgba(79,70,229,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "boreal",
    name: "Бореал",
    description: "Холодное скандинавское небо",
    base: "#04080f",
    layers:
      "radial-gradient(60% 50% at 50% 0%, rgba(100,116,139,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 20% 80%, rgba(148,163,184,0.26) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 80% 90%, rgba(203,213,225,0.18) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.3) 100%)",
    noise: true,
    vignette: true,
  },
  {
    id: "velvet",
    name: "Бархат",
    description: "Мягкий тёмно-синий",
    base: "#06081a",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(30,58,138,0.45) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(67,56,202,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(35% 35% at 50% 50%, rgba(79,70,229,0.14) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "storm",
    name: "Шторм",
    description: "Грозовое небо",
    base: "#04060c",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(71,85,105,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(100,116,139,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(148,163,184,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 80% 25%, rgba(165,180,200,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "cobaltPrism",
    name: "Кобальтовая призма",
    description: "Мыльный пузырь в синих тонах",
    base: "#03081a",
    layers:
      "conic-gradient(from 200deg at 30% 30%, rgba(99,102,241,0.18), transparent 30%), " +
      "conic-gradient(from 30deg at 70% 70%, rgba(14,165,233,0.16), transparent 35%), " +
      "radial-gradient(60% 55% at 25% 25%, rgba(37,99,235,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(56,189,248,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(99,102,241,0.10) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // WARM — orange / red / copper / amber
  // ════════════════════════════════════════════════════════════════════
  {
    id: "ember",
    name: "Угли",
    description: "Тёплое дыхание с искрами",
    base: "#0c0708",
    layers:
      "radial-gradient(60% 55% at 30% 30%, rgba(190,18,60,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 75%, rgba(251,146,60,0.26) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(217,70,239,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(20% 20% at 75% 30%, rgba(251,191,36,0.08) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "sahara",
    name: "Сахара",
    description: "Тёплые пески пустыни",
    base: "#0e0a06",
    layers:
      "radial-gradient(60% 55% at 30% 30%, rgba(251,191,36,0.26) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(245,158,11,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(217,119,6,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 80%, rgba(180,83,9,0.10) 0%, rgba(0,0,0,0) 65%), " +
      "linear-gradient(135deg, rgba(180,83,9,0.06) 0%, transparent 50%, rgba(120,53,15,0.10) 100%)",
    noise: true,
    vignette: true,
  },
  {
    id: "copper",
    name: "Медь",
    description: "Металлический тёплый",
    base: "#0c0604",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(234,88,12,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(217,119,6,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(35% 35% at 50% 50%, rgba(194,65,12,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "conic-gradient(from 0deg at 30% 30%, rgba(251,146,60,0.10), transparent 40%)",
    noise: true,
    vignette: true,
  },
  {
    id: "horizon",
    name: "Горизонт",
    description: "Закат над водой",
    base: "#0a0612",
    layers:
      "radial-gradient(60% 50% at 50% 100%, rgba(251,146,60,0.40) 0%, rgba(0,0,0,0) 55%), " +
      "radial-gradient(50% 45% at 30% 30%, rgba(244,63,94,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 70% 20%, rgba(168,85,247,0.20) 0%, rgba(0,0,0,0) 70%), " +
      "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(120,30,40,0.30) 100%)",
    noise: true,
    vignette: true,
  },
  {
    id: "sunset",
    name: "Сицилия",
    description: "Средиземноморский закат",
    base: "#0c0610",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(251,113,133,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(251,191,36,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(244,114,182,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(253,164,175,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "crimson",
    name: "Багряный",
    description: "Тёмно-красный королевский",
    base: "#0c0408",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(220,38,38,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(159,18,57,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(244,63,94,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 75% 30%, rgba(248,113,113,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "amber",
    name: "Янтарь",
    description: "Золотистый с глубиной",
    base: "#0a0806",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(245,158,11,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(217,119,6,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(252,211,77,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 70%, rgba(180,83,9,0.10) 0%, rgba(0,0,0,0) 65%), " +
      "conic-gradient(from 100deg at 70% 30%, rgba(254,215,170,0.10), transparent 40%)",
    noise: true,
    vignette: true,
  },
  {
    id: "magma",
    name: "Магма",
    description: "Раскалённая лава",
    base: "#0a0406",
    layers:
      "radial-gradient(60% 55% at 30% 80%, rgba(220,38,38,0.45) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 25%, rgba(251,146,60,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(244,63,94,0.18) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 80% 70%, rgba(251,113,133,0.14) 0%, rgba(0,0,0,0) 65%), " +
      "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(120,20,20,0.3) 100%)",
    noise: true,
    vignette: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // PURPLE / MAGENTA
  // ════════════════════════════════════════════════════════════════════
  {
    id: "amethyst",
    name: "Аметист",
    description: "Глубокий фиолетовый",
    base: "#0a0612",
    layers:
      "radial-gradient(60% 55% at 25% 20%, rgba(139,92,246,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(99,102,241,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 60% 50%, rgba(192,132,252,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 80% 25%, rgba(167,139,250,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "plum",
    name: "Слива",
    description: "Благородный сливовый",
    base: "#0a0612",
    layers:
      "radial-gradient(60% 55% at 25% 20%, rgba(217,70,239,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(139,92,246,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 60% 50%, rgba(244,114,182,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(192,132,252,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "iris",
    name: "Ирис",
    description: "Переливы фиолетового",
    base: "#0a0418",
    layers:
      "radial-gradient(50% 45% at 25% 20%, rgba(139,92,246,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 35%, rgba(99,102,241,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 40% at 50% 85%, rgba(192,132,252,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(30% 30% at 75% 60%, rgba(167,139,250,0.16) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "roseQuartz",
    name: "Розовый кварц",
    description: "Нежный минерал",
    base: "#0e0810",
    layers:
      "radial-gradient(50% 45% at 30% 30%, rgba(244,114,182,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 40% at 70% 70%, rgba(217,70,239,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 35% at 50% 50%, rgba(249,168,212,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 80%, rgba(192,132,252,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "burgundy",
    name: "Бургунди",
    description: "Глубокое вино",
    base: "#0c0608",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(190,18,60,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 75%, rgba(244,63,94,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(220,38,38,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 80% 30%, rgba(159,18,57,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "neon",
    name: "Неон",
    description: "Яркий токийский свет",
    base: "#0a0414",
    layers:
      "radial-gradient(45% 45% at 20% 25%, rgba(236,72,153,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 45% at 80% 30%, rgba(34,211,238,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 50% 80%, rgba(168,85,247,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(217,70,239,0.14) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "ultraviolet",
    name: "Ультрафиолет",
    description: "Электрический фиолет",
    base: "#08041a",
    layers:
      "conic-gradient(from 220deg at 30% 30%, rgba(139,92,246,0.20), transparent 30%), " +
      "conic-gradient(from 60deg at 70% 70%, rgba(217,70,239,0.16), transparent 35%), " +
      "radial-gradient(60% 55% at 30% 25%, rgba(168,85,247,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(139,92,246,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(192,132,252,0.16) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // GREEN / NATURAL
  // ════════════════════════════════════════════════════════════════════
  {
    id: "moss",
    name: "Мох",
    description: "Приглушённый зелёный",
    base: "#060c08",
    layers:
      "radial-gradient(60% 55% at 30% 20%, rgba(34,197,94,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 80% 80%, rgba(132,204,22,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(74,222,128,0.10) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "meadow",
    name: "Луг",
    description: "Утренняя трава",
    base: "#060c08",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(132,204,22,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(101,163,13,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(190,242,100,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(74,222,128,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "forest",
    name: "Тайга",
    description: "Глухая хвойная чаща",
    base: "#04080a",
    layers:
      "radial-gradient(50% 45% at 30% 30%, rgba(20,83,45,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 40% at 70% 70%, rgba(6,78,59,0.30) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 35% at 50% 50%, rgba(34,197,94,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 80% 25%, rgba(22,163,74,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "verdant",
    name: "Изумруд",
    description: "Тёмный изумруд",
    base: "#020c08",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(5,150,105,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(16,185,129,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(52,211,153,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(45,212,191,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "aurora",
    name: "Аврора",
    description: "Зелёно-фиолетовое сияние",
    base: "#040a08",
    layers:
      "radial-gradient(40% 40% at 20% 30%, rgba(16,185,129,0.40) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 45% at 80% 25%, rgba(139,92,246,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 50% at 50% 90%, rgba(59,130,246,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(20,184,166,0.18) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "mintDeep",
    name: "Глубокая мята",
    description: "Тёмный бирюзово-зелёный",
    base: "#021210",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(20,184,166,0.36) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(45,212,191,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(94,234,212,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 80%, rgba(16,185,129,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // SPECIAL / ABSTRACT
  // ════════════════════════════════════════════════════════════════════
  {
    id: "twilight",
    name: "Сумерки",
    description: "Фиолетово-индиго вечер",
    base: "#0a0a14",
    layers:
      "radial-gradient(70% 55% at 50% 0%, rgba(124,58,237,0.40) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(50% 45% at 12% 85%, rgba(236,72,153,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(55% 50% at 88% 90%, rgba(14,165,233,0.20) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(168,85,247,0.10) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "abyss",
    name: "Бездна",
    description: "Тёмный бирюзовый",
    base: "#05060a",
    layers:
      "radial-gradient(55% 50% at 30% 25%, rgba(45,212,191,0.20) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 70%, rgba(99,102,241,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 60% 50%, rgba(168,85,247,0.12) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(25% 25% at 80% 30%, rgba(20,184,166,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "dusk",
    name: "Заря",
    description: "Тёплое фиолетово-розовое",
    base: "#0a0612",
    layers:
      "radial-gradient(65% 50% at 18% 20%, rgba(217,70,239,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(55% 50% at 82% 35%, rgba(244,114,182,0.22) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 50% 100%, rgba(251,113,133,0.20) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(192,132,252,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "sand",
    name: "Песок",
    description: "Бежевый нейтральный",
    base: "#0c0a08",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(214,191,165,0.24) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(180,160,130,0.18) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(245,222,179,0.08) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(180,160,130,0.08) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "obsidianSoft",
    name: "Обсидиан мягкий",
    description: "Лёгкая фиолетовая подсветка",
    base: "#0a0a0e",
    layers:
      "radial-gradient(80% 60% at 50% 50%, rgba(139,92,246,0.22) 0%, rgba(0,0,0,0) 60%), " +
      "radial-gradient(50% 45% at 25% 25%, rgba(59,130,246,0.14) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(45% 40% at 75% 75%, rgba(168,85,247,0.12) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "lagoonDeep",
    name: "Глубокая лагуна",
    description: "Тёмный бирюзовый",
    base: "#02151a",
    layers:
      "radial-gradient(55% 50% at 50% 0%, rgba(13,148,136,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 20% 80%, rgba(6,95,70,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 35% at 80% 90%, rgba(20,184,166,0.14) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 50% 50%, rgba(45,212,191,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
  {
    id: "olive",
    name: "Олива",
    description: "Тусклый зелёно-золотой",
    base: "#0a0c06",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(132,204,22,0.28) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(163,163,18,0.20) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(190,242,100,0.08) 0%, rgba(0,0,0,0) 70%)",
    noise: true,
    vignette: true,
  },
  {
    id: "cherry",
    name: "Вишня",
    description: "Насыщенный красно-розовый",
    base: "#0e0408",
    layers:
      "radial-gradient(60% 55% at 30% 25%, rgba(220,38,38,0.32) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(50% 45% at 75% 80%, rgba(244,114,182,0.26) 0%, rgba(0,0,0,0) 65%), " +
      "radial-gradient(40% 40% at 50% 50%, rgba(236,72,153,0.10) 0%, rgba(0,0,0,0) 70%), " +
      "radial-gradient(30% 30% at 20% 75%, rgba(248,113,113,0.10) 0%, rgba(0,0,0,0) 65%)",
    noise: true,
    vignette: true,
  },
];

export const DEFAULT_BACKGROUND: BackgroundId = "noir";

export function getBackgroundById(
  id: string | null | undefined
): BackgroundDef {
  return (
    BACKGROUNDS.find((b) => b.id === id) ??
    BACKGROUNDS.find((b) => b.id === DEFAULT_BACKGROUND)!
  );
}

export function composeBackground(bg: BackgroundDef): string {
  return `${bg.layers}, ${bg.base}`;
}
