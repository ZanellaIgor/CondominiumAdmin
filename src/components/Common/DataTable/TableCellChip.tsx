import Chip, { ChipProps } from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';

export const TableCellChip = (props: {
  label: string;
  color: ChipProps['color'];
}) => {
  return (
    <TableCell>
      <Chip label={props.label} color={props.color} />
    </TableCell>
  );
};
