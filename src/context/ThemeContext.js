import React, { createContext, useContext, useState } from 'react';

// Buat Context
const ThemeContext = createContext();

// Provider untuk menyediakan state tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useTheme = () => useContext(ThemeContext);
