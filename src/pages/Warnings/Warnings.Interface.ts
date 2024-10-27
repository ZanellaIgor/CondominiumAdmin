import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { WChipTabelCategory, WChipTableSituation } from './Warnings.Components';

export interface IWarningPageProps {
  data: IWarningPageDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}
export interface IWarningPageDataProps {
  id: number;
  title: string;
  description?: string;
  situation: string;
  category: string;
  userId: number;
  condominiumId: number;
}

export const columnsWarning: IColumns[] = [
  {
    label: 'Título',
    value: 'title',
  },
  {
    label: 'Categoria',
    value: 'category',
    custom: (value) => WChipTabelCategory(value),
  },
  {
    label: 'Situação',
    value: 'situation',
    custom: (value) => WChipTableSituation(value),
  },
];
