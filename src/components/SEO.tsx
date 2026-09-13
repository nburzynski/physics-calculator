import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
};

export default function SEO({
  title,
  description,
  canonicalPath = "",
  keywords = [],
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | OCR A-Level Physics Calculator`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // 2. Standard Meta Tags
    setMeta("description", description);
    if (keywords.length > 0) {
      setMeta("keywords", keywords.join(", "));
    }

    // 3. Open Graph Tags
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    const siteUrl = window.location.origin + canonicalPath;
    setMeta("og:url", siteUrl, true);

    // 4. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;

    // 5. JSON-LD Structured Data
    const scriptId = "seo-json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonicalPath, keywords, structuredData]);

  return null;
}
