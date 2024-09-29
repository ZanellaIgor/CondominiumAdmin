import { useThemeContext } from '@components/Theme/ThemeProvider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataTable } from '@src/components/Common/DataTable/DataTable';
import { useFindManyWarnings } from '@src/hooks/queries/useWarning';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { columnsWarning, IWarningPageDataProps } from './Warnings.Interface';
import { ModalWarning } from './Warnings.Modal';
import { IWarningFormProps } from './Warnings.Schema';
import { ActionsOptions } from './cusomComponents/ActionsOptions';

export default function WarningsPage() {
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState<IWarningPageDataProps | undefined>();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useFindManyWarnings({ page });

  const registerWarnings = data?.data;
  const handleEdit = (warning: IWarningPageDataProps) => {
    setRegister(warning);
    setOpen(true);
  };

  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isFetching) return <Typography>Carregando...</Typography>;

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
          action={
            <Button
              onClick={() => {
                setRegister(undefined);
                setOpen(true);
              }}
            >
              Adicionar
            </Button>
          }
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
              <DataTable
                columns={columnsWarning}
                register={registerWarnings}
                actions={(reg) => (
                  <ActionsOptions handleEdit={handleEdit} warning={reg} />
                )}
              />

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
