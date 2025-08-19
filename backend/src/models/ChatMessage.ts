import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChatMessage extends Document {
  room: string;
  userEmail: string;
  userId: Types.ObjectId;
  message: string;
  timestamp: Date;
}

const ChatMessageSchema = new Schema({
  room: { type: String, required: true, index: true },
  userEmail: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

ChatMessageSchema.index({ room: 1, timestamp: -1 });

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
