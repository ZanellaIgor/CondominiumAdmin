import { EnumQuestionType } from '../enum/typeQuestion.enum';

export const optionsQuestionType = [
  { value: EnumQuestionType.BOOLEAN, label: 'Verdadeiro ou Falso' },
  { value: EnumQuestionType.TEXT, label: 'Texto' },
  { value: EnumQuestionType.OPTIONAL, label: 'Lista de opções' },
];
