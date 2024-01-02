/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
  },
}

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};


