import { AlertProps } from '@mui/material';
import { create } from 'zustand';

interface SnackbarState {
  message: string;
  severity: AlertProps['severity'];
  open: boolean;
  showSnackbar: (message: string, severity: AlertProps['severity']) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: '',
  severity: 'info',
  open: false,
  showSnackbar: (message: string, severity: AlertProps['severity']) =>
    set({ message, severity, open: true }),
  closeSnackbar: () => set({ open: false }),
}));
