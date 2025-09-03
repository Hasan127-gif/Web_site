import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Roommates } from '../pages/Roommates';
import { Pets } from '../pages/Pets';
import { Furniture } from '../pages/Furniture';
import { NewListing } from '../pages/NewListing';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="roommates" element={<Roommates />} />
          <Route path="pets" element={<Pets />} />
          <Route path="furniture" element={<Furniture />} />
          <Route path="new-listing" element={<NewListing />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
