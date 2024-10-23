import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apartamentHelper } from './Apartament.Funcions';
import { apartamentSchema, IApartamentFormProps } from './Apartament.Schema';

type ModalApartamentProps = {
  register: { id: number; name: string; condominiumId: number } | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalApartament = ({
  register,
  open,
  handleClose,
}: ModalApartamentProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { values: IApartamentFormProps; id?: number }) => {
      const { values, id } = data;
      const response = id
        ? await api.patch(`/apartament/${id}`, values)
        : await api.post('/apartament', values);
      return response.data;
    },
    onError: (error: any) => {
      console.log(error);
      alert('Ocorreu um erro ao salvar o apartamento. Tente novamente.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.APARTAMENT] });
      handleClose();
    },
  });

  const { control, handleSubmit } = useForm<IApartamentFormProps>({
    defaultValues: apartamentHelper(register),
    resolver: zodResolver(apartamentSchema),
  });

  const submitForm: SubmitHandler<IApartamentFormProps> = (values) => {
    mutation.mutate({ values, id: register?.id });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o Apartamento' : 'Adicione um novo Apartamento'}
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
