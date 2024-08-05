import TextField from '@mui/material/TextField'; // Certifique-se de que está importando o TextField corretamente
import { TimePicker } from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
};

export const InputTime = forwardRef<HTMLDivElement, InputFieldProps>(
  ({ name, control, label, ...rest }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            label={label}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            slots={{
              textField: (params) => (
                <TextField
                  fullWidth
                  {...params}
                  {...rest}
                  error={!!error}
                  helperText={error?.message}
                  InputLabelProps={{
                    shrink: !!field?.value,
                  }}
                  inputRef={ref}
                />
              ),
            }}
          />
        )}
      />
    );
  }
);
