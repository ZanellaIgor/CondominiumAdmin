import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { debounce } from '@src/utils/functions/debounce';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFiltersApartment } from '@src/hooks/queries/useApartment';

type IFilterApartmentProps = {
  valuesFilter: IFiltersApartment | null;
  setValuesFilter: React.Dispatch<
    React.SetStateAction<IFiltersApartment | null>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterApartment = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterApartmentProps) => {
  const [filterName, setFilterName] = useState('');

  const { control, handleSubmit } = useForm<IFiltersApartment>({
    defaultValues: valuesFilter ?? {},
  });

  const { data, isLoading } = useFindManyCondominium({
    page: 1,
    limit: 100,
    filters: { name: filterName },
  });

  const optionsCondominium = data?.data?.map((condominium) => ({
    label: condominium.name,
    value: condominium.id,
  }));

  const submitForm: SubmitHandler<IFiltersApartment> = async (values) => {
    setValuesFilter(values);
    handleClose();
  };

  const handleInputChange = useCallback(
    debounce((__: React.SyntheticEvent | null, value: string) => {
      setFilterName(value);
    }, 500),
    []
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Filtrar Apartamento
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                options={optionsCondominium || []}
                name="condominiumIds"
                control={control}
                label="Condomínio"
                onInputChange={handleInputChange}
                isLoading={isLoading}
                multiple
              />
            </Grid>
          </Grid>
          <Stack
            justifyContent={'flex-end'}
            direction={'row'}
            spacing={2}
            mt={2}
          >
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Voltar
            </Button>
            <Button type="submit" color="primary">
              Filtrar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
