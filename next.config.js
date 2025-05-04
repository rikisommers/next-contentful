/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  images: {
    loader: 'akamai',
    path: '',
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
};