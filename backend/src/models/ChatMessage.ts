import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  room: string;
  userEmail: string;
  userId: string;
  message: string;
  timestamp: Date;
}

const ChatMessageSchema = new Schema({
  room: { type: String, required: true, index: true },
  userEmail: { type: String, required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

ChatMessageSchema.index({ room: 1, timestamp: -1 });

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
