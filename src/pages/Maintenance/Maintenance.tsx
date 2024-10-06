import { Add, FilterAlt } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ActionsOptions } from '@src/components/Common/DataTable/ActionsOptions';
import { DataTable } from '@src/components/Common/DataTable/DataTable';
import { useFindManyMaintenance } from '@src/hooks/queries/useMaintenance';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { columnsMaintenance } from './Maintenance.Inteface';
import { MaintenanceModal } from './Maintenance.Modal';

export default function ReservationsPage() {
  const [page, setPage] = useState(1);

  const [register, setRegister] = useState();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useFindManyMaintenance({ page });
  const registerMaintenance = data?.data;

  const handleEdit = (reservation: any) => {
    setRegister(reservation);
    setOpen(true);
  };
  return (
    <Box>
      <MaintenanceModal
        open={open}
        handleClose={() => setOpen(false)}
        register={register}
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
          title="Tabela de Manutenções"
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
            columns={columnsMaintenance}
            register={registerMaintenance}
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
