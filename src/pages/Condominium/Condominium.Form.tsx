import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapperCondominium } from './Condominium.Functions';
import { condominiumSchema, ICondominiumFormProps } from './Condominium.Schema';

type IFormCondominiumProps = {
  register: { id: number; name: string } | undefined;
  open: boolean;
  handleClose: () => void;
};

export const FormCondominium = ({
  register,
  open,
  handleClose,
}: IFormCondominiumProps) => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: {
      values: ICondominiumFormProps;
      id?: number;
    }) => {
      const { values, id } = data;
      const response = id
        ? await api.patch(`/condominium/${id}`, values)
        : await api.post('/condominium', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.CONDOMINUM] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const { control, handleSubmit } = useForm<ICondominiumFormProps>({
    defaultValues: mapperCondominium(register),
    resolver: zodResolver(condominiumSchema),
  });

  const submitForm: SubmitHandler<ICondominiumFormProps> = (values) => {
    mutation.mutate({ values, id: register?.id });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o Condomínio' : 'Adicione um novo Condomínio'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
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
              }}
              disabled={mutation.isPending}
            >
              Voltar
            </Button>
            <Button type="submit" color="success">
              {mutation.isPending ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
