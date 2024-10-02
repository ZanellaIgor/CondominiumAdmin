import TextField from '@mui/material/TextField';
import { forwardRef, Ref } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputFieldProps<T> = {
  name: Path<T>;
  control: Control<any>;
} & React.ComponentProps<typeof TextField>;

export const InputField = forwardRef(function InputField<
  T extends FieldValues = any
>(props: InputFieldProps<T>, ref: Ref<HTMLDivElement>) {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          value={field.value}
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
