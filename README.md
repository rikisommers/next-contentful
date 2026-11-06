# Next.js + Contentful CMS

A modern content-driven website built with **Next.js 16**, **React 19**, **Contentful CMS**, **Tailwind CSS v4**, **Motion**, and **WebGL** shader effects. Features a developer theme editor with sensible defaults, smooth page transitions, and WCAG AA accessible design.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://next-blog-contentful.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Contentful](https://img.shields.io/badge/Contentful-CMS-blue)](https://www.contentful.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Live Demo

**[https://next-blog-contentful.vercel.app/](https://next-blog-contentful.vercel.app/)**

## Features

- **Contentful CMS** -- Content managed via Contentful GraphQL API with rich text rendering, dynamic pages, articles, and tag-based filtering
- **Theme Editor** -- Development-only, real-time theme customization (typography, colors, layout, animations, audio). Every theme key has a default, so partial or empty CMS themes render well
- **WebGL Backgrounds** -- Native WebGL shader effects (water, halftone, noise, pixelation, dithering) with hardware-accelerated image rendering
- **Smooth Animations** -- Motion page transitions, animated text, scroll-driven effects, and Lenis smooth scrolling
- **Responsive Design** -- Mobile-first 12-column grid system with responsive breakpoints
- **Audio Feedback** -- Configurable UI sound effects for interactive elements
- **Accessibility** -- WCAG AA compliant with skip links, keyboard navigation, focus management, reduced motion support, and color contrast checking
- **SEO and performance** -- Server-rendered content and metadata, JSON-LD, generated Open Graph images, sitemap, robots and RSS, ISR with on-demand revalidation, Contentful image resizing

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (Pages Router, Turbopack) |
| CMS | Contentful (GraphQL API) |
| Styling | Tailwind CSS v4, Sass |
| Animation | Motion, Lenis |
| 3D / WebGL | Three.js, React Three Fiber |
| Deployment | Vercel |
| Language | TypeScript (incremental, `allowJs`) and JavaScript, React 19 |

## Getting Started

### Prerequisites

- Node.js 20.9+
- Yarn 4 (`corepack enable`)
- A [Contentful](https://www.contentful.com/) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/cms-contentful-app.git
cd cms-contentful-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Copy the example environment file and fill in your Contentful credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `CONTENTFUL_SPACE_ID` | Your Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token |

See [`.env.example`](.env.example) for all available options including preview mode, revalidation webhooks, and password protection.

### 4. Set up Contentful content model

Import the content model into your Contentful space:

```bash
CONTENTFUL_SPACE_ID=your_space_id CONTENTFUL_MANAGEMENT_TOKEN=your_token yarn setup
```

This uses the content model defined in [`contentful/export.json`](contentful/export.json).

### 5. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
cms-contentful-app/
├── components/
│   ├── base/           # Reusable UI components (buttons, forms, modals)
│   ├── blocks/         # Content block components (hero, article, code, etc.)
│   ├── background/     # WebGL canvas and shader effects
│   ├── context/        # React context providers (theme, menu, route, toast, cursor)
│   ├── footer/         # Footer variants (default, format, ondo)
│   ├── motion/         # Animation wrapper components
│   ├── navigation/     # Primary navigation and audio utilities
│   ├── security/       # Password protection components
│   ├── transition/     # Page transition effects
│   └── utils/          # Component utilities and accessibility helpers
├── contentful/         # Contentful setup script and content model export
├── lib/                # Contentful client and queries, site config, sitemap/robots/RSS builders
├── pages/              # Next.js pages and API routes
├── public/             # Static assets (fonts, icons, audio, textures)
├── styles/             # Global styles and SCSS
└── utils/              # Theme system, theme editor, and configuration
```

## Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Run the TypeScript compiler |
| `yarn test` | Run unit tests (Vitest) |
| `yarn test:e2e` | Run Playwright accessibility tests |
| `yarn format` | Format code with Prettier |
| `yarn setup` | Import Contentful content model |
| `yarn analyze` | Next.js bundle analyzer |

## Theme System

The theme editor (development only: `yarn dev`) allows real-time customization of:

- **Colors** -- Background, text, accent, and surface colors
- **Typography** -- Font family, size, weight, and spacing
- **Layout** -- Grid positioning, content width, and alignment
- **Animations** -- Transition types, duration, and easing
- **Audio** -- Sound effects and volume
- **Background** -- WebGL shader effects or image backgrounds

Themes are saved to Contentful from the editor; the saved current theme is what visitors see. Themes are merged over `DEFAULT_THEME` (`utils/themes/config/default-theme.ts`), so missing values fall back to safe defaults (sound off, no custom cursor, system fonts). The editor's API routes use the Contentful management token and respond 404 outside development.

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

Set `NEXT_PUBLIC_SITE_URL` to the production URL so canonical links, the sitemap and structured data are correct. Preview deployments are served with `Disallow: /` in `robots.txt`.

The site relies on ISR and server-rendered `sitemap.xml`, `robots.txt` and `feed.xml`, so it needs a Node host such as Vercel, not a static export.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [Contentful](https://www.contentful.com/) for the headless CMS
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Motion](https://motion.dev/) for animations
- [Lenis](https://lenis.studiofreight.com/) for smooth scrolling
