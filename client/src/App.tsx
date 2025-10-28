import Header from "./components/Header";
import { OffersProvider } from "./context/OffersContext";

function App() {
  return (
    <main>
      <OffersProvider>
        <Header />

        <div>
          {/* {offers &&
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
            ))} */}
        </div>
      </OffersProvider>
    </main>
  );
}

export default App;
