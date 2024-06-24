import { IconButton, Tooltip } from '@mui/material';
import { useRef } from 'react';

import { useThemeContext } from '@components/theme/ThemeProvider';
import { DarkMode, LightMode } from '@mui/icons-material';

function HeaderTheme() {
  const ref = useRef<any>(null);

  const { toggleTheme, themeName } = useThemeContext();

  return (
    <>
      <Tooltip arrow title="Trocar Cor">
        <IconButton color="primary" ref={ref} onClick={toggleTheme}>
          {themeName === 'LightTheme' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default HeaderTheme;
