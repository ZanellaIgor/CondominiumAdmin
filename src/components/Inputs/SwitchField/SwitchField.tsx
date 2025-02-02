import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Controller } from 'react-hook-form';

type SwitchFieldProps = {
  name: string;
  control: any;
  label: string;
} & React.ComponentProps<typeof Switch>;

export const SwitchField = ({
  name,
  control,
  label,
  ...rest
}: SwitchFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Switch {...field} {...rest} checked={field.value} />}
        />
      )}
    />
  );
};
