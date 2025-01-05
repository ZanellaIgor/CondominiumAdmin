import { Add } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InputDatePicker } from '@src/components/Inputs/InputDatePicker/InputDatePicker';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { InputSelect } from '@src/components/Inputs/InputSelect/InputSelect';
import { SwitchField } from '@src/components/Inputs/SwitchField/SwitchField';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { optionsQuestionType } from '@src/utils/options/questionType.options';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ISuveyForm } from './Survey.Form.Interface';

export default function SurveyFrom() {
  const { id } = useParams();
  const { control, handleSubmit } = useForm<Partial<ISuveyForm>>({
    defaultValues: {
      title: '',
      description: '',
      validFrom: new Date(),
      validTo: new Date(),
      questions: [{ text: '', type: EnumQuestionType.TEXT }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const {
    control: controlQuestion,
    watch: watchQuestion,
    reset: resetQuestion,
    getValues: getValuesQuestion,
    setValue: setValueQuestion,
  } = useForm({
    defaultValues: {
      question: '',
      type: EnumQuestionType.TEXT,
      options: undefined,
    },
  });

  const {
    fields: fieldsOption,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: controlQuestion,
    name: 'options',
  });

  const {
    control: controlOption,
    getValues: getValuesOption,
    reset: resetOption,
  } = useForm({
    defaultValues: {
      option: '',
    },
  });

  const submitForm = async (data: any) => {
    console.log(data);
  };

  const addQuestion = () => {
    resetQuestion({
      question: '',
      type: EnumQuestionType.TEXT,
      options: undefined,
    });
    append({ text: '', type: EnumQuestionType.TEXT });
  };

  const addOption = () => {
    const options = getValuesOption();

    appendOption(options);
    resetOption({ option: '' });
  };

  const typeOption = watchQuestion(`type`);

  return (
    <Box>
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
                  onClick={() => {}}
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
            <Box sx={{ display: 'flex', overflow: 'auto', height: '100%' }}>
              <Grid container spacing={2} sx={{ overflow: 'auto' }}>
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
                <Grid item md={6}>
                  <InputSelect
                    name={`type`}
                    control={controlQuestion}
                    label="Tipo"
                    options={optionsQuestionType}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    name={`text`}
                    label="Pergunta"
                    control={controlQuestion}
                  />
                </Grid>
                {!typeOption && (
                  <Grid item md={6}>
                    <Typography variant="caption" color="error">
                      Selecione o tipo da pergunta
                    </Typography>
                  </Grid>
                )}

                {typeOption === EnumQuestionType.BOOLEAN && (
                  <Grid item md={6}>
                    <Typography variant="body1" color="text.primary">
                      Verdadeiro
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Falso
                    </Typography>
                  </Grid>
                )}

                {typeOption === EnumQuestionType.OPTIONAL && (
                  <>
                    <Grid item md={12}>
                      <InputField
                        name={`options`}
                        label={`Opção `}
                        control={controlOption}
                      />
                      <Stack alignItems="flex-end">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={addOption}
                        >
                          Adicionar Opção
                        </Button>
                      </Stack>
                    </Grid>
                    {fieldsOption.map((field, index) => (
                      <React.Fragment key={field.id}>
                        <Grid item md={12}>
                          <Typography variant="body1" color="text.primary">
                            {field?.options} - {index + 1}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </>
                )}

                {fields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <Grid item md={12}>
                      <Typography variant="body1" color="text.primary">
                        Pergunta {index + 1}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}
