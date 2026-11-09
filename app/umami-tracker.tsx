import Script from "next/script";

/** Public analytics identifier, not an API credential. Don't track the unlisted stats page. */
export function UmamiTracker() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  if (!websiteId) return null;

  return (
    <Script
      id="mcpgo-umami"
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      data-domains="mcpgo.ru,www.mcpgo.ru"
      strategy="afterInteractive"
    />
  );
}
