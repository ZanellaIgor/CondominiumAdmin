import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';

import { ISpaceReservationDataProps } from '../SpaceReservation/SpaceReservation.Interface';
import { IUserPageDataProps } from '../User/User.Interface';
import { WChipTableSituation } from './Reservation.Components';

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
    custom: (value) => WChipTableSituation(value),
  },
  { label: 'Data Inicial', value: 'startDateTime', format: 'dateTime' },
  { label: 'Data Final', value: 'endDateTime', format: 'dateTime' },
];
