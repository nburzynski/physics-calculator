import fs from "fs";
import path from "path";
import { formulas } from "../src/data/formulas";
import { TOPICS } from "../src/data/topics";

const now = "2026-10-23";
const domain = "https://www.stemcalculate.com";

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/formulas</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/calculators</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/formula-finder</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

for (const topic of TOPICS) {
  xml += `  <url>
    <loc>${domain}/topics/${topic.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

for (const formula of formulas) {
  xml += `  <url>
    <loc>${domain}/formulas/${formula.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>
`;

const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf-8");
console.log(`Generated sitemap.xml with ${4 + TOPICS.length + formulas.length} URLs.`);
