import React from 'react';
import { motion } from 'motion/react';

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, color }) => {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-headline uppercase mb-1">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 w-full bg-[#25252d] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`
          }}
        />
      </div>
    </div>
  );
};
