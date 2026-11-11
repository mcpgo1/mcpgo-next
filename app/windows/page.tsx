import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, ShieldAlert, Terminal, MonitorDown, ShieldCheck, ExternalLink } from "lucide-react";
import { Brand } from "../components";
import { UmamiTracker } from "../umami-tracker";
import { WindowsDownload } from "./download-client";
import { WINDOWS_INSTALLER, WINDOWS_RELEASES_URL, WINDOWS_VERSION } from "../windows-release";
import "./windows.css";

export const metadata: Metadata = {
  title: "McpGo для Windows 11 — бесплатная Preview-версия",
  description: "Установщик McpGo для Windows 11 x64. Бесплатный open-source, GitHub Releases, SHA-256 и инструкции для неподписанного .exe.",
  alternates: { canonical: "https://mcpgo.ru/windows/" }
};

export default function WindowsPage() {
  return <main className="windows-page">
    <UmamiTracker/>
    <div className="win-shell">
      <header className="win-header">
        <Brand/>
        <Link href="/" className="win-home"><ArrowLeft size={16}/> На главную</Link>
      </header>
      <div className="win-hero">
        <div className="section-eyebrow"><span className="slash">{"//"}</span> WINDOWS PREVIEW / БЕСПЛАТНО</div>
        <h1>Твой ChatGPT.<br/><span className="gradient-word">Теперь и на Windows.</span></h1>
        <p>McpGo запускает локальные инструменты на твоём компьютере: PowerShell,
          файлы, браузер Chrome или Edge, несколько агентов и расписания.
          Не требуется отдельная установка Node.js или Python.</p>
        <div className="win-meta">
          <span><MonitorDown size={15}/> Windows 11 · x64</span>
          <span><Terminal size={15}/> {WINDOWS_VERSION}</span>
          <span><Github size={15}/> Открытый код · MIT</span>
        </div>
      </div>
      <WindowsDownload/>
      <div className="win-note"><ShieldAlert size={21}/><div>
        <strong>Это неподписанная тестовая версия, а не стабильный релиз.</strong>
        <p>Реальные пользовательские сценарии на Windows ещё нуждаются в проверке.
          Windows может показывать предупреждение об неизвестном издателе
          или блокировать запуск. Мы не предлагаем отключать системную защиту.</p>
      </div></div>

      <section className="win-section">
        <div className="section-eyebrow"><span className="slash">{"//"}</span> УСТАНОВКА</div>
        <h2>Как установить безопаснее</h2>
        <div className="win-steps">
          <article><span>01</span><h3>Скачай с GitHub</h3>
            <p>Используй кнопку выше. Убедись, что ссылка ведёт на
              <strong> github.com/mcpgo1/McpGo</strong>, а имя файла —
              <code> {WINDOWS_INSTALLER}</code>.</p></article>
          <article><span>02</span><h3>Сверь SHA-256</h3>
            <p>Открой PowerShell в папке «Загрузки» и выполни команду.
              Сравни результат с хешем выше и файлом контрольной суммы в GitHub Releases.</p>
            <pre><code>Get-FileHash -LiteralPath &apos;.\{WINDOWS_INSTALLER}&apos; -Algorithm SHA256</code></pre>
          </article>
          <article><span>03</span><h3>Оцени предупреждение Windows</h3>
            <p>SmartScreen может сообщить «Неизвестный издатель». Проверь источник и хеш;
              решение о запуске принимаешь ты. Не отключай SmartScreen, Smart App Control,
              антивирус или корпоративные политики. Если запуск запрещён политикой устройства,
              не пытайся обходить ограничение.</p>
          </article>
          <article><span>04</span><h3>Настрой подключение</h3>
            <p>В приложении создай два Secure MCP Tunnels с явным подтверждением
              или введи существующие. Для браузерных инструментов понадобится
              расширение Playwright MCP в личном Chrome/Edge.</p>
          </article>
        </div>
      </section>
      <section className="win-safety">
        <div><ShieldCheck size={26}/><h2>Почему нет подписи?</h2></div>
        <p>McpGo распространяется бесплатно. Пока проект не покупает коммерческий сертификат.
          SHA-256 помогает проверить целостность файла, но <strong>не подтверждает издателя</strong>.
          Приложение не отключает защиту Windows и не выполняет скрытое самообновление.
          Проверка новой версии открывает официальный GitHub Releases для ручного скачивания.</p>
      </section>
      <footer className="win-footer">
        <Link href="/">McpGo · На главную</Link>
        <a href={WINDOWS_RELEASES_URL} target="_blank" rel="noopener noreferrer">
          Все релизы на GitHub <ExternalLink size={14}/>
        </a>
        <span>Open source · MIT · Windows Preview</span>
      </footer>
    </div>
  </main>;
}
