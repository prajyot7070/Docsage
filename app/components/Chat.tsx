// pages/chat.tsx

"use client"

import React, { useState } from 'react';
import UserChat from '../components/UserChat';
import AIChat from '../components/AIChat';
import ChatWrapper from '../components/ChatWrapper';

const Chat = () => {
  const [chats, setChats] = useState<{ query: string; response: string }[]>([]);

  return (
    <ChatWrapper>
      {chats.map((chat, index) => (
        <div key={index}>
          <UserChat query={chat.query} />
          <AIChat response={chat.response} />
        </div>
      ))}
    </ChatWrapper>
  );
};

export default Chat;
