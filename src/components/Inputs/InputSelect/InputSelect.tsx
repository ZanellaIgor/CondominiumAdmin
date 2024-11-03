import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
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
  isLoading?: boolean;
  multiple?: boolean;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event> | null,
    value: string
  ) => void;
};

export const InputSelect = forwardRef(
  (
    {
      control,
      name,
      options,
      label,
      onInputChange,
      isLoading,
      multiple = false,
      ...rest
    }: InputSelectProps,
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const currentValue = multiple
            ? options.filter((option) => field.value?.includes(option.value))
            : options.find((option) => option.value === field.value) || null;

          return (
            <Autocomplete
              {...field}
              ref={ref}
              loading={isLoading}
              options={options}
              multiple={multiple}
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              getOptionLabel={(option) => option.label}
              value={currentValue}
              onChange={(_, newValue) => {
                if (newValue === null) {
                  field.onChange(null);
                  onInputChange?.(null, '');
                } else {
                  field.onChange((newValue as OptionType).value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  error={!!error}
                  helperText={error?.message}
                  sx={{ margin: 0 }}
                />
              )}
              {...rest}
            />
          );
        }}
      />
    );
  }
);
