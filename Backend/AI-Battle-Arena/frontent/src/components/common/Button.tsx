import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-br from-[#96f8ff] to-[#00f1fd] text-[#005f64] hover:shadow-[0_0_15px_rgba(150,248,255,0.4)]',
      secondary: 'bg-[#ff51fa] text-[#400040] hover:shadow-[0_0_15px_rgba(255,81,250,0.4)]',
      ghost: 'bg-transparent text-[#acaab1] hover:text-[#96f8ff] hover:bg-[#96f8ff]/10',
      outline: 'bg-transparent border border-[#96f8ff]/20 text-[#96f8ff] hover:bg-[#96f8ff]/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2 text-sm',
      lg: 'px-8 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'font-headline font-bold uppercase tracking-widest transition-all duration-150 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
