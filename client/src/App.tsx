import Header from "./components/Header";
import OffersList from "./components/OffersList";
import { OffersProvider } from "./context/OffersContext";

function App() {
  return (
    <main>
      <OffersProvider>
        <Header />

        <OffersList />
      </OffersProvider>
    </main>
  );
}

export default App;
