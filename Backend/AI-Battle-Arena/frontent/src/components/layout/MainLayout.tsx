import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0e0e13] text-[#f9f5fd] font-body selection:bg-[#96f8ff] selection:text-[#005f64]">
      <Header />
      <Sidebar />
      <main className="ml-64 pt-20 min-h-screen cyber-grid relative">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {children}
        </div>
        
        {/* Decorative Scanning Line */}
        <div className="fixed bottom-0 left-64 right-0 h-[1px] bg-[#96f8ff]/20 pointer-events-none overflow-hidden">
          <div className="h-full w-48 bg-[#96f8ff] shadow-[0_0_15px_#96f8ff] animate-scan" />
        </div>
      </main>
    </div>
  );
};
