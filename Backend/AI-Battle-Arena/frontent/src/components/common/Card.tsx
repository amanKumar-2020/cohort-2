import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'winner';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default' }) => {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-300',
        variant === 'default' && 'bg-[#19191f] border-[#48474d]/20',
        variant === 'glass' && 'bg-[#25252d]/40 backdrop-blur-xl border-[#96f8ff]/10',
        variant === 'winner' && 'bg-[#25252d]/40 backdrop-blur-xl border-[#96f8ff]/40 shadow-[0_0_30px_rgba(150,248,255,0.1)]',
        className
      )}
    >
      {children}
    </div>
  );
};
