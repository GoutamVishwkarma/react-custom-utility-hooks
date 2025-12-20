import { useEffect } from "react";

/**
 * useVersionReloadOnLoad
 *
 * Purpose:
 * - Checks the deployed app version ONLY when the app is opened.
 * - If a newer version is detected, the page reloads automatically.
 *
 * How it works:
 * - Fetches `/version.json` (updated on every deploy)
 * - Compares it with the version stored in localStorage
 * - Reloads the page if versions differ
 *
 * Usage:
 * - Call this hook ONCE in your root component (App.tsx)
 * - No polling, no intervals
 * - Ideal for production React SPAs
 *
 * Requirements:
 * - A `version.json` file in the public folder
 * - Version must change on each deployment
 */

export function useVersionReloadOnLoad() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        const { version } = await res.json();

        const storedVersion = localStorage.getItem("app_version");

        // First app load → store version
        if (!storedVersion) {
          localStorage.setItem("app_version", version);
          return;
        }

        // New deploy detected → reload app
        if (storedVersion !== version) {
          localStorage.setItem("app_version", version);
          window.location.reload();
        }
      } catch {
        // Fail silently (do not block app)
      }
    };

    checkVersion();
  }, []);
}

function App() {
  useVersionReloadOnLoad(); // must be called once

  return <YourApp />;
}
