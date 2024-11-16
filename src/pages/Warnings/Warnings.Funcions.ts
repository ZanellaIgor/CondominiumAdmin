import { ChipProps } from '@mui/material/Chip';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { IWarningFormProps } from './Warnings.Schema';

export function warningHelper(data: IWarningFormProps | undefined) {
  data = {
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    category: data?.category ?? EnumCategory.MEDIA,
    description: data?.description ?? '',
    situation: data?.situation ?? EnumSituation.ABERTO,
  };
  return data;
}

export function warningChipTableSituation(value: EnumSituation | undefined): {
  label: string;
  color: ChipProps['color'];
} {
  switch (value) {
    case EnumSituation.ABERTO:
      return { label: 'Aberto', color: 'primary' };
    case EnumSituation.ATENDIDO:
      return { label: 'Atendido', color: 'success' };
    case EnumSituation.REABERTO:
      return { label: 'Reaberto', color: 'warning' };
    case EnumSituation.SUSPENSO:
      return { label: 'Suspenso', color: 'error' };
    default:
      return { label: 'Não informado', color: 'primary' };
  }
}

export function warningChipTableCategory(value: EnumCategory | undefined): {
  label: string;
  color: ChipProps['color'];
} {
  switch (value) {
    case EnumCategory.ALTA:
      return { label: 'Alta', color: 'secondary' };
    case EnumCategory.CRITICA:
      return { label: 'Crítica', color: 'warning' };
    case EnumCategory.MEDIA:
      return { label: 'Média', color: 'primary' };
    case EnumCategory.GRAVE:
      return { label: 'Grave', color: 'error' };
    default:
      return { label: 'Não informado', color: 'primary' };
  }
}
