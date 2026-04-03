import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-[#ff51fa] prose-code:text-[#96f8ff] prose-code:bg-[#000]/30 prose-code:px-1 prose-code:rounded">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
