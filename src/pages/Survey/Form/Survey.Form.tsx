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
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ISuveyForm } from './Survey.Form.Interface';

export default function SurveyFrom() {
  const { id } = useParams();
  const { control, handleSubmit, getValues, setValue, watch } = useForm<
    Partial<ISuveyForm>
  >({
    defaultValues: {
      title: '',
      description: '',
      validFrom: new Date(),
      validTo: new Date(),
      questions: [{ text: '', type: EnumQuestionType.TEXT, options: [] }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    null | number
  >(null);
  const {
    control: controlOption,
    getValues: getValuesOption,
    reset: resetOption,
  } = useForm({
    defaultValues: { option: '' },
  });

  const submitForm = async (data: ISuveyForm) => {
    console.log(data);
  };

  const addQuestion = () => {
    append({ text: '', type: EnumQuestionType.TEXT, options: [] });
    setCurrentQuestionIndex(fields.length); // Aponta para a nova pergunta
  };

  const addOption = () => {
    const option = getValuesOption('option');
    if (currentQuestionIndex !== null && option) {
      const updatedQuestions = [...getValues('questions')];
      updatedQuestions[currentQuestionIndex].options = [
        ...(updatedQuestions[currentQuestionIndex].options || []),
        option,
      ];
      setValue('questions', updatedQuestions);
      resetOption(); // Limpa o input de opção
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

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
              {fields.map((field, index) => {
                const questionType = watch(`questions[${index}].type`); // Observa o tipo da pergunta
                return (
                  <React.Fragment key={field.id}>
                    <Grid item md={12}>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        onClick={() => handleQuestionSelect(index)}
                        sx={{ cursor: 'pointer' }}
                      >
                        {`Pergunta ${index + 1}: ${
                          field.text || 'Clique para editar'
                        }`}
                      </Typography>
                    </Grid>
                    {currentQuestionIndex === index && (
                      <>
                        <Grid item md={6}>
                          <InputSelect
                            name={`questions[${index}].type`}
                            control={control}
                            label="Tipo"
                            options={optionsQuestionType}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <InputField
                            name={`questions[${index}].text`}
                            label="Pergunta"
                            control={control}
                          />
                        </Grid>
                        {questionType === EnumQuestionType.OPTIONAL && (
                          <>
                            <Grid item md={12}>
                              <InputField
                                name="option"
                                label="Opção"
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
                            {field.options?.map((option, optIndex) => (
                              <Grid item md={12} key={optIndex}>
                                <Typography variant="body1">{`${
                                  optIndex + 1
                                }. ${option}`}</Typography>
                              </Grid>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}
