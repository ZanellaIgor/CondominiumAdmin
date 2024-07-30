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
