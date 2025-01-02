import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';

export interface ISuveyForm {
  title: string;
  description?: string;
  status: boolean;
  validFrom: string | Date;
  validTo?: string | Date;
  condominiumId: number;
  questions: {
    id: number;
    text: string;
    type: EnumQuestionType;
    options?: string[];
  }[];
}
