import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';

export interface IMaintenancePageProps {
  data: IMaintenanceDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IMaintenanceDataProps {
  id: number;
  title: string;
  description?: string;
  category: EnumCategory;
  situation: EnumSituation;
  condominiumId: number;
  user: {
    id: number;
    name: string;
  };
}

export const columnsMaintenance: IColumns[] = [
  {
    label: 'Local',
    value: 'name',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
];
