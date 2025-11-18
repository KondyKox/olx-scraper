export const SEARCH_ITEMS = ["", "iphone", "ps5"] as const;

export type SearchItem = (typeof SEARCH_ITEMS)[number];

export const SEARCH_LOCATIONS = ["", "walbrzych", "dolnoslaskie"] as const;

export type SearchLocation = (typeof SEARCH_LOCATIONS)[number];

export const SearchItemLabels: Record<SearchItem, string> = {
  "": "Wszystko",
  iphone: "iPhone",
  ps5: "PS5",
};

export const SearchLocationLabels: Record<SearchLocation, string> = {
  "": "Każda lokalizacja",
  walbrzych: "Wałbrzych",
  dolnoslaskie: "Dolnośląskie",
};
