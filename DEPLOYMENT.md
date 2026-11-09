# Хостинг McpGo.next

Основной хостинг — **GitHub Pages** с доменом **`mcpgo.ru`**. См. [GITHUB_PAGES.md](./GITHUB_PAGES.md) для текущих DNS-записей, CI/CD и инструкции тестирования.

Исторически сайт работал на Vercel, проект `mcpgo-next` в команде `asmtv1's projects`, резервный адрес: `https://mcpgo-next.vercel.app`. Эта конфигурация оставлена как резерв и больше не назначена основным хостингом домена. Старый `.github/workflows/deploy-vercel.yml` работает только при ручном вызове и только при включённой переменной `VERCEL_AUTO_DEPLOY_ENABLED=true`; сейчас она установлена в `false`.

Публичный репозиторий сайта: `https://github.com/mcpgo1/mcpgo-next`. Отдельный репозиторий приложения и DMG: `https://github.com/mcpgo1/McpGo`. Не добавляйте в репозиторий сайта конфигурации туннелей, локальные секреты или временные сборки.
