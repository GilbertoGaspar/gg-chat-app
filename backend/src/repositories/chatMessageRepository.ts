import { ChatMessage } from "../models/ChatMessage";

export const saveMessage = async (
  room: string,
  user: string,
  message: string
) => {
  const chatMessage = new ChatMessage({ room, user, message });
  return await chatMessage.save();
};

export const getMessagesByRoom = async (room: string, limit: number = 50) => {
  return await ChatMessage.find({ room })
    .sort({ timestamp: -1 })
    .limit(limit)
    .exec();
};
