import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";

const chars = "!<>-_\\/[]{}—=+*^?#";
const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

const AnimatedChar = ({ char, delay }) => {
  const controls = useAnimation();
  const [displayChar, setDisplayChar] = useState(randomChar());

  useEffect(() => {
    const animate = async () => {
      await controls.start({ opacity: 1, transition: { duration: 0.1 } });
      await new Promise(resolve => setTimeout(resolve, delay));

      for (let i = 0; i < 5; i++) {
        setDisplayChar(randomChar());
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      setDisplayChar(char);
    };

    animate();
  }, [char, controls, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {displayChar}
    </motion.span>
  );
};

const TextAnimCode = ({ content }) => {
  const [isComplete, setIsComplete] = useState(false);
  const lines = content.split('\n');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsComplete(true), lines.reduce((acc, line) => acc + line.length * 300, 0));
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <motion.div 
      className="flex flex-col items-start font-mono text-slate-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="flex items-center" variants={lineVariants}>
          {line.split("").map((char, charIndex) => (
            <AnimatedChar 
              key={charIndex} 
              char={char} 
              delay={charIndex * 50 + lineIndex * line.length * 50}
            />
          ))}
          {lineIndex === lines.length - 1 && !isComplete && (
            <motion.span
              className="inline-block ml-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, loop: Infinity, ease: "linear" }}
            >
              |
            </motion.span>
          )}
        </motion.div>
      ))}
      {isComplete && <motion.span className="inline-block ml-1">.</motion.span>}
    </motion.div>
  );
};

TextAnimCode.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TextAnimCode;
// import React, { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import PropTypes from "prop-types";

// const chars = "!<>-_\\/[]{}—=+*^?#________";
// const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

// const AnimatedChar = ({ char, delay }) => {
//   const controls = useAnimation();
//   const [displayChar, setDisplayChar] = useState(" ");

//   useEffect(() => {
//     const animate = async () => {
//       await new Promise(resolve => setTimeout(resolve, delay));
//       await controls.start({ opacity: 1 });

//       for (let i = 0; i < 5; i++) {
//         setDisplayChar(randomChar());
//         await new Promise(resolve => setTimeout(resolve, 50));
//       }

//       setDisplayChar(char);
//     };

//     animate();
//   }, [char, controls, delay]);

//   return (
//     <motion.span
//       initial={{ opacity: 0 }}
//       animate={controls}
//     >
//       {displayChar}
//     </motion.span>
//   );
// };

// const TextAnimCode = ({ content }) => {
//   const [isComplete, setIsComplete] = useState(false);
//   const lines = content.split('\n');

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const lineVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05
//       }
//     }
//   };

//   useEffect(() => {
//     const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
//     const timer = setTimeout(() => setIsComplete(true), totalChars * 300);
//     return () => clearTimeout(timer);
//   }, [lines]);

//   return (
//     <motion.div 
//       className="flex flex-col items-start font-mono text-slate-50"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {lines.map((line, lineIndex) => (
//         <motion.div key={lineIndex} className="flex items-center" variants={lineVariants}>
//           {line.split("").map((char, charIndex) => (
//             <AnimatedChar 
//               key={charIndex} 
//               char={char} 
//               delay={(lineIndex * line.length + charIndex) * 250}
//             />
//           ))}
//         </motion.div>
//       ))}
//       {!isComplete && (
//         <motion.span
//           className="inline-block ml-1"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, loop: Infinity, ease: "linear" }}
//         >
//           |
//         </motion.span>
//       )}
//       {isComplete && <motion.span className="inline-block ml-1">.</motion.span>}
//     </motion.div>
//   );
// };

// TextAnimCode.propTypes = {
//   content: PropTypes.string.isRequired,
// };

// export default TextAnimCode;



// import React, { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import PropTypes from "prop-types";

// const chars = "!<>-_\\/[]{}—=+*^?#________";
// const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

// const AnimatedChar = ({ char, delay }) => {
//   const controls = useAnimation();
//   const [displayChar, setDisplayChar] = useState(" ");

//   useEffect(() => {
//     const animate = async () => {
//       await new Promise(resolve => setTimeout(resolve, delay));
//       await controls.start({ opacity: 1 });

//       for (let i = 0; i < 5; i++) {
//         setDisplayChar(randomChar());
//         await new Promise(resolve => setTimeout(resolve, 50));
//       }

//       setDisplayChar(char);
//     };

//     animate();
//   }, [char, controls, delay]);

//   return (
//     <motion.span
//       initial={{ opacity: 0 }}
//       animate={controls}
//     >
//       {displayChar}
//     </motion.span>
//   );
// };

// const TextAnimCode = ({ content }) => {
//   const [isComplete, setIsComplete] = useState(false);
//   const lines = content.split('\n');

//   useEffect(() => {
//     const maxLineLength = Math.max(...lines.map(line => line.length));
//     const timer = setTimeout(() => setIsComplete(true), maxLineLength * 300);
//     return () => clearTimeout(timer);
//   }, [lines]);

//   return (
//     <div className="flex flex-col items-start font-mono text-slate-50">
//       {lines.map((line, lineIndex) => (
//         <div key={lineIndex} className="flex items-center">
//           {line.split("").map((char, charIndex) => (
//             <AnimatedChar 
//               key={charIndex} 
//               char={char} 
//               delay={charIndex * 250}
//             />
//           ))}
//         </div>
//       ))}
//       {!isComplete && (
//         <motion.span
//           className="inline-block ml-1"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, loop: Infinity, ease: "linear" }}
//         >
//           |
//         </motion.span>
//       )}
//       {isComplete && <motion.span className="inline-block ml-1">.</motion.span>}
//     </div>
//   );
// };

// TextAnimCode.propTypes = {
//   content: PropTypes.string.isRequired,
// };

// export default TextAnimCode;