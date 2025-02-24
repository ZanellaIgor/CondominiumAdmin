import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface ICondominiumPageProps {
  data: ICondominiumDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface ICondominiumDataProps {
  id: number;
  name: string;
}

export const columnsCondominium: IColumns[] = [
  {
    label: 'Condomínio',
    value: 'name',
  },
];
