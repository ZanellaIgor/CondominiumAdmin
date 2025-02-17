import { zodResolver } from '@hookform/resolvers/zod';
import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputRadio } from '@src/components/Inputs/InputRadio/InputRadio';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import {
  ISurveyByIdProps,
  useFindOneSurvey,
} from '@src/hooks/queries/useSurveById';
import { api } from '@src/services/api.service';

import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mapperAnswer } from './Answer.Functions';
import { answerSchema } from './Answer.Schema';

export default function SurveyAnswer() {
  const { id } = useParams();

  const { data, isFetching } = useFindOneSurvey(Number(id));

  const { control, handleSubmit, formState, watch, reset } = useForm({
    defaultValues: mapperAnswer(data, Number(id)),
    resolver: zodResolver(answerSchema),
  });

  const { showSnackbar } = useSnackbarStore();

  console.log(formState.errors, 'erros');
  console.log(watch(), 'watch');

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      return api.post(`answers`, formData);
    },
  });

  const submitForm = (formData: any) => {
    console.log('teste', formData);
    const payload = {
      surveyId: Number(id),
      answers: formData.questions.map((question: any) => {
        if (!isNaN(Number(question.answer))) {
          return {
            questionId: question.questionId,
            optionId: Number(question.answer),
          };
        }
        if (isNaN(Number(question.answer))) {
          return { questionId: question.questionId, text: question.answer };
        }
      }),
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        showSnackbar('Respostas enviadas com sucesso!', 'success');
        navigate('/survey');
      },
      onError: () => {
        showSnackbar('Ocorreu um erro ao enviar suas respostas.', 'error');
      },
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && !data) {
      reset(mapperAnswer(data, Number(id)));
    }
  }, [isFetching, data]);

  if (isFetching) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Card
        sx={{
          height: `calc(100vh - 150px)`,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', lg: '80%' },
          margin: 'auto',
          my: 2,
        }}
      >
        <CardHeader
          title="Questionário"
          action={
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to="/survey"
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
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack
            sx={{
              flex: 1,
              overflow: 'auto',
              maxHeight: 'calc(100vh - 250px)',
              paddingRight: 2,
            }}
          >
            <Grid container spacing={2}>
              {data?.questions?.map(
                (question: ISurveyByIdProps['questions'][0], index: number) => {
                  if (question.type === EnumQuestionType.TEXT) {
                    return (
                      <Grid item xs={12} key={question.id}>
                        <Typography fontWeight={600} mb={2}>
                          {question.text}
                        </Typography>
                        <InputField
                          control={control}
                          name={`questions[${index}].answer`}
                          label="Pergunta"
                        />
                      </Grid>
                    );
                  }
                  if (
                    question.type === EnumQuestionType.BOOLEAN &&
                    question?.options
                  ) {
                    return (
                      <Grid item xs={12} key={question.id}>
                        <Typography fontWeight={600} mb={2}>
                          {question.text}
                        </Typography>
                        <InputRadio
                          options={
                            question?.options.map((option) => ({
                              label: option.text,
                              value: (option?.id as number).toString(),
                            })) || []
                          }
                          control={control}
                          name={`questions[${index}].answer`}
                        />
                      </Grid>
                    );
                  }
                  if (question.type === EnumQuestionType.OPTIONAL) {
                    return (
                      <Grid item xs={12} key={question.id}>
                        <Typography fontWeight={600} mb={2}>
                          {question.text}
                        </Typography>
                        <InputSelect
                          control={control}
                          label="option"
                          name={`questions[${index}].answer`}
                          options={
                            question.options.map((option) => ({
                              value: option.id as number,
                              label: option.text,
                            })) || []
                          }
                        />
                      </Grid>
                    );
                  }
                }
              )}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
