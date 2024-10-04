import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface ICondominiumPageProps {
  data: ICondominiumDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface ICondominiumDataProps {
  id: number;
  name: number;
}

export const columnsCondominium: IColumns[] = [
  {
    label: 'Condominio',
    value: 'name',
  },
];
