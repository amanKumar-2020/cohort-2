import React from 'react';
import { Metrics } from '../../types/battle.types';
import { ScoreBar } from './ScoreBar';
import { Card } from '../common/Card';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { ShieldCheck } from 'lucide-react';

interface JudgePanelProps {
  metrics: Metrics;
  reasoning: string;
}

export const JudgePanel: React.FC<JudgePanelProps> = ({ metrics, reasoning }) => {
  return (
    <Card variant="glass" className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Metrics */}
        <div className="p-8 border-r border-[#48474d]/10">
          <h5 className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#96f8ff] mb-8">
            System Metrics
          </h5>
          <div className="space-y-6">
            <ScoreBar label="Efficiency" value={metrics.efficiency} color="#96f8ff" />
            <ScoreBar label="Readability" value={metrics.readability} color="#bf81ff" />
            <ScoreBar label="Security" value={metrics.security} color="#ff51fa" />
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="p-8 col-span-2">
          <h5 className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#acaab1] mb-4">
            Neural Analysis Summary
          </h5>
          <div className="font-body text-[#acaab1] leading-relaxed">
            <MarkdownRenderer content={reasoning} />
            <div className="flex items-center gap-2 text-[#ff51fa] text-xs italic mt-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Decision Finalized by Gally_UCRM Core</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
