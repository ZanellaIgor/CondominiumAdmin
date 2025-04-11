import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputDateTime } from '@src/components/Inputs/InputDateTime/InputDateTime';
import { usePermissionRole } from '@src/hooks/permission/use-permission-role';
import { useFindManyApartment } from '@src/hooks/queries/useApartment';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { useFindManySpaceReservation } from '@src/hooks/queries/useSpaceReservation';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { useAuth } from '@src/hooks/useAuth';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { optionsSituationReservation } from '@src/utils/options/situationReservation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { mapperReservation } from './Reservation.Functions';
import { IReservationDataProps } from './Reservation.Interface';
import {
  IReservationsFormProps,
  reservationsSchema,
} from './Reservation.Schema';
import { usePermissionReservation } from './hooks/usePermissionReservation';

type IFormReservationProps = {
  register: IReservationDataProps | undefined;
  open: boolean;
  handleClose: () => void;
};

const InputSelectSpaceReservation = ({
  condominiumId,
  control,
  disabled,
}: {
  condominiumId: number;
  control: Control<IReservationsFormProps>;
  disabled: boolean;
}) => {
  const { data } = useFindManySpaceReservation({
    filters: {
      condominiumId: condominiumId,
    },
    disabled: typeof condominiumId !== 'number',
  });
  const optionsSpaceReservation = useMemo(
    () =>
      data?.data?.map((spaceReservation) => ({
        label: spaceReservation?.name,
        value: spaceReservation?.id,
      })) || [],
    [data]
  );

  return (
    <InputSelect
      control={control}
      label="Espaço Reservado"
      options={optionsSpaceReservation}
      name="spaceReservationId"
      disabled={disabled}
    />
  );
};

const InputSelectCondomium = ({
  userId,
  control,
  disabled,
}: {
  userId: number;
  control: Control<IReservationsFormProps>;
  disabled: boolean;
}) => {
  const { data } = useFindManyCondominium({
    filters: {
      userId,
    },
  });
  const optionsCondominium = useMemo(
    () =>
      data?.data?.map((condominium) => ({
        label: condominium?.name,
        value: condominium?.id,
      })) || [],
    [data]
  );

  return (
    <InputSelect
      control={control}
      label="Condomínio"
      options={optionsCondominium}
      name="condominiumId"
      disabled={disabled}
    />
  );
};

const InputSelectApartament = ({
  condominiumId,
  control,
  disabled,
}: {
  control: Control<IReservationsFormProps>;
  disabled: boolean;
  condominiumId: number;
}) => {
  const { data } = useFindManyApartment({
    filters: {
      condominiumIds: [condominiumId],
    },
    disbaled: typeof condominiumId !== 'number',
  });
  const optionsApartament = useMemo(
    () =>
      data?.data?.map((apartament) => ({
        label: apartament?.name,
        value: apartament?.id,
      })) || [],
    [data]
  );

  return (
    <InputSelect
      control={control}
      label="Apartamento"
      options={optionsApartament}
      name="apartmentId"
      disabled={disabled}
    />
  );
};

export const FormReservation = ({
  register,
  open,
  handleClose,
}: IFormReservationProps) => {
  const { userInfo } = useAuth();
  const { validateRole } = usePermissionRole();
  const { validadeUpdateReservation } = usePermissionReservation();
  const { control, handleSubmit, reset, watch } =
    useForm<IReservationsFormProps>({
      defaultValues: mapperReservation(register, userInfo),
      resolver: zodResolver(reservationsSchema),
    });
  const isEdit = !!register?.id;

  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: IReservationsFormProps) => {
      const response = isEdit
        ? await api.patch(`/reservation/${register.id}`, {
            situation: values.situation,
            description: values.description,
          })
        : await api.post('/reservation', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.RESERVATION] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const submitForm: SubmitHandler<IReservationsFormProps> = (
    values: IReservationsFormProps
  ) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (open) reset(mapperReservation(register, userInfo));
  }, [open, userInfo]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {register ? 'Edite a reserva' : 'Adicione uma nova reserva'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={6}>
              <InputField
                name="title"
                control={control}
                label="Título"
                disabled={isEdit}
              />
            </Grid>
            {isEdit && validateRole([EnumRoles.ADMIN, EnumRoles.MASTER]) && (
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
              <InputSelectCondomium
                userId={userInfo?.userId as number}
                control={control}
                disabled={isEdit}
              />
            </Grid>
            {validateRole([EnumRoles.ADMIN, EnumRoles.MASTER]) && (
              <Grid item xs={6}>
                <InputSelectApartament
                  condominiumId={Number(watch('condominiumId'))}
                  control={control}
                  disabled={isEdit || !watch('condominiumId')}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <InputSelectSpaceReservation
                condominiumId={Number(watch('condominiumId'))}
                control={control}
                disabled={isEdit || !watch('condominiumId')}
              />
            </Grid>

            <Grid item xs={6}>
              <InputDateTime
                name="startDateTime"
                control={control}
                label="Data inicial da reserva"
                disabled={isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <InputDateTime
                name="endDateTime"
                control={control}
                label="Data final da Reserva"
                disabled={isEdit}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name="description"
                control={control}
                label="Descrição"
                multiline
                rows={4}
                disabled={
                  isEdit
                    ? !validadeUpdateReservation({
                        userId: register?.userId as number,
                        statusReservation: register?.situation,
                      })
                    : isEdit
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <Button onClick={() => handleClose()}>Voltar</Button>
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
