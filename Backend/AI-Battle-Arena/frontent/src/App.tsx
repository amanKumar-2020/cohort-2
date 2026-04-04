import React, { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import SolutionCard from './components/SolutionCard';
import JudgePanel from './components/JudgePanel';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import type { BattleResponse, BattleStatus } from './types';
import './App.css';

const API_URL = '/api/battle';

const App: React.FC = () => {
  const [status, setStatus] = useState<BattleStatus>('idle');
  const [result, setResult] = useState<BattleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const winner = result
    ? result.judge.solution_1_score >= result.judge.solution_2_score ? 1 : 2
    : null;

  const handleSubmit = async (problem: string) => {
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const data: BattleResponse = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      setStatus('error');
    }
  };

  return (
    <div className="app-root">
      <Header />

      <div className="app-layout">
        {/* Left: Input panel */}
        <InputPanel onSubmit={handleSubmit} isLoading={status === 'loading'} />

        {/* Right: Main content */}
        <main className="main-content">
          {/* Loading */}
          {status === 'loading' && <SkeletonLoader />}

          {/* Error */}
          {status === 'error' && error && (
            <div className="error-state animate-fade-in">
              <div className="error-icon">⚠️</div>
              <div className="error-body">
                <h3 className="error-title">Battle Failed</h3>
                <p className="error-message">{error}</p>
                <button
                  className="error-retry"
                  onClick={() => { setStatus('idle'); setError(null); }}
                  id="retry-btn"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Success results */}
          {status === 'success' && result && (
            <div className="results-container">
              {/* Problem card */}
              <div className="problem-card glass-card animate-fade-in-up" id="problem-card">
                <div className="problem-header">
                  <div className="problem-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>Problem</span>
                  </div>
                  <div className="problem-badge">Submitted</div>
                </div>
                <p className="problem-text">{result.problem}</p>
              </div>

              {/* Battle header */}
              <div className="battle-header animate-fade-in">
                <div className="battle-divider"></div>
                <div className="battle-label">
                  <span className="battle-icon">⚔️</span>
                  <span>Battle Arena</span>
                  <span className="battle-icon">⚔️</span>
                </div>
                <div className="battle-divider"></div>
              </div>

              {/* Solutions */}
              <div className="solutions-grid">
                <SolutionCard
                  title="Solution 1"
                  content={result.solution_1}
                  variant="blue"
                  isWinner={winner === 1}
                  score={result.judge.solution_1_score}
                  index={0}
                />
                <SolutionCard
                  title="Solution 2"
                  content={result.solution_2}
                  variant="green"
                  isWinner={winner === 2}
                  score={result.judge.solution_2_score}
                  index={1}
                />
              </div>

              {/* Judge panel */}
              <JudgePanel judge={result.judge} problem={result.problem} />
            </div>
          )}

          {/* Empty */}
          {status === 'idle' && <EmptyState />}
        </main>
      </div>
    </div>
  );
};

export default App;
