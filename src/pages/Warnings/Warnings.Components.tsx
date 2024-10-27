import { TableCellChip } from '@src/components/Common/DataTable/TableCellChip';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import {
  warningChipTableCategory,
  warningChipTableSituation,
} from './Warnings.Funcions';

export const WChipTableSituation = (value: EnumSituation | undefined) => {
  const { label, color } = warningChipTableSituation(value);
  return <TableCellChip label={label} color={color} />;
};

export const WChipTabelCategory = (
  value: EnumCategory | undefined
): JSX.Element => {
  const { label, color } = warningChipTableCategory(value);

  return <TableCellChip label={label} color={color} />;
};
