import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useControls, button } from 'leva';

const LevaContext = createContext();

export const LevaProvider = ({ children }) => {
  const [controlsSchema, setControlsSchema] = useState({
    Test: { 
      testValue: 'Hello, Leva!',
      testButton: button(() => console.log('Test button clicked'))
    }
  });

  const addControls = useCallback((folder, newControls) => {
   // console.log('addControls called with:', folder, newControls);
    setControlsSchema(prevSchema => {
      const updatedSchema = {
        ...prevSchema,
        [folder]: { ...prevSchema[folder], ...newControls }
      };
   //   console.log('Updated schema:', updatedSchema);
      return updatedSchema;
    });
  }, []);

  useEffect(() => {
  //  console.log('controlsSchema updated:', controlsSchema);
  }, [controlsSchema]);

  const values = useControls(controlsSchema);

  return (
    <LevaContext.Provider value={{ addControls, values, controlsSchema }}>
      {children}
    </LevaContext.Provider>
  );
};

export const useLevaControls = () => useContext(LevaContext);