import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await connectDB();
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findById(decoded.id).populate("cart.itemId");

  if (req.method === "GET") {
    return res.json(user.cart);
  }

  if (req.method === "POST") {
    const { itemId, quantity } = req.body;
    const existing = user.cart.find(c => c.itemId.equals(itemId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ itemId, quantity });
    }
    await user.save();
    return res.json(user.cart);
  }

  res.status(405).end();
}
