import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { debounce } from '@src/utils/functions/debounce';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISpaceReservationFormProps } from './SpaceReservation.Schema';

type FilterSpaceReservationProps = {
  valuesFilter: Record<string, any> | undefined;
  setValuesFilter: React.Dispatch<
    React.SetStateAction<undefined | Record<string, any>>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterSpaceReservation = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: FilterSpaceReservationProps) => {
  const { control, handleSubmit } = useForm<ISpaceReservationFormProps>({
    defaultValues: valuesFilter,
  });

  const [filterName, setFilterName] = useState('');
  const { data, isLoading } = useFindManyCondominium({
    page: 1,
    limit: 100,
    filters: { name: filterName },
  });

  const optionsCondominium = data?.data?.map((condominium) => ({
    label: condominium.name,
    value: condominium.id,
  }));

  const submitForm: SubmitHandler<ISpaceReservationFormProps> = (
    values: ISpaceReservationFormProps
  ) => {
    setValuesFilter(values);
    handleClose();
  };

  const handleInputChange = useCallback(
    debounce((__: React.SyntheticEvent | null, value: string) => {
      setFilterName(value || '');
    }, 300),
    []
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Filtrar Áreas de Lazer
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                options={optionsCondominium || []}
                name="condominiumId"
                control={control}
                label="Condomínio"
                onInputChange={handleInputChange}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
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
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
