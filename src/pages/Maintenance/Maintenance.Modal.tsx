import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceHelper } from './Maintenance.Funcions';
import { IMaintenanceDataProps } from './Maintenance.Inteface';
import { IMaintenanceFormProps, maintenanceSchema } from './Maintenance.Schema';

type ModalMaintenanceProps = {
  register: IMaintenanceDataProps | null;
  open: boolean;
  handleClose: () => void;
};

export const MaintenanceModal = ({
  register,
  open,
  handleClose,
}: ModalMaintenanceProps) => {
  const { control, handleSubmit, reset } = useForm<IMaintenanceFormProps>({
    defaultValues: maintenanceHelper(register),
    resolver: zodResolver(maintenanceSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const response = values.id
        ? await api.patch(`/maintenance/${values.id}`, values)
        : await api.post('/maintenance', values);
      return response.data;
    },
    onError: (error: any) => {
      console.error('Erro ao registrar o Manutenção:', error);
      alert('Ocorreu um erro ao gerar a manutenção. Tente novamente.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.MAINTENANCE] });
      handleClose();
    },
  });

  const submitForm: SubmitHandler<IMaintenanceFormProps> = (
    values: IMaintenanceFormProps
  ) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    reset(maintenanceHelper(register));
    return () => {
      reset(maintenanceHelper(null));
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
            <Grid item xs={6}>
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
                  reset(maintenanceHelper(null));
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
