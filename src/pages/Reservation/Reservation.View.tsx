import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { IReservationDataProps } from './Reservation.Interface';

export const ReservationView = ({
  open,
  handleClose,
  register,
}: {
  open: boolean;
  handleClose: () => void;
  register: IReservationDataProps;
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Detalhes do Aviso</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              Título
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 0.5 }}>
              {register?.title}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Data Inicial
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {format(register.startDateTime, 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Data Final
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {format(register.endDateTime, 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Situação
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {register.situation}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Usuário
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {register.user.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              Condomínio
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {register.condominium.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              Descrição
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                bgcolor: '#fafafa',
                p: 2,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {register?.description ?? 'Descrição não informada'}
            </Typography>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Button color="primary" onClick={handleClose} sx={{ px: 4 }}>
            Fechar
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
