import { useEffect, useState } from "react";
import type { Offer } from "../types/OfferProps";
import axios from "axios";

export const useSavedOffer = () => {
  const [savedOffers, setSavedOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/saved");
        setSavedOffers(res.data);
      } catch (err) {
        console.error("Nie udało się pobrać zapisanych ofert:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  return { savedOffers, setSavedOffers, loading };
};
