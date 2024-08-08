import { TimePicker } from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';

type InputFieldProps = {
  name: string;
  control: Control<any | any>;
  label: string;
};
const timeSchema = z
  .date()
  .refine((date) => date.getHours() >= 0 && date.getHours() <= 23, {
    message: 'Horário inválido. Deve estar entre 00:00 e 23:59.',
  });

const validateTime = (value: Date | null) => {
  if (!value) return true; // Se o valor for nulo, é válido
  return timeSchema.safeParse(value).success;
};
export const InputTime = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, control, label, ...rest }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ validate: validateTime }}
        render={({ field }) => (
          <TimePicker
            {...rest}
            inputRef={ref}
            label={label}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            sx={{ width: '100%', height: '100%' }}
          />
        )}
      />
    );
  }
);
