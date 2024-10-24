import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';

export const GlobalSnackbar = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
