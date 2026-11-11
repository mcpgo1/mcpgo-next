"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Copy, Download, Github } from "lucide-react";
import {
  WINDOWS_DOWNLOAD_URL, WINDOWS_INSTALLER, WINDOWS_RELEASE_API,
  WINDOWS_RELEASES_URL, WINDOWS_SHA256, WINDOWS_SHA256_URL, WINDOWS_TAG
} from "../windows-release";

type ReleaseAsset = { name?: unknown; size?: unknown };
type GitHubRelease = { tag_name?: unknown; draft?: unknown; prerelease?: unknown; assets?: unknown };
type Availability = { state: "checking" | "available" | "unavailable"; bytes?: number };

function releaseInstaller(value: GitHubRelease): ReleaseAsset | null {
  if (value?.tag_name !== WINDOWS_TAG || value?.draft !== false || value?.prerelease !== true ||
      !Array.isArray(value.assets)) return null;
  return (value.assets as ReleaseAsset[]).find(item =>
    item?.name === WINDOWS_INSTALLER && typeof item.size === "number" &&
    item.size > 10_000_000
  ) || null;
}

export function WindowsDownload() {
  const [availability, setAvailability] = useState<Availability>({ state: "checking" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 8000);
    fetch(WINDOWS_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
      signal: abort.signal
    })
      .then(async response => response.ok ? await response.json() as GitHubRelease : null)
      .then(release => {
        if (abort.signal.aborted) return;
        const asset = release ? releaseInstaller(release) : null;
        setAvailability(asset
          ? { state: "available", bytes: asset.size as number }
          : { state: "unavailable" });
      })
      .catch(() => { if (!abort.signal.aborted) setAvailability({ state: "unavailable" }); })
      .finally(() => clearTimeout(timer));
    return () => { abort.abort(); clearTimeout(timer); };
  }, []);

  const ready = availability.state === "available";
  return <div className="win-download-panel">
    <div className="win-download-heading">
      <span className="win-preview-badge">WINDOWS 11 · X64 · PREVIEW</span>
      <span className="win-availability" aria-live="polite">
        {ready ? "Публикация доступна" :
          availability.state === "checking" ? "Проверяем GitHub Releases…" :
          "Публикация ещё не подтверждена"}
      </span>
    </div>
    {ready ? <>
      <a href={WINDOWS_DOWNLOAD_URL} className="btn btn-primary win-download-action"
        target="_blank" rel="noopener noreferrer"
        data-umami-event="download_click" data-umami-event-placement="windows"
        data-umami-event-platform="windows" data-umami-event-file={WINDOWS_INSTALLER}>
        <Download size={19}/> Скачать McpGo для Windows (.exe) <ArrowUpRight size={17}/>
      </a>
      <p className="win-download-info"><CheckCircle2 size={15}/> Файл на GitHub Releases
        {availability.bytes ? " · " + Math.round(availability.bytes / 1024 / 1024) + " МиБ" : ""}
        {" · "}без платного сертификата
      </p>
    </> : <>
      <p className="win-download-pending">Установщик ещё не опубликован или GitHub временно недоступен.
        Не скачивай McpGo из сторонних источников: дождись публикации в официальном репозитории.</p>
      <a className="btn btn-secondary" href={WINDOWS_RELEASES_URL}
        target="_blank" rel="noopener noreferrer"
        data-umami-event="github_click" data-umami-event-placement="windows"
        data-umami-event-destination="releases"><Github size={18}/>
        Проверить GitHub Releases <ArrowUpRight size={16}/></a>
    </>}
    <div className="win-digest">
      <div className="win-digest-label">SHA-256 установщика</div>
      <code>{WINDOWS_SHA256}</code>
      <div className="win-digest-actions">
        <button type="button" disabled={!ready} onClick={async () => {
          try { await navigator.clipboard.writeText(WINDOWS_SHA256); setCopied(true); }
          catch { setCopied(false); }
        }}><Copy size={14}/>{copied ? "Скопировано" : "Копировать хеш"}</button>
        {ready && <a href={WINDOWS_SHA256_URL} target="_blank" rel="noopener noreferrer">
          Контрольная сумма на GitHub <ArrowUpRight size={14}/>
        </a>}
      </div>
      <small>Сверяй SHA-256 только с официальным опубликованным релизом.
        Совпадение хеша не заменяет цифровую подпись и не доказывает личность автора.</small>
    </div>
  </div>;
}
