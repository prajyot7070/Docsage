
import React from 'react';

interface UserChatProps {
  query: string;
}

const UserChat: React.FC<UserChatProps> = ({ query }) => {
    return (
        <div className="text-white bg-neutral-800 border-2 border-blue-400 rounded-md p-4 mb-2 text-lg">
          <span className="font-semibold">You:</span> {query}
        </div>
      );
};

export default UserChat;
