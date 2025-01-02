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
import { useFindManySurvey } from '@src/hooks/queries/useSurvey';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterSurvey } from './Survey.Filter';
import {
  columnsSurvey,
  ISurveyPageDataProps,
  IvaluesFormFilter,
} from './Survey.Interface';

export default function SurveyPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [valuesFilter, setValuesFilter] = useState<
    IvaluesFormFilter | null | undefined
  >(null);
  const { data, isFetching } = useFindManySurvey({
    page,
    filters: valuesFilter,
  });

  const registerSurvey = data?.data;
  const handleEdit = (survey: ISurveyPageDataProps) => {
    navigate(`/survey/edit/${survey.id}`);
  };

  return (
    <Box>
      {openFilter && (
        <FilterSurvey
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
                color="success"
                variant="contained"
                size="small"
                startIcon={<Add />}
                component={Link}
                to="/survey/create"
              >
                Adicionar
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <DataTable
            columns={columnsSurvey}
            register={registerSurvey}
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
