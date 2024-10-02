import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { TableCellApartaments, TableCellCondominiuns } from './User.components';

export interface IUserPageProps {
  data: IUserPageDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IUserApartments {
  id: number;
  name: string;
  condominiumId: number;
}

export interface IUserCondominium {
  id: number;
  name: string;
}

export interface IUserPageDataProps {
  id: number;
  name: string;
  email?: string;
  status: boolean;
  profilePhoto: string;
  role: EnumRoles;
  apartments: IUserApartments;
  condominiums: IUserCondominium;
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
    value: 'condominiums',
    custom: (val) => TableCellCondominiuns(val),
  },
  {
    label: 'Apartamento',
    value: 'apartments',
    custom: (val) => TableCellApartaments(val),
  },
];
