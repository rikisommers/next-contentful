// components/motion/motionComponents.js
import {
  motion,
  cubicBezier,
  AnimatePresence,
  useTransform,
  useScroll,
  useInView,
  useAnimation,
  LayoutGroup,
  useMotionValueEvent,
  easeInOut,
  animate,
  stagger,
} from "framer-motion";

const createSpan = (content) => {
  const span = document.createElement("span");
  span.textContent = content;
  return span;
};

/**
 * Split the text content of an element into span nodes by chars, words, or
 * lines so they can be animated independently. Defaults to characters for
 * backward compatibility.
 *
 * @param {HTMLElement} element
 * @param {"chars"|"words"|"lines"} mode
 * @returns {{ chars?: HTMLElement[], words?: HTMLElement[], lines?: HTMLElement[] }}
 */
export const splitText = (element, mode = "chars") => {
  if (!element) return { chars: [] };

  const text = element.textContent ?? "";
  element.textContent = "";

  if (mode === "words") {
    // Keep whitespace tokens to preserve spacing between words.
    const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
    const words = tokens.map((token) => {
      const content = /\s+/.test(token) ? "\u00A0".repeat(token.length) : token;
      const span = createSpan(content);
      element.appendChild(span);
      return span;
    });
    return { words };
  }

  if (mode === "lines") {
    const lines = text.split(/\r?\n/).map((line) => {
      // Use non-breaking space for empty lines to retain height.
      const span = createSpan(line.length ? line : "\u00A0");
      span.style.display = "block";
      element.appendChild(span);
      return span;
    });
    return { lines };
  }

  // Default: characters
  const chars = Array.from(text).map((char) => {
    const span = createSpan(char === " " ? "\u00A0" : char);
    element.appendChild(span);
    return span;
  });

  return { chars };
};

export {
  motion,
  cubicBezier,
  AnimatePresence,
  useTransform,
  useScroll,
  useInView,
  useAnimation,
  LayoutGroup,
  useMotionValueEvent,
  easeInOut,
  animate,
  stagger,
};