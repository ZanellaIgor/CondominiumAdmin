import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { debounce } from '@src/utils/functions/debounce';

import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apartmentHelper } from './Apartment.Functions';
import { apartmentSchema, IApartmentFormProps } from './Apartment.Schema';

type ModalApartmentProps = {
  register: { id: number; name: string; condominiumId: number } | undefined;
  open: boolean;
  handleClose: () => void;
};

export const ModalApartment = ({
  register,
  open,
  handleClose,
}: ModalApartmentProps) => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const [filterName, setFilterName] = useState('');
  const mutation = useMutation({
    mutationFn: async (data: { values: IApartmentFormProps; id?: number }) => {
      const { values, id } = data;
      const response = id
        ? await api.patch(`/apartment/${id}`, values)
        : await api.post('/apartment', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.APARTMENT] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const { control, handleSubmit } = useForm<IApartmentFormProps>({
    defaultValues: apartmentHelper(register),
    resolver: zodResolver(apartmentSchema),
  });
  const { data, isLoading } = useFindManyCondominium({
    page: 1,
    limit: 100,
    filters: { name: filterName },
  });

  const optionsCondominium = data?.data?.map((condominium) => ({
    label: condominium.name,
    value: condominium.id,
  }));

  const submitForm: SubmitHandler<IApartmentFormProps> = async (values) => {
    mutation.mutate({ values, id: register?.id });
  };

  const handleInputChange = useCallback(
    debounce((__: React.SyntheticEvent | null, value: string) => {
      setFilterName(value);
    }, 500),
    []
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o Apartamento' : 'Adicione um novo Apartamento'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                options={optionsCondominium || []}
                name="condominiumId"
                control={control}
                label="Condomínio"
                onInputChange={handleInputChange}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
          <Stack
            justifyContent={'flex-end'}
            direction={'row'}
            spacing={2}
            mt={2}
          >
            <Button
              onClick={() => {
                handleClose();
              }}
              disabled={mutation.isPending}
            >
              Voltar
            </Button>
            <Button type="submit" color="success">
              {mutation.isPending ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
