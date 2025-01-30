import { zodResolver } from '@hookform/resolvers/zod';
import { Add } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ActionsOptions } from '@src/components/Common/DataTable/ActionsOptions';
import {
  DataTable,
  IColumns,
} from '@src/components/Common/DataTable/DataTable';
import { InputDatePicker } from '@src/components/Inputs/InputDatePicker/InputDatePicker';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { SwitchField } from '@src/components/Inputs/SwitchField/SwitchField';
import { useFindOneSurvey } from '@src/hooks/queries/useSurveyId';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { api } from '@src/services/api.service';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { mapperSurvey } from './Survey.Form.Functions';
import { SurveyFormQuestionsModal } from './Survey.Form.Modal';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';
import { ISurveyForm, surveySchema } from './Survey.Form.Schema';

export default function SurveyFrom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbarStore();
  const { data, isFetching } = useFindOneSurvey(Number(id));
  console.log(data);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const response = id
        ? await api.patch(`/survey/${id}`, values)
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
      showSnackbar(response.message, 'success');
      navigateToList();
    },
  });

  const navigateToList = () => {
    navigate('/survey');
  };

  const [openModal, setOpenModal] = useState<{
    open: boolean;
    index: number | null;
    values: ISurveyFormModalProps | null;
  }>({
    open: false,
    index: 0,
    values: null,
  });

  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<ISurveyForm>({
      defaultValues: mapperSurvey(data),
      resolver: zodResolver(surveySchema),
    });
  const { fields, append, update } = useFieldArray({
    control,
    name: 'questions',
  });

  const submitForm = async (data: any) => {
    data.condominiumId = 1;
    mutation.mutate(data);
  };

  const addQuestion = () => {
    setOpenModal({ open: true, index: null, values: null });
  };

  const handleAddQuestionForm = (values: ISurveyFormModalProps) => {
    if (typeof openModal.index === 'number') {
      console.log(openModal.index);
      update(openModal.index, values);
      setOpenModal({ open: false, index: null, values: null });
      return;
    }
    append(values);
    setOpenModal({ open: false, index: null, values: null });
  };

  const columnsSurvey: IColumns[] = [
    {
      label: 'Pergunta',
      value: 'text',
    },
    {
      label: 'Tipo',
      value: 'type',
    },
  ];

  const handleEditQuestion = (item: any, index: number) => {
    setOpenModal({ open: true, index, values: item });
  };

  useEffect(() => {
    if (id && !isFetching) mapperSurvey(data);
  }, [isFetching]);

  return (
    <Box>
      <SurveyFormQuestionsModal
        open={openModal.open}
        handleClose={() =>
          setOpenModal({ open: false, index: null, values: null })
        }
        register={openModal.values}
        handleAddQuestion={handleAddQuestionForm}
      />
      <Card
        sx={{
          height: `calc(100vh - 150px)`,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', lg: '80%' },
          margin: 'auto',
          my: 2,
          overflow: 'auto',
        }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <CardHeader
            title="Questionário"
            action={
              <Stack spacing={1} direction="row">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={navigateToList}
                >
                  Voltar
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  type="submit"
                >
                  Salvar
                </Button>
              </Stack>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <InputField name="title" label="Título" control={control} />
              </Grid>
              <Grid item md={4}>
                <InputField
                  name="description"
                  label="Descrição"
                  control={control}
                  maxRows={4}
                />
              </Grid>
              <Grid item md={3}>
                <SwitchField name="status" label="Status" control={control} />
              </Grid>
              <Grid item md={6}>
                <Box width="80%">
                  <InputDatePicker
                    control={control}
                    name="validFrom"
                    label="Início"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box width="80%">
                  <InputDatePicker
                    control={control}
                    name="validTo"
                    label="Valido"
                  />
                </Box>
              </Grid>
              <Grid item md={12}>
                <Stack alignItems="flex-end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={addQuestion}
                  >
                    Adicionar Pergunta
                  </Button>
                </Stack>
              </Grid>
              <Grid item md={12}>
                {fields.length === 0 ? (
                  <Typography>Adicione uma pergunta</Typography>
                ) : (
                  <DataTable
                    columns={columnsSurvey}
                    register={fields}
                    actions={(reg, index) => (
                      <ActionsOptions
                        handleEdit={() =>
                          handleEditQuestion(
                            getValues(`questions.${index as number}`),
                            index as number
                          )
                        }
                        item={reg}
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}
