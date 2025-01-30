import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';

export const mapperSurvey = (data: any) => {
  data = {
    title: data?.title ?? undefined,
    description: data?.description ?? undefined,
    validFrom: data?.validFrom ?? undefined,
    validTo: data?.validTo ?? undefined,
    questions: data?.questions ?? undefined,
  };
  return data;
};

export const mapperSurveyFormQuestions = (
  values: ISurveyFormModalProps | null
): Partial<ISurveyFormModalProps> => {
  const formattedValues = {
    text: values?.text ?? '',
    type: values?.type ?? EnumQuestionType.TEXT,
    options: (values?.options?.length ?? 0) > 0 ? values?.options : [],
  };
  return formattedValues;
};
