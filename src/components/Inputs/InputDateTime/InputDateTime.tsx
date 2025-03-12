import { DateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
};

export const InputDateTime = React.forwardRef<HTMLDivElement, InputFieldProps>(
  ({ name, control, label, disabled = false, ...rest }, ref) => {
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
              disabled={disabled}
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
