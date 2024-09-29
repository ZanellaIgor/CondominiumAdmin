import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

interface IDataTableProps {
  register: any;
  columns: IColumns[];
  actions?: (reg: any) => JSX.Element;
}
export interface IColumns {
  label: string;
  value: string;
  format?: IMaskTable;
  custom?: (value: string) => JSX.Element;
}

export type IMaskTable = 'date' | 'time' | 'dateTime';

function getValueObj(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export const DataTable = ({ register, columns, actions }: IDataTableProps) => {
  const renderCell = (reg: any, column: IColumns) => {
    const value = getValueObj(reg, column.value);

    if (column.custom) return column.custom(register);

    return <TableCell>{value}</TableCell>;
  };

  return (
    <TableContainer sx={{ minHeight: '40rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column: any) => {
              return <TableCell key={column.label}>{column.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {register?.map((reg: any) => {
            return (
              <TableRow hover key={reg.id}>
                {columns?.map((column: any) => {
                  return (
                    <React.Fragment key={column.value}>
                      {renderCell(reg, column)}
                    </React.Fragment>
                  );
                })}
                {actions && actions(reg)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
