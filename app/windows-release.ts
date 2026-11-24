/**
 * The Windows release is intentionally a GitHub prerelease. Downloads are
 * enabled only when the public release API confirms the expected installer.
 * The digest must be updated from the final independently audited build.
 */
export const WINDOWS_VERSION = "2.1.0-preview.8";
export const WINDOWS_TAG = "v" + WINDOWS_VERSION;
export const WINDOWS_INSTALLER = "McpGo.Setup." + WINDOWS_VERSION + ".exe";
export const WINDOWS_SHA256 = "1586c67cebe9797f18e43654c45066c9e69047a8ee2ba1fafb4f6f1571276545";
export const WINDOWS_REPOSITORY = "https://github.com/mcpgo1/McpGo";
export const WINDOWS_RELEASE_URL = WINDOWS_REPOSITORY + "/releases/tag/" + WINDOWS_TAG;
export const WINDOWS_RELEASES_URL = WINDOWS_REPOSITORY + "/releases";
export const WINDOWS_DOWNLOAD_URL =
  WINDOWS_REPOSITORY + "/releases/download/" + WINDOWS_TAG + "/" +
  encodeURIComponent(WINDOWS_INSTALLER);
export const WINDOWS_SHA256_URL = WINDOWS_DOWNLOAD_URL + ".sha256";
export const WINDOWS_RELEASE_API =
  "https://api.github.com/repos/mcpgo1/McpGo/releases/tags/" + WINDOWS_TAG;
