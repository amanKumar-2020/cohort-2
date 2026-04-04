import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './SolutionCard.css';

interface SolutionCardProps {
  title: string;
  content: string;
  variant: 'blue' | 'green';
  isWinner?: boolean;
  score?: number;
  index?: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  content,
  variant,
  isWinner = false,
  score,
  index = 0,
}) => {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const accentColor = variant === 'blue' ? 'var(--accent-blue)' : 'var(--accent-green)';
  const accentDim = variant === 'blue' ? 'var(--accent-blue-dim)' : 'var(--accent-green-dim)';
  const glowClass = isWinner ? 'glow-winner' : variant === 'blue' ? 'glow-blue' : 'glow-green';

  return (
    <div
      className={`solution-card glass-card ${glowClass} ${isWinner ? "winner-card" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Winner banner */}
      {isWinner && (
        <div className="winner-banner">
          <span>🏆</span>
          <span>Recommended Solution</span>
          <span>🏆</span>
        </div>
      )}

      {/* Card Header */}
      <div
        className="solution-header"
        style={{ borderBottom: `1px solid ${accentColor}22` }}
      >
        <div className="solution-title-group">
          <div
            className="solution-badge"
            style={{
              background: accentDim,
              borderColor: `${accentColor}44`,
              color: accentColor,
            }}
          >
            {variant === "blue" ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            )}
          </div>
          <h3 className="solution-title">{title}</h3>
          {isWinner && <span className="winner-chip">Winner ✨</span>}
        </div>

        <div className="solution-actions">
          {score !== undefined && (
            <div
              className="score-badge"
              style={{
                color: accentColor,
                borderColor: `${accentColor}33`,
                background: accentDim,
              }}
            >
              <span className="score-value">{score}</span>
              <span className="score-label">/100</span>
            </div>
          )}
          <button
            className="action-btn"
            onClick={() => setCollapsed(!collapsed)}
            id={`collapse-${variant}`}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            className={`action-btn copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            id={`copy-${variant}`}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="solution-body">
          <div className="solution-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const { ref, ...rest } = props as any; // remove ref

                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match;

                  return !isInline ? (
                    <div className="code-block-wrapper">
                      <div className="code-block-header">
                        <span className="code-lang">
                          {match?.[1] || "code"}
                        </span>
                        <CodeCopyButton
                          code={String(children).replace(/\n$/, "")}
                        />
                      </div>

                      <SyntaxHighlighter
                        style={oneDark as any}
                        language={match?.[1] || "text"}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: "0 0 8px 8px",
                          background: "rgba(0, 0, 0, 0.5)",
                          fontSize: "13px",
                          lineHeight: "1.7",
                          border: "none",
                          padding: "16px",
                        }}
                        codeTagProps={{
                          style: { fontFamily: "var(--font-mono)" },
                        }}
                        {...rest} // ✅ use cleaned props
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="inline-code" {...rest}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="collapsed-hint" onClick={() => setCollapsed(false)}>
          <span>Click to expand solution</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}
    </div>
  );
};

const CodeCopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className="code-copy-btn" onClick={handleCopy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
};

export default SolutionCard;
