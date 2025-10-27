import { MapPin, Search } from "lucide-react";
import styles from "../styles/SearchForm.module.css";
import { useState, type FormEvent } from "react";
import axios from "axios";
import type { Offer } from "../types/OfferProps";

type SearchFormProps = {
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
};

const SearchForm = ({ setOffers }: SearchFormProps) => {
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.get("/api/scrape", {
        params: {
          search: search,
          location: location,
        },
      });

      setOffers(res.data.offers as Offer[]);
    } catch (err) {
      console.error("Błąd przy wysyłaniu:", err);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.input_container}>
      <div className={styles.input_wrapper}>
        <Search className={styles.icon} />
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Czego szukasz..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.input_wrapper}>
        <MapPin className={styles.icon} />
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Jaka lokalizacja..."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button>Szukaj</button>
    </form>
  );
};

export default SearchForm;
