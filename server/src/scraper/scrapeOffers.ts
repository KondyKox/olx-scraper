import { saveOffers } from "./saveOffers";
import { createBrowser } from "../config/browser";
import { OLX_URL } from "../config/scraper";
import { acceptCookiesIfPresent } from "../utils/consent";

export const scrapeOffers = async () => {
  const { browser, page } = await createBrowser();

  // Logi z przeglądarki
  page.on("console", (msg) => {
    console.log("🌍 [Browser log]:", msg.text());
  });

  console.log("🔍 Wchodzę na stronę OLX...");

  await page.goto(OLX_URL, { waitUntil: "domcontentloaded" });
  await acceptCookiesIfPresent(page); // akceptuje cookies

  console.log("⌛ Czekam aż OLX załaduje oferty...");
  // Czekaj aż faktycznie pojawi się kilka ofert (nie tylko 1)
  await page.waitForFunction(
    () => document.querySelectorAll("div[data-cy='l-card']").length > 10,
    { timeout: 20000 }
  );

  // Daj sekundę na dorysowanie i lazy-loady
  await new Promise((res) => setTimeout(res, 1500));

  // Pobiera oferty
  const offers = await page.$$eval("div[data-cy='l-card']", (cards) => {
    console.log("Znaleziono kart:", cards.length);

    return Array.from(cards)
      .slice(0, 5)
      .map((card, i) => {
        const title = (
          card.querySelector("h4")?.textContent || "Brak tytułu"
        ).trim();
        const rawPrice = (
          card.querySelector("p[data-testid='ad-price']")?.textContent ||
          "Brak ceny"
        ).trim();
        const cleanPrice = rawPrice.replace(/[^0-9 zł.,]/g, "").trim();

        const locDate = (
          card.querySelector("p[data-testid='location-date']")?.textContent ||
          ""
        ).trim();

        let location = locDate;
        let date = "Brak daty";
        if (locDate.includes("-")) {
          const parts = locDate.split(/\s*-\s*/);
          location = parts[0].trim();
          date = parts[1]?.trim() || "Brak daty";
        }

        const link = (card.querySelector("a")?.href || "").trim();

        console.log(`Oferta ${i + 1}:`, {
          title,
          cleanPrice,
          location,
          date,
          link,
        });

        return { title, price: cleanPrice, location, date, link };
      });
  });

  console.log(`📦 Znalazłem ${offers.length} ofert`);
  saveOffers(offers);

  console.log("✅ Zakończono scrapowanie, zamykam przeglądarkę...");
  await browser.close();
  console.log("🧠 Puppeteer zamknięty, wszystko git!");

  return offers;
};
