import { Router } from "express";
import db from "../database";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/me", async (req, res) => {
  const token = req.cookies["X-Auth-Token"];
  if (!token)
    return res.status(200).send({ isLoggedIn: false, reason: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await db.getUser(decoded as string);
    if (!user)
      return res.status(200).send({ isLoggedIn: false, reason: "No user" });
    if (user instanceof Error)
      return res.status(200).send({ isLoggedIn: false, reason: user.message });
    return res.status(200).send({ isLoggedIn: true, user });
  } catch (error) {
    return res
      .status(200)
      .send({ isLoggedIn: false, reason: "Something went wrong" });
  }
});

export default router;
