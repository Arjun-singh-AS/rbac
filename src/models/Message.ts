import mongoose, { Schema, Document } from "mongoose";

// Define the message interface
interface IMessage extends Document {
  content: string;
  createdAt: Date;
}

// Define the message schema
const MessageSchema = new Schema<IMessage>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model
export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
