import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface IBaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout = ({ children }: IBaseLayoutProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

export default BaseLayout;
