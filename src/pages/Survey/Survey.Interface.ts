import { IColumns } from '@src/components/Common/DataTable/DataTable';

export interface ISurveyPageProps {
  data: ISurveyPageDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface ISurveyPageDataProps {
  id: number;
  title: string;
  descripiton: string;
}

export const columnsSurvey: IColumns[] = [
   {
    label: 'Titulo',
    value: 'title',
  },
  {
    label: 'Descrição',
    value: 'description',
  },

];
