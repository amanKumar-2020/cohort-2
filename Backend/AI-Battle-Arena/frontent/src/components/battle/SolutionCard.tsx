import React from 'react';
import { Solution } from '../../types/battle.types';
import { Card } from '../common/Card';
import { CopyButton } from '../common/CopyButton';
import { Button } from '../common/Button';
import { Brain, HardDrive, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SolutionCardProps {
  solution: Solution;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card variant={solution.isWinner ? 'winner' : 'default'} className="p-6 flex flex-col h-full relative group">
        {solution.isWinner && (
          <div className="absolute -inset-1 bg-gradient-to-r from-[#96f8ff] to-[#00f1fd] rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
        )}
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded border ${solution.isWinner ? 'bg-[#96f8ff]/10 border-[#96f8ff]/20' : 'bg-[#25252d] border-[#48474d]/10'}`}>
                {solution.isWinner ? (
                  <Brain className="w-5 h-5 text-[#96f8ff]" />
                ) : (
                  <HardDrive className="w-5 h-5 text-[#acaab1]" />
                )}
              </div>
              <div>
                <h4 className={`font-headline text-sm font-bold uppercase tracking-tighter ${solution.isWinner ? 'text-[#f9f5fd]' : 'text-[#acaab1]'}`}>
                  {solution.name}
                </h4>
                <span className={`text-[10px] font-headline uppercase ${solution.isWinner ? 'text-[#96f8ff]' : 'text-[#acaab1]'}`}>
                  {solution.protocol}
                </span>
              </div>
            </div>
            
            {solution.isWinner && (
              <span className="bg-[#96f8ff]/20 text-[#96f8ff] text-[10px] font-headline font-bold px-3 py-1 uppercase tracking-widest border border-[#96f8ff]/40 rounded-full">
                Winner
              </span>
            )}
          </div>

          <div className="flex-1 bg-[#000]/30 rounded p-4 font-mono text-sm border border-[#48474d]/10 overflow-hidden relative">
            <pre className="text-[#f9f5fd]/90 overflow-x-auto">
              <code>{solution.code}</code>
            </pre>
            <div className="absolute top-4 right-4">
              <CopyButton value={solution.code} />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button variant="outline" size="sm" className="flex-1 text-[10px]">
              Expand Logic
            </Button>
            <Button variant="ghost" size="sm" className="p-2 border border-[#48474d]/20">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
