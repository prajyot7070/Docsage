
import React from 'react';

interface ChatWrapperProps {
  children: React.ReactNode;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full md:w-4/6 lg:w-4/6">
      <div className="rounded-lg p-6 w-full">
        {children}
      </div>
    </div>
  );
};

export default ChatWrapper;

