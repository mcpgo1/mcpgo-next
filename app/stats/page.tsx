import type { Metadata } from "next";
import "./stats.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, BarChart3, ChartNoAxesCombined, ExternalLink, Github, Globe2, LockKeyholeOpen, ShieldOff, Sparkles } from "lucide-react";
import { publicPath } from "../site-path";

const allowedHosts = new Set(["cloud.umami.is"]);

function getPublicShareUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname) || !url.pathname.includes("/share/")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const shareUrl = getPublicShareUrl();
const eventsUrl = shareUrl ? `${shareUrl.replace(/\/$/, "")}/events` : null;

export const metadata: Metadata = {
  title: "Статистика посещений",
  description: "Публичная страница аналитики посещений McpGo.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

export default function StatsPage() {
  return (
    <div className="stats-shell">
      <div className="stats-glow" aria-hidden="true" />
      <main className="stats-container">
        <div className="stats-topbar">
          <Link href="/" className="stats-brand" aria-label="McpGo — на главную">
            <span className="stats-brand-icon"><Image src={publicPath("/mcpgo-mark.svg")} alt="" width={38} height={38} unoptimized /></span>
            <span>Mcp<span>Go</span><small>WEB ANALYTICS</small></span>
          </Link>
          <Link href="/" className="stats-home-link"><ArrowLeft size={16} aria-hidden="true" /> На сайт</Link>
        </div>

        <header className="stats-intro">
          <div className="stats-kicker"><ChartNoAxesCombined size={15} aria-hidden="true" /> АНАЛИТИКА ПРОЕКТА <span className="stats-slash">{"//"}</span> McpGo.ru</div>
          <h1>Статистика <span>посещений.</span></h1>
          <p>Реальная посещаемость сайта: просмотры, уникальные посетители, источники переходов, популярные страницы и динамика трафика.</p>
          <div className="stats-meta">
            <span><span className="stats-live-dot" /> Данные Umami Cloud</span>
            <span><Globe2 size={15} aria-hidden="true" /> mcpgo.ru</span>
            <span><LockKeyholeOpen size={15} aria-hidden="true" /> Доступ по ссылке</span>
          </div>
        </header>

        <div className="stats-section-label"><ArrowDownToLine size={17} aria-hidden="true" /><span>КЛИКИ ПО КНОПКАМ</span><span className="stats-label-line" /></div>
        <div className="stats-action-summary">
          <div className="stats-action-tile"><span className="stats-action-icon"><ArrowDownToLine size={20} aria-hidden="true" /></span><div><strong>Скачивание McpGo</strong><span>Событие <code>download_click</code> · две кнопки DMG</span></div></div>
          <div className="stats-action-tile"><span className="stats-action-icon"><Github size={20} aria-hidden="true" /></span><div><strong>Переходы на GitHub</strong><span>Событие <code>github_click</code> · репозиторий, документация, Issues</span></div></div>
        </div>
        {eventsUrl ? (
          <section className="stats-dashboard stats-events-dashboard" aria-label="Количество кликов по скачиванию и GitHub">
            <div className="stats-dashboard-head"><div><span className="stats-dashboard-eyebrow">CLICKS / EVENTS</span><strong>Нажатия и источники кликов</strong></div><a className="stats-open-link" href={eventsUrl} target="_blank" rel="noopener noreferrer nofollow"><ExternalLink size={15} aria-hidden="true" /> Открыть события</a></div>
            <iframe src={eventsUrl} title="Клики по скачиванию McpGo и по GitHub — события Umami" className="stats-embed stats-events-embed" loading="eager" referrerPolicy="no-referrer" />
            <p className="stats-embed-footnote">Количество нажатий смотри в разделе Events. Вкладка Properties показывает, где нажали кнопку. Учитываются клики, а не подтверждённые скачивания файла. Данные собираются с момента публикации счётчика.</p>
          </section>
        ) : null}

        <div className="stats-section-label stats-traffic-heading"><BarChart3 size={17} aria-hidden="true" /><span>ОБЗОР ТРАФИКА</span><span className="stats-label-line" /></div>
        <section className="stats-dashboard" aria-label="Статистика посещений сайта">
          {shareUrl ? (
            <>
              <div className="stats-dashboard-head">
                <div><span className="stats-dashboard-eyebrow">LIVE DATA</span><strong>Посещения и аудитория</strong></div>
                <a className="stats-open-link" href={shareUrl} target="_blank" rel="noopener noreferrer nofollow"><ExternalLink size={15} aria-hidden="true" /> Открыть отчёт отдельно</a>
              </div>
              <iframe
                src={shareUrl}
                title="Статистика посещений McpGo — Umami"
                className="stats-embed"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <p className="stats-embed-footnote">Отчёт обновляется сервисом Umami. Для выбора периода, просмотра источников трафика и страниц используй панель внутри блока.</p>
            </>
          ) : (
            <div className="stats-empty">
              <div className="stats-empty-icon"><Sparkles size={25} aria-hidden="true" /></div>
              <strong>Подключаем статистику</strong>
              <p>Страница готова. Отчёт появится здесь после подключения публичной ссылки Umami Cloud. Пока данные не подключены, счётчики не подменяются демонстрационными цифрами.</p>
            </div>
          )}
        </section>

        <footer className="stats-footer">
          <div><ShieldOff size={16} aria-hidden="true" /> Страница не указана в меню и закрыта от индексации. Она не защищена паролем.</div>
          <span>© McpGo · Аналитика без персональных данных</span>
          <Link href="/" className="stats-footer-link">На главную <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </footer>
      </main>
    </div>
  );
}
