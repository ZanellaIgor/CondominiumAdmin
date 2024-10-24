import ThemeProviderWrapper from '@components/Theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';
import { GlobalSnackbar } from './components/Common/Snackbar/Snackbar';
import { routes } from './routes/router';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  const content = useRoutes(routes);
  return (
    <ThemeProviderWrapper>
      <QueryClientProvider client={queryClient}>
        <GlobalSnackbar />
        <CssBaseline />
        {content}
      </QueryClientProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
