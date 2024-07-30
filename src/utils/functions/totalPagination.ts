import { paginationTake } from '../const/paginationTake';
export function totalPagination({
  take = Number(paginationTake || 10),
  totalCount,
}: {
  take?: number;
  totalCount: number;
}) {
  return Math.ceil(Number(totalCount) / take);
}
