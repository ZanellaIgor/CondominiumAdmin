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
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { useFindManyCondominium } from '@src/hooks/queries/useCondominium';
import { useFindOneSurvey } from '@src/hooks/queries/useSurveById';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { useAuth } from '@src/hooks/useAuth';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { mapperSurvey } from './Survey.Form.Functions';
import { SurveyFormQuestionsModal } from './Survey.Form.Modal';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';
import { ISurveyForm, surveySchema } from './Survey.Form.Schema';

const InputSelectCondomium = ({
  userId,
  control,
  disabled = false,
}: {
  userId: number;
  control: Control<ISurveyForm>;
  disabled?: boolean;
}) => {
  const { data } = useFindManyCondominium({
    filters: {
      userId,
    },
  });
  const optionsCondominium = useMemo(
    () =>
      data?.data?.map((condominium) => ({
        label: condominium.name,
        value: condominium.id,
      })) || [],
    [data]
  );

  return (
    <InputSelect
      control={control}
      label="Condomínio"
      options={optionsCondominium}
      name="condominiumId"
      disabled={disabled}
    />
  );
};

export default function SurveyForm() {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const { data, isFetching } = useFindOneSurvey(Number(id));

  const mutation = useMutation({
    mutationFn: async (values: ISurveyForm) => {
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
      clientQuery.invalidateQueries({ queryKey: [EnumQueries.SURVEY] });
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

  const { control, handleSubmit, getValues, reset } = useForm<ISurveyForm>({
    defaultValues: mapperSurvey(data),
    resolver: zodResolver(surveySchema),
  });
  const { fields, append, update } = useFieldArray({
    control,
    name: 'questions',
  });

  const submitForm = async (data: ISurveyForm) => {
    mutation.mutate(data);
  };

  const addQuestion = () => {
    setOpenModal({ open: true, index: null, values: null });
  };

  const handleAddQuestionForm = (values: ISurveyFormModalProps) => {
    if (typeof openModal.index === 'number') {
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
    if (id && !isFetching) reset(mapperSurvey(data));
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
                <InputSelectCondomium
                  userId={userInfo?.userId as number}
                  control={control}
                />
              </Grid>
              <Grid item md={5}>
                <InputDatePicker
                  control={control}
                  name="validFrom"
                  label="Início"
                />
              </Grid>
              <Grid item md={5}>
                <InputDatePicker
                  control={control}
                  name="validTo"
                  label="Valido"
                />
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
