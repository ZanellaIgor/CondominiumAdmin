import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';

interface IDataTableProps<T> {
  register: any;
  columns: IColumns[];
  actions?: (reg: T, index?: number) => JSX.Element;
  loading?: boolean;
}
export interface IColumns {
  label: string;
  value: string;
  format?: IMaskTable;
  custom?: (value: any) => JSX.Element;
}

export type IMaskTable = 'date' | 'time' | 'dateTime';

function getValueObj(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function formatValues(reg: any, typeFormat: IMaskTable) {
  const date = new Date(reg);

  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  switch (typeFormat) {
    case 'date':
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    case 'time':
      return format(date, 'HH:mm', { locale: ptBR });
    case 'dateTime':
      return format(date, "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
    default:
      return reg;
  }
}

export const DataTable = <T,>({
  register,
  columns,
  actions,
  loading = false,
}: IDataTableProps<T>) => {
  const renderCell = (reg: any, column: IColumns) => {
    if (column.custom) {
      return column.custom(reg[column.value]);
    }

    if (!!column.format) {
      return (
        <TableCell size="small" sx={{ padding: '.25rem .5rem' }}>
          {formatValues(reg[column.value], column.format).toString()}
        </TableCell>
      );
    }
    const value = getValueObj(reg, column.value);
    return (
      <TableCell size="small" sx={{ padding: '.25rem .5rem' }}>
        {value}
      </TableCell>
    );
  };

  if (!register || register.length === 0) {
    return (
      <Paper>
        <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
          Não há dados para exibir.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        minHeight: '100%',
        padding: '1rem',
        maxHeight: 'calc(100vh - 15rem)',
        overflowY: 'auto',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column: any) => {
              return (
                <TableCell
                  key={column.label}
                  sx={{ fontWeight: 'bold', padding: '.5rem 1rem' }}
                >
                  {column.label}
                </TableCell>
              );
            })}
            {actions && (
              <TableCell
                sx={{ fontWeight: 'bold', padding: '2 4' }}
              ></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.label}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <Skeleton variant="text" width="50%" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            : register?.map((reg: any, index: number) => (
                <TableRow hover key={reg.id}>
                  {columns.map((column) => (
                    <React.Fragment key={column.value}>
                      {renderCell(reg, column)}
                    </React.Fragment>
                  ))}
                  {!!reg && actions && actions(reg, index)}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
