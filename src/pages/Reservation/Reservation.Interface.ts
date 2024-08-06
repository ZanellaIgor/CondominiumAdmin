import { SituationReservation } from '@src/utils/enum/situationReservation.enum';
import { ISpaceReservationPageDataProps } from '../SpaceReservation/Space.Interface';
import { IUserPageDataProps } from '../User/User.Interface';

export interface IReservationPageProps {
  data: IReservationDataProps[];
  totalCount: number;
  page: number;
  limit: number;
}
export interface IReservationDataProps {
  id: number;
  title: string;
  description?: string;
  userId: number;
  user: IUserPageDataProps;
  startTime: string;
  endTime: string;
  dateReservation: Date;
  spaceReservationId: number;
  space: ISpaceReservationPageDataProps;
  situation: SituationReservation;
  condominiumId: number;
  createdAt: Date;
  updatedAt: Date;
}
