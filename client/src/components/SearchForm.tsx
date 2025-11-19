import { MapPin, Search } from "lucide-react";
import styles from "../styles/SearchForm.module.css";
import { useState, type FormEvent, useEffect } from "react";
import { useOffers } from "../hooks/useOffers";
import { useSavedOffer } from "../hooks/useSavedOffer";
import {
  SEARCH_ITEMS,
  SEARCH_LOCATIONS,
  SearchItemLabels,
  SearchLocationLabels,
} from "../constants/searchOptions";

const SearchForm = () => {
  const [search, setSearch] = useState("iphone");
  const [location, setLocation] = useState("");
  const [showSaved, setShowSaved] = useState(false); // 🔥 flaga
  const { fetchOffers, setOffers } = useOffers();
  const { savedOffers, loading } = useSavedOffer();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowSaved(false); // jak szukasz nowych, wyłącz zapisane
    await fetchOffers(search, location);
  };

  const handleShowSaved = () => {
    setShowSaved(true);
  };

  // 🔥 reaguj na zakończenie ładowania zapisanych ofert
  useEffect(() => {
    if (showSaved && !loading && savedOffers.length > 0) {
      setOffers(savedOffers);
    }
  }, [showSaved, loading, savedOffers, setOffers]);

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <div className={styles.container}>
        <div className={styles.input_wrapper}>
          <Search className={styles.icon} />
          <select
            id="search"
            className={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            {SEARCH_ITEMS.map((option, i) => (
              <option key={i} value={option}>
                {SearchItemLabels[option]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.input_wrapper}>
          <MapPin className={styles.icon} />
          <select
            id="location"
            className={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {SEARCH_LOCATIONS.map((option, i) => (
              <option key={i} value={option}>
                {SearchLocationLabels[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.container}>
        <button type="submit">Szukaj</button>
        <button
          type="button"
          className={styles.btnDisplay}
          onClick={handleShowSaved}
        >
          Wyświetl zapisane
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
