import express from "express";
import { readOffers } from "../scraper/saveOffers.js";

const router = express.Router();

router.get("/saved", async (req, res) => {
  try {
    const offers = readOffers();
    res.json(offers);
  } catch (err) {
    console.error("Błąd przy pobieraniu zapisanych ofert:", err);
    res.status(500).json({ error: "Błąd serwera.", success: false });
  }
});

export default router;
