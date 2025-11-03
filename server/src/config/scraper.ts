export const OLX_URL = "https://www.olx.pl";

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

export const HEADLESS = true;

export const PUPPETEER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-geolocation", // 🔒 wyłącza całkowicie pytanie o lokalizację
  "--disable-blink-features=AutomationControlled",
];
