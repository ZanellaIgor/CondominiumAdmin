import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

interface IScrollbarProps {
  className?: string;
  children?: ReactNode;
}

const Scrollbar = ({ className, children, ...rest }: IScrollbarProps) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(['background'])}`,
              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`,
              },
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
