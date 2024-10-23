import { Add, FilterAlt } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ActionsOptions } from '@src/components/Common/DataTable/ActionsOptions';
import { DataTable } from '@src/components/Common/DataTable/DataTable';
import { useFindManyWarnings } from '@src/hooks/queries/useWarning';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { columnsWarning, IWarningPageDataProps } from './Warnings.Interface';
import { ModalWarning } from './Warnings.Modal';
import { IWarningFormProps } from './Warnings.Schema';

export default function WarningsPage() {
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
    <Box>
      <ModalWarning
        open={open}
        handleClose={() => setOpen(false)}
        register={register as unknown as IWarningFormProps}
      />
      <Card
        sx={{
          height: `calc(100vh - 150px)`,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', lg: '80%' },
          margin: 'auto',
          my: 2,
        }}
      >
        <CardHeader
          title="Tabela de Avisos"
          action={
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<FilterAlt />}
              >
                Filtrar
              </Button>
              <Button
                onClick={() => {
                  setRegister(undefined);
                  setOpen(true);
                }}
                color="success"
                variant="contained"
                size="small"
                startIcon={<Add />}
              >
                Adicionar
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <DataTable
            columns={columnsWarning}
            register={registerWarnings}
            actions={(reg) => (
              <ActionsOptions handleEdit={handleEdit} item={reg} />
            )}
          />
        </CardContent>
      </Card>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={totalPagination({ totalCount: data?.totalCount ?? 0 })}
          shape="rounded"
          onChange={(_, page) => setPage(page)}
          boundaryCount={1}
          page={page}
        />
      </Stack>
    </Box>
  );
}
