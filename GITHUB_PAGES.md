# McpGo.next: GitHub Pages

Исходный репозиторий сайта — `mcpgo1/mcpgo-next` (в отличие от репозитория настольного приложения `mcpgo1/McpGo`). Сайт использует статический экспорт Next.js (`out/`): страницы, изображения, резюме и JS-интерактивность работают без Node.js-сервера.

## Первая проверка на github.io

1. GitHub Pages на GitHub Free работает с **публичными** репозиториями. Сейчас `mcpgo1/mcpgo-next` приватный; для публикации на бесплатном плане переключите видимость на Public в Settings → General → Danger Zone → Change repository visibility. Внимание: после этого публичны и исходники, и `public/resume.pdf`, и изображения. Если тариф позволяет приватный репозиторий с Pages, открывать исходники не требуется.
2. Репозиторий → Settings → Pages → Build and deployment → Source: **GitHub Actions**, не `Deploy from a branch`.
3. Ветка `main` запускает `.github/workflows/deploy-pages.yml` автоматически, либо запустите `Run workflow` вручную. Два jobs `build` и `deploy` собирают и публикуют `out/`.
4. До переключения домена тестовый адрес: **https://mcpgo1.github.io/mcpgo-next/**. Для него workflow собирает с `NEXT_PUBLIC_BASE_PATH=/mcpgo-next`; это нужно для корректных CSS/JS, изображений, ссылок на `/career` и PDF.
5. Проверьте главную, `https://mcpgo1.github.io/mcpgo-next/career/`, просмотр и скачивание PDF, SVG/PNG, меню и интерактивную инструкцию на мобильном.

## Перевод mcpgo.ru после успешной проверки

**Не отключайте работающий Vercel и не меняйте DNS, пока тест на github.io не прошёл.** В GitHub Pages custom domain задаётся отдельно; одного файла CNAME недостаточно.

1. Репозиторий → Settings → Secrets and variables → Actions → Variables → создайте `PAGES_CUSTOM_DOMAIN` со значением `true`.
2. Settings → Pages → Custom domain → укажите `mcpgo.ru` и сохраните. Убедитесь, что GitHub подтвердил права на домен (если GitHub требует подтверждения).
3. Запустите `Deploy McpGo site to GitHub Pages` вручную. С переменной `PAGES_CUSTOM_DOMAIN=true` путь к файлам и роутам будет корневым (`/`), а не `/mcpgo-next`.
4. У DNS-провайдера замените **только** старые записи для сайта (сейчас они ведут на Vercel). Для корневого домена GitHub в документации указывает четыре IPv4 A-записи: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Для `www` используйте CNAME на `mcpgo1.github.io` (без пути), если нужен www. **Перед изменением сверяйтесь с актуальными инструкциями GitHub Pages** и не удаляйте MX/TXT почты и другие записи.
5. Дождитесь проверки DNS и сертификата HTTPS в Pages. Включите `Enforce HTTPS`, убедитесь, что `https://mcpgo.ru/` и `https://mcpgo.ru/career/` отвечают и что www перенаправляется корректно.
6. Только после этого отключайте автоматические релизы на Vercel или удаляйте там домен, если больше не нужен.

Если решите **остаться на Vercel**, удалите/не включайте custom domain в GitHub Pages и не меняйте DNS. Workflow Vercel в этом репозитории оставлен только для ручного запуска на период тестирования, поэтому автоматических конфликтующих публикаций не будет.

## Локальный тест сборки

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/mcpgo-next npm run check
python3 -m http.server 3000 --directory out
```

При тестировании через локальный HTTP-сервер с подпапкой разместите содержимое `out/` именно в каталоге `/mcpgo-next/` у корня HTTP-сервера; в GitHub Pages это происходит автоматически.

Полезные документы: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages и https://nextjs.org/docs/app/guides/static-exports.
