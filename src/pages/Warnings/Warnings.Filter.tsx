import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { optionsCategory } from '@src/utils/options/category.options';
import { optionsSituation } from '@src/utils/options/situation.options';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IFiltersWarning } from '@src/hooks/queries/useWarning';

type IFilterlWarningProps = {
  valuesFilter: IFiltersWarning | null;
  setValuesFilter: React.Dispatch<React.SetStateAction<IFiltersWarning | null>>;
  open: boolean;
  handleClose: () => void;
};

export const FilterWarning = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: IFilterlWarningProps) => {
  const { control, handleSubmit } = useForm<IFiltersWarning>({
    defaultValues: valuesFilter ?? {},
  });

  const submitForm: SubmitHandler<IFiltersWarning> = (values) => {
    setValuesFilter(values);
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>Filtrar Avisos</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={12}>
              <InputField name="title" control={control} label="Título" />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                name="category"
                control={control}
                label="Categoria"
                options={optionsCategory}
              />
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
            >
              Voltar
            </Button>
            <Button type="submit" color="success">
              Filtrar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
