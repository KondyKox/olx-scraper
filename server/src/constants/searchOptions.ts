export const SEARCH_ITEMS = ["", "iphone", "ps5"] as const;

export type SearchItem = (typeof SEARCH_ITEMS)[number];

export const SEARCH_LOCATIONS = ["", "walbrzych", "dolnoslaskie"] as const;

export type SearchLocation = (typeof SEARCH_LOCATIONS)[number];
