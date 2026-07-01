# ~/blog — Astro + Keystatic Personal Blog

A modern, minimal, performant personal blog powered by [Astro 7](https://astro.build) and [Keystatic](https://keystatic.com), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## ✨ Features

- **Astro 7** — latest stable, static site generation, zero JS by default
- **Keystatic CMS** — git-based, local-first Markdown editor with a nice UI
- **TypeScript** — strict mode, end-to-end type safety
- **Markdown + Code Highlighting** — Shiki-powered syntax highlighting (github-dark theme)
- **RSS Feed** — auto-generated `/rss.xml`
- **Sitemap** — auto-generated `/sitemap-index.xml`
- **Tags** — filter posts by tag (`/blog/tag/astro`)
- **Dark Mode** — system-aware + manual toggle, no flash of wrong theme
- **Responsive Design** — mobile-first, clean typography
- **SEO** — Open Graph, Twitter Cards, canonical URLs, semantic HTML
- **Images** — `public/images/` directory, future-ready for Cloudflare R2 migration
- **Pages** — Home, Blog list, Blog detail, About, Tag filter

## 🚀 Quick Start

```bash
# Install dependencies (use --legacy-peer-deps for Astro 7 + Keystatic)
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Start Keystatic CMS (separate terminal, for content editing)
npm run keystatic
```

Open **http://localhost:4321** for the blog, then open Keystatic at its own URL to edit content.

## 📁 Project Structure

```
my-blog/
├── astro.config.mjs          # Astro config (site URL, markdown, integrations)
├── keystatic.config.ts       # Keystatic CMS config (collections, fields)
├── tsconfig.json             # TypeScript config
├── package.json
├── public/
│   ├── favicon.svg
│   └── images/               # Blog images (future: migrate to R2)
├── src/
│   ├── content.config.ts     # Astro content collections (loader + schema)
│   ├── content/posts/        # Markdown blog posts (managed by Keystatic)
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base HTML layout with header/footer
│   ├── components/
│   │   ├── Header.astro      # Sticky header with navigation
│   │   ├── Footer.astro      # Site footer
│   │   ├── SEO.astro         # SEO meta tags (OG, Twitter, canonical)
│   │   ├── ThemeToggle.astro # Dark/light mode toggle
│   │   ├── ThemeScript.astro # Inline script to prevent theme flash
│   │   ├── PostCard.astro    # Blog post preview card
│   │   └── TagBadge.astro    # Tag pill component
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro       # About page
│   │   ├── rss.xml.ts        # RSS feed endpoint
│   │   └── blog/
│   │       ├── index.astro   # All posts list
│   │       ├── [slug].astro  # Single post detail
│   │       └── tag/[tag].astro # Tag filter page
│   └── styles/
│       └── global.css        # Global styles + CSS custom properties theme
└── dist/                     # Build output (deploy this)
```

## 🛠 Local Development

```bash
# Start Astro dev server (hot reload, no CMS)
npm run dev
# → http://localhost:4321

# Start Keystatic CMS (separate terminal)
npm run keystatic
# → Opens local Keystatic admin UI for editing posts

# Build for production
npm run build
# → Output in dist/

# Preview production build locally
npm run preview
```

### Editing Content with Keystatic

1. Run `npm run keystatic` in one terminal
2. Open the Keystatic admin UI (URL shown in terminal)
3. Create/edit blog posts with the rich Markdown editor
4. Changes are saved directly to `src/content/posts/*.md`
5. Commit and push to deploy

**Or edit `.md` files directly** — Keystatic stores everything as plain Markdown with YAML frontmatter. No lock-in.

## ⚙️ Configuration

### 1. Site URL

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-domain.com',  // ← Change this
  // ...
});
```

### 2. Personal Info

Edit the hero section in `src/pages/index.astro` and the About page in `src/pages/about.astro`.

### 3. Blog Post Frontmatter

Every post in `src/content/posts/` uses this format:

```yaml
---
title: Your Post Title
publishedAt: 2026-07-01
updatedAt: 2026-07-15       # optional
description: A short description for SEO and previews
tags:
  - tag-one
  - tag-two
draft: false                  # true = excluded from production builds
image: /images/cover.png      # optional cover image
---
Your markdown content here...
```

## 🚢 Deploy to Cloudflare Pages

### Option A: Via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial blog setup"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create
   - Connect your GitHub repository
   - Configure build settings:

   | Setting | Value |
   |---------|-------|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node.js version | `22.x` (or latest) |

3. **Set environment variables** (if using GitHub OAuth for Keystatic):
   - None required for basic blog — Keystatic runs locally only

4. **Deploy** — Cloudflare automatically builds and deploys on every push to `main`.

### Option B: Via Wrangler CLI

```bash
npx wrangler pages deploy dist --project-name=my-blog
```

## 🔮 Future: Cloudflare R2 for Images

To migrate images from `public/images/` to R2:

1. Create an R2 bucket in Cloudflare Dashboard
2. Upload images to R2 (via dashboard or `wrangler r2`)
3. Bind R2 to your Pages project (Settings → Functions → R2 bindings)
4. Update image paths in posts to use R2 public URLs
5. Optionally use Cloudflare Image Resizing for responsive images

No code changes needed in the blog itself — just update the image URLs in frontmatter.

## 📝 Dependencies

| Package | Purpose |
|---------|---------|
| `astro` | Static site generator |
| `@keystatic/core` | Git-based CMS |
| `@astrojs/rss` | RSS feed generation |
| `@astrojs/sitemap` | Sitemap generation |
| `@astrojs/markdown-remark` | Legacy markdown engine (needed alongside Astro 7) |
| `react` / `react-dom` | Required by Keystatic UI |
| `sharp` | Image optimization |

## 📄 License

MIT — do whatever you want with this.
