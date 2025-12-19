"use client";

import React, { createContext, useContext } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children, menuData }) => {
  return (
    <MenuContext.Provider value={{ menuData }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};