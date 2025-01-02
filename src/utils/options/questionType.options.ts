import { EnumQuestionType } from '../enum/typeQuestion.enum';

export const optionsQuestionType = [
  { value: EnumQuestionType.BOOLEAN, label: 'Sim/ Não' },
  { value: EnumQuestionType.TEXT, label: 'Texto' },
  { value: EnumQuestionType.OPTIONAL, label: 'Lista de opções' },
];
