# Next.js + Contentful CMS

A modern content-driven website built with **Next.js 14**, **Contentful CMS**, **Tailwind CSS v4**, **Framer Motion**, and **WebGL** shader effects. Features a fully customizable theme editor, smooth page transitions, and WCAG AA accessible design.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://next-blog-contentful.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Contentful](https://img.shields.io/badge/Contentful-CMS-blue)](https://www.contentful.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Live Demo

**[https://next-blog-contentful.vercel.app/](https://next-blog-contentful.vercel.app/)**

## Features

- **Contentful CMS** -- Content managed via Contentful GraphQL API with rich text rendering, dynamic pages, articles, and tag-based filtering
- **Theme Editor** -- Real-time theme customization with 50+ preset themes covering typography, colors, layout, animations, and audio
- **WebGL Backgrounds** -- Native WebGL shader effects (water, halftone, noise, pixelation, dithering) with hardware-accelerated image rendering
- **Smooth Animations** -- Framer Motion page transitions, animated text, scroll-driven effects, and Lenis smooth scrolling
- **Responsive Design** -- Mobile-first 12-column grid system with responsive breakpoints
- **Audio Feedback** -- Configurable UI sound effects for interactive elements
- **Accessibility** -- WCAG AA compliant with skip links, keyboard navigation, focus management, reduced motion support, and color contrast checking
- **Performance** -- Static site generation (SSG), incremental static regeneration (ISR), image optimization, and bundle analysis

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| CMS | Contentful (GraphQL API) |
| Styling | Tailwind CSS v4, Sass |
| Animation | Framer Motion, Lenis |
| 3D / WebGL | Three.js, React Three Fiber |
| Deployment | Vercel |
| Language | JavaScript (React 18) |

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (recommended) or npm
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
CONTENTFUL_SPACE_ID=your_space_id CONTENTFUL_MANAGEMENT_TOKEN=your_token npm run setup
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
│   ├── context/        # React context providers (theme, menu, route, toast)
│   ├── footer/         # Footer variants (default, format, ondo)
│   ├── motion/         # Animation wrapper components
│   ├── navigation/     # Primary navigation and audio utilities
│   ├── security/       # Password protection components
│   ├── transition/     # Page transition effects
│   └── utils/          # Component utilities and accessibility helpers
├── contentful/         # Contentful setup script and content model export
├── lib/                # API client and data-fetching utilities
├── pages/              # Next.js pages and API routes
├── public/             # Static assets (fonts, icons, audio, textures)
├── shaders/            # GLSL shader source files
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
| `yarn format` | Format code with Prettier |
| `yarn setup` | Import Contentful content model |
| `yarn analyze` | Build with bundle analyzer |
| `yarn lighthouse` | Run Lighthouse performance audit |

## Theme System

The built-in theme editor allows real-time customization of:

- **Colors** -- Background, text, accent, and surface colors
- **Typography** -- Font family, size, weight, and spacing
- **Layout** -- Grid positioning, content width, and alignment
- **Animations** -- Transition types, duration, and easing
- **Audio** -- Sound effects and volume
- **Background** -- WebGL shader effects or image backgrounds

Themes can be saved to Contentful and loaded per-page.

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Static Export

```bash
yarn build
```

The site uses SSG by default and can be deployed to any static hosting provider.

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
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lenis](https://lenis.studiofreight.com/) for smooth scrolling
