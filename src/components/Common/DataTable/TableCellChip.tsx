import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';

export const TableCellChip = (props: { label: string; color: string }) => {
  return (
    <TableCell align="center">
      <Chip label={props.label} sx={{ backgroundColor: props.color }} />
    </TableCell>
  );
};
