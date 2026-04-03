import React from 'react';
import { History, Settings, Terminal, LogOut, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../common/Button';

export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: History, label: 'Battle History', active: true },
    { icon: Settings, label: 'Neural Settings' },
    { icon: Terminal, label: 'System Logs' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-[#131319]/60 backdrop-blur-lg border-r border-[#96f8ff]/5 shadow-[10px_0_40px_rgba(0,241,253,0.03)] flex flex-col pt-20 pb-6 px-4">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-[#96f8ff]/20 flex items-center justify-center border border-[#96f8ff]/30">
            <Cpu className="text-[#96f8ff] w-5 h-5" />
          </div>
          <div>
            <div className="text-[#96f8ff] font-headline font-bold text-sm tracking-tight">Gally_UCRM</div>
            <div className="text-[#acaab1] text-[10px] uppercase tracking-tighter">Hunter-Warrior Rank S</div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full text-[10px] py-1">
          Upgrade Core
        </Button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "group flex items-center gap-3 px-3 py-3 transition-all",
              item.active 
                ? "bg-[#96f8ff]/10 text-[#96f8ff] border-r-2 border-[#96f8ff]" 
                : "text-[#acaab1] hover:bg-[#25252d]/50 hover:text-[#96f8ff]"
            )}
          >
            <item.icon className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform")} />
            <span className="font-body text-sm">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto">
        <a href="#" className="group flex items-center gap-3 px-3 py-3 text-[#acaab1] hover:text-[#ff716c] transition-all">
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-body text-sm">Logout</span>
        </a>
      </div>
    </aside>
  );
};
