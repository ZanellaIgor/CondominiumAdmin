import { Box, Hidden, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useAuth } from '@src/hooks/useAuth';

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

function HeaderUserbox() {
  const { userInfo } = useAuth();

  return (
    <>
      <Hidden mdDown>
        <UserBoxText>
          <Typography variant="h5">{userInfo?.name}</Typography>
          <Typography variant="h6">{userInfo?.email}</Typography>
        </UserBoxText>
      </Hidden>
    </>
  );
}

export default HeaderUserbox;
