export const extractOffer = (card: Element) => {
  const title = card.querySelector("h4")?.textContent?.trim() || "Brak tytułu";

  const rawPrice =
    card.querySelector("p[data-testid='ad-price']")?.textContent?.trim() ||
    "Brak ceny";

  // 🧹 czyszczenie z CSS, zł, tekstów itp.
  const cleanPrice = rawPrice
    .replace(/[^0-9 zł.,]/g, "") // usuwa znaczniki, klasy itd.
    .replace(/\s+/g, " ") // usuwa nadmiarowe spacje
    .trim();

  // Lokalizacja & Data
  const locationDate =
    card.querySelector("p[data-testid='location-date']")?.textContent?.trim() ||
    "Brak lokalizacji - Brak daty";
  const [location, date] = locationDate.split(/\s*-\s*/).map((s) => s.trim());

  const link = (card.querySelector("a") as HTMLAnchorElement)?.href || "";

  return { title, price: cleanPrice, location, date, link };
};
