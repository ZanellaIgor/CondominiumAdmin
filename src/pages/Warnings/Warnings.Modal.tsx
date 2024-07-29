import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { warningHelper } from './Warnings.Funcions';
import { WarningRegisterProps, WarningsSchema } from './Warnings.Schema';

type ModalWarningProps = {
  register: WarningRegisterProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalWarning = ({
  register,
  open,
  handleClose,
}: ModalWarningProps) => {
  const clientQuery = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: WarningRegisterProps) => {
      const response = await api.post('/warnings', values);
      return response.data;
    },
    onError: (error: any) => {
      console.error('Erro ao criar o aviso:', error);
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: [EnumQueries.WARNING] });
      handleClose();
    },
  });

  const { control, handleSubmit, reset } = useForm<WarningRegisterProps>({
    defaultValues: warningHelper(register),
    resolver: zodResolver(WarningsSchema),
  });

  const submitForm: SubmitHandler<WarningRegisterProps> = (values) => {
    values.userId = 1;
    values.condominiumId = 1;
    mutation.mutate(values);
  };

  useEffect(() => {
    reset(warningHelper(register));
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {register ? 'Edite o aviso' : 'Adicione um novo aviso'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <Button
                onClick={() => {
                  handleClose();
                  reset(warningHelper(undefined));
                }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                color="success"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </Stack>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
