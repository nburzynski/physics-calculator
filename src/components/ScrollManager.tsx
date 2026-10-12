import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollManager handles scroll positioning during navigation:
 * 1. For forward navigations (PUSH/REPLACE) without a hash, scrolls to the top of the page.
 * 2. For navigations with a hash anchor (#calculator, #suvat, etc.), scrolls smoothly to the target element,
 *    accounting for the exact height of the sticky header.
 * 3. Handles lazy-loaded routes by retrying element discovery.
 * 4. Preserves native browser scroll restoration during back/forward (POP) navigation without a hash.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    // Enable browser's native scroll restoration for history back/forward
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  useEffect(() => {
    const isNewRoute = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;

    // If navigating to a new route via PUSH/REPLACE, immediately reset scroll
    // to top so the previous page's scroll position never flashes or leaks into the new page.
    if (isNewRoute && navigationType !== "POP" && !hash) {
      window.scrollTo(0, 0);
      return;
    }

    if (hash) {
      // Immediately reset if entering a new page to avoid being stuck at the bottom
      if (isNewRoute && navigationType !== "POP") {
        window.scrollTo(0, 0);
      }

      const targetId = decodeURIComponent(hash.replace(/^#/, ""));
      if (!targetId) return;

      let attempts = 0;
      const maxAttempts = 25; // 25 * 50ms = 1.25 seconds for lazy-loaded route chunks
      let timerId: number | null = null;

      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // Account for sticky header height dynamically
          const header = document.querySelector(".site-header");
          const headerHeight = header
            ? header.getBoundingClientRect().height
            : window.innerWidth <= 700 ? 140 : 80;
          
          const elementRect = element.getBoundingClientRect();
          const targetY = Math.max(0, window.pageYOffset + elementRect.top - headerHeight - 16);

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        } else if (attempts < maxAttempts) {
          attempts += 1;
          timerId = window.setTimeout(scrollToTarget, 50);
        }
      };

      // Defer to next frame so DOM can render
      requestAnimationFrame(() => {
        scrollToTarget();
      });

      return () => {
        if (timerId !== null) {
          clearTimeout(timerId);
        }
      };
    }
  }, [pathname, hash, navigationType]);

  return null;
}

export default ScrollManager;
