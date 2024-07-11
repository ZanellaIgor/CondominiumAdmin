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
import { useFindManyWarnings } from '@src/hooks/queries/useWarning';
import { useState } from 'react';
import { ModalWarning } from './Warnings.Modal';
import { WarningRegisterProps } from './Warnings.Schema';

export default function WarningsPage() {
  const [selectWarnings, setSelectWarnings] = useState<string[]>([]);
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState<WarningRegisterProps | undefined>();
  const { data, isLoading, error } = useFindManyWarnings();

  const handleEdit = (warning: WarningRegisterProps) => {
    setRegister(warning);
    setOpen(true);
  };

  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isLoading) return <Typography>Carregando...</Typography>;

  return (
    <Container>
      <ModalWarning
        open={open}
        handleClose={() => setOpen(false)}
        register={register}
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
                      <TableCell>Título</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((warning: WarningRegisterProps) => {
                      return (
                        <TableRow hover key={warning.id}>
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
                              {warning.title}
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
                              {warning.category}
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
                              {warning.created_at ?? 'Create_At'}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Order" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(warning)}
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
