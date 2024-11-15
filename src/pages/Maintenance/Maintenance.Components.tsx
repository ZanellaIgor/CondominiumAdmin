import { TableCellChip } from '@src/components/Common/DataTable/TableCellChip';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import {
  maintenanceChipTableCategory,
  maintenanceChipTableSituation,
} from './Maintenance.Funcions';

export const WChipTableSituation = (value: EnumSituation | undefined) => {
  const { label, color } = maintenanceChipTableSituation(value);
  return <TableCellChip label={label} color={color} />;
};

export const WChipTableCategory = (
  value: EnumCategory | undefined
): JSX.Element => {
  const { label, color } = maintenanceChipTableCategory(value);

  return <TableCellChip label={label} color={color} />;
};
