import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';

import ThemeProviderWrapper from '@components/theme/ThemeProvider';
import { routes } from './router';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <ThemeProviderWrapper>
        <CssBaseline />
        {content}
      </ThemeProviderWrapper>
    </>
  );
}

export default App;
