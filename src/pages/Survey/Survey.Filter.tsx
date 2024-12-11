import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { Dispatch } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IvaluesFormFilter } from './Survey.Interface';

type FilterSurveyProps = {
  valuesFilter: IvaluesFormFilter | null | undefined;
  setValuesFilter: Dispatch<
    React.SetStateAction<IvaluesFormFilter | null | undefined>
  >;
  open: boolean;
  handleClose: () => void;
};

export const FilterSurvey = ({
  valuesFilter,
  setValuesFilter,
  open,
  handleClose,
}: FilterSurveyProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: valuesFilter?.title || '',
      description: valuesFilter?.description || '',
    },
  });

  const submitForm: SubmitHandler<IvaluesFormFilter> = (values) => {
    setValuesFilter(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Filtrar Enquete</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="description"
                control={control}
                label="Descrição"
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
            <Button type="submit" color="primary">
              Filtrar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
