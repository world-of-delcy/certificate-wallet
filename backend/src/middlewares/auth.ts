import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import db from "../database";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["X-Auth-Token"];
  if (!token) return res.status(401).send({ error: "Access denied." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await db.getUser(decoded as string);
    if (!user) return res.status(400).send({ error: "Invalid token." });
    if (user instanceof Error) return res.status(400).send(user.message);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default auth;
