import { InputField } from '@components/Inputs/InputField/InputField';
import { InputSelect } from '@components/Inputs/InputSelect/InputSelect';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { optionsSituation } from '@src/utils/options/situation.options';
import { IMaintenanceFormProps } from './Maintenance.Schema';

type IFilterlMaintenanceProps = {
  valuesFilter: Record<string, any> | undefined;
  setValuesFilter: React.Dispatch<
    React.SetStateAction<undefined | Record<string, any>>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterMaintenance = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterlMaintenanceProps) => {
  const { control, handleSubmit } = useForm<IMaintenanceFormProps>({
    defaultValues: valuesFilter,
  });

  const submitForm: SubmitHandler<IMaintenanceFormProps> = (
    values: IMaintenanceFormProps
  ) => {
    setValuesFilter(values);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Filtrar Solicitação de manutenção
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>

            <Grid item xs={6}>
              <InputSelect
                name="situation"
                control={control}
                label="Situação"
                options={optionsSituation}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Voltar
              </Button>
              <Button type="submit" color="success">
                Adicionar
              </Button>
            </Stack>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
