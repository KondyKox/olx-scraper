import { Heart } from "lucide-react";
import { useOffers } from "../hooks/useOffers";
import styles from "../styles/OffersList.module.css";
import type { Offer } from "../types/OfferProps";
import axios from "axios";
import { useSavedOffer } from "../hooks/useSavedOffer";
import { useSearch } from "../hooks/useSearch";

const OffersList = () => {
  const { offers, loading } = useOffers();
  const { search } = useSearch();
  const { savedOffers, setSavedOffers } = useSavedOffer();

  const handleClick = async (e: React.MouseEvent, offer: Offer) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await axios.post("/api/saveOffer", { offer, search });
      const { removed } = res.data;

      setSavedOffers((prev) => {
        if (removed) return prev.filter((o) => o.id !== offer.id);
        else return [...prev, offer];
      });
    } catch (err) {
      console.error("Nie udało się zapisać oferty:", err);
    }
  };

  return (
    <ul className={styles.offersList}>
      {loading ? (
        <p>loading...</p> // zrobic skeletony zamiast tego
      ) : !offers ? (
        <h2 className={styles.noOffers}>Brak ofert 🥺🥺🥺</h2>
      ) : (
        offers.map((offer) => {
          const isSaved = savedOffers.some((saved) => saved.id === offer.id);

          return (
            <li key={offer.id} className={styles.offer}>
              <a href={offer.url} target="_blank">
                <img
                  src={offer.image.src}
                  alt={offer.image.alt}
                  className={styles.offerImage}
                />
                <div className={styles.offerData}>
                  <div className={styles.dataContainer}>
                    <h3>{offer.title}</h3>
                    <p className={styles.price}>{offer.price}zł</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <span>{offer.location}</span>
                    <span>{offer.date}</span>
                    <Heart
                      className={`${styles.saveIcon} ${
                        isSaved ? styles.saved : ""
                      }`}
                      onClick={(e) => handleClick(e, offer)}
                    />
                  </div>
                </div>
              </a>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default OffersList;
