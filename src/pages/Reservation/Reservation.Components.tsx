import { TableCellChip } from '@src/components/Common/DataTable/TableCellChip';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import { reservationChipTableCategory } from './Reservation.Funcions';

export const WChipTableSituation = (
  value: EnumSituationReservation | undefined
) => {
  const { label, color } = reservationChipTableCategory(value);
  return <TableCellChip label={label} color={color} />;
};
