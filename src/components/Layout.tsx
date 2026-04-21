import { Header } from './Shared/Header';
import { Navigation } from './Shared/Navigation';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-history-parchment flex flex-col selection:bg-history-burgundy selection:text-history-parchment">
      <Header />
      <Navigation />
      <main className="max-w-7xl w-full mx-auto p-6 animate-in fade-in duration-700">
        {children}
      </main>
    </div>
  );
};