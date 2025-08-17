import ReactDOM from 'react-dom/client';

import './styles/styles.css';
import { AppRouter } from './router';
import { QueryProvider } from './query';

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}
