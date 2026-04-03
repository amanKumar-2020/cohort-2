import React from 'react';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="w-16 h-16 rounded-full border-2 border-[#96f8ff]/20 border-t-[#96f8ff] flex items-center justify-center mb-6"
      >
        <Cpu className="text-[#96f8ff] w-8 h-8" />
      </motion.div>
      <h3 className="font-headline text-sm font-bold uppercase tracking-[0.3em] text-[#96f8ff] animate-pulse">
        Initializing Neural Link...
      </h3>
      <p className="text-[#acaab1] text-xs mt-2 font-mono">Synchronizing with Zalem Core</p>
    </div>
  );
};
