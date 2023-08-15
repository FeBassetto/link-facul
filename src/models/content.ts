import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  id: { type: String, primary: true },
  RoomName: { type: String },
  content: { type: String },
  createdTime: { type: Date, default: Date.now },
});

export default mongoose.models.Content ||
  mongoose.model("Content", contentSchema);
