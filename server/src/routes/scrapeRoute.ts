import express from "express";
import { scrapeOffers } from "../scraper/scrapeOffers";
// import { saveOffers } from "../scraper/saveOffers";

const router = express.Router();

router.get("/scrape", async (_req, res) => {
  const { search, location } = _req.query;

  if (!search) {
    console.warn("⚠️  Brak parametru 'search'");
    return res.status(400).json({ success: false, error: "No search query." });
  }

  try {
    const offers = await scrapeOffers();
    // TODO: route dla zapisywania
    // saveOffers(offers);
    res.json({ success: true, offers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Scraping failed." });
  }
});

export default router;
