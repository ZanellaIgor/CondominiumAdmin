import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { MaintenanceRegisterProps } from './Maintenance.Schema';

export function maintenanceHelper(data: MaintenanceRegisterProps | undefined) {
  data = {
    title: data?.title ?? '',
    description: data?.description ?? '',
    situation: data?.situation ?? EnumSituation.ABERTO,
    category: data?.category ?? EnumCategory.MEDIA,
  };
  return data;
}

export function maintenanceChipTableSituation(
  value: EnumSituation | undefined
) {
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

export function maintenanceChipTableCategory(value: EnumCategory | undefined) {
  console.log(value);
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
