import express from "express";
import { scrapeOffers } from "../scraper/scrapeOffers";
// import { saveOffers } from "../scraper/saveOffers";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  const searchParam = req.query.search;
  const locationParam = req.query.location;

  // 🧹 Bezpieczne parsowanie i trimowanie
  const search = typeof searchParam === "string" ? searchParam.trim() : "";
  const location =
    typeof locationParam === "string" ? locationParam.trim() : "";

  if (!search || !search.trim()) {
    console.warn("⚠️  Brak parametru 'search'");
    return res
      .status(400)
      .json({ success: false, error: "No search query provided." });
  }

  try {
    const offers = await scrapeOffers(search, location || undefined);
    // TODO: route dla zapisywania
    // saveOffers(offers);
    res.json({ success: true, offers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Scraping failed." });
  }
});

export default router;
