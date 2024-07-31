import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserFormProps, userSchema } from './User.Schema';

type ModalUserProps = {
  register: IUserFormProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalUser = ({ register, open, handleClose }: ModalUserProps) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<IUserFormProps>({
    defaultValues: register,
    resolver: zodResolver(userSchema),
  });

  const submitForm: SubmitHandler<any> = (values) => {
    values.userId = 1;
    values.condominiumId = 1;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o usuário' : 'Adicione um novo usuário'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="nome" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="email" control={control} label="E-mail" />
            </Grid>
            <Grid item xs={12}>
              <InputField name="password" control={control} label="Password" />
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
            >
              Voltar
            </Button>
            <Button type="submit" color="success">
              {/*     {mutation.isPending ? 'Adicionando...' : 'Adicionar'} */}{' '}
              Add
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
