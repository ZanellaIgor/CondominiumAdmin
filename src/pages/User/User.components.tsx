import TableCell from '@mui/material/TableCell';
import { IUserApartments, IUserCondominium } from './User.Interface';

export const TableCellCondominiuns = (data: IUserCondominium[]) => {
  const condominiuns = data.map((item) => item.name).join(', ');

  return (
    <TableCell sx={{ textOverflow: 'ellipsis' }}>{condominiuns}</TableCell>
  );
};

export const TableCellApartaments = (data: IUserApartments[]) => {
  const apartaments = data.map((item) => item.name).join(', ');

  return <TableCell sx={{ textOverflow: 'ellipsis' }}>{apartaments}</TableCell>;
};
