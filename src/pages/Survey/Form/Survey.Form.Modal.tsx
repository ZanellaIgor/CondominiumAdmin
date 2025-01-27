import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import {
  InputSelect,
  OptionType,
} from '@src/components/Inputs/InputSelect/InputSelect';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { optionsQuestionType } from '@src/utils/options/questionType.options';
import { useFieldArray, useForm } from 'react-hook-form';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';

export const SurveyFormQuestionsModal = ({
  open,
  handleClose,
  handleAddQuestion,
  register,
}: {
  open: boolean;
  handleClose: () => void;
  handleAddQuestion: (values: ISurveyFormModalProps) => void;
  register: ISurveyFormModalProps | null;
}) => {
  const { control, handleSubmit, watch } = useForm<{
    text: string;
    type: EnumQuestionType;
    options: { text?: string }[];
  }>({
    defaultValues: {
      text: '',
      type: EnumQuestionType.TEXT,
      options: [],
    },
  });
  const { fields, append } = useFieldArray({ control, name: 'options' });

  const submitForm = (data: any) => {
    handleAddQuestion(data);
  };

  const handleOption = (e: OptionType | OptionType[] | null) => {
    console.log(fields);

    if (
      !Array.isArray(e) &&
      e?.value === EnumQuestionType.OPTIONAL &&
      fields.length === 0
    ) {
      append({ text: '' });
    }
  };

  const addOption = () => {
    append({ text: '' });
  };

  const typeOption = watch('type');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: '30rem' } }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        {register ? 'Edite a questão' : 'Adicione uma nova questão'}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={3} padding={1}>
            <Grid item xs={12}>
              <InputField name="text" control={control} label="Pergunta" />
            </Grid>
            <Grid item xs={12}>
              <InputSelect
                name="type"
                control={control}
                label="Tipo"
                onChange={(_, e) => handleOption(e)}
                options={optionsQuestionType}
              />
            </Grid>
          </Grid>
          {typeOption === EnumQuestionType.OPTIONAL && (
            <>
              <Stack justifyContent={'flex-end'} direction={'row'}>
                <Button variant="contained" size="small" onClick={addOption}>
                  <Add />
                </Button>
              </Stack>
              <Grid
                container
                spacing={3}
                padding={1}
                height={150}
                overflow={'auto'}
                mt={2}
              >
                {fields.map((field, index) => (
                  <Grid item xs={12} key={field.id}>
                    <InputField
                      name={`options.${index}.text`}
                      control={control}
                      label={`Opção ${index + 1}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          <Grid container spacing={3} padding={1}>
            <Grid item xs={12}>
              <Stack justifyContent={'flex-end'} direction={'row'}>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Voltar
                </Button>
                <Button type="submit" color="success">
                  Adicionar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
