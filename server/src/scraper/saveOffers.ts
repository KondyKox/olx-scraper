import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Offer } from "../types/OfferProps.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Save single offer
export const saveOffer = (newOffer: Offer) => {
  const filePath = createPath();
  const offers = readOffers();

  const exists = findOffer(newOffer);

  if (exists) {
    console.warn("⚠️ Oferta już istniała — usuwam ją.");
    const updatedOffers = offers.filter((o) => o.url !== newOffer.url);
    fs.writeFileSync(filePath, JSON.stringify(updatedOffers, null, 2), "utf-8");
    console.log("🗑️ Oferta usunięta!");
    return { success: true, removed: true };
  }

  offers.push(newOffer);
  fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf-8");
  console.log("💾 Oferta zapisana!");
  return { success: true, removed: false };
};

// Delete offer
export const deleteOffer = (offer: Offer) => {
  const filePath = createPath();
  const offers = readOffers();

  const updatedOffers = offers.filter((o) => o.url !== offer.url);

  fs.writeFileSync(filePath, JSON.stringify(updatedOffers, null, 2), "utf-8");
  console.log("🗑️ Oferta usunięta!");
  return true;
};

// Find single offer
export const findOffer = (newOffer: Offer): boolean => {
  const offers = readOffers();
  return offers.some((offer: Offer) => newOffer.id === offer.id);
};

// Read offers from json
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
