import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-300" />}
      </button>
    </div>
  );
};

export default CodeBlock;
