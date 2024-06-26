import { InputField } from '@components/Inputs/InputField/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
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
  console.log(register);
  const { control, handleSubmit, reset } = useForm<WarningRegisterProps>({
    defaultValues: warningHelper(register),
    resolver: zodResolver(WarningsSchema),
  });
  const submitForm: SubmitHandler<WarningRegisterProps> = (
    values: WarningRegisterProps
  ) => {
    console.log(values);
  };

  useEffect(() => {
    reset(warningHelper(register));
    return () => {};
  }, [register]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>
          {register ? 'Edite o aviso' : 'Adicione um novo aviso'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="success">
              Adicionar
            </Button>
            <Button onClick={handleClose}>Voltar</Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
