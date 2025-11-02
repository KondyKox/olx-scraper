import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Offer } from "../types/OfferProps";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Save many offers
export const saveOffers = (offers: Offer[]) => {
  const filePath = createPath();

  fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf-8");
  console.log("💾 Zapisano oferty do pliku data/offers.json");
};

// Save one offer
export const saveOffer = (newOffer: Offer) => {
  const filePath = createPath();
  const offers = readOffers();

  if (findOffer(newOffer)) {
    console.warn("Już istnieje taka oferta.");
    return false;
  }

  offers.push(newOffer);
  fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf-8");
  console.log("Oferta zapisana!");
  return true;
};

export const findOffer = (newOffer: Offer): boolean => {
  const offers = readOffers();
  return offers.some((offer: Offer) => newOffer.id === offer.id);
};

export const readOffers = (): Offer[] => {
  const filePath = createPath();

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Create path to offers.json
export const createPath = () => {
  const dirPath = path.join(__dirname, "../../data");
  const filePath = path.join(dirPath, "offers.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return filePath;
};
