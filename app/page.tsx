"use client"

import Image from "next/image";
import { HeroHighlight, Highlight } from "./components/hero-highlight";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "./components/placeholders-and-vanish-input";
// import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import axios from "axios";
import { StreamOptions } from "stream";
import ChatWrapper from "./components/ChatWrapper";
import UserChat from "./components/UserChat";
import AIChat from "./components/AIChat";
import { InfiniteMovingCards } from "./components/infinite-moving-cards";
import { title } from "framer-motion/client";
import { ImageUp } from "lucide-react";
import python from "../app/assets/python_logo.png"
import cLogo from "../app/assets/cLogo.png"
import cppLogo from "../app/assets/cppLogo.png"
import javaLogo from "../app/assets/javaLogo.png"

export default function Home() {
  //State to manage whether to show the chat interface
  const [isChatInterface, setisChatInterface] = useState(false);
  
  const imageItems = [
        {imageUrl: python},
        {imageUrl: cLogo},
        {imageUrl: cppLogo},
        {imageUrl: javaLogo},
      ]
  //State to hold messages
  const [messages, setMessages] = useState< {sender: 'user' | 'ai';content: string}[] > ([]);

  //Handle user query submission
  const handleQuerySubmit = async (query: string) => {
    //hide the hero text
    setisChatInterface(true);
    //adding user msg to conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      {sender: 'user', content: query},
    ]);
    // Sending request
    try{
      const response = await axios.post('api/query', {query: query, language: 'python'}); //hardcoding python change that when multiple langs are supported
      const aiResponse = response.data;
      //add airesponse to convo
      setMessages((prevMessages) => [
        ...prevMessages,
        {sender: 'ai', content:aiResponse},
      ]);
    } catch (error) {
      console.error('Error while Fetching AI response : ', error);
    }
  };

  return (
    <div className="min-h-screen">
    <div className="fixed inset-0 z-0">
    {/* Hero Section with Tag-line */}
    <HeroHighlight isChatInterface={isChatInterface}>
    <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        DocSage: Reliable Answers from Your Most 
        {" "}
        <Highlight className="text-black dark:text-white">
          Trusted 
        </Highlight>
        {" "}
         Programming Guides
      </motion.h1>
      
      {/* Moving Cards */}
            
      <InfiniteMovingCards items={imageItems} />

      {/* Search Bar */}
      {!isChatInterface && (
          <div className="mt-8 w-full flex justify-center fixed bottom-10 mb-20 left-0">
          <PlaceholdersAndVanishInput
            placeholders={['Search for documentation...', 'Ask a question...']}
            // onChange={() => {}}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get('query') as string;
              if (query) {
                handleQuerySubmit(query);
              }
            }}
          />
        </div>
      )}
    </HeroHighlight>
    </div>

    {/* Chat Interface */}
      <div className="relative z-10 w-full flex justify-center flex-grow">
        {isChatInterface && (
          <ChatWrapper>
            {messages.map((message, index) =>
              message.sender === 'user' ? (
                <UserChat key={index} query={message.content} />
              ) : (
                <AIChat key={index} response={message.content} />
              )
            )}

            {/* Input for new queries */}
            <div className="mt-8 w-full flex justify-center pb-20 left-0">
              <PlaceholdersAndVanishInput
                placeholders={['Type your message...', 'What is list in Python ?']}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const query = formData.get('query') as string;
                  if (query) {
                    handleQuerySubmit(query);
                  }
                }}
              />
            </div>
          </ChatWrapper>
        )}
      </div>
    </div>
  );
}
