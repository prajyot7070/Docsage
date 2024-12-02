"use client"

import Image from "next/image";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUser,
  IconUserBolt,
} from "@tabler/icons-react";
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
import {Sidebar, SidebarBody,DesktopSidebar, SidebarLink } from "./components/sidebar";
import { InfiniteMovingCards } from "./components/infinite-moving-cards";
import { title } from "framer-motion/client";
import { ImageUp } from "lucide-react";
import {signIn, signOut, useSession} from "next-auth/react"
import { Logo } from "./components/Logo";

export default function Home() {
  //State to manage whether to show the chat interface
  const [isChatInterface, setisChatInterface] = useState(false);
  
  //State to hold messages
  const [messages, setMessages] = useState< {sender: 'user' | 'ai';content: string}[] > ([]);

  //selected language
  const [selectedLanguage, setSelectedLanuage] = useState(() => {

    });
  const { data: session } = useSession();
  //links for the sidebar
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Login",
      onClick: signIn,
      href: "#",
      icon: (
        <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      onClick: signOut,
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "languages",
      href: "#",
    }
  ];
  const [open, setOpen] = useState(false);
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
    {/*Main Logo*/}
    <div className="fixed inset-0 z-1">
    <Logo />
    </div>
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

      {/* Sidebar */}
      <div className="fixed inset-0 z-0">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
          </div>
          <button onClick={signIn}>Login</button>
        </div>
        </SidebarBody>
      </Sidebar>
      </div>

      {/* Moving Cards */}
            
      <InfiniteMovingCards/>
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
