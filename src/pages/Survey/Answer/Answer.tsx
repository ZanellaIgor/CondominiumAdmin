import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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

import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SurveyAnswer() {
  const { id } = useParams();

  const { data, isFetching } = useFindOneSurvey(Number(id));

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      questions: data?.questions?.map((q) => ({ id: q.id, answer: '' })) || [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      return api.post(`/api/surveys/${id}/answers`, formData);
    },
  });

  const submitForm = (formData: any) => {
    const payload = {
      surveyId: Number(id),
      answers: formData.questions.map((q: any) => ({
        questionId: q.id,
        answer: q.answer,
      })),
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        alert('Respostas enviadas com sucesso!');
        navigate('/survey');
      },
      onError: (error) => {
        console.error('Erro ao enviar respostas:', error);
        alert('Ocorreu um erro ao enviar suas respostas.');
      },
    });
  };

  const navigate = useNavigate();

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
        <CardContent>
          {data?.questions?.map(
            (question: ISurveyByIdProps['questions'][0], index: number) => {
              if (question.type === EnumQuestionType.TEXT) {
                return (
                  <>
                    <Typography fontWeight={600}>{question.text}</Typography>
                    <InputField
                      control={control}
                      name={`questions[${index}].answer`}
                      label="Pergunta"
                    />
                  </>
                );
              }
              if (
                question.type === EnumQuestionType.BOOLEAN &&
                question?.options
              ) {
                return (
                  <>
                    <Typography fontWeight={600}>{question.text}</Typography>
                    <InputRadio
                      options={
                        question?.options.map((option) => ({
                          label: option.text,
                          value: (option?.id as number).toString(),
                        })) || []
                      }
                      control={control}
                      name={`questions[${index}].answer`}
                      label="Pergunta"
                    />
                  </>
                );
              }
              if (question.type === EnumQuestionType.OPTIONAL) {
                return (
                  <>
                    <Typography fontWeight={600}>{question.text}</Typography>
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
                  </>
                );
              }
            }
          )}
        </CardContent>
      </Card>
    </form>
  );
}
