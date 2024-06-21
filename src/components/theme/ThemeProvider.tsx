import { ThemeProvider } from '@mui/material';
import React, { ReactNode, createContext, useState } from 'react';
import { themeCreator } from './base';

interface IThemeProviderPops {
  children: ReactNode;
}

type ThemeContextType = {
  currentTheme: ReturnType<typeof themeCreator>;
  setThemeName: (themeName: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themeCreator('PureLightTheme'),
  setThemeName: () => {},
});

const ThemeProviderWrapper: React.FC<IThemeProviderPops> = ({ children }) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  const contextValue = {
    currentTheme: theme,
    setThemeName,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
