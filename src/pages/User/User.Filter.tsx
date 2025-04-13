import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IFiltersUser } from '@src/hooks/queries/useUser';

type IFilterUserProps = {
  valuesFilter: IFiltersUser | null;
  setValuesFilter: React.Dispatch<React.SetStateAction<IFiltersUser | null>>;
  open: boolean;
  handleClose: () => void;
};

export const FilterUser = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterUserProps) => {
  const { data: dataCondominium, isLoading: loadingCondominium } =
    useFindManyCondominium({
      page: 1,
      limit: 100,
    });

  const optionsCondominium = dataCondominium?.data.map((condominium) => ({
    label: condominium.name,
    value: condominium.id,
  }));

  const { control, handleSubmit } = useForm<IFiltersUser>({
    defaultValues: valuesFilter ?? {},
  });

  const submitForm: SubmitHandler<IFiltersUser> = (values) => {
    setValuesFilter(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Filtrar Usuários</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="email" control={control} label="E-mail" />
            </Grid>
            <Grid item xs={12}>
              <InputSelect
                control={control}
                name="condominiumIds"
                label="Condomínio"
                isLoading={loadingCondominium}
                options={optionsCondominium || []}
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
            <Button type="submit" color="success">
              Filtrar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
