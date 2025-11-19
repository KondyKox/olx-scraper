import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Offer } from "../types/OfferProps.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Save single offer
export const saveOffer = (newOffer: Offer, search: string) => {
  const filePath = createPath(search);
  const offers = readOffers(search);

  const exists = findOffer(newOffer, search);

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
export const deleteOffer = (offer: Offer, search: string) => {
  const filePath = createPath(search);
  const offers = readOffers(search);

  const updatedOffers = offers.filter((o) => o.url !== offer.url);

  fs.writeFileSync(filePath, JSON.stringify(updatedOffers, null, 2), "utf-8");
  console.log("🗑️ Oferta usunięta!");
  return true;
};

// Find single offer
export const findOffer = (newOffer: Offer, search: string): boolean => {
  const offers = readOffers(search);
  return offers.some((offer: Offer) => newOffer.id === offer.id);
};

// Read offers from json
export const readOffers = (search: string): Offer[] => {
  const filePath = createPath(search);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Create path to offers.json
export const createPath = (search: string) => {
  const safeName = search.toLowerCase().replace(/[^a-z0-9\-]/g, "-");

  const dirPath = path.join(__dirname, "../../data");
  const filePath = path.join(dirPath, `${safeName}.json`);

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");

  return filePath;
};
