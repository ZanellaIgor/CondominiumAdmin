import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
type InputFieldProps = {
  name: string;
  control: any;
} & React.ComponentProps<typeof TextField>;

export const InputField = forwardRef((props: InputFieldProps, ref) => {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{
            shrink: !!field?.value,
          }}
          inputRef={ref}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      )}
    />
  );
});
