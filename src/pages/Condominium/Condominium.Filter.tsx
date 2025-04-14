import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFiltersCondominium } from '@src/hooks/queries/useCondominium';

type IFilterCondominiumProps = {
  valuesFilter: IFiltersCondominium | null;
  setValuesFilter: React.Dispatch<
    React.SetStateAction<IFiltersCondominium | null>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterCondominium = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterCondominiumProps) => {
  const { control, handleSubmit } = useForm<IFiltersCondominium>({
    defaultValues: valuesFilter ?? {},
  });

  const submitForm: SubmitHandler<IFiltersCondominium> = (values) => {
    setValuesFilter(values);
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Filtrar Condomínios
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
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
