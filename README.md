# Noted — минималистичное приложение заметок

Современное Android-ориентированное веб-приложение для заметок и чек-листов с тёмным glassmorphism-дизайном, настраиваемыми фонами, форматированием текста и персонализацией.

## ✨ Возможности

- 📝 Заметки с заголовком, основным текстом и **чеклистами**
- 🎨 30 премиальных фонов с многослойными градиентами
- ✏️ Полноценный rich-text редактор: жирный, курсив, подчёркнутый, зачёркнутый, выделение, цвет, цитаты, списки, чек-листы, заголовки, разделители, ссылки
- 🪟 Полноэкранный режим просмотра с настоящим glassmorphism
- 🎛 Полная кастомизация:
  - Радиус скругления карточек
  - Позиция и иконка метки (52 иконки)
  - Цвет и выравнивание текста
  - Размер шрифта (3 пресета)
  - Настраиваемая дата создания (день / месяц / год)
- 📱 Оптимизировано под мобильное разрешение (Android-first)
- 🌙 Тёмная тема, стеклянные поверхности, микро-анимации

## 🚀 Стек

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Drizzle ORM** + **PostgreSQL** (Neon на Vercel, локальный Postgres в dev)
- **Inter** font

## 💻 Локальная разработка

### Требования

- Node.js 18+
- PostgreSQL (или Docker)

### Установка

```bash
# 1. Установить зависимости
npm install

# 2. Создать .env (скопировать шаблон)
cp .env.example .env

# 3. Запустить локальный Postgres в Docker
docker run -d --name noted-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres -e POSTGRES_DB=app_db \
  -p 5432:5432 postgres:16

# 4. Применить миграции
npx drizzle-kit push

# 5. Запустить dev-сервер
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## 🌐 Деплой на Vercel

### Шаг 1 — База данных

Vercel **не предоставляет** свою PostgreSQL — нужно использовать внешний провайдер. Самый удобный — **Neon** (бесплатный tier).

1. Зарегистрироваться на [neon.tech](https://neon.tech)
2. Создать новый проект
3. Скопировать **pooled connection string** (выглядит как `postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require`)

### Шаг 2 — Залить код на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЮЗЕР/noted.git
git push -u origin main
```

### Шаг 3 — Подключить к Vercel

1. Зайти на [vercel.com](https://vercel.com) → **Add New Project**
2. Импортировать репозиторий
3. Vercel автоматически определит Next.js
4. **Settings → Environment Variables** добавить:
   - `DATABASE_URL` = ваш Neon connection string
5. **Deploy**

### Шаг 4 — Применить миграции

После первого деплоя выполнить миграции против production-БД (можно локально):

```bash
# Временно указать production-URL
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require" \
  npx drizzle-kit push
```

Готово — приложение работает на `https://noted.vercel.app`.

## 🔧 Структура проекта

```
.
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Главный экран (список карточек)
│   │   ├── new/              # Создание заметки
│   │   ├── note/[id]/        # Редактирование
│   │   ├── note/[id]/view/   # Полноэкранный просмотр
│   │   ├── settings/         # Настройки
│   │   └── api/              # REST endpoints
│   ├── components/           # React-компоненты
│   ├── db/                   # Схема и подключение к БД
│   └── lib/                  # Утилиты, настройки, форматирование
├── public/                   # Статические файлы
├── drizzle.config.json
├── vercel.json
└── package.json
```

## 📝 Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск production-сервера |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-проверка |
| `npx drizzle-kit push` | Применить схему к БД |
| `npx drizzle-kit studio` | GUI для просмотра БД |

## 🌍 Окружения

Приложение автоматически выбирает драйвер БД:

- **На Vercel** (`process.env.VERCEL === "1"`) или при URL вида `neon.tech` / `-pooler.` — использует `@neondatabase/serverless` (HTTP+WebSocket, serverless-friendly)
- **Локально** — обычный `pg` Pool с поддержкой SSL

## 📄 Лицензия

MIT
