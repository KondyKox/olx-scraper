import { useOffers } from "../hooks/useOffers";
import styles from "../styles/OffersList.module.css";

const OffersList = () => {
  const { offers, loading } = useOffers();

  return (
    <ul className={styles.offersList}>
      {loading ? (
        <p>loading...</p> // zrobic skeletony zamiast tego
      ) : !offers ? (
        <h2 className={styles.noOffers}>Brak ofert 🥺🥺🥺</h2>
      ) : (
        offers.map((offer) => (
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
                  <p className={styles.price}>
                    Cena: <span>{offer.price}</span>zł
                  </p>
                </div>
                <div className={styles.dataContainer}>
                  <span>{offer.location}</span>
                  <span>{offer.date}</span>
                </div>
              </div>
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export default OffersList;
