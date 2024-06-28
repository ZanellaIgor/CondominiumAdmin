import { DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>; // Use Path<T> para garantir que o nome seja uma chave válida de T
  control: Control<T>;
};

export const InputDatePicker = React.forwardRef<
  HTMLDivElement,
  InputFieldProps<FieldValues>
>(({ name, control, ...rest }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref: _ref, onChange, value, ...field },
        fieldState: { error },
      }) => (
        <>
          <MobileDateTimePicker
            {...rest}
            onChange={onChange}
            slotProps={{
              textField: {
                ...field,
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
                margin: 'dense',
                inputRef: ref,
              },
              toolbar: {
                sx: {
                  '&.MuiPickersLayout-toolbar span': {
                    display: 'none',
                  },
                },
              },
            }}
            sx={{
              display: { xs: 'flex', sm: 'none', md: 'none' },
            }}
          />
          <DateTimePicker
            {...rest}
            slotProps={{
              textField: {
                ...field,
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
                margin: 'dense',
                inputRef: ref,
                name: name,
              },
            }}
            sx={{
              display: { xs: 'none', sm: 'flex', md: 'flex' },
            }}
          />
        </>
      )}
    />
  );
});
