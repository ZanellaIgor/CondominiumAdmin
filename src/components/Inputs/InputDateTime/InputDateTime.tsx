import { DateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  control: Control<any>;
};

export const InputDateTime = React.forwardRef<HTMLDivElement, InputFieldProps>(
  ({ name, control, label, ...rest }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { ref: _ref, onChange, value, ...field },
          fieldState: { error },
        }) => (
          <>
            <DateTimePicker
              {...rest}
              value={value ? new Date(value) : null}
              label={label}
              onChange={onChange}
              slotProps={{
                textField: {
                  ...field,
                  fullWidth: true,
                  helperText: error?.message,
                  error: !!error,
                  margin: 'dense',
                  inputRef: ref,
                  value: value ? new Date(value) : null,
                },
                toolbar: {
                  sx: {
                    '&.MuiPickersLayout-toolbar span': {
                      display: 'none',
                    },
                  },
                },
              }}
            />
          </>
        )}
      />
    );
  }
);
