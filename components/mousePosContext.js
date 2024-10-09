import { createContext, useContext, useState, useEffect ,useRef } from "react";

export const MousePosContext = createContext();

export const MousePosProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('');
  const [velocity, setVelocity] = useState(0);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(''); // Initialize content state

  //const [rotationAngle, setRotationAngle] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const velocityThreshold = 0.5; // Define a threshold for velocity
  const resetDelay = 300; // Delay before resetting direction
  const resetTimeout = useRef(null); // Use useRef to hold the timeout reference

  // const calculateRotationAngle = (velocity) => {
  //   if (velocity > 0) {
  //     return Math.min(20, velocity); // Cap the angle at 20 degrees
  //   }
  //   return 0; // No rotation if not moving
  // };

  const handleMouseMove = (event) => {
    const currentTime = event.timeStamp;
    const deltaY = event.clientY - lastMousePosition.y;

    // Calculate velocity
    const newVelocity = Math.abs(deltaY) / (currentTime - lastTimestamp);

    // Determine direction
    const newDirection = Math.abs(deltaY) > velocityThreshold ? (deltaY > 0 ? 'down' : 'up') : null;

    // Update state
    setMousePosition({ x: event.clientX, y: event.clientY });
    setDirection(newDirection);
    setVelocity(newVelocity);
   // setRotationAngle(calculateRotationAngle(newVelocity));
    setLastMousePosition({ x: event.clientX, y: event.clientY });
    setLastTimestamp(currentTime);

    // Clear any existing timeout to reset direction
    clearTimeout(resetTimeout.current);
    // Set a new timeout to reset direction after a delay
    resetTimeout.current = setTimeout(() => {
      setDirection(null);
    }, resetDelay);

  };

  useEffect(() => {
    const addEventListeners = () => {
      if (typeof document !== "undefined") {
        document.addEventListener("mousemove", handleMouseMove);
      }
    };

    const removeEventListeners = () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    addEventListeners();
    return () => {
      clearTimeout(resetTimeout); // Clear timeout on unmount
      removeEventListeners();
    };
  }, [lastMousePosition]);

  return (
    <MousePosContext.Provider value={{ mousePosition, direction, velocity, visible, setVisible, content, setContent}}>
      {children}
    </MousePosContext.Provider>
  );
};

export const useMousePos = () => useContext(MousePosContext);