import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
