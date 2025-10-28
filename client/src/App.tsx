import { useState } from "react";
import HeaderLogo from "./components/HeaderLogo";
import SearchForm from "./components/SearchForm";
import type { Offer } from "./types/OfferProps";

function App() {
  const [offers, setOffers] = useState<Offer[]>([]);

  return (
    <main>
      <div className="header">
        <HeaderLogo />
        <SearchForm setOffers={setOffers} />
        <hr />
        <div>
          {offers &&
            offers.map((offer, i) => (
              <div key={i}>
                <img src={offer.image.src} alt={offer.image.alt} />
                <span>{offer.title}</span>
                <span>{offer.price}</span>
                <span>{offer.location}</span>
                <span>{offer.date}</span>
                <br />
                <a href={offer.url}>{offer.url}</a>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
