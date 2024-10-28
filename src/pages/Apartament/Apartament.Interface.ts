import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface IApartamentPageProps {
  data: IApartamentDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IApartamentDataProps {
  id: number;
  name: string;
  condominiumId: number;
  condominium: {
    id: number;
    name: string;
  };
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
