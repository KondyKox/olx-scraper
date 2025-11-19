import express from "express";
import { saveOffer } from "../scraper/saveOffers.js";

const router = express.Router();

router.post("/saveOffer", async (req, res) => {
  const { offer, search } = req.body;

  /*
   W momemcie jak będę chciał mieć pliki nazwane po przedmiotach

    const searchParam = req.body.search;

    const search = typeof searchParam === "string" ? searchParam.trim() : "";

    if (!search || !search.trim()) {
      console.warn("⚠️  Brak parametru 'search'");
      return res
        .status(400)
        .json({ success: false, error: "No search query provided." });
    } */

  if (!offer || !offer.id) {
    console.warn("⚠️ Brak oferty do zapisania.");
    return res.status(400).json({ success: false, error: "No offer to save." });
  }

  try {
    const result = await saveOffer(offer, search);

    if (result.removed) {
      return res.status(200).json({
        success: true,
        removed: true,
        message: "Oferta została usunięta.",
      });
    }

    return res.status(200).json({
      success: true,
      removed: false,
      message: "Oferta została zapisana.",
    });
  } catch (err) {
    console.error("Nie udało się zapisać oferty:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
