import React from 'react';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './CodeBlock';

interface AIChatProps {
  response: string;
}

const AIChat: React.FC<AIChatProps> = ({ response }) => {
  const renderCodeBlock = (props: { children: string }) => {
    const codeLines = props.children.split('\n');
    let language = 'text';
    let code = props.children;

    if (codeLines[0].startsWith('```')) {
      language = codeLines[0].slice(3).trim();
      code = codeLines.slice(1, -1).join('\n');
    }

    return <CodeBlock code={code} language={language} />;
  };

  return (
    <div className="text-white bg-neutral-800 border-2 border-green-400 rounded-md p-4 mb-2 text-lg">
      <span className="font-semibold">AI:</span>{' '}
      <Markdown
        className="prose prose-invert prose-headings:font-semibold prose-code:bg-neutral-700 prose-code:p-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-blue-400 prose-a:underline"
        options={{
          overrides: {
            code: {
              component: renderCodeBlock,
            },
            pre: {
              component: ({ children }) => <>{children}</>,
            },
            a: {
              props: {
                className: 'text-blue-400 underline',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          },
        }}
      >
        {response}
      </Markdown>
    </div>
  );
};

export default AIChat;