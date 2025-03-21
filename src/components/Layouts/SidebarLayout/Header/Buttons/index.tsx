import { Box } from '@mui/material';
import HeaderLogout from './Logout';
import HeaderTheme from './Theme';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderLogout />
        <HeaderTheme />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
