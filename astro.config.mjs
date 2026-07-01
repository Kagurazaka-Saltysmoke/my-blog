// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tinacms from '@tinacms/astro';

export default defineConfig({
  site: 'https://blog.saltysmoke.org',
  adapter: cloudflare(),
  integrations: [tinacms(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
