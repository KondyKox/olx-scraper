import { createContext, useEffect, useState } from "react";
import type { Offer } from "../types/OfferProps";
import axios from "axios";
import { useSort } from "../hooks/useSort";
import { sortOffers } from "../utils/sortOffers";

interface OffersContextType {
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  fetchOffers: (search: string, location?: string) => void;
  loading: boolean;
}

export const OffersContext = createContext<OffersContextType | undefined>(
  undefined
);

export const OffersProvider = ({ children }: { children: React.ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { sortBy, direction } = useSort();

  const fetchOffers = async (search: string, location?: string) => {
    try {
      setLoading(true);

      const res = await axios.get("/api/scrape", {
        params: {
          search: search,
          location: location,
        },
      });

      const data = res.data.offers as Offer[];
      const sorted = sortOffers(data, sortBy, direction);

      setOffers(sorted);
    } catch (err) {
      console.error("Błąd przy wysyłaniu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffers((prev) => sortOffers(prev, sortBy, direction));
  }, [sortBy, direction]);

  return (
    <OffersContext.Provider value={{ offers, setOffers, loading, fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};
