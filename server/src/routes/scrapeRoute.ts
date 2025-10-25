import express from "express";
import { scrapeOffers } from "../scraper/scrapeOffers";
import { saveOffers } from "../scraper/saveOffers";

const router = express.Router();

router.get("/scrape", async (_req, res) => {
  try {
    const offers = await scrapeOffers();
    saveOffers(offers);
    res.json({ success: true, offers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Scraping failed." });
  }
});

export default router;
