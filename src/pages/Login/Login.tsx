import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSnackbarStore } from '@src/hooks/snackbar/useSnackbar.store';
import { useAuth } from '@src/hooks/useAuth';
import { api } from '@src/services/api.service';
import { ApiResponse } from '@src/utils/interfaces/Axios.Response';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ILoginFormProps, LoginSchema } from './Login.Schema';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: false, password: false });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    try {
      const data = new FormData(event.currentTarget);

      const values = {
        email: data.get('email')?.toString() ?? '',
        password: data.get('password')?.toString() ?? '',
      };
      LoginSchema.parse(values);
      setError({ email: false, password: false });
      setErrorMessages({ email: '', password: '' });
      mutation.mutate(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce(
          (acc, curr) => {
            const key = curr.path[0] as keyof typeof acc;
            acc[key] = curr.message;
            return acc;
          },
          { email: '', password: '' } as { email: string; password: string }
        );

        setError({
          email: !!fieldErrors.email,
          password: !!fieldErrors.password,
        });
        setErrorMessages(fieldErrors);
      }
    }
  }

  const mutation = useMutation({
    mutationFn: async (values: ILoginFormProps) => {
      const response = await api.post('/login', values);
      return response.data;
    },

    onError: (error: AxiosError<ApiResponse>) => {
      setError({ email: true, password: true });
      setErrorMessages({
        email: 'E-mail ou senha incorretos',
        password: 'E-mail ou senha incorretos',
      });
      showSnackbar(
        error?.response?.data?.message ?? 'Erro não especificado',
        'error'
      );
    },

    onSuccess: async (data: { access_token: string }) => {
      login(data.access_token);
      navigate('/dashboard');
    },
  });

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        maxWidth: '100vw',
        padding: 20,
        marginTop: '10vh',
      }}
    >
      <Card sx={{ width: '80%', maxWidth: '450px', margin: '0 auto' }}>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 4,
            gap: 4,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            submitForm(e);
          }}
        >
          <FormControl error={error.email}>
            <FormLabel htmlFor="email">Email</FormLabel>

            <OutlinedInput
              id="email"
              type="email"
              name="email"
              placeholder="seu email@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              error={error.email}
              sx={{ ariaLabel: 'email' }}
            />
            {error.email && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errorMessages.email}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={error.password}>
            <FormLabel htmlFor="outlined-adornment-password">
              Password
            </FormLabel>

            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error.password && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errorMessages.password}
              </FormHelperText>
            )}
          </FormControl>
          <Button size="small" variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
