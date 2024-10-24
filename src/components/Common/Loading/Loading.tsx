import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Loading = () => {
  return (
    <Stack>
      <Box>
        <CircularProgress />
      </Box>
      <Box>
        <Typography>Carregando...</Typography>
      </Box>
    </Stack>
  );
};
