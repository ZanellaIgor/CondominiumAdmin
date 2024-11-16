import { IColumns } from '@src/components/Common/DataTable/DataTable';
import { chipTableWrapper } from '@src/components/Common/DataTable/TableCellChipWrapper';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import {
  warningChipTableCategory,
  warningChipTableSituation,
} from './Warnings.Funcions';

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
    custom: (value: EnumCategory) =>
      chipTableWrapper({
        value,
        getLabelAndColor: warningChipTableCategory,
      }),
  },

  {
    label: 'Situação',
    value: 'situation',
    custom: (value: EnumSituation) =>
      chipTableWrapper({
        value,
        getLabelAndColor: warningChipTableSituation,
      }),
  },
];
