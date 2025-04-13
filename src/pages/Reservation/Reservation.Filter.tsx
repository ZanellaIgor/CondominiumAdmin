import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { optionsSituationReservation } from '@src/utils/options/situationReservation.options';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFiltersReservation } from '@src/hooks/queries/useReservation';

type IFilterReservationProps = {
  valuesFilter: IFiltersReservation | null;
  setValuesFilter: React.Dispatch<
    React.SetStateAction<IFiltersReservation | null>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterReservation = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterReservationProps) => {
  const { control, handleSubmit } = useForm<IFiltersReservation>({
    defaultValues: valuesFilter ?? {},
  });

  const submitForm: SubmitHandler<IFiltersReservation> = (
    values: IFiltersReservation
  ) => {
    setValuesFilter(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>Filtrar Reservas</DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>

            <Grid item xs={6}>
              <InputSelect
                name="situation"
                control={control}
                label="Situação"
                options={optionsSituationReservation}
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
              <Button type="submit" color="success">
                Filtrar
              </Button>
            </Stack>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
