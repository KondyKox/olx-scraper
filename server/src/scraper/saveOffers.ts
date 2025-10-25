import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const saveOffers = (offers: any[]) => {
  const dirPath = path.join(__dirname, "../../data");
  const filePath = path.join(dirPath, "offers.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf-8");
  console.log("💾 Zapisano oferty do pliku data/offers.json");
};
