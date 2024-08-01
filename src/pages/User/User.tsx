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
import { useFindManyUsers } from '@src/hooks/queries/useUser';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { IUserPageDataProps } from './User.Interface';
import { ModalUser } from './User.Modal';
import { IUserFormProps } from './User.Schema';

export default function UserPage() {
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState<IUserPageDataProps | undefined>();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useFindManyUsers({ page });

  const registerUser = data?.data;
  console.log(data);
  const handleEdit = (user: IUserPageDataProps) => {
    setRegister(user);
    setOpen(true);
  };
  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isFetching) return <Typography>Carregando...</Typography>;
  return (
    <Container sx={{ mt: 1 }}>
      <ModalUser
        open={open}
        handleClose={() => setOpen(false)}
        register={register as unknown as IUserFormProps}
      />
      <Card>
        <CardHeader
          title="Avisos"
          action={<Button onClick={() => setOpen(true)}>Adicionar</Button>}
        />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Divider />
              <TableContainer sx={{ minHeight: '40rem' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registerUser?.map((user: IUserPageDataProps) => (
                      <TableRow hover key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>

                        <TableCell align="right">
                          <Tooltip title="Editar Aviso" arrow>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleEdit(
                                  user as unknown as IUserPageDataProps
                                )
                              }
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Deletar Aviso" arrow>
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
                    ))}
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
