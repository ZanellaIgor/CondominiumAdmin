import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface IUserPageProps {
  data: IUserPageDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}
export interface IUserPageDataProps {
  id: number;
  name: string;
  email?: string;
  status: boolean;
}

export const columnsUser: IColumns[] = [
  {
    label: 'Nome',
    value: 'name',
  },
  {
    label: 'E-mail',
    value: 'email',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
  {
    label: 'Apartamento',
    value: 'apartament.name',
  },
];
