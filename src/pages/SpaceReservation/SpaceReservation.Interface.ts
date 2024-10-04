export interface ISpaceReservationPageDataProps {
  id: number;
  name: string;
}

import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface ISpaceReservationPageProps {
  data: ISpaceReservationDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface ISpaceReservationDataProps {
  id: number;
  name: number;
  condominiumId: number;
}

export const columnsSpaceReservation: IColumns[] = [
  {
    label: 'Local',
    value: 'name',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
];
