import { useRoutes } from 'react-router-dom';
import './App.css';
import ThemeProviderWrapper from './components/theme/ThemeProvider';
import { routes } from './router';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <ThemeProviderWrapper>{content}</ThemeProviderWrapper>
    </>
  );
}

export default App;
