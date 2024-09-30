import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';

interface IActionsOptionsProps<T> {
  handleEdit: (item: T) => void;
  item: T;
}

export const ActionsOptions = <T,>({
  handleEdit,
  item,
}: IActionsOptionsProps<T>) => {
  return (
    <TableCell align="right" sx={{ padding: '.25rem .5rem' }}>
      <Tooltip title="Editar Item" arrow>
        <IconButton size="small" onClick={() => handleEdit(item)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar Item" arrow>
        <IconButton color="inherit" size="small">
          <Delete />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};
