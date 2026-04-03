export interface Metrics {
  efficiency: number;
  readability: number;
  security: number;
}

export interface Solution {
  id: string;
  name: string;
  protocol: string;
  code: string;
  isWinner?: boolean;
  metrics: Metrics;
  reasoning: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  timeConstraint: string;
  memoryTier: string;
}

export interface BattleState {
  problem: Problem | null;
  solutions: Solution[];
  isBattleActive: boolean;
  isLoading: boolean;
}
