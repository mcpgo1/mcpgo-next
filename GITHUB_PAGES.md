# McpGo.next — GitHub Pages (основной хостинг)

Сайт: **https://mcpgo.ru/**. Исходный код: `mcpgo1/mcpgo-next` (`main`, публичный репозиторий). Настольное приложение McpGo и его релизы находятся отдельно в `mcpgo1/McpGo`.

## Публикация

- Settings → Pages → **GitHub Actions**, Custom domain **`mcpgo.ru`**.
- GitHub Actions → `Deploy McpGo site to GitHub Pages` — автозапуск на каждый push в `main`; также доступен `Run workflow`.
- Repository variable **`PAGES_CUSTOM_DOMAIN=true`** позволяет Next.js собирать сайт от корня `/`. Если домен когда-либо будет снят и проект будет доступен через `https://mcpgo1.github.io/mcpgo-next/`, установите `false` или удалите переменную и повторно запустите workflow.
- Static export: `npm ci && npm run check`; результат — `out/` и `.nojekyll`, публикуется Actions без отдельного сервера Node.js.

## DNS — REG.RU

DNS-серверы остаются `ns1.reg.ru` / `ns2.reg.ru`, NS менять не требуется. 9 ноября 2026 в управлении зоной установлены:

| Тип | Имя | Значение |
| --- | --- | --- |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `mcpgo1.github.io.` |

После изменения DNS могут оставаться старые ответы в кэше публичных резолверов до истечения TTL. Проверить авторитетные записи: `dig @ns1.reg.ru mcpgo.ru A +short` и `dig @ns1.reg.ru www.mcpgo.ru CNAME +short`. Проверить сертификат и применённое перенаправление: `curl -IL https://mcpgo.ru/` и `curl -IL https://www.mcpgo.ru/`.

Завершите выпуск HTTPS в Settings → Pages: после подтверждения DNS GitHub позволит включить **Enforce HTTPS**. Проверяйте главную, `/career/`, `/resume.pdf`, картинки, меню и адаптивность. GitHub может выпускать сертификат не сразу после смены DNS.

**Не удаляйте MX/TXT и другие записи, относящиеся к почте.** Не оставляйте прежние A-записи Vercel одновременно с A-записями GitHub, это может препятствовать выпуску сертификата.

## Резервный вариант

Старый Vercel-проект `mcpgo-next` (`https://mcpgo-next.vercel.app`) не удалён, но GitHub Actions workflow Vercel доступен только вручную, а переменная `VERCEL_AUTO_DEPLOY_ENABLED=false`. Не переключайте DNS обратно на Vercel без предварительной проверки сборки и TLS.

Документация: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site и https://nextjs.org/docs/app/guides/static-exports.

## Аналитика посещений

Для сборки в GitHub Repository Variables установлены `UMAMI_WEBSITE_ID` и `UMAMI_SHARE_URL` (публичные значения, без паролей). Отчёт отображается на отдельном статическом маршруте, не указанном в меню и sitemap; `noindex` присутствует в метаданных страницы. Поскольку репозиторий публичный, отсутствие ссылки не гарантирует конфиденциальность.

На основных страницах используется клиентский трекер Umami, не зависящий от GitHub Pages API. Аналитика страницы отчёта не включается в основную статистику.
