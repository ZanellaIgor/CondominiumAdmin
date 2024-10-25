import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ComponentProps, ComponentType, Suspense } from 'react';

export default function SuspenseLoader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  );
}

export const Loader =
  (Component: ComponentType<any>) =>
  (props: ComponentProps<typeof Component>) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
