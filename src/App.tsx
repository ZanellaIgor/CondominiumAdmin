import ThemeProviderWrapper from '@components/Theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRoutes } from 'react-router-dom';
import { GlobalSnackbar } from './components/Common/Snackbar/Snackbar';
import { routes } from './routes/router';

function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProviderWrapper>
      <GlobalSnackbar />
      <CssBaseline />
      {content}
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProviderWrapper>
  );
}

export default App;
