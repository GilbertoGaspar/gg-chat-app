import { ChatMessage } from "../models/ChatMessage";

export const saveMessage = async (
  room: string,
  userEmail: string,
  userId: string,
  message: string
) => {
  const chatMessage = new ChatMessage({ room, userEmail, userId, message });
  return await chatMessage.save();
};

export const getMessagesByRoom = async (room: string, limit: number = 50) => {
  return await ChatMessage.find({ room })
    .sort({ timestamp: -1 })
    .limit(limit)
    .exec();
};
