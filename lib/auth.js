import jwt from "jsonwebtoken";

export const SECRET = process.env.JWT_SECRET;

export function signToken(user) {
  return jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}
