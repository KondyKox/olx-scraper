import { createContext, useState } from "react";
import type { Offer } from "../types/OfferProps";
import axios from "axios";

interface OffersContextType {
  offers: Offer[];
  fetchOffers: (search: string, amount: number, location?: string) => void;
  loading: boolean;
}

export const OffersContext = createContext<OffersContextType | undefined>(
  undefined
);

export const OffersProvider = ({ children }: { children: React.ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOffers = async (
    search: string,
    amount: number,
    location?: string
  ) => {
    try {
      setLoading(true);

      const res = await axios.get("/api/scrape", {
        params: {
          search: search,
          amount: amount,
          location: location,
        },
      });

      setOffers(res.data.offers as Offer[]);
    } catch (err) {
      console.error("Błąd przy wysyłaniu:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OffersContext.Provider value={{ offers, loading, fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};
