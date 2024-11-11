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
  userId: number;
  condominium: {
    id: number;
    name: string;
  };
}

export const columnsMaintenance: IColumns[] = [
  {
    label: 'Titulo',
    value: 'title',
  },
  {
    label: 'Condomínio',
    value: 'condominium.name',
  },
  {
    label: 'Categoria',
    value: 'category',
  },
  {
    label: 'Situação',
    value: 'situation',
  },
];
