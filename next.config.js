/** @type {import('next').NextConfig} */
const path = require('path');

// Error filtering for development
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('inpage.js') || 
       args[0].includes('Unexpected token') ||
       args[0].includes('Failed to load resource'))
    ) {
      return; // suppress known development-only errors
    }
    originalError.apply(console, args);
  };
}

const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
    domains: ['images.ctfassets.net'], // Add Contentful domain
  },
  swcMinify: false,
  experimental: {
    optimizeCss: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/{{member}}",
    },
  },
  webpack: (config, { dev, isServer }) => {
    // GLSL shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    // Optimize builds
    if (!dev && !isServer) {
      // Enable terser for production builds
      config.optimization.minimize = true;
    }

    // Handle specific file types
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },
  // Add rewrites for API endpoints if needed
  async rewrites() {
    return [];
  },
  // Add redirects if needed
  async redirects() {
    return [];
  },
  // Environment variables that should be available to the browser
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    SPACE: process.env.SPACE,
  },
  // Increase build time if needed
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;