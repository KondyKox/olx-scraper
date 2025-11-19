import type { Offer } from "../types/OfferProps";
import type { DirectionType, SortByType } from "../types/SortProps";

export const sortOffers = (
  offers: Offer[],
  sortBy: SortByType,
  direction: DirectionType
) => {
  return [...offers].sort((a, b) => {
    let A = sortBy === "date" ? new Date(a.date).getTime() : a.price;
    let B = sortBy === "date" ? new Date(b.date).getTime() : b.price;

    return direction === "asc" ? A - B : B - A;
  });
};
