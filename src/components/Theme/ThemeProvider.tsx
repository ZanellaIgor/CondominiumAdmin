import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { de } from 'date-fns/locale/de';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {
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

const ThemeProviderWrapper = ({ children }: IThemeProviderProps) => {
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
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
