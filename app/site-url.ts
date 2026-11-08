// The production domain stays canonical even before the Vercel project is linked.
// Override only when deploying this site under another real public URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://mcpgo.ru").replace(/\/+$/, "");
