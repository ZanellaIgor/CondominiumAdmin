import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { InputField } from '@src/components/Inputs/InputField/InputField';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface QuestionOptionsProps {
  questionIndex: number;
}

export function QuestionOptionsManager({
  questionIndex,
}: QuestionOptionsProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const addOption = () => {
    append({ text: '' });
  };

  return (
    <>
      <Grid item md={12}>
        <Button variant="contained" size="small" onClick={addOption}>
          Adicionar Opção
        </Button>
      </Grid>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Grid item md={12}>
            <InputField
              name={`questions.${questionIndex}.options.${index}.text`}
              label={`Opção ${index + 1}`}
              control={control}
            />
          </Grid>
          <Grid item md={12}>
            <Button variant="text" color="error" onClick={() => remove(index)}>
              Remover
            </Button>
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}
