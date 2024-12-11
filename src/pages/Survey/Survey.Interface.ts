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

export type IvaluesFormFilter = {
  title?: string | null;
  description?: string | null;
};

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
