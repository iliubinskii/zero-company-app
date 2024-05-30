import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Use loading cursor effect on route change.
 */
// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Remake for Next.js 13
export function useLoadingCursor(): void {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (): void => {
      document.body.classList.add("app-loading");
    };

    const handleComplete = (): void => {
      document.body.classList.remove("app-loading");
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
}
