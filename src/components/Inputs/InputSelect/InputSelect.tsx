import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';

export type OptionType = {
  value: string | number;
  label: string;
};

type InputSelectProps = {
  control: Control<any, any>;
  name: string;
  label: string;
  options: OptionType[] | [];
  isLoading?: boolean;
  multiple?: boolean;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event> | null,
    value: string
  ) => void;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: OptionType | OptionType[] | null
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
      onChange,
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
              isOptionEqualToValue={(option, value) => {
                return option.value === value?.value;
              }}
              fullWidth
              getOptionLabel={(option) => option.label}
              value={currentValue}
              onChange={(_, newValue) => {
                if (newValue === null) {
                  field.onChange(null);
                  onInputChange?.(null, '');
                } else {
                  if (multiple) {
                    field.onChange(
                      (newValue as OptionType[]).map((option) => option.value)
                    );
                  } else {
                    field.onChange((newValue as OptionType).value);
                  }
                }
                onChange?.(_, newValue);
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
