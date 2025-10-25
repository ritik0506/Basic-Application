import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  originalRow: { type: Number }, // optional: original CSV row index
}, { timestamps: true });

export default mongoose.model("DistributedItem", itemSchema);
