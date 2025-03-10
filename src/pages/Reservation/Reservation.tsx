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

import { Error } from '@src/components/Common/Error/Error';
import { useFindManyReservation } from '@src/hooks/queries/useReservation';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { FilterReservation } from './Reservation.Filter';
import { FormReservation } from './Reservation.Form';
import {
  columnsReservation,
  IReservationDataProps,
} from './Reservation.Interface';
import { ReservationView } from './Reservation.View';
import { usePermissionReservation } from './hooks/usePermissionReservation';

export default function ReservationsPage() {
  const { validadeUpdateReservation } = usePermissionReservation();
  const [register, setRegister] = useState<IReservationDataProps>();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [valuesFilter, setValuesFilter] = useState<Record<string, any>>();
  const { data, isLoading, error } = useFindManyReservation({
    page,
    filters: valuesFilter,
  });

  const registerSpaceReservation = data?.data;

  const handleEdit = (reservation: IReservationDataProps) => {
    setRegister(reservation);
    setOpenModal(true);
  };

  const handleCloseAllModal = () => {
    setOpenFilter(false);
    setOpenModal(false);
    setOpenModalView(false);
    setRegister(undefined);
  };

  const handleView = (warning: IReservationDataProps) => {
    setRegister(warning);
    setOpenModalView(true);
  };

  if (error) return <Error />;

  return (
    <Box>
      <FormReservation
        open={openModal}
        handleClose={() => setOpenModal(false)}
        register={register}
      />
      {openFilter && (
        <FilterReservation
          handleClose={() => setOpenFilter(false)}
          open={openFilter}
          setValuesFilter={setValuesFilter}
          valuesFilter={valuesFilter}
        />
      )}
      {register && (
        <ReservationView
          open={openModalView}
          handleClose={handleCloseAllModal}
          register={register}
        />
      )}
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
          title="Tabela de Reservas"
          action={
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<FilterAlt />}
                onClick={() => setOpenFilter(true)}
              >
                Filtrar
              </Button>
              <Button
                onClick={() => {
                  setRegister(undefined);
                  setOpenModal(true);
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
            columns={columnsReservation}
            register={registerSpaceReservation}
            loading={isLoading}
            actions={(reg: IReservationDataProps) => (
              <ActionsOptions
                handleEdit={
                  validadeUpdateReservation({
                    userId: reg.userId,
                    statusReservation: reg.situation,
                  })
                    ? handleEdit
                    : undefined
                }
                handleView={handleView}
                item={reg}
              />
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
