import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { useAuth } from '@src/hooks/useAuth';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapperWarning } from './Warnings.Functions';
import { IWarningPageDataProps } from './Warnings.Interface';
import { IWarningFormProps, warningsSchema } from './Warnings.Schema';

type IFormWarningProps = {
  register: IWarningPageDataProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const FormWarning = ({
  register,
  open,
  handleClose,
}: IFormWarningProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const { userInfo } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: IWarningFormProps) => {
      const response = register?.id
        ? await api.patch(`/warnings/${register?.id}`, values)
        : await api.post('/warnings', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.WARNING] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const { control, handleSubmit, reset } = useForm<IWarningFormProps>({
    defaultValues: mapperWarning(register),
    resolver: zodResolver(warningsSchema),
  });

  const submitForm: SubmitHandler<IWarningFormProps> = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (open) reset(mapperWarning(register));
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o aviso' : 'Adicione um novo aviso'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={12}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                name="category"
                control={control}
                label="Categoria"
                options={optionsCategory}
              />
            </Grid>
            {(userInfo?.role === EnumRoles.ADMIN ||
              userInfo?.role === EnumRoles.MASTER) && (
              <Grid item xs={6}>
                <InputSelect
                  name="situation"
                  control={control}
                  label="Situação"
                  options={optionsSituation}
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
          <Stack
            justifyContent={'flex-end'}
            direction={'row'}
            spacing={2}
            mt={2}
          >
            <Button
              onClick={() => {
                handleClose();
                reset(mapperWarning(undefined));
              }}
            >
              Voltar
            </Button>
            <Button type="submit" color="success" disabled={mutation.isPending}>
              {mutation.isPending ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
