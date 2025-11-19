import Header from "./components/Header";
import OffersList from "./components/OffersList";
import SortPanel from "./components/SortPanel";
import { OffersProvider } from "./context/OffersContext";
import { SearchProvider } from "./context/SearchContext";
import { SortProvider } from "./context/SortContext";

function App() {
  return (
    <main>
      <SearchProvider>
        <SortProvider>
          <OffersProvider>
            <Header />

            <SortPanel />
            <OffersList />
          </OffersProvider>
        </SortProvider>
      </SearchProvider>
    </main>
  );
}

export default App;
