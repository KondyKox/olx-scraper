import Header from "./components/Header";
import OffersList from "./components/OffersList";
import { OffersProvider } from "./context/OffersContext";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <main>
      <SearchProvider>
        <OffersProvider>
          <Header />

          <OffersList />
        </OffersProvider>
      </SearchProvider>
    </main>
  );
}

export default App;
