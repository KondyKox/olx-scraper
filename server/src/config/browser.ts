import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { HEADLESS, PUPPETEER_ARGS, USER_AGENT } from "./scraper.js";

puppeteer.use(StealthPlugin());

export const createBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: PUPPETEER_ARGS,
    defaultViewport: { width: 1280, height: 800 },
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://www.olx.pl", []);

  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);
  await page.setExtraHTTPHeaders({
    "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8",
  });

  return { browser, page, context };
};
