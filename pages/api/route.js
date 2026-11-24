import { serialize } from "cookie";
import {
  accessCookieName,
  accessCookieOptions,
  accessToken,
  isCorrectPassword,
} from "../../lib/case-study-access";

/** Checks the password for protected case studies and sets the httpOnly access cookie. */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const token = accessToken();
  if (!token) {
    return res.status(503).json({ message: "Password protection is not configured" });
  }

  if (!isCorrectPassword(req.body?.password)) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.setHeader("Set-Cookie", serialize(accessCookieName(), token, accessCookieOptions()));
  return res.status(200).json({ message: "Password correct" });
}
