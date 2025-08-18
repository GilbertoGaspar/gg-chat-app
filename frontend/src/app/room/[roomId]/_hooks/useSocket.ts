import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface IMessage {
  _id: string;
  room: string;
  userEmail: string;
  userId: string;
  message: string;
  timestamp: string;
}

let socket: Socket | null = null;

export function useSocket(roomId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.emit("leaveRoom", roomId);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomId]);

  useEffect(() => {
    if (!socket) {
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
        {
          path: "/socket.io",
          withCredentials: true,
        }
      );
    }

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
      socket?.emit("joinRoom", roomId);
    });

    socket.on("receiveMessage", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("chatHistory", (history: IMessage[]) => {
      setMessages(history);
    });

    socket.on("userJoined", (message: string) => {
      const serverJoinMessage = {
        _id: "",
        room: "",
        userEmail: "Server",
        userId: "-1",
        message: message,
        timestamp: Date.now().toString(),
      };
      setMessages((prev) => [...prev, serverJoinMessage]);
    });

    socket.on("userLeft", (message: string) => {
      const userLeftMessage = {
        _id: "",
        room: "",
        userEmail: "Server",
        userId: "-1",
        message: message,
        timestamp: Date.now().toString(),
      };
      setMessages((prev) => [...prev, userLeftMessage]);
    });
  }, [roomId]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit("sendMessage", { room: roomId, message });
    }
  };

  return { messages, sendMessage };
}
