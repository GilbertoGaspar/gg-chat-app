import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import userService from "../services/userService.js";

import ChatMessageService from "../services/chatMessageService.js";

// Extend the Socket type to include 'user'
declare module "socket.io" {
  interface Socket {
    user?: any;
  }
}

let io: Server;

export const initSocket = async (server: any) => {
  io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  console.log("Socket.io initialized", server.address().port);

  const pubClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });
  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.use(async (socket, next) => {
    const cookiesString = socket.handshake.headers.cookie ?? "";
    const cookies = cookiesString
      .split(";")
      .map((cookie) => cookie.trim().split("="))
      .reduce((acc, [key, value]) => {
        if (key !== undefined && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

    const token = cookies.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    try {
      const jwtUser = jwt.verify(token, process.env.JWT_SECRET || "") as any;
      const user = await userService.getUserById(jwtUser.id);
      socket.user = { email: user.email, userId: user._id };
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.email}`);

    socket.on("joinRoom", async (room) => {
      socket.join(room);

      socket
        .to(room)
        .emit("userJoined", `${socket.user.email} has joined the room.`);

      const history = await ChatMessageService.fetchMessagesByRoom(room);
      socket.emit("chatHistory", history.reverse() || []);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      socket
        .to(room)
        .emit("userLeft", `${socket.user.email} has left the room.`);
    });

    socket.on("sendMessage", async ({ room, message }) => {
      const savedMessage = await ChatMessageService.addMessage(
        room,
        socket.user.email,
        socket.user.userId,
        message
      );
      io.to(room).emit("receiveMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.email}`);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
