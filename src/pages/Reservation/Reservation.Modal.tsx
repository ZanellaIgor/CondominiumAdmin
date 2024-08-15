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
import { InputDatePicker } from '@src/components/Inputs/InputDatePicker/InputDatePicker';
import { InputTime } from '@src/components/Inputs/InputTime/InputTime';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { optionsSituationReservation } from '@src/utils/options/situationReservation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { reservationHelper } from './Reservation.Funcions';
import {
  ReservationsFormProps,
  reservationsSchema,
} from './Reservation.Schema';

type ModalReservationProps = {
  register: ReservationsFormProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalReservation = ({
  register,
  open,
  handleClose,
}: ModalReservationProps) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ReservationsFormProps>({
    defaultValues: reservationHelper(register),
    resolver: zodResolver(reservationsSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: ReservationsFormProps) => {
      const response = values.id
        ? await api.patch(`/reservation/${values.id}`, values)
        : await api.post('/reservation', values);
      return response.data;
    },
    onError: (error: any) => {
      console.error('Erro ao criar o Reserva:', error);
      alert('Ocorreu um erro ao marcar a reserva. Tente novamente.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.RESERVATION] });
      handleClose();
    },
  });
  console.log(getValues());
  console.log(errors);
  const submitForm: SubmitHandler<ReservationsFormProps> = (
    values: ReservationsFormProps
  ) => {
    values.condominiumId = 1;
    values.apartmentId = 1;
    values.userId = 1;
    values.spaceReservationId = 1;
    values.situation = EnumSituation.ABERTO;

    mutation.mutate(values);
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
          {register ? 'Edite a reserva' : 'Adicione uma nova reserva'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
            {register?.id && (
              <Grid item xs={6}>
                <InputSelect
                  name="situation"
                  control={control}
                  label="Situação"
                  options={optionsSituationReservation}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <InputDatePicker
                name="dateReservation"
                control={control}
                label="Data de Reserva"
              />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                name="spaceReservationId"
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
              <InputTime
                name="startTime"
                control={control}
                label="Hora Inicial"
              />
            </Grid>
            <Grid item xs={6}>
              <InputTime name="endTime" control={control} label="Hora Final" />
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
