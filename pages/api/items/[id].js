import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await Item.findByIdAndDelete(id);
    return res.json({ message: "Deleted" });
  }

  res.status(405).end();
}
