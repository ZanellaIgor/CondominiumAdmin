import { ChipProps } from '@mui/material/Chip';
import { TableCellChip } from './TableCellChip';

export function chipTableWrapper<T>({
  getLabelAndColor,
  value,
}: {
  value: T;
  getLabelAndColor: (value: T) => {
    label: string;
    color: ChipProps['color'];
  };
}): JSX.Element {
  const { label, color } = getLabelAndColor(value);

  return <TableCellChip label={label} color={color} />;
}
