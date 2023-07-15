import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
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
    <AppContext.Provider value={{ mousePosition, handleMouseMove }}>
      {children}
    </AppContext.Provider>
  );
};
