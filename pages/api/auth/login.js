import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export default async function handler(req, res) {
    if (req.method != "POST") return res.status(405).end();
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" })
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ error: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token });
}