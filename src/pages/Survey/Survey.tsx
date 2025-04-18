import { Add, FilterAlt, NewReleases } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { ActionsOptions } from '@src/components/Common/DataTable/ActionsOptions';
import { DataTable } from '@src/components/Common/DataTable/DataTable';
import { usePermissionRole } from '@src/hooks/permission/use-permission-role';
import {
  IFiltersSurvey,
  useFindManySurvey,
} from '@src/hooks/queries/useSurvey';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterSurvey } from './Survey.Filter';
import { columnsSurvey, ISurveyPageDataProps } from './Survey.Interface';

export default function SurveyPage() {
  const navigate = useNavigate();
  const { validateRole } = usePermissionRole();
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [valuesFilter, setValuesFilter] = useState<IFiltersSurvey | null>(null);
  const { data, isLoading } = useFindManySurvey({
    page,
    filters: valuesFilter,
  });

  const registerSurvey = data;
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
          title="Enquetes"
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
              {validateRole([EnumRoles.ADMIN, EnumRoles.MASTER]) && (
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
              )}
            </Stack>
          }
        />
        <CardContent>
          <DataTable
            columns={columnsSurvey}
            register={registerSurvey}
            loading={isLoading}
            actions={(reg: ISurveyPageDataProps) => (
              <ActionsOptions
                handleEdit={
                  validateRole([EnumRoles.ADMIN, EnumRoles.MASTER])
                    ? handleEdit
                    : undefined
                }
                item={reg}
                {...(validateRole([EnumRoles.USER]) && {
                  custom: () => (
                    <Tooltip title="Responder" arrow>
                      <IconButton
                        size="small"
                        component={Link}
                        to={`/survey/answer/${reg.id}`}
                      >
                        <NewReleases />
                      </IconButton>
                    </Tooltip>
                  ),
                })}
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
