import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import { Layout } from '../components/Layout';
import { routes } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          {routes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={<route.element />} 
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
