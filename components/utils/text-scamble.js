// import { useEffect, useState } from "react";

// const TextScramble = ({ content }) => {
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     const el = document.querySelector(".text");
//     const chars = "!<>-_\\/[]{}—=+*^?#________";
//     const phrases = content;
//     let currentPhraseIndex = 0;
//     let resolve, queue, frameRequest, frame;

//     const setText = (newText) => {
//       const oldText = el.innerText;
//       const length = Math.max(oldText.length, newText.length);
//       const promise = new Promise((res) => (resolve = res));
//       queue = [];
//       for (let i = 0; i < length; i++) {
//         const from = oldText[i] || "";
//         const to = newText[i] || "";
//         const start = Math.floor(Math.random() * 40);
//         const end = start + Math.floor(Math.random() * 40);
//         queue.push({ from, to, start, end });
//       }
//       cancelAnimationFrame(frameRequest);
//       frame = 0;
//       update();
//       return promise;
//     };

//     const update = () => {
//       let output = "";
//       let complete = 0;
//       const animationDuration = 60; // 60 frames for 1 second animation
//       for (let i = 0, n = queue.length; i < n; i++) {
//         let { from, to, start, end, char } = queue[i];
//         if (frame >= end) {
//           complete++;
//           output += to;
//         } else if (frame >= start) {
//           if (!char || Math.random() < 0.28) {
//             char = randomChar();
//             queue[i].char = char;
//           }
//           output += `<span className="dud">${char}</span>`;
//         } else {
//           output += from;
//         }
//       }
//       el.innerHTML = output;
//       if (complete === queue.length) {
//         resolve();
//       } else {
//         frameRequest = requestAnimationFrame(update);
//         frame++;
//       }
//     };

//     const randomChar = () => {
//       return chars[Math.floor(Math.random() * chars.length)];
//     };

//     const nextPhrase = () => {
//       setIsAnimating(true);
//       currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
//       setText(phrases[currentPhraseIndex]).then(() => {
//         setTimeout(() => {
//           setIsAnimating(false);
//           nextPhrase();
//         }, 3000); // 3 seconds delay
//       });
//     };

//     setText(phrases[currentPhraseIndex]).then(() => {
//       nextPhrase();
//     });

//     // Cleanup function
//     return () => {
//       cancelAnimationFrame(frameRequest);
//     };
//   }, []);

//   return (
//    <div className={`text ${isAnimating ? "animating" : ""} text-slate-50`}></div>
//   );
// };

// export default TextScramble;
