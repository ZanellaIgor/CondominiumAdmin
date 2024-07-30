import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

type OptionType = {
  value: string | number;
  label: string;
};

type InputSelectProps = {
  control: Control<any, any>;
  name: string;
  label: string;
  options: OptionType[];
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
        const currentValue =
          options.find((option) => option.value === field.value) || null;
        return (
          <Autocomplete
            options={options}
            isOptionEqualToValue={(option, value) => {
              return option.value === value?.value;
            }}
            getOptionLabel={(option) => option.label}
            onChange={(_, newValue) => {
              field.onChange(newValue?.value);
            }}
            value={currentValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
              />
            )}
            {...rest}
          />
        );
      }}
    />
  );
};
