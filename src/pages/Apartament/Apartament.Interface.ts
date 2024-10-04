import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface IApartamentPageProps {
  data: IApartamentDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IApartamentDataProps {
  id: number;
  name: number;
  condominiumId: number;
}

export const columnsApartament: IColumns[] = [
  {
    label: 'Apartamento',
    value: 'name',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
];
