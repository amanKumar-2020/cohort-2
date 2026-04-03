import React from 'react';
import { Problem } from '../../types/battle.types';
import { Card } from '../common/Card';
import { MarkdownRenderer } from '../common/MarkdownRenderer';

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  return (
    <Card variant="glass" className="p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-[#96f8ff]"></div>
        <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-[#96f8ff]">
          Mission Intel: {problem.title}
        </h3>
      </div>
      
      <div className="font-body text-[#f9f5fd] space-y-3 max-w-4xl">
        <div className="text-lg leading-relaxed">
          <MarkdownRenderer content={problem.description} />
        </div>
        
        <div className="flex gap-6 pt-4 border-t border-[#48474d]/20">
          <div>
            <span className="block text-[10px] font-headline text-[#acaab1] uppercase">Time Constraint</span>
            <span className="text-sm font-mono text-[#00e2ed]">{problem.timeConstraint}</span>
          </div>
          <div>
            <span className="block text-[10px] font-headline text-[#acaab1] uppercase">Memory Tier</span>
            <span className="text-sm font-mono text-[#00e2ed]">{problem.memoryTier}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
