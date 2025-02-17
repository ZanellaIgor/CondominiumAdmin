import { ICondominiumDataProps } from './Condominium.Interface';
import { ICondominiumFormProps } from './Condominium.Schema';

export function mapperCondominium(
  data: Partial<ICondominiumDataProps> | undefined
): ICondominiumFormProps {
  const newValues = {
    name: data?.name ?? '',
  };

  return newValues as ICondominiumFormProps;
}
