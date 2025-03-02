import { ChipProps } from '@mui/material/Chip';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { IMaintenanceDataProps } from './Maintenance.Inteface';
import { IMaintenanceFormProps } from './Maintenance.Schema';

export function mapperMaintenance(
  data: IMaintenanceDataProps | null
): IMaintenanceFormProps {
  const newValues = {
    title: data?.title ?? '',
    description: data?.description ?? '',
    situation: data?.situation ?? EnumSituation.ABERTO,
    category: data?.category ?? EnumCategory.MEDIA,
    condominiumId: data?.condominiumId,
  };
  return newValues;
}

export function maintenanceChipTableSituation(
  value: EnumSituation | undefined
): {
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
    case EnumSituation.ANALISE:
      return { label: 'Em análise', color: 'info' };
    default:
      return { label: 'Não informado', color: 'primary' };
  }
}

export function maintenanceChipTableCategory(value: EnumCategory | undefined): {
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
