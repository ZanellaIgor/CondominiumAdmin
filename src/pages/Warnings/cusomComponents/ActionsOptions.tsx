import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import { useThemeContext } from '@src/components/Theme/ThemeProvider';
import { IWarningPageDataProps } from '../Warnings.Interface';

interface IActionsOptionsProps {
  handleEdit: (warning: IWarningPageDataProps) => void;
  warning: IWarningPageDataProps;
}

export const ActionsOptions = ({
  handleEdit,
  warning,
}: IActionsOptionsProps) => {
  const { theme } = useThemeContext();
  return (
    <TableCell align="right">
      <Tooltip title="Editar Aviso" arrow>
        <IconButton size="small" onClick={() => handleEdit(warning)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar Aviso" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.error.lighter,
            },
            color: theme.palette.error.main,
          }}
          color="inherit"
          size="small"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};
