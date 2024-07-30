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
    created_at: data?.created_at ?? '',
    userId: 1,
    condominiumId: 1,
  };
  return data;
}
