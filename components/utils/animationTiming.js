// /**
//  * Animation timing utilities for text animation components
//  */

// /**
//  * Calculate animation timers for loading in, loading out, and text appearance
//  * @param {Array} words - Array of words to animate
//  * @param {Object} options - Animation options
//  * @param {number} options.itemDuration - Duration of each item animation in seconds
//  * @param {number} options.itemGap - Gap between item animations in seconds
//  * @param {number} options.buffer - Buffer time after all loading spans appear in seconds
//  * @param {Function} setAnimationStep - Function to update animation step
//  * @returns {Object} - Object containing cleanup function and timers
//  */
// export const calculateAnimationTimers = (
//   words,
//   { itemDuration, itemGap, buffer },
//   setAnimationStep
// ) => {
//   if (words.length === 0) return { cleanup: () => {}, timers: [] };

//   // Reset animation step
//   setAnimationStep(0);

//   // Step 1: Animate loading spans in sequence
//   const loadingInTimers = words.map((_, index) => {
//     return setTimeout(() => {
//       setAnimationStep((prev) => {
//         if (prev === index) {
//           return index + 1;
//         }
//         return prev;
//       });
//     }, index * itemDuration * 1000); // Convert seconds to milliseconds
//   });

//   // Step 2: Animate loading spans out in sequence
//   const allLoadingCompleteTime =
//     words.length * itemDuration * 1000 + buffer * 1000; // Time for all loading spans to appear + buffer

//   const loadingOutTimers = words.map((_, index) => {
//     return setTimeout(() => {
//       setAnimationStep((prev) => {
//         if (prev === words.length + index) {
//           return words.length + index + 1;
//         }
//         return prev;
//       });
//     }, allLoadingCompleteTime + index * itemGap * 1000); // Start after all loading spans are visible
//   });

//   // Step 3: Animate text in sequence after each loading span has faded out
//   const textInTimers = words.map((_, index) => {
//     return setTimeout(() => {
//       setAnimationStep((prev) => {
//         if (prev === words.length * 2 + index) {
//           return words.length * 2 + index + 1;
//         }
//         return prev;
//       });
//     }, allLoadingCompleteTime + index * itemGap * 1000 + 0); // Start immediately after loading span starts fading out
//   });

//   // Combine all timers
//   const timers = [...loadingInTimers, ...loadingOutTimers, ...textInTimers];

//   // Return cleanup function
//   return {
//     cleanup: () => {
//       timers.forEach((timer) => clearTimeout(timer));
//     },
//     timers
//   };
// };

// /**
//  * Create animation sequence for text animation
//  * @param {Array} words - Array of words to animate
//  * @param {Object} options - Animation options
//  * @param {number} options.itemDuration - Duration of each item animation in seconds
//  * @param {number} options.itemGap - Gap between item animations in seconds
//  * @param {number} options.buffer - Buffer time after all loading spans appear in seconds
//  * @param {number} options.textDelay - Delay before text appears in seconds
//  * @param {Function} setAnimationStep - Function to update animation step
//  * @returns {Object} - Object containing cleanup function
//  */
// export const createAnimationSequence = (
//   words,
//   { itemDuration, itemGap, buffer, textDelay },
//   setAnimationStep
// ) => {
//   if (words.length === 0) return { cleanup: () => {} };

//   // Reset animation step
//   setAnimationStep(0);

//   // Calculate timers
//   const { cleanup, timers } = calculateAnimationTimers(
//     words,
//     { itemDuration, itemGap, buffer },
//     setAnimationStep
//   );

//   return { cleanup };
// }; 