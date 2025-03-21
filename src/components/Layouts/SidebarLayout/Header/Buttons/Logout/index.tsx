import { Logout } from '@mui/icons-material/';
import { IconButton, Tooltip } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { useRef } from 'react';

function HeaderLogout() {
  const ref = useRef<any>(null);
  const { logout } = useAuth();

  return (
    <>
      <Tooltip arrow title="Trocar Cor">
        <IconButton color="primary" ref={ref} onClick={logout}>
          <Logout />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default HeaderLogout;
