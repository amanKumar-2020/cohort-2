import React from 'react';
import './EmptyState.css';

const EmptyState: React.FC = () => {
  return (
    <div className="empty-state">
      <div className="empty-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="empty-arena">
        <div className="arena-ring">
          <div className="arena-inner">
            <span className="arena-icon">⚔️</span>
          </div>
        </div>
        {/* Two fighters */}
        <div className="fighter fighter-left">
          <div className="fighter-avatar blue">AI</div>
          <span className="fighter-label">Solution 1</span>
        </div>
        <div className="fighter fighter-right">
          <div className="fighter-avatar green">AI</div>
          <span className="fighter-label">Solution 2</span>
        </div>
      </div>

      <div className="empty-text">
        <h2 className="empty-title">The Arena Awaits</h2>
        <p className="empty-description">
          Submit a coding problem to watch two AI solutions battle for supremacy — with a judge to declare the winner.
        </p>
      </div>

      <div className="empty-features">
        {[
          { icon: '🤖', text: 'Dual AI Solutions', sub: 'Two unique approaches generated' },
          { icon: '⚖️', text: 'Smart Judging', sub: 'Scored and analyzed by AI' },
          { icon: '🏆', text: 'Clear Winner', sub: 'Best solution highlighted' },
        ].map((f, i) => (
          <div key={i} className="feature-chip" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="feature-icon">{f.icon}</span>
            <div className="feature-text">
              <div className="feature-name">{f.text}</div>
              <div className="feature-sub">{f.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
