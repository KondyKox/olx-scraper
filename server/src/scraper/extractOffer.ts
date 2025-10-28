export const extractOffer = (card: Element) => {
  // ID
  const id = card.getAttribute("id");

  // Title
  const title = (card.querySelector("h4")?.textContent || "Brak tytułu").trim();

  // Price
  const rawPrice = (
    card.querySelector("p[data-testid='ad-price']")?.textContent || "Brak ceny"
  ).trim();
  const cleanPrice = rawPrice
    .replace(/[^0-9.,]/g, "") // usuwa wszystko poza cyframi, przecinkiem i kropką
    .trim() // usuwa białe znaki (spacje) na początku i końcu
    .replace(",", ".") // zmienia przecinek na kropke
    .replace(/\s/g, ""); // usuwa wszystkie inne spacje
  const price = parseFloat(cleanPrice);

  // Location & Date
  const locDate = (
    card.querySelector("p[data-testid='location-date']")?.textContent || ""
  ).trim();

  let location = locDate;
  let date = "Brak daty";
  if (locDate.includes("-")) {
    const parts = locDate.split(/\s*-\s*/);
    location = parts[0].trim();
    date = parts[1]?.trim() || "Brak daty";
  }

  // Link to page
  const url = (card.querySelector("a")?.href || "").trim();

  // Image src & alt
  const imageEl = card.querySelector("img.css-8wsg1m");
  const imageSrc = imageEl?.getAttribute("src");
  const imageAlt = imageEl?.getAttribute("alt");
  const image = {
    src: imageSrc,
    alt: imageAlt,
  };

  return { id, title, price, location, date, url, image };
};
