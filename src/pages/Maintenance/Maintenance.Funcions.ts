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
