/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Allows a second build/dev server to run beside an existing one: NEXT_DIST_DIR=.next-build yarn build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },

  turbopack: {
    root: __dirname,
    resolveAlias: {
      // Force a single copy of 'postprocessing'. @react-three/postprocessing could otherwise
      // resolve its own nested copy and `instanceof Effect` checks would fail across the two.
      postprocessing: './node_modules/postprocessing',
    },
    rules: {
      // GLSL shaders are imported as strings
      '*.{glsl,vs,fs,vert,frag}': { type: 'text' },
    },
  },

  async headers() {
    const immutable = { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' };
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      { source: '/fonts/(.*)', headers: [immutable] },
      { source: '/audio/(.*)', headers: [immutable] },
    ];
  },
};

module.exports = nextConfig;
