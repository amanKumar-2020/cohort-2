import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="skeleton-root animate-fade-in">
      {/* Problem skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skel skel-icon"></div>
          <div className="skel skel-title"></div>
        </div>
        <div className="skeleton-body">
          <div className="skel skel-line w-full"></div>
          <div className="skel skel-line w-4-5"></div>
          <div className="skel skel-line w-3-5"></div>
        </div>
      </div>

      {/* Battle label */}
      <div className="skeleton-battle-label">
        <div className="skel skel-label"></div>
      </div>

      {/* Solutions skeleton — two cards */}
      <div className="skeleton-solutions">
        <SkeletonSolutionCard color="blue" />
        <SkeletonSolutionCard color="green" />
      </div>

      {/* Judge skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skel skel-icon"></div>
          <div className="skel skel-title"></div>
        </div>
        <div className="skeleton-body">
          <div className="skeleton-score-row">
            <div className="skeleton-score-block">
              <div className="skel skel-line w-half mb-2"></div>
              <div className="skel skel-bar"></div>
            </div>
            <div className="skel skel-vs-bubble"></div>
            <div className="skeleton-score-block">
              <div className="skel skel-line w-half mb-2"></div>
              <div className="skel skel-bar"></div>
            </div>
          </div>
          <div className="skeleton-reason-row">
            <div className="skeleton-reason-card">
              <div className="skel skel-line w-half mb-2"></div>
              <div className="skel skel-line w-full"></div>
              <div className="skel skel-line w-4-5"></div>
              <div className="skel skel-line w-3-5"></div>
            </div>
            <div className="skeleton-reason-card">
              <div className="skel skel-line w-half mb-2"></div>
              <div className="skel skel-line w-full"></div>
              <div className="skel skel-line w-4-5"></div>
              <div className="skel skel-line w-3-5"></div>
            </div>
          </div>
          <div className="skel skel-verdict"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonSolutionCard: React.FC<{ color: 'blue' | 'green' }> = ({ color }) => (
  <div className={`skeleton-card skeleton-solution-card border-${color}`}>
    <div className="skeleton-header">
      <div className="skel skel-icon"></div>
      <div className="skel skel-title"></div>
      <div className="skel skel-score-pill" style={{ marginLeft: 'auto' }}></div>
    </div>
    <div className="skeleton-body">
      <div className="skel skel-code-header"></div>
      <div className="skel skel-code-block"></div>
      <div className="skel skel-line w-full mt-2"></div>
      <div className="skel skel-line w-4-5"></div>
      <div className="skel skel-code-block sm"></div>
      <div className="skel skel-line w-3-5"></div>
    </div>
  </div>
);

export default SkeletonLoader;
