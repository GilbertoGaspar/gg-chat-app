"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useSocket } from "../_hooks/useSocket";
import { useGetMe } from "@/hooks/api";
import ChatMessage from "./ChatMessage";

export function ChatRoom({ roomId }: { roomId: string }) {
  const meQuery = useGetMe();

  const currentUserId = meQuery?.data?.data?.user?.id;
  const { messages, sendMessage } = useSocket(roomId);
  const [messageInput, setMessageInput] = useState("");
  const messagesRef = useRef<HTMLUListElement>(null);

  const onInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMessageInput(e.target.value);
  };

  const onSendMessage = () => {
    sendMessage(messageInput);
    setMessageInput("");
  };

  useEffect(() => {
    messagesRef?.current?.scrollTo({
      top: messagesRef?.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <div className="flex flex-col w-full rounded-lg shadow-md gap-1">
        <h2 className="text-white text-xl font-semibold mb-4">Chat Messages</h2>
        <ul
          className="flex flex-col p-2 gap-2 h-100 scroll-auto  max-h-100 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          ref={messagesRef}
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </ul>
        <div className="flex flex-nowrap gap-2">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={messageInput}
            onChange={onInputChange}
            placeholder="Type your message here."
          ></input>
          <button
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block rounded-md px-3 py-2 text-base font-medium"
            onClick={onSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
