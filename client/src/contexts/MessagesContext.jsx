import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const STORAGE_KEY = "ka_messages";
  const [messages, setMessages] = useState({}); // {userId: [{from,to,text,time}]}

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  function sendMessage(from, to, text) {
    const msg = {
      from,
      to,
      text,
      time: new Date().toISOString(),
    };
    setMessages((prev) => {
      const userMsgs = prev[to] || [];
      return { ...prev, [to]: [...userMsgs, msg] };
    });
  }

  function getConversation(userId) {
    return messages[userId] || [];
  }

  const value = useMemo(() => ({ messages, sendMessage, getConversation }), [messages]);

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessages must be used inside MessagesProvider");
  return ctx;
}
