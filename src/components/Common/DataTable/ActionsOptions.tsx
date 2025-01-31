import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';

interface IActionsOptionsProps<T> {
  handleDelete?: (item: T) => void;
  handleEdit?: (item: T) => void;
  item: T;
  custom?: () => JSX.Element;
}

export const ActionsOptions = <T,>({
  handleDelete,
  handleEdit,
  item,
  custom,
}: IActionsOptionsProps<T>) => {
  return (
    <TableCell align="right" sx={{ padding: '.25rem .5rem' }}>
      {handleEdit && (
        <Tooltip title="Editar Item" arrow>
          <IconButton size="small" onClick={() => handleEdit(item)}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
      {handleDelete && (
        <Tooltip title="Deletar Item" arrow>
          <IconButton color="inherit" size="small">
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {custom && custom()}
    </TableCell>
  );
};
