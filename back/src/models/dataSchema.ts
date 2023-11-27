import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  heading: { type: String, required: true },
  content: { type: String },
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
