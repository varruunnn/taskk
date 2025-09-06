import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await connectDB();
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findById(decoded.id);

  if (req.method === "DELETE") {
    user.cart = user.cart.filter(c => !c.itemId.equals(req.query.itemId));
    await user.save();
    return res.json(user.cart);
  }

  res.status(405).end();
}
