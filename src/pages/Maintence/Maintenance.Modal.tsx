import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
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
import { reservationHelper } from './Maintenance.Funcions';
import {
  MaintenanceRegisterProps,
  maintenanceSchema,
} from './Maintenance.Schema';

type ModalMaintenanceProps = {
  register: MaintenanceRegisterProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const MaintenanceReservations = ({
  register,
  open,
  handleClose,
}: ModalMaintenanceProps) => {
  const { control, handleSubmit, reset } = useForm<MaintenanceRegisterProps>({
    defaultValues: reservationHelper(register),
    resolver: zodResolver(maintenanceSchema),
  });
  const submitForm: SubmitHandler<MaintenanceRegisterProps> = (
    values: MaintenanceRegisterProps
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
          {register ? 'Edite a solicitação' : 'Adicione uma nova solicitação'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>

            <Grid item xs={6}>
              <InputField name="purpose" control={control} label="Finalidade" />
            </Grid>
            {/*  <Grid item xs={6}>
              <InputDatePicker
                name="dateReservation"
                control={control}
                label="Ativo"
              />
            </Grid> */}
            <Grid item xs={6}>
              <InputSelect
                name="space"
                control={control}
                label="Local"
                options={[
                  { label: 'Salão de Festas - 2º andar', value: 1 },
                  { label: 'Salão de Festas - Terreo', value: 2 },
                  { label: 'Piscina', value: 3 },
                  { label: 'Churrasqueira - 1', value: 4 },
                  { label: 'Churrasqueira - 2', value: 5 },
                  { label: 'Churrasqueira - 3', value: 6 },
                  { label: 'Churrasqueira - 4', value: 7 },
                ]}
              />
            </Grid>
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
