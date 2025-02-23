import { ChipProps } from '@mui/material/Chip';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { IWarningPageDataProps } from './Warnings.Interface';
import { IWarningFormProps } from './Warnings.Schema';

export function mapperWarning(
  data: IWarningPageDataProps | undefined,
  condominiumId?: number
): Partial<IWarningFormProps> {
  const dataForm = {
    title: data?.title ?? '',
    category: data?.category ?? EnumCategory.MEDIA,
    description: data?.description ?? '',
    situation: data?.situation ?? EnumSituation.ABERTO,
    condominiumId: data?.condominiumId ?? condominiumId,
  };
  return dataForm;
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
    case EnumSituation.ANALISE:
      return { label: 'Reaberto', color: 'secondary' };
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
