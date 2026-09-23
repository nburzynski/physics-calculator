import { useEffect } from "react";

const SITE_URL = "https://www.stemcalculate.com";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
};

export function SEO({
  title,
  description,
  canonicalPath = "",
  keywords = [],
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update title with STEMCalculate branding
    const fullTitle = title.includes("STEMCalculate")
      ? title
      : `${title} | STEMCalculate`;
    document.title = fullTitle;

    // Helper to set or create a meta tag
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

    // 2. Standard meta tags
    setMeta("description", description);
    if (keywords.length > 0) {
      setMeta("keywords", keywords.join(", "));
    }

    // 3. Open Graph tags — always use the canonical www domain
    const canonicalUrl = SITE_URL + canonicalPath;
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "STEMCalculate", true);
    setMeta("og:url", canonicalUrl, true);

    // 4. Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    // 5. Canonical link — always use www domain (not window.location.origin)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 6. JSON-LD Structured Data
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

export default SEO;
