import { ListOrdered, MapPin, Search } from "lucide-react";
import styles from "../styles/SearchForm.module.css";
import { useState, type FormEvent, useEffect } from "react";
import { useOffers } from "../hooks/useOffers";
import { useSavedOffer } from "../hooks/useSavedOffer";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState(10);
  const [showSaved, setShowSaved] = useState(false); // 🔥 flaga
  const { fetchOffers, setOffers } = useOffers();
  const { savedOffers, loading } = useSavedOffer();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowSaved(false); // jak szukasz nowych, wyłącz zapisane
    await fetchOffers(search, amount, location);
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
          <input
            id="search"
            type="text"
            placeholder="Czego szukasz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.input_wrapper}>
          <MapPin className={styles.icon} />
          <input
            id="location"
            type="text"
            placeholder="Jaka lokalizacja..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.input_wrapper}>
          <ListOrdered className={styles.icon} />
          <input
            id="amount"
            type="number"
            min={1}
            placeholder="Ile elementów..."
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
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
