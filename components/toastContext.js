import React, { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  
  const showToast = (msg) => {
    setMessage(msg);
  };

  const closeToast = () => {
    setMessage("");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <div className="fixed p-3 text-white bg-gray-800 rounded shadow-lg bottom-4 right-4 z-nav">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
