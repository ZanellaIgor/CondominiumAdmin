import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface IApartmentPageProps {
  data: IApartmentDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IApartmentDataProps {
  id: number;
  name: string;
  condominiumId: number;
  condominium: {
    id: number;
    name: string;
  };
}

export const columnsApartment: IColumns[] = [
  {
    label: 'Apartamento',
    value: 'name',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
];
