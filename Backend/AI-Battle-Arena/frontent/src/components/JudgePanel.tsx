import React from 'react';
import type { JudgeResult } from '../types';
import './JudgePanel.css';

interface JudgePanelProps {
  judge: JudgeResult;
  problem: string;
}

const JudgePanel: React.FC<JudgePanelProps> = ({ judge, problem: _problem }) => {
  const winner = judge.solution_1_score >= judge.solution_2_score ? 1 : 2;
  const maxScore = Math.max(judge.solution_1_score, judge.solution_2_score);
  const scoreDiff = Math.abs(judge.solution_1_score - judge.solution_2_score);

  const getVerdict = () => {
    if (scoreDiff === 0) return { text: 'Draw', icon: '🤝', detail: 'Both solutions are equally good!' };
    if (scoreDiff < 5) return { text: `Solution ${winner} wins narrowly`, icon: '🏆', detail: 'Very close battle!' };
    if (scoreDiff < 15) return { text: `Solution ${winner} wins clearly`, icon: '🏆', detail: 'A decisive victory!' };
    return { text: `Solution ${winner} dominates`, icon: '🏆', detail: 'An overwhelming win!' };
  };

  const verdict = getVerdict();

  return (
    <div className="judge-panel glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {/* Header */}
      <div className="judge-header">
        <div className="judge-title-row">
          <div className="judge-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="judge-title">Judge Analysis</h2>
        </div>
        <div className="judge-meta">
          <div className="judge-badge">
            <span>AI Judge</span>
          </div>
          <div className="judge-badge">
            <span>Diff: {scoreDiff} pts</span>
          </div>
        </div>
      </div>

      <div className="judge-body">
        {/* Score comparison */}
        <div className="scores-section">
          <ScoreBar
            label="Solution 1"
            score={judge.solution_1_score}
            maxScore={maxScore}
            variant="blue"
            isWinner={winner === 1}
          />
          <div className="vs-divider">
            <span className="vs-text">VS</span>
          </div>
          <ScoreBar
            label="Solution 2"
            score={judge.solution_2_score}
            maxScore={maxScore}
            variant="green"
            isWinner={winner === 2}
          />
        </div>

        {/* Reasoning */}
        <div className="reasoning-grid">
          <ReasoningCard
            title="Solution 1"
            reasoning={judge.solution_1_reasoning}
            variant="blue"
            score={judge.solution_1_score}
            isWinner={winner === 1}
          />
          <ReasoningCard
            title="Solution 2"
            reasoning={judge.solution_2_reasoning}
            variant="green"
            score={judge.solution_2_score}
            isWinner={winner === 2}
          />
        </div>

        {/* Verdict */}
        <div className={`verdict-card ${scoreDiff === 0 ? 'draw' : 'winner'}`}>
          <div className="verdict-glow"></div>
          <div className="verdict-content">
            <div className="verdict-icon">{verdict.icon}</div>
            <div className="verdict-text-group">
              <div className="verdict-main">{verdict.text}</div>
              <div className="verdict-sub">{verdict.detail}</div>
            </div>
            {scoreDiff !== 0 && (
              <div className={`verdict-solution-badge ${winner === 1 ? 'blue' : 'green'}`}>
                Solution {winner}
              </div>
            )}
          </div>
          <div className="verdict-scores">
            <span className="vs-score blue">{judge.solution_1_score}</span>
            <span className="vs-separator">:</span>
            <span className="vs-score green">{judge.solution_2_score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore: number;
  variant: 'blue' | 'green';
  isWinner: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score, variant, isWinner }) => {
  const color = variant === 'blue' ? 'var(--accent-blue)' : 'var(--accent-green)';
  const dimColor = variant === 'blue' ? 'var(--accent-blue-dim)' : 'var(--accent-green-dim)';

  return (
    <div className={`score-bar-item ${isWinner ? 'winner' : ''}`}>
      <div className="score-bar-header">
        <span className="score-bar-label">{label}</span>
        <span className="score-bar-value" style={{ color }}>{score}</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${dimColor.replace('dim', 'glow')}, ${color})`,
            boxShadow: isWinner ? `0 0 10px ${color}44` : 'none',
          }}
        ></div>
      </div>
      {isWinner && (
        <div className="score-bar-winner" style={{ color }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Winner
        </div>
      )}
    </div>
  );
};

interface ReasoningCardProps {
  title: string;
  reasoning: string;
  variant: 'blue' | 'green';
  score: number;
  isWinner: boolean;
}

const ReasoningCard: React.FC<ReasoningCardProps> = ({ title, reasoning, variant, score, isWinner }) => {
  const color = variant === 'blue' ? 'var(--accent-blue)' : 'var(--accent-green)';
  const dimColor = variant === 'blue' ? 'var(--accent-blue-dim)' : 'var(--accent-green-dim)';

  return (
    <div
      className={`reasoning-card ${isWinner ? 'reasoning-winner' : ''}`}
      style={{
        borderColor: isWinner ? `${color}44` : undefined,
        background: isWinner ? dimColor : undefined,
      }}
    >
      <div className="reasoning-header">
        <div className="reasoning-title" style={{ color }}>{title}</div>
        <div className="reasoning-score" style={{ color }}>{score}<span>/100</span></div>
      </div>
      <p className="reasoning-text">{reasoning}</p>
    </div>
  );
};

export default JudgePanel;
