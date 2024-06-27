import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface IBaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<IBaseLayoutProps> = ({ children }) => {
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
