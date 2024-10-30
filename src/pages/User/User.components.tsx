import TableCell from '@mui/material/TableCell';
import { IUserApartments, IUserCondominium } from './User.Interface';

export const TableCellCondominiuns = (data: IUserCondominium[]) => {
  const condominiuns = data.map((item) => item.name).join(', ');

  return (
    <TableCell sx={{ textOverflow: 'ellipsis' }}>{condominiuns}</TableCell>
  );
};

export const TableCellApartments = (data: IUserApartments[]) => {
  const apartments = data.map((item) => item.name).join(', ');

  return <TableCell sx={{ textOverflow: 'ellipsis' }}>{apartments}</TableCell>;
};
