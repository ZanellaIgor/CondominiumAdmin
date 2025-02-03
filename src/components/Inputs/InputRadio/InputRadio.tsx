import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface RadioFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  row?: boolean;
}

export const InputRadio = ({
  control,
  name,
  label,
  options,
  defaultValue = '',
  row = true,
}: RadioFieldProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup row={row} {...field}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};
