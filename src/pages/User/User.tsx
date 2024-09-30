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
import { useFindManyUsers } from '@src/hooks/queries/useUser';
import { totalPagination } from '@src/utils/functions/totalPagination';
import { useState } from 'react';
import { columnsUser, IUserPageDataProps } from './User.Interface';
import { ModalUser } from './User.Modal';
import { IUserFormProps } from './User.Schema';

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState<IUserPageDataProps | undefined>();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useFindManyUsers({ page });

  const registerUser = data?.data;

  const handleEdit = (user: IUserPageDataProps) => {
    setRegister(user);
    setOpen(true);
  };

  if (error) return <Typography>Ocorreu um erro</Typography>;
  if (isFetching) return <Typography>Carregando...</Typography>;

  return (
    <Box>
      <ModalUser
        open={open}
        handleClose={() => setOpen(false)}
        register={register as unknown as IUserFormProps}
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
            columns={columnsUser}
            register={registerUser}
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
