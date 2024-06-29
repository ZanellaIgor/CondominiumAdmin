import { useThemeContext } from '@components/Theme/ThemeProvider';
import { Delete, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { MaintenanceReservations } from './Maintenance.Modal';
import { reservationsMock } from './Mock/Reservations';

export default function ReservationsPage() {
  const { theme } = useThemeContext();
  const [register, setRegister] = useState();
  const [open, setOpen] = useState(false);

  const handleEdit = (reservation: any) => {
    setRegister(reservation);
    setOpen(true);
  };
  return (
    <Container>
      <MaintenanceReservations
        open={open}
        handleClose={() => setOpen(false)}
        register={register}
      />
      <Card>
        <CardHeader
          title="Reservas"
          action={<Button onClick={() => setOpen(true)}>Adicionar</Button>}
        />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          /*  checked={selectedAllCryptoOrders}
                          indeterminate={selectedSomeCryptoOrders}
                          onChange={handleSelectAllCryptoOrders} */
                        />
                      </TableCell>
                      <TableCell>Titulo</TableCell>
                      <TableCell>Espaço</TableCell>
                      <TableCell>Finalidade</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservationsMock.map((reservation: any) => {
                      return (
                        <TableRow hover key={reservation.id}>
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" />
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {reservation.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {reservation.space}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {reservation.purpose}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {reservation.status ? 'Ativo' : 'Inativo'}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Tooltip title="Edit Order" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(reservation)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Order" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.error.lighter,
                                  },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
