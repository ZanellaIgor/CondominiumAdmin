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
import {
  IFiltersSpaceReservation,
  useFindManySpaceReservation,
} from '@src/hooks/queries/useSpaceReservation';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { FilterSpaceReservation } from './SpaceReservation.Filter';
import { FormSpaceReservation } from './SpaceReservation.Form';
import {
  columnsSpaceReservation,
  ISpaceReservationDataProps,
} from './SpaceReservation.Interface';

export default function SpaceReservationPage() {
  const [register, setRegister] = useState<
    undefined | ISpaceReservationDataProps
  >();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [valuesFilter, setValuesFilter] =
    useState<IFiltersSpaceReservation | null>(null);
  const { data, isLoading, error } = useFindManySpaceReservation({
    page,
    filters: valuesFilter,
  });

  const registerSpaceReservation = data?.data;

  const handleEdit = (spaceReservation: ISpaceReservationDataProps) => {
    setRegister(spaceReservation);
    setOpenModal(true);
  };

  if (error) return <Error />;

  return (
    <Box>
      {openModal && (
        <FormSpaceReservation
          handleClose={() => setOpenModal(false)}
          open={openModal}
          register={register}
        />
      )}
      {openFilter && (
        <FilterSpaceReservation
          handleClose={() => setOpenFilter(false)}
          open={openFilter}
          setValuesFilter={setValuesFilter}
          valuesFilter={valuesFilter}
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
          title="Áreas de lazer"
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
            columns={columnsSpaceReservation}
            register={registerSpaceReservation}
            loading={isLoading}
            actions={(reg: ISpaceReservationDataProps) => (
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
