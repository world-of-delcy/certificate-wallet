import { Router } from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

import db from "../database";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "missing credentials" });
  const user = await db.login(email, password);
  if (user instanceof Error)
    return res.status(400).json({ error: user.message });
  const token = jwt.sign(user.id, process.env.JWT_SECRET as string);

  res.cookie("X-Auth-Token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json(user);
});

router.post("/signup", loginLimiter, async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(400).json({ error: "missing credentials" });
  const user = await db.register(email, name, password);
  if (user instanceof Error)
    return res.status(400).json({ error: user.message });

  const token = jwt.sign(user.id, process.env.JWT_SECRET as string);
  res.cookie("X-Auth-Token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json(user);
});

export default router;

router.post("/logout", async (req, res) => {
  res.clearCookie("X-Auth-Token");
  return res.status(200).json({ message: "logged out" });
});
