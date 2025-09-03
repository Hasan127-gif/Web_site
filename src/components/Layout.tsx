import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Nav } from './Nav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};
