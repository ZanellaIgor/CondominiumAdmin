export interface IWarningPageProps {
  data: IUserPageDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}
export interface IUserPageDataProps {
  id: number;
  name: string;
  email?: string;
}
