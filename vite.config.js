import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_URL = 'https://www.empyreanbeautyparlor.com';

// Keep in step with the <Route>s in src/App.jsx.
const PAGES = ['/', '/about', '/pricing', '/gallery', '/blog', '/contact'];

// Generated at build time rather than committed to public/, because blog posts
// are added through the CMS — a static file would silently miss every new one.
// blog.json is read from disk, not imported, so each build sees the latest
// commit rather than a cached module.
function sitemap() {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const blogFile = new URL('./src/content/blog.json', import.meta.url);
      const { posts } = JSON.parse(readFileSync(blogFile, 'utf8'));

      const urls = [
        ...PAGES.map((path) => ({ loc: SITE_URL + path })),
        ...posts.map((post) => ({
          loc: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
          lastmod: post.date,
        })),
      ];

      const entries = urls
        .map(({ loc, lastmod }) =>
          lastmod
            ? `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
            : `  <url><loc>${loc}</loc></url>`,
        )
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
  server: { port: 5173, open: true },
});
