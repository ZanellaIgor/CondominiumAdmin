import { useThemeContext } from '@components/Theme/ThemeProvider';
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
import { WarningsMock } from './Mock/Warnings';

export default function ReservationsPage() {
  const { theme } = useThemeContext();
  return (
    <Container>
      <Card>
        <CardHeader title="Reservas" />
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
                      <TableCell>Descrição</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell align="right">Data</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {WarningsMock.map((warning) => {
                      return (
                        <TableRow
                          hover
                          key={warning.id}
                          //selected={isCryptoOrderSelected}
                        >
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
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {warning.description}
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
                              {warning.status}
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
                              ss
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Order" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.primary.lighter,
                                  },
                                  color: theme.palette.primary.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                ss
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
                                ss
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
