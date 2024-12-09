import { Box } from '@mui/material';
import HeaderTheme from './Theme';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderTheme />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
