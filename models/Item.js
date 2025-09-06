import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);