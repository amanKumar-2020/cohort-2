import React from 'react';
import { Search, Plus, User } from 'lucide-react';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-[#0e0e13]/40 backdrop-blur-xl border-b border-[#96f8ff]/10 shadow-[0_4px_20px_rgba(0,241,253,0.05)]">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tighter text-[#96f8ff] drop-shadow-[0_0_8px_rgba(150,248,255,0.5)] font-headline uppercase">
          Alita Battle Arena
        </h1>
        <nav className="hidden md:flex items-center gap-6 font-headline uppercase tracking-wider text-sm">
          <a className="text-[#96f8ff] border-b-2 border-[#96f8ff] pb-1" href="#">Arena</a>
          <a className="text-[#acaab1] hover:text-[#96f8ff] transition-colors" href="#">Rankings</a>
          <a className="text-[#acaab1] hover:text-[#96f8ff] transition-colors" href="#">Intel</a>
          <a className="text-[#acaab1] hover:text-[#96f8ff] transition-colors" href="#">Neural Net</a>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <Button size="sm" className="hidden sm:flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Battle
        </Button>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-[#96f8ff]/30 bg-[#19191f] flex items-center justify-center">
          <User className="text-[#96f8ff] w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
