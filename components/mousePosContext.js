import { createContext, useState } from "react";

export const MousePosContext = createContext();

export const MousePosProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition((prevMousePosition) => ({
      ...prevMousePosition,
      x: clientX,
      y: clientY,
    }));
    console.log(mousePosition.x,mousePosition.y)
  };



  return (
    <MousePosContext.Provider value={{ mousePosition, handleMouseMove }}>
      {children}
    </MousePosContext.Provider>
  );
};
