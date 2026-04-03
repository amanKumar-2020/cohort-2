import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { ProblemCard } from './components/battle/ProblemCard';
import { SolutionCard } from './components/battle/SolutionCard';
import { JudgePanel } from './components/battle/JudgePanel';
import { LoadingState } from './components/battle/LoadingState';
import { Button } from './components/common/Button';
import { useBattle } from './hooks/useBattle';
import { Swords, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { problem, solutions, isBattleActive, isLoading, initializeBattle } = useBattle();
  const [specs, setSpecs] = useState('');

  const handleInitBattle = () => {
    if (specs.trim()) {
      initializeBattle(specs);
    }
  };

  const winningSolution = solutions.find(s => s.isWinner);

  return (
    <MainLayout>
      {/* Hero / Challenge Input */}
      <section className="mb-12 relative overflow-hidden rounded-xl bg-[#131319] border border-[#48474d]/10 p-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Swords className="w-32 h-32 text-[#96f8ff]" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-headline text-4xl font-bold tracking-tight mb-2 text-[#f9f5fd]">
            Neural Link: Arena Init
          </h2>
          <p className="text-[#acaab1] mb-8 font-body">
            Input the logic problem to trigger a dual-agent neural simulation. Comparing Zalem precision against Iron City grit.
          </p>
          
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                className="w-full bg-[#000]/30 border-b border-[#48474d]/20 focus:border-[#96f8ff] focus:ring-0 text-[#f9f5fd] font-body p-4 min-h-[120px] transition-all placeholder:text-[#48474d] placeholder:font-headline placeholder:text-xs outline-none"
                placeholder="ENTER CODING PROBLEM SPECS..."
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#96f8ff]/50 to-transparent" />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <span className="text-[10px] font-headline text-[#96f8ff]/60 uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Priority: High
                </span>
                <span className="text-[10px] font-headline text-[#96f8ff]/60 uppercase tracking-widest flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Load: 14.2 TB/s
                </span>
              </div>
              <Button 
                onClick={handleInitBattle}
                disabled={isLoading || !specs.trim()}
                className="px-10 py-3"
              >
                {isLoading ? 'Processing...' : 'Initialize Battle'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingState />
          </motion.div>
        ) : isBattleActive && problem ? (
          <motion.div
            key="battle-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <ProblemCard problem={problem} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>

            {winningSolution && (
              <JudgePanel 
                metrics={winningSolution.metrics} 
                reasoning={winningSolution.reasoning} 
              />
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MainLayout>
  );
}
