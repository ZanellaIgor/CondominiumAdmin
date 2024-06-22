import { alpha, Badge, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';

import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeContext } from '../../../../../theme/ThemeProvider';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

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
