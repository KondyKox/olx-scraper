const olxRegions: Record<string, string> = {
  dolnośląskie: "dolnoslaskie",
  "kujawsko-pomorskie": "kujawsko-pomorskie",
  lubelskie: "lubelskie",
  lubuskie: "lubuskie",
  łódzkie: "lodzkie",
  małopolskie: "malopolskie",
  mazowieckie: "mazowieckie",
  opolskie: "opolskie",
  podkarpackie: "podkarpackie",
  podlaskie: "podlaskie",
  pomorskie: "pomorskie",
  śląskie: "slaskie",
  świętokrzyskie: "swietokrzyskie",
  "warmińsko-mazurskie": "warminsko-mazurskie",
  wielkopolskie: "wielkopolskie",
  zachodniopomorskie: "zachodniopomorskie",
};

const polishCharsMap: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

export const normalizedLocation = (name?: string): string | undefined => {
  if (!name) return undefined;

  const key = name.trim().toLowerCase();

  // 🔹 Najpierw sprawdzamy województwo
  if (olxRegions[key]) return olxRegions[key];

  // 🔹 Jeśli nie jest województwem — traktujemy jako miasto
  const citySlug = key
    .split(/\s+/)
    .map((word) =>
      word
        .split("")
        .map((char) => polishCharsMap[char] || char)
        .join("")
    )
    .join("-");

  return citySlug;
};
