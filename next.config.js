/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: 'custom',
    formats: ['image/avif', 'image/webp'],
  },
}

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

