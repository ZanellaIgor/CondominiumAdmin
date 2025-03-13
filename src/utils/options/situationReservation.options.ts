import { EnumSituationReservation } from '../enum/situationReservation.enum';

export const optionsSituationReservation = [
  { value: EnumSituationReservation.ABERTO, label: 'Aberto' },
  { value: EnumSituationReservation.ANALISE, label: 'Análise' },
  { value: EnumSituationReservation.CONFIRMADO, label: 'Confirmado' },
  { value: EnumSituationReservation.REPROVADO, label: 'Não aprovado' },
];
