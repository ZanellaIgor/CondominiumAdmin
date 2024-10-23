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
import { InputDateTime } from '@src/components/Inputs/InputDateTime/InputDateTime';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { optionsSituationReservation } from '@src/utils/options/situationReservation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { spaceReservationHelper } from './SpaceReservation.Funcions';
import { ISpaceReservationDataProps } from './SpaceReservation.Interface';
import {
  ISpaceReservationFormProps,
  spaceReservationSchema,
} from './SpaceReservation.Schema';

type ModalSpaceReservationProps = {
  register: ISpaceReservationDataProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalSpaceReservation = ({
  register,
  open,
  handleClose,
}: ModalSpaceReservationProps) => {
  const { control, handleSubmit, reset } = useForm<ISpaceReservationFormProps>({
    defaultValues: spaceReservationHelper(register),
    resolver: zodResolver(spaceReservationSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (
      values: ISpaceReservationFormProps & { id?: number }
    ) => {
      const response = values.id
        ? await api.patch(`/space-reservation/${values.id}`, values)
        : await api.post('/space-reservation', values);
      return response.data;
    },
    onError: (error: any) => {
      console.error('Erro ao criar o Reserva:', error);
      alert('Ocorreu um erro ao gerar a reserva. Tente novamente.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.RESERVATION] });
      handleClose();
    },
  });

  const submitForm: SubmitHandler<ISpaceReservationFormProps> = (
    values: ISpaceReservationFormProps
  ) => {
    values.condominiumId = 1;

    mutation.mutate({ ...values, id: register?.id });
  };

  useEffect(() => {
    reset(spaceReservationHelper(register));
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
              <InputDateTime
                name="startDateTime"
                control={control}
                label="Data inicial da reserva"
              />
            </Grid>
            <Grid item xs={6}>
              <InputDateTime
                name="endDateTime"
                control={control}
                label="Data final da Reserva"
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
