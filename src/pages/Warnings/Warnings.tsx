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
import { useFindManyWarnings } from '@src/hooks/queries/useWarning';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { IWarningPageDataProps } from './Warnings.Interface';
import { ModalWarning } from './Warnings.Modal';
import { IWarningFormProps } from './Warnings.Schema';

export default function WarningsPage() {
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState<IWarningPageDataProps | undefined>();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFindManyWarnings({ page });

  const registerWarnings = data?.data;
  const handleEdit = (warning: IWarningPageDataProps) => {
    setRegister(warning);
    setOpen(true);
  };

  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isLoading) return <Typography>Carregando...</Typography>;

  return (
    <Container sx={{ mt: 1 }}>
      <ModalWarning
        open={open}
        handleClose={() => setOpen(false)}
        register={register as unknown as IWarningFormProps}
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
                      <TableCell>Título</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Situação</TableCell>
                      <TableCell align="center">Data</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registerWarnings?.map((warning: IWarningPageDataProps) => (
                      <TableRow hover key={warning.id}>
                        <TableCell>{warning.title}</TableCell>
                        <TableCell>{warning.category}</TableCell>
                        <TableCell>{warning.situation}</TableCell>
                        <TableCell align="center">{'Create_At'}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Editar Aviso" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(warning)}
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
