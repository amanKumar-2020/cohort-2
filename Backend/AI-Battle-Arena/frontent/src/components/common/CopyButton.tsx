import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CopyButtonProps {
  value: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="p-2">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
};
