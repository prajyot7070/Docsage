
import React from 'react';

interface ChatWrapperProps {
  children: React.ReactNode;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" rounded-lg p-6 w-full md:w-4/6 lg:w-4/6">
        {children}
      </div>
    </div>
  );
};

export default ChatWrapper;
