import { useThemeContext } from '@components/Theme/ThemeProvider';
import { Delete, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useFindManyReservation } from '@src/hooks/queries/useReservation';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { IReservationDataProps } from './Reservation.Interface';
import { ModalReservation } from './Reservation.Modal';

export default function ReservationsPage() {
  const { theme } = useThemeContext();
  const [register, setRegister] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useFindManyReservation({ page });

  const registerReservation = data?.data;
  const handleEdit = (reservation: any) => {
    setRegister(reservation);
    setOpen(true);
  };

  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isFetching) return <Typography>Carregando...</Typography>;

  return (
    <Container>
      <ModalReservation
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
                      <TableCell>Titulo</TableCell>
                      <TableCell>Espaço</TableCell>
                      <TableCell>Finalidade</TableCell>
                      <TableCell>Situação</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registerReservation?.map(
                      (reservation: IReservationDataProps) => {
                        return (
                          <TableRow hover key={reservation.id}>
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
                                {reservation?.space?.name}
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
                                {reservation.situation}
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
                                {reservation?.dateReservation
                                  ? 'Ativo'
                                  : 'Inativo'}
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
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2} justifyContent="center" alignItems="center">
                <Pagination
                  count={totalPagination({ totalCount: data?.totalCount ?? 0 })}
                  shape="rounded"
                  onChange={(_, page) => setPage(page)}
                  boundaryCount={1}
                  page={page}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
