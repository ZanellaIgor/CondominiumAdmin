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
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { warningHelper } from './Warnings.Functions';
import { IWarningFormProps, WarningsSchema } from './Warnings.Schema';

type ModalWarningProps = {
  register: IWarningFormProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalWarning = ({
  register,
  open,
  handleClose,
}: ModalWarningProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const mutation = useMutation({
    mutationFn: async (values: IWarningFormProps) => {
      const response = values.id
        ? await api.patch(`/warnings/${values.id}`, values)
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
    defaultValues: warningHelper(register),
    resolver: zodResolver(WarningsSchema),
  });

  const submitForm: SubmitHandler<IWarningFormProps> = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (open) reset(warningHelper(register));
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
            <Grid item xs={6}>
              <InputSelect
                name="situation"
                control={control}
                label="Situação"
                options={optionsSituation}
              />
            </Grid>
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
                reset(warningHelper(undefined));
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
