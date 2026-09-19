/**
 * Safe, privacy-preserving client analytics helper.
 * Integrates with Vercel Analytics or custom tracking when available.
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== "undefined" && (window as unknown as { va?: (event: string, data?: unknown) => void }).va) {
      (window as unknown as { va: (event: string, data?: unknown) => void }).va("event", {
        name: eventName,
        data: properties,
      });
    }
  } catch {
    // Silently ignore tracking errors in offline or privacy-blocked environments
  }
}

export function trackCalculatorUsage(formulaId: string, formulaName: string, subject?: string) {
  trackEvent("calculate_used", {
    formulaId,
    formulaName,
    subject: subject || "physics",
  });
}

export function trackSearchQuery(query: string, resultCount: number) {
  if (query.trim().length > 2) {
    trackEvent("search_performed", {
      query: query.trim(),
      results: resultCount,
    });
  }
}
