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
import { SwitchField } from '@src/components/Inputs/SwitchField/SwitchField';
import {
  ISurveyByIdProps,
  useFindOneSurvey,
} from '@src/hooks/queries/useSurveById';

import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SurveyAnswer() {
  const { id } = useParams();

  const { data, isFetching } = useFindOneSurvey(Number(id));

  const { control, handleSubmit } = useForm({});

  const submitForm = () => {};

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
                    <Typography>{question.text}</Typography>
                    <InputField
                      control={control}
                      name="text"
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
                    <Typography>{question.text}</Typography>
                    <InputRadio
                      options={
                        question?.options.map((option) => ({
                          label: option.text,
                          value: option?.id.toString(),
                        })) || []
                      }
                      control={control}
                      name="text"
                      label="Pergunta"
                    />
                    <SwitchField
                      control={control}
                      name="text"
                      label="Pergunta"
                    />
                  </>
                );
              }
              if (question.type === EnumQuestionType.OPTIONAL) {
                return (
                  <>
                    <Typography>{question.text}</Typography>

                    <InputSelect
                      control={control}
                      label="option"
                      name="Pergunta"
                      options={
                        question.options.map((option) => ({
                          value: option.id,
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
