import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * Periodically invalidate the router to trigger a session refresh.
 *
 * The root route's `beforeLoad` calls `fetchSession` which runs
 * `ensureFreshAccessToken` server-side. Without periodic invalidation
 * the access token expires (~5 min) while the user idles on a page,
 * causing the next server call to fail.
 *
 * This hook invalidates the router on a fixed interval **and** when the
 * window regains focus after being hidden, so the token stays fresh.
 *
 * @param intervalMs - Refresh interval in milliseconds (default: 4 min)
 */
function useSessionRefresh(intervalMs = 4 * 60 * 1000) {
  const router = useRouter();
  const lastRefresh = useRef(Date.now());

  useEffect(() => {
    const refresh = () => {
      lastRefresh.current = Date.now();
      router.invalidate();
    };

    // Periodic refresh while the tab is active
    const id = setInterval(refresh, intervalMs);

    // Refresh on tab re-focus if enough time has passed
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const elapsed = Date.now() - lastRefresh.current;
      // Refresh if more than half the interval has elapsed
      if (elapsed > intervalMs / 2) {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [router, intervalMs]);
}

export default useSessionRefresh;
