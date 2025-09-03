import React from 'react';
import { Header } from './layout/Header';
import { Nav } from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-20">
        {children}
      </main>
      <Nav />
    </div>
  );
};
