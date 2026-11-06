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

  webpack: (config) => {
    // Force a single copy of 'postprocessing'. @react-three/postprocessing bundles its own
    // nested copy; without this alias `instanceof Effect` checks fail across the two copies.
    config.resolve.alias = {
      ...config.resolve.alias,
      postprocessing: path.resolve(__dirname, 'node_modules/postprocessing'),
    };

    // GLSL shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
      );
    }

    return config;
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
