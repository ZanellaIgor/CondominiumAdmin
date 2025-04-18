import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { SwitchField } from '@src/components/Inputs/SwitchField/SwitchField';
import { useFindManyApartment } from '@src/hooks/queries/useApartment';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapperUser } from './User.Functions';
import { IUserFormProps, userSchema } from './User.Schema';
import { useAuth } from '@src/hooks/useAuth';
import { optionsRole } from '@src/utils/options/role.options';
import { useMemo } from 'react';

type IFormUserProps = {
  register: IUserFormProps | undefined;
  open: boolean;
  handleClose: () => void;
};

export const FormUser = ({ register, open, handleClose }: IFormUserProps) => {
  const { showSnackbar } = useSnackbarStore();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const { data: dataCondominium, isLoading: loadingCondominium } =
    useFindManyCondominium({
      page: 1,
      limit: 100,
    });
  const { data: dataApartment, isLoading: isLoadingApartment } =
    useFindManyApartment({
      page: 1,
      limit: 100,
    });

  const optionsCondominium = dataCondominium?.data.map((condominium) => ({
    label: condominium.name,
    value: condominium.id,
  }));

  const optionsApartment = dataApartment?.data.map((apartment) => ({
    label: apartment.condominium.name + ' - ' + apartment.name,
    value: apartment.id,
  }));

  const mutation = useMutation({
    mutationFn: async (values: IUserFormProps) => {
      const response = values.id
        ? await api.patch(`/user/${values.id}`, values)
        : await api.post('/user', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.USER] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const { control, handleSubmit, watch } = useForm<IUserFormProps>({
    defaultValues: mapperUser(register),
    resolver: zodResolver(userSchema),
  });

  const submitForm: SubmitHandler<IUserFormProps> = (values) => {
    mutation.mutate(values);
  };

  const optionsPerfil = useMemo(
    () =>
      optionsRole.filter(
        (option) =>
          !!userInfo?.role &&
          (userInfo?.role === EnumRoles.ADMIN
            ? option.value !== EnumRoles.MASTER
            : true)
      ),
    [userInfo]
  );

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite o usuário' : 'Adicione um novo usuário'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="email" control={control} label="E-mail" />
            </Grid>
            <Grid item xs={12}>
              <InputField name="password" control={control} label="Password" />
            </Grid>
            <Grid item xs={12}>
              <InputSelect
                control={control}
                name="role"
                label="Perfil"
                options={optionsPerfil}
              />
            </Grid>

            {watch('role') === EnumRoles.ADMIN && (
              <Grid item xs={12}>
                <InputSelect
                  control={control}
                  name="condominiumIds"
                  label="Condomínio"
                  isLoading={loadingCondominium}
                  options={optionsCondominium || []}
                  multiple
                />
              </Grid>
            )}
            {watch('role') === EnumRoles.USER && (
              <Grid item xs={12}>
                <InputSelect
                  control={control}
                  name="apartmentIds"
                  label="Apartamento"
                  isLoading={isLoadingApartment}
                  options={optionsApartment || []}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <SwitchField control={control} name="status" label="Status" />
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
            <Button type="submit" color="success" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
