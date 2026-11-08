# Публикация McpGo.next на GitHub и Vercel

Это **только сайт** McpGo (Next.js). Само приложение McpGo и его релизные DMG находятся в другом репозитории. Из этого каталога не нужно загружать конфигурации локальных туннелей или ключи пользователя.

## 1. Репозиторий и проверки

- Исходники сайта: [`mcpgo1/mcpgo-next`](https://github.com/mcpgo1/mcpgo-next), приватный репозиторий, ветка `main`.
- `.github/workflows/ci.yml` проверяет ESLint, TypeScript и production-build.
- Приложение McpGo и подписанные DMG — в отдельном репозитории [`mcpgo1/McpGo`](https://github.com/mcpgo1/McpGo); на сайте используется прямая ссылка на DMG 2.0.3.

## 2. Production Vercel и автоматический деплой

- **Готовый production-проект**: `mcpgo-next` в команде Vercel `asmtv1's projects` (`team_Dmfm8M5jVsyucKCosb40qMPd`).
- Vercel Project ID: `prj_OGa9wKDQZx3TQ6li3JGuSAgdcpz3`.
- Резервный адрес: `https://mcpgo-next.vercel.app`.
- **Сайт впервые опубликован вручную** из каталога проекта. Связь с GitHub через UI не работает, поскольку Vercel Hobby подключён к `asmtv1`, а приватный сайт находится в личном GitHub `mcpgo1`. Перепривязывать чужие GitHub-аккаунты и изменять приватность репозитория не требуется.

Для автоматической публикации используем отдельный workflow `.github/workflows/deploy-vercel.yml`. Он рассчитан на **тот же существующий проект Vercel**, а не на создание нового, и запускается при push в `main` или через GitHub Actions вручную.

### Одноразовое включение

1. В настройках Vercel создайте project-scoped token для `mcpgo-next`; срок годности — 1 год, затем обновите.
2. В GitHub `mcpgo1/mcpgo-next` → Settings → Secrets and variables → Actions → Repository secrets создайте `MCPGO_VERCEL_TOKEN`. Токен не следует записывать в Git, документацию или логи.
3. В Repository variables создайте `VERCEL_AUTO_DEPLOY_ENABLED` со значением `true`.
4. Откройте GitHub Actions → **Deploy website to Vercel** → Run workflow (ветка main).
5. Проверьте, что workflow завершился успешно, появилась новая production deployment и сайт на резервном `.vercel.app` показывает ожидаемый контент.

Пока переменная `VERCEL_AUTO_DEPLOY_ENABLED` не равна `true`, job намеренно пропускается, чтобы не запускать деплой без настроенных секретов.

Workflow использует pinned Vercel CLI, `vercel pull`, `vercel build --prod` и `vercel deploy --prebuilt --prod`; идентификаторы команды/проекта хранятся как несекретные переменные workflow. Все проверки выполняются независимо в `ci.yml`.

При перевыпуске токена не забудьте обновить секрет GitHub. Не включайте второй параллельный автоматический деплой через Vercel Git Integration, если позже подключите GitHub напрямую: оставьте один механизм production-публикации.

## 3. Домен mcpgo.ru

1. Убедитесь, что домен принадлежит вам, и узнайте, у какого провайдера управляется DNS. **Не меняйте NS/DNS наугад.**
2. Vercel → Project → Settings → Domains → добавьте **`mcpgo.ru`** (основной адрес) и **`www.mcpgo.ru`** (перенаправление на основной).
3. В панели DNS-провайдера добавьте **именно те A/CNAME/TXT записи, которые Vercel показывает для домена**. Для корневого домена обычно нужна A-запись, для `www` — CNAME, иногда TXT для подтверждения. Если DNS остаётся у регистратора, не нужно переносить nameservers на Vercel.
4. Для текущего домена REG.RU уже настроен: `A @ → 216.198.79.1`, `CNAME www → b0c771148dd0a316.vercel-dns-017.com.`. DNS API Vercel подтвердил корректность; сертификаты для обоих доменов выпущены. **Проверка 9 ноября 2026:** HTTPS успешно работает при прямом соединении через Wi-Fi (HTTP 200, TLS проверен), а `www` перенаправляет на основной адрес. Независимая проверка с другого сервера тоже дала HTTP 200. На Mac с активным VPN-туннелем рукопожатие TLS для корневого домена завершается ошибкой — причина в сетевом маршруте через VPN, а не в настройках Vercel. Если такое повторится, проверьте сайт без VPN или добавьте домен в исключения VPN-клиента, если клиент поддерживает split tunneling. Не удаляйте рабочие записи DNS и сертификаты.
5. Не меняйте существующие MX/TXT для почты и другие записи, не связанные с сайтом.

Официальные инструкции: https://vercel.com/docs/git/vercel-for-github и https://vercel.com/docs/domains/set-up-custom-domain.

## Перед публичной публикацией

- **Резюме и скриншот** в `public/` будут доступны любому посетителю и из публичного GitHub. Проверьте, что в `resume.pdf`, двух `resume-page-*.png` и `mcpgo-real-example.png` нет информации, которую вы не хотите публиковать.
- Сайт ссылается на другой репозиторий с приложением: `https://github.com/mcpgo1/McpGo`. Убедитесь, что он опубликован и ссылки на его документацию работают.
- DMG 2.0.3 уже опубликован в GitHub Releases; ссылка задана в `app/data.ts`. Не подменяйте её тестовой сборкой.
- После каждого изменения исходников перед публикацией: `npm ci && npm run check`.
