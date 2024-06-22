import { ThemeProvider } from '@mui/material';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { themeCreator } from './base';

interface IThemeProviderProps {
  children: ReactNode;
}

type ThemeName = 'DarkTheme' | 'LightTheme';

interface ThemeContextType {
  theme: ReturnType<typeof themeCreator>;
  toggleTheme: () => void;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themeCreator('LightTheme'),
  toggleTheme: () => {},
  themeName: 'LightTheme',
});

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProviderWrapper: React.FC<IThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('LightTheme');

  useEffect(() => {
    const storedThemeName = localStorage.getItem('appTheme') as ThemeName;
    if (storedThemeName) {
      setThemeName(storedThemeName);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeName =
      themeName === 'LightTheme' ? 'DarkTheme' : 'LightTheme';
    localStorage.setItem('appTheme', newThemeName);
    setThemeName(newThemeName);
  };

  const theme = themeCreator(themeName);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
