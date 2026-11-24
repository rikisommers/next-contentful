import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useThemeContext } from "./themeContext";

export const MousePosContext = createContext({
  mousePosition: { x: 0, y: 0 },
  direction: null,
  velocity: 0,
  visible: false,
  setVisible: () => {},
  content: "",
  setContent: () => {},
});

const DIRECTION_THRESHOLD = 0.5; // px of vertical travel before a direction is reported
const DIRECTION_RESET_MS = 300;

/**
 * Tracks the pointer for the custom cursors.
 * The listener is only attached when the theme uses a custom cursor, and state
 * is committed at most once per animation frame.
 */
export const MousePosProvider = ({ children }) => {
  const { currentTheme } = useThemeContext();
  const cursorEnabled = !!currentTheme.data.cursor && currentTheme.data.cursor !== "none";

  const [pointer, setPointer] = useState({ mousePosition: { x: 0, y: 0 }, direction: null, velocity: 0 });
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");

  const last = useRef({ y: 0, time: 0 });
  const frame = useRef(0);
  const resetTimer = useRef(null);

  useEffect(() => {
    if (!cursorEnabled) return undefined;

    const commit = (event) => {
      frame.current = 0;
      const deltaY = event.clientY - last.current.y;
      const elapsed = event.timeStamp - last.current.time || 1;
      const direction = Math.abs(deltaY) > DIRECTION_THRESHOLD ? (deltaY > 0 ? "down" : "up") : null;

      setPointer({
        mousePosition: { x: event.clientX, y: event.clientY },
        direction,
        velocity: Math.abs(deltaY) / elapsed,
      });
      last.current = { y: event.clientY, time: event.timeStamp };

      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(
        () => setPointer((prev) => ({ ...prev, direction: null })),
        DIRECTION_RESET_MS
      );
    };

    const onMove = (event) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => commit(event));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
      clearTimeout(resetTimer.current);
    };
  }, [cursorEnabled]);

  const value = useMemo(
    () => ({ ...pointer, visible, setVisible, content, setContent }),
    [pointer, visible, content]
  );

  return <MousePosContext.Provider value={value}>{children}</MousePosContext.Provider>;
};

export const useMousePos = () => useContext(MousePosContext);
