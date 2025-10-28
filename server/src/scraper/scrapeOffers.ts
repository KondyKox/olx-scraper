// import { saveOffers } from "./saveOffers";
import { createBrowser } from "../config/browser";
import { normalizedLocation } from "../utils/normalizeLocation";
import { acceptCookiesIfPresent } from "../utils/consent";
import { extractOffer } from "./extractOffer";
import { OLX_URL } from "../config/scraper";

export const scrapeOffers = async (
  search: string,
  amount: number,
  location?: string
) => {
  const { browser, page } = await createBrowser();

  // Logi z przeglądarki
  // page.on("console", (msg) => {
  //   const type = msg.type();
  //   if (type === "error" || msg.text().includes("Oferta")) {
  //     console.log(`🌍 [${type.toUpperCase()}] ${msg.text()}`);
  //   }
  // });

  try {
    const query = encodeURIComponent(search.trim());
    const normalized = normalizedLocation(location);

    // 🧭 Jeśli mamy lokalizację, dorzucamy ją
    const searchUrl = normalized
      ? `${OLX_URL}/${normalized}/q-${query}/`
      : `${OLX_URL}/oferty/q-${query}/`;

    console.log("🔍 Wchodzę na stronę OLX...");
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
    });

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
    const offers = await page.$$eval(
      "div[data-cy='l-card']",
      (cards, extractFnString, amount) => {
        console.log("Znaleziono kart:", cards.length);

        const exctractFn = eval(extractFnString);
        return Array.from(cards).slice(0, amount).map(exctractFn);
      },
      extractOffer.toString(),
      amount
    );

    console.log(`📦 Znalazłem ${offers.length} ofert`);
    // saveOffers(offers);

    return offers;
  } catch (err) {
    console.error("🔥 Błąd podczas scrapowania:", err);
    throw err;
  } finally {
    if (browser) {
      console.log("✅ Zakończono scrapowanie, zamykam przeglądarkę...");
      await browser.close();
      console.log("🧠 Puppeteer zamknięty, wszystko git!");
    } else {
      console.log("⚠️ Przeglądarka nie została utworzona – nie mam co zamykać");
    }
  }
};
