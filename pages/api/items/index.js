import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

export default async function handler(req, res) {
  await connectDB();
  
  if (req.method === "GET") {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    const items = await Item.find(filter);
    return res.json(items);
  }

  if (req.method === "POST") {
    const { name, price, category, description } = req.body;
    const item = await Item.create({ name, price, category, description });
    return res.json(item);
  }

  res.status(405).end();
}
