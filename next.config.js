/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: 'akamai',
    path: '',
  },
}

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};


