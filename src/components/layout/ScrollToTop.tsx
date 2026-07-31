import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — Resets window scroll position to (0,0) on every route change.
 * Placed inside <BrowserRouter> so it has access to the router context.
 *
 * We use `window.scrollTo` with `behavior: 'instant'` so navigation feels
 * crisp and predictable — just like a native browser page load.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'instant' to avoid fighting with the smooth-scroll CSS global
    // while still being instant enough to feel like a page change.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
