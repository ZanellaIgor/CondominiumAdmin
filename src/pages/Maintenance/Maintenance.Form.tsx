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
import { useAuth } from '@src/hooks/useAuth';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { mapperMaintenance } from './Maintenance.Functions';
import { IMaintenanceDataProps } from './Maintenance.Inteface';
import { IMaintenanceFormProps, maintenanceSchema } from './Maintenance.Schema';

type IFormMaintenanceProps = {
  register: IMaintenanceDataProps | null;
  open: boolean;
  handleClose: () => void;
};

const InputSelectCondomium = ({
  userId,
  control,
}: {
  userId: number;
  control: Control<IMaintenanceFormProps>;
}) => {
  const { data, isFetching } = useFindManyCondominium({
    filters: {
      userId,
    },
  });
  const optionsCondominium = useMemo(
    () =>
      data?.data?.map((condominium) => ({
        label: condominium.name,
        value: condominium.id,
      })) || [],
    [isFetching]
  );

  return (
    <InputSelect
      control={control}
      label="Condomínio"
      options={optionsCondominium}
      name="condominiumId"
    />
  );
};

export const FormMaintenance = ({
  register,
  open,
  handleClose,
}: IFormMaintenanceProps) => {
  const { userInfo } = useAuth();
  const { control, handleSubmit, reset } = useForm<IMaintenanceFormProps>({
    defaultValues: mapperMaintenance(register),
    resolver: zodResolver(maintenanceSchema),
  });
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const response = values.id
        ? await api.patch(`/maintenance/${values.id}`, values)
        : await api.post('/maintenance', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.MAINTENANCE] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const submitForm: SubmitHandler<IMaintenanceFormProps> = (
    values: IMaintenanceFormProps
  ) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    reset(mapperMaintenance(register));
    return () => {
      reset(mapperMaintenance(null));
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
              <InputSelect
                name="situation"
                control={control}
                label="Situação"
                options={optionsSituation}
              />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                name="category"
                control={control}
                label="Categoria"
                options={optionsCategory}
              />
            </Grid>
            {typeof userInfo?.userId === 'number' && (
              <Grid item xs={6}>
                <InputSelectCondomium
                  control={control}
                  userId={userInfo.userId}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <InputField
                name="description"
                control={control}
                label="Descrição"
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
                  reset(mapperMaintenance(null));
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
