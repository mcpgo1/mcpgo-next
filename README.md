# McpGo — публичный сайт

Публичный русскоязычный лендинг для McpGo на **Next.js 16 / React 19 / TypeScript**.

## Разработка

```bash
cd /Users/asmtv1/Desktop/McpGo.next
npm ci
npm run dev
```

Откройте http://localhost:3000. Полная проверка перед публикацией: `npm run check` (lint, TypeScript, production-сборка). Статический результат находится в `out/`; для локальной проверки: `python3 -m http.server 3000 --directory out`.

## Настройки

Создайте `.env.local` на основе `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — канонический адрес `https://mcpgo.ru` (по умолчанию задан в коде), используется в SEO / sitemap / robots.
- Telegram-сообщество: ссылка `https://t.me/+b-9uv2kRF75jNDFi` задана в `app/data.ts` и выводится в отдельной секции и подвале.

Резюме: актуальный PDF лежит в `public/resume.pdf`. Отдельная страница `/career` показывает две страницы резюме как качественные изображения без браузерного PDF-просмотрщика, а также позволяет скачать или открыть оригинальный PDF. Переменная окружения для резюме не требуется.

## Ссылки и источники фактов

- Проект McpGo: https://github.com/mcpgo1/McpGo
- Руководство первого запуска: [docs/GETTING_STARTED.md](https://github.com/mcpgo1/McpGo/blob/main/docs/GETTING_STARTED.md)
- Мастер: [docs/ONBOARDING.md](https://github.com/mcpgo1/McpGo/blob/main/docs/ONBOARDING.md)
- Статус пакетов: [docs/PACKAGING.md](https://github.com/mcpgo1/McpGo/blob/main/docs/PACKAGING.md)
- [Secure MCP Tunnels](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels)

**При подготовке сайта публичный репозиторий приложения McpGo мог быть пустым**, поэтому в разделе установки отображается честное предупреждение: команда `git clone` станет полезной после публикации исходников. Когда код будет опубликован, обновите этот текст в `app/data.ts`.

**Не путать** наличие исходников/локального `McpGo.app` с проверенным, переносимым и нотарифицированным дистрибутивом. Сайт сознательно описывает текущие ограничения; перед публичным релизом обновите фактический статус и установочные шаги.

Логотип `public/mcpgo-mark.svg` скопирован из собственного файла проекта `McpGo/native/McpGoMark.svg`. Иллюстрация панели — CSS-визуализация, не скриншот и не реальные статусы служб.

## Структура

- `app/home-top.tsx` — шапка, hero, возможности
- `app/home-middle.tsx` — архитектура, интерактивный мануал
- `app/home-bottom.tsx` — open source, планы развития, FAQ, CTA, подвал
- `app/career/page.tsx` — отдельная страница «Я ищу работу» с просмотром резюме
- `app/data.ts` — текст шагов, список возможностей и FAQ
- `app/globals.css` — дизайн и адаптивность
- `app/layout.tsx` — метаданные и favicon

Проект не изменяет исходники McpGo, настройки локальных туннелей или данные пользователя.


### Демонстрация на первом экране

`app/chat-preview.tsx` — полностью синтетический, адаптивный макет переписки. Все результаты (18 ошибок, 1 240 строк и 36 тестов) вымышлены. Персональные данные, реальные скриншоты, названия проектов и пути к файлам пользователя в макете отсутствуют.

При описании расхода токенов: локальные MCP-инструменты не требуют отдельной оплаты Codex API, но запросы к модели продолжают учитываться по правилам и лимитам действующего тарифа ChatGPT. Не обещайте отсутствие расхода подписочного лимита или безлимитные токены.

### Hero example (November 2026)

`app/chat-preview.tsx` now shows a privacy-safe, **completely synthetic** two-pane example inspired by a screenshot shared by the project author: a ChatGPT conversation about making the McpGo landing page, and a miniature site preview. No private chat names, user paths, account information, or real response logs from the source image are reproduced. The example is explicitly labeled as fictional.

### Оригинальный скриншот на главном экране

public/mcpgo-real-example.png — побайтовая копия предоставленного автором скриншота с закрашенными личными данными. При нажатии открывается увеличенный просмотр.

## Инструкция установки на сайте

Секция `#install` ориентирована на готовый DMG, а не сборку из исходников. Шесть шагов: скачать и перенести приложение в «Программы», пройти первый запуск, настроить Organization/Workspace и права Tunnels, создать два туннеля и сохранить runtime key, установить локальные службы/при необходимости разрешить Chrome CDP, подключить custom MCP в ChatGPT и проверить фактические вызовы. Кнопки скачивания ведут напрямую на опубликованный подписанный DMG 2.0.3: `https://github.com/mcpgo1/McpGo/releases/download/v2.0.3/McpGo-2.0.3-macos-arm64.dmg`. URL задаётся в `app/data.ts`.

## Публикация сайта

Этот репозиторий содержит только Next.js-сайт и **не** публикует само настольное приложение McpGo. Инструкции для создания GitHub-репозитория сайта, интеграции с Vercel и подключения `mcpgo.ru`: **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Для корректной сборки используйте Node.js 22 и `npm ci`. GitHub Actions проверяет исходники на `main` и PR. Для автодеплоя в существующий проект Vercel предусмотрен отдельный [workflow](.github/workflows/deploy-vercel.yml) с project-scoped токеном; процедура его включения описана в [DEPLOYMENT.md](./DEPLOYMENT.md).

## GitHub Pages

Сайт поддерживает `output: "export"` для GitHub Pages. Порядок публикации и тестирования под `github.io/mcpgo-next` (затем `mcpgo.ru`) — в [GITHUB_PAGES.md](./GITHUB_PAGES.md).
