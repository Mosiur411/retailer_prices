import express from "express";
import { fetchProduct } from "../utils/fetchProduct.js";

const router = express.Router();

router.get("/:barcode", async (req, res) => {
  const { barcode } = req.params;
  if (!barcode) return res.status(400).json({ error: "Missing barcode" });

  const product = await fetchProduct(barcode);
  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json({ ok: true, product });
});

export default router;
