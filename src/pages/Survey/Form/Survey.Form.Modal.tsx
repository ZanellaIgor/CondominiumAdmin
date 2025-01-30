import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import {
  InputSelect,
  OptionType,
} from '@src/components/Inputs/InputSelect/InputSelect';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { optionsQuestionType } from '@src/utils/options/questionType.options';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { mapperSurveyFormQuestions } from './Survey.Form.Functions';
import {
  ISurveyFormModalProps,
  surveyFormModalSchema,
} from './Survey.Form.Modal.Schema';

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
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ISurveyFormModalProps>({
    defaultValues: mapperSurveyFormQuestions(register),
    resolver: zodResolver(surveyFormModalSchema),
  });

  console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const submitForm = (data: any) => {
    handleAddQuestion(data);
  };

  const handleOption = (e: OptionType | OptionType[] | null) => {
    if (fields.length !== 0) {
      setValue('options', []);
    }
    if (!Array.isArray(e) && e?.value === EnumQuestionType.OPTIONAL) {
      console.log('ss');
      append({ text: '' });
      return;
    }
    if (!Array.isArray(e) && e?.value === EnumQuestionType.BOOLEAN) {
      append([{ text: 'Sim' }, { text: 'Não' }]);
      return;
    }
  };

  const addOption = () => {
    append({ text: '' });
  };

  const handleDeleteOption = (index: number) => {
    remove(index);
  };

  const typeOption = watch('type');

  useEffect(() => {
    if (open) reset(mapperSurveyFormQuestions(register));
  }, [open]);

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
              <Stack flexDirection="row" spacing={1} gap={2}>
                <InputSelect
                  name="type"
                  control={control}
                  label="Tipo"
                  onChange={(_, e) => handleOption(e)}
                  options={optionsQuestionType}
                />

                {typeOption === EnumQuestionType.OPTIONAL && (
                  <Stack>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addOption}
                    >
                      <Add />
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Grid>
          </Grid>
          {(typeOption === EnumQuestionType.OPTIONAL ||
            typeOption === EnumQuestionType.BOOLEAN) && (
            <>
              <Grid
                container
                spacing={1}
                maxHeight={150}
                overflow={'auto'}
                px={1}
              >
                {fields.map((field, index) => (
                  <Grid item xs={12} key={field.id}>
                    <Stack flexDirection="row" gap={1} alignItems="center">
                      <InputField
                        name={`options.${index}.text`}
                        control={control}
                        label={`Opção ${index + 1}`}
                        size="small"
                        disabled={typeOption === EnumQuestionType.BOOLEAN}
                      />
                      {typeOption === EnumQuestionType.OPTIONAL && (
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteOption(index)}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Stack>
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
