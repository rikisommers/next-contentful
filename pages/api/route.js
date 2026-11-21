import { serialize } from "cookie";

/**
 * Checks the password for protected pages and sets the login cookie.
 * The cookie is read in the browser (`password-page-pages.js`), so it is not httpOnly.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const expected = process.env.PAGE_PASSWORD;
  const cookieName = process.env.PASSWORD_COOKIE_NAME;
  if (!expected || !cookieName) {
    return res.status(503).json({ message: "Password protection is not configured" });
  }

  const password = req.body?.password;
  if (typeof password !== "string" || password !== expected) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.setHeader("Set-Cookie", serialize(cookieName, "true", { path: "/" }));
  return res.status(200).json({ message: "Password correct" });
}
