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
  const url = (card.querySelector("a")?.href || "#").trim();

  // Image src & alt
  const imageEl = card.querySelector("img.css-8wsg1m");
  const imageSrc =
    imageEl?.getAttribute("src") ||
    imageEl?.getAttribute("data-src") ||
    imageEl?.getAttribute("data-srcset")?.split(" ")[0] ||
    imageEl?.getAttribute("srcset")?.split(" ")[0] ||
    "";
  const imageAlt = imageEl?.getAttribute("alt");
  const image = {
    src: imageSrc,
    alt: imageAlt,
  };

  const parsedDate = parseDate(date);

  return { id, title, price, location, date: parsedDate, url, image };
};

// Parse date text to normal date
export const parseDate = (dateText: string): string => {
  const months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];

  const now = new Date();
  const lower = dateText.toLowerCase().trim();

  const formatDate = (d: Date) => {
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // 🔹 Dzisiaj
  if (lower.includes("dzisiaj")) return formatDate(now);

  // 🔹 Wczoraj
  if (lower.includes("wczoraj")) {
    const d = new Date(now);
    d.setDate(now.getDate() - 1);
    return formatDate(d);
  }

  return dateText;
};
