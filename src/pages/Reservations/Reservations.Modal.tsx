import { InputField } from '@components/Inputs/InputField/InputField';
import { SwitchField } from '@components/Inputs/SwitchField/SwitchField';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { reservationHelper } from './Reservations.Funcions';
import {
  ReservationsRegisterProps,
  reservationsSchema,
} from './Reservations.Schema';

type ModalReservationsProps = {
  register: ReservationsRegisterProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalReservations = ({
  register,
  open,
  handleClose,
}: ModalReservationsProps) => {
  const { control, handleSubmit, reset } = useForm<ReservationsRegisterProps>({
    defaultValues: reservationHelper(register),
    resolver: zodResolver(reservationsSchema),
  });
  const submitForm: SubmitHandler<ReservationsRegisterProps> = (
    values: ReservationsRegisterProps
  ) => {
    console.log(values);
  };

  useEffect(() => {
    reset(reservationHelper(register));
    return () => {
      reset(reservationHelper(undefined));
    };
  }, [register]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {register ? 'Edite o aviso' : 'Adicione um novo aviso'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="space" control={control} label="Categoria" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="purpose" control={control} label="severity" />
            </Grid>
            {/*  <Grid item xs={6}>
              <InputDatePicker
                name="dateReservation"
                control={control}
                label="Ativo"
              />
            </Grid> */}
            <Grid item xs={6}>
              <SwitchField name="status" control={control} label="Ativo" />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name="description"
                control={control}
                label="Descrição"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <Button
                onClick={() => {
                  handleClose();
                  reset(reservationHelper(undefined));
                }}
              >
                Voltar
              </Button>
              <Button type="submit" color="success">
                Adicionar
              </Button>
            </Stack>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
