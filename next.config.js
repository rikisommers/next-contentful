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

// module.exports = {
//   webpack: (config, options) => {
//     const originalEntry = config.entry;
//     config.entry = async () => {
//       const entries = await originalEntry();

//       if (entries['app.js']) {
//         // Load polyfills only in the client and if required
//         if (!options.isServer) {
//           const supportsPopoverAPI = 'HTMLPopoverElement' in window;
//           const supportsAnchorPositioning = 'anchorName' in document.documentElement.style;

//           // Log the support status to the console
//           console.log('Supports Popover API:', supportsPopoverAPI);
//           console.log('Supports CSS Anchor Positioning:', supportsAnchorPositioning);

//           // Check if either feature is not supported
//           if (!supportsPopoverAPI || !supportsAnchorPositioning) {
//             if (!entries['app.js'].includes('./pages/polyfills/polyfills.js')) {
//               entries['app.js'].unshift('./pages/polyfills/polyfills.js');
//             }
//           }
//         }
//       }

//       return entries;
//     };

//     // Optional: Add any additional Webpack configurations here
//     return config;
//   },
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// };
