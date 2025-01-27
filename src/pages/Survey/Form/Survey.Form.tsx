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
import { InputDatePicker } from '@src/components/Inputs/InputDatePicker/InputDatePicker';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import { SwitchField } from '@src/components/Inputs/SwitchField/SwitchField';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ISuveyForm } from './Survey.Form.Interface';
import { SurveyFormQuestionsModal } from './Survey.Form.Modal';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';
import { surveySchema } from './Survey.Form.Schema';

export default function SurveyFrom() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState<{
    open: boolean;
    index: number | null;
    values: ISurveyFormModalProps | null;
  }>({
    open: false,
    index: 0,
    values: null,
  });

  const { control, handleSubmit, getValues, setValue, watch } = useForm<
    Partial<ISuveyForm>
  >({
    defaultValues: {
      title: '',
      description: '',
      validFrom: new Date(),
      validTo: new Date(),
      questions: [],
    },
    resolver: zodResolver(surveySchema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const submitForm = async (data: any) => {
    console.log(data);
  };

  const addQuestion = () => {
    setOpenModal({ open: true, index: fields.length, values: null });
  };

  const handleAddQuestionForm = (values: ISurveyFormModalProps) => {
    append(values);
  };

  return (
    <Box>
      <SurveyFormQuestionsModal
        open={openModal.open}
        handleClose={() =>
          setOpenModal({ open: false, index: 0, values: null })
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
              <Grid item md={12}>
                {fields.map((field, index) => (
                  <Typography key={field.id}>{field.text}</Typography>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}
