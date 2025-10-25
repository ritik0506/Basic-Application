import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  mobile: { type: String, required: true }, // store with country code e.g. +919876543210
  password: { type: String, required: true }, // hashed
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);
