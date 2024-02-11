import { Router } from "express";

import db from "../database";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await db.getCategories();
  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategory(id);
  if (category instanceof Error)
    return res.status(400).json({ error: category.message });
  res.status(200).json(category);
});

export default router;
