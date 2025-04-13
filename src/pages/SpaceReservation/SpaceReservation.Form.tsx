import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { debounce } from '@src/utils/functions/debounce';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapperSpaceReservation } from './SpaceReservation.Functions';
import { ISpaceReservationDataProps } from './SpaceReservation.Interface';
import {
  ISpaceReservationFormProps,
  spaceReservationSchema,
} from './SpaceReservation.Schema';

type IFormSpaceReservationProps = {
  register: ISpaceReservationDataProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const FormSpaceReservation = ({
  register,
  open,
  handleClose,
}: IFormSpaceReservationProps) => {
  const { showSnackbar } = useSnackbarStore();
  const { control, handleSubmit, reset } = useForm<ISpaceReservationFormProps>({
    defaultValues: mapperSpaceReservation(register),
    resolver: zodResolver(spaceReservationSchema),
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

  const submitForm: SubmitHandler<ISpaceReservationFormProps> = (
    values: ISpaceReservationFormProps
  ) => {
    mutation.mutate({ ...values, id: register?.id });
  };

  const handleInputChange = useCallback(
    debounce((__: React.SyntheticEvent | null, value: string) => {
      setFilterName(value);
    }, 500),
    []
  );

  useEffect(() => {
    reset(mapperSpaceReservation(register));
  }, [register]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {register ? 'Edite a reserva' : 'Adicione uma nova reserva'}
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
