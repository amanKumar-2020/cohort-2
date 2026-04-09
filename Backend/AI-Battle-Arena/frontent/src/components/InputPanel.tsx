import React, { useState, useRef } from "react";
import "./InputPanel.css";

interface InputPanelProps {
  onSubmit: (problem: string) => void;
  isLoading: boolean;
  isResponseReady: boolean;
}

const EXAMPLE_PROBLEMS = [
  "Find the two numbers in an array that sum to a target value",
  "Implement a LRU cache with O(1) get and put operations",
  "Given a binary tree, return the level order traversal",
  "Check if a string is a valid palindrome ignoring non-alphanumeric characters",
];

const InputPanel: React.FC<InputPanelProps> = ({
  onSubmit,
  isLoading,
  isResponseReady,
}) => {
  const [problem, setProblem] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblem(e.target.value);
    setCharCount(e.target.value.length);
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    if (problem.trim() && !isLoading) {
      setHasSubmitted(true);
      onSubmit(problem.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  const loadExample = (example: string) => {
    setProblem(example);
    setCharCount(example.length);
    setHasSubmitted(false);
    textareaRef.current?.focus();
  };

  const clearInput = () => {
    setProblem("");
    setCharCount(0);
    setHasSubmitted(false);
    textareaRef.current?.focus();
  };

  return (
    <aside className={`input-panel ${isResponseReady ? "response-ready" : ""}`}>
      {/* Panel header */}
      <div className="panel-header">
        <div className="panel-title-row">
          <div className="panel-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <h2 className="panel-title">Problem Input</h2>
        </div>
        <span className="panel-subtitle">Describe your coding challenge</span>
      </div>

      {/* Textarea area */}
      <div className="textarea-wrapper">
        <div className="textarea-label">
          <span>Problem Statement</span>
          {problem && (
            <button
              className="clear-btn"
              onClick={clearInput}
              id="clear-problem"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear
            </button>
          )}
        </div>
        <div className="textarea-container">
          <textarea
            ref={textareaRef}
            id="problem-input"
            className="problem-textarea"
            placeholder="Enter your coding problem...&#10;&#10;Example: Find the longest substring without repeating characters in a given string."
            value={problem}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={2000}
          />
          <div className="textarea-footer">
            <span
              className="char-count"
              style={{
                color:
                  charCount > 1800 ? "var(--accent-red)" : "var(--text-muted)",
              }}
            >
              {charCount}/2000
            </span>
            <span className="shortcut-hint">
              <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to submit
            </span>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        id="submit-battle"
        className={`submit-btn ${isLoading ? "loading" : ""} ${!problem.trim() ? "disabled" : ""}`}
        onClick={handleSubmit}
        disabled={!problem.trim() || isLoading}
      >
        {isLoading ? (
          <span className="btn-content">
            <span className="spinner"></span>
            Battling...
          </span>
        ) : (
          <span className="btn-content">
            <span className="btn-icon">⚔️</span>
            Start Battle
          </span>
        )}
        <span className="btn-shimmer"></span>
      </button>

      {/* Progress indicator */}
      {isLoading && (
        <div className="loading-steps">
          <div className="loading-step active">
            <div className="step-dot"></div>
            <span>Generating Solution 1</span>
          </div>
          <div
            className="loading-step active"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="step-dot"></div>
            <span>Generating Solution 2</span>
          </div>
          <div className="loading-step active" style={{ animationDelay: "1s" }}>
            <div className="step-dot"></div>
            <span>Judge evaluating...</span>
          </div>
        </div>
      )}

      <div
        className={`quick-examples ${problem.trim() ? "has-input" : ""} ${hasSubmitted ? "has-submitted" : ""}`}
      >
        {/* Divider */}
        <div className="panel-divider">
          <span>Quick Examples</span>
        </div>

        {/* Examples */}
        <div className="examples-list">
          {EXAMPLE_PROBLEMS.map((ex, i) => (
            <button
              key={i}
              id={`example-${i}`}
              className="example-btn"
              onClick={() => loadExample(ex)}
              disabled={isLoading}
            >
              <span className="example-num">{i + 1}</span>
              <span className="example-text">{ex}</span>
              <svg
                className="example-arrow"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Footer tip */}
      <div className="panel-tip">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>
          Be specific about constraints, input types, and expected outputs for
          best results.
        </span>
      </div>
    </aside>
  );
};

export default InputPanel;
