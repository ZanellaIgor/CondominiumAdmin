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
import { useFindManyWarnings } from '@src/hooks/queries/useWarning';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { FilterWarning } from './Warnings.Filter';
import { FormWarning } from './Warnings.Form';
import { columnsWarning, IWarningPageDataProps } from './Warnings.Interface';

export default function WarningsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [register, setRegister] = useState<IWarningPageDataProps | undefined>();
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [valuesFilter, setValuesFilter] = useState<Record<string, any>>();
  const { data, isFetching, error } = useFindManyWarnings({
    page,
    filters: valuesFilter,
  });

  const registerWarnings = data?.data;

  const handleEdit = (warning: IWarningPageDataProps) => {
    setRegister(warning);
    setOpenModal(true);
  };

  if (error) return <Error />;

  return (
    <Box>
      {openModal && (
        <FormWarning
          open={openModal}
          handleClose={() => setOpenModal(false)}
          register={register}
        />
      )}
      {openFilter && (
        <FilterWarning
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
          title="Tabela de Avisos"
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
            columns={columnsWarning}
            register={registerWarnings}
            loading={isFetching}
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
