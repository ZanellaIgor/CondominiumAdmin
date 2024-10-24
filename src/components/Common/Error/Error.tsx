import { ErrorTwoTone } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Error = () => {
  return (
    <Stack>
      <Box>
        <ErrorTwoTone color="error" />
      </Box>
      <Box>
        <Typography>
          Não foi possivél carregar os dados, tente novamente mais tarde.
        </Typography>
      </Box>
    </Stack>
  );
};
