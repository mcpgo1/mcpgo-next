# Публикация McpGo.next на GitHub и Vercel

Это **только сайт** McpGo (Next.js). Само приложение McpGo и его релизные DMG находятся в другом репозитории. Из этого каталога не нужно загружать конфигурации локальных туннелей или ключи пользователя.

## 1. GitHub

1. Создайте **пустой** репозиторий GitHub для сайта (например, `mcpgo-site`) с нужной видимостью. Не выбирайте инициализацию README, LICENSE или `.gitignore` на GitHub: они уже есть локально.
2. Укажите его реальный URL как `origin` и выполните push `main`:

   ```bash
   cd /Users/asmtv1/Desktop/McpGo.next
   git remote add origin git@github.com:OWNER/REPOSITORY.git
   git push -u origin main
   ```

   Замените `OWNER/REPOSITORY` на **фактически созданный** репозиторий. Не публикуйте файлы `.env.local`, `.vercel`, `.next`, `node_modules`, ключи, логи или конфигурацию туннелей — всё это исключено из Git.

3. GitHub Actions проверяет lint, TypeScript и production-build для push в `main` и PR. Этот workflow **не** деплоит сайт и не требует секретов.

## 2. Vercel

1. В Vercel создайте **New Project** → **Import Git Repository** → выберите репозиторий сайта.
2. Framework: **Next.js** (автоопределение); Root Directory: **`./`**; Install Command: `npm ci`; Build Command: `npm run build`; Output Directory: **автоматическая настройка Next.js**, не задавайте `out`.
3. Node.js: **22.x** в настройках проекта. Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://mcpgo.ru` (Production); код также использует этот домен по умолчанию.
   - `NEXT_PUBLIC_DMG_URL` — **оставить незаполненной**, пока не появится проверенная публичная ссылка на подписанный и нотарифицированный DMG. Позже указать полную HTTPS-ссылку в Production и повторно задеплоить.
4. Настройте production branch = `main`. Vercel выполняет автоматический production deploy при push в `main`; PR/другие ветки получают preview. Отдельная GitHub Actions задача для публикации не нужна.
5. До переключения домена проверьте Vercel preview: `/`, `/career`, `/resume.pdf`, `/robots.txt`, `/sitemap.xml`, адаптивность и внешние ссылки.

## 3. Домен mcpgo.ru

1. Убедитесь, что домен принадлежит вам, и узнайте, у какого провайдера управляется DNS. **Не меняйте NS/DNS наугад.**
2. Vercel → Project → Settings → Domains → добавьте **`mcpgo.ru`** (основной адрес) и **`www.mcpgo.ru`** (перенаправление на основной).
3. В панели DNS-провайдера добавьте **именно те A/CNAME/TXT записи, которые Vercel показывает для домена**. Для корневого домена обычно нужна A-запись, для `www` — CNAME, иногда TXT для подтверждения. Если DNS остаётся у регистратора, не нужно переносить nameservers на Vercel.
4. После подтверждения DNS проверьте HTTPS/SSL, `mcpgo.ru` и перенаправление с `www` на `mcpgo.ru`, а также страницы `/career`, `/robots.txt` и `/sitemap.xml`.
5. Не меняйте существующие MX/TXT для почты и другие записи, не связанные с сайтом.

Официальные инструкции: https://vercel.com/docs/git/vercel-for-github и https://vercel.com/docs/domains/set-up-custom-domain.

## Перед публичной публикацией

- **Резюме и скриншот** в `public/` будут доступны любому посетителю и из публичного GitHub. Проверьте, что в `resume.pdf`, двух `resume-page-*.png` и `mcpgo-real-example.png` нет информации, которую вы не хотите публиковать.
- Сайт ссылается на другой репозиторий с приложением: `https://github.com/mcpgo1/McpGo`. Убедитесь, что он опубликован и ссылки на его документацию работают.
- Если релизного DMG ещё нет в открытом доступе, не указывайте `NEXT_PUBLIC_DMG_URL`: сайт оставит инструкцию без неработающей кнопки скачивания.
- После каждого изменения исходников перед публикацией: `npm ci && npm run check`.
