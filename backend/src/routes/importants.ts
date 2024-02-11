import { Router } from "express";

import db from "../database";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", auth, async (req, res) => {
  const user = req.user;
  const certificates = await db.getImportantCertificates(user.id);
  res.status(200).json(certificates);
});

export default router;
