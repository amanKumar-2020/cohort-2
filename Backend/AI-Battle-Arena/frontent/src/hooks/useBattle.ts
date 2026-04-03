import { useState, useCallback } from 'react';
import { BattleState } from '../types/battle.types';
import { api } from '../services/api';

export function useBattle() {
  const [state, setState] = useState<BattleState>({
    problem: null,
    solutions: [],
    isBattleActive: false,
    isLoading: false,
  });

  const initializeBattle = useCallback(async (specs: string) => {
    setState((prev) => ({ ...prev, isLoading: true, isBattleActive: true }));
    try {
      const data = await api.initializeBattle(specs);
      setState((prev) => ({
        ...prev,
        problem: data.problem,
        solutions: data.solutions,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Battle initialization failed:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const resetBattle = useCallback(() => {
    setState({
      problem: null,
      solutions: [],
      isBattleActive: false,
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    initializeBattle,
    resetBattle,
  };
}
