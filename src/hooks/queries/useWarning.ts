import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getWarnings = async () => {
  let response;
  try {
    response = await api.get('/warnings');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useFindManyWarnings = () => {
  return useQuery({
    queryKey: [EnumQueries.WARNING],
    queryFn: getWarnings,
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
