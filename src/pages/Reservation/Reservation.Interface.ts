import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';

import { chipTableWrapper } from '@src/components/Common/DataTable/TableCellChipWrapper';
import { ISpaceReservationDataProps } from '../SpaceReservation/SpaceReservation.Interface';
import { IUserPageDataProps } from '../User/User.Interface';
import { reservationChipTableCategory } from './Reservation.Functions';

export interface IReservationPageProps {
  data: IReservationDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IReservationDataProps {
  id: number;
  title: string;
  description?: string;
  userId: number;
  user: IUserPageDataProps;
  startDateTime: Date;
  endDateTime: Date;
  spaceReservationId: number;
  space: ISpaceReservationDataProps;
  situation: EnumSituationReservation;
  condominiumId: number;
  createdAt: Date;
  updatedAt: Date;
  condominium: { id: number; name: string };
}

export const columnsReservation: IColumns[] = [
  {
    label: 'Título',
    value: 'title',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
  {
    label: 'Espaço',
    value: 'space.name',
  },
  {
    label: 'Situação',
    value: 'situation',
    custom: (value: EnumSituationReservation) =>
      chipTableWrapper({
        value,
        getLabelAndColor: reservationChipTableCategory,
      }),
  },
  { label: 'Data Inicial', value: 'startDateTime', format: 'dateTime' },
  { label: 'Data Final', value: 'endDateTime', format: 'dateTime' },
];
