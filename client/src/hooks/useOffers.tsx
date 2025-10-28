import { useContext } from "react";
import { OffersContext } from "../context/OffersContext";

export const useOffers = () => {
  const ctx = useContext(OffersContext);
  if (!ctx) throw new Error("useOffers must be used within OffersProvider!");
  return ctx;
};
