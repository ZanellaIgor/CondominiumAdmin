import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';
type InputSelectProps = {
  control: Control<any, any>;
  name: string;
  label: string;
  options: any[];
};
export const InputSelect = ({
  control,
  name,
  options,
  label,
  ...rest
}: InputSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            options={options}
            {...field}
            {...rest}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={label}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
        );
      }}
    />
  );
};
