import type { IChatMessage } from "../models/ChatMessage";
import {
  saveMessage,
  getMessagesByRoom,
} from "../repositories/chatMessageRepository";

export const addMessage = async (
  room: string,
  user: string,
  message: string
): Promise<IChatMessage> => {
  try {
    const chatMessage = await saveMessage(room, user, message);
    return chatMessage;
  } catch (error: any) {
    throw new Error("Error saving message: " + error.message);
  }
};

export const fetchMessagesByRoom = async (
  room: string,
  limit: number = 50
): Promise<IChatMessage[]> => {
  try {
    const messages: IChatMessage[] = await getMessagesByRoom(room, limit);
    return messages;
  } catch (error: any) {
    throw new Error("Error fetching messages: " + error.message);
  }
};

export default {
  addMessage,
  fetchMessagesByRoom,
};
