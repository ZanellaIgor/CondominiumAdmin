import { api } from '@src/services/api.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getWarnings = async () => {
  let response;
  try {
    response = await api.get('/warnings');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useFindManyWarnings = () => {
  return useQuery({
    queryKey: ['warning'],
    queryFn: getWarnings,
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
