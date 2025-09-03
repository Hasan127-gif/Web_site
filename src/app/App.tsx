import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { AppRouter } from './routes';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
