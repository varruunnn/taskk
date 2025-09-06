import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

export default async function handler(req, res) {
  await connectDB();

  const items = [
    { name: "Running Shoes", price: 1200, category: "Footwear", description: "Comfortable running shoes" },
    { name: "Leather Jacket", price: 3500, category: "Clothing", description: "Stylish black leather jacket" },
    { name: "Bluetooth Headphones", price: 2000, category: "Electronics", description: "Noise cancelling headphones" },
    { name: "Smart Watch", price: 4500, category: "Electronics", description: "Fitness tracking smart watch" },
    { name: "Backpack", price: 900, category: "Accessories", description: "Durable waterproof backpack" },
  ];

  await Item.deleteMany({});
  await Item.insertMany(items);

  res.json({ message: "Seeded items", count: items.length });
}
