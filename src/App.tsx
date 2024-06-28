import ThemeProviderWrapper from '@components/Theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';

function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      {content}
    </ThemeProviderWrapper>
  );
}

export default App;
