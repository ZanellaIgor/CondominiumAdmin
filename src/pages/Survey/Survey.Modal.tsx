import { InputField } from '@components/Inputs/InputField/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { surveyHelper } from './Survey.Functions';
import { ISurveyForm, surveySchema } from './Survey.Schema';

type ModalSurveySchemaeProps = {
  register: number | null;
  open: boolean;
  handleClose: () => void;
};

export const ModalSurveyForm = ({
  register,
  open,
  handleClose,
}: ModalSurveySchemaeProps) => {
  /*  const { data, isFetching } = useFindOneSurvey(register); */
  const { showSnackbar } = useSnackbarStore();
  const { control, handleSubmit, reset } = useForm<ISurveyForm>({
    defaultValues: {
      title: '',
      condominiumId: 1,
      questions: [
        {
          text: 'Pergunta 1',
          type: 'text',
        },
        {
          text: 'Pergunta 2',
        },
      ],
    },
    resolver: zodResolver(surveySchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: any & { id?: number }) => {
      const response = values.id
        ? await api.patch(`/survey/${values.id}`, values)
        : await api.post('/survey', values);
      return response.data;
    },
    onError: (error: AxiosError<ApiResponse>) => {
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [EnumQueries.SURVEY] });
      showSnackbar(response.message, 'success');
      handleClose();
    },
  });

  const submitForm: SubmitHandler<ISurveyForm> = (values: ISurveyForm) => {
    console.log(values);
    values.questions = [
      {
        text: 'Pergunta 1',
      },
      {
        text: 'Pergunta 2',
      },
    ];
    values.condominiumId = 1;
    console.log(values);
    mutation.mutate({ ...values });
  };

  /*  useEffect(() => {
    reset(surveyHelper(register));
    return () => {
      reset(surveyHelper(undefined));
    };
  }, [register]);
 */
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {register ? 'Edite a enquete' : 'Adicione uma nova enquete'}
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField name="title" control={control} label="Título" />
            </Grid>

            {/*  <Grid item xs={6}>
              <SwitchField name="status" control={control} label="Ativo" />
            </Grid> */}

            <Grid item xs={12}>
              <InputField
                name="description"
                control={control}
                label="Descrição"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <Button
                onClick={() => {
                  handleClose();
                  reset(surveyHelper(undefined));
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
